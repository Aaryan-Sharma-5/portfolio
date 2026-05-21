export const personalInfo = {
  name: "Aaryan Sharma",
  title: "Full-Stack Web Developer",
  tagline:
    "Building scalable systems with ACID transactions, real-time data, and a creative edge",
  email: "aaryansharmaa23@gmail.com",
  phone: "+91-9004630738",
  github: "https://github.com/Aaryan-Sharma-5",
  linkedin: "https://www.linkedin.com/in/aaryan-sharmaa25",
  leetcode: "https://leetcode.com/u/Aaryan_25",
  codechef: "https://www.codechef.com/users/aaryan_96",
  instagram: "https://www.instagram.com/aaryansharma2512",
  twitter: "https://x.com/Aaryan1225",
  location: "Mumbai - 421301",
  education: {
    institution: "K. J. Somaiya College of Engineering",
    degree: "Bachelor of Technology",
    cgpa: "8.60",
    duration: "2023 - 2027",
  },
  bio: `Engineering fault-tolerant systems and high-concurrency backends. Experience architecting exactly-once payment ledgers with PostgreSQL serializable isolation and asynchronous processing pipelines on Google Cloud Run.`,
};

export const projects = [
  {
    id: "pitchvision",
    title: "PitchVision",
    tagline:
      "AI-powered cricket video intelligence for highlights, biomechanics, and coach workflows.",
    summary:
      "Built an end-to-end platform that extracts match highlights and generates batting/bowling biomechanics reports. Combines OCR-driven event detection, MediaPipe pose pipelines, and GCP task queues for reliable, scalable processing.",
    role: "Lead Platform & ML Systems Engineer",
    timeline: "December 2025 - Present",
    highlights: [
      "Designed an event-driven video processing pipeline (GCP Cloud Run + Cloud Tasks) to offload FFmpeg jobs to background workers for large match videos.",
      "Implemented OCR-based scoreboard and scene detection to produce frame-accurate highlight clips and automated player supercuts.",
      "Built biomechanics analysis using MediaPipe Pose and custom metrics to produce automated coaching reports and kinematic summaries.",
      "Architected durable queueing with idempotent workers and retry-safe tasks (Cloud Tasks) to scale processing and guarantee at-least-once completion.",
    ],
    impact: [
      {
        label: "Core AI workflows",
        value: "3",
        detail:
          "Unified OCR + pose pipelines into 3 core AI workflows: highlights, batting analysis, bowling analysis.",
      },
      {
        label: "Processing throughput",
        value: "3x faster",
        detail:
          "Processing throughput: 3x faster (example: 1 hr footage → 20 min pipeline run).",
      },
    ],
    stack: [
      {
        label: "Frontend",
        items: ["React", "TypeScript", "Vite", "Zustand", "TailwindCSS"],
      },
      {
        label: "Backend",
        items: ["FastAPI", "SQLAlchemy (async)", "Alembic", "PostgreSQL"],
      },
      {
        label: "ML / AI",
        items: ["EasyOCR", "MediaPipe Pose", "Gemini AI", "FFmpeg"],
      },
      {
        label: "Data",
        items: [
          "PostgreSQL 15",
          "Supabase",
          "Alembic migrations",
          "SQLAlchemy models",
        ],
      },
      {
        label: "Infra",
        items: [
          "Docker",
          "Google Cloud Run",
          "Cloud Build",
          "Cloud Storage",
          "Cloud Tasks",
          "Secret Manager",
        ],
      },
    ],
    caseStudy: {
      problem:
        "Cricket video analysis is slow, manual, and fragmented. Teams need a way to extract highlights, review technique, and collaborate on coaching feedback from the same platform.",
      solution:
        "Built a production-ready monorepo that combines OCR-based highlight extraction, biomechanics analysis, coach submission workflows, and subscription-gated access into one system.",
      architecture: [
        "React + Vite frontend for analytics, review, and admin experiences",
        "FastAPI backend with async database access and modular route-based APIs",
        "OCR and pose-analysis pipelines powered by EasyOCR, MediaPipe Pose, and FFmpeg",
        "GCP-backed storage and background processing using Cloud Run, Cloud Tasks, and Secret Manager",
      ],
      challenge: {
        title: "Stable highlight detection from noisy broadcast video",
        problem:
          "Scoreboards flicker, move, and get partially blocked by overlays, which can produce false positives when detecting events from video.",
        decision:
          "Use scoreboard ROI calibration, median smoothing over frame history, wicket-first parsing, and FFmpeg-based clip extraction to keep detection reliable.",
      },
    },
    media: {
      cover: "/projects/pitchvision.png",
    },
    links: {
      github: "https://github.com/almanet26/sports",
      live: "https://sports-teal-two.vercel.app",
    },
    featured: true,
  },
  {
    id: "nova",
    title: "NOVA",
    tagline: "AI-driven employee insights platform with explainability.",
    summary:
      "NOVA is a production-focused platform that analyzes employee signals, detects burnout and retention risk, and generates actionable, privacy-preserving interventions with explainability and RBAC controls.",
    role: "Lead Backend & UIUX Engineer",
    timeline: "April 2026",
    highlights: [
      "Built modular FastAPI backend with AI/ML pipelines for workforce analytics",
      "Designed explainability-first outputs and RBAC-preserving inference paths",
      "Delivered a responsive React + Vite frontend and Docker-based deployment",
    ],
    impact: [
      {
        label: "Users",
        value: "HR & managers (1000+ employees)",
        detail:
          "Supported manager-facing dashboards and reviewer workflows while preserving sensitive text via derived signals.",
      },
      {
        label: "Model performance",
        value: "High precision on prioritized signals",
        detail:
          "Custom NLP pipelines with explainability modules reduced false positives for burnout alerts.",
      },
    ],
    stack: [
      {
        label: "Frontend",
        items: ["React", "Vite + TypeScript"],
      },
      {
        label: "Backend",
        items: ["Python", "FastAPI / Uvicorn"],
      },
      {
        label: "ML / AI",
        items: [
          "Custom NLP pipelines",
          "Explainability + anomaly detection modules",
        ],
      },
      {
        label: "Data",
        items: [
          "PostgreSQL (migrations / SQL files)",
          "Event buffer & analytics schemas",
        ],
      },
      {
        label: "Infra",
        items: [
          "Docker / docker-compose",
          "Container deployments (render.yaml / Dockerfiles)",
        ],
      },
    ],
    caseStudy: {
      problem:
        "Organizations need early, actionable signals about employee burnout and retention risk without exposing sensitive text or weakening access controls.",
      solution:
        "A service-oriented platform that ingests signals (VCS, JIRA, messages), runs explainable NLP and anomaly detection, stores derived metrics in Postgres, and surfaces prioritized interventions via a React dashboard—while enforcing RBAC and privacy-preserving output contracts.",
      architecture: [
        "FastAPI backend with modular ai packages",
        "React + Vite frontend for manager dashboards",
        "PostgreSQL for canonical storage and migration scripts",
        "Dockerized services with docker-compose / render.yaml for deployment",
      ],
      challenge: {
        title:
          "Preserve RBAC and privacy while delivering actionable AI insights",
        problem:
          "Raw textual evidence can be sensitive; managers need explainable signals but not full raw data. Adding AI must not bypass RBAC checks or break explainability contracts.",
        decision:
          "Keep inference outputs as structured summaries (summary, key_signals, recommended_action, confidence, urgency) and implement strict RBAC checks in backend `deps.py`, plus audit logging and fallback explainability payloads.",
      },
    },
    media: {
      cover: "/projects/nova.png",
    },
    links: {
      github: "https://github.com/Aaryan-Sharma-5/nova",
      live: "https://nova-brown-xi.vercel.app/",
    },
    featured: true,
  },
  {
    id: "tailortalk",
    title: "TailorTalk",
    tagline: "Conversational Google Drive search agent",
    summary:
      "TailorTalk is a full-stack AI app that lets users search a Google Drive folder in natural language, with a FastAPI backend, LangGraph ReAct agent, and Streamlit chat UI.",
    role: "Full-stack developer",
    timeline: "May 2026",
    highlights: [
      "Natural-language search across a shared Google Drive folder",
      "Stateful follow-up queries powered by in-process session memory",
      "Clean two-part architecture with Streamlit frontend and FastAPI backend",
    ],
    impact: [
      {
        label: "Search Scope",
        value: "25 files",
        detail:
          "Indexes and searches the sample Drive folder referenced in the project README.",
      },
      {
        label: "Coverage",
        value: "7 subfolders",
        detail:
          "Navigates a nested Drive tree containing documents, spreadsheets, PDFs, images, and video files.",
      },
    ],
    stack: [
      {
        label: "Frontend",
        items: ["Streamlit", "Requests"],
      },
      {
        label: "Backend",
        items: ["FastAPI", "Google Drive API v3"],
      },
      {
        label: "ML / AI",
        items: ["LangGraph ReAct agent", "Groq / Gemini / OpenAI LLMs"],
      },
      {
        label: "Data",
        items: ["Drive file metadata", "Pydantic request/response schemas"],
      },
      {
        label: "Infra",
        items: ["Docker", "Render / Railway deployment"],
      },
    ],
    caseStudy: {
      problem:
        "Users needed a conversational way to search a Google Drive folder without manually writing Drive API query syntax.",
      solution:
        "Built a chat-based search assistant that translates natural-language prompts into Google Drive q filters, retries broader searches when needed, and preserves session context for follow-up queries.",
      architecture: [
        "Streamlit chat UI",
        "FastAPI chat API",
        "LangGraph ReAct agent",
        "Google Drive API v3",
        "In-process session memory",
      ],
      challenge: {
        title: "Mapping free-form language to strict Drive queries",
        problem:
          "The agent had to interpret ambiguous search requests, keep responses grounded in real Drive metadata, and stay within a tight request timeout.",
        decision:
          "Constrained the model to DriveSearchTool-only searches with a strict system prompt, a two-search limit per turn, and MemorySaver for session continuity.",
      },
    },
    media: {
      cover: "/projects/tailortalk.png",
    },
    links: {
      github: "https://github.com/Aaryan-Sharma-5/tailortalk",
      live: "https://tailortalk-fdc3.onrender.com/",
    },
    featured: true,
  },
  {
    id: "chainwhistle",
    title: "ChainWhistle",
    tagline: "Decentralized whistleblower protection on Ethereum Sepolia.",
    summary:
      "A hackathon-built whistleblower protocol that uses Ethereum, IPFS, and stake-based incentives to make claim submission, validation, publishing, and slashing transparent and tamper-resistant.",
    role: "Full-stack blockchain developer",
    timeline: "Hackathon prototype",
    highlights: [
      "On-chain claim lifecycle with commit-reveal validation, bidding, oracle checks, and slashing.",
      "Off-chain LLM/TEE stub that scores validator orgs and auto-assigns them to claims.",
      "React + ethers.js frontend with MetaMask-based role interactions.",
    ],
    impact: [
      {
        label: "Trust model",
        value: "Stake-backed",
        detail:
          "Validator orgs, news outlets, and oracle nodes are economically accountable through staking and slashing.",
      },
      {
        label: "Workflow",
        value: "4 role system",
        detail:
          "Supports whistleblowers, validator orgs, news outlets, and oracle nodes across the full claim pipeline.",
      },
    ],
    stack: [
      {
        label: "Frontend",
        items: [
          "React 19",
          "Vite",
          "TypeScript",
          "ethers.js",
          "Tailwind CSS v4",
        ],
      },
      {
        label: "Backend",
        items: ["Node.js", "Express", "ESM", "multer", "ethers.js"],
      },
      {
        label: "ML / AI",
        items: [
          "OpenRouter",
          "Claude Haiku",
          "LLM scoring stub",
          "validator ranking",
        ],
      },
      {
        label: "Data",
        items: ["IPFS", "Pinata", "JSON cache", "claim metadata"],
      },
      {
        label: "Infra",
        items: ["Ethereum Sepolia", "Hardhat", "Alchemy RPC", "MetaMask"],
      },
    ],
    caseStudy: {
      problem:
        "Whistleblowers need a system that protects them from retaliation while also handling trust, incentives, and verification. Centralized tip platforms solve delivery, but not accountability or economic alignment.",
      solution:
        "ChainWhistle turns whistleblowing into a permissionless protocol. Claims are stored on IPFS, validators are staked and selected through an off-chain scoring layer, news outlets bid for verified stories, and oracle nodes confirm publication with penalties for dishonest behavior.",
      architecture: [
        "React frontend for wallet-driven user flows",
        "Solidity smart contracts on Ethereum Sepolia",
        "Node.js off-chain server that listens for events and assigns validators",
        "IPFS via Pinata for claim storage",
      ],
      challenge: {
        title: "Assigning trustworthy validators without centralized control",
        problem:
          "The system needed to match claims with relevant validator orgs while excluding conflicts of interest and keeping the process auditable.",
        decision:
          "Use an off-chain LLM scoring stub to rank validator orgs by claim tags and route the final assignment back on-chain through a trusted server wallet.",
      },
    },
    media: {
      cover: "/projects/chainwhistle.png",
    },
    links: {
      github: "https://github.com/localhostwastaken/sshhh",
      live: "",
    },
    featured: false,
  },
  {
    id: "jeevkutumb-foundation",
    title: "Jeev Kutumb Foundation ",
    tagline:
      "Secure donations, verified payments, and automated 80G receipts for a nonprofit giving experience.",
    summary:
      "A donation platform for Jeev Kutumb Foundation that supports transparent charitable giving across varioussocial initiatives. The system verifies Razorpay payments server-side, generates receipt PDFs and delivers compliant tax documentation by email.",
    role: "Backend, Security and Payment Systems Engineer",
    timeline: "March 2026",
    highlights: [
      "Server-side Razorpay webhook verification with idempotent donation processing",
      "Automated PDF receipt generation and transactional email delivery",
      "80G tax-benefit support for eligible donors with secure audit trails",
    ],
    impact: [
      {
        label: "Donation Flow",
        value: "End-to-end",
        detail:
          "Automates the path from payment confirmation to receipt delivery without manual follow-up.",
      },
      {
        label: "Compliance",
        value: "80G-ready",
        detail:
          "Attaches the NGO certificate and generates compliant receipts for verified donations.",
      },
    ],
    stack: [
      {
        label: "Frontend",
        items: ["Next.js 16 App Router", "Tailwind CSS 4"],
      },
      {
        label: "Backend",
        items: [
          "Next.js API Routes",
          "Razorpay webhooks",
          "Vercel serverless runtime",
        ],
      },
      {
        label: "Data",
        items: ["Supabase PostgreSQL", "Supabase Storage"],
      },
      {
        label: "Infra",
        items: ["Vercel", "GoDaddy DNS", "Resend", "Razorpay"],
      },
    ],
    caseStudy: {
      problem:
        "Nonprofit donation systems often rely on frontend payment status and manual receipt handling, which creates trust gaps, duplicate processing risk, and slow tax-document delivery.",
      solution:
        "This platform verifies every payment on the server, persists donation state in Supabase, generates a receipt PDF after successful webhook validation, and sends the receipt plus 80G documentation through transactional email.",
      architecture: [
        "Donor submits payment intent from the Next.js UI",
        "Razorpay processes the payment and emits a webhook",
        "Webhook signature is verified server-side",
        "Donation status is updated in Supabase",
        "Receipt PDF is generated and stored",
        "Receipt and tax documents are emailed to the donor",
      ],
      challenge: {
        title: "Preventing duplicate or untrusted receipt issuance",
        problem:
          "Webhook retries and inconsistent client-side payment states can lead to duplicate receipts or incorrect donation records if the system trusts the browser.",
        decision:
          "Use server-side verification, idempotent webhook processing, and separate persistence for payment, receipt, and email state so each step can be safely retried.",
      },
    },
    media: {
      cover: "/projects/jeevkutumb.png",
    },
    links: {
      github: "https://github.com/ATZ-devs/ngo",
      live: "https://jeevkutumbfoundation.com",
    },
    featured: true,
  },
  {
    id: "kuber",
    title: "Kuber",
    tagline:
      "High-reliability payment ledger with idempotent transfers and double-entry accounting.",
    summary:
      "A full-stack Next.js payment ledger that handles secure account transfers, immutable double-entry bookkeeping, idempotency, concurrency control, webhook delivery, and transaction graph visualization.",
    role: "Full-stack engineer",
    timeline: "March 2026",
    highlights: [
      "Built an ACID-safe transfer flow with idempotency keys and PostgreSQL row-level locking.",
      "Implemented double-entry ledger records with immutable debit and credit entries for every transfer.",
      "Added webhook registration, delivery tracking, and a chaos mode stress test to validate concurrency safety.",
    ],
    impact: [
      {
        label: "Transfer Safety",
        value: "Exactly-once execution",
        detail:
          "Duplicate transfer requests are deduplicated through idempotency locks and cached responses.",
      },
      {
        label: "Reliability",
        value: "Serializable transactions",
        detail:
          "Transfers run inside database transactions with row-level locking to prevent race conditions and deadlocks.",
      },
    ],
    stack: [
      {
        label: "Frontend",
        items: [
          "Next.js 16 App Router",
          "React 19",
          "Tailwind CSS",
          "React Flow",
        ],
      },
      {
        label: "Backend",
        items: [
          "Next.js API routes",
          "Prisma ORM",
          "PostgreSQL",
          "Zod validation",
        ],
      },
      {
        label: "Data",
        items: [
          "PostgreSQL",
          "Double-entry ledger schema",
          "Idempotency key store",
          "Webhook delivery logs",
        ],
      },
      {
        label: "Infra",
        items: ["Redis", "BullMQ", "Webhook worker process", "TypeScript SDK"],
      },
    ],
    caseStudy: {
      problem:
        "Financial transfer systems need to prevent duplicate execution, preserve accounting correctness, and remain reliable under concurrent traffic.",
      solution:
        "Kuber uses idempotency gates, transactional balance updates, double-entry ledger writes, and asynchronous webhook dispatch to make transfers safe and auditable.",
      architecture: [
        "Next.js dashboard for accounts, transfers, and graph visualization",
        "API routes for accounts, transfers, and webhooks",
        "Prisma models for accounts, ledger entries, idempotency keys, and webhook deliveries",
        "BullMQ and Redis worker for resilient webhook delivery",
      ],
      challenge: {
        title: "Preventing duplicate transfers under concurrency",
        problem:
          "Multiple identical transfer requests can arrive at the same time and risk double-charging or inconsistent balances.",
        decision:
          "Use an idempotency key lock, sorted row-level account locking, and serializable transactions so only one transfer is executed while retries return cached or conflict responses.",
      },
    },
    media: {
      cover: "/projects/kuber.png",
    },
    links: {
      github: "https://github.com/Aaryan-Sharma-5/Kuber",
      live: "https://kuber-weld.vercel.app/",
    },
    featured: true,
  },
  {
    id: "shetkari",
    title: "Shetkari",
    tagline:
      "A WhatsApp-first smart farming assistant for mandi prices, weather, soil health, and AI crop planning.",
    summary:
      "Shetkari is a multilingual agricultural advisory platform that lets farmers get live mandi rates, weather forecasts, soil health insights, crop planning help, and optional voice summaries directly through WhatsApp.",
    role: "Full-stack developer",
    timeline: "February 2026",
    highlights: [
      "WhatsApp-native experience with no app install or signup friction.",
      "Unifies mandi prices, weather, soil health, and crop planning in one flow.",
      "Multilingual support with English, Hindi, and Marathi conversations.",
    ],
    impact: [
      {
        label: "Mandis tracked",
        value: "500+",
        detail:
          "Live commodity pricing coverage used for comparisons and recommendations.",
      },
      {
        label: "Languages supported",
        value: "3",
        detail:
          "English, Hindi, and Marathi chat flows for broader farmer accessibility.",
      },
    ],
    stack: [
      {
        label: "Frontend",
        items: ["React 19", "TypeScript", "Vite"],
      },
      {
        label: "Backend",
        items: ["Node.js + Express", "Python FastAPI services", "MongoDB"],
      },
      {
        label: "ML / AI",
        items: ["Google Gemini", "ElevenLabs text-to-speech"],
      },
      {
        label: "Data",
        items: [
          "data.gov.in mandi data",
          "WeatherAPI",
          "Soil Health Card scraping",
        ],
      },
      {
        label: "Infra",
        items: ["Twilio WhatsApp webhooks", "Vercel", "MongoDB"],
      },
    ],
    caseStudy: {
      problem:
        "Farmers often need to check multiple disconnected systems for market prices, weather, soil data, and crop guidance, which is slow and hard to use in the field.",
      solution:
        "Shetkari brings those signals into a single WhatsApp assistant that can answer in natural language, guide crop decisions, and return structured mandi, weather, and soil insights instantly.",
      architecture: [
        "WhatsApp webhook receives farmer messages and routes them through a multilingual conversation flow.",
        "The Express backend manages bot state, user data, mandi analysis, crop planning, and optional voice responses.",
        "A FastAPI data layer exposes soil-health, weather, and mandi endpoints used by the assistant.",
        "Gemini generates structured advisory output and ElevenLabs turns selected responses into audio.",
      ],
      challenge: {
        title: "Stateful multilingual advice over chat",
        problem:
          "The main challenge was keeping a WhatsApp bot reliable across language changes, pagination, location capture, crop-plan intake, and follow-up actions without making the experience feel fragmented.",
        decision:
          "The bot was designed as a persistent state machine backed by MongoDB, while all domain lookups were separated into dedicated services so each step could stay deterministic and easy to extend.",
      },
    },
    media: {
      cover: "/projects/shetkari.png",
    },
    links: {
      github: "https://github.com/Aaryan-Sharma-5/shetkari",
      live: "",
    },
    featured: true,
  },
  {
    id: "aequitas-gp-portfolio",
    title: "Aequitas AI",
    tagline:
      "General partner performance intelligence for multifamily investment teams",
    summary:
      "A full-stack dashboard inside Aequitas MVP that centralizes GP performance, quarterly IRR trends, quartile breakdowns, and attention signals so investment teams can evaluate partners quickly.",
    role: "Full-stack engineer",
    timeline: "December 2025 - January 2026",
    highlights: [
      "Aggregates GP overviews, quarterly IRR trends, and portfolio summaries in one dashboard.",
      "Compares net IRR across partners and automatically surfaces the top performer.",
      "Flags partners needing attention based on negative trend or low performance.",
    ],
    impact: [
      {
        label: "GP Profiles",
        value: "5",
        detail:
          "Seeded sample GP records with contact, AUM, IRR, and performance metadata.",
      },
      {
        label: "Quarterly History",
        value: "8 quarters",
        detail:
          "Each GP overview can return recent quarterly performance for trend analysis.",
      },
    ],
    stack: [
      {
        label: "Frontend",
        items: [
          "React 19",
          "TypeScript",
          "Vite",
          "Tailwind CSS",
          "Recharts",
          "Lucide React",
        ],
      },
      {
        label: "Backend",
        items: ["Flask", "Flask-SQLAlchemy", "REST API", "Gunicorn"],
      },
      {
        label: "ML / AI",
        items: ["Rule-based performance scoring", "No model training required"],
      },
      {
        label: "Data",
        items: [
          "SQLite for local development",
          "PostgreSQL for deployment",
          "Seeded GP performance datasets",
        ],
      },
      {
        label: "Infra",
        items: ["Docker", "Render", "Environment-based API configuration"],
      },
    ],
    caseStudy: {
      problem:
        "Investment teams needed a fast way to compare general partners, review historical IRR performance, and spot underperforming relationships without jumping between spreadsheets and ad hoc reports.",
      solution:
        "Built a GP portfolio dashboard that pulls from dedicated API endpoints, renders IRR comparison charts and trend lines, and highlights the top performer plus GPs that need attention.",
      architecture: [
        "React dashboard page consuming /api/v1/gps endpoints",
        "Flask service layer that assembles GP overviews, comparisons, and top-performer summaries",
        "SQLAlchemy models for GP metadata, quarterly performance, and quartile summaries",
        "Seed scripts that populate realistic sample GP portfolios for local development",
      ],
      challenge: {
        title: "Balancing overview speed with detailed history",
        problem:
          "The page needed to show a concise portfolio snapshot while still loading enough historical detail for per-GP trend analysis.",
        decision:
          "The frontend loads the aggregate charts first, then fetches detailed overviews for only the first two GPs by default, keeping the page responsive while still demonstrating the deeper data model.",
      },
    },
    media: {
      cover: "/projects/aequitas.png",
    },
    links: {
      github: "https://github.com/lcollins-spec/Aequitas-MVP",
      live: "https://aequitas-mvp-hz5z.onrender.com/",
    },
    featured: false,
  },
  {
    id: "coresight",
    title: "CoreSight",
    tagline: "AI-Driven Enterprise Delivery & Workforce Intelligence",
    summary:
      "CoreSight is an AI-powered enterprise intelligence platform that turns engineering activity from GitHub and Jira into actionable business insights. It combines executive, engineering, product, workforce, and finance dashboards with early-warning analytics and a multi-agent simulation sandbox for what-if planning.",
    role: "Full-stack AI product engineer",
    timeline: "February 2026",
    highlights: [
      "Built a multi-stakeholder dashboard suite for executive, engineering, product, workforce, and finance views.",
      "Added an AI simulation sandbox with Delivery Lead, CFO, and Architect agents for scenario analysis.",
      "Integrated early-warning and value-mapping analytics to surface delivery risk, burn signals, and cost trends.",
    ],
    impact: [
      {
        label: "Decision Surface",
        value: "5 dashboards",
        detail:
          "Unified separate views for leadership, delivery, product, workforce, and finance into one operating layer.",
      },
      {
        label: "Intelligence Layer",
        value: "3 agent perspectives",
        detail:
          "Multi-agent simulations combine delivery, financial, and architectural viewpoints for richer planning.",
      },
    ],
    stack: [
      {
        label: "Frontend",
        items: ["React 19", "TypeScript + Vite"],
      },
      {
        label: "Backend",
        items: ["FastAPI", "Python"],
      },
      {
        label: "ML / AI",
        items: [
          "Multi-agent orchestration",
          "Predictive early-warning analytics",
        ],
      },
      {
        label: "Data",
        items: ["SQLite", "GitHub and Jira activity ingestion"],
      },
      {
        label: "Infra",
        items: ["Uvicorn", "CORS-enabled REST API"],
      },
    ],
    caseStudy: {
      problem:
        "Engineering, delivery, cost, and workforce signals were fragmented across tools, making it hard for teams to understand project health and tradeoffs early enough to act.",
      solution:
        "CoreSight consolidates operational signals into role-based dashboards, maps activity to business value, and uses AI agents plus simulation to forecast the impact of resource and scope changes.",
      architecture: [
        "React/Vite frontend with role-specific dashboards",
        "FastAPI backend exposing analytics, integration, and simulation endpoints",
        "SQLite persistence for project and simulation data",
        "Multi-agent orchestration layer for Delivery Lead, CFO, and Architect analysis",
      ],
      challenge: {
        title:
          "Making engineering telemetry understandable to non-engineering stakeholders",
        problem:
          "Raw commits, tickets, utilization, and cost data are difficult to interpret in isolation and rarely answer business questions directly.",
        decision:
          "Translate operational signals into dashboard-level metrics and agent-generated narratives so each stakeholder gets the same underlying data in the language they need.",
      },
    },
    media: {
      cover: "/projects/coresight.png",
    },
    links: {
      github: "https://github.com/localhostwastaken/CoreSight",
      live: "",
    },
    featured: true,
  },
  {
    id: "healthquest",
    title: "HealthQuest",
    tagline:
      "A gamified health motivation platform that turns healthy habits into an RPG adventure.",
    summary:
      "HealthQuest is a full-stack web app that helps users build healthier routines through quests, XP, level-ups, boss battles, and AI-powered coaching. It combines habit tracking with adaptive challenge generation and community engagement to make wellness feel more rewarding and less repetitive.",
    role: "Full-stack developer and product builder",
    timeline: "December 2025",
    highlights: [
      "RPG-style health hero progression with XP, levels, and achievements",
      "Daily quest system for exercise, nutrition, and mindfulness habits",
      "AI-powered sentiment analysis and personalized health recommendations",
    ],
    impact: [
      {
        label: "Product",
        value: "Working prototype",
        detail:
          "Delivered a complete hackathon-ready full-stack experience from signup to habit progression.",
      },
      {
        label: "Engagement",
        value: "Gamified retention loop",
        detail:
          "Used quests, streaks, rewards, and boss battles to make healthy behavior more motivating.",
      },
    ],
    stack: [
      {
        label: "Frontend",
        items: ["React 19", "Vite", "Tailwind CSS", "Framer Motion"],
      },
      {
        label: "Backend",
        items: ["Flask", "REST API", "Flask-JWT-Extended"],
      },
      {
        label: "ML / AI",
        items: [
          "Keyword-based Sentiment analysis engine",
          "Adaptive difficulty logic",
          "Gemini-powered coaching and recommendations",
        ],
      },
      {
        label: "Data",
        items: ["MongoDB", "User profiles", "Activity logs", "Quest progress"],
      },
      {
        label: "Infra",
        items: [
          "Python 3.9+",
          "Node.js 18+",
          "Local dev with Vite and Flask",
          "Hackathon deployment-ready setup",
        ],
      },
    ],
    caseStudy: {
      problem:
        "Most health apps rely on passive tracking and lose users quickly because they do not create a strong sense of progression or motivation.",
      solution:
        "HealthQuest wraps wellness tracking in a game loop: users log activities, earn XP, complete quests, level up avatars, and receive AI-guided coaching plus social competition to make healthy habits more engaging and rewarding.",
      architecture: [
        "React frontend for the gamified user experience",
        "Flask backend exposing REST endpoints for auth, quests, activity, boss battles, and recommendations",
        "MongoDB persistence for users, habits, activities, and progress",
        "AI layer for sentiment analysis, adaptive difficulty, and personalized coaching",
      ],
      challenge: {
        title: "Keeping the experience motivating without overwhelming users",
        problem:
          "Health goals can feel too demanding when users are tired, stressed, or inconsistent, which makes habit formation harder.",
        decision:
          "Use a lightweight reflection form plus auto-scored quests, sentiment-based XP multipliers, and visible progression systems so every action immediately feeds the game loop.",
      },
    },
    media: {
      cover: "/projects/healthquest.png",
    },
    links: {
      github: "https://github.com/Periscope-Hackathon2025/Team-VitalNodes",
      live: "",
    },
    featured: false,
  },
  {
    id: "navixar",
    title: "Navixar",
    tagline:
      "Scalable AI evaluation and structured report generator for regulated workflows.",
    summary:
      "Navixar is a full-stack, production-ready platform that ingests dynamic form responses, runs context-aware evaluations using Google Gemini 2.5 Flash, and produces hierarchical, print-ready business reports. Emphasis is on reproducible prompts, observability, and secure access.",
    role: "Frontend and LLM integration engineer with backend collaboration",
    timeline: "August 2025 - December 2025",
    highlights: [
      "Engineered Gemini 2.5 Flash integration with token tracking and prompt configs.",
      "Designed a 3-tier hierarchical report model and deterministic report generator.",
      "Built REST API with Flask, Supabase-backed persistence, and Redis rate limiting.",
    ],
    impact: [
      {
        label: "API Surface",
        value: "40+ endpoints",
        detail:
          "Comprehensive endpoints for auth, forms, responses, evaluations, reports, credits, and admin.",
      },
      {
        label: "Evaluation Pipeline",
        value: "Modular & Observable",
        detail:
          "Prompt builder, AI client, and report generator separated for testing, tracing, and cost-control.",
      },
    ],
    stack: [
      {
        label: "Frontend",
        items: ["React 19", "TypeScript", "Vite", "Redux Toolkit", "Vitest"],
      },
      {
        label: "Backend",
        items: [
          "Flask",
          "SQLAlchemy",
          "Gunicorn",
          "Flask-JWT-Extended",
          "Flask-Limiter",
        ],
      },
      {
        label: "ML / AI",
        items: [
          "Google Gemini 2.5 Flash",
          "Prompt templates",
          "Report generator service",
        ],
      },
      {
        label: "Data",
        items: ["Supabase (Postgres)", "SQL schema + migrations"],
      },
      {
        label: "Infra",
        items: [
          "Supabase hosting",
          "CI with lint/tests",
          "Environment-managed secrets",
        ],
      },
    ],
    caseStudy: {
      problem:
        "Unstructured form responses produced inconsistent narrative reports and high manual work.",
      solution:
        "Standardize prompts + hierarchical report templates and build an evaluation pipeline that enforces structure and traceability.",
      architecture: [
        "React frontend",
        "Flask REST API (blueprints)",
        "Supabase Postgres",
        "Google Gemini AI layer",
      ],
      challenge: {
        title: "Controlling AI output consistency",
        problem:
          "Model outputs varied across submissions and affected report quality.",
        decision:
          "Implement a prompt builder, header templates, and post-processing rules to normalize structure and enable reliable downstream rendering.",
      },
    },
    media: {
      cover: "/projects/navixar.png",
    },
    links: {
      github: "https://github.com/gunjalRGS/Navixar",
      live: "",
    },
    featured: true,
  },
  {
    id: "thermoaq",
    title: "ThermoAQ",
    tagline: "Real-time weather, AQI, and AI health intelligence platform.",
    summary:
      "ThermoAQ is a full-stack environmental monitoring app that combines live weather data, air quality analytics, heat-wave mapping, and AI-generated health assessments to help users make safer day-to-day decisions.",
    role: "Full-stack developer",
    timeline: "November 2025",
    highlights: [
      "Live weather and AQI monitoring with automatic refresh and fallback data handling.",
      "Interactive dashboards for forecasts, pollutant breakdowns, district analytics, and global city comparison.",
      "AI-powered health assessment reports generated with Google Gemini for personalized environmental guidance.",
    ],
    impact: [
      {
        label: "Coverage",
        value: "130+ cities",
        detail:
          "Tracks weather and air quality across major cities with regional comparison views.",
      },
      {
        label: "Freshness",
        value: "Every 10 minutes",
        detail:
          "Weather and AQI data are refreshed on a regular cadence for near-real-time monitoring.",
      },
    ],
    stack: [
      {
        label: "Frontend",
        items: [
          "React 19",
          "Vite",
          "Tailwind CSS",
          "Chart.js",
          "React Leaflet",
        ],
      },
      {
        label: "Backend",
        items: ["Node.js", "Express", "MongoDB", "Mongoose", "Socket.io"],
      },
      {
        label: "ML / AI",
        items: [
          "Google Gemini",
          "Prompt-based health report generation",
          "Fallback AI analysis",
        ],
      },
      {
        label: "Data",
        items: [
          "Open-Meteo weather API",
          "Open-Meteo geocoding API",
          "AQI calculations",
          "MongoDB",
        ],
      },
      {
        label: "Infra",
        items: [
          "Vercel deployment",
          "CORS and rate limiting",
          "Scheduled cron jobs",
          "JWT authentication",
        ],
      },
    ],
    caseStudy: {
      problem:
        "People need a single place to understand weather, AQI, heat risk, and health impact before going outdoors, especially in polluted or extreme-weather conditions.",
      solution:
        "Built a real-time platform that combines weather forecasts, AQI analytics, city maps, health advisories, and AI-generated health assessments into one responsive dashboard.",
      architecture: [
        "React/Vite frontend for dashboards, maps, and analytics views",
        "Node/Express backend with MongoDB for authentication, user data, and saved reports",
        "Open-Meteo APIs for weather, forecasting, and geocoding",
        "AQI calculation and pollutant analysis layer for health risk scoring",
        "Google Gemini integration for personalized health report generation",
      ],
      challenge: {
        title:
          "Reliable environmental intelligence without fragile dependencies",
        problem:
          "Weather and AQI data sources can fail or return incomplete data, while health guidance needs to stay useful even when the AI service is unavailable.",
        decision:
          "Implemented caching, fallback simulation logic, backend proxying, and a non-AI fallback report path so the app continues to serve practical insights under degraded conditions.",
      },
    },
    media: { cover: "/projects/thermoaq.png" },
    links: {
      github: "https://github.com/Aaryan-Sharma-5/ThermoAQ",
      live: "https://thermo-aq.vercel.app",
    },
    featured: true,
  },
  {
    id: "verifile",
    title: "VeriFile",
    tagline: "Zero-knowledge document verification on the blockchain",
    summary:
      "VeriFile is a blockchain-backed document verification platform that combines MetaMask authentication, Self.xyz identity proofs, and on-chain record keeping to let employees and organizations register, upload, and verify documents securely.",
    role: "Full-stack developer",
    timeline: "September 2025",
    highlights: [
      "MetaMask-based registration flow for employees and organizations",
      "Self.xyz proof verification with backend wallet validation",
      "On-chain document hashing and employee/document lifecycle management",
    ],
    impact: [
      {
        label: "Access",
        value: "Wallet-gated",
        detail:
          "Protected flows require a connected MetaMask wallet before registration or verification.",
      },
      {
        label: "Privacy",
        value: "Private proofs",
        detail:
          "Self.xyz attestation checks identity without exposing raw personal details.",
      },
      {
        label: "Integrity",
        value: "Immutable records",
        detail:
          "Document hashes and transaction references are written to the blockchain for tamper-evident verification.",
      },
    ],
    stack: [
      {
        label: "Frontend",
        items: ["React", "TypeScript", "Vite", "Tailwind CSS", "React Router"],
      },
      {
        label: "Backend",
        items: ["Node.js", "Express", "ethers.js", "Multer", "CryptoJS"],
      },
      {
        label: "ML / AI",
        items: ["Self.xyz attestations", "Zero-knowledge verification"],
      },
      {
        label: "Data",
        items: [
          "Document hashes",
          "Attestation payloads",
          "Wallet-linked metadata",
        ],
      },
      {
        label: "Infra",
        items: [
          "Hardhat",
          "Solidity",
          "Ethereum smart contracts",
          "MetaMask",
          "RPC backend",
        ],
      },
    ],
    caseStudy: {
      problem:
        "Document verification systems often rely on centralized storage and expose too much user data, making it hard to prove authenticity while preserving privacy.",
      solution:
        "VeriFile uses MetaMask for wallet ownership, Self.xyz for identity attestation, and smart contracts to register employees, track organizations, and store document hashes on-chain.",
      architecture: [
        "React client handles registration, upload, and verification UX.",
        "Express backend validates MetaMask credentials and Self.xyz proofs.",
        "Hardhat smart contracts persist employee, organization, and document records on-chain.",
      ],
      challenge: {
        title: "Verifying identity without revealing sensitive data",
        problem:
          "The app needed to trust both the wallet and the identity claim while avoiding direct exposure of raw personal information.",
        decision:
          "The backend first validates the MetaMask signature, then verifies the Self.xyz proof, and only after both succeed does it write registration or document state to the blockchain.",
      },
    },
    media: {
      cover: "/projects/verifile.png",
    },
    links: {
      github: "https://github.com/localhostwastaken/verifile",
      live: "",
    },
    featured: false,
  },
  {
    id: "slot-swapper",
    title: "SlotSwapper",
    tagline: "Peer-to-peer time-slot swapping for calendars",
    summary:
      "A full-stack scheduling app that lets users create calendar events, mark slots as swappable, browse other users' availability, and negotiate one-to-one slot swaps with transactional updates.",
    role: "Full-stack developer",
    timeline: "October 2025",
    highlights: [
      "JWT-authenticated signup, login, and protected app routes",
      "Calendar event management with BUSY, SWAPPABLE, and SWAP_PENDING states",
      "Marketplace and requests workflow for browsing, requesting, accepting, and rejecting swaps",
    ],
    impact: [
      {
        label: "API Coverage",
        value: "12 endpoints",
        detail:
          "Postman collection covers auth, event, and swap flows for end-to-end testing.",
      },
      {
        label: "Frontend Surface",
        value: "5 routes",
        detail:
          "Login, signup, dashboard, marketplace, and swap requests are wired into the React app.",
      },
    ],
    stack: [
      {
        label: "Frontend",
        items: ["React 19 + TypeScript", "Vite, React Router, Axios"],
      },
      {
        label: "Backend",
        items: ["Node.js + Express", "PostgreSQL, JWT, Zod"],
      },
      {
        label: "Data",
        items: ["PostgreSQL", "Transactional swap and event records"],
      },
      {
        label: "Infra",
        items: [
          "Vercel serverless backend",
          "Vercel frontend rewrite + env-based API config",
        ],
      },
    ],
    caseStudy: {
      problem:
        "People need a simple way to exchange unavailable calendar time without manually coordinating edits across two schedules.",
      solution:
        "SlotSwapper provides authenticated calendars, a swappable-slot marketplace, and a request/response flow that updates both users' events inside database transactions.",
      architecture: [
        "React/Vite frontend with protected routes and a typed API client",
        "Express backend with JWT auth, Zod validation, and PostgreSQL",
        "Serverless deployment via Vercel for both frontend and backend",
      ],
      challenge: {
        title: "Keeping swaps consistent under concurrent requests",
        problem:
          "A swap touches two users' events and a request record, so partial updates or race conditions could leave calendars inconsistent.",
        decision:
          "Use PostgreSQL transactions and row-level locking with FOR UPDATE to verify ownership, prevent duplicate pending requests, and commit the swap atomically.",
      },
    },
    media: {
      cover: "/projects/slot-swapper.png",
    },
    links: {
      github: "https://github.com/Aaryan-Sharma-5/slot-swapper",
      live: "https://slot-swapper-rho.vercel.app",
    },
    featured: false,
  },
  {
    id: "health-and-wellness-blog",
    title: "Health & Wellness Blog",
    tagline:
      "A modern responsive blog platform for health, wellness, and mindful living.",
    summary:
      "A PHP and MySQL-based blog platform for publishing wellness articles, organizing content by categories, and enabling user engagement through likes and comments. The project includes article management, category browsing, image uploads, authentication, and a dark-mode responsive UI.",
    role: "Full-stack developer",
    timeline: "April 2025",
    highlights: [
      "Responsive dark-themed interface built with HTML, CSS, JavaScript, and Bootstrap 5",
      "Category-based article browsing with featured and related content",
      "Interactive article pages with likes, comments, and image uploads",
    ],
    impact: [
      {
        label: "Content Management",
        value: "Multi-page CMS-style blog",
        detail:
          "Supports creating, editing, browsing, and deleting wellness articles with category support.",
      },
      {
        label: "User Engagement",
        value: "Likes and comments",
        detail:
          "Adds article interaction features so readers can engage with posts and discuss content.",
      },
    ],
    stack: [
      {
        label: "Frontend",
        items: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5"],
      },
      {
        label: "Backend",
        items: ["PHP", "Session-based authentication", "MySQL queries"],
      },
      {
        label: "ML / AI",
        items: ["Not used", "Not used"],
      },
      {
        label: "Data",
        items: [
          "MySQL",
          "Relational schema for users, articles, categories, comments, and likes",
        ],
      },
      {
        label: "Infra",
        items: ["XAMPP", "Git", "GitHub"],
      },
    ],
    caseStudy: {
      problem:
        "The project needed a clean way to publish wellness content, organize it into categories, and let users interact with posts in a structured, responsive interface.",
      solution:
        "Built a PHP/MySQL blog application with category browsing, article detail pages, login/signup, post management, comments, likes, and media uploads, all wrapped in a responsive dark UI.",
      architecture: [
        "PHP pages for each major route such as home, blogs, categories, article detail, dashboard, sign in, and sign up",
        "MySQL database with normalized tables for users, categories, articles, comments, and likes",
        "Session-based flow for authentication and author ownership checks",
      ],
      challenge: {
        title: "Managing interactive article engagement",
        problem:
          "The article page had to support both read-only visitors and logged-in users who can like, comment, and navigate related content safely.",
        decision:
          "Use session checks, server-side validation, and separate tables for comments and likes to keep interactions simple and consistent.",
      },
    },
    media: {
      cover: "/projects/image.png",
    },
    links: {
      github: "https://github.com/Aaryan-Sharma-5/Health-and-Wellness-Blog",
      live: "",
    },
    featured: false,
  },
  {
    id: "iste-kjsse-web",
    title: "ISTE KJSSE Official Website",
    tagline: "Serving Technology Better",
    summary:
      "A responsive, content-driven website for the ISTE KJSSE student chapter. It presents the chapter's identity, archives technical events across academic years, showcases team rosters, and provides a polished public-facing presence with animated sections, gallery visuals, and contact information.",
    role: "Infrastructure and frontend developer",
    timeline: "February 2026",
    highlights: [
      "Built a full one-page campus organization website with a strong visual identity and smooth section-based navigation.",
      "Structured events and team data into reusable pages powered by JSON-backed content helpers.",
      "Added animated UI sections, a responsive gallery, and year-wise archives for events and teams.",
    ],
    impact: [
      {
        label: "Archived Events",
        value: "10+",
        detail:
          "The site catalogs seminars, workshops, competitions, and flagship events across multiple academic years.",
      },
      {
        label: "Team History",
        value: "5 Years",
        detail:
          "Team rosters are organized by academic year and department, making chapter history easy to browse.",
      },
    ],
    stack: [
      {
        label: "Frontend",
        items: ["Next.js 16", "React 19", "Tailwind CSS v4", "Framer Motion"],
      },
      {
        label: "Backend",
        items: ["Next.js App Router", "Static JSON content layer"],
      },
      {
        label: "Data",
        items: ["events.json", "teams.json"],
      },
      {
        label: "Infra",
        items: ["Vercel deployment", "Next.js remote image configuration"],
      },
    ],
    caseStudy: {
      problem:
        "ISTE KJSSE needed a modern, easy-to-maintain website that could present its identity, events, teams, and contact details in a polished format without a heavyweight backend.",
      solution:
        "The site was built as a modular Next.js application with reusable UI sections and typed data helpers. Event and team content is sourced from structured JSON files, while the homepage combines animated visuals, gallery content, and clear navigation into a cohesive public experience.",
      architecture: [
        "App Router pages for the homepage, events archive, and team archive",
        "Reusable section components for landing, about, events, gallery, team, and footer",
        "Typed data helpers that transform JSON into page-ready event and team structures",
        "Remote image hosting and Vercel-friendly configuration for chapter media",
      ],
      challenge: {
        title: "Keeping large chapter content maintainable",
        problem:
          "The project has recurring yearly content, many event entries, and department-based team rosters that can become difficult to manage if hardcoded directly into UI components.",
        decision:
          "Move content into JSON files and build thin helper layers that derive the correct year-wise and department-wise views for the UI.",
      },
    },
    media: {
      cover: "/projects/iste.png",
    },
    links: {
      github: "https://github.com/KJSCE-ISTE/ISTE-web",
      live: "https://www.istekjsce.com/",
    },
    featured: false,
  },
];

