export type Category = "technical" | "non-technical";
export interface Coordinator {
  id: string;
  name: string;
  role: string;
  phone?: string;
  email?: string;
  url?: string;
}
export interface CoordinatorGroup {
  id: string;
  label: string;
  members: Coordinator[];
}
export interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
}
export interface EventRecord {
  id: string;
  slug: string;
  name: string;
  category: Category;
  order: number;
  venue?: string;
  description?: string;
  overview?: string;
  tags: string[];
  rules: string[];
  participation: string[];
  rounds: string[];
  equipment: string[];
  prizes: string[];
  faculty: Coordinator[];
  students: Coordinator[];
  faqs: FAQ[];
  relatedIds: string[];
  artwork?: string;
  socialImage?: string;
}
export interface ScheduleEntry {
  id: string;
  time: string;
  title: string;
  description?: string;
  eventId?: string;
}
export interface Announcement {
  id: string;
  message: string;
  url?: string;
}
export interface RegistrationConfig {
  mode?: "published" | "scheduled";
  url: string | null;
  qr: string | null;
  qrVerified: boolean;
  opensAt: string | null;
  closesAt: string | null;
  timezone: string | null;
  instructions: string[];
}
export interface CountdownConfig {
  enabled: boolean;
  startsAt: string | null;
  timezone: string | null;
  label?: string;
}
export interface AssetPaths {
  college: string;
  event: string;
  csea: string;
  acm: string;
  brochureImage: string;
  brochurePdf: string | null;
  defaultSocial: string | null;
  introAudio: string | null;
  favicon: string;
}
export interface Metadata {
  title: string;
  description: string;
  image?: string;
  noindex?: boolean;
}
export interface GlobalSettings {
  title: string;
  date: string;
  dateLabel: string;
  weekday: string;
  college: string;
  school: string;
  department: string;
  venue: string;
  address: string | null;
  directions: string[];
  eligibility: string;
  eligibilityNote: string;
  productionUrl: string | null;
  copyright: string;
  archiveMessage: string;
  eventConcludedMessage: string;
}

