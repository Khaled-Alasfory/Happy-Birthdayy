const $ = (selector) => document.querySelector(selector);

let cur = 'home';
let hist = [];

function go(id, back = false) {
  if (!back && id !== cur) hist.push(cur);
  cur = id;

  document.querySelectorAll('section').forEach((section) => {
    section.classList.toggle('on', section.id === id);
  });

  document.querySelectorAll('nav a').forEach((link) => {
    link.classList.toggle('on', link.dataset.s === id);
  });

  scrollTo(0, 0);

  const audio = $('#au');
  audio.pause();
  $('#vin').classList.remove('spin');
  $('#hint').textContent = 'Press the record for your song';

  if (id === 'message') {
    $('#env').style.display = '';
    $('#letter').hidden = true;
  }
}

function goBack() {
  go(hist.pop() || 'home', true);
}

document.querySelectorAll('nav a').forEach((link) => {
  link.onclick = () => go(link.dataset.s);
});

function openEnv() {
  $('#env').style.display = 'none';
  $('#letter').hidden = false;
  pop(16, ['💙', '🌸']);
}

function pop(count, set) {
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('span');
    particle.className = 'p';
    particle.textContent = set[i % set.length];
    particle.style.left = '50%';
    particle.style.top = '50%';

    const angle = Math.random() * 6.28;
    const distance = 150 + Math.random() * 350;

    particle.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
    particle.style.setProperty('--y', `${Math.sin(angle) * distance}px`);
    particle.style.setProperty('--r', `${Math.random() * 720}deg`);

    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 2300);
  }
}

let done = false;

function boom() {
  if (done) return;
  done = true;

  pop(60, ['🌸', '🌷', '🌼', '💐', '🌺', '💙']);

  const intro = $('#intro');
  intro.style.opacity = 0;
  setTimeout(() => intro.remove(), 1000);
}

setTimeout(boom, 6000);

function song() {
  const audio = $('#au');
  const vinyl = $('#vin');

  if (audio.paused) {
    audio.play().catch(() => {});
    vinyl.classList.add('spin');
    $('#hint').textContent = 'Playing... tap again to pause';
    pop(12, ['💙', '🎵']);
  } else {
    audio.pause();
    vinyl.classList.remove('spin');
    $('#hint').textContent = 'Press the record for your song';
  }
}
