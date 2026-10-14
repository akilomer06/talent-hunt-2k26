# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: countdown.spec.ts >> the India-time countdown ticks and survives a page refresh
- Location: tests\countdown.spec.ts:17:1

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator: locator('.countdown[aria-label="Time until event"]').locator('strong')
Timeout: 5000ms
- Expected  - 6
+ Received  + 1

- Array [
-   "12",
-   "00",
-   "00",
-   "00",
- ]
+ Array []

Call log:
  - Expect "toHaveText" locator('.countdown[aria-label="Time until event"]').locator('strong') with timeout 5000ms
  - waiting for locator('.countdown[aria-label="Time until event"]').locator('strong')
    14 × locator resolved to 0 elements

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - link "Skip to content" [ref=e3] [cursor=pointer]:
    - /url: "#main"
  - banner [ref=e4]:
    - link "Talent Hunt 2K26 home" [ref=e5] [cursor=pointer]:
      - /url: /
      - generic [ref=e6]:
        - text: TALENT HUNT
        - generic [ref=e7]: 2K26 / CRESCENT
    - navigation "Main navigation" [ref=e8]:
      - link "Home" [ref=e9] [cursor=pointer]:
        - /url: /
      - link "Technical Events" [ref=e10] [cursor=pointer]:
        - /url: /events/technical
      - link "Non-Technical Events" [ref=e11] [cursor=pointer]:
        - /url: /events/non-technical
      - link "Schedule" [ref=e12] [cursor=pointer]:
        - /url: /schedule
      - link "Coordinators" [ref=e13] [cursor=pointer]:
        - /url: /coordinators
      - link "About" [ref=e14] [cursor=pointer]:
        - /url: /about
      - link "Venue" [ref=e15] [cursor=pointer]:
        - /url: /venue
      - link "FAQs" [ref=e16] [cursor=pointer]:
        - /url: /faqs
      - link "Contact" [ref=e17] [cursor=pointer]:
        - /url: /contact
    - link "Register" [ref=e18] [cursor=pointer]:
      - /url: /register
      - text: Register
      - generic [aria-hidden] [ref=e19]: ↗
  - main [ref=e20]:
    - generic [ref=e22]:
      - generic [ref=e23]:
        - generic [ref=e24]:
          - paragraph [ref=e25]:
            - text: School of Computer Information and Mathematical Sciences
            - strong [ref=e26]: Department of Computer Science and Engineering
          - img "B.S. Abdur Rahman Crescent Institute of Science & Technology" [ref=e27]
        - generic [ref=e28]:
          - generic [ref=e29]:
            - paragraph [ref=e31]: THE STAGE IS YOURS.
            - heading "TALENT HUNT 2K26" [level=1] [ref=e34]:
              - generic [ref=e35]: TALENT
              - generic [ref=e36]:
                - text: HUNT
                - generic [ref=e37]: 2K26
            - paragraph [ref=e39]: Bring your ideas. Bring your edge. Bring you.
            - generic [ref=e40]:
              - generic [ref=e41]:
                - link "Explore Events" [ref=e42] [cursor=pointer]:
                  - /url: /#competitions
                  - text: Explore Events
                  - generic [aria-hidden] [ref=e43]: ↗
                - link "Register Now" [ref=e44] [cursor=pointer]:
                  - /url: /register
                  - text: Register Now
                  - generic [aria-hidden] [ref=e45]: ↗
              - paragraph [ref=e46]: ◈ For Crescent CSE students only
          - generic [ref=e47]:
            - generic [ref=e48]:
              - generic [ref=e49]: THE OFFICIAL DROP
              - generic [aria-hidden] [ref=e50]: ↘
            - link "View the official Talent Hunt brochure" [ref=e51] [cursor=pointer]:
              - /url: /assets/documents/brochure-qr.jpg
              - img "Official Talent Hunt 2K26 brochure" [ref=e52]
            - generic [ref=e53]:
              - generic [ref=e54]: 16 EVENTS
              - generic [ref=e55]: ONE STAGE ↗
            - generic [aria-hidden] [ref=e56]: CREATE / COMPETE / EXPRESS
        - generic [ref=e57]:
          - generic [ref=e58]: TECHNICAL × NON-TECHNICAL
          - link "SCROLL TO EXPLORE" [ref=e59] [cursor=pointer]:
            - /url: "#competitions"
            - text: SCROLL TO EXPLORE
            - generic [aria-hidden] [ref=e60]: ↓
      - region "Event date" [ref=e62]:
        - generic [ref=e63]:
          - generic [ref=e64]: "26"
          - generic [ref=e65]:
            - strong [ref=e66]: OCTOBER 2026
            - generic [ref=e67]: MONDAY
        - generic [ref=e68]:
          - text: MARK YOUR CALENDAR
          - paragraph [ref=e69]: The date is set. Your moment is next.
        - generic [ref=e70]:
          - generic [aria-hidden] [ref=e71]: ↗
          - generic [ref=e72]:
            - strong [ref=e73]: AUDITORIUM
            - generic [ref=e74]: B.S. Abdur Rahman Crescent
      - generic [ref=e75]:
        - generic [ref=e76]:
          - paragraph [ref=e77]: NOT JUST ANOTHER DAY ON CAMPUS
          - heading "ONE CAMPUS. EVERY KIND OF TALENT." [level=2] [ref=e79]
        - generic [ref=e80]:
          - generic [aria-hidden] [ref=e81]: ✳
          - paragraph [ref=e82]: From the technical to the unexpected, find your place at Talent Hunt 2K26. Explore sixteen competitions brought together by the Department of Computer Science and Engineering.
          - link "View Official Brochure" [ref=e83] [cursor=pointer]:
            - /url: /assets/documents/brochure-qr.jpg
            - text: View Official Brochure
            - generic [aria-hidden] [ref=e84]: ↗
      - generic [ref=e86]:
        - generic [ref=e87]: THINK. CREATE. COMPETE. REPEAT. ↗
        - generic [ref=e88]: THINK. CREATE. COMPETE. REPEAT. ↗
      - generic [ref=e89]:
        - generic [ref=e90]:
          - generic [ref=e91]:
            - paragraph [ref=e92]: 01 / FIND YOUR ARENA
            - heading "TECHNICAL." [level=2] [ref=e93]
          - link "View all events" [ref=e94] [cursor=pointer]:
            - /url: /events/technical
            - text: View all events
            - generic [aria-hidden] [ref=e95]: ↗
        - generic [ref=e96]:
          - article [ref=e97]:
            - link "Explore Code Break" [ref=e98] [cursor=pointer]:
              - /url: /events/code-break
              - generic [ref=e99]:
                - generic [ref=e100]: Technical
                - generic [ref=e102]: "#01"
              - generic [aria-hidden] [ref=e104]:
                - generic: Code Break
                - generic: "01"
                - generic [ref=e112]:
                  - generic [ref=e113]: +
                  - text: TH / 26
              - generic [ref=e115]:
                - generic [ref=e116]:
                  - generic [ref=e117]: 2026 EDITION
                  - generic [ref=e118]: TECH ARENA
                  - generic "Event Venue" [ref=e119]: 📍 Venue TBA
                - heading "Code Break" [level=3] [ref=e120]
                - paragraph [ref=e121]: Algorithmic challenges, code debugging, and speed programming showdown.
                - generic [ref=e122]:
                  - generic [ref=e123]:
                    - generic [ref=e124]: Explore Event
                    - generic [ref=e125]: Brochure Official
                  - generic [aria-hidden] [ref=e127]: ↗
          - article [ref=e128]:
            - link "Explore Code Canvas" [ref=e129] [cursor=pointer]:
              - /url: /events/code-canvas
              - generic [ref=e130]:
                - generic [ref=e131]: Technical
                - generic [ref=e133]: "#02"
              - generic [aria-hidden] [ref=e135]:
                - generic: Code Canvas
                - generic: "02"
                - generic [ref=e144]:
                  - generic [ref=e145]: +
                  - text: TH / 26
              - generic [ref=e147]:
                - generic [ref=e148]:
                  - generic [ref=e149]: 2026 EDITION
                  - generic [ref=e150]: TECH ARENA
                  - generic "Event Venue" [ref=e151]: 📍 Venue TBA
                - heading "Code Canvas" [level=3] [ref=e152]
                - paragraph [ref=e153]: Where AI Meets Agile Coding! Organized by CSE CODING CLUB.
                - generic [ref=e154]:
                  - generic [ref=e155]:
                    - generic [ref=e156]: Explore Event
                    - generic [ref=e157]: Brochure Official
                  - generic [aria-hidden] [ref=e159]: ↗
          - article [ref=e160]:
            - link "Explore Neural Nexus" [ref=e161] [cursor=pointer]:
              - /url: /events/neural-nexus
              - generic [ref=e162]:
                - generic [ref=e163]: Technical
                - generic [ref=e165]: "#03"
              - generic [aria-hidden] [ref=e167]:
                - generic: Neural Nexus
                - generic: "03"
                - generic [ref=e180]:
                  - generic [ref=e181]: +
                  - text: TH / 26
              - generic [ref=e183]:
                - generic [ref=e184]:
                  - generic [ref=e185]: 2026 EDITION
                  - generic [ref=e186]: TECH ARENA
                  - generic "Event Venue" [ref=e187]: 📍 Venue TBA
                - heading "Neural Nexus" [level=3] [ref=e188]
                - paragraph [ref=e189]: Deep learning models, neural architecture challenges, and AI problem solving.
                - generic [ref=e190]:
                  - generic [ref=e191]:
                    - generic [ref=e192]: Explore Event
                    - generic [ref=e193]: Brochure Official
                  - generic [aria-hidden] [ref=e195]: ↗
          - article [ref=e196]:
            - link "Explore Binary Battle" [ref=e197] [cursor=pointer]:
              - /url: /events/binary-battle
              - generic [ref=e198]:
                - generic [ref=e199]: Technical
                - generic [ref=e201]: "#04"
              - generic [aria-hidden] [ref=e203]:
                - generic: Binary Battle
                - generic: "04"
                - generic [ref=e215]:
                  - generic [ref=e216]: +
                  - text: TH / 26
              - generic [ref=e218]:
                - generic [ref=e219]:
                  - generic [ref=e220]: 2026 EDITION
                  - generic [ref=e221]: TECH ARENA
                  - generic "Event Venue" [ref=e222]: 📍 ES 304
                - heading "Binary Battle" [level=3] [ref=e223]
                - paragraph [ref=e224]: High-stakes binary decoding, technical puzzles, and product advertising showdown.
                - generic [ref=e225]:
                  - generic [ref=e226]:
                    - generic [ref=e227]: Explore Event
                    - generic [ref=e228]: Brochure Official
                  - generic [aria-hidden] [ref=e230]: ↗
          - article [ref=e231]:
            - link "Explore Game Craft" [ref=e232] [cursor=pointer]:
              - /url: /events/game-craft
              - generic [ref=e233]:
                - generic [ref=e234]: Technical
                - generic [ref=e236]: "#05"
              - generic [aria-hidden] [ref=e238]:
                - generic: Game Craft
                - generic: "05"
                - generic [ref=e249]:
                  - generic [ref=e250]: +
                  - text: TH / 26
              - generic [ref=e252]:
                - generic [ref=e253]:
                  - generic [ref=e254]: 2026 EDITION
                  - generic [ref=e255]: TECH ARENA
                  - generic "Event Venue" [ref=e256]: 📍 Venue TBA
                - heading "Game Craft" [level=3] [ref=e257]
                - paragraph [ref=e258]: Game design, interactive mechanics, and rapid engine prototyping arena.
                - generic [ref=e259]:
                  - generic [ref=e260]:
                    - generic [ref=e261]: Explore Event
                    - generic [ref=e262]: Brochure Official
                  - generic [aria-hidden] [ref=e264]: ↗
          - article [ref=e265]:
            - link "Explore Tech Talks" [ref=e266] [cursor=pointer]:
              - /url: /events/tech-talks
              - generic [ref=e267]:
                - generic [ref=e268]: Technical
                - generic [ref=e270]: "#06"
              - generic [aria-hidden] [ref=e272]:
                - generic: Tech Talks
                - generic: "06"
                - generic [ref=e281]:
                  - generic [ref=e282]: +
                  - text: TH / 26
              - generic [ref=e284]:
                - generic [ref=e285]:
                  - generic [ref=e286]: 2026 EDITION
                  - generic [ref=e287]: TECH ARENA
                  - generic "Event Venue" [ref=e288]: 📍 Venue TBA
                - heading "Tech Talks" [level=3] [ref=e289]
                - paragraph [ref=e290]: Keynotes, emerging technology debates, and technical paper presentations.
                - generic [ref=e291]:
                  - generic [ref=e292]:
                    - generic [ref=e293]: Explore Event
                    - generic [ref=e294]: Brochure Official
                  - generic [aria-hidden] [ref=e296]: ↗
          - article [ref=e297]:
            - link "Explore Cyber Breach" [ref=e298] [cursor=pointer]:
              - /url: /events/cyber-breach
              - generic [ref=e299]:
                - generic [ref=e300]: Technical
                - generic [ref=e302]: "#07"
              - generic [aria-hidden] [ref=e304]:
                - generic: Cyber Breach
                - generic: "07"
                - generic [ref=e313]:
                  - generic [ref=e314]: +
                  - text: TH / 26
              - generic [ref=e316]:
                - generic [ref=e317]:
                  - generic [ref=e318]: 2026 EDITION
                  - generic [ref=e319]: TECH ARENA
                  - generic "Event Venue" [ref=e320]: 📍 Venue TBA
                - heading "Cyber Breach" [level=3] [ref=e321]
                - paragraph [ref=e322]: Capture The Flag (CTF), cybersecurity vulnerabilities, and ethical hacking sprint.
                - generic [ref=e323]:
                  - generic [ref=e324]:
                    - generic [ref=e325]: Explore Event
                    - generic [ref=e326]: Brochure Official
                  - generic [aria-hidden] [ref=e328]: ↗
          - article [ref=e329]:
            - link "Explore Prompt Pop" [ref=e330] [cursor=pointer]:
              - /url: /events/prompt-pop
              - generic [ref=e331]:
                - generic [ref=e332]: Technical
                - generic [ref=e334]: "#08"
              - generic [aria-hidden] [ref=e336]:
                - generic: Prompt Pop
                - generic: "08"
                - generic [ref=e345]:
                  - generic [ref=e346]: +
                  - text: TH / 26
              - generic [ref=e348]:
                - generic [ref=e349]:
                  - generic [ref=e350]: 2026 EDITION
                  - generic [ref=e351]: TECH ARENA
                  - generic "Event Venue" [ref=e352]: 📍 Venue TBA
                - heading "Prompt Pop" [level=3] [ref=e353]
                - paragraph [ref=e354]: Generative AI prompt engineering, image synthesis, and prompt battle arena.
                - generic [ref=e355]:
                  - generic [ref=e356]:
                    - generic [ref=e357]: Explore Event
                    - generic [ref=e358]: Brochure Official
                  - generic [aria-hidden] [ref=e360]: ↗
      - generic [ref=e361]:
        - generic [ref=e362]:
          - generic [ref=e363]:
            - paragraph [ref=e364]: 02 / FIND YOUR ARENA
            - heading "BEYOND THE CODE." [level=2] [ref=e365]
          - link "View all events" [ref=e366] [cursor=pointer]:
            - /url: /events/non-technical
            - text: View all events
            - generic [aria-hidden] [ref=e367]: ↗
        - generic [ref=e368]:
          - article [ref=e369]:
            - link "Explore Shutter Verse" [ref=e370] [cursor=pointer]:
              - /url: /events/shutter-verse
              - generic [ref=e371]:
                - generic [ref=e372]: Non-Technical
                - generic [ref=e374]: "#01"
              - generic [aria-hidden] [ref=e376]:
                - generic: Shutter Verse
                - generic: "01"
                - generic [ref=e386]:
                  - generic [ref=e387]: +
                  - text: TH / 26
              - generic [ref=e389]:
                - generic [ref=e390]:
                  - generic [ref=e391]: 2026 EDITION
                  - generic [ref=e392]: OPEN ARENA
                  - generic "Event Venue" [ref=e393]: 📍 Venue TBA
                - heading "Shutter Verse" [level=3] [ref=e394]
                - paragraph [ref=e395]: Campus photography, visual storytelling, and cinematic mobile framing.
                - generic [ref=e396]:
                  - generic [ref=e397]:
                    - generic [ref=e398]: Explore Event
                    - generic [ref=e399]: Brochure Official
                  - generic [aria-hidden] [ref=e401]: ↗
          - article [ref=e402]:
            - link "Explore Clue Code" [ref=e403] [cursor=pointer]:
              - /url: /events/clue-code
              - generic [ref=e404]:
                - generic [ref=e405]: Non-Technical
                - generic [ref=e407]: "#02"
              - generic [aria-hidden] [ref=e409]:
                - generic: Clue Code
                - generic: "02"
                - generic [ref=e418]:
                  - generic [ref=e419]: +
                  - text: TH / 26
              - generic [ref=e421]:
                - generic [ref=e422]:
                  - generic [ref=e423]: 2026 EDITION
                  - generic [ref=e424]: OPEN ARENA
                  - generic "Event Venue" [ref=e425]: 📍 Venue TBA
                - heading "Clue Code" [level=3] [ref=e426]
                - paragraph [ref=e427]: Campus treasure hunt, cryptic clues, and riddle-solving adventure.
                - generic [ref=e428]:
                  - generic [ref=e429]:
                    - generic [ref=e430]: Explore Event
                    - generic [ref=e431]: Brochure Official
                  - generic [aria-hidden] [ref=e433]: ↗
          - article [ref=e434]:
            - link "Explore Trashion" [ref=e435] [cursor=pointer]:
              - /url: /events/trashion
              - generic [ref=e436]:
                - generic [ref=e437]: Non-Technical
                - generic [ref=e439]: "#03"
              - generic [aria-hidden] [ref=e441]:
                - generic: Trashion
                - generic: "03"
                - generic [ref=e449]:
                  - generic [ref=e450]: +
                  - text: TH / 26
              - generic [ref=e452]:
                - generic [ref=e453]:
                  - generic [ref=e454]: 2026 EDITION
                  - generic [ref=e455]: OPEN ARENA
                  - generic "Event Venue" [ref=e456]: 📍 Venue TBA
                - heading "Trashion" [level=3] [ref=e457]
                - paragraph [ref=e458]: Fashion from Reusable and Recycled Materials · Redefining Fashion. Reimagining Waste.
                - generic [ref=e459]:
                  - generic [ref=e460]:
                    - generic [ref=e461]: Explore Event
                    - generic [ref=e462]: Brochure Official
                  - generic [aria-hidden] [ref=e464]: ↗
          - article [ref=e465]:
            - link "Explore The Voice Over" [ref=e466] [cursor=pointer]:
              - /url: /events/the-voice-over
              - generic [ref=e467]:
                - generic [ref=e468]: Non-Technical
                - generic [ref=e470]: "#04"
              - generic [aria-hidden] [ref=e472]:
                - generic: The Voice Over
                - generic: "04"
                - generic [ref=e481]:
                  - generic [ref=e482]: +
                  - text: TH / 26
              - generic [ref=e484]:
                - generic [ref=e485]:
                  - generic [ref=e486]: 2026 EDITION
                  - generic [ref=e487]: OPEN ARENA
                  - generic "Event Venue" [ref=e488]: 📍 Venue TBA
                - heading "The Voice Over" [level=3] [ref=e489]
                - paragraph [ref=e490]: Voice dubbing, mimicry, cinematic dialogues, and dynamic audio modulation.
                - generic [ref=e491]:
                  - generic [ref=e492]:
                    - generic [ref=e493]: Explore Event
                    - generic [ref=e494]: Brochure Official
                  - generic [aria-hidden] [ref=e496]: ↗
          - article [ref=e497]:
            - link "Explore BGMI" [ref=e498] [cursor=pointer]:
              - /url: /events/bgmi
              - generic [ref=e499]:
                - generic [ref=e500]: Non-Technical
                - generic [ref=e502]: "#05"
              - generic [aria-hidden] [ref=e504]:
                - generic: BGMI
                - generic: "05"
                - generic [ref=e512]:
                  - generic [ref=e513]: +
                  - text: TH / 26
              - generic [ref=e515]:
                - generic [ref=e516]:
                  - generic [ref=e517]: 2026 EDITION
                  - generic [ref=e518]: OPEN ARENA
                  - generic "Event Venue" [ref=e519]: 📍 Venue TBA
                - heading "BGMI" [level=3] [ref=e520]
                - paragraph [ref=e521]: Arcane Esports Portal · Official Collegiate BGMI Championship.
                - generic [ref=e522]:
                  - generic [ref=e523]:
                    - generic [ref=e524]: Explore Event
                    - generic [ref=e525]: Brochure Official
                  - generic [aria-hidden] [ref=e527]: ↗
          - article [ref=e528]:
            - link "Explore FIFA" [ref=e529] [cursor=pointer]:
              - /url: /events/fifa
              - generic [ref=e530]:
                - generic [ref=e531]: Non-Technical
                - generic [ref=e533]: "#06"
              - generic [aria-hidden] [ref=e535]:
                - generic: FIFA
                - generic: "06"
                - generic [ref=e544]:
                  - generic [ref=e545]: +
                  - text: TH / 26
              - generic [ref=e547]:
                - generic [ref=e548]:
                  - generic [ref=e549]: 2026 EDITION
                  - generic [ref=e550]: OPEN ARENA
                  - generic "Event Venue" [ref=e551]: 📍 Venue TBA
                - heading "FIFA" [level=3] [ref=e552]
                - paragraph [ref=e553]: Virtual football esports tournament on console / controllers.
                - generic [ref=e554]:
                  - generic [ref=e555]:
                    - generic [ref=e556]: Explore Event
                    - generic [ref=e557]: Brochure Official
                  - generic [aria-hidden] [ref=e559]: ↗
          - article [ref=e560]:
            - link "Explore Valorant" [ref=e561] [cursor=pointer]:
              - /url: /events/valorant
              - generic [ref=e562]:
                - generic [ref=e563]: Non-Technical
                - generic [ref=e565]: "#07"
              - generic [aria-hidden] [ref=e567]:
                - generic: Valorant
                - generic: "07"
                - generic [ref=e576]:
                  - generic [ref=e577]: +
                  - text: TH / 26
              - generic [ref=e579]:
                - generic [ref=e580]:
                  - generic [ref=e581]: 2026 EDITION
                  - generic [ref=e582]: OPEN ARENA
                  - generic "Event Venue" [ref=e583]: 📍 Venue TBA
                - heading "Valorant" [level=3] [ref=e584]
                - paragraph [ref=e585]: 5v5 tactical shooter esports showdown in custom spike-rush / standard lobby.
                - generic [ref=e586]:
                  - generic [ref=e587]:
                    - generic [ref=e588]: Explore Event
                    - generic [ref=e589]: Brochure Official
                  - generic [aria-hidden] [ref=e591]: ↗
          - article [ref=e592]:
            - link "Explore Bid Wars" [ref=e593] [cursor=pointer]:
              - /url: /events/bid-wars
              - generic [ref=e594]:
                - generic [ref=e595]: Non-Technical
                - generic [ref=e597]: "#08"
              - generic [aria-hidden] [ref=e599]:
                - generic: Bid Wars
                - generic: "08"
                - generic [ref=e607]:
                  - generic [ref=e608]: +
                  - text: TH / 26
              - generic [ref=e610]:
                - generic [ref=e611]:
                  - generic [ref=e612]: 2026 EDITION
                  - generic [ref=e613]: OPEN ARENA
                  - generic "Event Venue" [ref=e614]: 📍 Venue TBA
                - heading "Bid Wars" [level=3] [ref=e615]
                - paragraph [ref=e616]: IPL-style auction strategy, virtual bidding war, and squad budgeting.
                - generic [ref=e617]:
                  - generic [ref=e618]:
                    - generic [ref=e619]: Explore Event
                    - generic [ref=e620]: Brochure Official
                  - generic [aria-hidden] [ref=e622]: ↗
      - region "Featured events" [ref=e624]:
        - generic [ref=e625]:
          - paragraph [ref=e626]: IN THE SPOTLIGHT
          - heading [level=2] [ref=e628]:
            - text: FIND YOUR
            - emphasis [ref=e629]: MAIN EVENT.
          - generic [ref=e630]:
            - button "Previous featured event" [ref=e631] [cursor=pointer]: ←
            - generic [ref=e632]: 01 / 04
            - button "Next featured event" [ref=e633] [cursor=pointer]: →
            - button "Pause" [ref=e634] [cursor=pointer]
        - link [ref=e637] [cursor=pointer]:
          - /url: /events/code-break
          - generic [aria-hidden] [ref=e639]:
            - generic: Code Break
            - generic: "01"
            - generic [ref=e647]:
              - generic [ref=e648]: +
              - text: TH / 26
          - text: Technical
          - heading "Code Break" [level=3] [ref=e650]:
            - text: Code Break
            - generic [aria-hidden] [ref=e651]: ↗
      - generic [ref=e652]:
        - generic [ref=e653]:
          - generic [ref=e654]:
            - paragraph [ref=e655]: THE PROGRAMME
            - heading "A DATE WITH POSSIBILITY." [level=2] [ref=e657]: A DATE WITHPOSSIBILITY.
          - link "View Schedule" [ref=e658] [cursor=pointer]:
            - /url: /schedule
            - text: View Schedule
            - generic [aria-hidden] [ref=e659]: ↗
        - generic [ref=e661]:
          - generic [ref=e663]:
            - strong [ref=e664]: 26 OCT
            - text: MONDAY / 2026
          - generic [ref=e665]:
            - heading "A day for your talent." [level=3] [ref=e666]
            - paragraph [ref=e667]: The event date is confirmed. The detailed programme and timings will be announced by the organisers.
      - generic [ref=e668]:
        - generic [ref=e669]:
          - generic [ref=e670]: ↗
          - generic [ref=e672]: CRESCENT / AUDITORIUM
        - generic [ref=e673]:
          - paragraph [ref=e674]: MEET AT THE AUDITORIUM
          - heading "THIS IS THE PLACE." [level=2] [ref=e676]: THIS ISTHE PLACE.
          - paragraph [ref=e677]: Auditorium · B.S. Abdur Rahman Crescent
          - link "Venue Details" [ref=e678] [cursor=pointer]:
            - /url: /venue
            - text: Venue Details
            - generic [aria-hidden] [ref=e679]: ↗
      - generic [ref=e680]:
        - generic [ref=e681]:
          - paragraph [ref=e682]: BEFORE YOU STEP IN
          - heading "GOOD QUESTIONS." [level=2] [ref=e684]: GOODQUESTIONS.
          - link "All FAQs" [ref=e685] [cursor=pointer]:
            - /url: /faqs
            - text: All FAQs
            - generic [aria-hidden] [ref=e686]: ↗
        - generic [ref=e687]:
          - heading [level=3] [ref=e689]:
            - button "Who can participate?" [ref=e690] [cursor=pointer]:
              - text: Who can participate?
              - generic [aria-hidden] [ref=e691]: +
          - heading [level=3] [ref=e693]:
            - button "When is Talent Hunt 2K26?" [ref=e694] [cursor=pointer]:
              - text: When is Talent Hunt 2K26?
              - generic [aria-hidden] [ref=e695]: +
          - heading [level=3] [ref=e697]:
            - button "Where is the event happening?" [ref=e698] [cursor=pointer]:
              - text: Where is the event happening?
              - generic [aria-hidden] [ref=e699]: +
  - contentinfo [ref=e700]:
    - generic [ref=e701]:
      - generic [ref=e702]:
        - paragraph [ref=e703]: YOUR TALENT. YOUR MOMENT.
        - link "TALENT HUNT 2K26" [ref=e704] [cursor=pointer]:
          - /url: /
          - text: TALENT HUNT
          - generic [ref=e705]: 2K26
        - paragraph [ref=e706]: Sixteen competitions. Your talent, in the spotlight.
      - generic [ref=e707]:
        - heading "Explore" [level=2] [ref=e708]
        - link "Technical Events" [ref=e709] [cursor=pointer]:
          - /url: /events/technical
        - link "Non-Technical Events" [ref=e710] [cursor=pointer]:
          - /url: /events/non-technical
        - link "Schedule" [ref=e711] [cursor=pointer]:
          - /url: /schedule
        - link "Coordinators" [ref=e712] [cursor=pointer]:
          - /url: /coordinators
        - link "About" [ref=e713] [cursor=pointer]:
          - /url: /about
        - link "Venue" [ref=e714] [cursor=pointer]:
          - /url: /venue
        - link "FAQs" [ref=e715] [cursor=pointer]:
          - /url: /faqs
        - link "Contact" [ref=e716] [cursor=pointer]:
          - /url: /contact
      - generic [ref=e717]:
        - heading "Stay connected" [level=2] [ref=e718]
        - link "@talent.hunt.2k26 ↗" [ref=e719] [cursor=pointer]:
          - /url: https://www.instagram.com/talent.hunt.2k26/
        - link "View Official Brochure" [ref=e720] [cursor=pointer]:
          - /url: /assets/documents/brochure-qr.jpg
          - text: View Official Brochure
          - generic [aria-hidden] [ref=e721]: ↗
        - link "Registration ↗" [ref=e722] [cursor=pointer]:
          - /url: /register
        - link "Privacy & your data" [ref=e723] [cursor=pointer]:
          - /url: /privacy
    - generic [ref=e724]:
      - img "B.S. Abdur Rahman Crescent Institute of Science & Technology" [ref=e725]
      - img "CSEA" [ref=e726]
      - img "ACM" [ref=e727]
      - paragraph [ref=e728]: School of Computer Information and Mathematical SciencesDepartment of Computer Science and Engineering
    - generic [ref=e729]:
      - generic [ref=e730]: TALENT HUNT 2K26 · Department of Computer Science and Engineering
      - button "Replay Opening Intro ↺" [ref=e731] [cursor=pointer]
      - generic [ref=e732]: For Crescent CSE students only ↗
