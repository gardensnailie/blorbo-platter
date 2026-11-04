/* FLAG LIBRARY: add one entry per flag.
   name:     lowercase letters, numbers, hyphens (this is what characters store)
   label:    hover text and screen-reader name
   gradient: a CSS linear-gradient(...) */
window.FLAGS = {
  mono:     { label: "Monochrome", gradient: "linear-gradient(#000,#000 16.7%,#303030 16.7%,#303030 33.4%,#666666 33.3%,#666666 50.1%,#9a9a9a 50.1%,#9a9a9a 66.8%,#bcbcbc 66.8%,#bcbcbc 83.5%,#fff 83.5%)" },
  bisexual: { label: "Bisexual",   gradient: "linear-gradient(#d70170,#d70170 40%,#734f94 40%,#734f94 60%,#0039a7 60%)" },
  pride:    { label: "Pride",      gradient: "linear-gradient(#ef2d1f,#ef2d1f 16.7%,#f58024 16.7%,#f58024 33.4%,#fff000 33.3%,#fff000 50.1%,#57ba45 50.1%,#57ba45 66.8%,#0053a7 66.8%,#0053a7 83.5%,#a01f90 83.5%)" }
};
