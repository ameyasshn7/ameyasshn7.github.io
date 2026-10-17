// Photo viewer
// - Click any gallery photo to open it, then browse with the arrows,
//   the ← / → keys, or by swiping on a phone.
// - "Play slideshow" (next to the Gallery heading, or inside the viewer)
//   steps through every gallery photo automatically.
// - Research photos open the same way and browse among themselves.
document.addEventListener('DOMContentLoaded', () => {
  const viewer = document.getElementById('viewer');
  if (!viewer || typeof viewer.showModal !== 'function') return;

  const big = viewer.querySelector('.viewer-img');
  const caption = viewer.querySelector('.viewer-caption');
  const counter = viewer.querySelector('.viewer-count');
  const prevBtn = viewer.querySelector('.prev');
  const nextBtn = viewer.querySelector('.next');
  const playBtn = viewer.querySelector('.play');
  const SLIDE_MS = 4000;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let items = [];   // [{ src, alt, caption }]
  let index = 0;
  let timer = null;

  const toItem = (img) => {
    const fig = img.closest('figure');
    const cap = fig ? fig.querySelector('figcaption') : null;
    return { src: img.currentSrc || img.src, alt: img.alt, caption: cap ? cap.textContent.trim() : img.alt };
  };

  const galleryImgs = [...document.querySelectorAll('#gallery figure img')];
  const researchImgs = [...document.querySelectorAll('.project img')];

  function show(i) {
    index = (i + items.length) % items.length;
    const it = items[index];
    if (!reduceMotion) {
      big.classList.remove('fade');
      void big.offsetWidth;          // restart the fade-in
      big.classList.add('fade');
    }
    big.src = it.src;
    big.alt = it.alt;
    caption.textContent = it.caption;
    counter.textContent = items.length > 1 ? `${index + 1} / ${items.length}` : '';
    // load the neighbours ahead of time so browsing feels instant
    [index + 1, index - 1].forEach((n) => {
      const pre = new Image();
      pre.src = items[(n + items.length) % items.length].src;
    });
  }

  function open(list, start, autoplay = false) {
    items = list.map(toItem);
    const multi = items.length > 1;
    prevBtn.hidden = nextBtn.hidden = playBtn.hidden = !multi;
    show(start);
    if (!viewer.open) viewer.showModal();
    autoplay && multi ? play() : pause();
  }

  function play() {
    pause();
    timer = setInterval(() => show(index + 1), SLIDE_MS);
    playBtn.textContent = 'Pause';
    playBtn.setAttribute('aria-pressed', 'true');
  }
  function pause() {
    clearInterval(timer);
    timer = null;
    playBtn.textContent = 'Play slideshow';
    playBtn.setAttribute('aria-pressed', 'false');
  }
  const step = (d) => { show(index + d); if (timer) play(); }; // manual step restarts the timer

  galleryImgs.forEach((img, i) => img.addEventListener('click', () => open(galleryImgs, i)));
  researchImgs.forEach((img, i) => img.addEventListener('click', () => open(researchImgs, i)));

  // photos can also be opened from the keyboard (Tab to a photo, then Enter)
  [...galleryImgs, ...researchImgs].forEach((img) => {
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); img.click(); }
    });
  });

  const startBtn = document.getElementById('slideshow-btn');
  if (startBtn && galleryImgs.length) startBtn.addEventListener('click', () => open(galleryImgs, 0, true));

  prevBtn.addEventListener('click', () => step(-1));
  nextBtn.addEventListener('click', () => step(1));
  playBtn.addEventListener('click', () => (timer ? pause() : play()));
  viewer.querySelector('.close').addEventListener('click', () => viewer.close());

  // click on the dark backdrop closes; clicks on the photo or buttons don't
  viewer.addEventListener('click', (e) => {
    if (e.target === viewer || e.target.classList.contains('viewer-figure')) viewer.close();
  });
  viewer.addEventListener('close', pause);

  document.addEventListener('keydown', (e) => {
    if (!viewer.open || items.length < 2) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
    else if (e.key === ' ') { e.preventDefault(); timer ? pause() : play(); }
  });

  // swipe left / right on touch screens
  let startX = null;
  viewer.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  viewer.addEventListener('touchend', (e) => {
    if (startX === null || items.length < 2) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
    startX = null;
  });
});
