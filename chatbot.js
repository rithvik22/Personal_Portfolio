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
      "Lead Developer at Healthvice (WellFed) — Aug 2024–Present: AI nutrition platform across web, iOS, Android; NestJS, Kafka, OpenAI RAG, AWS/Azure.",
      "Software Developer at Unique Logic Solutions — May–Aug 2024: Online pharmacy with Spring Boot, React, Kafka, Bedrock AI pipeline.",
      "Java Software Developer at Cognizant — Jan 2021–Jul 2022: Employee management system with Spring Boot, Node.js, React, AWS.",
    ],
    skills: [
      "Languages: Java, JavaScript, TypeScript, Python, SQL",
      "Frontend: React, Next.js, Angular, React Native, Tailwind",
      "Backend: NestJS, Spring Boot, Node.js, REST, GraphQL, microservices",
      "AI: OpenAI, Bedrock, RAG, embeddings, Gemini",
      "Cloud: AWS, Azure, Docker, Kubernetes, Terraform, CI/CD",
    ],
    projects: [
      "Hire Packet — AI-assisted recruiter tool with evidence-backed fit scores (Next.js, Gemini, Vercel).",
      "WellFed — AI nutrition & meal planning platform (NestJS, Next.js, MongoDB, Kafka, OpenAI).",
      "Pharmacy platform — Spring Boot microservices + Bedrock AI review.",
    ],
    education: "MS Computer Science, University of Memphis (2024). B.Tech CS, Anurag University (2022).",
    certs: "AWS Certified Developer — Associate. Applied ML in Python (University of Michigan).",
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
    const el = document.createElement("div");
    el.className = `chatbot-msg chatbot-msg--${role}`;
    el.innerHTML = role === "bot" ? formatBot(text) : escapeHtml(text);
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
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

  function matchIntent(text) {
    const q = text.toLowerCase().trim();

    if (/^(hi|hello|hey|yo|sup)\b/.test(q)) {
      return `Hi! I'm Rithvik's portfolio assistant. Ask about his experience, skills, projects, or how to reach him. Try "experience", "skills", or "contact".`;
    }

    if (/^(help|menu|options)\b/.test(q)) {
      return "You can ask about:\n• Experience & roles\n• Skills & tech stack\n• Projects (Hire Packet, WellFed)\n• Education & certifications\n• Contact & resume\n• Or say: go to about, work, skills, contact";
    }

    for (const [key, hash] of Object.entries(sections)) {
      if (
        new RegExp(`\\b(go to|show|open|navigate to|take me to)\\s+${key}\\b`).test(q) ||
        q === key ||
        q === `/${key}`
      ) {
        scrollToSection(hash);
        return `Taking you to ${key}…`;
      }
    }

    if (/hire[\s-]?packet|recruiter tool|fit score/.test(q)) {
      return `Hire Packet is Rithvik's featured project — an evidence-backed recruiter tool. Paste a JD, compare resumes, get fit scores with proof bullets. Matching runs in TypeScript; Gemini assists extraction.\n\nLive: ${knowledge.hirePacket}\nGitHub: https://github.com/rithvik22/hire-packet`;
    }

    if (/wellfed|healthvice|lead developer|current (job|role|work)/.test(q)) {
      scrollToSection("#experience");
      return `${knowledge.experience[0]}\n\nHe's Lead Developer at Healthvice, architecting WellFed from the ground up.`;
    }

    if (/experience|work history|jobs?|career|background|cognizant|unique logic/.test(q)) {
      scrollToSection("#experience");
      return knowledge.experience.join("\n\n");
    }

    if (/skill|stack|tech|technologies|languages|framework|nestjs|spring|react|aws|azure|ai|rag/.test(q)) {
      scrollToSection("#skills");
      return knowledge.skills.join("\n");
    }

    if (/project|portfolio|built|github/.test(q)) {
      scrollToSection("#work");
      return knowledge.projects.join("\n\n");
    }

    if (/education|degree|university|memphis|certification|cert|aws certified/.test(q)) {
      return `${knowledge.education}\n\nCertifications: ${knowledge.certs}`;
    }

    if (/contact|email|phone|reach|hire|available|linkedin/.test(q)) {
      scrollToSection("#contact");
      return `Email: ${knowledge.email}\nPhone: ${knowledge.phone}\nLinkedIn: ${knowledge.linkedin}\nGitHub: ${knowledge.github}\n\nOpen to full-stack, backend, and AI platform roles. Irving, TX — hybrid/remote/relocation OK.`;
    }

    if (/resume|cv|download/.test(q)) {
      return `Download his resume from the Contact section or here: RithvikReddyResume.pdf on this site.`;
    }

    if (/who (are|r) (you|u)|about (you|rithvik)|tell me about yourself|introduce/.test(q)) {
      scrollToSection("#about");
      return `${knowledge.name} — ${knowledge.title} based in ${knowledge.location}.\n\n${knowledge.summary}`;
    }

    if (/where (are|do)|location|based|live|irving|texas|tx/.test(q)) {
      return `Based in ${knowledge.location}. Open to hybrid, remote, or relocation.`;
    }

    if (/years|how long|experience count/.test(q)) {
      return "Nearly 4 years of professional software development experience, from Cognizant through Unique Logic to Lead Developer at Healthvice.";
    }

    if (/full.?stack|backend|frontend|mobile|devops/.test(q)) {
      return "Rithvik works full-stack end to end: backend (NestJS, Spring Boot), frontend (React, Next.js), mobile (React Native, Capacitor), AI/RAG pipelines, and cloud/DevOps (AWS, Azure, Kubernetes, Terraform).";
    }

    return null;
  }

  function reply(text) {
    addMessage(text, "user");
    const answer = matchIntent(text);

    window.setTimeout(() => {
      if (answer) {
        addMessage(answer, "bot");
      } else {
        addMessage(
          "I'm not sure about that. Try asking about experience, skills, Hire Packet, projects, contact, or say \"go to work\" / \"go to skills\".",
          "bot"
        );
      }
    }, 350);
  }

  function setOpen(open) {
    isOpen = open;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    panel.setAttribute("aria-hidden", open ? "false" : "true");
    bot.classList.toggle("is-open", open);
    if (open) {
      window.setTimeout(() => input.focus(), 50);
      if (messages.childElementCount === 0) {
        addMessage(
          "Hi! I'm here to help recruiters and hiring managers learn about Rithvik. What would you like to know?",
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

  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      setOpen(false);
    });
  }

  panel.addEventListener("click", (e) => e.stopPropagation());

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = "";
    reply(text);
  });

  if (chips) {
    chips.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-prompt]");
      if (!btn) return;
      reply(btn.dataset.prompt);
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) setOpen(false);
  });
})();
