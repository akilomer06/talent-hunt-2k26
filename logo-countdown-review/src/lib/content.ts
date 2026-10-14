import {
  siteData,
  type Category,
  type EventRecord,
  type Metadata,
  type RegistrationConfig,
  type CountdownConfig,
} from "../data/siteData";
const localAssets = import.meta.glob("/public/assets/**/*", {
  eager: true,
  query: "?url",
  import: "default",
});
export const assetExists = (path?: string | null): path is string =>
  !!path && Object.hasOwn(localAssets, `/public${path}`);
export const safeUrl = (url?: string | null) => {
  try {
    return !!url && new URL(url).protocol === "https:";
  } catch {
    return false;
  }
};
export function isGoogleForm(url?: string | null) {
  try {
    const u = new URL(url || "");
    return (
      u.protocol === "https:" &&
      !u.username &&
      !u.password &&
      ((u.hostname === "docs.google.com" && u.pathname.startsWith("/forms/")) ||
        (u.hostname === "forms.gle" && u.pathname.length > 1))
    );
  } catch {
    return false;
  }
}
export function validInstant(
  value: string | null,
  zone: string | null,
): boolean {
  if (
    !value ||
    !zone ||
    !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:\d{2})$/.test(value)
  )
    return false;
  try {
    const date = new Date(value);
    if (!Number.isFinite(date.getTime())) return false;
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: zone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    }).formatToParts(date);
    const get = (name: Intl.DateTimeFormatPartTypes) =>
      parts.find((p) => p.type === name)?.value;
    return (
      `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}:${get("second")}` ===
      value.slice(0, 19)
    );
  } catch {
    return false;
  }
}
export type RegistrationStatus =
  "unconfigured" | "available" | "soon" | "open" | "closed";
export function registrationStatus(
  config: RegistrationConfig,
  now: number,
  qrAvailable = assetExists(config.qr),
): RegistrationStatus {
  if (!isGoogleForm(config.url) || !config.qrVerified || !qrAvailable)
    return "unconfigured";
  // A published, verified brochure link does not imply an invented time window.
  if (config.mode === "published") {
    return config.opensAt || config.closesAt || config.timezone
      ? "unconfigured"
      : "available";
  }
  if (
    !validInstant(config.opensAt, config.timezone) ||
    !validInstant(config.closesAt, config.timezone)
  )
    return "unconfigured";
  const start = Date.parse(config.opensAt!);
  const end = Date.parse(config.closesAt!);
  if (start >= end) return "unconfigured";
  return now < start ? "soon" : now >= end ? "closed" : "open";
}
export function countdown(config: CountdownConfig, now: number) {
  if (
    !config.enabled ||
    !validInstant(config.startsAt, config.timezone) ||
    config.startsAt!.slice(0, 10) !== siteData.settings.date
  )
    return null;
  const remaining = Math.max(0, Date.parse(config.startsAt!) - now);
  const seconds = Math.floor(remaining / 1000);
  return {
    remaining,
    days: Math.floor(seconds / 86400),
    hours: Math.floor(seconds / 3600) % 24,
    minutes: Math.floor(seconds / 60) % 60,
    seconds: seconds % 60,
  };
}
export function isArchived(now: number) {
  // With no official zone, wait until the date has ended even in UTC−12; never assume a start time.
  if (siteData.countdown.timezone) {
    try {
      const p = new Intl.DateTimeFormat("en-CA", {
        timeZone: siteData.countdown.timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).formatToParts(now);
      const get = (t: string) => p.find((v) => v.type === t)?.value;
      return (
        `${get("year")}-${get("month")}-${get("day")}` > siteData.settings.date
      );
    } catch {
      /* Conservative global boundary below. */
    }
  }
  return now >= Date.parse(`${siteData.settings.date}T23:59:59-12:00`) + 1000;
}
export const inCategory = (category: Category, records = siteData.events) =>
  records
    .filter((e) => e.category === category)
    .sort((a, b) => a.order - b.order);
export const filterEvents = (records: EventRecord[], query: string, tag = "") =>
  records.filter(
    (e) =>
      e.name.toLowerCase().includes(query.trim().toLowerCase()) &&
      (!tag || e.tags.includes(tag)),
  );
export function neighbours(event: EventRecord) {
  const list = inCategory(event.category);
  const i = list.findIndex((e) => e.id === event.id);
  return { previous: list[i - 1], next: list[i + 1] };
}
export function validateEvents(records: EventRecord[]) {
  const errors: string[] = [];
  const ids = new Set<string>();
  const slugs = new Set<string>();
  for (const e of records) {
    if (
      !e.id ||
      typeof e.name !== "string" ||
      !e.name.trim() ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(e.slug) ||
      ["technical", "non-technical"].includes(e.slug)
    )
      errors.push(`Missing or invalid properties: ${e.id}`);
    if (ids.has(e.id)) errors.push(`Duplicate ID: ${e.id}`);
    if (slugs.has(e.slug)) errors.push(`Duplicate slug: ${e.slug}`);
    ids.add(e.id);
    slugs.add(e.slug);
    if (!["technical", "non-technical"].includes(e.category))
      errors.push(`Invalid category: ${e.id}`);
    if (!Number.isInteger(e.order) || e.order < 1)
      errors.push(`Invalid order: ${e.id}`);
  }
  for (const cat of ["technical", "non-technical"] as Category[]) {
    const list = inCategory(cat, records);
    if (list.some((e, i) => e.order !== i + 1))
      errors.push(`Invalid category sequence: ${cat}`);
  }
  for (const e of records)
    for (const id of e.relatedIds)
      if (!ids.has(id) || id === e.id)
        errors.push(`Invalid related reference: ${e.id}/${id}`);
  return errors;
}
export function validateSiteData() {
  const errors = validateEvents(siteData.events);
  if (
    !siteData.settings.title ||
    !siteData.settings.college ||
    !siteData.settings.eligibility
  )
    errors.push("Missing required global content");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(siteData.settings.date))
    errors.push("Invalid official date");
  const ids = new Set<string>();
  for (const a of siteData.announcements) {
    if (!a.id || !a.message || ids.has(a.id))
      errors.push(`Missing or duplicate announcement: ${a.id}`);
    ids.add(a.id);
  }
  return errors;
}
export const publicRoutes = [
  ...Object.keys(siteData.pages).filter((p) => p !== "/404"),
  ...siteData.events.map((e) => `/events/${e.slug}`),
];
export function metadata(path: string): Metadata {
  const e = siteData.events.find((e) => `/events/${e.slug}` === path);
  const page = e
    ? {
        title: e.name,
        description:
          e.description ||
          `${e.name} — ${siteData.categories[e.category].short} competition at Talent Hunt 2K26. ${siteData.settings.dateLabel}. ${siteData.settings.eligibility}.`,
        image: assetExists(e.socialImage) ? e.socialImage : undefined,
      }
    : siteData.pages[path] || siteData.pages["/404"];
  return {
    ...page,
    title:
      path === "/" ? page.title : `${page.title} | ${siteData.settings.title}`,
    image:
      page.image ||
      (assetExists(siteData.assets.defaultSocial)
        ? siteData.assets.defaultSocial
        : undefined),
  };
}
