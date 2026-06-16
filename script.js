/* =========================================================
   Gentle Pressure — script.js
   Vanilla JS. No dependencies.
   ---------------------------------------------------------
   ▶ TO REPLACE IMAGES: every <img> with class "ph" or inside
     a ".point-photo" uses a placeholder URL. Swap the `src`
     (or the `photo` field in the POINTS data below) with your
     own photo / diagram. Broken links fall back to a soft
     labeled panel automatically.
   ========================================================= */

/* ----------------------------------------------------------
   1. CONTENT DATA
---------------------------------------------------------- */

const BENEFITS = [
  { icon: '<path d="M12 21C7 17 3 13 3 8.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 9 2.5C21 13 17 17 12 21z"/>',
    title: "Stress & tension", text: "A slow, steady touch is a classic way to signal your nervous system that it's safe to unwind." },
  { icon: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    title: "Tension headaches", text: "Points around the head, neck, and hands are traditionally used to ease everyday tension and tired eyes." },
  { icon: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>',
    title: "Low energy", text: "Some points are reached for as a gentle pick-me-up when you feel sluggish or foggy." },
  { icon: '<path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z"/><path d="M9 11h2l1-2 1 4 1-2h2"/>',
    title: "Unsettled emotions", text: "Heart and wrist points are a quiet anchor many people turn to when feelings run high or sleep won't come." },
  { icon: '<path d="M4 12c4-6 12-6 16 0-4 6-12 6-16 0z"/><circle cx="12" cy="12" r="2.4"/>',
    title: "A busy mind", text: "A light touch between the brows is a long-loved way to invite a racing, foggy head to settle." },
  { icon: '<path d="M6 20c0-4 3-6 6-6s6 2 6 6"/><circle cx="12" cy="8" r="4"/>',
    title: "Body awareness", text: "Checking in with your own hands builds a kinder, more attentive relationship with your body." },
];

/* Meridian colors chosen to read on light AND dark backgrounds */
const MERIDIANS = [
  { code:"LU", name:"Lung", view:"front", color:"#7FA9C9",
    desc:"Governs breath and the boundary between you and the world. Runs from the chest down the inner arm to the thumb.",
    helps:"Breathing, grief, letting go, the immune surface.",
    path:"M112 80 C118 110,128 140,140 168 C144 174,148 178,150 182", point:[148,178] },
  { code:"LI", name:"Large Intestine", view:"front", color:"#D8A04A",
    desc:"Partner to the Lung. Travels from the index finger up the arm to the face, ending beside the nose.",
    helps:"Letting go, headaches, facial tension, elimination.",
    path:"M150 182 C146 150,138 118,126 92 C118 76,110 62,104 52", point:[150,182] },
  { code:"ST", name:"Stomach", view:"front", color:"#E0B23C",
    desc:"A long, nourishing river down the front of the body and legs. Home of the famous energy point ST36.",
    helps:"Digestion, fatigue, worry, overall vitality.",
    path:"M108 56 C112 90,114 130,113 170 C116 219,118 275,119 350", point:[117,275] },
  { code:"SP", name:"Spleen", view:"front", color:"#D98AA6",
    desc:"Rises up the inside of the leg. Linked to how we transform food and thoughts into usable energy.",
    helps:"Digestion, overthinking, sleep, women's wellbeing.",
    path:"M115 350 C114 300,112 235,110 187 C110 150,110 110,112 86", point:[112,333] },
  { code:"HT", name:"Heart", view:"front", color:"#D9706A",
    desc:"The emperor of the channels. Flows from the chest down the inner arm to the little finger.",
    helps:"Anxiety, restlessness, sleep, emotional calm.",
    path:"M118 84 C126 116,136 146,148 176 C150 180,151 183,152 185", point:[151,183] },
  { code:"PC", name:"Pericardium", view:"front", color:"#C98BC0",
    desc:"The Heart's protector. Runs down the centre of the inner arm to the middle finger — home of the calming PC6.",
    helps:"Nausea, palpitations, anxiety, chest tightness.",
    path:"M115 86 C122 118,132 148,144 174 C146 178,148 181,149 183", point:[140,168] },
  { code:"LV", name:"Liver", view:"front", color:"#8FA85C",
    desc:"Climbs the inner leg and torso. Keeps energy moving smoothly — the great regulator of mood.",
    helps:"Irritability, tension, smooth flow of energy.",
    path:"M114 350 C112 291,109 235,108 191 C108 177,109 162,110 150", point:[109,235] },
  { code:"KI", name:"Kidney", view:"front", color:"#7E84C4",
    desc:"Begins under the foot and rises up the body. The deep well of reserves and resilience.",
    helps:"Fear, fatigue, willpower, deep vitality.",
    path:"M116 354 C115 300,112 235,110 191 C109 150,108 110,108 78", point:[110,324] },
  { code:"CV", name:"Conception Vessel", view:"front", color:"#5FBFC0",
    desc:"A central channel up the front midline. The 'sea of yin' — nurturing, receptive, grounding.",
    helps:"Nourishment, calm, reproductive & core balance.",
    path:"M100 56 C100 100,100 150,100 198", point:[100,140], mid:true },
  { code:"BL", name:"Bladder", view:"back", color:"#5C7FB8",
    desc:"The longest river of all, flowing down the back and legs in two lines beside the spine.",
    helps:"Back tension, stress, sleep, whole-body reset.",
    path:"M106 58 C108 100,108 150,108 191 C109 259,110 316,112 354", point:[108,275] },
  { code:"SI", name:"Small Intestine", view:"back", color:"#E08A4A",
    desc:"Runs from the little finger up the back of the arm to the shoulder blade and face.",
    helps:"Shoulder & neck tension, clarity, sorting things out.",
    path:"M152 184 C148 152,140 120,126 92 C120 80,114 70,108 60", point:[150,180] },
  { code:"GV", name:"Governing Vessel", view:"back", color:"#9B7FC9",
    desc:"The central channel up the spine and over the head. The 'sea of yang' — uplifting and energising. Its DU20 crown point sits at the very top of the head.",
    helps:"Energy, clarity, posture, lifting low moods.",
    path:"M100 54 C100 110,100 158,100 196 M100 54 C96 40,96 22,100 12", point:[100,12], mid:true },
  { code:"GB", name:"Gallbladder", view:"side", color:"#5FA776",
    desc:"Zig-zags down the side of the body. Linked to decisions, courage, and the side-body's freedom.",
    helps:"Side tension, headaches, decisiveness, hips.",
    path:"M120 44 C130 70,122 100,126 140 C128 195,124 267,122 350", point:[124,275] },
  { code:"TB", name:"Triple Burner", view:"side", color:"#56B0AD",
    desc:"Also called San Jiao. Governs the body's three 'heaters' and travels up the outer arm to the temple.",
    helps:"Temperature balance, ears, side-of-head tension.",
    path:"M150 184 C146 150,138 116,128 88 C124 72,122 56,122 46", point:[122,46] },
];