const technical = [
  "Code Break",
  "Code Canvas",
  "Neural Nexus",
  "Binary Battle",
  "Game Craft",
  "Tech Talks",
  "Cyber Breach",
  "Prompt Pop",
];
const nonTechnical = [
  "Shutter Verse",
  "Clue Code",
  "Trashion",
  "The Voice Over",
  "BGMI",
  "FIFA",
  "Valorant",
  "Bid Wars",
];
export const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const eventDetails: Record<string, Partial<EventRecord>> = {
  "code-break": {
    venue: "Venue TBA",
    description:
      "Algorithmic challenges, code debugging, and speed programming showdown.",
    overview:
      "Code Break tests participants' core coding, debugging, and problem-solving prowess under strict time constraints. Solve tricky test cases, fix broken logic, and race against the clock.",
    tags: ["Competitive Coding", "Debugging", "Algorithms", "Problem Solving"],
    rules: [
      "Individual or team participation as per event guidelines.",
      "Bring valid Crescent college ID card to the venue.",
      "Standard competitive programming rules apply. Plagiarism or unauthorized aids lead to disqualification.",
      "Judges' decision will be final and binding.",
    ],
    participation: [
      "For Crescent CSE students only",
      "Report to the assigned lab 15 minutes before the round starts",
    ],
  },
  "code-canvas": {
    venue: "Venue TBA",
    description: "Where AI Meets Agile Coding! Organized by CSE CODING CLUB.",
    overview:
      "Code Canvas is an exciting 2-hour-and-30-minute AI-powered web development hackathon where participants combine programming skills with Generative AI to build functional web applications. Teams will receive an on-the-spot problem statement and compete through creative coding, a surprise Chaos Round, and a 90-Second Final Boss showdown. Think creatively, code smartly, and turn your ideas into reality!",
    tags: ["AI Coding", "Hackathon", "Web Development", "Chaos Round"],
    rules: [
      "Team Composition: Participate individually or in teams of up to 2 members.",
      "AI Tool Policy: AI coding assistants such as ChatGPT, DeepSeek, Gemini, Roo Code, and Claude are permitted. Zero-code app generators such as Lovable are strictly prohibited.",
      "Development: Use AI to assist with prompting, coding, debugging, and refinement. Participants must understand their code.",
      "Submission: Push the final code to a public GitHub repository within the allotted time. Include a README.md with the project title, team members, and description. Submit a working application.",
      "Code of Conduct: Projects must be developed during the event. Copying pre-built projects and collaborating with other teams are prohibited.",
      "Chaos Round: Teams must implement a surprise feature or technical challenge within the announced time limit.",
      "90-Second Final Boss: Each team gets 90 seconds to demonstrate its application, followed by a brief technical question from the judges.",
      "AI Transparency: Document the AI tools used, important prompts, AI-generated code modified, at least one bug solved independently, and application testing in README.md or AI-LOG.md.",
    ],
    rounds: [
      "Round 1 · Agile AI Development: Receive an on-the-spot problem statement and build a functional web application utilizing approved AI assistants.",
      "Round 2 · Chaos Round: Teams must implement a surprise feature or technical challenge within the announced time limit.",
      "Round 3 · 90-Second Final Boss: Each team gets 90 seconds to demonstrate its application, followed by a brief technical question from the judges.",
    ],
    equipment: [
      "Laptops with development environment and Git/GitHub setup.",
      "Permitted AI Coding Assistants: ChatGPT, DeepSeek, Gemini, Roo Code, and Claude.",
      "Strictly Prohibited: Zero-code app generators such as Lovable.",
    ],
    participation: [
      "Participate individually or in teams of up to 2 members.",
      "Organized by CSE CODING CLUB.",
      "Open to Crescent CSE students only.",
    ],
    prizes: [
      "Winning Criteria (100 Marks Total):",
      "Functionality and working features: 25 Marks",
      "Creativity and innovation: 20 Marks",
      "UI/UX and responsiveness: 15 Marks",
      "AI integration and code understanding: 20 Marks",
      "Chaos Round performance: 10 Marks",
      "Final demo and technical explanation: 10 Marks",
    ],
  },
  "neural-nexus": {
    venue: "Venue TBA",
    description:
      "Deep learning models, neural architecture challenges, and AI problem solving.",
    overview:
      "Neural Nexus challenges participants to train, optimize, and evaluate machine learning models on complex datasets. Showcase your AI intuition, prompt engineering, and model tuning capabilities.",
    tags: ["Machine Learning", "Neural Networks", "Deep Learning", "AI Arena"],
    rules: [
      "Bring your own laptops with Python and ML libraries pre-installed.",
      "Datasets will be provided at the start of the event.",
      "Pre-trained models are restricted unless explicitly permitted in problem statements.",
      "Judges' evaluation based on model accuracy, latency, and innovation.",
    ],
    participation: [
      "Crescent CSE students only",
      "Individual or 2-member teams",
    ],
  },
  "binary-battle": {
    venue: "ES 304",
    description:
      "High-stakes binary decoding, technical puzzles, and product advertising showdown.",
    overview:
      "Binary Battle is an intense three-stage technical competition that tests speed, binary decoding, analytical problem solving, and product marketing. Teams decode secret coordinates to find their workstation, race through a locked 3x3 technical quiz grid, and deliver an innovative on-the-spot product pitch.",
    tags: [
      "Binary Decoding",
      "Technical Quiz",
      "Product Pitch",
      "Hardware & Logic",
    ],
    rules: [
      "No electronics are allowed for the first two rounds. This includes mobile phones, laptops, earphones, and other devices.",
      "Cross collaboration across different teams is not allowed and could lead to penalty scores or termination.",
      "For any issues or queries, participants are expected to approach the volunteers and not other teams.",
      "Winners will be selected with their time of completion and their presentation scores. In case of ties, a new round of problem solving shall be introduced between the teams.",
      "Judges and Organizers have the power to disqualify teams for unfair practices.",
    ],
    rounds: [
      "Round 1 · Identifying workstation from binary data: Participants receive individual IDs which on matching with their team's ID provide a meaningful image. Teams move to the Bay Area to obtain a scroll containing binary data to decode and identify the workstation on which the team has to assemble.",
      "Round 2 · Decoding the image by solving technical quiz: Each team receives a 3x3 grid on their workstation which has a hidden image. Solve quizzes to unlock each segment. After solving all segments, identify what the unlocked image represents and report to event organisers.",
      "Round 3 · Advertising the given product: Upon reaching this final round, participants are allowed laptops, mobile phones, and internet access to advertise and market a surprise product provided on spot. Showcase creativity, innovation, and professional communication.",
    ],
    equipment: [
      "Materials to be brought: Laptop and Mobile Phones (permitted in Round 3).",
      "No electronics are permitted during the first two rounds.",
      "Internet access will be provided for the final advertising round.",
    ],
    participation: [
      "Team size: 2 - 3 members.",
      "Cross collaboration across teams is strictly prohibited.",
      "Venue: ES 304.",
    ],
  },
  "game-craft": {
    venue: "Venue TBA",
    description:
      "Game design, interactive mechanics, and rapid engine prototyping arena.",
    overview:
      "Game Craft is a creative game development and mechanics design sprint. Build playable prototypes, design engaging game loops, and pitch your game vision to judges.",
    tags: ["Game Dev", "Interactive Media", "Unity / Godot", "Level Design"],
    rules: [
      "Game engines permitted: Unity, Unreal Engine, Godot, Pygame, or web-based game engines.",
      "Third-party assets must be credited and adhere to open-source or creative commons licensing.",
      "Core gameplay mechanics must be implemented during the designated contest period.",
      "Judges' decision based on playability, aesthetics, and game mechanics.",
    ],
    participation: ["Crescent CSE students only", "Teams of 1 to 3 members"],
  },
  "tech-talks": {
    venue: "Venue TBA",
    description:
      "Keynotes, emerging technology debates, and technical paper presentations.",
    overview:
      "Tech Talks provides a stage for students to articulate cutting-edge innovations, emerging technology research, and disruptive tech trends before an audience and faculty panel.",
    tags: [
      "Paper Presentation",
      "Tech Keynote",
      "Public Speaking",
      "Innovation",
    ],
    rules: [
      "Presentation time: 7 minutes presentation followed by 3 minutes Q&A.",
      "Slide decks must be submitted to the event coordinators before the commencement of the session.",
      "Originality of content and research depth are primary scoring criteria.",
      "Professional dress code is recommended.",
    ],
    participation: [
      "Individual or duo presentation",
      "Crescent CSE students only",
    ],
  },
  "cyber-breach": {
    venue: "Venue TBA",
    description:
      "Capture The Flag (CTF), cybersecurity vulnerabilities, and ethical hacking sprint.",
    overview:
      "Cyber Breach is a hands-on cybersecurity and CTF competition. Test your skills in network analysis, reverse engineering, cryptography, web exploitation, and digital forensics.",
    tags: ["CTF", "Ethical Hacking", "Cryptography", "Network Security"],
    rules: [
      "Attacking the contest infrastructure, score server, or other teams is strictly forbidden and results in immediate disqualification.",
      "Flag sharing or collusion across teams will lead to permanent expulsion.",
      "All challenges are self-contained within the authorized test environment.",
      "Winners determined by points accrued and timestamp of submissions.",
    ],
    participation: [
      "Individual or teams of up to 2",
      "Bring laptops with Kali/security tools",
    ],
  },
  "prompt-pop": {
    venue: "Venue TBA",
    description:
      "Generative AI prompt engineering, image synthesis, and prompt battle arena.",
    overview:
      "Prompt Pop challenges participants to master the art of prompt engineering across Large Language Models and diffusion image generators to produce precise, creative outputs under pressure.",
    tags: ["Prompt Engineering", "GenAI", "Creative Synthesis", "AI Art"],
    rules: [
      "Prompts must be crafted during the live session adhering to surprise thematic constraints.",
      "Use of external automated bots is prohibited.",
      "Entries judged on adherence to prompt constraints, aesthetics, and creative problem solving.",
      "Judges' evaluation is final.",
    ],
    participation: ["Crescent CSE students only", "Individual participation"],
  },
  "shutter-verse": {
    venue: "Venue TBA",
    description:
      "Campus photography, visual storytelling, and cinematic mobile framing.",
    overview:
      "Shutter Verse invites photographers to capture the energy, emotion, and aesthetic highlights of Talent Hunt 2K26 through a creative lens.",
    tags: [
      "Photography",
      "Visual Storytelling",
      "Cinematography",
      "Campus Life",
    ],
    rules: [
      "Photos must be captured within the college campus on the day of the event.",
      "Basic color correction and lighting adjustments are permitted; heavy AI synthesis or compositing is disallowed.",
      "EXIF data must be preserved for verification.",
      "Participants must submit their top photographs before the submission deadline.",
    ],
    participation: [
      "DSLR or Smartphone cameras permitted",
      "Crescent CSE students only",
    ],
  },
  "clue-code": {
    venue: "Venue TBA",
    description:
      "Campus treasure hunt, cryptic clues, and riddle-solving adventure.",
    overview:
      "Clue Code is an adrenaline-fueled treasure hunt across the campus. Decipher cryptic riddles, uncover hidden locations, and race against other teams to claim the prize.",
    tags: ["Treasure Hunt", "Cryptic Clues", "Campus Race", "Puzzle Solving"],
    rules: [
      "Teams must stay together during the entire treasure hunt.",
      "Do not disturb ongoing academic classes or enter restricted campus zones.",
      "Tampering with clues or misleading other teams will lead to immediate disqualification.",
      "First team to report with all clues verified wins.",
    ],
    participation: ["Teams of 2 to 4 members", "Crescent CSE students only"],
  },
  trashion: {
    venue: "Venue TBA",
    description:
      "Fashion from Reusable and Recycled Materials · Redefining Fashion. Reimagining Waste.",
    overview:
      "Trashion is a creative fashion event that combines fashion with sustainability. Participants must design and showcase unique outfits made from reusable, recycled, and waste materials. The event encourages students to transform discarded items into fashionable creations while promoting environmental awareness and sustainable fashion. The goal is to prove that waste can be transformed into fashion through creativity and innovation. Turn Trash into Trend. Make Sustainability Stylish!",
    tags: ["Eco Fashion", "Upcycling", "Ramp Walk", "Sustainability"],
    rules: [
      "Team Size: Each team must consist of exactly 5 members.",
      "Team Categories: Separate Boys’ Teams and Girls’ Teams are allowed. Mixed-gender teams are not permitted.",
      "Theme: All outfits must follow the theme “Trashion – Fashion from Reusable and Recycled Materials.”",
      "Materials: Participants must primarily use reusable, recycled, or discarded materials such as newspapers, cardboard, plastic bottles, old clothes, fabric scraps, packaging materials, CDs, and other safe waste materials.",
      "Originality: Outfits must be creative and original. Participants are encouraged to design and prepare their costumes before the event.",
      "Time Limit: Each team will be allotted a maximum of 7 minutes for the entire performance, including the ramp walk, introduction, and presentation.",
      "Theme Compliance: Outfits that do not follow the Trashion theme may receive reduced marks or be disqualified at the judges’ discretion.",
      "Appropriate Attire: All outfits must be decent and suitable for a college-level event. Vulgarity, offensive messages, or inappropriate behaviour will not be tolerated.",
      "Safety: Sharp objects, hazardous waste, flammable materials, toxic substances, and other dangerous items are strictly prohibited.",
      "Music and Audio: All background music and audio tracks must be submitted to the organisers at least 2 days before the event.",
      "Reporting Time: All participants must report to the venue at least 2 hours before the event for registration, costume preparation, and performance slot allocation.",
      "Props and Accessories: Teams are responsible for bringing their own costumes, props, accessories, and other required materials.",
      "Time Penalty: Marks may be deducted for exceeding the allotted time limit.",
      "Disqualification: Teams may be disqualified for violating event rules, using prohibited materials, displaying inappropriate behaviour, or failing to follow the theme.",
      "Judges’ Decision: The judges’ decision will be final and binding.",
      "Organisers’ Authority: The organisers reserve the right to make necessary changes to the event schedule, rules, or performance order when required.",
    ],
    rounds: [
      "7-Minute Ramp Walk & Presentation: Each team is allotted a maximum of 7 minutes for the entire performance, including the ramp walk, introduction, and concept presentation.",
    ],
    equipment: [
      "Reusable, recycled, or discarded materials (newspapers, cardboard, plastic bottles, old clothes, fabric scraps, packaging materials, CDs, etc.).",
      "Strictly Prohibited: Sharp objects, hazardous waste, flammable materials, toxic substances, and dangerous items.",
    ],
    participation: [
      "Team Size: Exactly 5 members per team.",
      "Categories: Separate Boys' Teams and Girls' Teams. Mixed-gender teams are not permitted.",
      "Reporting Time: At least 2 hours before the event.",
    ],
    prizes: [
      "Judging Focus Criteria:",
      "1. Creativity and Innovation: Uniqueness of outfit and design concept.",
      "2. Effective Use of Recycled Materials: How well reusable and discarded materials are incorporated.",
      "3. Theme Relevance: How clearly the designs represent the Trashion theme.",
      "4. Styling and Presentation: Outfit coordination, styling, and overall visual appeal.",
      "5. Ramp Walk and Confidence: Confidence, stage presence, and coordination.",
      "6. Sustainability Message: Communication of recycling, reuse, and environmental protection.",
      "7. Overall Impact: Creativity, presentation, and impression on audience and judges.",
    ],
  },
  "the-voice-over": {
    venue: "Venue TBA",
    description:
      "Voice dubbing, mimicry, cinematic dialogues, and dynamic audio modulation.",
    overview:
      "The Voice Over tests your vocal versatility, comedic timing, and emotional resonance. Dub over famous movie scenes, animate quirky characters, or create hilarious soundscapes live.",
    tags: ["Dubbing", "Voice Acting", "Mimicry", "Audio Creativity"],
    rules: [
      "Clips will be assigned or pre-approved by the event organizers.",
      "Obscenity, vulgar language, or offensive personal remarks are strictly banned.",
      "Sync accuracy with the video clip and vocal expression are primary judging criteria.",
      "Time limit per performance: 3 to 5 minutes.",
    ],
    participation: [
      "Individual or duo performance",
      "Crescent CSE students only",
    ],
  },
  bgmi: {
    venue: "Venue TBA",
    description:
      "Arcane Esports Portal · Official Collegiate BGMI Championship.",
    overview:
      "Drop into the ultimate collegiate Battlegrounds Mobile India showdown hosted by Arcane. Squads will compete across Erangel, Miramar, and Sanhok through high-stakes qualifiers and grand finals. Assemble your best roster, execute your strategy, and battle for the campus crown and prize pool.",
    tags: ["Esports", "BGMI", "Mobile Gaming", "Battle Royale"],
    rules: [
      "Roster & Mode: Competitions are held strictly in Squad Third-Person Perspective (TPP) with 4 main players and 1 optional substitute.",
      "Device Eligibility: Only handheld mobile smartphones are allowed; emulators, PCs, tablets, and trigger accessories are strictly prohibited.",
      "Lobby Punctuality: Squads must join the custom room within 5 minutes of the Room ID and password being shared by tournament admins.",
      "Scoring Matrix: Standings are determined by standard rank placement points combined with 1 point awarded per confirmed finish.",
      "Disconnection Policy: Matches continue uninterrupted without restarts for individual player lag, network drops, or client crashes.",
      "Cheating & Exploits: Use of unauthorized third-party apps, hacks, macros, scripts, or deliberate glitch exploitation results in immediate disqualification.",
      "Collusion & Unfair Play: Teaming up with opponents, match-fixing, intentional feeding, or stream-sniping leads to an instant roster ban.",
      "Credential Leaks & Misconduct: Sharing room passwords outside registered squads, multi-team registrations, or abusive conduct incurs direct expulsion.",
    ],
    rounds: [
      "Qualifiers: High-stakes squad matches across Erangel, Miramar, and Sanhok.",
      "Grand Finals: Top qualifying squads compete in custom championship lobbies for the campus crown.",
    ],
    equipment: [
      "Only handheld mobile smartphones are allowed.",
      "Strictly Prohibited: Emulators, PCs, tablets, and trigger accessories.",
    ],
    participation: [
      "Format: Squad (4 main players + 1 optional substitute).",
      "Perspective: TPP (Third-Person Perspective).",
      "Device: Mobile Only.",
      "Scoring: Standard Matrix.",
    ],
  },
  fifa: {
    venue: "Venue TBA",
    description:
      "Virtual football esports tournament on console / controllers.",
    overview:
      "Step onto the virtual pitch in the Talent Hunt 2K26 FIFA Championship. Pick your favorite club, display tactical finesse, and score your way to collegiate glory.",
    tags: ["Esports", "FIFA", "Virtual Soccer", "Console Gaming"],
    rules: [
      "Match duration: Standard half length (4-6 minutes) as decided by referees.",
      "Tactical defending only; custom formations may be restricted if deemed exploits.",
      "In case of a draw, extra time and penalty shootouts determine the winner.",
      "Unsportsmanlike conduct or pausing during active play without referee permission leads to penalties.",
    ],
    participation: [
      "1v1 Knockout format",
      "Controllers provided or bring your own",
    ],
  },
  valorant: {
    venue: "Venue TBA",
    description:
      "5v5 tactical shooter esports showdown in custom spike-rush / standard lobby.",
    overview:
      "Lock in your agents and execute your tactical playbooks in the Talent Hunt 2K26 Valorant Showdown. Coordinate utility, clutch rounds, and conquer the server.",
    tags: ["Esports", "Valorant", "Tactical Shooter", "5v5 Tournament"],
    rules: [
      "Teams of 5 players (with optional substitute).",
      "Tournament format: Single-elimination knockout brackets on standard competitive map pool.",
      "Use of third-party cheats, macros, or crosshair overlays with exploit behavior is strictly banned.",
      "Map vetoes and side selection conducted through tournament admins.",
    ],
    participation: [
      "Teams of 5",
      "Bring your own peripherals (mouse, headset) recommended",
    ],
  },
  "bid-wars": {
    venue: "Venue TBA",
    description:
      "IPL-style auction strategy, virtual bidding war, and squad budgeting.",
    overview:
      "Channel your inner franchise manager in Bid Wars! Manage a fixed virtual budget, out-bid rival teams for marquee players or assets, and build the ultimate championship squad.",
    tags: ["Auction", "IPL Bidding", "Strategy", "Resource Management"],
    rules: [
      "Each team begins with an identical virtual purse and roster constraints.",
      "Exceeding budget or failing to meet minimum squad composition leads to penalties.",
      "Fastest paddle raise secures bid at current valuation.",
      "Winner determined by comprehensive squad valuation and balance score.",
    ],
    participation: ["Teams of 2 to 3 members", "Crescent CSE students only"],
  },
};

