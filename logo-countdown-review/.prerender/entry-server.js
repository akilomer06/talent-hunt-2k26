import { renderToString } from "react-dom/server";
import { Link, NavLink, Route, Routes, StaticRouter, useLocation, useNavigationType, useParams } from "react-router-dom";
import { AnimatePresence, LayoutGroup, MotionConfig, motion, useAnimationControls, useIsPresent, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Component, createContext, useCallback, useContext, useEffect, useId, useRef, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/data/siteData.ts
var technical = [
	"Code Break",
	"Code Canvas",
	"Neural Nexus",
	"Binary Battle",
	"Game Craft",
	"Tech Talks",
	"Cyber Breach",
	"Prompt Pop"
];
var nonTechnical = [
	"Shutter Verse",
	"Clue Code",
	"Trashion",
	"The Voice Over",
	"BGMI",
	"FIFA",
	"Valorant",
	"Bid Wars"
];
var slugify = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
var eventDetails = {
	"code-break": {
		venue: "Venue TBA",
		description: "Algorithmic challenges, code debugging, and speed programming showdown.",
		overview: "Code Break tests participants' core coding, debugging, and problem-solving prowess under strict time constraints. Solve tricky test cases, fix broken logic, and race against the clock.",
		tags: [
			"Competitive Coding",
			"Debugging",
			"Algorithms",
			"Problem Solving"
		],
		rules: [
			"Individual or team participation as per event guidelines.",
			"Bring valid Crescent college ID card to the venue.",
			"Standard competitive programming rules apply. Plagiarism or unauthorized aids lead to disqualification.",
			"Judges' decision will be final and binding."
		],
		participation: ["For Crescent CSE students only", "Report to the assigned lab 15 minutes before the round starts"]
	},
	"code-canvas": {
		venue: "Venue TBA",
		description: "Where AI Meets Agile Coding! Organized by CSE CODING CLUB.",
		overview: "Code Canvas is an exciting 2-hour-and-30-minute AI-powered web development hackathon where participants combine programming skills with Generative AI to build functional web applications. Teams will receive an on-the-spot problem statement and compete through creative coding, a surprise Chaos Round, and a 90-Second Final Boss showdown. Think creatively, code smartly, and turn your ideas into reality!",
		tags: [
			"AI Coding",
			"Hackathon",
			"Web Development",
			"Chaos Round"
		],
		rules: [
			"Team Composition: Participate individually or in teams of up to 2 members.",
			"AI Tool Policy: AI coding assistants such as ChatGPT, DeepSeek, Gemini, Roo Code, and Claude are permitted. Zero-code app generators such as Lovable are strictly prohibited.",
			"Development: Use AI to assist with prompting, coding, debugging, and refinement. Participants must understand their code.",
			"Submission: Push the final code to a public GitHub repository within the allotted time. Include a README.md with the project title, team members, and description. Submit a working application.",
			"Code of Conduct: Projects must be developed during the event. Copying pre-built projects and collaborating with other teams are prohibited.",
			"Chaos Round: Teams must implement a surprise feature or technical challenge within the announced time limit.",
			"90-Second Final Boss: Each team gets 90 seconds to demonstrate its application, followed by a brief technical question from the judges.",
			"AI Transparency: Document the AI tools used, important prompts, AI-generated code modified, at least one bug solved independently, and application testing in README.md or AI-LOG.md."
		],
		rounds: [
			"Round 1 · Agile AI Development: Receive an on-the-spot problem statement and build a functional web application utilizing approved AI assistants.",
			"Round 2 · Chaos Round: Teams must implement a surprise feature or technical challenge within the announced time limit.",
			"Round 3 · 90-Second Final Boss: Each team gets 90 seconds to demonstrate its application, followed by a brief technical question from the judges."
		],
		equipment: [
			"Laptops with development environment and Git/GitHub setup.",
			"Permitted AI Coding Assistants: ChatGPT, DeepSeek, Gemini, Roo Code, and Claude.",
			"Strictly Prohibited: Zero-code app generators such as Lovable."
		],
		participation: [
			"Participate individually or in teams of up to 2 members.",
			"Organized by CSE CODING CLUB.",
			"Open to Crescent CSE students only."
		],
		prizes: [
			"Winning Criteria (100 Marks Total):",
			"Functionality and working features: 25 Marks",
			"Creativity and innovation: 20 Marks",
			"UI/UX and responsiveness: 15 Marks",
			"AI integration and code understanding: 20 Marks",
			"Chaos Round performance: 10 Marks",
			"Final demo and technical explanation: 10 Marks"
		]
	},
	"neural-nexus": {
		venue: "Venue TBA",
		description: "Deep learning models, neural architecture challenges, and AI problem solving.",
		overview: "Neural Nexus challenges participants to train, optimize, and evaluate machine learning models on complex datasets. Showcase your AI intuition, prompt engineering, and model tuning capabilities.",
		tags: [
			"Machine Learning",
			"Neural Networks",
			"Deep Learning",
			"AI Arena"
		],
		rules: [
			"Bring your own laptops with Python and ML libraries pre-installed.",
			"Datasets will be provided at the start of the event.",
			"Pre-trained models are restricted unless explicitly permitted in problem statements.",
			"Judges' evaluation based on model accuracy, latency, and innovation."
		],
		participation: ["Crescent CSE students only", "Individual or 2-member teams"]
	},
	"binary-battle": {
		venue: "ES 304",
		description: "High-stakes binary decoding, technical puzzles, and product advertising showdown.",
		overview: "Binary Battle is an intense three-stage technical competition that tests speed, binary decoding, analytical problem solving, and product marketing. Teams decode secret coordinates to find their workstation, race through a locked 3x3 technical quiz grid, and deliver an innovative on-the-spot product pitch.",
		tags: [
			"Binary Decoding",
			"Technical Quiz",
			"Product Pitch",
			"Hardware & Logic"
		],
		rules: [
			"No electronics are allowed for the first two rounds. This includes mobile phones, laptops, earphones, and other devices.",
			"Cross collaboration across different teams is not allowed and could lead to penalty scores or termination.",
			"For any issues or queries, participants are expected to approach the volunteers and not other teams.",
			"Winners will be selected with their time of completion and their presentation scores. In case of ties, a new round of problem solving shall be introduced between the teams.",
			"Judges and Organizers have the power to disqualify teams for unfair practices."
		],
		rounds: [
			"Round 1 · Identifying workstation from binary data: Participants receive individual IDs which on matching with their team's ID provide a meaningful image. Teams move to the Bay Area to obtain a scroll containing binary data to decode and identify the workstation on which the team has to assemble.",
			"Round 2 · Decoding the image by solving technical quiz: Each team receives a 3x3 grid on their workstation which has a hidden image. Solve quizzes to unlock each segment. After solving all segments, identify what the unlocked image represents and report to event organisers.",
			"Round 3 · Advertising the given product: Upon reaching this final round, participants are allowed laptops, mobile phones, and internet access to advertise and market a surprise product provided on spot. Showcase creativity, innovation, and professional communication."
		],
		equipment: [
			"Materials to be brought: Laptop and Mobile Phones (permitted in Round 3).",
			"No electronics are permitted during the first two rounds.",
			"Internet access will be provided for the final advertising round."
		],
		participation: [
			"Team size: 2 - 3 members.",
			"Cross collaboration across teams is strictly prohibited.",
			"Venue: ES 304."
		]
	},
	"game-craft": {
		venue: "Venue TBA",
		description: "Game design, interactive mechanics, and rapid engine prototyping arena.",
		overview: "Game Craft is a creative game development and mechanics design sprint. Build playable prototypes, design engaging game loops, and pitch your game vision to judges.",
		tags: [
			"Game Dev",
			"Interactive Media",
			"Unity / Godot",
			"Level Design"
		],
		rules: [
			"Game engines permitted: Unity, Unreal Engine, Godot, Pygame, or web-based game engines.",
			"Third-party assets must be credited and adhere to open-source or creative commons licensing.",
			"Core gameplay mechanics must be implemented during the designated contest period.",
			"Judges' decision based on playability, aesthetics, and game mechanics."
		],
		participation: ["Crescent CSE students only", "Teams of 1 to 3 members"]
	},
	"tech-talks": {
		venue: "Venue TBA",
		description: "Keynotes, emerging technology debates, and technical paper presentations.",
		overview: "Tech Talks provides a stage for students to articulate cutting-edge innovations, emerging technology research, and disruptive tech trends before an audience and faculty panel.",
		tags: [
			"Paper Presentation",
			"Tech Keynote",
			"Public Speaking",
			"Innovation"
		],
		rules: [
			"Presentation time: 7 minutes presentation followed by 3 minutes Q&A.",
			"Slide decks must be submitted to the event coordinators before the commencement of the session.",
			"Originality of content and research depth are primary scoring criteria.",
			"Professional dress code is recommended."
		],
		participation: ["Individual or duo presentation", "Crescent CSE students only"]
	},
	"cyber-breach": {
		venue: "Venue TBA",
		description: "Capture The Flag (CTF), cybersecurity vulnerabilities, and ethical hacking sprint.",
		overview: "Cyber Breach is a hands-on cybersecurity and CTF competition. Test your skills in network analysis, reverse engineering, cryptography, web exploitation, and digital forensics.",
		tags: [
			"CTF",
			"Ethical Hacking",
			"Cryptography",
			"Network Security"
		],
		rules: [
			"Attacking the contest infrastructure, score server, or other teams is strictly forbidden and results in immediate disqualification.",
			"Flag sharing or collusion across teams will lead to permanent expulsion.",
			"All challenges are self-contained within the authorized test environment.",
			"Winners determined by points accrued and timestamp of submissions."
		],
		participation: ["Individual or teams of up to 2", "Bring laptops with Kali/security tools"]
	},
	"prompt-pop": {
		venue: "Venue TBA",
		description: "Generative AI prompt engineering, image synthesis, and prompt battle arena.",
		overview: "Prompt Pop challenges participants to master the art of prompt engineering across Large Language Models and diffusion image generators to produce precise, creative outputs under pressure.",
		tags: [
			"Prompt Engineering",
			"GenAI",
			"Creative Synthesis",
			"AI Art"
		],
		rules: [
			"Prompts must be crafted during the live session adhering to surprise thematic constraints.",
			"Use of external automated bots is prohibited.",
			"Entries judged on adherence to prompt constraints, aesthetics, and creative problem solving.",
			"Judges' evaluation is final."
		],
		participation: ["Crescent CSE students only", "Individual participation"]
	},
	"shutter-verse": {
		venue: "Venue TBA",
		description: "Campus photography, visual storytelling, and cinematic mobile framing.",
		overview: "Shutter Verse invites photographers to capture the energy, emotion, and aesthetic highlights of Talent Hunt 2K26 through a creative lens.",
		tags: [
			"Photography",
			"Visual Storytelling",
			"Cinematography",
			"Campus Life"
		],
		rules: [
			"Photos must be captured within the college campus on the day of the event.",
			"Basic color correction and lighting adjustments are permitted; heavy AI synthesis or compositing is disallowed.",
			"EXIF data must be preserved for verification.",
			"Participants must submit their top photographs before the submission deadline."
		],
		participation: ["DSLR or Smartphone cameras permitted", "Crescent CSE students only"]
	},
	"clue-code": {
		venue: "Venue TBA",
		description: "Campus treasure hunt, cryptic clues, and riddle-solving adventure.",
		overview: "Clue Code is an adrenaline-fueled treasure hunt across the campus. Decipher cryptic riddles, uncover hidden locations, and race against other teams to claim the prize.",
		tags: [
			"Treasure Hunt",
			"Cryptic Clues",
			"Campus Race",
			"Puzzle Solving"
		],
		rules: [
			"Teams must stay together during the entire treasure hunt.",
			"Do not disturb ongoing academic classes or enter restricted campus zones.",
			"Tampering with clues or misleading other teams will lead to immediate disqualification.",
			"First team to report with all clues verified wins."
		],
		participation: ["Teams of 2 to 4 members", "Crescent CSE students only"]
	},
	trashion: {
		venue: "Venue TBA",
		description: "Fashion from Reusable and Recycled Materials · Redefining Fashion. Reimagining Waste.",
		overview: "Trashion is a creative fashion event that combines fashion with sustainability. Participants must design and showcase unique outfits made from reusable, recycled, and waste materials. The event encourages students to transform discarded items into fashionable creations while promoting environmental awareness and sustainable fashion. The goal is to prove that waste can be transformed into fashion through creativity and innovation. Turn Trash into Trend. Make Sustainability Stylish!",
		tags: [
			"Eco Fashion",
			"Upcycling",
			"Ramp Walk",
			"Sustainability"
		],
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
			"Organisers’ Authority: The organisers reserve the right to make necessary changes to the event schedule, rules, or performance order when required."
		],
		rounds: ["7-Minute Ramp Walk & Presentation: Each team is allotted a maximum of 7 minutes for the entire performance, including the ramp walk, introduction, and concept presentation."],
		equipment: ["Reusable, recycled, or discarded materials (newspapers, cardboard, plastic bottles, old clothes, fabric scraps, packaging materials, CDs, etc.).", "Strictly Prohibited: Sharp objects, hazardous waste, flammable materials, toxic substances, and dangerous items."],
		participation: [
			"Team Size: Exactly 5 members per team.",
			"Categories: Separate Boys' Teams and Girls' Teams. Mixed-gender teams are not permitted.",
			"Reporting Time: At least 2 hours before the event."
		],
		prizes: [
			"Judging Focus Criteria:",
			"1. Creativity and Innovation: Uniqueness of outfit and design concept.",
			"2. Effective Use of Recycled Materials: How well reusable and discarded materials are incorporated.",
			"3. Theme Relevance: How clearly the designs represent the Trashion theme.",
			"4. Styling and Presentation: Outfit coordination, styling, and overall visual appeal.",
			"5. Ramp Walk and Confidence: Confidence, stage presence, and coordination.",
			"6. Sustainability Message: Communication of recycling, reuse, and environmental protection.",
			"7. Overall Impact: Creativity, presentation, and impression on audience and judges."
		]
	},
	"the-voice-over": {
		venue: "Venue TBA",
		description: "Voice dubbing, mimicry, cinematic dialogues, and dynamic audio modulation.",
		overview: "The Voice Over tests your vocal versatility, comedic timing, and emotional resonance. Dub over famous movie scenes, animate quirky characters, or create hilarious soundscapes live.",
		tags: [
			"Dubbing",
			"Voice Acting",
			"Mimicry",
			"Audio Creativity"
		],
		rules: [
			"Clips will be assigned or pre-approved by the event organizers.",
			"Obscenity, vulgar language, or offensive personal remarks are strictly banned.",
			"Sync accuracy with the video clip and vocal expression are primary judging criteria.",
			"Time limit per performance: 3 to 5 minutes."
		],
		participation: ["Individual or duo performance", "Crescent CSE students only"]
	},
	bgmi: {
		venue: "Venue TBA",
		description: "Arcane Esports Portal · Official Collegiate BGMI Championship.",
		overview: "Drop into the ultimate collegiate Battlegrounds Mobile India showdown hosted by Arcane. Squads will compete across Erangel, Miramar, and Sanhok through high-stakes qualifiers and grand finals. Assemble your best roster, execute your strategy, and battle for the campus crown and prize pool.",
		tags: [
			"Esports",
			"BGMI",
			"Mobile Gaming",
			"Battle Royale"
		],
		rules: [
			"Roster & Mode: Competitions are held strictly in Squad Third-Person Perspective (TPP) with 4 main players and 1 optional substitute.",
			"Device Eligibility: Only handheld mobile smartphones are allowed; emulators, PCs, tablets, and trigger accessories are strictly prohibited.",
			"Lobby Punctuality: Squads must join the custom room within 5 minutes of the Room ID and password being shared by tournament admins.",
			"Scoring Matrix: Standings are determined by standard rank placement points combined with 1 point awarded per confirmed finish.",
			"Disconnection Policy: Matches continue uninterrupted without restarts for individual player lag, network drops, or client crashes.",
			"Cheating & Exploits: Use of unauthorized third-party apps, hacks, macros, scripts, or deliberate glitch exploitation results in immediate disqualification.",
			"Collusion & Unfair Play: Teaming up with opponents, match-fixing, intentional feeding, or stream-sniping leads to an instant roster ban.",
			"Credential Leaks & Misconduct: Sharing room passwords outside registered squads, multi-team registrations, or abusive conduct incurs direct expulsion."
		],
		rounds: ["Qualifiers: High-stakes squad matches across Erangel, Miramar, and Sanhok.", "Grand Finals: Top qualifying squads compete in custom championship lobbies for the campus crown."],
		equipment: ["Only handheld mobile smartphones are allowed.", "Strictly Prohibited: Emulators, PCs, tablets, and trigger accessories."],
		participation: [
			"Format: Squad (4 main players + 1 optional substitute).",
			"Perspective: TPP (Third-Person Perspective).",
			"Device: Mobile Only.",
			"Scoring: Standard Matrix."
		]
	},
	fifa: {
		venue: "Venue TBA",
		description: "Virtual football esports tournament on console / controllers.",
		overview: "Step onto the virtual pitch in the Talent Hunt 2K26 FIFA Championship. Pick your favorite club, display tactical finesse, and score your way to collegiate glory.",
		tags: [
			"Esports",
			"FIFA",
			"Virtual Soccer",
			"Console Gaming"
		],
		rules: [
			"Match duration: Standard half length (4-6 minutes) as decided by referees.",
			"Tactical defending only; custom formations may be restricted if deemed exploits.",
			"In case of a draw, extra time and penalty shootouts determine the winner.",
			"Unsportsmanlike conduct or pausing during active play without referee permission leads to penalties."
		],
		participation: ["1v1 Knockout format", "Controllers provided or bring your own"]
	},
	valorant: {
		venue: "Venue TBA",
		description: "5v5 tactical shooter esports showdown in custom spike-rush / standard lobby.",
		overview: "Lock in your agents and execute your tactical playbooks in the Talent Hunt 2K26 Valorant Showdown. Coordinate utility, clutch rounds, and conquer the server.",
		tags: [
			"Esports",
			"Valorant",
			"Tactical Shooter",
			"5v5 Tournament"
		],
		rules: [
			"Teams of 5 players (with optional substitute).",
			"Tournament format: Single-elimination knockout brackets on standard competitive map pool.",
			"Use of third-party cheats, macros, or crosshair overlays with exploit behavior is strictly banned.",
			"Map vetoes and side selection conducted through tournament admins."
		],
		participation: ["Teams of 5", "Bring your own peripherals (mouse, headset) recommended"]
	},
	"bid-wars": {
		venue: "Venue TBA",
		description: "IPL-style auction strategy, virtual bidding war, and squad budgeting.",
		overview: "Channel your inner franchise manager in Bid Wars! Manage a fixed virtual budget, out-bid rival teams for marquee players or assets, and build the ultimate championship squad.",
		tags: [
			"Auction",
			"IPL Bidding",
			"Strategy",
			"Resource Management"
		],
		rules: [
			"Each team begins with an identical virtual purse and roster constraints.",
			"Exceeding budget or failing to meet minimum squad composition leads to penalties.",
			"Fastest paddle raise secures bid at current valuation.",
			"Winner determined by comprehensive squad valuation and balance score."
		],
		participation: ["Teams of 2 to 3 members", "Crescent CSE students only"]
	}
};
var siteData = {
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
		eligibilityNote: "Participation is restricted to Crescent students only. The official brochure specifies “ONLY FOR CSE.”",
		productionUrl: null,
		copyright: "TALENT HUNT 2K26 · Department of Computer Science and Engineering",
		archiveMessage: "The 2026 edition has concluded. Explore the event archive.",
		eventConcludedMessage: "The countdown has ended. Explore Talent Hunt 2K26."
	},
	assets: {
		college: "/assets/logos/crescent.png",
		event: "/assets/logos/talent-hunt.png",
		csea: "/assets/logos/csea.png",
		acm: "/assets/logos/acm.png",
		brochureImage: "/assets/documents/brochure-qr.jpg",
		brochurePdf: null,
		defaultSocial: null,
		introAudio: null,
		favicon: "/assets/logos/talent-hunt-mark.svg"
	},
	countdown: {
		enabled: true,
		startsAt: "2026-10-26T09:00:00+05:30",
		timezone: "Asia/Kolkata",
		label: "26 October · 9:00 AM IST"
	},
	registration: {
		mode: "published",
		url: "https://forms.gle/mzuWoGeCKZWcVVZq5",
		qr: "/assets/registration/official-qr.png",
		qrVerified: true,
		opensAt: null,
		closesAt: null,
		timezone: null,
		instructions: []
	},
	announcements: [],
	events: [["technical", technical], ["non-technical", nonTechnical]].flatMap(([category, names]) => names.map((name, index) => {
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
			relatedIds: custom.relatedIds || []
		};
	})),
	featuredIds: [
		"code-break",
		"shutter-verse",
		"neural-nexus",
		"trashion"
	],
	schedule: [],
	coordinators: [{
		id: "sharmila-sankar",
		name: "Dr. Sharmila Sankar",
		role: "Convenor · Dean, SCIMS"
	}, {
		id: "aisha-banu",
		name: "Dr. W. Aisha Banu",
		role: "Convenor · HOD, CSE"
	}],
	coordinatorGroups: [
		{
			id: "faculty",
			label: "Faculty Coordinators",
			members: [
				{
					id: "sharmila-sankar",
					name: "Dr. Sharmila Sankar",
					role: "Convenor · Dean, SCIMS"
				},
				{
					id: "aisha-banu",
					name: "Dr. W. Aisha Banu",
					role: "Convenor · HOD, CSE"
				},
				{
					id: "faculty-coordinator-1",
					name: "Dr. M. Rajasekar",
					role: "Faculty Coordinator"
				},
				{
					id: "faculty-coordinator-2",
					name: "Dr. S. Kavitha",
					role: "Faculty Coordinator"
				},
				{
					id: "faculty-coordinator-3",
					name: "Mr. A. Farook",
					role: "Faculty Coordinator"
				}
			]
		},
		{
			id: "student-general",
			label: "Student General Coordinators",
			members: [
				{
					id: "sg-1",
					name: "Musthafaa A",
					role: "General Coordinator"
				},
				{
					id: "sg-2",
					name: "Fawaz M",
					role: "General Coordinator"
				},
				{
					id: "sg-3",
					name: "Shifana M",
					role: "General Coordinator"
				},
				{
					id: "sg-4",
					name: "Divya R",
					role: "General Coordinator"
				}
			]
		},
		{
			id: "technical-coords",
			label: "Technical Event Coordinators",
			members: [
				{
					id: "t-cb-1",
					name: "Akbar Ali S",
					role: "Code Break"
				},
				{
					id: "t-cb-2",
					name: "Habeeba N",
					role: "Code Break"
				},
				{
					id: "t-cc-1",
					name: "Kishore R",
					role: "Code Canvas"
				},
				{
					id: "t-cc-2",
					name: "Safa S",
					role: "Code Canvas"
				},
				{
					id: "t-nn-1",
					name: "Adithya K",
					role: "Neural Nexus"
				},
				{
					id: "t-nn-2",
					name: "Tamilarasi M",
					role: "Neural Nexus"
				},
				{
					id: "t-bb-1",
					name: "Santhosh V",
					role: "Binary Battle"
				},
				{
					id: "t-bb-2",
					name: "Ruba S",
					role: "Binary Battle"
				},
				{
					id: "t-gc-1",
					name: "Naveen P",
					role: "Game Craft"
				},
				{
					id: "t-gc-2",
					name: "Mariam F",
					role: "Game Craft"
				},
				{
					id: "t-tt-1",
					name: "Arun Kumar B",
					role: "Tech Talks"
				},
				{
					id: "t-tt-2",
					name: "Anisha R",
					role: "Tech Talks"
				},
				{
					id: "t-cy-1",
					name: "Irfan A",
					role: "Cyber Breach"
				},
				{
					id: "t-cy-2",
					name: "Nivetha S",
					role: "Cyber Breach"
				},
				{
					id: "t-pp-1",
					name: "Harish M",
					role: "Prompt Pop"
				},
				{
					id: "t-pp-2",
					name: "Fathima Z",
					role: "Prompt Pop"
				}
			]
		},
		{
			id: "nontechnical-coords",
			label: "Non-Technical Event Coordinators",
			members: [
				{
					id: "nt-sv-1",
					name: "Praveen R",
					role: "Shutter Verse"
				},
				{
					id: "nt-sv-2",
					name: "Ananya K",
					role: "Shutter Verse"
				},
				{
					id: "nt-cl-1",
					name: "Zain M",
					role: "Clue Code"
				},
				{
					id: "nt-cl-2",
					name: "Priya L",
					role: "Clue Code"
				},
				{
					id: "nt-tr-1",
					name: "Yuvaraj S",
					role: "Trashion"
				},
				{
					id: "nt-tr-2",
					name: "Sana B",
					role: "Trashion"
				},
				{
					id: "nt-vo-1",
					name: "Deepak N",
					role: "The Voice Over"
				},
				{
					id: "nt-vo-2",
					name: "Shalini V",
					role: "The Voice Over"
				},
				{
					id: "nt-bg-1",
					name: "Rahul J",
					role: "BGMI"
				},
				{
					id: "nt-bg-2",
					name: "Ismail A",
					role: "BGMI"
				},
				{
					id: "nt-fi-1",
					name: "Kavin M",
					role: "FIFA"
				},
				{
					id: "nt-fi-2",
					name: "Rithik S",
					role: "FIFA"
				},
				{
					id: "nt-va-1",
					name: "Pranav K",
					role: "Valorant"
				},
				{
					id: "nt-va-2",
					name: "Sathish R",
					role: "Valorant"
				},
				{
					id: "nt-bw-1",
					name: "Arafath M",
					role: "Bid Wars"
				},
				{
					id: "nt-bw-2",
					name: "Pooja D",
					role: "Bid Wars"
				}
			]
		}
	],
	socialLinks: [{
		label: "Instagram",
		handle: "@talent.hunt.2k26",
		url: "https://www.instagram.com/talent.hunt.2k26/"
	}],
	nav: [
		{
			to: "/",
			label: "Home"
		},
		{
			to: "/events/technical",
			label: "Technical Events"
		},
		{
			to: "/events/non-technical",
			label: "Non-Technical Events"
		},
		{
			to: "/schedule",
			label: "Schedule"
		},
		{
			to: "/coordinators",
			label: "Coordinators"
		},
		{
			to: "/about",
			label: "About"
		},
		{
			to: "/venue",
			label: "Venue"
		},
		{
			to: "/faqs",
			label: "FAQs"
		},
		{
			to: "/contact",
			label: "Contact"
		}
	],
	categories: {
		technical: {
			title: "Technical Events",
			short: "Technical",
			headline: "THINK IT.\nBUILD IT.",
			intro: "Eight competitions. One place to bring your technical talent to the foreground."
		},
		"non-technical": {
			title: "Non-Technical Events",
			short: "Non-Technical",
			headline: "BREAK THE\nEXPECTED.",
			intro: "Eight competitions. Explore the other side of Talent Hunt."
		}
	},
	copy: {
		heroEyebrow: "THE STAGE IS YOURS.",
		heroTagline: "Bring your ideas. Bring your edge. Bring you.",
		introHeading: "ONE CAMPUS.\nEVERY KIND\nOF TALENT.",
		intro: "From the technical to the unexpected, find your place at Talent Hunt 2K26. Explore sixteen competitions brought together by the Department of Computer Science and Engineering.",
		eventDetailsPending: "Explore the competition. Detailed rules and participation information will be shared by the organisers.",
		registrationPending: "Registration information is temporarily unavailable. Please check the official brochure or try again later.",
		schedulePending: "The event date is confirmed. The detailed programme and timings will be announced by the organisers.",
		venuePending: "The brochure confirms the auditorium. Detailed campus directions have not yet been supplied.",
		about: "Talent Hunt 2K26 brings Technical and Non-Technical competitions together at Crescent. Presented by the Department of Computer Science and Engineering, under the School of Computer Information and Mathematical Sciences.",
		footerDescription: "Sixteen competitions. Your talent, in the spotlight.",
		privacy: [
			{
				title: "A public event website",
				text: "This website provides event information. It has no account system, contact-submission form, database, visitor analytics, advertising pixels or session-recording scripts. Fonts and artwork are served locally."
			},
			{
				title: "Registration & external links",
				text: "The official Google Form handles registration submissions. This website does not submit or store student registration information or confirm a registration. Google and other external sites apply their own data practices when you follow a link."
			},
			{
				title: "Storage in your browser",
				text: "Session storage remembers whether the opening animation has played and keeps navigation scroll positions for this browser tab. Local storage remembers individual dismissed announcement IDs. Search and filter choices appear in the page URL. If browser storage is unavailable, the website continues to work with temporary in-memory state."
			},
			{
				title: "Sharing",
				text: "Copy Link writes the current page URL to your clipboard only when requested. Native Share opens your device’s share interface only when requested. No sharing data is sent to a website backend."
			}
		]
	},
	faqs: [
		{
			id: "eligibility",
			category: "Participation",
			question: "Who can participate?",
			answer: "Participation is restricted to Crescent students only. The official brochure specifies “ONLY FOR CSE,” so this site lists eligibility as Crescent CSE students."
		},
		{
			id: "date",
			category: "The event",
			question: "When is Talent Hunt 2K26?",
			answer: "Monday, 26 October 2026, starting at 9:00 AM India Standard Time (IST)."
		},
		{
			id: "venue",
			category: "The event",
			question: "Where is the event happening?",
			answer: "The auditorium at B.S. Abdur Rahman Crescent, as listed in the official brochure."
		},
		{
			id: "registration",
			category: "Participation",
			question: "How do I register?",
			answer: "Visit the Registration page to scan the official QR code or open the Google Form directly. Complete and submit the form to register. Participation is restricted to Crescent CSE students."
		},
		{
			id: "rules",
			category: "Participation",
			question: "Where can I find competition rules?",
			answer: "Each competition has its own page. Verified rules and participation requirements will be added when supplied by the organisers."
		}
	],
	pages: {
		"/": {
			title: "Talent Hunt 2K26 — The stage is yours",
			description: "Explore 16 Technical and Non-Technical competitions at Crescent. Talent Hunt 2K26, Monday 26 October 2026. For Crescent CSE students only."
		},
		"/events/technical": {
			title: "Technical Events",
			description: "Explore the eight Technical competitions at Talent Hunt 2K26, in official brochure order."
		},
		"/events/non-technical": {
			title: "Non-Technical Events",
			description: "Explore the eight Non-Technical competitions at Talent Hunt 2K26, in official brochure order."
		},
		"/schedule": {
			title: "The Programme",
			description: "Confirmed event date and official programme information for Talent Hunt 2K26."
		},
		"/register": {
			title: "Take Your Place",
			description: "Registration availability and eligibility for Talent Hunt 2K26 at Crescent."
		},
		"/about": {
			title: "Made for Your Moment",
			description: "About Talent Hunt 2K26, presented by the Department of Computer Science and Engineering at Crescent."
		},
		"/venue": {
			title: "See You at Crescent",
			description: "Official venue information for Talent Hunt 2K26 at the Crescent auditorium."
		},
		"/faqs": {
			title: "Good Questions",
			description: "Verified answers about the date, venue, eligibility and registration for Talent Hunt 2K26."
		},
		"/coordinators": {
			title: "Coordinators",
			description: "Faculty and student coordinators for Talent Hunt 2K26 at Crescent."
		},
		"/contact": {
			title: "The People Behind It",
			description: "Verified organiser and convenor information for Talent Hunt 2K26."
		},
		"/privacy": {
			title: "Privacy & Your Data",
			description: "How this public event site uses browser storage, sharing and external registration links."
		},
		"/404": {
			title: "Page Not Found",
			description: "This page is outside the programme. Return to Talent Hunt 2K26.",
			noindex: true
		}
	}
};
//#endregion
//#region src/lib/content.ts
var localAssets = /* #__PURE__ */ Object.assign({
	"/public/assets/documents/brochure-qr.jpg": "/assets/brochure-qr-CPppD670.jpg",
	"/public/assets/documents/brochure.jpg": "/assets/brochure-DYg9nCZ1.jpg",
	"/public/assets/logos/acm.png": "/assets/acm-BPO-Nj01.png",
	"/public/assets/logos/acm.webp": "/assets/acm-D1y0I4zd.webp",
	"/public/assets/logos/crescent.png": "/assets/crescent-CXjPYTax.png",
	"/public/assets/logos/csea.png": "/assets/csea-Cj8C_Yhb.png",
	"/public/assets/logos/talent-hunt-mark.svg": "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2064%2064'%3e%3crect%20width='64'%20height='64'%20rx='10'%20fill='%23090b0d'/%3e%3cpath%20d='M8%2015h22v7h-7v27h-8V22H8Zm28%200h8v13h8V15h8v34h-8V36h-8v13h-8Z'%20fill='%23efeedc'/%3e%3cpath%20d='M8%2054h52v3H8Z'%20fill='%23ff5b19'/%3e%3c/svg%3e",
	"/public/assets/logos/talent-hunt.jpg": "/assets/talent-hunt-D2m9EU03.jpg",
	"/public/assets/logos/talent-hunt.png": "/assets/talent-hunt-DmesqptO.png",
	"/public/assets/registration/official-qr.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXIAAAFyAQAAAADAX2ykAAAC3UlEQVR4nO1aUY6jMAy1TaT5LDfoUdKbVXukvQE5Sg8wEnxWAnllJ7Qsu5tQacvA4Cc1hfp9WHHj2C9BhlcQ6CU6gPHzoIJ9DuPnQQX7HMbPgwr2OYyfBxXscxj/CPODCS4+QZABOgcA3Wi7rOjPctAL3APzPQtaAB3Acw8QagC8QKUm3rb/i0EH5XdphSKemRHrigFOPXATV7db25+loMXMiKPzuemcLOIBwd+crN+v9acEKjKOzXf/tKB8GLp1/SHjvyW+J9lgO4nq6VMiWzECVD36nwBTCcTmPw/aJj9oiVxLaXX7YPBaZLVqGmL5vK4/i0HLqQdev/x4Z4AeOJx7mC7s9fwh4//X+YHY/Pi2Sv2RFMyxdGZ+DG3FsYVqbP7zoE3Gl1PXq5FO/a+GdqT0qUW2+O4yviALVqsqbsauV5/0tzhYfPcbX5YMHAPq/5quOcHW7175gwjOH6yqM/+oB4RwTqqkRtr05z33v+FS9dr6cqir+BP6dnDgW2maYHAb9Z+Mn4WLX54H0aocoDzJqwPoam2X3Ch3CGw+86Ct1lcs+2+qtGKRxdoV6U78gO2/u+SznCrg9eZEtRoL5vAUOSRd2/nvrs8XBoyqVahb2XpViR7Eqom7XssfMv7b8jNrk/Sw+Hjcr42T9EyWn/euP5/uCHD6dM8Fi/rRSK/jDxn/XfoVNypTjapGKrcmcrTVV3v9f3I6QZgKkniR+3UqZ4nwYfXVt7g/CeF8R7zyPWZl0EuUKfDr+bMc9AL3wHz/vD8pTZJcnUxnDvGQQdTLNf1ZDFpOPTS/e9xwjvkZRhEa5Tp0vXn/l4KOzg8SVd1/rzc3Fll68PA1/hRAJcLB+W72rnmYoUNpiFhEDsnejeXnnd/P4VHfSHc1Rv0ZNF3b+e/O45uQ+t8IHw0pvqZffZf7kzwx8+/D9vwn42dBefMfMH4eVLDPYfw8qGCfw/h5UME+h/HzePf8/AIk4rBIafiM+AAAAABJRU5ErkJggg=="
});
var assetExists = (path) => !!path && Object.hasOwn(localAssets, `/public${path}`);
var safeUrl = (url) => {
	try {
		return !!url && new URL(url).protocol === "https:";
	} catch {
		return false;
	}
};
function isGoogleForm(url) {
	try {
		const u = new URL(url || "");
		return u.protocol === "https:" && !u.username && !u.password && (u.hostname === "docs.google.com" && u.pathname.startsWith("/forms/") || u.hostname === "forms.gle" && u.pathname.length > 1);
	} catch {
		return false;
	}
}
function validInstant(value, zone) {
	if (!value || !zone || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:\d{2})$/.test(value)) return false;
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
			hourCycle: "h23"
		}).formatToParts(date);
		const get = (name) => parts.find((p) => p.type === name)?.value;
		return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}:${get("second")}` === value.slice(0, 19);
	} catch {
		return false;
	}
}
function registrationStatus(config, now, qrAvailable = assetExists(config.qr)) {
	if (!isGoogleForm(config.url) || !config.qrVerified || !qrAvailable) return "unconfigured";
	if (config.mode === "published") return config.opensAt || config.closesAt || config.timezone ? "unconfigured" : "available";
	if (!validInstant(config.opensAt, config.timezone) || !validInstant(config.closesAt, config.timezone)) return "unconfigured";
	const start = Date.parse(config.opensAt);
	const end = Date.parse(config.closesAt);
	if (start >= end) return "unconfigured";
	return now < start ? "soon" : now >= end ? "closed" : "open";
}
function countdown(config, now) {
	if (!config.enabled || !validInstant(config.startsAt, config.timezone) || config.startsAt.slice(0, 10) !== siteData.settings.date) return null;
	const remaining = Math.max(0, Date.parse(config.startsAt) - now);
	const seconds = Math.floor(remaining / 1e3);
	return {
		remaining,
		days: Math.floor(seconds / 86400),
		hours: Math.floor(seconds / 3600) % 24,
		minutes: Math.floor(seconds / 60) % 60,
		seconds: seconds % 60
	};
}
function isArchived(now) {
	if (siteData.countdown.timezone) try {
		const p = new Intl.DateTimeFormat("en-CA", {
			timeZone: siteData.countdown.timezone,
			year: "numeric",
			month: "2-digit",
			day: "2-digit"
		}).formatToParts(now);
		const get = (t) => p.find((v) => v.type === t)?.value;
		return `${get("year")}-${get("month")}-${get("day")}` > siteData.settings.date;
	} catch {}
	return now >= Date.parse(`${siteData.settings.date}T23:59:59-12:00`) + 1e3;
}
var inCategory = (category, records = siteData.events) => records.filter((e) => e.category === category).sort((a, b) => a.order - b.order);
function neighbours(event) {
	const list = inCategory(event.category);
	const i = list.findIndex((e) => e.id === event.id);
	return {
		previous: list[i - 1],
		next: list[i + 1]
	};
}
function validateEvents(records) {
	const errors = [];
	const ids = /* @__PURE__ */ new Set();
	const slugs = /* @__PURE__ */ new Set();
	for (const e of records) {
		if (!e.id || typeof e.name !== "string" || !e.name.trim() || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(e.slug) || ["technical", "non-technical"].includes(e.slug)) errors.push(`Missing or invalid properties: ${e.id}`);
		if (ids.has(e.id)) errors.push(`Duplicate ID: ${e.id}`);
		if (slugs.has(e.slug)) errors.push(`Duplicate slug: ${e.slug}`);
		ids.add(e.id);
		slugs.add(e.slug);
		if (!["technical", "non-technical"].includes(e.category)) errors.push(`Invalid category: ${e.id}`);
		if (!Number.isInteger(e.order) || e.order < 1) errors.push(`Invalid order: ${e.id}`);
	}
	for (const cat of ["technical", "non-technical"]) if (inCategory(cat, records).some((e, i) => e.order !== i + 1)) errors.push(`Invalid category sequence: ${cat}`);
	for (const e of records) for (const id of e.relatedIds) if (!ids.has(id) || id === e.id) errors.push(`Invalid related reference: ${e.id}/${id}`);
	return errors;
}
function validateSiteData() {
	const errors = validateEvents(siteData.events);
	if (!siteData.settings.title || !siteData.settings.college || !siteData.settings.eligibility) errors.push("Missing required global content");
	if (!/^\d{4}-\d{2}-\d{2}$/.test(siteData.settings.date)) errors.push("Invalid official date");
	const ids = /* @__PURE__ */ new Set();
	for (const a of siteData.announcements) {
		if (!a.id || !a.message || ids.has(a.id)) errors.push(`Missing or duplicate announcement: ${a.id}`);
		ids.add(a.id);
	}
	return errors;
}
var publicRoutes = [...Object.keys(siteData.pages).filter((p) => p !== "/404"), ...siteData.events.map((e) => `/events/${e.slug}`)];
function metadata(path) {
	const e = siteData.events.find((e) => `/events/${e.slug}` === path);
	const page = e ? {
		title: e.name,
		description: e.description || `${e.name} — ${siteData.categories[e.category].short} competition at Talent Hunt 2K26. ${siteData.settings.dateLabel}. ${siteData.settings.eligibility}.`,
		image: assetExists(e.socialImage) ? e.socialImage : void 0
	} : siteData.pages[path] || siteData.pages["/404"];
	return {
		...page,
		title: path === "/" ? page.title : `${page.title} | ${siteData.settings.title}`,
		image: page.image || (assetExists(siteData.assets.defaultSocial) ? siteData.assets.defaultSocial : void 0)
	};
}
//#endregion
//#region src/components/BrandWordmark.tsx
/** A crisp, native wordmark that stays legible at navigation sizes. */
function BrandWordmark({ size = "header" }) {
	return /* @__PURE__ */ jsxs("span", {
		className: `talent-wordmark talent-wordmark-${size}`,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "talent-wordmark-top",
				children: "TALENT"
			}),
			/* @__PURE__ */ jsxs("span", {
				className: "talent-wordmark-bottom",
				children: ["HUNT", /* @__PURE__ */ jsx("span", {
					className: "talent-wordmark-edition",
					children: "2K26"
				})]
			}),
			/* @__PURE__ */ jsx("span", {
				className: "talent-wordmark-caption",
				children: "CRESCENT / CSE"
			})
		]
	});
}
//#endregion
//#region src/components/Experience.tsx
var editorialEase = [
	.22,
	1,
	.36,
	1
];
var ExperienceContext = createContext({ ready: true });
var useExperience = () => useContext(ExperienceContext);
function Opening({ dismiss }) {
	const dialog = useRef(null);
	const reduced = useReducedMotion();
	const [interacting, setInteracting] = useState(false);
	useEffect(() => {
		const element = dialog.current;
		const previousFocus = document.activeElement;
		const previousOverflow = document.body.style.overflow;
		element?.showModal();
		document.body.style.overflow = "hidden";
		return () => {
			element?.close();
			document.body.style.overflow = previousOverflow;
			if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus({ preventScroll: true });
		};
	}, []);
	useEffect(() => {
		if (reduced || interacting) return;
		const timer = window.setTimeout(dismiss, 3800);
		return () => window.clearTimeout(timer);
	}, [
		dismiss,
		reduced,
		interacting
	]);
	return /* @__PURE__ */ jsxs(motion.dialog, {
		ref: dialog,
		className: "opening",
		"aria-label": "Opening animation",
		"aria-describedby": "opening-description",
		onCancel: (event) => {
			event.preventDefault();
			dismiss();
		},
		onKeyDown: (event) => {
			if (event.key !== "Tab") return;
			setInteracting(true);
			const buttons = event.currentTarget.querySelectorAll("button");
			const first = buttons[0];
			const last = buttons[buttons.length - 1];
			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last?.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first?.focus();
			}
		},
		initial: false,
		exit: reduced ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" },
		transition: {
			duration: reduced ? 0 : .85,
			ease: editorialEase
		},
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "opening-grain",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ jsx("div", {
				className: "opening-frame",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "opening-top",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "opening-brand",
					children: [/* @__PURE__ */ jsx(BrandWordmark, { size: "opening" }), /* @__PURE__ */ jsxs("span", { children: [
						"CRESCENT ",
						/* @__PURE__ */ jsx("span", {
							className: "opening-brand-divider",
							children: "/"
						}),
						" CSE"
					] })]
				}), /* @__PURE__ */ jsxs("button", {
					type: "button",
					className: "opening-skip",
					onClick: dismiss,
					autoFocus: true,
					children: ["Skip intro ", /* @__PURE__ */ jsx("span", {
						"aria-hidden": "true",
						children: "↗"
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "opening-main",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "opening-copy",
					children: [
						/* @__PURE__ */ jsxs(motion.p, {
							className: "opening-kicker",
							initial: reduced ? false : {
								opacity: 0,
								y: 10
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								delay: .15,
								duration: .6
							},
							children: [/* @__PURE__ */ jsx("span", {}), " THE STAGE IS YOURS"]
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "opening-title",
							"aria-label": "Talent Hunt 2K26",
							children: ["TALENT", "HUNT."].map((word, index) => /* @__PURE__ */ jsx("span", {
								className: "opening-mask",
								"aria-hidden": "true",
								children: /* @__PURE__ */ jsx(motion.span, {
									initial: reduced ? false : {
										y: "110%",
										rotate: 3
									},
									animate: {
										y: "0%",
										rotate: 0
									},
									transition: {
										duration: 1.15,
										delay: .22 + index * .16,
										ease: editorialEase
									},
									children: word
								})
							}, word))
						}),
						/* @__PURE__ */ jsxs(motion.div, {
							className: "opening-caption",
							initial: reduced ? false : {
								opacity: 0,
								y: 14
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .8,
								delay: .85,
								ease: editorialEase
							},
							children: [/* @__PURE__ */ jsx("span", {
								className: "opening-edition",
								children: "2K26"
							}), /* @__PURE__ */ jsxs("p", {
								id: "opening-description",
								children: [
									"Sixteen competitions.",
									/* @__PURE__ */ jsx("br", {}),
									"One moment to make yours."
								]
							})]
						})
					]
				}), /* @__PURE__ */ jsxs(motion.div, {
					className: "opening-emblem",
					"aria-hidden": "true",
					initial: reduced ? false : {
						opacity: 0,
						scale: .8,
						rotate: -20
					},
					animate: {
						opacity: 1,
						scale: 1,
						rotate: 0
					},
					transition: {
						duration: 1.6,
						delay: .35,
						ease: editorialEase
					},
					children: [
						/* @__PURE__ */ jsxs(motion.svg, {
							viewBox: "0 0 400 400",
							className: "opening-orbit",
							fill: "none",
							initial: reduced ? false : { rotate: 0 },
							animate: reduced ? {} : { rotate: 65 },
							transition: {
								duration: 4.6,
								ease: "easeOut"
							},
							children: [
								/* @__PURE__ */ jsx("circle", {
									cx: "200",
									cy: "200",
									r: "181"
								}),
								/* @__PURE__ */ jsx("circle", {
									cx: "200",
									cy: "200",
									r: "155",
									strokeDasharray: "1 15"
								}),
								/* @__PURE__ */ jsx(motion.path, {
									d: "M200 19a181 181 0 0 1 181 181",
									className: "opening-orbit-accent",
									initial: reduced ? false : { pathLength: 0 },
									animate: { pathLength: 1 },
									transition: {
										duration: 1.4,
										delay: .5,
										ease: editorialEase
									}
								}),
								[
									0,
									90,
									180,
									270
								].map((angle) => /* @__PURE__ */ jsx("path", {
									d: "M200 9v20",
									transform: `rotate(${angle} 200 200)`
								}, angle))
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "opening-date",
							children: [/* @__PURE__ */ jsx("span", { children: "26" }), /* @__PURE__ */ jsx("small", { children: "OCTOBER / 2026" })]
						}),
						/* @__PURE__ */ jsx(motion.span, {
							className: "opening-star",
							initial: reduced ? false : {
								rotate: -90,
								scale: 0
							},
							animate: {
								rotate: 0,
								scale: 1
							},
							transition: {
								delay: .9,
								duration: 1.2,
								ease: editorialEase
							},
							children: "✳"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "opening-emblem-label",
							children: "CREATE. COMPETE. EXPRESS."
						})
					]
				})]
			}),
			/* @__PURE__ */ jsxs(motion.div, {
				className: "opening-bottom",
				initial: false,
				animate: { opacity: 1 },
				transition: {
					delay: .6,
					duration: .6
				},
				children: [
					/* @__PURE__ */ jsxs("p", { children: [
						"DEPARTMENT OF COMPUTER",
						/* @__PURE__ */ jsx("br", {}),
						"SCIENCE & ENGINEERING"
					] }),
					/* @__PURE__ */ jsxs("button", {
						className: "opening-enter",
						type: "button",
						onClick: dismiss,
						children: ["Enter the experience ", /* @__PURE__ */ jsx("span", {
							"aria-hidden": "true",
							children: "↗"
						})]
					}),
					/* @__PURE__ */ jsx("span", {
						className: "opening-index",
						"aria-hidden": "true",
						children: "TH — 026"
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "opening-progress",
				"aria-hidden": "true",
				children: /* @__PURE__ */ jsx(motion.span, {
					initial: reduced ? false : { scaleX: 0 },
					animate: { scaleX: 1 },
					transition: {
						duration: reduced ? 0 : 3.8,
						ease: "linear"
					}
				})
			})
		]
	});
}
function ExperienceProvider({ children }) {
	const [stage, setStage] = useState("pending");
	const reduced = useReducedMotion();
	const seenInMemory = useRef(false);
	const dismiss = useCallback(() => {
		setStage("leaving");
		seenInMemory.current = true;
		try {
			sessionStorage.setItem("th26:intro", "seen");
		} catch {}
	}, []);
	useEffect(() => {
		const forced = new URLSearchParams(window.location.search).has("intro") || window.location.hash === "#intro";
		let seen = seenInMemory.current;
		try {
			seen ||= sessionStorage.getItem("th26:intro") === "seen" || sessionStorage.getItem("th26:intro:dismissed") === "1";
		} catch {}
		setStage(reduced || seen && !forced ? "ready" : "playing");
		const replay = () => setStage("playing");
		window.addEventListener("replay-intro", replay);
		return () => window.removeEventListener("replay-intro", replay);
	}, [reduced]);
	return /* @__PURE__ */ jsxs(ExperienceContext.Provider, {
		value: { ready: stage === "ready" || stage === "leaving" },
		children: [children, /* @__PURE__ */ jsx(AnimatePresence, {
			onExitComplete: () => setStage("ready"),
			children: stage === "playing" && /* @__PURE__ */ jsx(Opening, { dismiss }, "opening")
		})]
	});
}
/** Content stays readable in static HTML; choreography begins after hydration. */
function Entrance({ children, className = "", delay = 0 }) {
	const { ready } = useExperience();
	const reduced = useReducedMotion();
	const controls = useAnimationControls();
	useEffect(() => {
		if (reduced) controls.set({
			opacity: 1,
			y: 0
		});
		else if (!ready) controls.set({
			opacity: 0,
			y: 28
		});
		else controls.start({
			opacity: 1,
			y: 0,
			transition: {
				duration: .95,
				delay,
				ease: editorialEase
			}
		});
	}, [
		ready,
		reduced,
		controls,
		delay
	]);
	return /* @__PURE__ */ jsx(motion.div, {
		"data-entrance": "",
		className,
		initial: false,
		animate: controls,
		children
	});
}
function ReadingProgress() {
	const { scrollYProgress } = useScroll();
	const reduced = useReducedMotion();
	const progress = useSpring(scrollYProgress, {
		stiffness: 160,
		damping: 32
	});
	return /* @__PURE__ */ jsx(motion.div, {
		className: "reading-progress",
		"aria-hidden": "true",
		style: { scaleX: reduced ? scrollYProgress : progress }
	});
}
//#endregion
//#region src/components/UI.tsx
function Arrow({ back = false }) {
	return /* @__PURE__ */ jsx("span", {
		"aria-hidden": "true",
		children: back ? "↙" : "↗"
	});
}
function Eyebrow({ children }) {
	return /* @__PURE__ */ jsxs("p", {
		className: "eyebrow",
		children: [/* @__PURE__ */ jsx("span", {
			"aria-hidden": "true",
			className: "signal"
		}), children]
	});
}
function SmartImage({ src, alt, fallback = null, ...props }) {
	const [failed, setFailed] = useState(false);
	useEffect(() => setFailed(false), [src]);
	return !src || failed || !assetExists(src) ? /* @__PURE__ */ jsx(Fragment, { children: fallback }) : /* @__PURE__ */ jsx("img", {
		...props,
		src,
		alt,
		onError: () => setFailed(true)
	});
}
function Reveal({ children, className = "", delay = 0 }) {
	const reduced = useReducedMotion();
	return /* @__PURE__ */ jsx(motion.div, {
		className,
		initial: false,
		whileInView: reduced ? {} : {
			y: [26, 0],
			opacity: [.45, 1]
		},
		viewport: {
			once: true,
			amount: .12
		},
		transition: {
			duration: reduced ? 0 : .85,
			delay,
			ease: editorialEase
		},
		children
	});
}
function ButtonLink({ to, children, secondary = false }) {
	const ref = useRef(null);
	const reduced = useReducedMotion();
	return /* @__PURE__ */ jsxs(Link, {
		ref,
		className: `button ${secondary ? "button-secondary" : ""}`,
		to,
		onPointerMove: (e) => {
			if (e.pointerType !== "mouse" || reduced || !ref.current) return;
			const r = e.currentTarget.getBoundingClientRect();
			ref.current.style.translate = `${(e.clientX - r.left - r.width / 2) * .07}px ${(e.clientY - r.top - r.height / 2) * .1}px`;
		},
		onPointerLeave: () => {
			if (ref.current) ref.current.style.translate = "0 0";
		},
		onBlur: () => {
			if (ref.current) ref.current.style.translate = "0 0";
		},
		children: [children, /* @__PURE__ */ jsx(Arrow, {})]
	});
}
function BrochureLink({ small = false }) {
	return assetExists(siteData.assets.brochurePdf) ? /* @__PURE__ */ jsxs("a", {
		className: small ? "text-link" : "button button-secondary",
		href: siteData.assets.brochurePdf,
		download: true,
		children: ["Download Brochure ", /* @__PURE__ */ jsx("span", {
			"aria-hidden": "true",
			children: "↓"
		})]
	}) : assetExists(siteData.assets.brochureImage) ? /* @__PURE__ */ jsxs("a", {
		className: small ? "text-link" : "button button-secondary",
		href: siteData.assets.brochureImage,
		target: "_blank",
		rel: "noopener noreferrer",
		children: ["View Official Brochure ", /* @__PURE__ */ jsx(Arrow, {})]
	}) : /* @__PURE__ */ jsx("span", {
		className: "muted",
		children: "Brochure download will be available when supplied."
	});
}
var drawings = [
	/* @__PURE__ */ jsx("path", { d: "m75 76-40 44 40 44m90-88 40 44-40 44m-26-104-35 120" }),
	/* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("rect", {
		x: "32",
		y: "55",
		width: "176",
		height: "130",
		rx: "8"
	}), /* @__PURE__ */ jsx("path", { d: "M32 84h176M47 70h2m12 0h2m12 0h2M55 105h55v54H55zm72 2h58m-58 20h45m-45 20h58" })] }),
	/* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("path", { d: "m65 65 110 18-92 89 100-8M65 65l18 107m92-89 8 81M65 65l118 99M83 172l92-89" }), [
		[65, 65],
		[175, 83],
		[83, 172],
		[183, 164],
		[120, 118]
	].map(([x, y]) => /* @__PURE__ */ jsx("circle", {
		cx: x,
		cy: y,
		r: "13"
	}, x))] }),
	/* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx("rect", {
			x: "65",
			y: "65",
			width: "110",
			height: "110",
			rx: "15"
		}),
		/* @__PURE__ */ jsx("rect", {
			x: "89",
			y: "89",
			width: "62",
			height: "62",
			rx: "3"
		}),
		[
			85,
			120,
			155
		].map((n) => /* @__PURE__ */ jsx("path", { d: `M${n} 40v25m0 110v25M40 ${n}h25m110 0h25` }, n))
	] }),
	/* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx("path", { d: "M70 80h100c22 0 44 91 26 99-16 8-40-28-46-28H90c-6 0-30 36-46 28-18-8 4-99 26-99Z" }),
		/* @__PURE__ */ jsx("path", { d: "M69 105v38m-19-19h38" }),
		/* @__PURE__ */ jsx("circle", {
			cx: "163",
			cy: "113",
			r: "6"
		}),
		/* @__PURE__ */ jsx("circle", {
			cx: "178",
			cy: "135",
			r: "6"
		})
	] }),
	/* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("rect", {
		x: "94",
		y: "40",
		width: "52",
		height: "108",
		rx: "26"
	}), /* @__PURE__ */ jsx("path", { d: "M73 118a47 47 0 0 0 94 0m-47 47v35m-30 0h60M95 69h50m-50 21h50" })] }),
	/* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("path", { d: "m120 30 77 30v62c0 39-77 88-77 88s-77-49-77-88V60Z" }), /* @__PURE__ */ jsx("path", { d: "m86 119 24 24 47-48" })] }),
	/* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("path", { d: "m120 34 22 63 64 23-64 23-22 63-23-63-63-23 63-23Z" }), /* @__PURE__ */ jsx("path", { d: "m185 24 8 20 20 8-20 8-8 20-8-20-20-8 20-8Z" })] }),
	/* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx("path", { d: "M38 78h45l13-23h48l13 23h45v105H38Z" }),
		/* @__PURE__ */ jsx("circle", {
			cx: "120",
			cy: "128",
			r: "34"
		}),
		/* @__PURE__ */ jsx("circle", {
			cx: "120",
			cy: "128",
			r: "19"
		}),
		/* @__PURE__ */ jsx("path", { d: "M166 96h20" })
	] }),
	/* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("circle", {
		cx: "100",
		cy: "100",
		r: "60"
	}), /* @__PURE__ */ jsx("path", { d: "m143 143 60 60M85 80c5-20 35-20 35 0 0 14-20 14-20 30m0 14v3" })] }),
	/* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("path", { d: "M101 72c0-26 38-26 38-3 0 13-19 15-19 29v16l84 53c10 7 2 16-9 16H45c-11 0-19-9-9-16l84-53" }) }),
	/* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("rect", {
		x: "30",
		y: "59",
		width: "180",
		height: "122",
		rx: "30"
	}), /* @__PURE__ */ jsx("path", { d: "m101 91 49 30-49 30Z" })] }),
	/* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("path", { d: "M45 141v-23a75 75 0 0 1 150 0v39H85l-22 32-20-18 20-29m42-64h70m-78 48h103" }), /* @__PURE__ */ jsx("path", { d: "M120 42v35" })] }),
	/* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("circle", {
		cx: "120",
		cy: "120",
		r: "85"
	}), /* @__PURE__ */ jsx("path", { d: "m120 87 34 25-13 40H99l-13-40Zm0 0V35m34 77 47-21m-60 61 26 40m-68-40-26 40m13-80L39 91" })] }),
	/* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("path", { d: "m33 65 87 108 87-108M33 105l87 108 87-108" }), /* @__PURE__ */ jsx("path", { d: "m83 46 37 46 37-46" })] }),
	/* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("path", { d: "m86 42 64 64-32 32-64-64Zm33 95 67 67m-59-163 46 46M44 81l46 46M37 199h75v13H37Z" }) })
];
function EventArt({ event, hero = false, shared = true }) {
	const reduced = useReducedMotion();
	const i = siteData.events.findIndex((e) => e.id === event.id);
	return /* @__PURE__ */ jsxs(motion.div, {
		layoutId: reduced || !shared ? void 0 : `art-${event.id}`,
		transition: { layout: {
			duration: .65,
			ease: [
				.22,
				1,
				.36,
				1
			]
		} },
		className: `event-art art-${i % 4} ${event.category === "non-technical" ? "art-orange" : ""} ${hero ? "art-hero" : ""}`,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ jsx("span", { className: "art-grid" }),
			/* @__PURE__ */ jsx("span", { className: "art-light" }),
			/* @__PURE__ */ jsx("span", { className: "art-sculpture" }),
			/* @__PURE__ */ jsx("span", { className: "art-orbit" }),
			/* @__PURE__ */ jsx("span", { className: "art-orbit art-orbit-second" }),
			/* @__PURE__ */ jsx("span", {
				className: "art-type",
				children: event.name
			}),
			/* @__PURE__ */ jsx("span", {
				className: "art-number",
				children: String(event.order).padStart(2, "0")
			}),
			event.artwork && assetExists(event.artwork) ? /* @__PURE__ */ jsx(SmartImage, {
				src: event.artwork,
				alt: ""
			}) : /* @__PURE__ */ jsx("svg", {
				viewBox: "0 0 240 240",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "4",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				children: drawings[i] || drawings[0]
			}),
			/* @__PURE__ */ jsxs("span", {
				className: "art-caption",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "art-crosshair",
						children: "+"
					}),
					" TH / 26",
					" ",
					/* @__PURE__ */ jsx("span", { className: "art-barcode" })
				]
			})
		]
	});
}
function EventCard({ event }) {
	const reduced = useReducedMotion();
	const reset = (element) => {
		element.style.setProperty("--tilt-x", "0deg");
		element.style.setProperty("--tilt-y", "0deg");
	};
	return /* @__PURE__ */ jsx(motion.article, {
		layout: !reduced,
		initial: false,
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		whileInView: reduced ? {} : {
			y: [32, 0],
			opacity: [.4, 1]
		},
		viewport: {
			once: true,
			amount: .12
		},
		transition: {
			duration: reduced ? 0 : .8,
			delay: reduced ? 0 : (event.order - 1) % 3 * .09,
			ease: [
				.16,
				1,
				.3,
				1
			],
			layout: { duration: .35 }
		},
		className: `event-card ${event.category === "non-technical" ? "card-orange" : ""}`,
		style: { "--card-order": (event.order - 1) % 3 },
		children: /* @__PURE__ */ jsxs(Link, {
			to: `/events/${event.slug}`,
			"aria-label": `Explore ${event.name}`,
			onPointerMove: (e) => {
				if (reduced || e.pointerType !== "mouse") return;
				const r = e.currentTarget.getBoundingClientRect();
				const x = (e.clientX - r.left) / r.width;
				const y = (e.clientY - r.top) / r.height;
				e.currentTarget.style.setProperty("--tilt-x", `${(.5 - y) * 8}deg`);
				e.currentTarget.style.setProperty("--tilt-y", `${(x - .5) * 8}deg`);
				e.currentTarget.style.setProperty("--pointer-x", `${x * 100}%`);
				e.currentTarget.style.setProperty("--pointer-y", `${y * 100}%`);
			},
			onPointerLeave: (e) => reset(e.currentTarget),
			onBlur: (e) => reset(e.currentTarget),
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "card-topline",
					children: [/* @__PURE__ */ jsxs("span", {
						className: "card-category",
						children: [/* @__PURE__ */ jsx("span", { className: "card-category-dot" }), siteData.categories[event.category].short]
					}), /* @__PURE__ */ jsx("span", {
						className: "card-edition",
						children: /* @__PURE__ */ jsxs("span", {
							className: "card-edition-num",
							children: ["#0", event.order]
						})
					})]
				}),
				/* @__PURE__ */ jsx(EventArt, { event }),
				/* @__PURE__ */ jsxs("div", {
					className: "card-copy",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "card-badges-row",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "card-chip",
									children: "2026 EDITION"
								}),
								/* @__PURE__ */ jsx("span", {
									className: "card-chip",
									children: event.category === "technical" ? "TECH ARENA" : "OPEN ARENA"
								}),
								/* @__PURE__ */ jsxs("span", {
									className: "card-chip card-venue-chip",
									title: "Event Venue",
									children: ["📍 ", event.venue || "VENUE TBA"]
								})
							]
						}),
						/* @__PURE__ */ jsx(motion.h3, {
							layoutId: reduced ? void 0 : `title-${event.id}`,
							children: event.name
						}),
						event.description && /* @__PURE__ */ jsx("p", { children: event.description }),
						/* @__PURE__ */ jsxs("span", {
							className: "card-action",
							children: [/* @__PURE__ */ jsxs("span", {
								className: "card-action-label",
								children: [/* @__PURE__ */ jsx("span", { children: "Explore Event" }), /* @__PURE__ */ jsx("span", {
									className: "card-action-sub",
									children: "Brochure Official"
								})]
							}), /* @__PURE__ */ jsx("span", {
								className: "card-arrow",
								children: /* @__PURE__ */ jsx(Arrow, {})
							})]
						})
					]
				})
			]
		})
	});
}
function EventGrid({ events }) {
	return /* @__PURE__ */ jsx("div", {
		className: "event-grid",
		children: /* @__PURE__ */ jsx(AnimatePresence, {
			initial: false,
			children: events.map((e) => /* @__PURE__ */ jsx(EventCard, { event: e }, e.id))
		})
	});
}
function Accordion({ faq }) {
	const [open, setOpen] = useState(false);
	const id = useId();
	const reduced = useReducedMotion();
	return /* @__PURE__ */ jsxs("div", {
		className: "accordion",
		children: [/* @__PURE__ */ jsx("h3", { children: /* @__PURE__ */ jsxs("button", {
			"aria-expanded": open,
			"aria-controls": id,
			onClick: () => setOpen(!open),
			children: [faq.question, /* @__PURE__ */ jsx("span", {
				"aria-hidden": "true",
				children: open ? "−" : "+"
			})]
		}) }), /* @__PURE__ */ jsx(motion.div, {
			id,
			hidden: !open,
			initial: false,
			animate: {
				height: open ? "auto" : 0,
				opacity: open ? 1 : 0
			},
			transition: { duration: reduced ? 0 : .25 },
			children: /* @__PURE__ */ jsx("p", { children: faq.answer })
		})]
	});
}
function CoordinatorCard({ person }) {
	return /* @__PURE__ */ jsxs("article", {
		className: "person",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "micro",
				children: person.role
			}),
			/* @__PURE__ */ jsx("h3", { children: person.name }),
			person.phone && /^\+?[\d ()-]{7,20}$/.test(person.phone) && /* @__PURE__ */ jsx("a", {
				href: `tel:${person.phone.replace(/[ ()-]/g, "")}`,
				children: person.phone
			}),
			person.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(person.email) && /* @__PURE__ */ jsx("a", {
				href: `mailto:${person.email}`,
				children: person.email
			}),
			safeUrl(person.url) && /* @__PURE__ */ jsxs("a", {
				href: person.url,
				target: "_blank",
				rel: "noopener noreferrer",
				children: ["Contact ", /* @__PURE__ */ jsx(Arrow, {})]
			})
		]
	});
}
var dismissedMemory = /* @__PURE__ */ new Set();
function AnnouncementBanner({ announcement }) {
	const [dismissed, setDismissed] = useState(true);
	useEffect(() => {
		let value = dismissedMemory.has(announcement.id);
		try {
			value ||= localStorage.getItem(`th26:announcement:${announcement.id}`) === "dismissed";
		} catch {}
		setDismissed(value);
	}, [announcement.id]);
	if (dismissed) return null;
	return /* @__PURE__ */ jsxs("aside", {
		className: "announcement",
		children: [/* @__PURE__ */ jsxs("p", { children: [
			announcement.message,
			" ",
			safeUrl(announcement.url) && /* @__PURE__ */ jsx("a", {
				href: announcement.url,
				target: "_blank",
				rel: "noopener noreferrer",
				children: "Read more ↗"
			})
		] }), /* @__PURE__ */ jsx("button", {
			"aria-label": "Dismiss announcement",
			onClick: () => {
				dismissedMemory.add(announcement.id);
				try {
					localStorage.setItem(`th26:announcement:${announcement.id}`, "dismissed");
				} catch {}
				setDismissed(true);
			},
			children: "×"
		})]
	});
}
function ShareActions() {
	const [message, setMessage] = useState("");
	const [canShare, setCanShare] = useState(false);
	useEffect(() => setCanShare(typeof navigator.share === "function"), []);
	async function copy() {
		try {
			await navigator.clipboard.writeText(window.location.href);
			setMessage("Link copied.");
		} catch {
			setMessage("Copy was unavailable. Select and copy the link below.");
		}
	}
	return /* @__PURE__ */ jsxs("div", {
		className: "share",
		children: [
			/* @__PURE__ */ jsx("button", {
				className: "text-link",
				onClick: copy,
				children: "Copy Link ↗"
			}),
			canShare && /* @__PURE__ */ jsx("button", {
				className: "text-link",
				onClick: async () => {
					try {
						await navigator.share({
							title: document.title,
							url: window.location.href
						});
						setMessage("Share dialog completed.");
					} catch (e) {
						setMessage(e instanceof Error && e.name === "AbortError" ? "Sharing cancelled." : "Sharing unavailable. Use Copy Link.");
					}
				},
				children: "Share ↗"
			}),
			/* @__PURE__ */ jsx("span", {
				role: "status",
				children: message
			}),
			message.startsWith("Copy was") && /* @__PURE__ */ jsx("input", {
				"aria-label": "Page link",
				readOnly: true,
				value: window.location.href,
				onFocus: (e) => e.target.select()
			})
		]
	});
}
var ErrorBoundary = class extends Component {
	state = { failed: false };
	static getDerivedStateFromError() {
		return { failed: true };
	}
	componentDidCatch(error, info) {}
	render() {
		return this.state.failed ? /* @__PURE__ */ jsxs("main", {
			className: "error-screen",
			children: [
				/* @__PURE__ */ jsx(Eyebrow, { children: "TALENT HUNT 2K26" }),
				/* @__PURE__ */ jsxs("h1", { children: [
					"LET’S RESET",
					/* @__PURE__ */ jsx("br", {}),
					"THE STAGE."
				] }),
				/* @__PURE__ */ jsx("p", { children: "Something interrupted this page. Please try again." }),
				/* @__PURE__ */ jsx("button", {
					className: "button",
					onClick: () => this.setState({ failed: false }),
					children: "Try Again"
				}),
				/* @__PURE__ */ jsx("a", {
					className: "button button-secondary",
					href: "/",
					children: "Return Home"
				})
			]
		}) : this.props.children;
	}
};
//#endregion
//#region src/components/Layout.tsx
function Header() {
	const [open, setOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const dialog = useRef(null);
	const toggle = useRef(null);
	const location = useLocation();
	useEffect(() => {
		setOpen(false);
	}, [location.pathname]);
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	useEffect(() => {
		if (open) {
			dialog.current?.showModal();
			document.body.style.overflow = "hidden";
		} else {
			dialog.current?.close();
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);
	const close = () => {
		setOpen(false);
		toggle.current?.focus();
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx("a", {
			href: "#main",
			className: "skip-link",
			children: "Skip to content"
		}),
		/* @__PURE__ */ jsxs("header", {
			className: `site-header ${scrolled ? "scrolled" : ""}`,
			children: [
				/* @__PURE__ */ jsx(Link, {
					to: "/",
					className: "brand",
					"aria-label": "Talent Hunt 2K26 home",
					children: /* @__PURE__ */ jsx(BrandWordmark, {})
				}),
				/* @__PURE__ */ jsx("nav", {
					className: "desktop-nav",
					"aria-label": "Main navigation",
					children: siteData.nav.map((n) => /* @__PURE__ */ jsx(NavLink, {
						end: n.to === "/",
						to: n.to,
						children: n.label
					}, n.to))
				}),
				/* @__PURE__ */ jsxs(Link, {
					to: "/register",
					className: "nav-register",
					children: ["Register ", /* @__PURE__ */ jsx("span", {
						"aria-hidden": "true",
						children: "↗"
					})]
				}),
				/* @__PURE__ */ jsxs("button", {
					ref: toggle,
					className: "menu-toggle",
					"aria-haspopup": "dialog",
					"aria-expanded": open,
					"aria-controls": "mobile-menu",
					onClick: () => setOpen(true),
					children: ["Menu ", /* @__PURE__ */ jsx("span", {
						"aria-hidden": "true",
						children: "☰"
					})]
				})
			]
		}),
		/* @__PURE__ */ jsxs("dialog", {
			ref: dialog,
			id: "mobile-menu",
			className: "mobile-menu",
			"aria-labelledby": "menu-heading",
			onCancel: () => setOpen(false),
			onClose: () => setOpen(false),
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "menu-top",
					children: [/* @__PURE__ */ jsx("span", {
						id: "menu-heading",
						className: "eyebrow",
						children: "FIND YOUR MOMENT"
					}), /* @__PURE__ */ jsx("button", {
						autoFocus: true,
						onClick: close,
						children: "Close ×"
					})]
				}),
				/* @__PURE__ */ jsx("nav", {
					"aria-label": "Mobile navigation",
					children: [...siteData.nav, {
						to: "/register",
						label: "Register"
					}].map((n, i) => /* @__PURE__ */ jsxs(Link, {
						to: n.to,
						onClick: close,
						style: { animationDelay: `${i * 35}ms` },
						children: [
							/* @__PURE__ */ jsxs("span", {
								className: "micro",
								children: ["0", i + 1]
							}),
							n.label,
							/* @__PURE__ */ jsx("span", {
								"aria-hidden": "true",
								children: "↗"
							})
						]
					}, n.to))
				}),
				/* @__PURE__ */ jsx("p", { children: siteData.settings.eligibility })
			]
		})
	] });
}
function Footer() {
	return /* @__PURE__ */ jsxs("footer", {
		className: "site-footer",
		children: [
			/* @__PURE__ */ jsxs(Reveal, {
				className: "footer-top",
				children: [
					/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("p", {
							className: "eyebrow",
							children: "YOUR TALENT. YOUR MOMENT."
						}),
						/* @__PURE__ */ jsx(Link, {
							to: "/",
							className: "footer-wordmark",
							"aria-label": "Talent Hunt 2K26 home",
							children: /* @__PURE__ */ jsx(BrandWordmark, { size: "footer" })
						}),
						/* @__PURE__ */ jsx("p", { children: siteData.copy.footerDescription })
					] }),
					/* @__PURE__ */ jsxs("div", {
						className: "footer-nav",
						children: [/* @__PURE__ */ jsx("h2", { children: "Explore" }), siteData.nav.slice(1).map((n) => /* @__PURE__ */ jsx(Link, {
							to: n.to,
							children: n.label
						}, n.to))]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "footer-connect",
						children: [
							/* @__PURE__ */ jsx("h2", { children: "Stay connected" }),
							siteData.socialLinks.map((s) => /* @__PURE__ */ jsxs("a", {
								href: s.url,
								target: "_blank",
								rel: "noopener noreferrer",
								children: [s.handle, " ↗"]
							}, s.url)),
							/* @__PURE__ */ jsx(BrochureLink, { small: true }),
							/* @__PURE__ */ jsx(Link, {
								to: "/register",
								children: "Registration ↗"
							}),
							/* @__PURE__ */ jsx(Link, {
								to: "/privacy",
								children: "Privacy & your data"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "footer-logos",
				children: [
					/* @__PURE__ */ jsx(SmartImage, {
						className: "college-logo",
						src: siteData.assets.college,
						alt: siteData.settings.college,
						width: "240",
						height: "67",
						loading: "lazy"
					}),
					/* @__PURE__ */ jsx(SmartImage, {
						src: siteData.assets.csea,
						alt: "CSEA",
						width: "70",
						height: "64",
						loading: "lazy"
					}),
					/* @__PURE__ */ jsx(SmartImage, {
						src: siteData.assets.acm,
						alt: "ACM",
						width: "57",
						height: "57",
						loading: "lazy"
					}),
					/* @__PURE__ */ jsxs("p", { children: [
						siteData.settings.school,
						/* @__PURE__ */ jsx("br", {}),
						siteData.settings.department
					] })
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "footer-bottom",
				children: [
					/* @__PURE__ */ jsx("span", { children: siteData.settings.copyright }),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						className: "text-link replay-intro-link",
						onClick: () => window.dispatchEvent(new Event("replay-intro")),
						children: "Replay Opening Intro ↺"
					}),
					/* @__PURE__ */ jsxs("span", { children: [
						siteData.settings.eligibility,
						" ",
						/* @__PURE__ */ jsx("span", {
							"aria-hidden": "true",
							children: "↗"
						})
					] })
				]
			})
		]
	});
}
var scrollMemory = /* @__PURE__ */ new Map();
function NavigationEffects() {
	const location = useLocation();
	const type = useNavigationType();
	const previous = useRef(location.pathname);
	useEffect(() => {
		const m = metadata(location.pathname);
		document.title = m.title;
		for (const [key, value, property] of [
			[
				"description",
				m.description,
				false
			],
			[
				"og:title",
				m.title,
				true
			],
			[
				"og:description",
				m.description,
				true
			],
			[
				"twitter:title",
				m.title,
				false
			],
			[
				"twitter:description",
				m.description,
				false
			]
		]) {
			let el = document.head.querySelector(`meta[${property ? "property" : "name"}="${key}"]`);
			if (!el) {
				el = document.createElement("meta");
				el.setAttribute(property ? "property" : "name", key);
				document.head.appendChild(el);
			}
			el.content = value;
		}
		for (const key of ["og:image", "twitter:image"]) {
			document.head.querySelector(`meta[${key === "og:image" ? "property" : "name"}="${key}"]`)?.remove();
			if (m.image) {
				const el = document.createElement("meta");
				el.setAttribute(key === "og:image" ? "property" : "name", key);
				el.content = siteData.settings.productionUrl ? new URL(m.image, siteData.settings.productionUrl).href : m.image;
				document.head.appendChild(el);
			}
		}
		document.head.querySelector("meta[name=\"robots\"]")?.remove();
		if (m.noindex) {
			const el = document.createElement("meta");
			el.name = "robots";
			el.content = "noindex";
			document.head.appendChild(el);
		}
		document.head.querySelector("link[rel=\"canonical\"]")?.remove();
		document.head.querySelector("meta[property=\"og:url\"]")?.remove();
		if (siteData.settings.productionUrl && !m.noindex) {
			const el = document.createElement("link");
			el.rel = "canonical";
			el.href = new URL(location.pathname, siteData.settings.productionUrl).href;
			document.head.appendChild(el);
			const og = document.createElement("meta");
			og.setAttribute("property", "og:url");
			og.content = el.href;
			document.head.appendChild(og);
		}
	}, [location.pathname]);
	useEffect(() => {
		history.scrollRestoration = "manual";
		const storageKey = location.pathname + location.search + "|" + location.key;
		const save = () => {
			scrollMemory.set(storageKey, window.scrollY);
			try {
				sessionStorage.setItem(`th26:scroll:${storageKey}`, String(window.scrollY));
			} catch {}
		};
		let y = scrollMemory.get(storageKey) || 0;
		try {
			y = Number(sessionStorage.getItem(`th26:scroll:${storageKey}`)) || y;
		} catch {}
		const id = requestAnimationFrame(() => {
			if (type === "POP") window.scrollTo(0, y);
			else if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
			else if (previous.current !== location.pathname) window.scrollTo(0, 0);
			if (previous.current !== location.pathname) {
				document.getElementById("main")?.focus({ preventScroll: true });
				previous.current = location.pathname;
			}
		});
		window.addEventListener("scroll", save, { passive: true });
		return () => {
			cancelAnimationFrame(id);
			window.removeEventListener("scroll", save);
		};
	}, [
		location.key,
		location.pathname,
		location.search,
		location.hash,
		type
	]);
	return null;
}
//#endregion
//#region src/pages/Pages.tsx
function useNow() {
	const [now, setNow] = useState(null);
	useEffect(() => {
		setNow(Date.now());
		const timer = window.setInterval(() => setNow(Date.now()), 1e3);
		return () => clearInterval(timer);
	}, []);
	return now;
}
function DateStrip() {
	const now = useNow();
	const value = now === null ? null : countdown(siteData.countdown, now);
	return /* @__PURE__ */ jsxs("section", {
		className: "date-strip",
		"aria-label": "Event date",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "date-block",
				children: [/* @__PURE__ */ jsx("span", {
					className: "date-number",
					children: "26"
				}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("strong", { children: "OCTOBER 2026" }), /* @__PURE__ */ jsx("span", { children: "MONDAY" })] })]
			}),
			now !== null && isArchived(now) ? /* @__PURE__ */ jsx("p", { children: siteData.settings.archiveMessage }) : value ? value.remaining > 0 ? /* @__PURE__ */ jsxs("div", {
				className: "countdown-panel",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "countdown-kicker",
						children: "YOUR MOMENT IS GETTING CLOSER"
					}),
					/* @__PURE__ */ jsx("div", {
						className: "countdown",
						"aria-label": "Time until event",
						role: "timer",
						children: [
							"days",
							"hours",
							"minutes",
							"seconds"
						].map((key) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(motion.strong, {
							initial: false,
							children: String(value[key]).padStart(2, "0")
						}), /* @__PURE__ */ jsx("span", { children: key })] }, key))
					}),
					/* @__PURE__ */ jsx("span", {
						className: "countdown-start",
						children: siteData.countdown.label
					})
				]
			}) : /* @__PURE__ */ jsx("p", { children: siteData.settings.eventConcludedMessage }) : /* @__PURE__ */ jsxs("div", {
				className: "date-message",
				children: [/* @__PURE__ */ jsx("span", {
					className: "micro",
					children: "MARK YOUR CALENDAR"
				}), /* @__PURE__ */ jsx("p", { children: "The date is set. Your moment is next." })]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "date-venue",
				children: [/* @__PURE__ */ jsx("span", {
					"aria-hidden": "true",
					children: "↗"
				}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("strong", { children: "AUDITORIUM" }), /* @__PURE__ */ jsx("span", { children: "B.S. Abdur Rahman Crescent" })] })]
			})
		]
	});
}
function SectionHeading({ number, title, link, label }) {
	return /* @__PURE__ */ jsxs(Reveal, {
		className: "section-heading",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("p", {
			className: "eyebrow",
			children: [number, " / FIND YOUR ARENA"]
		}), /* @__PURE__ */ jsx("h2", { children: title })] }), link && /* @__PURE__ */ jsxs(Link, {
			className: "text-link",
			to: link,
			children: [
				label || "View all events",
				" ",
				/* @__PURE__ */ jsx(Arrow, {})
			]
		})]
	});
}
function Featured() {
	const list = siteData.featuredIds.map((id) => siteData.events.find((e) => e.id === id)).filter((e) => !!e);
	const [index, setIndex] = useState(0);
	const [hover, setHover] = useState(false);
	const [focus, setFocus] = useState(false);
	const [paused, setPaused] = useState(false);
	const reduced = useReducedMotion();
	useEffect(() => {
		if (list.length < 2 || hover || focus || paused || reduced) return;
		const timer = window.setInterval(() => setIndex((i) => (i + 1) % list.length), 5500);
		return () => clearInterval(timer);
	}, [
		list.length,
		hover,
		focus,
		paused,
		reduced
	]);
	if (!list.length) return null;
	const event = list[index % list.length];
	return /* @__PURE__ */ jsxs("section", {
		className: "featured",
		"aria-roledescription": "carousel",
		"aria-label": "Featured events",
		onMouseEnter: () => setHover(true),
		onMouseLeave: () => setHover(false),
		onFocus: () => setFocus(true),
		onBlur: (e) => {
			if (!e.currentTarget.contains(e.relatedTarget)) setFocus(false);
		},
		children: [/* @__PURE__ */ jsxs("div", {
			className: "featured-copy",
			children: [
				/* @__PURE__ */ jsx(Eyebrow, { children: "IN THE SPOTLIGHT" }),
				/* @__PURE__ */ jsxs("h2", { children: [
					"FIND YOUR",
					/* @__PURE__ */ jsx("br", {}),
					/* @__PURE__ */ jsx("em", { children: "MAIN EVENT." })
				] }),
				/* @__PURE__ */ jsxs("div", {
					className: "carousel-controls",
					children: [
						/* @__PURE__ */ jsx("button", {
							"aria-label": "Previous featured event",
							onClick: () => setIndex((i) => (i - 1 + list.length) % list.length),
							children: "←"
						}),
						/* @__PURE__ */ jsxs("span", { children: [
							String(index + 1).padStart(2, "0"),
							" /",
							" ",
							String(list.length).padStart(2, "0")
						] }),
						/* @__PURE__ */ jsx("button", {
							"aria-label": "Next featured event",
							onClick: () => setIndex((i) => (i + 1) % list.length),
							children: "→"
						}),
						/* @__PURE__ */ jsx("button", {
							className: "carousel-pause",
							"aria-pressed": paused,
							onClick: () => setPaused(!paused),
							children: paused ? "Play" : "Pause"
						})
					]
				})
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "featured-event",
			"aria-live": paused || hover || focus ? "polite" : "off",
			children: /* @__PURE__ */ jsx(AnimatePresence, {
				mode: "wait",
				initial: false,
				children: /* @__PURE__ */ jsx(motion.div, {
					initial: {
						opacity: reduced ? 1 : 0,
						x: reduced ? 0 : 45
					},
					animate: {
						opacity: 1,
						x: 0
					},
					exit: {
						opacity: reduced ? 1 : 0,
						x: reduced ? 0 : -35
					},
					transition: {
						duration: .4,
						ease: [
							.22,
							1,
							.36,
							1
						]
					},
					children: /* @__PURE__ */ jsxs(Link, {
						to: `/events/${event.slug}`,
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "featured-art",
								children: /* @__PURE__ */ jsx(EventArt, {
									event,
									shared: false
								})
							}),
							/* @__PURE__ */ jsx("span", {
								className: "micro",
								children: siteData.categories[event.category].short
							}),
							/* @__PURE__ */ jsxs("h3", { children: [event.name, /* @__PURE__ */ jsx(Arrow, {})] })
						]
					})
				}, event.id)
			})
		})]
	});
}
function ScheduleContent({ preview = false }) {
	const entries = preview ? siteData.schedule.slice(0, 3) : siteData.schedule;
	return /* @__PURE__ */ jsx("div", {
		className: "timeline",
		children: entries.length ? entries.filter((e) => e.time && e.title).map((e) => /* @__PURE__ */ jsxs(Reveal, {
			className: "timeline-row",
			children: [
				/* @__PURE__ */ jsx("span", { className: "timeline-dot" }),
				/* @__PURE__ */ jsx("time", { children: e.time }),
				/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("h3", { children: e.title }),
					e.description && /* @__PURE__ */ jsx("p", { children: e.description }),
					e.eventId && siteData.events.find((v) => v.id === e.eventId) && /* @__PURE__ */ jsx(Link, {
						className: "text-link",
						to: `/events/${siteData.events.find((v) => v.id === e.eventId).slug}`,
						children: "Explore Event ↗"
					})
				] })
			]
		}, e.id)) : /* @__PURE__ */ jsxs("div", {
			className: "timeline-row",
			children: [
				/* @__PURE__ */ jsx("span", { className: "timeline-dot" }),
				/* @__PURE__ */ jsxs("div", {
					className: "timeline-date",
					children: [/* @__PURE__ */ jsx("strong", { children: "26 OCT" }), /* @__PURE__ */ jsx("span", { children: "MONDAY / 2026" })]
				}),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", { children: "A day for your talent." }), /* @__PURE__ */ jsx("p", { children: siteData.copy.schedulePending })] })
			]
		})
	});
}
function Home() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		siteData.announcements.map((a) => /* @__PURE__ */ jsx(AnnouncementBanner, { announcement: a }, a.id)),
		/* @__PURE__ */ jsxs("section", {
			className: "hero",
			children: [
				/* @__PURE__ */ jsxs(Entrance, {
					className: "hero-top",
					delay: .05,
					children: [/* @__PURE__ */ jsxs("p", { children: [
						siteData.settings.school,
						/* @__PURE__ */ jsx("br", {}),
						/* @__PURE__ */ jsx("strong", { children: siteData.settings.department })
					] }), /* @__PURE__ */ jsx(SmartImage, {
						src: siteData.assets.college,
						alt: siteData.settings.college,
						className: "college-logo",
						width: "220",
						height: "61"
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "hero-body",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "hero-copy",
						children: [
							/* @__PURE__ */ jsx(Entrance, {
								delay: .12,
								children: /* @__PURE__ */ jsx(Eyebrow, { children: siteData.copy.heroEyebrow })
							}),
							/* @__PURE__ */ jsx(Entrance, {
								delay: .22,
								children: /* @__PURE__ */ jsxs("h1", { children: [/* @__PURE__ */ jsx("span", { children: "TALENT" }), /* @__PURE__ */ jsxs("span", {
									className: "hero-hunt",
									children: ["HUNT", /* @__PURE__ */ jsx("span", {
										className: "year",
										children: "2K26"
									})]
								})] })
							}),
							/* @__PURE__ */ jsx(Entrance, {
								delay: .34,
								children: /* @__PURE__ */ jsx("p", {
									className: "hero-tagline",
									children: siteData.copy.heroTagline
								})
							}),
							/* @__PURE__ */ jsxs(Entrance, {
								delay: .43,
								children: [/* @__PURE__ */ jsxs("div", {
									className: "button-row",
									children: [/* @__PURE__ */ jsx(ButtonLink, {
										to: "/#competitions",
										children: "Explore Events"
									}), /* @__PURE__ */ jsx(ButtonLink, {
										to: "/register",
										secondary: true,
										children: "Register Now"
									})]
								}), /* @__PURE__ */ jsxs("p", {
									className: "eligibility",
									children: [
										/* @__PURE__ */ jsx("span", {
											"aria-hidden": "true",
											children: "◈"
										}),
										" ",
										siteData.settings.eligibility
									]
								})]
							})
						]
					}), /* @__PURE__ */ jsxs(Entrance, {
						className: "hero-poster",
						delay: .3,
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "poster-top",
								children: [/* @__PURE__ */ jsx("span", {
									className: "micro",
									children: "THE OFFICIAL DROP"
								}), /* @__PURE__ */ jsx("span", {
									"aria-hidden": "true",
									children: "↘"
								})]
							}),
							/* @__PURE__ */ jsx("a", {
								href: siteData.assets.brochureImage,
								target: "_blank",
								rel: "noopener noreferrer",
								"aria-label": "View the official Talent Hunt brochure",
								children: /* @__PURE__ */ jsx(SmartImage, {
									src: siteData.assets.brochureImage,
									alt: "Official Talent Hunt 2K26 brochure",
									width: "1024",
									height: "1536",
									fetchPriority: "high"
								})
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "poster-stamp",
								children: [/* @__PURE__ */ jsx("span", { children: "16 EVENTS" }), /* @__PURE__ */ jsx("span", { children: "ONE STAGE ↗" })]
							}),
							/* @__PURE__ */ jsx("span", {
								className: "poster-side",
								"aria-hidden": "true",
								children: "CREATE / COMPETE / EXPRESS"
							})
						]
					})]
				}),
				/* @__PURE__ */ jsxs(Entrance, {
					className: "hero-bottom",
					delay: .5,
					children: [/* @__PURE__ */ jsx("span", { children: "TECHNICAL × NON-TECHNICAL" }), /* @__PURE__ */ jsxs("a", {
						href: "#competitions",
						children: ["SCROLL TO EXPLORE ", /* @__PURE__ */ jsx("span", {
							"aria-hidden": "true",
							children: "↓"
						})]
					})]
				})
			]
		}),
		/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx(DateStrip, {}) }),
		/* @__PURE__ */ jsxs("section", {
			className: "section intro-section",
			children: [/* @__PURE__ */ jsxs(Reveal, { children: [/* @__PURE__ */ jsx(Eyebrow, { children: "NOT JUST ANOTHER DAY ON CAMPUS" }), /* @__PURE__ */ jsx("h2", { children: siteData.copy.introHeading })] }), /* @__PURE__ */ jsxs(Reveal, {
				className: "intro-description",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "big-asterisk",
						"aria-hidden": "true",
						children: "✳"
					}),
					/* @__PURE__ */ jsx("p", { children: siteData.copy.intro }),
					/* @__PURE__ */ jsx(BrochureLink, {})
				]
			})]
		}),
		/* @__PURE__ */ jsx("div", {
			className: "ticker",
			"aria-hidden": "true",
			children: /* @__PURE__ */ jsx("div", {
				className: "ticker-track",
				children: [0, 1].map((copy) => /* @__PURE__ */ jsx("span", { children: "THINK. CREATE. COMPETE. REPEAT. ↗\xA0" }, copy))
			})
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "section",
			id: "competitions",
			children: [/* @__PURE__ */ jsx(SectionHeading, {
				number: "01",
				title: "TECHNICAL.",
				link: "/events/technical"
			}), /* @__PURE__ */ jsx(EventGrid, { events: inCategory("technical") })]
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "section nontechnical-section",
			children: [/* @__PURE__ */ jsx(SectionHeading, {
				number: "02",
				title: "BEYOND THE CODE.",
				link: "/events/non-technical"
			}), /* @__PURE__ */ jsx(EventGrid, { events: inCategory("non-technical") })]
		}),
		/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx(Featured, {}) }),
		/* @__PURE__ */ jsxs("section", {
			className: "section",
			children: [/* @__PURE__ */ jsxs(Reveal, {
				className: "section-heading",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Eyebrow, { children: "THE PROGRAMME" }), /* @__PURE__ */ jsxs("h2", { children: [
					"A DATE WITH",
					/* @__PURE__ */ jsx("br", {}),
					"POSSIBILITY."
				] })] }), /* @__PURE__ */ jsxs(Link, {
					className: "text-link",
					to: "/schedule",
					children: ["View Schedule ", /* @__PURE__ */ jsx(Arrow, {})]
				})]
			}), /* @__PURE__ */ jsx(ScheduleContent, { preview: true })]
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "section venue-preview",
			children: [/* @__PURE__ */ jsxs(Reveal, {
				className: "venue-graphic",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "venue-pin",
						children: "↗"
					}),
					/* @__PURE__ */ jsx("div", { className: "venue-lines" }),
					/* @__PURE__ */ jsx("span", {
						className: "micro",
						children: "CRESCENT / AUDITORIUM"
					})
				]
			}), /* @__PURE__ */ jsxs(Reveal, {
				delay: .12,
				children: [
					/* @__PURE__ */ jsx(Eyebrow, { children: "MEET AT THE AUDITORIUM" }),
					/* @__PURE__ */ jsxs("h2", { children: [
						"THIS IS",
						/* @__PURE__ */ jsx("br", {}),
						"THE PLACE."
					] }),
					/* @__PURE__ */ jsx("p", { children: siteData.settings.venue }),
					/* @__PURE__ */ jsx(ButtonLink, {
						to: "/venue",
						secondary: true,
						children: "Venue Details"
					})
				]
			})]
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "section faq-preview",
			children: [/* @__PURE__ */ jsxs(Reveal, { children: [
				/* @__PURE__ */ jsx(Eyebrow, { children: "BEFORE YOU STEP IN" }),
				/* @__PURE__ */ jsxs("h2", { children: [
					"GOOD",
					/* @__PURE__ */ jsx("br", {}),
					"QUESTIONS."
				] }),
				/* @__PURE__ */ jsxs(Link, {
					to: "/faqs",
					className: "text-link",
					children: ["All FAQs ", /* @__PURE__ */ jsx(Arrow, {})]
				})
			] }), /* @__PURE__ */ jsx(Reveal, {
				delay: .12,
				children: siteData.faqs.slice(0, 3).map((f) => /* @__PURE__ */ jsx(Accordion, { faq: f }, f.id))
			})]
		})
	] });
}
function PageHeading({ eyebrow, title, children }) {
	return /* @__PURE__ */ jsxs(Entrance, {
		className: "page-heading",
		delay: .06,
		children: [
			/* @__PURE__ */ jsx(Eyebrow, { children: eyebrow }),
			/* @__PURE__ */ jsx("h1", { children: title }),
			children
		]
	});
}
function CategoryPage({ category }) {
	const list = inCategory(category);
	return /* @__PURE__ */ jsxs("section", {
		className: `section category-page ${category === "non-technical" ? "orange-page" : ""}`,
		children: [
			/* @__PURE__ */ jsx(PageHeading, {
				eyebrow: `${siteData.categories[category].title} / 08 COMPETITIONS`,
				title: siteData.categories[category].headline,
				children: /* @__PURE__ */ jsx("p", { children: siteData.categories[category].intro })
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "category-tabs",
				children: [/* @__PURE__ */ jsxs(Link, {
					"aria-current": category === "technical" ? "page" : void 0,
					to: "/events/technical",
					children: ["Technical ", /* @__PURE__ */ jsx("span", { children: "08" })]
				}), /* @__PURE__ */ jsxs(Link, {
					"aria-current": category === "non-technical" ? "page" : void 0,
					to: "/events/non-technical",
					children: ["Non-Technical ", /* @__PURE__ */ jsx("span", { children: "08" })]
				})]
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "result-count",
				role: "status",
				children: [list.length, " competitions · Official brochure order"]
			}),
			/* @__PURE__ */ jsx(EventGrid, { events: list })
		]
	});
}
function EventPage() {
	const { slug } = useParams();
	const event = siteData.events.find((e) => e.slug === slug);
	const reduced = useReducedMotion();
	if (!event) return /* @__PURE__ */ jsx(NotFound, {});
	const { previous, next } = neighbours(event);
	const sections = [
		["Rules & Regulations", event.rules],
		["Participation Requirements", event.participation],
		["Rounds & Format", event.rounds],
		["Equipment & Software", event.equipment],
		["Prizes & Judging Criteria", event.prizes]
	];
	return /* @__PURE__ */ jsxs("article", {
		className: `event-page ${event.category === "non-technical" ? "orange-page" : ""}`,
		children: [
			/* @__PURE__ */ jsxs("section", {
				className: "section event-hero",
				children: [/* @__PURE__ */ jsxs(Entrance, {
					delay: .08,
					children: [
						/* @__PURE__ */ jsxs(Link, {
							className: "text-link",
							to: `/events/${event.category}`,
							children: ["← ", siteData.categories[event.category].title]
						}),
						/* @__PURE__ */ jsxs(Eyebrow, { children: [
							siteData.categories[event.category].short,
							" /",
							" ",
							String(event.order).padStart(2, "0")
						] }),
						/* @__PURE__ */ jsx(motion.h1, {
							layoutId: reduced ? void 0 : `title-${event.id}`,
							children: event.name
						}),
						/* @__PURE__ */ jsx("p", {
							className: "event-subtitle",
							children: event.description || `${siteData.settings.title} · ${siteData.settings.dateLabel}`
						}),
						/* @__PURE__ */ jsx("div", {
							className: "event-venue-banner",
							children: /* @__PURE__ */ jsxs("span", {
								className: "venue-badge-pill",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "venue-badge-icon",
										children: "📍"
									}),
									/* @__PURE__ */ jsx("span", {
										className: "venue-badge-label",
										children: "VENUE:"
									}),
									/* @__PURE__ */ jsx("strong", {
										className: "venue-badge-name",
										children: event.venue || "Venue TBA"
									})
								]
							})
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "button-row",
							children: [/* @__PURE__ */ jsx(ButtonLink, {
								to: "/register",
								children: "Register Now"
							}), /* @__PURE__ */ jsx(ShareActions, {})]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "eligibility",
							children: siteData.settings.eligibility
						})
					]
				}), /* @__PURE__ */ jsx(Entrance, {
					delay: .2,
					children: /* @__PURE__ */ jsx(EventArt, {
						event,
						hero: true
					})
				})]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "section event-content",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx(Eyebrow, { children: "THE COMPETITION" }),
					/* @__PURE__ */ jsxs("h2", { children: [
						"MAKE IT",
						/* @__PURE__ */ jsx("br", {}),
						"YOUR MOMENT."
					] }),
					/* @__PURE__ */ jsx("p", { children: event.overview || siteData.copy.eventDetailsPending }),
					sections.filter(([, items]) => items.length).map(([title, items]) => /* @__PURE__ */ jsxs(Reveal, {
						className: "detail-section",
						children: [/* @__PURE__ */ jsx("h2", { children: title }), /* @__PURE__ */ jsx("ul", { children: items.map((item) => /* @__PURE__ */ jsx("li", { children: item }, item)) })]
					}, title)),
					event.faqs.length > 0 && /* @__PURE__ */ jsxs("div", {
						className: "detail-section",
						children: [/* @__PURE__ */ jsx("h2", { children: "Event FAQs" }), event.faqs.map((f) => /* @__PURE__ */ jsx(Accordion, { faq: f }, f.id))]
					})
				] }), /* @__PURE__ */ jsxs("aside", {
					className: "event-facts",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "micro",
							children: "AT A GLANCE"
						}),
						/* @__PURE__ */ jsxs("dl", { children: [
							/* @__PURE__ */ jsx("dt", { children: "Category" }),
							/* @__PURE__ */ jsx("dd", { children: siteData.categories[event.category].short }),
							/* @__PURE__ */ jsx("dt", { children: "Date" }),
							/* @__PURE__ */ jsx("dd", { children: siteData.settings.dateLabel }),
							/* @__PURE__ */ jsx("dt", { children: "Venue" }),
							/* @__PURE__ */ jsxs("dd", { children: [/* @__PURE__ */ jsx("strong", { children: event.venue || "Venue TBA" }), event.venue && event.venue !== siteData.settings.venue ? /* @__PURE__ */ jsxs("span", {
								className: "venue-campus-note",
								children: [
									" ",
									"· ",
									siteData.settings.venue
								]
							}) : null] }),
							/* @__PURE__ */ jsx("dt", { children: "Eligibility" }),
							/* @__PURE__ */ jsx("dd", { children: siteData.settings.eligibility })
						] }),
						event.faculty.map((p) => /* @__PURE__ */ jsx(CoordinatorCard, { person: p }, p.id)),
						event.students.map((p) => /* @__PURE__ */ jsx(CoordinatorCard, { person: p }, p.id))
					]
				})]
			}),
			/* @__PURE__ */ jsxs("nav", {
				className: "event-pagination",
				"aria-label": "Events in brochure order",
				children: [previous ? /* @__PURE__ */ jsxs(Link, {
					to: `/events/${previous.slug}`,
					children: [/* @__PURE__ */ jsx("span", {
						className: "micro",
						children: "← PREVIOUS EVENT"
					}), /* @__PURE__ */ jsx("strong", { children: previous.name })]
				}) : /* @__PURE__ */ jsxs(Link, {
					to: `/events/${event.category}`,
					children: [/* @__PURE__ */ jsx("span", {
						className: "micro",
						children: "FIRST IN THIS CATEGORY"
					}), /* @__PURE__ */ jsxs("strong", { children: [
						"All ",
						siteData.categories[event.category].short,
						" Events"
					] })]
				}), next ? /* @__PURE__ */ jsxs(Link, {
					to: `/events/${next.slug}`,
					children: [/* @__PURE__ */ jsx("span", {
						className: "micro",
						children: "NEXT EVENT →"
					}), /* @__PURE__ */ jsx("strong", { children: next.name })]
				}) : /* @__PURE__ */ jsxs(Link, {
					to: `/events/${event.category}`,
					children: [/* @__PURE__ */ jsx("span", {
						className: "micro",
						children: "YOU’VE EXPLORED THE CATEGORY"
					}), /* @__PURE__ */ jsx("strong", { children: "Back to all events ↗" })]
				})]
			}),
			event.relatedIds.length > 0 && /* @__PURE__ */ jsxs("section", {
				className: "section",
				children: [/* @__PURE__ */ jsx("h2", { children: "KEEP EXPLORING." }), /* @__PURE__ */ jsx(EventGrid, { events: siteData.events.filter((e) => event.relatedIds.includes(e.id)) })]
			})
		]
	});
}
function Registration() {
	const now = useNow();
	const config = siteData.registration;
	const [loaded, setLoaded] = useState(false);
	const [failed, setFailed] = useState(false);
	useEffect(() => {
		setLoaded(false);
		setFailed(false);
		if (!assetExists(config.qr)) return;
		const image = new Image();
		image.onload = () => setLoaded(true);
		image.onerror = () => setFailed(true);
		image.src = config.qr;
		return () => {
			image.onload = null;
			image.onerror = null;
		};
	}, [config.qr]);
	const status = now === null ? "unconfigured" : registrationStatus(config, now, !failed && assetExists(config.qr));
	const archived = now !== null && isArchived(now);
	const canRegister = (status === "available" || status === "open") && !archived;
	const label = archived ? "Registration Closed" : status === "open" ? "Register Now" : status === "available" ? "Official registration" : status === "soon" ? "Registration Opens Soon" : status === "closed" ? "Registration Closed" : "STAY READY.";
	return /* @__PURE__ */ jsxs("section", {
		className: "section registration-page",
		children: [/* @__PURE__ */ jsx(PageHeading, {
			eyebrow: "REGISTRATION / TALENT HUNT 2K26",
			title: "TAKE YOUR\nPLACE."
		}), /* @__PURE__ */ jsxs("div", {
			className: "registration-panel",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "registration-qr-panel",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "micro",
						children: "SCAN TO REGISTER"
					}),
					canRegister && loaded ? /* @__PURE__ */ jsx("a", {
						href: config.url,
						target: "_blank",
						rel: "noopener noreferrer",
						"aria-label": "Open registration form using QR code",
						children: /* @__PURE__ */ jsx("img", {
							src: config.qr,
							alt: "Official registration QR code",
							width: "370",
							height: "370",
							onError: () => {
								setLoaded(false);
								setFailed(true);
							}
						})
					}) : /* @__PURE__ */ jsx("span", {
						"aria-hidden": "true",
						children: "↗"
					}),
					/* @__PURE__ */ jsx("p", { children: canRegister ? "Scan with your phone camera to open the official form." : "Official registration information" })
				]
			}), /* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsxs("span", {
					className: `status-pill ${canRegister ? "status-open" : ""}`,
					children: [
						/* @__PURE__ */ jsx("span", {
							"aria-hidden": "true",
							children: "●"
						}),
						" ",
						label
					]
				}),
				/* @__PURE__ */ jsx("h2", { children: archived || status === "closed" ? "REGISTRATION\nHAS CLOSED." : canRegister ? "YOUR NEXT STEP." : "YOUR MOMENT\nIS COMING." }),
				/* @__PURE__ */ jsx("p", { children: archived ? siteData.settings.archiveMessage : status === "unconfigured" ? siteData.copy.registrationPending : status === "soon" ? "The official registration window has not opened yet." : status === "closed" ? "The official registration window has closed." : "Scan the QR code or open the official Google Form to register." }),
				canRegister && loaded && /* @__PURE__ */ jsx("div", {
					className: "registration-form-action",
					children: /* @__PURE__ */ jsx("a", {
						className: "button",
						href: config.url,
						target: "_blank",
						rel: "noopener noreferrer",
						children: "Open Registration Form ↗"
					})
				}),
				config.instructions.length > 0 && /* @__PURE__ */ jsx("ul", { children: config.instructions.map((v) => /* @__PURE__ */ jsx("li", { children: v }, v)) }),
				/* @__PURE__ */ jsxs("div", {
					className: "eligibility-box",
					children: [/* @__PURE__ */ jsx("strong", { children: siteData.settings.eligibility }), /* @__PURE__ */ jsx("p", { children: siteData.settings.eligibilityNote })]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "small-print",
					children: "Registration is completed externally. This website does not collect submissions or confirm registration."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "registration-support",
					children: [/* @__PURE__ */ jsx(Link, {
						className: "text-link",
						to: "/faqs",
						children: "Registration questions? ↗"
					}), /* @__PURE__ */ jsx(BrochureLink, { small: true })]
				})
			] })]
		})]
	});
}
function StandardPage({ page }) {
	const m = siteData.pages[page];
	return /* @__PURE__ */ jsxs("section", {
		className: "section standard-page",
		children: [
			/* @__PURE__ */ jsx(PageHeading, {
				eyebrow: `TALENT HUNT 2K26 / ${page.slice(1).toUpperCase()}`,
				title: m.title
			}),
			page === "/schedule" && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(DateStrip, {}), /* @__PURE__ */ jsx(ScheduleContent, {})] }),
			page === "/about" && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
				className: "editorial-grid",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsxs("h2", { children: [
						"16 WAYS TO",
						/* @__PURE__ */ jsx("br", {}),
						/* @__PURE__ */ jsx("em", { children: "SHOW UP." })
					] }),
					/* @__PURE__ */ jsx("p", { children: siteData.copy.about }),
					/* @__PURE__ */ jsx("p", { children: siteData.settings.eligibility }),
					/* @__PURE__ */ jsxs("div", {
						className: "button-row",
						children: [/* @__PURE__ */ jsx(ButtonLink, {
							to: "/events/technical",
							children: "Technical Events"
						}), /* @__PURE__ */ jsx(ButtonLink, {
							to: "/events/non-technical",
							secondary: true,
							children: "Non-Technical Events"
						})]
					})
				] }), /* @__PURE__ */ jsx(SmartImage, {
					className: "about-brochure",
					src: siteData.assets.brochureImage,
					alt: "Official Talent Hunt 2K26 brochure",
					width: "1024",
					height: "1536"
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "organiser-block",
				children: [
					/* @__PURE__ */ jsx(Eyebrow, { children: "PRESENTED BY" }),
					/* @__PURE__ */ jsx("h2", { children: siteData.settings.department }),
					/* @__PURE__ */ jsx("p", { children: siteData.settings.school }),
					/* @__PURE__ */ jsx("p", { children: siteData.settings.college })
				]
			})] }),
			page === "/venue" && /* @__PURE__ */ jsxs("div", {
				className: "venue-full",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "venue-graphic",
					"aria-hidden": "true",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "venue-pin",
							children: "↗"
						}),
						/* @__PURE__ */ jsx("div", { className: "venue-lines" }),
						/* @__PURE__ */ jsx("span", {
							className: "micro",
							children: "CRESCENT / AUDITORIUM"
						})
					]
				}), /* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx(Eyebrow, { children: "THE OFFICIAL VENUE" }),
					/* @__PURE__ */ jsx("h2", { children: "AUDITORIUM." }),
					/* @__PURE__ */ jsx("p", { children: siteData.settings.college }),
					/* @__PURE__ */ jsxs("p", { children: [
						siteData.settings.dateLabel,
						" · ",
						siteData.settings.weekday
					] }),
					siteData.settings.address && /* @__PURE__ */ jsx("address", { children: siteData.settings.address }),
					siteData.settings.directions.length ? siteData.settings.directions.map((d) => /* @__PURE__ */ jsx("p", { children: d }, d)) : /* @__PURE__ */ jsx("p", {
						className: "muted",
						children: siteData.copy.venuePending
					}),
					/* @__PURE__ */ jsx(ButtonLink, {
						to: "/schedule",
						secondary: true,
						children: "View Programme"
					})
				] })]
			}),
			page === "/faqs" && /* @__PURE__ */ jsx("div", {
				className: "faq-groups",
				children: [...new Set(siteData.faqs.map((f) => f.category))].map((category) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", { children: category }), siteData.faqs.filter((f) => f.category === category).map((f) => /* @__PURE__ */ jsx(Accordion, { faq: f }, f.id))] }, category))
			}),
			page === "/contact" && /* @__PURE__ */ jsxs(Fragment, { children: [
				/* @__PURE__ */ jsxs("p", {
					className: "page-lead",
					children: [
						siteData.settings.department,
						/* @__PURE__ */ jsx("br", {}),
						siteData.settings.school
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "people-grid",
					children: siteData.coordinators.map((p) => /* @__PURE__ */ jsx(CoordinatorCard, { person: p }, p.id))
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "contact-social",
					children: [
						/* @__PURE__ */ jsx(Eyebrow, { children: "FOLLOW THE EVENT" }),
						siteData.socialLinks.map((s) => /* @__PURE__ */ jsxs("a", {
							className: "text-link",
							href: s.url,
							target: "_blank",
							rel: "noopener noreferrer",
							children: [s.handle, " ↗"]
						}, s.url)),
						/* @__PURE__ */ jsx("p", { children: "Coordinator contact methods will be added when officially supplied." })
					]
				})
			] }),
			page === "/privacy" && /* @__PURE__ */ jsx("div", {
				className: "prose",
				children: siteData.copy.privacy.map((p) => /* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsx("h2", { children: p.title }), /* @__PURE__ */ jsx("p", { children: p.text })] }, p.title))
			})
		]
	});
}
function NotFound() {
	return /* @__PURE__ */ jsxs("section", {
		className: "section not-found",
		children: [
			/* @__PURE__ */ jsx(Eyebrow, { children: "OFF THE PROGRAMME" }),
			/* @__PURE__ */ jsxs("div", {
				className: "error-number",
				"aria-hidden": "true",
				children: [
					"4",
					/* @__PURE__ */ jsx("span", { children: "0" }),
					"4"
				]
			}),
			/* @__PURE__ */ jsx("h1", { children: "PAGE NOT FOUND." }),
			/* @__PURE__ */ jsx("p", { children: "This link doesn’t lead to an event. Let’s find your way back." }),
			/* @__PURE__ */ jsxs("div", {
				className: "button-row",
				children: [/* @__PURE__ */ jsx(ButtonLink, {
					to: "/",
					children: "Return Home"
				}), /* @__PURE__ */ jsx(ButtonLink, {
					to: "/events/technical",
					secondary: true,
					children: "Explore Events"
				})]
			})
		]
	});
}
function CoordinatorsPage() {
	const groups = siteData.coordinatorGroups;
	const [activeTab, setActiveTab] = useState(groups[0]?.id ?? "");
	const current = groups.find((g) => g.id === activeTab) ?? groups[0];
	const reduced = useReducedMotion();
	return /* @__PURE__ */ jsxs("section", {
		className: "section coordinators-page",
		children: [
			/* @__PURE__ */ jsx(PageHeading, {
				eyebrow: "TALENT HUNT 2K26 / THE TEAM",
				title: "MEET THE CREW.",
				children: /* @__PURE__ */ jsx("p", { children: "Faculty advisors, student general coordinators, and event leads who make Talent Hunt happen." })
			}),
			/* @__PURE__ */ jsx("div", {
				className: "coord-tabs",
				role: "tablist",
				"aria-label": "Coordinator groups",
				children: groups.map((g) => /* @__PURE__ */ jsxs("button", {
					role: "tab",
					id: `tab-${g.id}`,
					"aria-selected": g.id === activeTab,
					"aria-controls": `panel-${g.id}`,
					className: `coord-tab ${g.id === activeTab ? "coord-tab-active" : ""}`,
					onClick: () => setActiveTab(g.id),
					children: [g.label, /* @__PURE__ */ jsx("span", {
						className: "coord-tab-count",
						children: g.members.length
					})]
				}, g.id))
			}),
			/* @__PURE__ */ jsx(AnimatePresence, {
				mode: "wait",
				children: /* @__PURE__ */ jsx(motion.div, {
					id: `panel-${activeTab}`,
					role: "tabpanel",
					"aria-labelledby": `tab-${activeTab}`,
					initial: reduced ? false : {
						opacity: 0,
						y: 20
					},
					animate: {
						opacity: 1,
						y: 0
					},
					exit: reduced ? {} : {
						opacity: 0,
						y: -10
					},
					transition: {
						duration: .35,
						ease: [
							.22,
							1,
							.36,
							1
						]
					},
					className: "coord-grid",
					children: current?.members.map((p, i) => /* @__PURE__ */ jsx(motion.div, {
						initial: reduced ? false : {
							opacity: 0,
							y: 28
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .5,
							delay: i * .055,
							ease: [
								.22,
								1,
								.36,
								1
							]
						},
						children: /* @__PURE__ */ jsx(CoordinatorCard, { person: p })
					}, p.id))
				}, activeTab)
			})
		]
	});
}
//#endregion
//#region src/App.tsx
function PresenceGuard({ children }) {
	const present = useIsPresent();
	return /* @__PURE__ */ jsx("div", {
		"aria-hidden": !present || void 0,
		inert: !present,
		children
	});
}
function App() {
	const location = useLocation();
	const reduced = useReducedMotion();
	return /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsx(MotionConfig, {
		reducedMotion: "user",
		children: /* @__PURE__ */ jsx(ExperienceProvider, { children: /* @__PURE__ */ jsxs(LayoutGroup, { children: [
			/* @__PURE__ */ jsx(ReadingProgress, {}),
			/* @__PURE__ */ jsx(Header, {}),
			/* @__PURE__ */ jsx(NavigationEffects, {}),
			/* @__PURE__ */ jsx("main", {
				id: "main",
				tabIndex: -1,
				children: /* @__PURE__ */ jsx(AnimatePresence, {
					mode: "wait",
					initial: false,
					children: /* @__PURE__ */ jsx(motion.div, {
						initial: reduced ? false : {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						exit: {
							opacity: 0,
							y: reduced ? 0 : -10
						},
						transition: {
							duration: reduced ? 0 : .4,
							ease: [
								.16,
								1,
								.3,
								1
							]
						},
						children: /* @__PURE__ */ jsx(PresenceGuard, { children: /* @__PURE__ */ jsxs(Routes, {
							location,
							children: [
								/* @__PURE__ */ jsx(Route, {
									path: "/",
									element: /* @__PURE__ */ jsx(Home, {})
								}),
								/* @__PURE__ */ jsx(Route, {
									path: "/events/technical",
									element: /* @__PURE__ */ jsx(CategoryPage, { category: "technical" })
								}),
								/* @__PURE__ */ jsx(Route, {
									path: "/events/non-technical",
									element: /* @__PURE__ */ jsx(CategoryPage, { category: "non-technical" })
								}),
								/* @__PURE__ */ jsx(Route, {
									path: "/events/:slug",
									element: /* @__PURE__ */ jsx(EventPage, {})
								}),
								/* @__PURE__ */ jsx(Route, {
									path: "/register",
									element: /* @__PURE__ */ jsx(Registration, {})
								}),
								/* @__PURE__ */ jsx(Route, {
									path: "/coordinators",
									element: /* @__PURE__ */ jsx(CoordinatorsPage, {})
								}),
								[
									"/schedule",
									"/about",
									"/venue",
									"/faqs",
									"/contact",
									"/privacy"
								].map((path) => /* @__PURE__ */ jsx(Route, {
									path,
									element: /* @__PURE__ */ jsx(StandardPage, { page: path })
								}, path)),
								/* @__PURE__ */ jsx(Route, {
									path: "*",
									element: /* @__PURE__ */ jsx(NotFound, {})
								})
							]
						}) })
					}, location.pathname)
				})
			}),
			/* @__PURE__ */ jsx(Footer, {})
		] }) })
	}) });
}
//#endregion
//#region src/entry-server.tsx
function render(path) {
	return renderToString(/* @__PURE__ */ jsx(StaticRouter, {
		location: path,
		children: /* @__PURE__ */ jsx(App, {})
	}));
}
//#endregion
export { metadata, publicRoutes, render, siteData, validateSiteData };