/* Pressure points. `photo` = replaceable placeholder image. */
const POINTS = [
  { code:"Yintang", name:"Third Eye", alt:"Extra point · between the brows",
    photo:"images/points/yintang.webp", dot:{x:150,y:80}, motion:"circle", body:{view:"front",x:100,y:30},
    tags:["calm","headache","sleep","focus"],
    location:"In the small dip right between your eyebrows, where a 'third eye' would sit.",
    helps:"Quietens a busy mind, soothes frontal headaches, eases anxiety, and invites sleep.",
    how:"Rest your <strong>middle fingertip</strong> on the spot and make <strong>slow, tiny circles</strong> for 30–60 seconds. Or simply hold steady pressure and breathe out long and slow.",
    breath:"Inhale for 4, exhale for 6. Let your forehead soften with each out-breath.",
    caution:"" },
  { code:"DU20", name:"Hundred Meetings", alt:"Governing Vessel 20 · Baihui",
    photo:"images/points/du20.webp", dot:{x:150,y:80}, motion:"tap", body:{view:"front",x:100,y:11},
    tags:["energy","focus","calm","headache"],
    location:"At the very top of your head, on the midline — roughly where a line between your ear tips would cross.",
    helps:"Lifts low energy and foggy thinking, yet paradoxically calms; good for headaches and feeling 'scattered'.",
    how:"Use your <strong>fingertips</strong> to tap lightly 10–15 times, then hold gentle pressure for 30 seconds.",
    breath:"Breathe normally and imagine the top of your head softening and opening.",
    caution:"" },
  { code:"LI4", name:"Joining Valley", alt:"Large Intestine 4 · Hegu",
    photo:"images/points/li4.webp", dot:{x:150,y:80}, motion:"pinch", body:{view:"front",x:146,y:185},
    tags:["headache","pain","tension","calm"],
    location:"On the back of the hand, in the fleshy mound between thumb and index finger. Squeeze them together and press the highest point of the muscle.",
    helps:"A go-to for headaches, neck and jaw tension, and general aches. Wonderfully grounding.",
    how:"Pinch the web with your opposite <strong>thumb and index finger</strong>. Press firmly and hold, or make small circles, for <strong>30–60 seconds</strong>. Repeat on the other hand.",
    breath:"Slow breaths throughout; exhale as you increase the pressure a little.",
    caution:"Avoid during pregnancy — this point is traditionally said to encourage labour." },
  { code:"PC6", name:"Inner Gate", alt:"Pericardium 6 · Neiguan",
    photo:"images/points/pc6.webp", dot:{x:150,y:80}, motion:"circle", body:{view:"front",x:58,y:158},
    tags:["nausea","anxiety","calm","sleep"],
    location:"On the inner forearm, about three finger-widths up from the wrist crease, in the dip between the two tendons.",
    helps:"Famous for calming nausea and motion sickness, and for soothing anxiety and a racing heart.",
    how:"Press with your <strong>thumb</strong> and hold steady, or make small circles, for <strong>1–2 minutes</strong> per arm.",
    breath:"Long, even breaths. This is a lovely point to pair with a slow 4-7-8 breath.",
    caution:"" },
  { code:"ST36", name:"Leg Three Miles", alt:"Stomach 36 · Zusanli",
    photo:"images/points/st36.webp", dot:{x:150,y:80}, motion:"circle", body:{view:"front",x:82,y:275},
    tags:["energy","digestion","fatigue","immune"],
    location:"Four finger-widths below the kneecap, then one finger-width to the outside of the shinbone. You may feel a slight tenderness when you've found it.",
    helps:"The classic energy and stamina point — said to let you 'walk three more miles'. Supports digestion and resilience.",
    how:"Press firmly with your <strong>thumb</strong> and rub in <strong>small circles for 1–2 minutes</strong> on each leg. A daily favourite.",
    breath:"Steady belly breaths; feel the support travel down into your legs.",
    caution:"" },
  { code:"SP6", name:"Three Yin Crossing", alt:"Spleen 6 · Sanyinjiao",
    photo:"images/points/sp6.webp", dot:{x:150,y:80}, motion:"circle", body:{view:"front",x:113,y:333},
    tags:["sleep","digestion","calm"],
    location:"Four finger-widths above the inner ankle bone, just behind the edge of the shinbone.",
    helps:"Supports restful sleep, calm digestion, and overall balance; a key point for women's wellbeing.",
    how:"Press with your <strong>thumb</strong> using moderate pressure and small circles for <strong>1 minute</strong> per leg, ideally in the evening.",
    breath:"Soft, slow breathing — picture tension draining out through your feet.",
    caution:"Avoid during pregnancy — traditionally a labour-encouraging point." },
  { code:"HT7", name:"Spirit Gate", alt:"Heart 7 · Shenmen",
    photo:"images/points/ht7.webp", dot:{x:150,y:80}, motion:"hold", body:{view:"front",x:53,y:181},
    tags:["anxiety","sleep","calm","emotions"],
    location:"On the wrist crease, on the little-finger side, in the small hollow just inside the wrist bone.",
    helps:"A gentle gate for the spirit — eases anxiety, calms the heart, and welcomes sleep.",
    how:"Press lightly with your <strong>thumb</strong> and hold, or make tiny circles, for <strong>30–60 seconds</strong> per wrist. Keep it soft here.",
    breath:"Hand on heart on the other side if you like; breathe slowly and kindly.",
    caution:"" },
  { code:"GB20", name:"Wind Pool", alt:"Gallbladder 20 · Fengchi",
    photo:"images/points/gb20.webp", dot:{x:150,y:80}, motion:"pressIn", arrow:{angle:-60}, body:{view:"back",x:100,y:50},
    tags:["headache","tension","neck"],
    location:"At the base of the skull, in the two hollows either side of the spine where the neck muscles meet the head.",
    helps:"Melts neck and shoulder tension and is excellent for tension headaches and tired eyes.",
    how:"Cradle your head and press up and in with both <strong>thumbs</strong>, holding or circling for <strong>1 minute</strong>.",
    breath:"Let your head feel heavy in your hands; long exhales.",
    caution:"" },
];