export const experiences = [
  {
    id: "almanet",
    company: "Almanet Professional Services",
    role: "Software Engineering Intern",
    period: "December 2025 - Present",
    location: "Remote, Mumbai",
    description:
      "Architecting event-driven video processing pipelines for cricket highlight generation",
    achievements: [
      "Architected an event-driven video processing pipeline on Google Cloud Run using FastAPI, decoupling intensive FFmpeg tasks into dedicated background workers to asynchronously process 7-hour match videos without API timeouts",
      "Engineered an automated highlight extraction engine utilizing OCR to detect scoring events, achieving a 3x processing speed up by analyzing 1 hour of high-resolution footage in 20 minutes to generate player supercuts and enabling automated player analytics",
      "Implemented FFmpeg logic to slice and merge clips based on event timestamps",
      "Utilized PostgreSQL for metadata storage and JWT for secure user ingestion and YouTube uploads",
    ],
    techStack: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "FFmpeg",
      "GCP",
      "OCR",
      "JWT",
    ],
  },
  {
    id: "mining-roots",
    company: "Mining Roots",
    role: "Software Engineering Intern",
    period: "July 2025 - November 2025",
    location: "Remote, Mumbai",
    description:
      "Built the core compliance engine for Navxiar, a SaaS platform for regulatory reporting",
    achievements: [
      "Engineered a non-blocking evaluation engine in Flask, utilizing threading to process dynamic form submissions asynchronously and prevent API timeouts during high-latency AI operations",
      "Integrated Google Gemini 2.5 Flash via optimized prompt engineering to automatically generate complex, 3-tier hierarchical compliance reports from raw JSON form responses",
      "Reduced compliance risk assessment time from hours to seconds",
      "Architected scalable SaaS backend for enterprise clients",
    ],
    techStack: [
      "Flask",
      "Gemini 2.5 Flash",
      "PostgreSQL",
      "Prompt Engineering",
      "Threading",
    ],
  },
  {
    id: "smowcode",
    company: "Smowcode",
    role: "Embedded Systems Intern (ESP32, C/C++)",
    period: "June 2025 - July 2025",
    location: "Remote, Andheri",
    description:
      "Engineered ESP32 hardware interface libraries for Smowcode's visual IDE",
    achievements: [
      "Developed and validated ESP32 peripheral libraries using ESP-IDF, ensuring memory safety and thread-safe execution for real-world deployments",
      "Engineered C integration layers linking ESP-IDF hardware libraries to a visual IDE, utilizing JSON configuration files to map hardware pins and manage library dependencies",
      "Implemented ADC, DAC, and RF calibration with testing and validation",
      "Improved extensibility, maintainability, and developer usability",
    ],
    techStack: ["ESP32", "C/C++", "Embedded C", "ESP-IDF", "ADC/DAC"],
  },
];

