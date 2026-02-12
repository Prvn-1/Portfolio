const menuBtn = document.getElementById("menuToggle");
const miniMenu = document.getElementById("miniMenu");

/* TOGGLE MENU */
menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  miniMenu.classList.toggle("show");
});

/* CLOSE ON OUTSIDE CLICK */
document.addEventListener("click", () => {
  miniMenu.classList.remove("show");
});

/* CLOSE ON SCROLL */
window.addEventListener("scroll", () => {
  miniMenu.classList.remove("show");
});



const roles = [
  "Python Developer",
  "Full Stack Developer",
  "Frontend Developer",
  "Web Developer"
];

const typedRole = document.getElementById("typed-role");

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    typedRole.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentRole.length) {
      setTimeout(() => isDeleting = true, 1200);
    }
  } else {
    typedRole.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 50 : 90);
}

typeEffect();






// PROJECT SHOW MORE / LESS - SMART VERSION
const projectBtn = document.getElementById("toggleProjectBtn");
const projectGrid = document.getElementById("projectGrid");

let projectExpanded = false;

projectBtn.addEventListener("click", () => {
  projectExpanded = !projectExpanded;

  if (projectExpanded) {
    projectGrid.classList.add("expanded");
    projectBtn.textContent = "Show Less Projects";
  } else {
    projectGrid.classList.remove("expanded");
    projectBtn.textContent = "Show More Projects";
    
    // Smooth scroll back to projects top when closing so user isn't lost
    projectGrid.scrollIntoView({ behavior: "smooth" });
  }
});



/* ===============================
   CERTIFICATE PREVIEW MODAL
================================ */

function openCert(src) {
  const modal = document.getElementById("certModal");
  const img = document.getElementById("certModalImg");

  if (!modal || !img) return;

  img.src = src;
  modal.style.display = "flex";

  setTimeout(() => {
    modal.classList.add("show");
  }, 10);

  document.body.classList.add("modal-open");
}

function closeCert() {
  const modal = document.getElementById("certModal");

  if (!modal) return;

  modal.classList.remove("show");

  setTimeout(() => {
    modal.style.display = "none";
  }, 300);

  document.body.classList.remove("modal-open");
}



// CERTIFICATION SHOW MORE / LESS - UNIVERSAL FIX
const certBtn = document.getElementById("toggleCertBtn");
const certGrid = document.getElementById("certGrid");
const extraCerts = document.querySelectorAll(".extra-cert");

let certExpanded = false;

certBtn.addEventListener("click", () => {
  certExpanded = !certExpanded;
  
  // Check if we are on Mobile (width less than 768px)
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    // MOBILE LOGIC: Toggle the 'expanded' class for the 2-line rule
    if (certExpanded) {
      certGrid.classList.add("expanded");
      certBtn.textContent = "Show Less Certificates";
      
      const hiddenCerts = certGrid.querySelectorAll(".cert-card:nth-child(n+7)");
      hiddenCerts.forEach((cert, index) => {
        cert.style.animationDelay = `${index * 0.1}s`;
      });
    } else {
      certGrid.classList.remove("expanded");
      certBtn.textContent = "Show More Certificates";
      certGrid.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  } else {
    // WINDOWS/DESKTOP LOGIC: Toggle the 'extra-cert' class
          if (certExpanded) {
          certGrid.classList.add("expanded");
        } else {
          certGrid.classList.remove("expanded");
        }

    
    certBtn.textContent = certExpanded 
      ? "Show Less Certificates" 
      : "Show More Certificates";
      
    if (!certExpanded) {
      certGrid.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
});







function openResume(e) {
  e.preventDefault();
  const modal = document.getElementById("resumeModal");
  const frame = document.getElementById("resumeFrame");

  frame.src = "assets/resume/Praveen-M-Resume.pdf";
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeResume() {
  const modal = document.getElementById("resumeModal");
  const frame = document.getElementById("resumeFrame");

  modal.style.display = "none";
  frame.src = "";
  document.body.style.overflow = "auto";
}




/* ===============================
   FOOTER LIVE DATE & TIME
================================ */

function updateFooterDateTime() {
  const now = new Date();

  // Time (HH:MM)
  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

  // Date (DD Mon YYYY)
  const date = now.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  const liveTimeEl = document.getElementById("liveTime");
  const liveDateEl = document.getElementById("liveDate");
  const yearEl = document.getElementById("year");
  const updatedEl = document.getElementById("lastUpdated");

  if (liveTimeEl) liveTimeEl.textContent = time;
  if (liveDateEl) liveDateEl.textContent = date;
  if (yearEl) yearEl.textContent = now.getFullYear();
  if (updatedEl) updatedEl.textContent = "Today";
}

// Run once on page load
updateFooterDateTime();

// Update every minute
setInterval(updateFooterDateTime, 60000);




/* ===============================
   EXTREME SCROLL ANIMATION ENGINE
================================ */

const reveals = document.querySelectorAll(".reveal");

let lastScrollY = window.scrollY;

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const scrollingDown = window.scrollY > lastScrollY;

      if (entry.isIntersecting && scrollingDown) {
        entry.target.classList.add("active");
      }

      if (!entry.isIntersecting && !scrollingDown) {
        entry.target.classList.remove("active");
      }
    });

    lastScrollY = window.scrollY;
  },
  {
    threshold: 0.25,
    rootMargin: "0px 0px -10% 0px"
  }
);