const FACIAL_STEPS = [
  { title:"Warm your hands", detail:"Rub your palms together for a few seconds until they feel warm. Smile — it relaxes the whole face." },
  { title:"Start at the centre", detail:"Place your fingertips between your eyebrows. Press lightly 10 times, breathing slowly." },
  { title:"Glide along the brows", detail:"Sweep outward along your eyebrows toward the temples. Pause and make 5 small circles at each temple." },
  { title:"Under the eyes", detail:"Using your ring fingers (the lightest touch), glide gently from the inner eye outward to the temples. Repeat 5 times. Never drag the delicate eye skin." },
  { title:"Cheeks outward", detail:"From beside the nose, sweep across the cheeks toward the ears with flat fingers. Repeat 5–10 times." },
  { title:"Jaw and chin", detail:"From the centre of the chin, glide along the jawline up to just below the ears. Repeat 5 times each side." },
  { title:"Down the neck", detail:"This is the drainage step. Gently stroke downward from behind the ears down the sides of the neck to the collarbones. Repeat 10 times — always finish here." },
  { title:"Rest", detail:"Cup your hands over your face, take three slow breaths, and notice the warmth and softness you've created." },
];

const ROUTINES = [
  { key:"morning", label:"Morning Wake-Up", color:"#E0B23C", meta:"≈ 5 minutes · gently energising",
    steps:[
      { name:"Settle & breathe", detail:"Sit tall. Three slow breaths to arrive.", sec:30 },
      { name:"Crown taps — DU20", detail:"Tap the top of your head lightly to wake the mind.", sec:40 },
      { name:"Energy point — ST36", detail:"Circle below each knee to switch on stamina.", sec:60 },
      { name:"Hand revival — LI4", detail:"Press the web of each hand to clear the head.", sec:60 },
      { name:"Ear & face rub", detail:"Briskly rub ears and cheeks until warm.", sec:40 },
      { name:"Stand & stretch", detail:"Reach up, exhale down. Ready for the day.", sec:30 },
    ]},
  { key:"evening", label:"Evening Wind-Down", color:"#7E84C4", meta:"≈ 6 minutes · for calm & sleep",
    steps:[
      { name:"Dim & soften", detail:"Lower the lights. Long exhales to begin.", sec:40 },
      { name:"Third eye — Yintang", detail:"Slow circles between the brows.", sec:60 },
      { name:"Spirit gate — HT7", detail:"Gentle hold at each wrist crease.", sec:60 },
      { name:"Sleep point — SP6", detail:"Soft circles above each inner ankle.", sec:80 },
      { name:"Inner gate — PC6", detail:"Calm the chest with steady thumb pressure.", sec:60 },
      { name:"Hands on heart", detail:"Rest, breathe, and let the day go.", sec:40 },
    ]},
  { key:"headache", label:"Headache Relief", color:"#D9706A", meta:"≈ 4 minutes · ease the pressure",
    steps:[
      { name:"Soften the jaw", detail:"Unclench. Slow breath in and out.", sec:30 },
      { name:"Joining valley — LI4", detail:"Firm pressure on each hand web.", sec:60 },
      { name:"Wind pool — GB20", detail:"Press up into the base of the skull.", sec:60 },
      { name:"Third eye — Yintang", detail:"Light circles between the brows.", sec:45 },
      { name:"Temple circles", detail:"Tiny circles at both temples.", sec:35 },
    ]},
  { key:"anxiety", label:"Anxiety & Stress", color:"#5FBFC0", meta:"≈ 5 minutes · find the ground",
    steps:[
      { name:"Feel your feet", detail:"Press feet to the floor. Long exhale.", sec:40 },
      { name:"Inner gate — PC6", detail:"Steady thumb hold on each forearm.", sec:70 },
      { name:"Spirit gate — HT7", detail:"Soft pressure at the wrist, heart side.", sec:60 },
      { name:"Third eye — Yintang", detail:"Slow circles to quiet the mind.", sec:60 },
      { name:"Box breathing", detail:"In 4 · hold 4 · out 4 · hold 4. Repeat.", sec:50 },
    ]},
  { key:"energy", label:"Energy Boost", color:"#5FA776", meta:"≈ 3 minutes · a quick lift",
    steps:[
      { name:"Stand & shake", detail:"Shake out hands and arms for a moment.", sec:25 },
      { name:"Crown taps — DU20", detail:"Brisk light taps at the top of the head.", sec:35 },
      { name:"Three miles — ST36", detail:"Vigorous circles below each knee.", sec:60 },
      { name:"Kidney rub", detail:"Rub your lower back briskly until warm.", sec:40 },
    ]},
];