export const extracurriculars = [
  {
    id: "iste-kjsse",
    organization: "ISTE KJSSE",
    fullName: "Indian Society for Technical Education",
    role: "Creative Team Head",
    period: "July 2025 - May 2026",
    location: "Vidyavihar, Mumbai",
    description:
      "Led a 7-member creative team to define branding, visual systems, and event identity across ISTE KJSSE initiatives.",
    achievements: [
      "Delivered graphic and motion content for campus technical events",
      "Coordinated cross-team assets with PR and tech leads to boost event turnout",
    ],
    techStack: [
      "Next.js",
      "Figma",
      "Canva",
      "Affinity Suite",
      "Photoshop",
      "DaVinci Resolve",
      "Leadership",
    ],
  },
  {
    id: "acm-kjsce",
    organization: "ACM KJSCE",
    fullName: "Association for Computing Machinery",
    role: "Creative Team Member",
    period: "July 2024 - May 2025",
    location: "Vidyavihar, Mumbai",
    description:
      "Designed scalable visual assets and reusable branding systems for ACM events, outreach, and chapter communications.",
    achievements: [
      "Created 35+ visual assets for events and outreach",
      "Achieved 40% growth in social media reach",
    ],
    techStack: ["Figma", "Canva", "Photoshop", "Affinity Suite", "Graphic Design", "Teamwork"],
  },
];

