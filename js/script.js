/* ==========================================================
   Nosso Tempo — script.js
   ========================================================== */

// ---------- Contador (cada informação em um card) ----------
const inicio = new Date(2026, 4, 4, 16, 25, 0); // 04/05/2026 16:25

const elDias  = document.getElementById('vDias');
const elHoras = document.getElementById('vHoras');
const elMin   = document.getElementById('vMin');
const elSeg   = document.getElementById('vSeg');

function pad(n) {
  return String(n).padStart(2, '0');
}

function atualizar() {
  let diff = Math.floor((Date.now() - inicio.getTime()) / 1000);
  if (diff < 0) diff = 0;

  elDias.textContent  = Math.floor(diff / 86400);
  elHoras.textContent = pad(Math.floor((diff % 86400) / 3600));
  elMin.textContent   = pad(Math.floor((diff % 3600) / 60));
  elSeg.textContent   = pad(diff % 60);
}

atualizar();
setInterval(atualizar, 1000);

// ---------- Foto (mostra se houver src no <img>) ----------
const coverImg = document.getElementById('coverImg');
const coverPlaceholder = document.getElementById('coverPlaceholder');

if (coverImg.getAttribute('src')) {
  coverImg.style.display = 'block';
  coverPlaceholder.style.display = 'none';
}

// ---------- Corações de fundo subindo ----------
const heartsBox = document.getElementById('hearts');
const emojis = ['\u2764', '\uD83D\uDC96', '\uD83D\uDC95', '\uD83D\uDC9E', '\uD83D\uDC97'];

function spawnHeart() {
  const h = document.createElement('div');
  h.className = 'fheart';
  h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  h.style.left = Math.random() * 100 + 'vw';
  h.style.fontSize = (16 + Math.random() * 26) + 'px';

  const dur = 6 + Math.random() * 6;
  h.style.animationDuration = dur + 's';
  h.style.opacity = 0.4 + Math.random() * 0.5;

  heartsBox.appendChild(h);
  setTimeout(() => h.remove(), dur * 1000);
}

setInterval(spawnHeart, 160);
for (let i = 0; i < 20; i++) setTimeout(spawnHeart, i * 120);

// ---------- Tela inicial: clique toca a música + burst ----------
const audio = document.getElementById('audio');
const enter = document.getElementById('enter');

audio.volume = 1;
audio.muted = false;

function tocar() {
  audio.muted = false;
  audio.volume = 1;
  const p = audio.play();
  if (p && p.catch) {
    p.catch(() => {
      // Se o navegador bloquear, tenta de novo no próximo toque
      document.addEventListener('click', () => audio.play(), { once: true });
      document.addEventListener('touchstart', () => audio.play(), { once: true });
    });
  }
}

enter.addEventListener('click', (e) => {
  tocar();

  // Burst de corações a partir do ponto do clique
  for (let i = 0; i < 14; i++) {
    const b = document.createElement('div');
    b.className = 'burst';
    b.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    b.style.left = (e.clientX || window.innerWidth / 2) + 'px';
    b.style.top = (e.clientY || window.innerHeight / 2) + 'px';

    const ang = Math.random() * Math.PI * 2;
    const dist = 80 + Math.random() * 140;
    b.style.setProperty('--tx', Math.cos(ang) * dist + 'px');
    b.style.setProperty('--ty', Math.sin(ang) * dist + 'px');

    document.body.appendChild(b);
    setTimeout(() => b.remove(), 900);
  }

  enter.classList.add('hide');
  setTimeout(() => { enter.style.display = 'none'; }, 700);
});