reveals.forEach(el => observer.observe(el));

/* ===============================
   NAV CLICK – CINEMATIC RESET
================================ */

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    // Smooth scroll
    target.scrollIntoView({ behavior: "smooth" });

    // Reset animations
    reveals.forEach(el => el.classList.remove("active"));

    // Replay after scroll settles
    setTimeout(() => {
      reveals.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.85 && r.bottom > 0) {
          el.classList.add("active");
        }
      });
    }, 700);
  });
});



// PERFECT NAV SCROLL OFFSET
document.querySelectorAll(
  '.nav-links-desktop a, .mini-menu a'
).forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);
    if (!target) return;

    const navHeight = document.querySelector('.topbar').offsetHeight;

    window.scrollTo({
      top: target.offsetTop - navHeight + 10,
      behavior: 'smooth'
    });
  });
});






/* MOBILE MENU AUTO-CLOSE */
// This ensures that when a user clicks a link in your 1-line project or skills grid, 
// the mobile menu slides away immediately.
document.querySelectorAll('#miniMenu a').forEach(link => {
    link.addEventListener('click', () => {
        miniMenu.classList.remove('show');
    });
});





function openIntern(src) {
  const modal = document.getElementById("internModal");
  const preview = document.getElementById("internPreview");

  if (!modal || !preview) return;

  preview.src = src;
  modal.style.display = "flex";

  setTimeout(() => {
    modal.classList.add("show");
  }, 10);

  document.body.classList.add("modal-open");
}

function closeIntern() {
  const modal = document.getElementById("internModal");

  if (!modal) return;

  modal.classList.remove("show");

  setTimeout(() => {
    modal.style.display = "none";
  }, 300);

  document.body.classList.remove("modal-open");
}






const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {

  const aboutSection = document.getElementById("about");
  const hireSection = document.getElementById("hire");

  if (!aboutSection || !hireSection) return;

  const aboutTop = aboutSection.offsetTop;
  const hireTop = hireSection.offsetTop;
  const scrollPosition = window.scrollY;

  if (scrollPosition >= aboutTop - 200) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }

});

/* Scroll to Home properly */
scrollBtn.addEventListener("click", () => {
  const homeSection = document.getElementById("home");

  window.scrollTo({
    top: homeSection.offsetTop - 80,
    behavior: "smooth"
  });
});



document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("contactForm");

  if (form) {
    form.addEventListener("submit", function (e) {

      const confirmSend = confirm(
        "Are you sure you want to send this message?\n\nI will personally review and respond."
      );

      if (!confirmSend) {
        e.preventDefault();
      }

    });
  }

});