const TIPS = [
  { title:"Breathe slowly", text:"Your breath is the volume dial. Inhale through the nose, exhale a little longer through the mouth, and press on the out-breath." },
  { title:"Firm, never painful", text:"Aim for a 'good ache' — pressure you'd rate about 4 or 5 out of 10. If it's sharp or makes you wince, ease right off." },
  { title:"Little and often", text:"Two minutes daily beats twenty minutes once a month. A point at your desk or in bed is perfect." },
  { title:"Both sides", text:"Most points sit on both sides of the body. Treat the matching point on the other side to keep things balanced." },
  { title:"Hydrate after", text:"A glass of water afterward helps you feel clear and refreshed, and is a kind little ritual to close." },
  { title:"When to skip", text:"Avoid pressing on broken skin, rashes, varicose veins, or recent injuries — and check with a professional if pregnant or unwell." },
];

/* ----------------------------------------------------------
   2. RENDER HELPERS
---------------------------------------------------------- */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };

/* Graceful image fallback */
function attachFallback(img, label) {
  img.addEventListener("error", () => {
    const wrap = img.parentElement;
    img.style.display = "none";
    const overlay = wrap.querySelector(".point-overlay");
    if (overlay) overlay.style.display = "none";
    if (wrap.querySelector(".img-failed")) return;
    const f = el("div", "img-failed");
    f.textContent = label || img.alt || "Image";
    f.style.cssText = "position:absolute;inset:0;display:grid;place-items:center;text-align:center;padding:1rem;font-size:.85rem;color:var(--muted);background:linear-gradient(135deg,var(--surface-2),color-mix(in srgb,var(--jade) 18%,var(--surface)));";
    wrap.style.position = wrap.style.position || "relative";
    wrap.appendChild(f);
  });
}

/* ---- Benefits ---- */
function renderBenefits() {
  const g = $("#benefitsGrid");
  BENEFITS.forEach(b => {
    g.appendChild(el("article", "benefit reveal",
      `<div class="benefit-icon"><svg viewBox="0 0 24 24" width="24" height="24">${b.icon}</svg></div>
       <h3>${b.title}</h3><p>${b.text}</p>`));
  });
}

/* ---- Tips ---- */
function renderTips() {
  const g = $("#tipsGrid");
  TIPS.forEach((t, i) => {
    g.appendChild(el("article", "tip reveal",
      `<div class="tip-num">${String(i + 1).padStart(2, "0")}</div>
       <h3>${t.title}</h3><p>${t.text}</p>`));
  });
}

/* ---- Point location + massage-motion overlay ----
   Drawn over each point's base image. Coordinates live in a 0..300 x 0..200
   (3:2) viewBox with preserveAspectRatio "slice", so the overlay crops in
   lockstep with the image's object-fit:cover and the dot stays put at any size. */
function stripTags(s) { return String(s || "").replace(/<[^>]*>/g, ""); }
function overlayAlt(p) { return `${p.name} (${p.code}) — ${stripTags(p.location)}`; }

function motionGlyph(p, mid) {
  const x = p.dot.x, y = p.dot.y, head = `marker-end="url(#${mid})"`;
  const pt = (ang, r) => [x + Math.cos(ang) * r, y + Math.sin(ang) * r].map(n => n.toFixed(1));
  switch (p.motion) {
    case "hold":   // steady pressure — concentric ripples, no arrowhead
      return [16, 24, 32].map(r => `<circle class="po-ripple" cx="${x}" cy="${y}" r="${r}"/>`).join("");
    case "tap":    // light taps — short arrows pressing inward from above
      return [-26, -9, 9, 26].map(dx =>
        `<path class="po-arrow" d="M${x + dx} ${y - 42} L${x + dx} ${y - 20}" ${head}/>`).join("");
    case "pinch":  // pinch — two arrows converging on the point
      return `<path class="po-arrow" d="M${x - 48} ${y} L${x - 15} ${y}" ${head}/>`
           + `<path class="po-arrow" d="M${x + 48} ${y} L${x + 15} ${y}" ${head}/>`;
    case "pressIn": { // press in a direction (default up) — one short arrow
      const a = ((p.arrow && p.arrow.angle != null) ? p.arrow.angle : -90) * Math.PI / 180;
      const [x0, y0] = pt(a, 44), [x1, y1] = pt(a, 15);
      return `<path class="po-arrow" d="M${x0} ${y0} L${x1} ${y1}" ${head}/>`;
    }
    case "circle":
    default: {     // small circles — a near-closed circular arrow around the point
      const r = 27, [sx, sy] = pt(150 * Math.PI / 180, r), [ex, ey] = pt(60 * Math.PI / 180, r);
      return `<path class="po-arrow" d="M${sx} ${sy} A${r} ${r} 0 1 1 ${ex} ${ey}" ${head}/>`;
    }
  }
}

function buildOverlay(p) {
  if (!p.dot) return "";
  const mid = `arrowhead-${p.code}`;
  return `<svg class="point-overlay" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        <defs><marker id="${mid}" markerWidth="7" markerHeight="7" refX="5" refY="3.2" orient="auto"><path class="po-arrowhead" d="M0 0 L6 3.2 L0 6 Z"/></marker></defs>
        ${motionGlyph(p, mid)}
        <circle class="po-dot-ring" cx="${p.dot.x}" cy="${p.dot.y}" r="13"/>
        <circle class="po-dot-core" cx="${p.dot.x}" cy="${p.dot.y}" r="5"/>
      </svg>`;
}

