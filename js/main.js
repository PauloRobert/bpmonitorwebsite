(() => {
  const mockupFallback = "imagens/smartphone.jpg";

  const initAOS = () => {
    if (window.AOS) {
      AOS.init({
        duration: 900,
        easing: "ease-out-cubic",
        once: true,
        offset: 80
      });
    }
  };

  const initParticles = () => {
    if (!window.particlesJS) {
      return;
    }

    particlesJS("particles-js", {
      particles: {
        number: { value: 48, density: { enable: true, value_area: 900 } },
        color: { value: ["#00D1FF", "#7B2EFF", "#00FFB2"] },
        shape: { type: "circle" },
        opacity: { value: 0.35, random: true },
        size: { value: 2.8, random: true },
        line_linked: {
          enable: true,
          distance: 130,
          color: "#00D1FF",
          opacity: 0.18,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.3,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out"
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true
        },
        modes: {
          grab: { distance: 150, line_linked: { opacity: 0.35 } },
          push: { particles_nb: 3 }
        }
      },
      retina_detect: true
    });
  };

  const initSwipers = () => {
    if (!window.Swiper) {
      return;
    }

    new Swiper(".appSwiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      speed: 900,
      autoplay: {
        delay: 3200,
        disableOnInteraction: false
      },
      pagination: {
        el: ".app-showcase-section .swiper-pagination",
        clickable: true
      }
    });

    new Swiper(".testimonialSwiper", {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      speed: 900,
      autoplay: {
        delay: 4200,
        disableOnInteraction: false
      },
      pagination: {
        el: ".testimonials-section .swiper-pagination",
        clickable: true
      },
      breakpoints: {
        768: {
          slidesPerView: 2
        },
        1200: {
          slidesPerView: 3
        }
      }
    });
  };

  const initNavbar = () => {
    const nav = document.getElementById("mainNav");
    const collapseElement = document.getElementById("navbarContent");

    if (!nav) {
      return;
    }

    const updateNav = () => {
      nav.classList.toggle("scrolled", window.scrollY > 24);
    };

    updateNav();
    window.addEventListener("scroll", updateNav, { passive: true });
  };

  const initRipple = () => {
    document.querySelectorAll(".ripple").forEach((button) => {
      button.addEventListener("click", (event) => {
        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        const rect = button.getBoundingClientRect();

        circle.className = "ripple-wave";
        circle.style.width = `${diameter}px`;
        circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - rect.left}px`;
        circle.style.top = `${event.clientY - rect.top}px`;

        button.querySelector(".ripple-wave")?.remove();
        button.appendChild(circle);
        circle.addEventListener("animationend", () => circle.remove(), { once: true });
      });
    });
  };

  const initSmoothAnchors = () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (event) => {
        const href = anchor.getAttribute("href");
        
        if (!href || href === "#") {
          return;
        }

        const target = document.querySelector(href);
        if (!target) {
          console.warn(`Alvo não encontrado: ${href}`);
          return;
        }

        event.preventDefault();

        // Fechar menu mobile se aberto
        const collapseElement = document.getElementById("navbarContent");
        if (collapseElement && collapseElement.classList.contains("show")) {
          try {
            const bsCollapse = bootstrap.Collapse.getOrCreateInstance(collapseElement);
            bsCollapse.hide();
          } catch (e) {
            console.error("Erro ao fechar menu mobile:", e);
          }
        }

        // Scroll suave para o alvo
        const offset = 100;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      });
    });
  };

  const initParallax = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      return;
    }

    const stage = document.getElementById("heroPhoneStage");
    const parallaxItems = document.querySelectorAll("[data-speed]");

    // Animação do smartphone 3D ao scroll - desabilitada para manter ângulo fixo de 10 graus
    // const phone3dStage = document.querySelector(".phone-3d-stage");
    // if (phone3dStage) {
    //   window.addEventListener("scroll", () => {
    //     const scrollY = window.scrollY;
    //     const rotateAmount = Math.min(scrollY * 0.1, 25);
    //     phone3dStage.style.transform = `rotateX(${12 - rotateAmount * 0.15}deg) rotateY(${-10 + rotateAmount * 0.1}deg) rotateZ(0deg)`;
    //   }, { passive: true });
    // }

    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      parallaxItems.forEach((item) => {
        const speed = Number(item.dataset.speed || 1);
        item.style.transform = `translate3d(0, ${scrollY * 0.045 * speed}px, 0)`;
      });
    }, { passive: true });
  };

  const initGSAPAnimations = () => {
    if (!window.gsap || !window.ScrollTrigger) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".hero-title, .hero-subtitle, .hero-cta", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.16,
      ease: "power3.out"
    });

    gsap.utils.toArray(".feature-card").forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 86%"
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.04,
        ease: "power3.out"
      });
    });

    gsap.to(".orb-a", {
      y: -18,
      x: 12,
      repeat: -1,
      yoyo: true,
      duration: 5,
      ease: "sine.inOut"
    });

    gsap.to(".orb-b", {
      y: 20,
      x: -10,
      repeat: -1,
      yoyo: true,
      duration: 6,
      ease: "sine.inOut"
    });

    gsap.to(".showcase-phone", {
      yPercent: -3,
      duration: 3.4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });
  };

  const init = () => {
    initSmoothAnchors();
    initAOS();
    initParticles();
    initSwipers();
    initNavbar();
    initRipple();
    initParallax();
    initGSAPAnimations();
  };

  // Aguardar DOM estar pronto
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
