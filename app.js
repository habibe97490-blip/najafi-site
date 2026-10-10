// Affichage du site à partir de contenu.js — pas besoin de modifier ce fichier.
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fmtDate = (d) => new Date(d + "T12:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  const byDate = (a, b) => b.date.localeCompare(a.date);

  // Position approximative des centres sur la carte (en % de la carte). Les nouveaux centres sans position n'ont pas d'épingle.
  const PIN_POS = { morondava: [30, 55], morombe: [22, 71], tulear: [24, 83] };

  /* ---------- Onglets ---------- */
  const tabs = [{ id: "accueil", label: "L'association" }, ...CENTRES.map((c) => ({ id: c.id, label: c.nom })), { id: "soutenir", label: "Dons & contact" }];
  $("#tabs").innerHTML = tabs.map((t) => `<a href="#${t.id}" data-tab="${t.id}" class="${t.id === "soutenir" ? "tab-cta" : ""}">${esc(t.label)}</a>`).join("");

  /* ---------- Médias ---------- */
  function media(m) {
    if (m.type === "video") return `<video src="${esc(m.src)}" controls preload="metadata" playsinline></video>`;
    if (m.type === "youtube") return `<div class="yt"><iframe src="https://www.youtube-nocookie.com/embed/${esc(m.id)}" title="Vidéo" loading="lazy" allowfullscreen></iframe></div>`;
    return `<img src="${esc(m.src)}" alt="" loading="lazy" data-zoom>`;
  }
  function post(a, centre) {
    const medias = a.medias || [];
    return `<article class="post">
      <div class="post-media ${medias.length > 1 ? "multi" : ""}">${medias.map(media).join("")}</div>
      <div class="post-body">
        <p class="post-meta">${centre ? `<a href="#${centre.id}" class="chip">${centre.icone} ${esc(centre.nom)}</a>` : ""}<time>${fmtDate(a.date)}</time></p>
        <h3>${esc(a.titre)}</h3>
        ${a.texte ? `<p>${esc(a.texte)}</p>` : ""}
      </div>
    </article>`;
  }

  /* ---------- Accueil ---------- */
  const total = CENTRES.reduce((s, c) => s + (c.beneficiaires || 0), 0);
  const oldest = Math.min(...CENTRES.map((c) => c.depuis));
  $("#stats").innerHTML = [
    [`${total}+`, "personnes aidées chaque semaine"],
    [CENTRES.length, CENTRES.length > 1 ? "centres à Madagascar" : "centre à Madagascar"],
    [new Date().getFullYear() - oldest + " ans", "d'action sur le terrain"],
  ].map(([n, l]) => `<div><strong>${n}</strong><span>${l}</span></div>`).join("");

  $("#pins").innerHTML = CENTRES.filter((c) => PIN_POS[c.id]).map((c) => {
    const [x, y] = PIN_POS[c.id];
    return `<a class="pin" href="#${c.id}" style="left:${x}%;top:${y}%"><span>${c.icone}</span>${esc(c.nom)}</a>`;
  }).join("");

  $("#centre-cards").innerHTML = CENTRES.map((c) => `
    <a class="centre-card" href="#${c.id}">
      <span class="ico">${c.icone}</span>
      <span><strong>${esc(c.nom)}</strong><small>Depuis ${c.depuis} · ${c.beneficiaires} bénéficiaires</small></span>
      <span class="arrow">→</span>
    </a>`).join("");

  const all = CENTRES.flatMap((c) => (c.actualites || []).map((a) => ({ ...a, centre: c }))).sort(byDate);
  $("#latest").innerHTML = all.slice(0, 6).map((a) => post(a, a.centre)).join("") || `<p class="muted">Les premières nouvelles arrivent bientôt.</p>`;

  /* ---------- Pages centres ---------- */
  $("#centre-pages").innerHTML = CENTRES.map((c) => {
    const actus = [...(c.actualites || [])].sort(byDate);
    const nbPhotos = actus.flatMap((a) => a.medias || []).filter((m) => m.type === "photo").length;
    const nbVideos = actus.flatMap((a) => a.medias || []).filter((m) => m.type !== "photo").length;
    return `<section id="${c.id}" class="page">
      <div class="centre-hero" style="background-image:url('${esc(c.couverture)}')">
        <div class="centre-hero-inner">
          <p class="eyebrow light">Centre de</p>
          <h1>${c.icone} ${esc(c.nom)}</h1>
          <p>${esc(c.resume)}</p>
        </div>
      </div>
      <div class="stats">
        <div><strong>${c.beneficiaires}</strong><span>bénéficiaires chaque semaine</span></div>
        <div><strong>${c.depuis}</strong><span>année d'ouverture</span></div>
        <div><strong>${nbPhotos} · ${nbVideos}</strong><span>photos · vidéos</span></div>
      </div>
      <div class="wrap">
        <h2>L'évolution du centre</h2>
        <p class="muted">Suivez au fil du temps les distributions et les actions menées à ${esc(c.nom)}.</p>
        <div class="timeline">${actus.map((a) => post(a)).join("") || `<p class="muted">Les premières photos arrivent bientôt.</p>`}</div>
        <div class="cta-band">
          <p><strong>Aidez le centre de ${esc(c.nom)}</strong> à continuer ses distributions.</p>
          <a href="#soutenir" class="btn btn-primary">Faire un don</a>
        </div>
      </div>
    </section>`;
  }).join("");

  /* ---------- Dons & contact ---------- */
  const r = ASSOCIATION.rib;
  $("#rib").innerHTML = [["Titulaire", r.titulaire], ["IBAN", r.iban], ["BIC", r.bic]].map(([k, v]) => `
    <div><dt>${k}</dt><dd><code>${esc(v)}</code>${k !== "Titulaire" ? `<button class="copy" data-copy="${esc(v.replace(/\s/g, ""))}">Copier</button>` : ""}</dd></div>`).join("");

  const online = [["HelloAsso", ASSOCIATION.helloasso], ["PayPal", ASSOCIATION.paypal]].filter(([, u]) => u);
  $("#online-pay").innerHTML = online.length
    ? `<h3>Don en ligne</h3><div class="pay-btns">${online.map(([n, u]) => `<a class="btn btn-ghost" href="${esc(u)}" target="_blank" rel="noopener">${n}</a>`).join("")}</div>`
    : "";

  $("#phones").innerHTML = ASSOCIATION.telephones.map((t) => `
    <li><span>${esc(t.label)}</span><a href="tel:${t.numero.replace(/\s/g, "")}">${esc(t.numero)}</a></li>`).join("")
    + (ASSOCIATION.email ? `<li><span>E-mail</span><a href="mailto:${esc(ASSOCIATION.email)}">${esc(ASSOCIATION.email)}</a></li>` : "");

  $("#contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const txt = `Bonjour Najafi, je suis ${f.get("nom")}.\nSujet : ${f.get("sujet")}\n\n${f.get("message")}`;
    window.open(`https://wa.me/${ASSOCIATION.whatsapp}?text=${encodeURIComponent(txt)}`, "_blank", "noopener");
  });

  document.addEventListener("click", (e) => {
    const b = e.target.closest(".copy");
    if (b) {
      navigator.clipboard?.writeText(b.dataset.copy).then(() => { b.textContent = "Copié ✓"; setTimeout(() => (b.textContent = "Copier"), 1800); });
    }
    const img = e.target.closest("img[data-zoom]");
    if (img) { $("#lightbox img").src = img.src; $("#lightbox").hidden = false; }
  });
  $("#lightbox").addEventListener("click", () => ($("#lightbox").hidden = true));
  document.addEventListener("keydown", (e) => e.key === "Escape" && ($("#lightbox").hidden = true));

  /* ---------- Navigation ---------- */
  const menuBtn = $(".menu-btn");
  menuBtn.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    menuBtn.setAttribute("aria-expanded", open);
  });

  function route() {
    const hash = location.hash.slice(1) || "accueil";
    const target = document.getElementById(hash);
    const page = target ? target.closest(".page") : null;
    const pageId = page ? page.id : "accueil";
    document.querySelectorAll(".page").forEach((p) => p.classList.toggle("active", p.id === pageId));
    document.querySelectorAll("#tabs a").forEach((a) => a.classList.toggle("on", a.dataset.tab === pageId));
    document.body.classList.remove("menu-open");
    if (target && target !== page) target.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo(0, 0);
    document.querySelectorAll("video").forEach((v) => !v.closest(".active") && v.pause());
  }
  window.addEventListener("hashchange", route);
  route();
  $("#year").textContent = new Date().getFullYear();
})();
