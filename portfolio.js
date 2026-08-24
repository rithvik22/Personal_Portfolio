(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#site-nav");

  if (toggle && header && nav) {
    toggle.addEventListener("click", () => {
      const open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        header.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function splitChars(el) {
    const text = el.textContent.trim();
    el.setAttribute("aria-label", text);
    el.textContent = "";
    [...text].forEach((ch) => {
      const mask = document.createElement("span");
      mask.className = "split-mask";
      const span = document.createElement("span");
      span.className = "split-char";
      span.textContent = ch === " " ? "\u00A0" : ch;
      mask.appendChild(span);
      el.appendChild(mask);
    });
  }

  function splitWords(el) {
    const text = el.textContent.trim();
    el.setAttribute("aria-label", text);
    el.textContent = "";
    text.split(/\s+/).forEach((word, i, arr) => {
      const mask = document.createElement("span");
      mask.className = "split-mask";
      const span = document.createElement("span");
      span.className = "split-word";
      span.textContent = word;
      mask.appendChild(span);
      el.appendChild(mask);
      if (i < arr.length - 1) el.appendChild(document.createTextNode(" "));
    });
  }

  document.querySelectorAll('[data-split="chars"]').forEach(splitChars);
  document.querySelectorAll('[data-split="words"]').forEach(splitWords);

  if (reduceMotion || typeof gsap === "undefined") {
    document.body.classList.remove("is-loading");
    const loader = document.querySelector("#loader");
    if (loader) loader.style.display = "none";
    document.querySelectorAll("[data-animate], .timeline-item").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    const frame = document.querySelector(".about-figure-frame");
    const photo = document.querySelector(".about-photo");
    if (frame) frame.style.clipPath = "none";
    if (photo) photo.style.transform = "none";
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const loader = document.querySelector("#loader");
  const loaderProgress = document.querySelector(".loader-progress");
  const loaderCount = document.querySelector("#loader-count");
  const loaderState = { value: 0 };

  const loaderTween = gsap.to(loaderState, {
    value: 100,
    duration: 1.35,
    ease: "power2.inOut",
    onUpdate: () => {
      const v = Math.round(loaderState.value);
      if (loaderProgress) loaderProgress.style.width = `${v}%`;
      if (loaderCount) loaderCount.textContent = String(v);
    },
  });

  let lenis;
  if (typeof Lenis !== "undefined") {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const cursor = document.querySelector("#cursor");
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorRing = document.querySelector(".cursor-ring");
  const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const ring = { x: mouse.x, y: mouse.y };

  if (canHover && cursor && cursorDot && cursorRing) {
    document.body.classList.add("has-cursor");

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      gsap.set(cursorDot, { x: mouse.x, y: mouse.y });
      cursor.classList.add("is-ready");
    });

    gsap.ticker.add(() => {
      ring.x += (mouse.x - ring.x) * 0.18;
      ring.y += (mouse.y - ring.y) * 0.18;
      gsap.set(cursorRing, { x: ring.x, y: ring.y });
    });

    document.querySelectorAll("[data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        const mode = el.getAttribute("data-cursor");
        cursor.classList.add("is-hover");
        if (mode === "btn") cursor.classList.add("is-btn");
        if (mode === "work") cursor.classList.add("is-work");
      });
      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("is-hover", "is-btn", "is-work");
      });
    });
  }

  if (canHover) {
    document.querySelectorAll(".magnetic").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(el, { x: x * 0.35, y: y * 0.35, duration: 0.35, ease: "power3.out" });
        const inner = el.querySelector("span");
        if (inner) {
          gsap.to(inner, { x: x * 0.15, y: y * 0.15, duration: 0.35, ease: "power3.out" });
        }
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1, 0.4)" });
        const inner = el.querySelector("span");
        if (inner) gsap.to(inner, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1, 0.4)" });
      });
    });

    document.querySelectorAll(".tilt").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        gsap.to(card, {
          rotateY: (px - 0.5) * 14,
          rotateX: (0.5 - py) * 14,
          transformPerspective: 800,
          duration: 0.35,
          ease: "power2.out",
        });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" });
      });
    });
  }

  const progressBar = document.querySelector("#scroll-progress");
  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      if (progressBar) progressBar.style.width = `${self.progress * 100}%`;
      if (header) header.classList.toggle("is-scrolled", self.scroll() > 48);
    },
  });

  gsap.to(".orb-a", {
    x: 60,
    y: 40,
    duration: 10,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
  gsap.to(".orb-b", {
    x: -50,
    y: -30,
    duration: 12,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  const track = document.querySelector(".marquee-track");
  if (track) {
    const marqueeTween = gsap.to(track, {
      xPercent: -50,
      duration: 28,
      ease: "none",
      repeat: -1,
    });
    track.addEventListener("mouseenter", () => marqueeTween.timeScale(0.25));
    track.addEventListener("mouseleave", () => marqueeTween.timeScale(1));
  }

  function playIntro() {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    if (loader) {
      tl.to(
        loader,
        {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
          onComplete: () => {
            loader.classList.add("is-done");
            document.body.classList.remove("is-loading");
            loader.remove();
          },
        },
        0
      );
    } else {
      document.body.classList.remove("is-loading");
    }

    tl.from(".hero-photo", { scale: 1.18, duration: 1.8, ease: "power3.out" }, 0.15);
    tl.from(
      ".hero-brand .split-char",
      { yPercent: 120, rotate: 8, opacity: 0, duration: 0.9, stagger: 0.018 },
      0.35
    );
    tl.from(
      ".hero-title .split-word",
      { yPercent: 110, opacity: 0, duration: 0.85, stagger: 0.05 },
      0.55
    );
    tl.from(
      ".hero-kicker, .hero-lead, .hero-actions, .hero-meta, .hero-scroll",
      { y: 30, opacity: 0, duration: 0.8, stagger: 0.08 },
      0.75
    );

    gsap.to(".hero-photo", {
      yPercent: 18,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  loaderTween.then(playIntro);

  gsap.utils.toArray('[data-animate="fade-up"]').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      delay: (i % 4) * 0.05,
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
      },
    });
  });

  document.querySelectorAll('.section-title[data-split="words"]').forEach((el) => {
    gsap.from(el.querySelectorAll(".split-word"), {
      yPercent: 115,
      opacity: 0,
      duration: 0.85,
      stagger: 0.04,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      },
    });
  });

  const aboutFrame = document.querySelector(".about-figure-frame");
  const aboutPhoto = document.querySelector(".about-photo");
  const aboutFig = document.querySelector(".about-figure");

  if (aboutFrame && aboutPhoto) {
    const aboutTl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutFrame,
        start: "top 80%",
      },
    });
    aboutTl.to(aboutFrame, {
      clipPath: "inset(0% 0 0 0)",
      duration: 1.2,
      ease: "power4.inOut",
    });
    aboutTl.to(aboutPhoto, { scale: 1, duration: 1.4, ease: "power3.out" }, 0);
    aboutTl.add(() => {
      if (aboutFig) aboutFig.classList.add("is-on");
    }, 0.15);

    gsap.to(aboutPhoto, {
      yPercent: 10,
      ease: "none",
      scrollTrigger: {
        trigger: ".about",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  document.querySelectorAll('[data-animate="timeline"]').forEach((item) => {
    gsap.to(item, {
      opacity: 1,
      y: 0,
      duration: 0.95,
      ease: "power3.out",
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        onEnter: () => item.classList.add("is-inview"),
      },
    });
  });

  document.querySelectorAll('[data-animate="work"]').forEach((item, i) => {
    gsap.to(item, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      delay: i * 0.05,
      ease: "power3.out",
      scrollTrigger: {
        trigger: item,
        start: "top 88%",
      },
    });
  });

  document.querySelectorAll(".count").forEach((el) => {
    const target = Number(el.dataset.count || 0);
    const prefix = el.dataset.prefix || "";
    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 1.4,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = `${prefix}${Math.round(obj.val)}`;
          },
        });
      },
    });
  });

  const contactTitle = document.querySelector(".contact-title");
  if (contactTitle) {
    gsap.from(contactTitle.querySelectorAll(".split-char"), {
      yPercent: 120,
      opacity: 0,
      duration: 0.7,
      stagger: 0.02,
      ease: "power3.out",
      scrollTrigger: {
        trigger: contactTitle,
        start: "top 85%",
      },
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -20 });
      else target.scrollIntoView({ behavior: "smooth" });
    });
  });
})();