```

# Test source

```ts
  1  | import { test, expect, type Page } from "@playwright/test";
  2  | 
  3  | const caption = "26 October · 9:00 AM IST";
  4  | const completion = "The countdown has ended. Explore Talent Hunt 2K26.";
  5  | 
  6  | async function pauseClock(page: Page, instant: string) {
  7  |   const time = new Date(instant);
  8  |   await page.clock.install({ time: new Date(time.getTime() - 1000) });
  9  |   await page.clock.pauseAt(time);
  10 | }
  11 | 
  12 | test.beforeEach(async ({ page }) => {
  13 |   await page.addInitScript(() => sessionStorage.setItem("th26:intro", "seen"));
  14 |   await page.emulateMedia({ reducedMotion: "reduce" });
  15 | });
  16 | 
  17 | test("the India-time countdown ticks and survives a page refresh", async ({
  18 |   page,
  19 | }) => {
  20 |   await pauseClock(page, "2026-10-14T03:30:00Z");
  21 |   await page.goto("/");
  22 |   const timer = page.locator('.countdown[aria-label="Time until event"]');
  23 |   const digits = timer.locator("strong");
> 24 |   await expect(digits).toHaveText(["12", "00", "00", "00"]);
     |                        ^ Error: expect(locator).toHaveText(expected) failed
  25 |   await expect(page.locator(".date-strip")).toContainText(caption);
  26 | 
  27 |   await page.clock.runFor(1000);
  28 |   await expect(digits).toHaveText(["11", "23", "59", "59"]);
  29 | 
  30 |   await page.reload();
  31 |   await expect(digits).toHaveText(["11", "23", "59", "59"]);
  32 |   await expect(page.locator(".date-strip")).toContainText(caption);
  33 | });
  34 | 
  35 | test("the timer ends exactly at 9 AM IST and the archive waits until the date ends", async ({
  36 |   page,
  37 | }) => {
  38 |   await pauseClock(page, "2026-10-26T03:29:58Z");
  39 |   await page.goto("/schedule");
  40 |   const strip = page.locator(".date-strip");
  41 |   const timer = strip.locator('.countdown[aria-label="Time until event"]');
  42 |   await expect(timer.locator("strong")).toHaveText(["00", "00", "00", "02"]);
  43 | 
  44 |   await page.clock.runFor(1000);
  45 |   await expect(timer.locator("strong")).toHaveText(["00", "00", "00", "01"]);
  46 |   await page.clock.runFor(1000);
  47 |   await expect(timer).toHaveCount(0);
  48 |   await expect(strip).toContainText(completion);
  49 | 
  50 |   await page.reload();
  51 |   await expect(timer).toHaveCount(0);
  52 |   await expect(strip).toContainText(completion);
  53 |   await page.clock.runFor(1000);
  54 |   await expect(strip).toContainText(completion);
  55 | 
  56 |   await page.clock.setFixedTime(new Date("2026-10-26T18:29:59Z"));
  57 |   await page.reload();
  58 |   await expect(strip).toContainText(completion);
  59 |   await page.clock.setFixedTime(new Date("2026-10-26T18:30:00Z"));
  60 |   await page.reload();
  61 |   await expect(strip).toContainText(
  62 |     "The 2026 edition has concluded. Explore the event archive.",
  63 |   );
  64 | });
  65 | 
  66 | test("all four countdown units fit the homepage and schedule on small phones", async ({
  67 |   page,
  68 | }) => {
  69 |   await pauseClock(page, "2026-10-14T03:30:00Z");
  70 |   for (const width of [320, 390]) {
  71 |     await page.setViewportSize({ width, height: 844 });
  72 |     for (const path of ["/", "/schedule"]) {
  73 |       await page.goto(path);
  74 |       const timer = page.locator('.countdown[aria-label="Time until event"]');
  75 |       const digits = timer.locator("strong");
  76 |       await expect(digits).toHaveText(["12", "00", "00", "00"]);
  77 |       await timer.scrollIntoViewIfNeeded();
  78 |       for (const digit of await digits.all()) {
  79 |         await expect(digit).toBeInViewport();
  80 |       }
  81 |       const strip = page.locator(".date-strip");
  82 |       await expect(strip).toContainText(caption);
  83 |       expect(
  84 |         await strip.evaluate(
  85 |           (element) => element.scrollWidth <= element.clientWidth,
  86 |         ),
  87 |         `${path} countdown at ${width}px`,
  88 |       ).toBe(true);
  89 |       expect(
  90 |         await page.evaluate(
  91 |           () => document.documentElement.scrollWidth <= innerWidth,
  92 |         ),
  93 |         `${path} page at ${width}px`,
  94 |       ).toBe(true);
  95 |     }
  96 |   }
  97 | });
  98 | 
```