/* ---- Pressure point cards ---- */
function renderPoints() {
  const g = $("#pointsGrid");
  POINTS.forEach(p => {
    const card = el("article", "point-card reveal");
    card.dataset.code = p.code;
    card.dataset.search = (p.code + " " + p.name + " " + p.alt + " " + p.tags.join(" ") + " " + p.helps).toLowerCase();
    card.innerHTML = `
      <div class="point-photo" data-caption="${p.code} · ${p.name} — ${p.alt}">
        <span class="point-code">${p.code}</span>
        <img src="${p.photo}" alt="${overlayAlt(p)}" loading="lazy" />
        ${buildOverlay(p)}
      </div>
      <div class="point-body">
        <h3 class="point-name">${p.name}<span>${p.alt}</span></h3>
        <div class="point-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
        <div class="point-row"><span class="lbl">Where</span><span class="val">${p.location}</span></div>
        <div class="point-row"><span class="lbl">Helps</span><span class="val">${p.helps}</span></div>
        <div class="point-how"><strong>How:</strong> ${p.how}<br><strong>Breathe:</strong> ${p.breath}</div>
        ${p.caution ? `<div class="point-caution"><svg viewBox="0 0 24 24" width="18" height="18"><path d="M12 3 22 20H2L12 3z"/><line x1="12" y1="10" x2="12" y2="14"/><circle cx="12" cy="17" r="0.6" fill="currentColor"/></svg><span>${p.caution}</span></div>` : ""}
      </div>`;
    g.appendChild(card);
    attachFallback(card.querySelector("img"), `${p.code} · ${p.name}\n(add your photo)`);
  });
}

/* ---- "Find it on your body" point-finder map ----
   Reuses the BODY_SILHOUETTE; each point's body:{view,x,y} places a marker.
   Tap/Enter a marker -> scroll to and flash that point's card. */
function renderFinder() {
  const host = $("#pointFinder");
  if (!host) return;
  host.innerHTML = `
    <div class="finder-head">
      <h3>Find it on your body</h3>
      <div class="view-switch" id="finderSwitch" role="tablist" aria-label="Body view">
        <button class="view-btn is-active" data-fview="front" role="tab" aria-selected="true">Front</button>
        <button class="view-btn" data-fview="back" role="tab" aria-selected="false">Back</button>
      </div>
    </div>
    <div class="finder-stage" id="finderStage"></div>
    <p class="finder-cap">Tap a marked point to jump to its card.</p>`;
  drawFinder("front");
  $$("#finderSwitch .view-btn").forEach(b => b.addEventListener("click", () => {
    $$("#finderSwitch .view-btn").forEach(x => { x.classList.remove("is-active"); x.setAttribute("aria-selected", "false"); });
    b.classList.add("is-active"); b.setAttribute("aria-selected", "true");
    drawFinder(b.dataset.fview);
  }));
}

function drawFinder(view) {
  const stage = $("#finderStage");
  const pts = POINTS.filter(p => p.body && p.body.view === view);
  const markers = pts.map(p => {
    const b = p.body, left = b.x < 100, lx = left ? b.x - 9 : b.x + 9;
    return `<g class="finder-pt" data-code="${p.code}" tabindex="0" role="button"
              aria-label="Find ${p.name} (${p.code}), ${stripTags(p.location)}">
        <circle class="finder-halo" cx="${b.x}" cy="${b.y}" r="10"/>
        <circle class="finder-dot" cx="${b.x}" cy="${b.y}" r="4.5"/>
        <text class="finder-lbl" x="${lx}" y="${b.y + 3.4}" text-anchor="${left ? "end" : "start"}">${p.code}</text>
      </g>`;
  }).join("");
  stage.innerHTML = `
    <svg viewBox="0 0 200 392" role="img" aria-label="${view === "back" ? "Back" : "Front"} of the body with pressure points marked">
      ${BODY_SILHOUETTE}
      ${markers}
    </svg>`;
  $$(".finder-pt", stage).forEach(node => {
    const code = node.dataset.code;
    node.addEventListener("click", () => locatePoint(code));
    node.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); locatePoint(code); } });
  });
}

function locatePoint(code) {
  const card = $(`.point-card[data-code="${code}"]`);
  if (!card) return;
  const search = $("#pointSearch");
  if (search && search.value) { search.value = ""; search.dispatchEvent(new Event("input")); }
  card.scrollIntoView({ behavior: "smooth", block: "center" });
  card.classList.remove("is-located");
  void card.offsetWidth;            // restart the highlight if the same point is re-tapped
  card.classList.add("is-located");
  setTimeout(() => card.classList.remove("is-located"), 2400);
}

/* ---- Point search ---- */
function initSearch() {
  const input = $("#pointSearch"), cards = $$(".point-card"), empty = $("#searchEmpty");
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    let shown = 0;
    cards.forEach(c => {
      const match = !q || c.dataset.search.includes(q);
      c.style.display = match ? "" : "none";
      if (match) shown++;
    });
    empty.hidden = shown !== 0;
  });
}

/* ----------------------------------------------------------
   3. MERIDIAN BODY MAP (SVG)
---------------------------------------------------------- */
const BODY_SILHOUETTE = `
  <circle class="body-outline" cx="100" cy="32" r="22"/>
  <line class="body-outline" x1="100" y1="50" x2="100" y2="66" stroke-width="20" stroke-linecap="round" fill="none"/>
  <line class="body-outline" x1="100" y1="66" x2="100" y2="170" stroke-width="58" stroke-linecap="round" fill="none"/>
  <line class="body-outline" x1="78" y1="74" x2="52" y2="180" stroke-width="20" stroke-linecap="round" fill="none"/>
  <line class="body-outline" x1="122" y1="74" x2="148" y2="180" stroke-width="20" stroke-linecap="round" fill="none"/>
  <line class="body-outline" x1="88" y1="172" x2="82" y2="356" stroke-width="26" stroke-linecap="round" fill="none"/>
  <line class="body-outline" x1="112" y1="172" x2="118" y2="356" stroke-width="26" stroke-linecap="round" fill="none"/>
`;

