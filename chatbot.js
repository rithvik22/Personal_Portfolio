(() => {
  const knowledge = {
    name: "Rithvik Velapati",
    title: "Lead Full-Stack Developer",
    location: "Irving, TX",
    email: "velapatirithvik@gmail.com",
    phone: "+1 (901) 658-7572",
    linkedin: "https://www.linkedin.com/in/rithvikvelapati",
    github: "https://github.com/rithvik22",
    portfolio: "https://rithvik22.github.io/Personal_Portfolio/",
    hirePacket: "https://hire-packet.vercel.app",
    summary:
      "Nearly 4 years building enterprise web, mobile, and AI-powered apps. Promoted to Lead Developer at Healthvice (WellFed). Strong in Java, Spring Boot, NestJS, React, Next.js, AWS, Azure, and production RAG/LLM workflows.",
    experience: [
      "Lead Developer at Healthvice (WellFed) — Aug 2024–Present: AI nutrition platform across web, iOS, and Android; NestJS, Kafka, OpenAI RAG, AWS/Azure.",
      "Software Developer at Unique Logic Solutions — May–Aug 2024: Online pharmacy with Spring Boot, React, Kafka, Bedrock AI pipeline.",
      "Java Software Developer at Cognizant — Jan 2021–Jul 2022: Employee management system with Spring Boot, Node.js, React, AWS.",
    ],
    skills: [
      "Languages: Java, JavaScript, TypeScript, Python, SQL",
      "Frontend: React, Next.js, Angular, React Native, Capacitor, Tailwind, WCAG",
      "Backend: Node.js, NestJS, Spring Boot, Bun, REST, GraphQL, microservices",
      "Data: MongoDB, PostgreSQL, MySQL, Redis, TypeORM, Hibernate / JPA",
      "AI & LLM: OpenAI, Bedrock, RAG, embeddings, Replicate, Gemini, Zod, Instructor",
      "Cloud & DevOps: AWS, Azure, Terraform, Docker, Kubernetes, Jenkins, CI/CD, Sentry",
      "Security: OAuth 2.0, JWT, Firebase Auth, RBAC, OWASP",
      "Messaging: Apache Kafka, SQS, SNS, Webhooks, Socket.IO",
    ],
    projects: [
      "Hire Packet — AI-assisted recruiter tool with evidence-backed fit scores (Next.js, Gemini, Vercel). Live: https://hire-packet.vercel.app",
      "WellFed — AI nutrition & meal planning platform (NestJS, Next.js, MongoDB, Kafka, OpenAI).",
      "Pharmacy platform — Spring Boot microservices + Bedrock AI pharmacist review.",
      "Vintage car auction — semantic search with Bedrock embeddings and OpenSearch.",
      "Ride & food app — React Native, Node.js, MySQL, MongoDB.",
    ],
    education: "MS Computer Science, University of Memphis (2024). B.Tech CS, Anurag University (2022).",
    certs: "AWS Certified Developer — Associate. Applied ML in Python (University of Michigan).",
  };

  const STOP_WORDS = new Set([
    "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
    "have", "has", "had", "do", "does", "did", "will", "would", "could",
    "should", "may", "might", "can", "what", "which", "who", "whom", "whose",
    "when", "where", "why", "how", "all", "each", "every", "both", "few",
    "more", "most", "other", "some", "such", "no", "nor", "not", "only",
    "own", "same", "so", "than", "too", "very", "just", "don", "now", "tell",
    "me", "about", "you", "your", "his", "her", "him", "he", "she", "they",
    "them", "their", "this", "that", "these", "those", "am", "i", "we", "our",
    "us", "please", "give", "know", "use", "using", "work", "works", "worked",
    "with", "for", "and", "or", "but", "in", "on", "at", "to", "from", "of",
    "by", "as", "if", "any", "get", "got", "like", "really", "also", "much",
    "many", "experience", "rithvik", "velapati", "reddy",
  ]);

  const TECH_ALIASES = {
    node: "nodejs",
    "node.js": "nodejs",
    js: "javascript",
    ts: "typescript",
    k8s: "kubernetes",
    postgres: "postgresql",
    mongo: "mongodb",
    bedrock: "bedrock",
    openai: "openai",
    gemini: "gemini",
    rag: "rag",
    kafka: "kafka",
    nest: "nestjs",
    "spring boot": "spring boot",
    react: "react",
    aws: "aws",
    azure: "azure",
    docker: "docker",
    terraform: "terraform",
    graphql: "graphql",
    java: "java",
    python: "python",
    mobile: "react native",
    llm: "llm",
    oauth: "oauth",
    jwt: "jwt",
    cicd: "ci/cd",
    "ci/cd": "ci/cd",
  };

  const sections = {
    home: "#home",
    about: "#about",
    experience: "#experience",
    work: "#work",
    projects: "#work",
    skills: "#skills",
    contact: "#contact",
  };

  function init() {
    const bot = document.getElementById("chatbot");
    const toggle = document.getElementById("chatbot-toggle");
    const panel = document.getElementById("chatbot-panel");
    const closeBtn = document.getElementById("chatbot-close");
    const messages = document.getElementById("chatbot-messages");
    const form = document.getElementById("chatbot-form");
    const input = document.getElementById("chatbot-input");
    const chips = document.getElementById("chatbot-chips");

    if (!bot || !toggle || !panel || !messages || !form || !input) return;

    let isOpen = false;

    function scrollToSection(hash) {
      const target = document.querySelector(hash);
      if (!target) return false;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    }

    function addMessage(text, role) {
      const row = document.createElement("div");
      row.className = `chatbot-msg-row chatbot-msg-row--${role}`;

      const avatar = document.createElement("div");
      avatar.className = "chatbot-msg-avatar";
      avatar.textContent = role === "bot" ? "RV" : "You".slice(0, 1);

      const bubble = document.createElement("div");
      bubble.className = `chatbot-msg chatbot-msg--${role}`;
      bubble.innerHTML = role === "bot" ? formatBot(text) : escapeHtml(text);

      row.appendChild(avatar);
      row.appendChild(bubble);
      messages.appendChild(row);
      messages.scrollTop = messages.scrollHeight;
    }

    function showTyping() {
      removeTyping();
      const row = document.createElement("div");
      row.className = "chatbot-typing";
      row.id = "chatbot-typing";
      row.innerHTML = `
        <div class="chatbot-msg-avatar">RV</div>
        <div class="chatbot-typing-bubble" aria-label="Assistant is typing">
          <span></span><span></span><span></span>
        </div>`;
      messages.appendChild(row);
      messages.scrollTop = messages.scrollHeight;
    }

    function removeTyping() {
      document.getElementById("chatbot-typing")?.remove();
    }

    function escapeHtml(str) {
      return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }

    function formatBot(text) {
      return escapeHtml(text)
        .replace(/\n/g, "<br>")
        .replace(
          /(https?:\/\/[^\s<]+)/g,
          '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
        )
        .replace(
          /(velapatirithvik@gmail\.com)/g,
          '<a href="mailto:velapatirithvik@gmail.com">$1</a>'
        );
    }

    function escapeRegex(str) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    function hasPhrase(q, phrases) {
      return phrases.some((p) => q.includes(p));
    }

    function hasWord(q, words) {
      return words.some((w) => new RegExp(`\\b${escapeRegex(w)}\\b`, "i").test(q));
    }

    function extractTerms(q) {
      const normalized = q.toLowerCase();
      const terms = new Set();

      Object.entries(TECH_ALIASES).forEach(([alias, canonical]) => {
        if (normalized.includes(alias)) terms.add(canonical);
      });

      normalized
        .replace(/[^\w\s/+.-]/g, " ")
        .split(/\s+/)
        .filter((w) => w.length > 1 && !STOP_WORDS.has(w))
        .forEach((w) => terms.add(w));

      return [...terms];
    }

    function searchCorpus(terms) {
      if (!terms.length) return null;

      const blocks = [
        { label: "Experience", lines: knowledge.experience },
        { label: "Skills", lines: knowledge.skills },
        { label: "Projects", lines: knowledge.projects },
        { label: "Education", lines: [knowledge.education, knowledge.certs] },
      ];

      const hits = [];

      blocks.forEach(({ label, lines }) => {
        lines.forEach((line) => {
          const lower = line.toLowerCase();
          const matched = terms.filter((t) => lower.includes(t));
          if (matched.length) {
            hits.push({ label, line, score: matched.length });
          }
        });
      });

      if (!hits.length) return null;

      hits.sort((a, b) => b.score - a.score);
      const top = hits.slice(0, 3);
      return (
        `Here's what I found about that in Rithvik's background:\n\n` +
        top.map((h) => `• ${h.line}`).join("\n\n")
      );
    }

    function matchIntent(text) {
      const q = text.toLowerCase().trim();

      if (/^(hi|hello|hey|yo|sup|good morning|good afternoon)\b/.test(q)) {
        return `Hi! I'm Rithvik's portfolio assistant. Ask about his experience, skills, projects, tech stack, or how to contact him.`;
      }

      if (/^(help|menu|options)\b/.test(q)) {
        return (
          "Try asking:\n" +
          "• What is your experience?\n" +
          "• Does he know Kubernetes / NestJS / Spring Boot?\n" +
          "• Tell me about Hire Packet or WellFed\n" +
          "• How can I contact you?\n" +
          "• Go to skills / work / contact"
        );
      }

      for (const [key, hash] of Object.entries(sections)) {
        if (
          new RegExp(`\\b(go to|show|open|navigate to|take me to|scroll to)\\s+${key}\\b`).test(q) ||
          q === key ||
          q === `/${key}`
        ) {
          scrollToSection(hash);
          return `Taking you to ${key}…`;
        }
      }

      if (hasPhrase(q, ["hire packet", "hire-packet", "recruiter tool", "fit score", "fit report"])) {
        scrollToSection("#work");
        return (
          `Hire Packet is Rithvik's featured side project — an evidence-backed recruiter tool.\n\n` +
          `Paste a job description, compare resumes, and get fit scores with proof bullets. ` +
          `Matching and scoring run in TypeScript; Gemini assists extraction only.\n\n` +
          `Live: ${knowledge.hirePacket}\n` +
          `GitHub: https://github.com/rithvik22/hire-packet`
        );
      }

      if (hasPhrase(q, ["wellfed", "well fed", "healthvice"]) || hasPhrase(q, ["current role", "current job", "lead developer"])) {
        scrollToSection("#experience");
        return `${knowledge.experience[0]}\n\nHe was promoted to Lead Developer and architects WellFed end to end.`;
      }

      if (
        hasPhrase(q, ["contact you", "contact him", "reach you", "reach him", "get in touch", "email him", "phone number", "linkedin"]) ||
        /^how can i contact/.test(q) ||
        /^what is (your|his) email/.test(q) ||
        /^(email|phone|contact|linkedin|github|call|reach)$/i.test(q) ||
        (hasWord(q, ["email", "phone", "linkedin", "github"]) && q.split(/\s+/).length <= 3)
      ) {
        scrollToSection("#contact");
        return (
          `Email: ${knowledge.email}\n` +
          `Phone: ${knowledge.phone}\n` +
          `LinkedIn: ${knowledge.linkedin}\n` +
          `GitHub: ${knowledge.github}\n\n` +
          `Open to full-stack, backend, and AI platform roles. Irving, TX — hybrid, remote, or relocation OK.`
        );
      }

      if (hasPhrase(q, ["download resume", "resume pdf", "send resume"]) || (hasWord(q, ["resume", "cv"]) && /download|pdf|send|get/.test(q)) || /^(resume|cv)$/i.test(q)) {
        return "Download his resume from the Contact section or directly: RithvikReddyResume.pdf on this site.";
      }

      if (
        hasPhrase(q, ["tell me about yourself", "who is rithvik", "about rithvik", "introduce yourself"]) ||
        /^who are you/.test(q)
      ) {
        scrollToSection("#about");
        return `${knowledge.name} — ${knowledge.title} based in ${knowledge.location}.\n\n${knowledge.summary}`;
      }

      if (hasPhrase(q, ["years of experience", "how many years", "how long has"]) || /^how much experience/.test(q)) {
        return "Rithvik has nearly 4 years of professional software development experience — Cognizant, Unique Logic Solutions, and now Lead Developer at Healthvice.";
      }

      if (hasPhrase(q, ["where do you live", "where is he based", "where located"]) || (hasWord(q, ["location", "based", "live"]) && hasWord(q, ["where", "irving", "texas"]))) {
        return `Based in ${knowledge.location}. Open to hybrid, remote, or relocation.`;
      }

      if (hasPhrase(q, ["education", "university", "degree", "certification", "certified", "memphis", "anurag"])) {
        return `${knowledge.education}\n\nCertifications: ${knowledge.certs}`;
      }

      if (
        hasPhrase(q, ["work history", "job history", "past jobs", "previous roles", "employment history"]) ||
        /^(experience|jobs|career)$/i.test(q) ||
        (hasWord(q, ["experience", "jobs", "career", "background"]) && !hasWord(q, ["years"]))
      ) {
        scrollToSection("#experience");
        return knowledge.experience.join("\n\n");
      }

      if (hasWord(q, ["cognizant"])) {
        return knowledge.experience[2];
      }

      if (hasPhrase(q, ["unique logic", "pharmacy"])) {
        return knowledge.experience[1];
      }

      if (
        hasPhrase(q, ["tech stack", "technologies", "skills", "what stack", "what does he know"]) ||
        /^(skills|stack|tech)$/i.test(q) ||
        (hasWord(q, ["skills", "stack"]) && !extractTerms(q).length)
      ) {
        scrollToSection("#skills");
        return knowledge.skills.join("\n");
      }

      if (
        hasPhrase(q, ["projects", "portfolio projects", "side projects", "what has he built", "what did he build"]) ||
        /^(projects|portfolio)$/i.test(q) ||
        (hasWord(q, ["projects"]) && !hasPhrase(q, ["hire packet"]))
      ) {
        scrollToSection("#work");
        return knowledge.projects.join("\n\n");
      }

      if (hasPhrase(q, ["full stack", "full-stack", "frontend and backend", "end to end"])) {
        return "Yes — Rithvik works full stack end to end: backend (NestJS, Spring Boot), frontend (React, Next.js), mobile (React Native, Capacitor), AI/RAG pipelines, and cloud/DevOps (AWS, Azure, Kubernetes, Terraform).";
      }

      if (hasWord(q, ["nestjs", "nest.js"]) || hasPhrase(q, ["nest js"])) {
        return "Yes. NestJS is a core part of his current work at Healthvice/WellFed — REST & GraphQL APIs, auth, Kafka workflows, and MongoDB/Redis.";
      }

      if (hasWord(q, ["spring"]) && hasWord(q, ["boot"])) {
        return "Yes. Strong Spring Boot experience at Unique Logic (pharmacy platform), Cognizant, and across multiple projects — microservices, JPA, REST APIs, Kafka.";
      }

      if (hasWord(q, ["kubernetes", "k8s"])) {
        return "Yes. He provisions and deploys with Kubernetes and Terraform at Healthvice, plus AKS on Azure and containerized services on AWS.";
      }

      if (hasWord(q, ["rag"]) || hasPhrase(q, ["retrieval augmented", "llm pipeline", "vector search"])) {
        return "Yes. Production RAG experience at WellFed — embeddings, vector search, guardrails, prompt evaluation, and monitoring with OpenAI.";
      }

      const terms = extractTerms(q);
      const searched = searchCorpus(terms);
      if (searched) return searched;

      return null;
    }

    function reply(text) {
      addMessage(text, "user");
      const answer = matchIntent(text);
      showTyping();

      window.setTimeout(() => {
        removeTyping();
        addMessage(
          answer ||
            "I can only answer questions about Rithvik's experience, skills, projects, education, and contact info. Try: \"Does he know Kafka?\", \"Tell me about WellFed\", or tap a quick button below.",
          "bot"
        );
      }, 650);
    }

    function setOpen(open) {
      isOpen = open;
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      panel.setAttribute("aria-hidden", open ? "false" : "true");
      bot.classList.toggle("is-open", open);

      if (open) {
        window.setTimeout(() => input.focus(), 80);
        if (messages.childElementCount === 0) {
          addMessage(
            "Hey! I'm Rithvik's portfolio assistant. Ask about experience, skills, projects, or how to reach him.",
            "bot"
          );
        }
      }
    }

    setOpen(false);

    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      setOpen(!isOpen);
    });

    closeBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      setOpen(false);
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const text = input.value.trim();
      if (!text) return;
      input.value = "";
      reply(text);
    });

    chips?.addEventListener("click", (e) => {
      e.preventDefault();
      const btn = e.target.closest("button[data-prompt]");
      if (!btn) return;
      reply(btn.dataset.prompt || "");
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isOpen) setOpen(false);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
