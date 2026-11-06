/* FLAG LIBRARY: add one entry per flag.
   name:     lowercase letters, numbers, hyphens (this is what characters store)
   label:    hover text and screen-reader name
   group:    heading in the editor's flag dropdowns (optional; defaults to "Other")
   gradient: a CSS linear-gradient(...)
   Layered flag: use  layers: [ { gradient }, { gradient, clip } ]  instead of gradient.
   The first layer fills the flag; each later layer is drawn on top, cut to the shape in clip
   (e.g. "polygon(40% 0, 60% 0, 60% 100%, 40% 100%)" = a center stripe).
   Later layers can also be { text: "π", color: "#000", size: "14px" } or { image: "path or https URL", size: "contain" }. */
window.FLAGS = {
/* ======================== SEXUAL ORIENTATIONS ============================== */
  straight:     { label: "Heterosexual", group: "Sexual", gradient: "linear-gradient(#000,#000 16.7%,#303030 16.7%,#303030 33.4%,#666666 33.3%,#666666 50.1%,#9a9a9a 50.1%,#9a9a9a 66.8%,#bcbcbc 66.8%,#bcbcbc 83.5%,#fff 83.5%)" },
  bisexual: { label: "Bisexual", group: "Sexual", gradient: "linear-gradient(#d70170,#d70170 40%,#734f94 40%,#734f94 60%,#0039a7 60%)" },
  gay:    { label: "Gay", group: "Sexual", gradient: "linear-gradient(#ef2d1f,#ef2d1f 16.7%,#f58024 16.7%,#f58024 33.4%,#fff000 33.3%,#fff000 50.1%,#57ba45 50.1%,#57ba45 66.8%,#0053a7 66.8%,#0053a7 83.5%,#a01f90 83.5%)" },
  lesbian:    { label: "Lesbian", group: "Sexual", gradient: "linear-gradient(#d42c00,#d42c00 20%,#fd9855 20%,#fd9855 40%,#fff 40%,#fff 60%,#d161a2 60%,#d161a2 80%,#a20161 80%)" },
  ace:    { label: "Asexual", group: "Sexual", gradient: "linear-gradient(#000,#000 25%,#7f7f7f 25%,#7f7f7f 50%,#fff 50%,#fff 75%,#670066 75%)" },
  gyno:    { label: "Gynosexual", group: "Sexual", gradient: "linear-gradient(#f5acba,#f5acba 33.3%,#934532 33.3%,#934532 66.6%,#609740 66.6%)" },
  andro:    { label: "Androsexual", group: "Sexual", gradient: "linear-gradient(#01ccff,#01ccff 33.3%,#603524 33.3%,#603524 66.6%,#b799de 66.6%)" },

  "heteroflex": { label: "Heteroflexible", group: "Sexual", layers: [{ gradient: "linear-gradient(#000,#000 16.7%,#303030 16.7%,#303030 33.4%,#666666 33.3%,#666666 50.1%,#9a9a9a 50.1%,#9a9a9a 66.8%,#bcbcbc 66.8%,#bcbcbc 83.5%,#fff 83.5%)" },{ gradient: "linear-gradient(#ef2d1f,#ef2d1f 16.7%,#f58024 16.7%,#f58024 33.4%,#fff000 33.3%,#fff000 50.1%,#57ba45 50.1%,#57ba45 66.8%,#0053a7 66.8%,#0053a7 83.5%,#a01f90 83.5%)", clip: "polygon(40% 0, 60% 0, 60% 100%, 40% 100%)" }] },

  "homoflex": { label: "Homoflexible", group: "Sexual", layers: [{ gradient: "linear-gradient(#ef2d1f,#ef2d1f 16.7%,#f58024 16.7%,#f58024 33.4%,#fff000 33.3%,#fff000 50.1%,#57ba45 50.1%,#57ba45 66.8%,#0053a7 66.8%,#0053a7 83.5%,#a01f90 83.5%)" },{ gradient: "linear-gradient(#000,#000 16.7%,#303030 16.7%,#303030 33.4%,#666666 33.3%,#666666 50.1%,#9a9a9a 50.1%,#9a9a9a 66.8%,#bcbcbc 66.8%,#bcbcbc 83.5%,#fff 83.5%)", clip: "polygon(40% 0,60% 0,60% 100%,40% 100%)" }] },

/* ======================== ROMANTIC ORIENTATIONS ============================== */

  aro:    { label: "Aromantic", group: "Romantic", gradient: "linear-gradient(#3ca542,#3ca542 20%,#a8d377 20%,#a8d377 40%,#fff 40%,#fff 60%,#a9a9a9 60%,#a9a9a9 80%,#000 80%)" },
  poly: { label: "Polyamorous", group: "Romantic", layers: [{ gradient: "linear-gradient(#0000ff,#0000ff 33.3%,#fe0100 33.3%,#fe0100 66.6%,#000 66.6%)" },{ text: "π", color: "#000", size: "14px" }] },

/* ========================== GENDER ================================ */

  trans:    { label: "Transgender", group: "Gender", gradient: "linear-gradient(#5ac7ed,#5ac7ed 20%,#efa4b1 20%,#efa4b1 40%,#fff 40%,#fff 60%,#efa4b1 60%,#efa4b1 80%,#5ac7ed 80%)" },
  nb:    { label: "Nonbinary", group: "Gender", gradient: "linear-gradient(#fff42c,#fff42c 25%,#fff 25%,#fff 50%,#9d59d2 50%,#9d59d2 75%,#000 75%)" },
  agender:    { label: "Agender", group: "Gender", gradient: "linear-gradient(#000,#000 14.3%,#bcc5c6 14.3%,#bcc5c6 28.6%,#fff 28.6%,#fff 42.9%,#b5f582 42.9%,#b5f582 57.2%,#fff 57.2%,#fff 71.5%,#bcc5c6 71.5%,#bcc5c6 85.8%,#000 85.8%)" },

/* ========================== OTHER ================================ */

  questioning:    { label: "Questioning", group: "Other", gradient: "linear-gradient(#ed7735,#ed7735 25%,#f4ec2b 25%,#f4ec2b 50%,#5ab34d 50%,#5ab34d 75%,#5168b0 75%)" },
  intersex: { label: "Disorder of Sexual Development (Intersex)", group: "Other", layers: [{ gradient: "linear-gradient(#ffd900,#ffd900)" },{ gradient: "linear-gradient(#7a00ab,#7a00ab)", clip: "circle(25.87%)" },{ gradient: "linear-gradient(#ffd900,#ffd900)", clip: "circle(17.25%)" }] },
  lgbt: { label: "LGBT", group: "Other", gradient: "linear-gradient(#ff69b4,#ff69b4 12.5%,#ff0000 12.5%,#ff0000 25%,#ff8e00 25%,#ff8e00 37.5%,#ffff02 37.5%,#ffff02 50%,#008e00 50%,#008e00 62.5%,#00c0c0 62.5%,#00c0c0 75%,#400098 75%,#400098 87.5%,#8e008e 87.5%)" },
};