export const achievements = [
  {
    title: "2nd Place at AlgoQuest 25",
    date: "April 2026",
    description:
      "Competitive programming contest organized by Isource with 1000+ participants",
    image: "/achievements/algoquest.png",
  },
  {
    title: "Hacker at ETHGlobal New Delhi",
    date: "September 2025",
    description: "Participated in ETHGlobal's hackathon in New Delhi",
    image: "/achievements/ethglobal.png",
  },
  {
    title: "Outstanding Contributor at Smowcode",
    date: "July 2025",
    description:
      "Recognized for significant contributions to Smowcode's ESP32 libraries",
    image: "/achievements/smowcode.png",
  },
  {
    title: "GSSoC '24 Contributor",
    date: "May - August 2024",
    description: "500+ points in Open Source contributions",
    image: "/achievements/gssoc24.png",
  },
  {
    title: "3rd Place - CodeForge Arena",
    date: "February 2024",
    description: "Competitive programming competition",
    image: "/achievements/codeforge.png",
  },
];

export const skills = {
  languages: ["JavaScript", "TypeScript", "Python", "SQL", "C++", "C"],
  backend: [
    "Node.js",
    "Express.js",
    "Flask",
    "FastAPI",
    "RESTful APIs",
    "Zod/Pydantic",
    "WebSockets",
    "Redis",
    "JWT",
    "OAuth",
    "RBAC",
    "ACID Transactions",
  ],
  frontend: [
    "Next.js",
    "React",
    "Zustand",
    "Redux Toolkit",
    "Tailwind CSS",
    "Framer Motion",
    "Spline",
  ],
  databases: [
    "PostgreSQL",
    "Prisma",
    "Drizzle",
    "MongoDB",
    "Mongoose",
    "MySQL",
  ],
  ai: [
    "RAG Pipelines",
    "LLM Orchestration",
    "EasyOCR",
    "OpenCV",
    "Prompt Engineering",
  ],
  devops: ["Docker", "GitHub Actions", "Git", "Linux", "Bash", "Postman"],
  cloud: ["Supabase", "Firebase", "Vercel", "Render", "AWS", "GCP"],
  design: ["Figma", "Canva", "Affinity Suite", "Photoshop", "DaVinci Resolve"],
};
