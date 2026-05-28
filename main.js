    const root = document.documentElement;
    const themeToggle = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("aditya-theme");
    if (savedTheme) root.dataset.theme = savedTheme;

    themeToggle.addEventListener("click", () => {
      root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
      localStorage.setItem("aditya-theme", root.dataset.theme);
    });

    const menuToggle = document.getElementById("menuToggle");
    const mobilePanel = document.getElementById("mobilePanel");
    const closeMenu = () => {
      document.body.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
      mobilePanel.setAttribute("aria-hidden", "true");
    };

    menuToggle.addEventListener("click", () => {
      const isOpen = document.body.classList.toggle("menu-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      mobilePanel.setAttribute("aria-hidden", String(!isOpen));
    });
    mobilePanel.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

    const navLinks = document.querySelectorAll(".nav__links a");
    const sections = document.querySelectorAll("main section[id]");
    const activeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-44% 0px -48% 0px" });
    sections.forEach((section) => activeObserver.observe(section));

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");

        entry.target.querySelectorAll("[data-count]").forEach((counter) => {
          if (counter.dataset.done) return;
          counter.dataset.done = "true";
          const target = Number(counter.dataset.count);
          const duration = 1200;
          const start = performance.now();
          const tick = (time) => {
            const progress = Math.min((time - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.round(target * eased);
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      });
    }, { threshold: .16 });
    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

    const magneticItems = document.querySelectorAll(".magnetic");
    magneticItems.forEach((item) => {
      item.addEventListener("mousemove", (event) => {
        const rect = item.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        item.style.transform = `translate(${x * .13}px, ${y * .18}px)`;
      });
      item.addEventListener("mouseleave", () => {
        item.style.transform = "";
      });
    });

    const canvas = document.getElementById("fieldCanvas");
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let particles = [];
    let pointer = { x: -9999, y: -9999 };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resizeCanvas() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.min(90, Math.max(34, Math.floor(width / 18)));
      particles = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - .5) * .42,
        vy: (Math.random() - .5) * .42,
        r: index % 7 === 0 ? 2.1 : 1.2,
      }));
    }

    function drawField() {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;

      particles.forEach((p, i) => {
        if (!reducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;
        }

        const dx = pointer.x - p.x;
        const dy = pointer.y - p.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 150 && !reducedMotion) {
          p.x -= dx * .004;
          p.y -= dy * .004;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = i % 5 === 0 ? "rgba(199,255,63,.58)" : "rgba(246,242,233,.28)";
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const gap = Math.hypot(p.x - q.x, p.y - q.y);
          if (gap < 118) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(246,242,233,${(1 - gap / 118) * .12})`;
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(drawField);
    }

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("pointermove", (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    }, { passive: true });
    resizeCanvas();
    drawField();