export const events: EventRecord[] = (
  [
    ["technical", technical],
    ["non-technical", nonTechnical],
  ] as const
).flatMap(([category, names]) =>
  names.map((name, index) => {
    const slug = slugify(name);
    const custom = eventDetails[slug] || {};
    return {
      id: slug,
      slug,
      name,
      category,
      order: index + 1,
      venue: custom.venue || "Venue TBA",
      description: custom.description,
      overview: custom.overview,
      tags: custom.tags || [],
      rules: custom.rules || [],
      participation: custom.participation || [],
      rounds: custom.rounds || [],
      equipment: custom.equipment || [],
      prizes: custom.prizes || [],
      faculty: custom.faculty || [],
      students: custom.students || [],
      faqs: custom.faqs || [],
      relatedIds: custom.relatedIds || [],
    };
  }),
);
export const siteData = {
  settings: {
    title: "TALENT HUNT 2K26",
    date: "2026-10-26",
    dateLabel: "26 October 2026",
    weekday: "Monday",
    college: "B.S. Abdur Rahman Crescent Institute of Science & Technology",
    school: "School of Computer Information and Mathematical Sciences",
    department: "Department of Computer Science and Engineering",
    venue: "Auditorium · B.S. Abdur Rahman Crescent",
    address: null,
    directions: [],
    eligibility: "For Crescent CSE students only",
    eligibilityNote:
      "Participation is restricted to Crescent students only. The official brochure specifies “ONLY FOR CSE.”",
    productionUrl: null,
    copyright:
      "TALENT HUNT 2K26 · Department of Computer Science and Engineering",
    archiveMessage:
      "The 2026 edition has concluded. Explore the event archive.",
    eventConcludedMessage: "The countdown has ended. Explore Talent Hunt 2K26.",
  } satisfies GlobalSettings,
  assets: {
    college: "/assets/logos/crescent.png",
    event: "/assets/logos/talent-hunt.png",
    csea: "/assets/logos/csea.png",
    acm: "/assets/logos/acm.png",
    brochureImage: "/assets/documents/brochure-qr.jpg",
    brochurePdf: null,
    defaultSocial: null,
    introAudio: null,
    favicon: "/assets/logos/talent-hunt-mark.svg",
  } satisfies AssetPaths,
  countdown: {
    enabled: true,
    startsAt: "2026-10-26T09:00:00+05:30",
    timezone: "Asia/Kolkata",
    label: "26 October · 9:00 AM IST",
  } as CountdownConfig,
  registration: {
    mode: "published",
    url: "https://forms.gle/mzuWoGeCKZWcVVZq5",
    qr: "/assets/registration/official-qr.png",
    qrVerified: true,
    opensAt: null,
    closesAt: null,
    timezone: null,
    instructions: [],
  } as RegistrationConfig,
  announcements: [] as Announcement[],
  events,
  featuredIds: ["code-break", "shutter-verse", "neural-nexus", "trashion"],
  schedule: [] as ScheduleEntry[],
  coordinators: [
    {
      id: "sharmila-sankar",
      name: "Dr. Sharmila Sankar",
      role: "Convenor · Dean",
    },
    {
      id: "aisha-banu",
      name: "Dr. W. Aisha Banu",
      role: "Convenor · HOD",
    },
  ] as Coordinator[],
  coordinatorGroups: [
    {
      id: "convenors",
      label: "Convenors",
      members: [
        {
          id: "sharmila-sankar",
          name: "Dr. Sharmila Sankar",
          role: "Convenor · Dean",
        },
        {
          id: "aisha-banu",
          name: "Dr. W. Aisha Banu",
          role: "Convenor · HOD",
        },
      ],
    },
    {
      id: "faculty",
      label: "Faculty Coordinators",
      members: [
        {
          id: "karthiga",
          name: "Dr. I. Karthiga",
          role: "Assistant Professor",
        },
        { id: "snegaa", name: "Ms. A. S. Snegaa", role: "Assistant Professor" },
        {
          id: "tamilarasi",
          name: "Ms. C. Tamilarasi",
          role: "Assistant Professor",
        },
        { id: "ms-usha", name: "Ms. M. S. Usha", role: "Assistant Professor" },
        {
          id: "joy-kiruba",
          name: "Ms. P. Joy Kiruba",
          role: "Assistant Professor",
        },
        { id: "p-usha", name: "Ms. P. Usha", role: "Assistant Professor" },
        {
          id: "suthana-rasha-begam",
          name: "Ms. A. Suthana Rasha Begam",
          role: "Assistant Professor",
        },
        {
          id: "suthana-aiysha-maryam",
          name: "Ms. A. Suthana Aiysha Maryam",
          role: "Assistant Professor",
        },
        {
          id: "suberiya-begum",
          name: "Ms. S. Suberiya Begum",
          role: "Assistant Professor",
        },
        {
          id: "mohammed-zubair",
          name: "Mr. M. Mohammed Zubair",
          role: "Assistant Professor",
        },
      ],
    },
    {
      id: "students",
      label: "Student Coordinators",
      members: [
        {
          id: "abdul-mateen-danish",
          name: "Abdul Mateen Danish",
          role: "Student Coordinator",
        },
        {
          id: "mohamed-fawaz",
          name: "A. Mohamed Fawaz",
          role: "Student Coordinator",
        },
        {
          id: "yusrah-sakina",
          name: "Yusrah Sakina",
          role: "Student Coordinator",
        },
        {
          id: "mohamed-ashfaq-kuddus",
          name: "Mohamed Ashfaq Kuddus",
          role: "Student Coordinator",
        },
        {
          id: "syed-siddique-ahmed",
          name: "Syed Siddique Ahmed",
          role: "Student Coordinator",
        },
        { id: "kishore", name: "Kishore", role: "Student Coordinator" },
        { id: "vijay-hari", name: "Vijay Hari", role: "Student Coordinator" },
        { id: "keerthana", name: "V. Keerthana", role: "Student Coordinator" },
        { id: "syed-ishaaq", name: "Syed Ishaaq", role: "Student Coordinator" },
        { id: "joshitha", name: "N. Joshitha", role: "Student Coordinator" },
        {
          id: "anbu-mohamed",
          name: "A. Anbu Mohamed",
          role: "Student Coordinator",
        },
      ],
    },
    {
      id: "technical-coords",
      label: "Technical Event Coordinators",
      members: [],
    },
    {
      id: "nontechnical-coords",
      label: "Non-Technical Event Coordinators",
      members: [],
    },
  ] as CoordinatorGroup[],
  socialLinks: [
    {
      label: "Instagram",
      handle: "@talent.hunt.2k26",
      url: "https://www.instagram.com/talent.hunt.2k26/",
    },
  ],
  nav: [
    { to: "/", label: "Home" },
    { to: "/events/technical", label: "Technical Events" },
    { to: "/events/non-technical", label: "Non-Technical Events" },
    { to: "/schedule", label: "Schedule" },
    { to: "/coordinators", label: "Coordinators" },
    { to: "/about", label: "About" },
    { to: "/venue", label: "Venue" },
    { to: "/faqs", label: "FAQs" },
    { to: "/contact", label: "Contact" },
  ],
  categories: {
    technical: {
      title: "Technical Events",
      short: "Technical",
      headline: "THINK IT.\nBUILD IT.",
      intro:
        "Eight competitions. One place to bring your technical talent to the foreground.",
    },
    "non-technical": {
      title: "Non-Technical Events",
      short: "Non-Technical",
      headline: "BREAK THE\nEXPECTED.",
      intro: "Eight competitions. Explore the other side of Talent Hunt.",
    },
  },
  copy: {
    heroEyebrow: "THE STAGE IS YOURS.",
    heroTagline: "Bring your ideas. Bring your edge. Bring you.",
    introHeading: "ONE CAMPUS.\nEVERY KIND\nOF TALENT.",
    intro:
      "From the technical to the unexpected, find your place at Talent Hunt 2K26. Explore sixteen competitions brought together by the Department of Computer Science and Engineering.",
    eventDetailsPending:
      "Explore the competition. Detailed rules and participation information will be shared by the organisers.",
    registrationPending:
      "Registration information is temporarily unavailable. Please check the official brochure or try again later.",
    schedulePending:
      "The event date is confirmed. The detailed programme and timings will be announced by the organisers.",
    venuePending:
      "The brochure confirms the auditorium. Detailed campus directions have not yet been supplied.",
    about:
      "Talent Hunt 2K26 brings Technical and Non-Technical competitions together at Crescent. Presented by the Department of Computer Science and Engineering, under the School of Computer Information and Mathematical Sciences.",
    footerDescription: "Sixteen competitions. Your talent, in the spotlight.",
    privacy: [
      {
        title: "A public event website",
        text: "This website provides event information. It has no account system, contact-submission form, database, visitor analytics, advertising pixels or session-recording scripts. Fonts and artwork are served locally.",
      },
      {
        title: "Registration & external links",
        text: "The official Google Form handles registration submissions. This website does not submit or store student registration information or confirm a registration. Google and other external sites apply their own data practices when you follow a link.",
      },
      {
        title: "Storage in your browser",
        text: "Session storage remembers whether the opening animation has played and keeps navigation scroll positions for this browser tab. Local storage remembers individual dismissed announcement IDs. Search and filter choices appear in the page URL. If browser storage is unavailable, the website continues to work with temporary in-memory state.",
      },
      {
        title: "Sharing",
        text: "Copy Link writes the current page URL to your clipboard only when requested. Native Share opens your device’s share interface only when requested. No sharing data is sent to a website backend.",
      },
    ],
  },
  faqs: [
    {
      id: "eligibility",
      category: "Participation",
      question: "Who can participate?",
      answer:
        "Participation is restricted to Crescent students only. The official brochure specifies “ONLY FOR CSE,” so this site lists eligibility as Crescent CSE students.",
    },
    {
      id: "date",
      category: "The event",
      question: "When is Talent Hunt 2K26?",
      answer:
        "Monday, 26 October 2026, starting at 9:00 AM India Standard Time (IST).",
    },
    {
      id: "venue",
      category: "The event",
      question: "Where is the event happening?",
      answer:
        "The auditorium at B.S. Abdur Rahman Crescent, as listed in the official brochure.",
    },
    {
      id: "registration",
      category: "Participation",
      question: "How do I register?",
      answer:
        "Visit the Registration page to scan the official QR code or open the Google Form directly. Complete and submit the form to register. Participation is restricted to Crescent CSE students.",
    },
    {
      id: "rules",
      category: "Participation",
      question: "Where can I find competition rules?",
      answer:
        "Each competition has its own page. Verified rules and participation requirements will be added when supplied by the organisers.",
    },
  ] as FAQ[],
  pages: {
    "/": {
      title: "Talent Hunt 2K26 — The stage is yours",
      description:
        "Explore 16 Technical and Non-Technical competitions at Crescent. Talent Hunt 2K26, Monday 26 October 2026. For Crescent CSE students only.",
    },
    "/events/technical": {
      title: "Technical Events",
      description:
        "Explore the eight Technical competitions at Talent Hunt 2K26, in official brochure order.",
    },
    "/events/non-technical": {
      title: "Non-Technical Events",
      description:
        "Explore the eight Non-Technical competitions at Talent Hunt 2K26, in official brochure order.",
    },
    "/schedule": {
      title: "The Programme",
      description:
        "Confirmed event date and official programme information for Talent Hunt 2K26.",
    },
    "/register": {
      title: "Take Your Place",
      description:
        "Registration availability and eligibility for Talent Hunt 2K26 at Crescent.",
    },
    "/about": {
      title: "Made for Your Moment",
      description:
        "About Talent Hunt 2K26, presented by the Department of Computer Science and Engineering at Crescent.",
    },
    "/venue": {
      title: "See You at Crescent",
      description:
        "Official venue information for Talent Hunt 2K26 at the Crescent auditorium.",
    },
    "/faqs": {
      title: "Good Questions",
      description:
        "Verified answers about the date, venue, eligibility and registration for Talent Hunt 2K26.",
    },
    "/coordinators": {
      title: "Coordinators",
      description:
        "Faculty and student coordinators for Talent Hunt 2K26 at Crescent.",
    },
    "/contact": {
      title: "The People Behind It",
      description:
        "Verified organiser and convenor information for Talent Hunt 2K26.",
    },
    "/privacy": {
      title: "Privacy & Your Data",
      description:
        "How this public event site uses browser storage, sharing and external registration links.",
    },
    "/404": {
      title: "Page Not Found",
      description:
        "This page is outside the programme. Return to Talent Hunt 2K26.",
      noindex: true,
    },
  } as Record<string, Metadata>,
};
