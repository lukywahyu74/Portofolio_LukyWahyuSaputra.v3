document.addEventListener("DOMContentLoaded", () => {
  // AOS Initialization
  if (window.AOS) {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }

  // Lenis Smooth Scroll
  if (window.Lenis) {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // Typing Effect
  const typingText = document.getElementById("typing-text");
  const roles = [
    "Leadership",
    "Operational Management",
    "Public Speaking",
    "Team Work",
  ];

  if (typingText) {
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function type() {
      const currentRole = roles[roleIdx];
      if (isDeleting) {
        typingText.innerText = currentRole.substring(0, charIdx--);
      } else {
        typingText.innerText = currentRole.substring(0, charIdx++);
      }

      let typeSpeed = isDeleting ? 50 : 150;
      if (!isDeleting && charIdx === currentRole.length + 1) {
        isDeleting = true;
        typeSpeed = 2000;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typeSpeed = 500;
      }

      setTimeout(type, typeSpeed);
    }

    type();
  }

  // Scroll Progress Bar
  window.addEventListener("scroll", () => {
    const progressBar = document.getElementById("progress-bar");
    if (!progressBar) return;

    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = height ? (winScroll / height) * 100 : 0;
    progressBar.style.width = `${scrolled}%`;
  });

  // Cursor Glow
  const cursor = document.getElementById("cursor-glow");
  document.addEventListener("mousemove", (e) => {
    if (!cursor) return;
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  // Loading Screen
  const loading = document.getElementById("loading");
  if (loading) {
    // tampilkan minimal ~1.2 detik agar tidak berkedip
    setTimeout(() => {
      loading.style.opacity = "0";
      loading.style.pointerEvents = "none";
      loading.style.transition = "opacity 598ms ease";
      setTimeout(() => {
        loading.style.display = "none";
      }, 450);
    }, 1200);
  }

  // Theme Toggle (dark/light)
  const themeBtn = document.getElementById("theme-toggle");
  const bodyEl = document.body;

  if (themeBtn) {
    const savedTheme = localStorage.getItem("theme") || "dark";
    bodyEl.dataset.theme = savedTheme;

    // Apply initial style
    if (savedTheme === "light") {
      document.body.style.backgroundColor = "#ffffff";
      document.body.style.color = "#0f172a";
    } else {
      document.body.style.backgroundColor = "var(--dark)";
      document.body.style.color = "white";
    }

    themeBtn.addEventListener("click", () => {
      const next = bodyEl.dataset.theme === "light" ? "dark" : "light";
      bodyEl.dataset.theme = next;
      localStorage.setItem("theme", next);

      if (next === "light") {
        document.body.style.backgroundColor = "#ffffff";
        document.body.style.color = "#0f172a";
      } else {
        document.body.style.backgroundColor = "var(--dark)";
        document.body.style.color = "white";
      }
    });
  }

  // Quick Email (from tombol "Mari Terhubung")
  const quickEmailBtn = document.getElementById("quick-email");
  if (quickEmailBtn) {
    quickEmailBtn.addEventListener("click", () => {
      const emailTo = "lukywahyu74@gmail.com";
      const subject = encodeURIComponent("Pesan dari website Portofolio");
      const body = encodeURIComponent(
        "Halo Luky Wahyu Saputra,\n\nSaya ingin menghubungi Anda.\n\nTerima kasih.",
      );
      window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
    });
  }

  // Handle Form Submission -> Email langsung via mailto
  const form = document.getElementById("contactForm");

  const submitBtn = document.getElementById("submitBtn");

  const statusDiv = document.getElementById("formStatus");

  if (form && submitBtn && statusDiv) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Membuka email...';

      const emailTo = "lukywahyu74@gmail.com";
      const subject = encodeURIComponent(
        form.subjek.value || "Pesan dari website Portofolio",
      );
      const body = encodeURIComponent(
        `Halo Luky Wahyu Saputra,\n\n` +
          `Nama: ${form.nama.value}\n` +
          `Email: ${form.email.value}\n\n` +
          `Pesan:\n${form.pesan.value}\n\n` +
          `Terima kasih.`,
      );

      // Kirim langsung via mailto
      window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;

      statusDiv.innerText = "Email sedang dibuat...";
      statusDiv.className =
        "text-center text-sm p-3 rounded-xl bg-sky-500/20 text-sky-300 mt-4 block";
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Kirim Pesan <i class="fas fa-paper-plane"></i>';
      return;
    });
  }
});