function buildBody(view) {
  const stage = $("#bodyStage");
  const lines = MERIDIANS.filter(m => m.view === view);
  const labelMap = { front: "Front", back: "Back", side: "Side" };
  // One channel = a path + its key-point dot. Bilateral channels are mirrored
  // across the midline (x=100) so they appear on both sides; CV/GV (mid) stay single.
  const channel = m => `<path class="body-path" data-code="${m.code}" d="${m.path}" fill="none"
        stroke="${m.color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><title>${m.name} (${m.code})</title></path>
      <circle class="body-point" data-code="${m.code}" cx="${m.point[0]}" cy="${m.point[1]}" r="5"
        fill="${m.color}"><title>${m.name} key point</title></circle>`;
  let groups = "";
  lines.forEach(m => {
    groups += `<g data-code="${m.code}">${channel(m)}</g>`;
    if (!m.mid) groups += `<g data-code="${m.code}" transform="translate(200,0) scale(-1,1)">${channel(m)}</g>`;
  });
  stage.innerHTML = `
    <svg viewBox="0 0 200 392" role="img" aria-label="${labelMap[view]} view meridian chart">
      ${BODY_SILHOUETTE}
      ${groups}
      <text x="100" y="380" text-anchor="middle" font-size="11" class="svg-cap"
            letter-spacing="2">${labelMap[view].toUpperCase()}</text>
    </svg>`;
  $$(".body-path, .body-point", stage).forEach(node => {
    node.addEventListener("click", () => selectMeridian(node.dataset.code));
  });
}

function renderMeridianList() {
  const list = $("#meridianList");
  MERIDIANS.forEach(m => {
    const li = el("li");
    li.innerHTML = `<button data-code="${m.code}"><span class="swatch" style="background:${m.color}"></span>${m.name}</button>`;
    li.querySelector("button").addEventListener("click", () => selectMeridian(m.code));
    list.appendChild(li);
  });
}

let currentView = "front";
function setView(view, { keepSelection = false } = {}) {
  currentView = view;
  $$(".view-btn").forEach(b => {
    const on = b.dataset.view === view;
    b.classList.toggle("is-active", on);
    b.setAttribute("aria-selected", on);
  });
  buildBody(view);
  if (!keepSelection) clearMeridianHighlight();
}

function clearMeridianHighlight() {
  $$(".body-path, .body-point").forEach(n => n.classList.remove("lit"));
  $$("#meridianList button").forEach(b => b.classList.remove("is-active"));
}

function selectMeridian(code) {
  const m = MERIDIANS.find(x => x.code === code);
  if (!m) return;
  if (m.view !== currentView) setView(m.view, { keepSelection: true });

  $$(".body-path, .body-point").forEach(n => n.classList.toggle("lit", n.dataset.code === code));
  $$("#meridianList button").forEach(b => b.classList.toggle("is-active", b.dataset.code === code));

  $("#meridianDetail").innerHTML = `
    <h3>${m.name}</h3>
    <p class="md-el">Channel ${m.code} · ${m.view} view</p>
    <p>${m.desc}</p>
    <p class="md-helps">Good for: ${m.helps}</p>`;
}

function initMeridians() {
  renderMeridianList();
  setView("front");
  $$(".view-btn").forEach(b => b.addEventListener("click", () => setView(b.dataset.view)));
}

/* ----------------------------------------------------------
   4. FACIAL DIAGRAM + STEPS
---------------------------------------------------------- */
function renderFacial() {
  $("#facialStage").innerHTML = `
    <svg viewBox="0 0 240 280" role="img" aria-label="Facial lymph massage direction diagram">
      <defs>
        <marker id="arrowhead" markerWidth="7" markerHeight="7" refX="5" refY="3.2" orient="auto">
          <path class="arrow-head" d="M0 0 L6 3.2 L0 6 Z"/>
        </marker>
      </defs>
      <!-- face -->
      <ellipse class="face-fill" cx="120" cy="120" rx="70" ry="86"/>
      <path class="face-line" d="M120 70 v60" />
      <ellipse class="face-line" cx="92" cy="108" rx="11" ry="7"/>
      <ellipse class="face-line" cx="148" cy="108" rx="11" ry="7"/>
      <path class="face-line" d="M104 150 q16 12 32 0" />
      <!-- neck -->
      <path class="face-line" d="M96 200 q24 30 48 0" />
      <!-- directional arrows -->
      <path class="face-arrow" d="M120 92 q-30 2 -44 8" />
      <path class="face-arrow" d="M120 92 q30 2 44 8" />
      <path class="face-arrow" d="M104 128 q-30 6 -44 18" />
      <path class="face-arrow" d="M136 128 q30 6 44 18" />
      <path class="face-arrow" d="M118 168 q-26 14 -42 30" />
      <path class="face-arrow" d="M122 168 q26 14 42 30" />
      <path class="face-arrow" d="M72 200 q-6 26 -8 48" />
      <path class="face-arrow" d="M168 200 q6 26 8 48" />
      <!-- drainage nodes -->
      <circle class="face-node" cx="62" cy="250" r="4"/>
      <circle class="face-node" cx="178" cy="250" r="4"/>
      <text x="120" y="270" text-anchor="middle" font-size="10" class="svg-cap">drains to neck &amp; collarbones</text>
    </svg>`;

  const ol = $("#facialSteps");
  FACIAL_STEPS.forEach(s => {
    ol.appendChild(el("li", "reveal", `<h4>${s.title}</h4><p>${s.detail}</p>`));
  });
}

/* ----------------------------------------------------------
   5. ROUTINE PLAYER (timer + breathing ring)
---------------------------------------------------------- */
const RING_R = 90;
const RING_C = 2 * Math.PI * RING_R;

