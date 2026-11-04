/* FLAG LIBRARY: add one entry per flag.
   name:     lowercase letters, numbers, hyphens (this is what characters store)
   label:    hover text and screen-reader name
   gradient: a CSS linear-gradient(...)
   Layered flag: use  layers: [ { gradient }, { gradient, clip } ]  instead of gradient.
   The first layer fills the flag; each later layer is drawn on top, cut to the shape in clip
   (e.g. "polygon(40% 0, 60% 0, 60% 100%, 40% 100%)" = a center stripe). 
   :    { label: "",      gradient: "linear-gradient()" },
   "tag": { label: "", layers: [{ gradient: "linear-gradient()" },{ gradient: "linear-gradient()", clip: "" }] },
  */
window.FLAGS = {

/* ======================== ORIENTATIONS ============================== */
  straight:     { label: "Heterosexual", gradient: "linear-gradient(#000,#000 16.7%,#303030 16.7%,#303030 33.4%,#666666 33.3%,#666666 50.1%,#9a9a9a 50.1%,#9a9a9a 66.8%,#bcbcbc 66.8%,#bcbcbc 83.5%,#fff 83.5%)" },
   
  bisexual: { label: "Bisexual",   gradient: "linear-gradient(#d70170,#d70170 40%,#734f94 40%,#734f94 60%,#0039a7 60%)" },
   
  gay:    { label: "Gay",      gradient: "linear-gradient(#ef2d1f,#ef2d1f 16.7%,#f58024 16.7%,#f58024 33.4%,#fff000 33.3%,#fff000 50.1%,#57ba45 50.1%,#57ba45 66.8%,#0053a7 66.8%,#0053a7 83.5%,#a01f90 83.5%)" },
   
  lesbian:    { label: "Lesbian",      gradient: "linear-gradient(#d42c00,#d42c00 20%,#fd9855 20%,#fd9855 40%,#fff 40%,#fff 60%,#d161a2 60%,#d161a2 80%,#a20161 80%)" },
   
  "hetflex": { label: "Heteroflexible", layers: [{ gradient: "linear-gradient(#000,#000 16.7%,#303030 16.7%,#303030 33.4%,#666666 33.3%,#666666 50.1%,#9a9a9a 50.1%,#9a9a9a 66.8%,#bcbcbc 66.8%,#bcbcbc 83.5%,#fff 83.5%)" },{ gradient: "linear-gradient(#ef2d1f,#ef2d1f 16.7%,#f58024 16.7%,#f58024 33.4%,#fff000 33.3%,#fff000 50.1%,#57ba45 50.1%,#57ba45 66.8%,#0053a7 66.8%,#0053a7 83.5%,#a01f90 83.5%)", clip: "polygon(40% 0, 60% 0, 60% 100%, 40% 100%)" }] },
   
"homoflex": { label: "Homoflexible", layers: [{ gradient: "linear-gradient(#ef2d1f,#ef2d1f 16.7%,#f58024 16.7%,#f58024 33.4%,#fff000 33.3%,#fff000 50.1%,#57ba45 50.1%,#57ba45 66.8%,#0053a7 66.8%,#0053a7 83.5%,#a01f90 83.5%)" },{ gradient: "linear-gradient(#000,#000 16.7%,#303030 16.7%,#303030 33.4%,#666666 33.3%,#666666 50.1%,#9a9a9a 50.1%,#9a9a9a 66.8%,#bcbcbc 66.8%,#bcbcbc 83.5%,#fff 83.5%)", clip: "polygon(40% 0,60% 0,60% 100%,40% 100%)" }] },

   questioning:    { label: "Questioning",      gradient: "linear-gradient(#ed7735,#ed7735 25%,#f4ec2b 25%,#f4ec2b 50%,#5ab34d 50%,#5ab34d 75%,#5168b0 75%)" },
   
   /* ========================== GENDER ================================ */


   
   /* ========================== OTHER ================================ */
   
   "poly": { label: "Polyamorous", layers: [{ gradient: "linear-gradient((#0000ff,#0000ff 33.3%,#fe0100 33.3%,#fe0100 66.6%,#000 66.6%)" },{ "background:url(https://images2.imgbox.com/b5/f6/eCtGAoBQ_o.png) no-repeat center;background-size:20%;" }] },

     progress: { label: "Progress Pride", layers: [
    { gradient: "linear-gradient(#e40303,#e40303 16.7%,#ff8c00 16.7%,#ff8c00 33.4%,#ffed00 33.3%,#ffed00 50.1%,#008026 50.1%,#008026 66.8%,#004dff 66.8%,#004dff 83.5%,#750787 83.5%)" },
    { gradient: "linear-gradient(#000,#000)",       clip: "polygon(20% 0%, 50% 50%, 20% 100%, 0% 100%, 0% 50%, 0% 0%)" },
    { gradient: "linear-gradient(#603917,#603917)", clip: "polygon(8% 0%, 40% 50%, 8% 100%, 0% 100%, 0% 50%, 0% 0%)" },
    { gradient: "linear-gradient(#7cc0ea,#7cc0ea)", clip: "polygon(28% 50%, 0% 0%, 0% 100%)" },
    { gradient: "linear-gradient(#f498c0,#f498c0)", clip: "polygon(19.6% 50%, 0% 15%, 0% 85%)" },
    { gradient: "linear-gradient(#fff,#fff)",       clip: "polygon(10.78% 50%, 0% 30%, 0% 70%)" }
  ] },


   
};
