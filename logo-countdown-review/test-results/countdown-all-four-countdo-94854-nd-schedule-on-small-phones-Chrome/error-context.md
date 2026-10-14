# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: countdown.spec.ts >> all four countdown units fit the homepage and schedule on small phones
- Location: tests\countdown.spec.ts:66:1

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
    - link "Register" [ref=e8] [cursor=pointer]:
      - /url: /register
      - text: Register
      - generic [aria-hidden] [ref=e9]: ↗
    - button "Menu" [ref=e10] [cursor=pointer]: Menu ☰
  - main [ref=e11]:
    - generic [ref=e13]:
      - generic [ref=e14]:
        - generic [ref=e15]:
          - paragraph [ref=e16]:
            - text: School of Computer Information and Mathematical Sciences
            - strong [ref=e17]: Department of Computer Science and Engineering
          - img "B.S. Abdur Rahman Crescent Institute of Science & Technology" [ref=e18]
        - generic [ref=e20]:
          - paragraph [ref=e22]: THE STAGE IS YOURS.
          - heading "TALENT HUNT 2K26" [level=1] [ref=e25]:
            - generic [ref=e26]: TALENT
            - generic [ref=e27]:
              - text: HUNT
              - generic [ref=e28]: 2K26
          - paragraph [ref=e30]: Bring your ideas. Bring your edge. Bring you.
          - generic [ref=e31]:
            - generic [ref=e32]:
              - link "Explore Events" [ref=e33] [cursor=pointer]:
                - /url: /#competitions
                - text: Explore Events
                - generic [aria-hidden] [ref=e34]: ↗
              - link "Register Now" [ref=e35] [cursor=pointer]:
                - /url: /register
                - text: Register Now
                - generic [aria-hidden] [ref=e36]: ↗
            - paragraph [ref=e37]: ◈ For Crescent CSE students only
        - generic [ref=e38]:
          - generic [ref=e39]: TECHNICAL × NON-TECHNICAL
          - link "SCROLL TO EXPLORE" [ref=e40] [cursor=pointer]:
            - /url: "#competitions"
            - text: SCROLL TO EXPLORE
            - generic [aria-hidden] [ref=e41]: ↓
      - region "Event date" [ref=e43]:
        - generic [ref=e44]:
          - generic [ref=e45]: "26"
          - generic [ref=e46]:
            - strong [ref=e47]: OCTOBER 2026
            - generic [ref=e48]: MONDAY
        - generic [ref=e49]:
          - generic [aria-hidden] [ref=e50]: ↗
          - generic [ref=e51]:
            - strong [ref=e52]: AUDITORIUM
            - generic [ref=e53]: B.S. Abdur Rahman Crescent
      - generic [ref=e54]:
        - generic [ref=e55]:
          - paragraph [ref=e56]: NOT JUST ANOTHER DAY ON CAMPUS
          - heading "ONE CAMPUS. EVERY KIND OF TALENT." [level=2] [ref=e58]
        - generic [ref=e59]:
          - generic [aria-hidden] [ref=e60]: ✳
          - paragraph [ref=e61]: From the technical to the unexpected, find your place at Talent Hunt 2K26. Explore sixteen competitions brought together by the Department of Computer Science and Engineering.
          - link "View Official Brochure" [ref=e62] [cursor=pointer]:
            - /url: /assets/documents/brochure-qr.jpg
            - text: View Official Brochure
            - generic [aria-hidden] [ref=e63]: ↗
      - generic [ref=e65]:
        - generic [ref=e66]: THINK. CREATE. COMPETE. REPEAT. ↗
        - generic [ref=e67]: THINK. CREATE. COMPETE. REPEAT. ↗
      - generic [ref=e68]:
        - generic [ref=e69]:
          - generic [ref=e70]:
            - paragraph [ref=e71]: 01 / FIND YOUR ARENA
            - heading "TECHNICAL." [level=2] [ref=e72]
          - link "View all events" [ref=e73] [cursor=pointer]:
            - /url: /events/technical
            - text: View all events
            - generic [aria-hidden] [ref=e74]: ↗
        - generic [ref=e75]:
          - article [ref=e76]:
            - link "Explore Code Break" [ref=e77] [cursor=pointer]:
              - /url: /events/code-break
              - generic [ref=e78]:
                - generic [ref=e79]: Technical
                - generic [ref=e81]: "#01"
              - generic [aria-hidden] [ref=e83]:
                - generic: Code Break
                - generic: "01"
                - generic [ref=e91]:
                  - generic [ref=e92]: +
                  - text: TH / 26
              - generic [ref=e94]:
                - generic [ref=e95]:
                  - generic [ref=e96]: 2026 EDITION
                  - generic [ref=e97]: TECH ARENA
                  - generic "Event Venue" [ref=e98]: 📍 Venue TBA
                - heading "Code Break" [level=3] [ref=e99]
                - paragraph [ref=e100]: Algorithmic challenges, code debugging, and speed programming showdown.
                - generic [ref=e101]:
                  - generic [ref=e102]:
                    - generic [ref=e103]: Explore Event
                    - generic [ref=e104]: Brochure Official
                  - generic [aria-hidden] [ref=e106]: ↗
          - article [ref=e107]:
            - link "Explore Code Canvas" [ref=e108] [cursor=pointer]:
              - /url: /events/code-canvas
              - generic [ref=e109]:
                - generic [ref=e110]: Technical
                - generic [ref=e112]: "#02"
              - generic [aria-hidden] [ref=e114]:
                - generic: Code Canvas
                - generic: "02"
                - generic [ref=e123]:
                  - generic [ref=e124]: +
                  - text: TH / 26
              - generic [ref=e126]:
                - generic [ref=e127]:
                  - generic [ref=e128]: 2026 EDITION
                  - generic [ref=e129]: TECH ARENA
                  - generic "Event Venue" [ref=e130]: 📍 Venue TBA
                - heading "Code Canvas" [level=3] [ref=e131]
                - paragraph [ref=e132]: Where AI Meets Agile Coding! Organized by CSE CODING CLUB.
                - generic [ref=e133]:
                  - generic [ref=e134]:
                    - generic [ref=e135]: Explore Event
                    - generic [ref=e136]: Brochure Official
                  - generic [aria-hidden] [ref=e138]: ↗
          - article [ref=e139]:
            - link "Explore Neural Nexus" [ref=e140] [cursor=pointer]:
              - /url: /events/neural-nexus
              - generic [ref=e141]:
                - generic [ref=e142]: Technical
                - generic [ref=e144]: "#03"
              - generic [aria-hidden] [ref=e146]:
                - generic: Neural Nexus
                - generic: "03"
                - generic [ref=e159]:
                  - generic [ref=e160]: +
                  - text: TH / 26
              - generic [ref=e162]:
                - generic [ref=e163]:
                  - generic [ref=e164]: 2026 EDITION
                  - generic [ref=e165]: TECH ARENA
                  - generic "Event Venue" [ref=e166]: 📍 Venue TBA
                - heading "Neural Nexus" [level=3] [ref=e167]
                - paragraph [ref=e168]: Deep learning models, neural architecture challenges, and AI problem solving.
                - generic [ref=e169]:
                  - generic [ref=e170]:
                    - generic [ref=e171]: Explore Event
                    - generic [ref=e172]: Brochure Official
                  - generic [aria-hidden] [ref=e174]: ↗
          - article [ref=e175]:
            - link "Explore Binary Battle" [ref=e176] [cursor=pointer]:
              - /url: /events/binary-battle
              - generic [ref=e177]:
                - generic [ref=e178]: Technical
                - generic [ref=e180]: "#04"
              - generic [aria-hidden] [ref=e182]:
                - generic: Binary Battle
                - generic: "04"
                - generic [ref=e194]:
                  - generic [ref=e195]: +
                  - text: TH / 26
              - generic [ref=e197]:
                - generic [ref=e198]:
                  - generic [ref=e199]: 2026 EDITION
                  - generic [ref=e200]: TECH ARENA
                  - generic "Event Venue" [ref=e201]: 📍 ES 304
                - heading "Binary Battle" [level=3] [ref=e202]
                - paragraph [ref=e203]: High-stakes binary decoding, technical puzzles, and product advertising showdown.
                - generic [ref=e204]:
                  - generic [ref=e205]:
                    - generic [ref=e206]: Explore Event
                    - generic [ref=e207]: Brochure Official
                  - generic [aria-hidden] [ref=e209]: ↗
          - article [ref=e210]:
            - link "Explore Game Craft" [ref=e211] [cursor=pointer]:
              - /url: /events/game-craft
              - generic [ref=e212]:
                - generic [ref=e213]: Technical
                - generic [ref=e215]: "#05"
              - generic [aria-hidden] [ref=e217]:
                - generic: Game Craft
                - generic: "05"
                - generic [ref=e228]:
                  - generic [ref=e229]: +
                  - text: TH / 26
              - generic [ref=e231]:
                - generic [ref=e232]:
                  - generic [ref=e233]: 2026 EDITION
                  - generic [ref=e234]: TECH ARENA
                  - generic "Event Venue" [ref=e235]: 📍 Venue TBA
                - heading "Game Craft" [level=3] [ref=e236]
                - paragraph [ref=e237]: Game design, interactive mechanics, and rapid engine prototyping arena.
                - generic [ref=e238]:
                  - generic [ref=e239]:
                    - generic [ref=e240]: Explore Event
                    - generic [ref=e241]: Brochure Official
                  - generic [aria-hidden] [ref=e243]: ↗
          - article [ref=e244]:
            - link "Explore Tech Talks" [ref=e245] [cursor=pointer]:
              - /url: /events/tech-talks
              - generic [ref=e246]:
                - generic [ref=e247]: Technical
                - generic [ref=e249]: "#06"
              - generic [aria-hidden] [ref=e251]:
                - generic: Tech Talks
                - generic: "06"
                - generic [ref=e260]:
                  - generic [ref=e261]: +
                  - text: TH / 26
              - generic [ref=e263]:
                - generic [ref=e264]:
                  - generic [ref=e265]: 2026 EDITION
                  - generic [ref=e266]: TECH ARENA
                  - generic "Event Venue" [ref=e267]: 📍 Venue TBA
                - heading "Tech Talks" [level=3] [ref=e268]
                - paragraph [ref=e269]: Keynotes, emerging technology debates, and technical paper presentations.
                - generic [ref=e270]:
                  - generic [ref=e271]:
                    - generic [ref=e272]: Explore Event
                    - generic [ref=e273]: Brochure Official
                  - generic [aria-hidden] [ref=e275]: ↗
          - article [ref=e276]:
            - link "Explore Cyber Breach" [ref=e277] [cursor=pointer]:
              - /url: /events/cyber-breach
              - generic [ref=e278]:
                - generic [ref=e279]: Technical
                - generic [ref=e281]: "#07"
              - generic [aria-hidden] [ref=e283]:
                - generic: Cyber Breach
                - generic: "07"
                - generic [ref=e292]:
                  - generic [ref=e293]: +
                  - text: TH / 26
              - generic [ref=e295]:
                - generic [ref=e296]:
                  - generic [ref=e297]: 2026 EDITION
                  - generic [ref=e298]: TECH ARENA
                  - generic "Event Venue" [ref=e299]: 📍 Venue TBA
                - heading "Cyber Breach" [level=3] [ref=e300]
                - paragraph [ref=e301]: Capture The Flag (CTF), cybersecurity vulnerabilities, and ethical hacking sprint.
                - generic [ref=e302]:
                  - generic [ref=e303]:
                    - generic [ref=e304]: Explore Event
                    - generic [ref=e305]: Brochure Official
                  - generic [aria-hidden] [ref=e307]: ↗
          - article [ref=e308]:
            - link "Explore Prompt Pop" [ref=e309] [cursor=pointer]:
              - /url: /events/prompt-pop
              - generic [ref=e310]:
                - generic [ref=e311]: Technical
                - generic [ref=e313]: "#08"
              - generic [aria-hidden] [ref=e315]:
                - generic: Prompt Pop
                - generic: "08"
                - generic [ref=e324]:
                  - generic [ref=e325]: +
                  - text: TH / 26
              - generic [ref=e327]:
                - generic [ref=e328]:
                  - generic [ref=e329]: 2026 EDITION
                  - generic [ref=e330]: TECH ARENA
                  - generic "Event Venue" [ref=e331]: 📍 Venue TBA
                - heading "Prompt Pop" [level=3] [ref=e332]
                - paragraph [ref=e333]: Generative AI prompt engineering, image synthesis, and prompt battle arena.
                - generic [ref=e334]:
                  - generic [ref=e335]:
                    - generic [ref=e336]: Explore Event
                    - generic [ref=e337]: Brochure Official
                  - generic [aria-hidden] [ref=e339]: ↗
      - generic [ref=e340]:
        - generic [ref=e341]:
          - generic [ref=e342]:
            - paragraph [ref=e343]: 02 / FIND YOUR ARENA
            - heading "BEYOND THE CODE." [level=2] [ref=e344]
          - link "View all events" [ref=e345] [cursor=pointer]:
            - /url: /events/non-technical
            - text: View all events
            - generic [aria-hidden] [ref=e346]: ↗
        - generic [ref=e347]:
          - article [ref=e348]:
            - link "Explore Shutter Verse" [ref=e349] [cursor=pointer]:
              - /url: /events/shutter-verse
              - generic [ref=e350]:
                - generic [ref=e351]: Non-Technical
                - generic [ref=e353]: "#01"
              - generic [aria-hidden] [ref=e355]:
                - generic: Shutter Verse
                - generic: "01"
                - generic [ref=e365]:
                  - generic [ref=e366]: +
                  - text: TH / 26
              - generic [ref=e368]:
                - generic [ref=e369]:
                  - generic [ref=e370]: 2026 EDITION
                  - generic [ref=e371]: OPEN ARENA
                  - generic "Event Venue" [ref=e372]: 📍 Venue TBA
                - heading "Shutter Verse" [level=3] [ref=e373]
                - paragraph [ref=e374]: Campus photography, visual storytelling, and cinematic mobile framing.
                - generic [ref=e375]:
                  - generic [ref=e376]:
                    - generic [ref=e377]: Explore Event
                    - generic [ref=e378]: Brochure Official
                  - generic [aria-hidden] [ref=e380]: ↗
          - article [ref=e381]:
            - link "Explore Clue Code" [ref=e382] [cursor=pointer]:
              - /url: /events/clue-code
              - generic [ref=e383]:
                - generic [ref=e384]: Non-Technical
                - generic [ref=e386]: "#02"
              - generic [aria-hidden] [ref=e388]:
                - generic: Clue Code
                - generic: "02"
                - generic [ref=e397]:
                  - generic [ref=e398]: +
                  - text: TH / 26
              - generic [ref=e400]:
                - generic [ref=e401]:
                  - generic [ref=e402]: 2026 EDITION
                  - generic [ref=e403]: OPEN ARENA
                  - generic "Event Venue" [ref=e404]: 📍 Venue TBA
                - heading "Clue Code" [level=3] [ref=e405]
                - paragraph [ref=e406]: Campus treasure hunt, cryptic clues, and riddle-solving adventure.
                - generic [ref=e407]:
                  - generic [ref=e408]:
                    - generic [ref=e409]: Explore Event
                    - generic [ref=e410]: Brochure Official
                  - generic [aria-hidden] [ref=e412]: ↗
          - article [ref=e413]:
            - link "Explore Trashion" [ref=e414] [cursor=pointer]:
              - /url: /events/trashion
              - generic [ref=e415]:
                - generic [ref=e416]: Non-Technical
                - generic [ref=e418]: "#03"
              - generic [aria-hidden] [ref=e420]:
                - generic: Trashion
                - generic: "03"
                - generic [ref=e428]:
                  - generic [ref=e429]: +
                  - text: TH / 26
              - generic [ref=e431]:
                - generic [ref=e432]:
                  - generic [ref=e433]: 2026 EDITION
                  - generic [ref=e434]: OPEN ARENA
                  - generic "Event Venue" [ref=e435]: 📍 Venue TBA
                - heading "Trashion" [level=3] [ref=e436]
                - paragraph [ref=e437]: Fashion from Reusable and Recycled Materials · Redefining Fashion. Reimagining Waste.
                - generic [ref=e438]:
                  - generic [ref=e439]:
                    - generic [ref=e440]: Explore Event
                    - generic [ref=e441]: Brochure Official
                  - generic [aria-hidden] [ref=e443]: ↗
          - article [ref=e444]:
            - link "Explore The Voice Over" [ref=e445] [cursor=pointer]:
              - /url: /events/the-voice-over
              - generic [ref=e446]:
                - generic [ref=e447]: Non-Technical
                - generic [ref=e449]: "#04"
              - generic [aria-hidden] [ref=e451]:
                - generic: The Voice Over
                - generic: "04"
                - generic [ref=e460]:
                  - generic [ref=e461]: +
                  - text: TH / 26
              - generic [ref=e463]:
                - generic [ref=e464]:
                  - generic [ref=e465]: 2026 EDITION
                  - generic [ref=e466]: OPEN ARENA
                  - generic "Event Venue" [ref=e467]: 📍 Venue TBA
                - heading "The Voice Over" [level=3] [ref=e468]
                - paragraph [ref=e469]: Voice dubbing, mimicry, cinematic dialogues, and dynamic audio modulation.
                - generic [ref=e470]:
                  - generic [ref=e471]:
                    - generic [ref=e472]: Explore Event
                    - generic [ref=e473]: Brochure Official
                  - generic [aria-hidden] [ref=e475]: ↗
          - article [ref=e476]:
            - link "Explore BGMI" [ref=e477] [cursor=pointer]:
              - /url: /events/bgmi
              - generic [ref=e478]:
                - generic [ref=e479]: Non-Technical
                - generic [ref=e481]: "#05"
              - generic [aria-hidden] [ref=e483]:
                - generic: BGMI
                - generic: "05"
                - generic [ref=e491]:
                  - generic [ref=e492]: +
                  - text: TH / 26
              - generic [ref=e494]:
                - generic [ref=e495]:
                  - generic [ref=e496]: 2026 EDITION
                  - generic [ref=e497]: OPEN ARENA
                  - generic "Event Venue" [ref=e498]: 📍 Venue TBA
                - heading "BGMI" [level=3] [ref=e499]
                - paragraph [ref=e500]: Arcane Esports Portal · Official Collegiate BGMI Championship.
                - generic [ref=e501]:
                  - generic [ref=e502]:
                    - generic [ref=e503]: Explore Event
                    - generic [ref=e504]: Brochure Official
                  - generic [aria-hidden] [ref=e506]: ↗
          - article [ref=e507]:
            - link "Explore FIFA" [ref=e508] [cursor=pointer]:
              - /url: /events/fifa
              - generic [ref=e509]:
                - generic [ref=e510]: Non-Technical
                - generic [ref=e512]: "#06"
              - generic [aria-hidden] [ref=e514]:
                - generic: FIFA
                - generic: "06"
                - generic [ref=e523]:
                  - generic [ref=e524]: +
                  - text: TH / 26
              - generic [ref=e526]:
                - generic [ref=e527]:
                  - generic [ref=e528]: 2026 EDITION
                  - generic [ref=e529]: OPEN ARENA
                  - generic "Event Venue" [ref=e530]: 📍 Venue TBA
                - heading "FIFA" [level=3] [ref=e531]
                - paragraph [ref=e532]: Virtual football esports tournament on console / controllers.
                - generic [ref=e533]:
                  - generic [ref=e534]:
                    - generic [ref=e535]: Explore Event
                    - generic [ref=e536]: Brochure Official
                  - generic [aria-hidden] [ref=e538]: ↗
          - article [ref=e539]:
            - link "Explore Valorant" [ref=e540] [cursor=pointer]:
              - /url: /events/valorant
              - generic [ref=e541]:
                - generic [ref=e542]: Non-Technical
                - generic [ref=e544]: "#07"
              - generic [aria-hidden] [ref=e546]:
                - generic: Valorant
                - generic: "07"
                - generic [ref=e555]:
                  - generic [ref=e556]: +
                  - text: TH / 26
              - generic [ref=e558]:
                - generic [ref=e559]:
                  - generic [ref=e560]: 2026 EDITION
                  - generic [ref=e561]: OPEN ARENA
                  - generic "Event Venue" [ref=e562]: 📍 Venue TBA
                - heading "Valorant" [level=3] [ref=e563]
                - paragraph [ref=e564]: 5v5 tactical shooter esports showdown in custom spike-rush / standard lobby.
                - generic [ref=e565]:
                  - generic [ref=e566]:
                    - generic [ref=e567]: Explore Event
                    - generic [ref=e568]: Brochure Official
                  - generic [aria-hidden] [ref=e570]: ↗
          - article [ref=e571]:
            - link "Explore Bid Wars" [ref=e572] [cursor=pointer]:
              - /url: /events/bid-wars
              - generic [ref=e573]:
                - generic [ref=e574]: Non-Technical
                - generic [ref=e576]: "#08"
              - generic [aria-hidden] [ref=e578]:
                - generic: Bid Wars
                - generic: "08"
                - generic [ref=e586]:
                  - generic [ref=e587]: +
                  - text: TH / 26
              - generic [ref=e589]:
                - generic [ref=e590]:
                  - generic [ref=e591]: 2026 EDITION
                  - generic [ref=e592]: OPEN ARENA
                  - generic "Event Venue" [ref=e593]: 📍 Venue TBA
                - heading "Bid Wars" [level=3] [ref=e594]
                - paragraph [ref=e595]: IPL-style auction strategy, virtual bidding war, and squad budgeting.
                - generic [ref=e596]:
                  - generic [ref=e597]:
                    - generic [ref=e598]: Explore Event
                    - generic [ref=e599]: Brochure Official
                  - generic [aria-hidden] [ref=e601]: ↗
      - region "Featured events" [ref=e603]:
        - generic [ref=e604]:
          - paragraph [ref=e605]: IN THE SPOTLIGHT
          - heading [level=2] [ref=e607]:
            - text: FIND YOUR
            - emphasis [ref=e608]: MAIN EVENT.
          - generic [ref=e609]:
            - button "Previous featured event" [ref=e610] [cursor=pointer]: ←
            - generic [ref=e611]: 01 / 04
            - button "Next featured event" [ref=e612] [cursor=pointer]: →
            - button "Pause" [ref=e613] [cursor=pointer]
        - link [ref=e616] [cursor=pointer]:
          - /url: /events/code-break
          - generic [aria-hidden] [ref=e618]:
            - generic: Code Break
            - generic: "01"
            - generic [ref=e626]:
              - generic [ref=e627]: +
              - text: TH / 26
          - text: Technical
          - heading "Code Break" [level=3] [ref=e629]:
            - text: Code Break
            - generic [aria-hidden] [ref=e630]: ↗
      - generic [ref=e631]:
        - generic [ref=e632]:
          - generic [ref=e633]:
            - paragraph [ref=e634]: THE PROGRAMME
            - heading "A DATE WITH POSSIBILITY." [level=2] [ref=e636]: A DATE WITHPOSSIBILITY.
          - link "View Schedule" [ref=e637] [cursor=pointer]:
            - /url: /schedule
            - text: View Schedule
            - generic [aria-hidden] [ref=e638]: ↗
        - generic [ref=e640]:
          - generic [ref=e642]:
            - strong [ref=e643]: 26 OCT
            - generic [ref=e644]: MONDAY / 2026
          - generic [ref=e645]:
            - heading "A day for your talent." [level=3] [ref=e646]
            - paragraph [ref=e647]: The event date is confirmed. The detailed programme and timings will be announced by the organisers.
      - generic [ref=e648]:
        - generic [ref=e649]:
          - generic [ref=e650]: ↗
          - generic [ref=e652]: CRESCENT / AUDITORIUM
        - generic [ref=e653]:
          - paragraph [ref=e654]: MEET AT THE AUDITORIUM
          - heading "THIS IS THE PLACE." [level=2] [ref=e656]: THIS ISTHE PLACE.
          - paragraph [ref=e657]: Auditorium · B.S. Abdur Rahman Crescent
          - link "Venue Details" [ref=e658] [cursor=pointer]:
            - /url: /venue
            - text: Venue Details
            - generic [aria-hidden] [ref=e659]: ↗
      - generic [ref=e660]:
        - generic [ref=e661]:
          - paragraph [ref=e662]: BEFORE YOU STEP IN
          - heading "GOOD QUESTIONS." [level=2] [ref=e664]: GOODQUESTIONS.
          - link "All FAQs" [ref=e665] [cursor=pointer]:
            - /url: /faqs
            - text: All FAQs
            - generic [aria-hidden] [ref=e666]: ↗
        - generic [ref=e667]:
          - heading [level=3] [ref=e669]:
            - button "Who can participate?" [ref=e670] [cursor=pointer]:
              - text: Who can participate?
              - generic [aria-hidden] [ref=e671]: +
          - heading [level=3] [ref=e673]:
            - button "When is Talent Hunt 2K26?" [ref=e674] [cursor=pointer]:
              - text: When is Talent Hunt 2K26?
              - generic [aria-hidden] [ref=e675]: +
          - heading [level=3] [ref=e677]:
            - button "Where is the event happening?" [ref=e678] [cursor=pointer]:
              - text: Where is the event happening?
              - generic [aria-hidden] [ref=e679]: +
  - contentinfo [ref=e680]:
    - generic [ref=e681]:
      - generic [ref=e682]:
        - paragraph [ref=e683]: YOUR TALENT. YOUR MOMENT.
        - link "TALENT HUNT 2K26" [ref=e684] [cursor=pointer]:
          - /url: /
          - text: TALENT HUNT
          - generic [ref=e685]: 2K26
        - paragraph [ref=e686]: Sixteen competitions. Your talent, in the spotlight.
      - generic [ref=e687]:
        - heading "Explore" [level=2] [ref=e688]
        - link "Technical Events" [ref=e689] [cursor=pointer]:
          - /url: /events/technical
        - link "Non-Technical Events" [ref=e690] [cursor=pointer]:
          - /url: /events/non-technical
        - link "Schedule" [ref=e691] [cursor=pointer]:
          - /url: /schedule
        - link "Coordinators" [ref=e692] [cursor=pointer]:
          - /url: /coordinators
        - link "About" [ref=e693] [cursor=pointer]:
          - /url: /about
        - link "Venue" [ref=e694] [cursor=pointer]:
          - /url: /venue
        - link "FAQs" [ref=e695] [cursor=pointer]:
          - /url: /faqs
        - link "Contact" [ref=e696] [cursor=pointer]:
          - /url: /contact
      - generic [ref=e697]:
        - heading "Stay connected" [level=2] [ref=e698]
        - link "@talent.hunt.2k26 ↗" [ref=e699] [cursor=pointer]:
          - /url: https://www.instagram.com/talent.hunt.2k26/
        - link "View Official Brochure" [ref=e700] [cursor=pointer]:
          - /url: /assets/documents/brochure-qr.jpg
          - text: View Official Brochure
          - generic [aria-hidden] [ref=e701]: ↗
        - link "Registration ↗" [ref=e702] [cursor=pointer]:
          - /url: /register
        - link "Privacy & your data" [ref=e703] [cursor=pointer]:
          - /url: /privacy
    - generic [ref=e704]:
      - img "B.S. Abdur Rahman Crescent Institute of Science & Technology" [ref=e705]
      - img "CSEA" [ref=e706]
      - img "ACM" [ref=e707]
    - generic [ref=e708]:
      - generic [ref=e709]: TALENT HUNT 2K26 · Department of Computer Science and Engineering
      - button "Replay Opening Intro ↺" [ref=e710] [cursor=pointer]
      - generic [ref=e711]: For Crescent CSE students only ↗
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
  24 |   await expect(digits).toHaveText(["12", "00", "00", "00"]);
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
> 76 |       await expect(digits).toHaveText(["12", "00", "00", "00"]);
     |                            ^ Error: expect(locator).toHaveText(expected) failed
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