// Affichage du site à partir de contenu.js — pas besoin de modifier ce fichier.
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  // Accepte "2026-10-04", "2026-10" ou "2026"
  const fmtDate = (d) => {
    const s = String(d);
    if (s.length === 4) return s;
    if (s.length === 7) return new Date(s + "-15T12:00:00").toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
    return new Date(s + "T12:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  };
  const url = (p) => esc(encodeURI(p)); // noms de fichiers avec espaces ou accents
  const byDate = (a, b) => b.date.localeCompare(a.date);

  // Position approximative des centres sur la carte (en % de la carte). Les nouveaux centres sans position n'ont pas d'épingle.
  const PIN_POS = { morondava: [18.3, 60.3], morombe: [7, 70.5], tulear: [10.7, 81.6] };

  /* ---------- Onglets ---------- */
  const tabs = [{ id: "accueil", label: "L'association" }, ...CENTRES.map((c) => ({ id: c.id, label: c.nom })), { id: "soutenir", label: "Dons & contact" }];
  $("#tabs").innerHTML = tabs.map((t) => `<a href="#${t.id}" data-tab="${t.id}" class="${t.id === "soutenir" ? "tab-cta" : ""}">${esc(t.label)}</a>`).join("");

  /* ---------- Médias ---------- */
  function media(m) {
    if (m.type === "video") return `<video src="${url(m.src)}" controls preload="metadata" playsinline></video>`;
    if (m.type === "youtube") return `<div class="yt"><iframe src="https://www.youtube-nocookie.com/embed/${esc(m.id)}" title="Vidéo" loading="lazy" allowfullscreen></iframe></div>`;
    return `<img src="${url(m.src)}" alt="" loading="lazy" data-zoom>`;
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

  const articles = typeof ARTICLES !== "undefined" ? [...ARTICLES].sort(byDate) : [];
  $("#articles").innerHTML = articles.map((a) => `
    <article class="article-card">
      <p class="post-meta"><span class="chip">${esc(a.source)}</span><time>${fmtDate(a.date)}</time></p>
      <h3>${esc(a.titre)}</h3>
      <p>${esc(a.resume)}</p>
      <a href="${esc(a.lien)}" target="_blank" rel="noopener">Lire l'article →</a>
    </article>`).join("");
  $("#articles").closest(".wrap").hidden = !articles.length;

  const all = CENTRES.flatMap((c) => (c.actualites || []).map((a) => ({ ...a, centre: c }))).sort(byDate);
  $("#latest").innerHTML = all.slice(0, 6).map((a) => post(a, a.centre)).join("") || `<p class="muted">Les premières nouvelles arrivent bientôt.</p>`;

  /* ---------- Pages centres ---------- */
  $("#centre-pages").innerHTML = CENTRES.map((c) => {
    const actus = [...(c.actualites || [])].sort(byDate);
    const nbPhotos = actus.flatMap((a) => a.medias || []).filter((m) => m.type === "photo").length;
    const nbVideos = actus.flatMap((a) => a.medias || []).filter((m) => m.type !== "photo").length;
    return `<section id="${c.id}" class="page">
      <div class="centre-hero" style="background-image:url('${url(c.couverture).replace(/&#39;/g, "%27")}')">
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
  if (typeof COLIS !== "undefined") {
    const k = COLIS;
    const lienDon = ASSOCIATION.helloasso || "#don";
    const externe = lienDon.startsWith("http") ? ' target="_blank" rel="noopener"' : "";
    $("#colis").innerHTML = `
      <div class="colis">
        <div class="colis-ruban" aria-hidden="true"></div>
        <svg class="colis-noeud" viewBox="0 0 120 60" aria-hidden="true">
          <path d="M60 30 C40 0 6 6 14 26 C20 40 44 36 60 30 Z M60 30 C80 0 114 6 106 26 C100 40 76 36 60 30 Z"/>
          <path d="M56 32 L44 58 L52 55 L58 60 Z M64 32 L76 58 L68 55 L62 60 Z"/>
          <circle cx="60" cy="30" r="7"/>
        </svg>
        <div class="colis-corps">
          <div class="colis-texte">
            <p class="eyebrow light">${esc(k.surtitre)}</p>
            <h2>${esc(k.accroche)}</h2>
            <p>${esc(k.description)}</p>
            <ul class="colis-contenu">${k.contenu.map((c) => `
              <li><span>${c.icone}</span><div><strong>${esc(c.titre)}</strong><small>${esc(c.detail)}</small></div></li>`).join("")}
            </ul>
          </div>
          <div class="colis-prix">
            <p class="colis-cout"><strong>${esc(k.coutMensuel)}</strong><span>${esc(k.coutDetail)}</span></p>
            <ul class="colis-paliers">${k.paliers.map((p) => `
              <li><strong>${esc(p.montant)}</strong><span>${esc(p.effet)}</span></li>`).join("")}
            </ul>
            ${k.note ? `<p class="colis-note">${esc(k.note)}</p>` : ""}
            <a class="btn colis-btn" href="${esc(lienDon)}"${externe}>${esc(k.bouton)}</a>
          </div>
        </div>
      </div>`;
  }

  const r = ASSOCIATION.rib;
  $("#rib").innerHTML = [["Titulaire", r.titulaire], ["IBAN", r.iban], ["BIC", r.bic]].map(([k, v]) => `
    <div><dt>${k}</dt><dd><code>${esc(v)}</code>${k !== "Titulaire" ? `<button class="copy" data-copy="${esc(v.replace(/\s/g, ""))}">Copier</button>` : ""}</dd></div>`).join("");

  const online = [["HelloAsso", ASSOCIATION.helloasso], ["PayPal", ASSOCIATION.paypal]].filter(([, u]) => u);
  $("#online-pay").innerHTML = online.length
    ? `<h3>Don en ligne</h3><div class="pay-btns">${online.map(([n, u]) => `<a class="btn btn-ghost" href="${esc(u)}" target="_blank" rel="noopener">${n}</a>`).join("")}</div>`
    : "";

  $("#phones").innerHTML = ASSOCIATION.telephones.map((t) => `
    <li><span>${esc(t.label)}</span><a href="tel:${t.numero.replace(/\s/g, "")}">${esc(t.numero)}</a></li>`).join("")
    + (ASSOCIATION.email ? `<li><span>E-mail</span><a href="mailto:${esc(ASSOCIATION.email)}">${esc(ASSOCIATION.email)}</a></li>` : "")
    + (ASSOCIATION.youtube ? `<li><span>YouTube</span><a href="${esc(ASSOCIATION.youtube)}" target="_blank" rel="noopener">@NajafiOi</a></li>` : "");
  if (ASSOCIATION.youtube) {
    $("#footer-youtube").innerHTML = `<a href="${esc(ASSOCIATION.youtube)}" target="_blank" rel="noopener">▶ Suivez-nous sur YouTube</a>`;
  }

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
