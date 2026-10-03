
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

const menuToggle = $(".menu-toggle");
const siteNav = $("#siteNav");

menuToggle?.addEventListener("click", () => {
  const open = siteNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
$$(".site-nav a").forEach(a => a.addEventListener("click", () => {
  siteNav.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded","false");
}));

const revealItems = $$(".reveal");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.1});
revealItems.forEach(el => observer.observe(el));

const tabs = $$(".service-tab");
const serviceCards = $$(".service-card");
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const filter = tab.dataset.filter;
    tabs.forEach(t => {
      t.classList.remove("is-active");
      t.setAttribute("aria-selected","false");
    });
    tab.classList.add("is-active");
    tab.setAttribute("aria-selected","true");
    serviceCards.forEach(card => {
      card.classList.toggle("is-hidden", filter !== "all" && card.dataset.category !== filter);
    });
  });
});

const lightbox = $("#lightbox");
const lightboxImage = $("#lightboxImage");
function openLightbox(src){
  lightboxImage.src = src;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
}
function closeLightbox(){
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden","true");
  lightboxImage.src = "";
  document.body.style.overflow = "";
}
$$("[data-lightbox]").forEach(el => {
  el.addEventListener("click", () => openLightbox(el.dataset.lightbox));
});
$(".lightbox-close")?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", e => { if(e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", e => { if(e.key === "Escape") closeLightbox(); });

$("#year").textContent = new Date().getFullYear();

$("#bookingForm")?.addEventListener("submit", e => {
  e.preventDefault();
  const form = new FormData(e.currentTarget);
  const service = form.get("service") || "beauty service";
  const name = form.get("name") || "";
  const when = form.get("when") || "not specified";
  const note = form.get("note") || "No extra details";
  const text = [
    "Hi Pink Beauty Clinic & Salon! 🌸",
    "",
    `My name is ${name}.`,
    `I'd like to enquire about: ${service}.`,
    `Preferred day/time: ${when}.`,
    `Note: ${note}`,
    "",
    "Please share availability and current pricing. Thank you!"
  ].join("\n");
  const url = `https://wa.me/918928863914?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener");
});

$$("img").forEach(img => {
  img.addEventListener("error", () => {
    img.closest("button")?.classList.add("image-error");
  });
});