/* Breathing pattern that drives the orb — matches the live cadence (~4s in / 4s out),
   now an explicit, labeled pacer. A hold would be {label:"Hold", sec, scale:<same as prior>}. */
const BREATH = [
  { label: "Breathe in",  sec: 4, scale: 1.06 },
  { label: "Breathe out", sec: 4, scale: 0.90 },
];

const player = {
  routine: ROUTINES[0],
  stepIndex: 0,
  remaining: 0,
  running: false,
  timer: null,
  breathIndex: 0,
  breathRemaining: 0,
};

function renderRoutineTabs() {
  const tabs = $("#routineTabs");
  ROUTINES.forEach((r, i) => {
    const b = el("button", "routine-tab" + (i === 0 ? " is-active" : ""),
      `<span class="dot" style="background:${r.color}"></span>${r.label}`);
    b.dataset.key = r.key;
    b.setAttribute("role", "tab");
    b.addEventListener("click", () => loadRoutine(r.key));
    tabs.appendChild(b);
  });
}

function loadRoutine(key) {
  stopTimer();
  player.routine = ROUTINES.find(r => r.key === key) || ROUTINES[0];
  player.stepIndex = 0;
  player.running = false;
  player.remaining = player.routine.steps[0].sec;
  player.breathIndex = 0;
  player.breathRemaining = 0;
  $$(".routine-tab").forEach(t => t.classList.toggle("is-active", t.dataset.key === key));
  drawPlayer();
}

function drawPlayer() {
  const r = player.routine;
  const stepsHtml = r.steps.map((s, i) =>
    `<li data-i="${i}"><span class="rstep-time">${fmt(s.sec)}</span>
       <p class="rstep-name">${s.name}</p><p class="rstep-detail">${s.detail}</p></li>`).join("");

  $("#routinePlayer").innerHTML = `
    <div class="player-stage">
      <h3 class="routine-title" style="color:${r.color}">${r.label}</h3>
      <p class="routine-meta">${r.meta}</p>
      <div class="breath-ring">
        <svg viewBox="0 0 200 200">
          <circle class="ring-track" cx="100" cy="100" r="${RING_R}"/>
          <circle class="ring-prog" id="ringProg" cx="100" cy="100" r="${RING_R}"
            stroke="${r.color}" stroke-dasharray="${RING_C}" stroke-dashoffset="${RING_C}"/>
        </svg>
        <div class="breath-orb" id="breathOrb">
          <div>
            <div class="orb-label" id="orbLabel">ready when you are</div>
            <div class="orb-count" id="orbCount"></div>
          </div>
        </div>
      </div>
      <div class="player-controls">
        <button class="ctrl-btn" id="resetBtn" aria-label="Restart"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 5V2L7 6l5 4V7a5 5 0 1 1-5 5H5a7 7 0 1 0 7-7z"/></svg></button>
        <button class="ctrl-btn primary" id="playBtn" aria-label="Start"><svg viewBox="0 0 24 24" width="26" height="26"><path d="M8 5v14l11-7z"/></svg></button>
        <button class="ctrl-btn" id="skipBtn" aria-label="Next step"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M6 5v14l9-7zM16 5h2v14h-2z"/></svg></button>
      </div>
      <p class="step-status" id="stepStatus"></p>
    </div>
    <ol class="routine-steps" id="routineSteps">${stepsHtml}</ol>`;

  $("#playBtn").addEventListener("click", toggleTimer);
  $("#resetBtn").addEventListener("click", () => loadRoutine(player.routine.key));
  $("#skipBtn").addEventListener("click", skipStep);
  highlightStep();
  updateStepStatus();
}

function fmt(s) { const m = Math.floor(s / 60), x = s % 60; return m ? `${m}:${String(x).padStart(2, "0")}` : `${x}s`; }

function highlightStep() {
  $$("#routineSteps li").forEach((li, i) => {
    li.classList.toggle("current", i === player.stepIndex);
    li.classList.toggle("done", i < player.stepIndex);
  });
}

function updateStepStatus() {
  const el2 = $("#stepStatus");
  if (!el2) return;
  el2.textContent = `Step ${player.stepIndex + 1} of ${player.routine.steps.length} · ${fmt(player.remaining)} left`;
}

/* Breathing pacer: drives the orb scale, the ring fill, the word cue and the phase count
   so the circle is explicit about whether to breathe in or out at any moment. */
function enterBreathPhase(i) {
  const ph = BREATH[i];
  player.breathIndex = i;
  player.breathRemaining = ph.sec;
  const orb = $("#breathOrb"), ring = $("#ringProg"), label = $("#orbLabel"), count = $("#orbCount");
  if (orb) { orb.style.transitionDuration = ph.sec + "s"; orb.style.transform = "scale(" + ph.scale + ")"; }
  if (ring) { ring.style.transitionDuration = ph.sec + "s"; ring.style.strokeDashoffset = ph.scale >= 1 ? 0 : RING_C; }
  if (label) label.textContent = ph.label;
  if (count) count.textContent = ph.sec;
}

function setPlayIcon(playing) {
  $("#playBtn").innerHTML = playing
    ? '<svg viewBox="0 0 24 24" width="26" height="26"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>'
    : '<svg viewBox="0 0 24 24" width="26" height="26"><path d="M8 5v14l11-7z"/></svg>';
}

function toggleTimer() { player.running ? pauseTimer() : startTimer(); }

function startTimer() {
  player.running = true;
  setPlayIcon(true);
  enterBreathPhase(player.breathRemaining > 0 ? player.breathIndex : 0);  // resume current phase, or start on the inhale
  updateStepStatus();
  clearInterval(player.timer);
  player.timer = setInterval(tick, 1000);
}

function pauseTimer() {
  player.running = false;
  setPlayIcon(false);
  if ($("#orbLabel")) $("#orbLabel").textContent = "paused";
  clearInterval(player.timer);
}

function stopTimer() { player.running = false; clearInterval(player.timer); }

function tick() {
  // 6-step routine countdown (unchanged)
  player.remaining--;
  if (player.remaining <= 0) {
    nextStep();
    if (!player.running) return;   // routine just finished
  } else {
    updateStepStatus();
  }
  // breath pacer
  player.breathRemaining--;
  if (player.breathRemaining <= 0) {
    enterBreathPhase((player.breathIndex + 1) % BREATH.length);
  } else {
    const count = $("#orbCount");
    if (count) count.textContent = player.breathRemaining;
  }
}

function nextStep() {
  if (player.stepIndex < player.routine.steps.length - 1) {
    player.stepIndex++;
    player.remaining = player.routine.steps[player.stepIndex].sec;
    highlightStep();
    updateStepStatus();
  } else {
    finishRoutine();
  }
}

function skipStep() {
  const wasRunning = player.running;
  if (player.stepIndex < player.routine.steps.length - 1) {
    player.stepIndex++;
    player.remaining = player.routine.steps[player.stepIndex].sec;
    highlightStep();
    updateStepStatus();
    if (wasRunning) startTimer();
  } else {
    finishRoutine();
  }
}

function finishRoutine() {
  stopTimer();
  setPlayIcon(false);
  highlightStep();
  $$("#routineSteps li").forEach(li => li.classList.add("done"));
  $("#routineSteps li.current")?.classList.remove("current");
  const orb = $("#breathOrb");
  if (orb) { orb.style.transitionDuration = "1s"; orb.style.transform = "scale(1)"; }
  if ($("#orbCount")) $("#orbCount").textContent = "✓";
  if ($("#orbLabel")) $("#orbLabel").textContent = "all done — well done";
  if ($("#ringProg")) $("#ringProg").style.strokeDashoffset = 0;
  if ($("#stepStatus")) $("#stepStatus").textContent = "complete";
}

function initRoutines() { renderRoutineTabs(); loadRoutine(ROUTINES[0].key); }

/* ----------------------------------------------------------
   6. NAV · THEME · LIGHTBOX · REVEAL
---------------------------------------------------------- */
function initNav() {
  const toggle = $("#navToggle"), links = $("#navLinks");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  $$("#navLinks a").forEach(a => a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));

  // scrollspy
  const sections = $$("main section[id]");
  const navMap = {};
  $$("#navLinks a").forEach(a => { navMap[a.getAttribute("href").slice(1)] = a; });
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        $$("#navLinks a").forEach(a => a.classList.remove("active"));
        const id = e.target.id;
        const link = navMap[id] || navMap[sectionToNav(id)];
        link?.classList.add("active");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach(s => spy.observe(s));
}
function sectionToNav(id) {
  // map sub-sections (welcome) to nearest nav target
  if (id === "welcome") return "home";
  return id;
}

function initTheme() {
  const btn = $("#themeToggle");
  let saved = null;
  try { saved = localStorage.getItem("gp-theme"); } catch (e) {}
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved || (prefersDark ? "dark" : "light");
  applyTheme(theme);
  btn.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem("gp-theme", next); } catch (e) {}
  });
}
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const btn = $("#themeToggle");
  btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
}

function initLightbox() {
  const box = $("#lightbox"), img = $("#lightboxImg"), cap = $("#lightboxCap"),
        close = $("#lightboxClose"), stage = $("#lightboxStage");
  function reveal(caption) { cap.textContent = caption || ""; box.hidden = false; document.body.style.overflow = "hidden"; }
  function openImg(src, alt, caption) {  // simple image (welcome/lede figure)
    stage.hidden = true; stage.innerHTML = "";
    img.hidden = false; img.src = src; img.alt = alt || "";
    reveal(caption);
  }
  function openPhoto(photo) {             // point card: clone image + overlay together
    img.hidden = true; img.src = "";
    const clone = photo.cloneNode(true);
    clone.removeAttribute("data-caption");
    // re-scope marker ids so the clone's url(#…) doesn't collide with the live card
    clone.innerHTML = clone.innerHTML.replace(/arrowhead-([\w-]+)/g, "arrowhead-$1-lb");
    stage.innerHTML = ""; stage.appendChild(clone); stage.hidden = false;
    reveal(photo.dataset.caption);
  }
  function shut() { box.hidden = true; img.src = ""; stage.innerHTML = ""; document.body.style.overflow = ""; }

  document.addEventListener("click", e => {
    const photo = e.target.closest(".point-photo");
    const lede = e.target.closest(".lede-figure img");
    if (photo) {
      const i = photo.querySelector("img");
      if (i && i.style.display !== "none") openPhoto(photo);  // skip if image failed (fallback panel)
    } else if (lede) {
      openImg(lede.src, lede.alt, lede.parentElement.querySelector("figcaption")?.textContent);
    }
  });
  close.addEventListener("click", shut);
  box.addEventListener("click", e => { if (e.target === box) shut(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !box.hidden) shut(); });
}

function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -8% 0px" });
  // tag common blocks
  $$(".section-title, .section-intro, .lede-text p, .river-note, .disclaimer, .kids-card, .meridian-figure, .facial-figure, .routine-player").forEach(n => {
    n.classList.add("reveal"); obs.observe(n);
  });
  $$(".reveal").forEach(n => obs.observe(n));
}

function initPrint() {
  $("#printBtn").addEventListener("click", () => window.print());
  // attach fallback to the welcome image
  const lede = $(".lede-figure img");
  if (lede) attachFallback(lede, "Add a calming photo here");
}

/* ----------------------------------------------------------
   7. BOOT
---------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderBenefits();
  renderTips();
  renderPoints();
  renderFinder();
  initSearch();
  initMeridians();
  renderFacial();
  initRoutines();
  initNav();
  initTheme();
  initLightbox();
  initPrint();
  initReveal();
});
