/**
 * Girasol de Amor Interactivo 🌻
 * Dedicatoria de Mai para Andri
 */

// Estado global y configuración
const CONFIG = {
  defaultSender: "Mai",
  defaultReceiver: "Andri",
};

// 12 Razones románticas personalizadas
const petalMessages = [
  {
    id: 0,
    title: "Tu Sonrisa Radiante",
    text: "Tu sonrisa tiene la magia pura de iluminar hasta mi día más gris. Verte sonreír es y será siempre mi momento favorito."
  },
  {
    id: 1,
    title: "Mi Luz en Todo Momento",
    text: "Igual que este girasol busca incansablemente el sol, mi corazón siempre encuentra su rumbo y su calma en ti."
  },
  {
    id: 2,
    title: "Tus Abrazos Dulces",
    text: "Cuando me abrazas, el mundo entero se silencia. En tus brazos encontré el único lugar donde siempre quiero quedarme."
  },
  {
    id: 3,
    title: "Tu Manera Tan Hermosa de Ser",
    text: "Amo tu bondad infinita, la ternura que irradias y la nobleza de un corazón que me enamora cada día más."
  },
  {
    id: 4,
    title: "Nuestras Conversaciones",
    text: "Desde las risas más tontas hasta los sueños más profundos, cada minuto contigo se convierte en un recuerdo inolvidable."
  },
  {
    id: 5,
    title: "Tu Fuerza e Inspiración",
    text: "Admiro tu pasión, tu valentía y la belleza con la que luchas por todo lo que te propones. Eres mi inspiración constante."
  },
  {
    id: 6,
    title: "Mi Refugio Seguro",
    text: "A tu lado puedo ser completamente yo, porque en tu mirada solo encuentro amor sincero, paz y comprensión infinita."
  },
  {
    id: 7,
    title: "Cada Recuerdo Juntos",
    text: "Cada foto, cada paseo de la mano y cada mirada cómplice son tesoros invaluables guardados en lo más profundo de mi alma."
  },
  {
    id: 8,
    title: "El Brillo de Tus Ojos",
    text: "En tus ojos veo la sinceridad y la magia de un amor que me llena de ilusión y esperanza todos los días."
  },
  {
    id: 9,
    title: "Ser Tu Compañero de Vida",
    text: "Eres mi gran amor, mi confidente, mi cómplice favorita y la persona con quien quiero celebrar cada pequeño triunfo."
  },
  {
    id: 10,
    title: "Tus Pequeños Gestos",
    text: "Amo tus detalles imprevistos, tu forma dulce de hablarme y la manera tierna en que tomas mi mano al caminar."
  },
  {
    id: 11,
    title: "Nuestro Futuro Juntos",
    text: "Cuando cierro los ojos e imagino los años que vienen, siempre estás tú a mi lado construyendo nuestra historia de amor."
  }
];

let currentPetalIndex = null;
let discoveredPetals = new Set();
let modalTriggered = false;
let audioContext = null;
let isMusicPlaying = false;
let melodyInterval = null;

// Elementos DOM
const petalElements = document.querySelectorAll('.interactive-petal');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const cardIcon = document.getElementById('card-icon');
const cardTitle = document.getElementById('card-title');
const cardStep = document.getElementById('card-step');
const petalMessageText = document.getElementById('petal-message-text');
const tapInstruction = document.getElementById('tap-instruction');
const centerDisc = document.getElementById('center-disc');
const completionModal = document.getElementById('completion-modal');
const completionBox = document.getElementById('completion-box');
const petalModal = document.getElementById('petal-modal');
const petalModalBox = document.getElementById('petal-modal-box');
const petalModalBadge = document.getElementById('petal-modal-badge');
const petalModalTitle = document.getElementById('petal-modal-title');
const petalModalText = document.getElementById('petal-modal-text');
const shareModal = document.getElementById('share-modal');
const shareBox = document.getElementById('share-box');
const musicToggleBtn = document.getElementById('music-toggle');
const musicIcon = document.getElementById('music-icon');
const musicLabel = document.getElementById('music-label');
const shareBtn = document.getElementById('share-btn');

// Nombres dinámicos
let senderName = CONFIG.defaultSender;
let receiverName = CONFIG.defaultReceiver;

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', () => {
  parseUrlParams();
  updateNamesInUI();
  generatePollen();
  setupEventListeners();
  loadSavedProgress();
  setupCanvas();
});

// Lectura de parámetros URL (?to=Andri&from=Mai)
function parseUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('to')) {
    receiverName = urlParams.get('to').trim() || CONFIG.defaultReceiver;
  }
  if (urlParams.has('from')) {
    senderName = urlParams.get('from').trim() || CONFIG.defaultSender;
  }
}

// Actualizar textos en la interfaz
function updateNamesInUI() {
  document.title = `Para Mi Amor ${receiverName} - Un Girasol Para Ti 🌻`;
  
  const headerBadge = document.getElementById('header-badge');
  if (headerBadge) {
    headerBadge.textContent = `Para ${receiverName}, de parte de ${senderName} ✨`;
  }
  
  const footerSender = document.getElementById('footer-sender');
  const footerReceiver = document.getElementById('footer-receiver');
  if (footerSender) footerSender.textContent = senderName;
  if (footerReceiver) footerReceiver.textContent = receiverName;

  const modalCelebrationTitle = document.getElementById('modal-celebration-title');
  if (modalCelebrationTitle) {
    modalCelebrationTitle.textContent = `¡Completaste tu Girasol, ${receiverName}!`;
  }

  const modalSignature = document.getElementById('modal-signature');
  if (modalSignature) {
    modalSignature.textContent = `— Con amor infinito, ${senderName} 💛`;
  }

  const inputTo = document.getElementById('input-to');
  const inputFrom = document.getElementById('input-from');
  if (inputTo) inputTo.value = receiverName;
  if (inputFrom) inputFrom.value = senderName;
}

// Generación de partículas de polen dorado flotante
function generatePollen() {
  const container = document.getElementById('pollen-container');
  if (!container) return;
  const count = 18;
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.className = 'pollen-dot';
    const size = Math.random() * 6 + 3;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.animationDuration = `${Math.random() * 8 + 6}s`;
    dot.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(dot);
  }
}

// Configuración de eventos de usuario
function setupEventListeners() {
  // Clic en pétalos individuales
  petalElements.forEach(petal => {
    petal.addEventListener('click', () => {
      const id = parseInt(petal.getAttribute('data-petal-id'), 10);
      selectPetal(id);
      playChimeSound(id);
    });
  });

  // Clic en centro del girasol
  if (centerDisc) {
    centerDisc.addEventListener('click', () => {
      playChimeSound(6);
      revealRandomPetal();
      spawnHeartSparkles();
    });
  }

  // Botón de música
  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', toggleRomanticMusic);
  }

  // Botón de compartir
  if (shareBtn) {
    shareBtn.addEventListener('click', openShareModal);
  }

  // Cerrar modal de pétalo al hacer clic en el backdrop
  if (petalModal) {
    petalModal.addEventListener('click', (e) => {
      if (e.target === petalModal) {
        closePetalModal();
      }
    });
  }
}

// Selección e interacción de un pétalo
function selectPetal(id, showModalPopup = true) {
  currentPetalIndex = id;
  discoveredPetals.add(id);

  // Ocultar mensaje inicial de ayuda
  if (tapInstruction) {
    tapInstruction.style.opacity = '0';
  }

  // Actualizar jerarquía y estilos SVG
  petalElements.forEach(p => {
    const pId = parseInt(p.getAttribute('data-petal-id'), 10);
    if (pId === id) {
      p.classList.add('is-selected');
      p.parentNode.appendChild(p); // Colocar al frente
    } else {
      p.classList.remove('is-selected');
      if (discoveredPetals.has(pId)) {
        p.classList.add('is-discovered');
      }
    }
  });

  // Actualizar barra de progreso
  const count = discoveredPetals.size;
  const percentage = Math.round((count / 12) * 100);
  if (progressBar) progressBar.style.width = `${percentage}%`;
  if (progressText) progressText.textContent = `${count} / 12 pétalos`;

  // Actualizar tarjeta inferior con transición suave
  const data = petalMessages[id];
  if (petalMessageText) {
    petalMessageText.style.opacity = '0';
    petalMessageText.style.transform = 'translateY(4px)';

    setTimeout(() => {
      if (cardIcon) cardIcon.textContent = `#${id + 1}`;
      if (cardTitle) cardTitle.textContent = data.title;
      if (cardStep) cardStep.textContent = `Pétalo ${id + 1} de 12`;
      petalMessageText.textContent = `«${data.text}»`;
      petalMessageText.style.opacity = '1';
      petalMessageText.style.transform = 'translateY(0)';
    }, 150);
  }

  // Abrir modal emergente central con el mensaje
  if (showModalPopup) {
    openPetalModal(id);
  }

  // Guardar progreso en localStorage
  saveProgress();

  // Animación de corazón flotante
  spawnFloatingHeart();

  // Comprobar si se completaron los 12 pétalos
  if (count === 12 && !modalTriggered) {
    modalTriggered = true;
    setTimeout(() => {
      // Cerrar modal de pétalo si está abierto y abrir modal de celebración final
      closePetalModal();
      openModal();
      triggerCelebrationEffect();
    }, 1200);
  }
}

// Control del modal central de pétalo
function openPetalModal(id) {
  if (!petalModal || !petalModalBox) return;
  const data = petalMessages[id];

  if (petalModalBadge) petalModalBadge.textContent = `Pétalo ${id + 1} de 12`;
  if (petalModalTitle) petalModalTitle.textContent = data.title;
  if (petalModalText) petalModalText.textContent = `«${data.text}»`;
  if (petalModalIcon) petalModalIcon.textContent = "🌻";

  petalModal.classList.remove('pointer-events-none', 'opacity-0');
  petalModal.classList.add('opacity-100');
  petalModalBox.classList.remove('scale-90');
  petalModalBox.classList.add('scale-100');
}

function closePetalModal() {
  if (!petalModal || !petalModalBox) return;
  petalModal.classList.add('opacity-0', 'pointer-events-none');
  petalModal.classList.remove('opacity-100');
  petalModalBox.classList.remove('scale-100');
  petalModalBox.classList.add('scale-90');
}

function navigateFromModal(dir) {
  closePetalModal();
  setTimeout(() => {
    navigatePetal(dir);
  }, 180);
}

// Navegación Anterior / Siguiente
function navigatePetal(direction) {
  if (currentPetalIndex === null) {
    selectPetal(0, true);
    playChimeSound(0);
    return;
  }
  const nextIndex = (currentPetalIndex + direction + 12) % 12;
  selectPetal(nextIndex, true);
  playChimeSound(nextIndex);
}

// Revelar pétalo aleatorio no descubierto
function revealRandomPetal() {
  const unread = [];
  for (let i = 0; i < 12; i++) {
    if (!discoveredPetals.has(i)) unread.push(i);
  }

  if (unread.length > 0) {
    const choice = unread[Math.floor(Math.random() * unread.length)];
    selectPetal(choice, true);
    playChimeSound(choice);
  } else {
    let r;
    do {
      r = Math.floor(Math.random() * 12);
    } while (r === currentPetalIndex);
    selectPetal(r, true);
    playChimeSound(r);
  }
}

// Efectos de partículas de corazón flotante
function spawnFloatingHeart() {
  const heart = document.createElement('div');
  heart.textContent = '💛';
  heart.style.position = 'fixed';
  heart.style.left = '50%';
  heart.style.top = '45%';
  heart.style.transform = 'translate(-50%, -50%) scale(0.6)';
  heart.style.pointerEvents = 'none';
  heart.style.fontSize = '24px';
  heart.style.zIndex = '60';
  heart.style.transition = 'all 0.95s cubic-bezier(0.16, 1, 0.3, 1)';
  document.body.appendChild(heart);

  requestAnimationFrame(() => {
    const offset = (Math.random() - 0.5) * 160;
    heart.style.transform = `translate(calc(-50% + ${offset}px), -140px) scale(1.35)`;
    heart.style.opacity = '0';
  });

  setTimeout(() => heart.remove(), 1000);
}

function spawnHeartSparkles() {
  for (let i = 0; i < 6; i++) {
    setTimeout(spawnFloatingHeart, i * 80);
  }
}

// Modal de Victoria / Celebración
function openModal() {
  if (!completionModal || !completionBox) return;
  completionModal.classList.remove('pointer-events-none', 'opacity-0');
  completionModal.classList.add('opacity-100');
  completionBox.classList.remove('scale-90');
  completionBox.classList.add('scale-100');
  spawnHeartSparkles();
  playVictoryMelody();
}

function closeModal() {
  if (!completionModal || !completionBox) return;
  completionModal.classList.add('opacity-0', 'pointer-events-none');
  completionModal.classList.remove('opacity-100');
  completionBox.classList.remove('scale-100');
  completionBox.classList.add('scale-90');
}

// Modal de Compartir / Personalizar
function openShareModal() {
  if (!shareModal || !shareBox) return;
  shareModal.classList.remove('pointer-events-none', 'opacity-0');
  shareModal.classList.add('opacity-100');
  shareBox.classList.remove('scale-90');
  shareBox.classList.add('scale-100');
}

function closeShareModal() {
  if (!shareModal || !shareBox) return;
  shareModal.classList.add('opacity-0', 'pointer-events-none');
  shareModal.classList.remove('opacity-100');
  shareBox.classList.remove('scale-100');
  shareBox.classList.add('scale-90');
}

function getGeneratedShareUrl() {
  const inputTo = document.getElementById('input-to');
  const inputFrom = document.getElementById('input-from');
  const toVal = encodeURIComponent(inputTo?.value.trim() || receiverName);
  const fromVal = encodeURIComponent(inputFrom?.value.trim() || senderName);
  
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?to=${toVal}&from=${fromVal}`;
}

function saveAndCopyShareLink() {
  const inputTo = document.getElementById('input-to');
  const inputFrom = document.getElementById('input-from');
  if (inputTo) receiverName = inputTo.value.trim() || CONFIG.defaultReceiver;
  if (inputFrom) senderName = inputFrom.value.trim() || CONFIG.defaultSender;
  
  updateNamesInUI();
  const shareUrl = getGeneratedShareUrl();
  
  navigator.clipboard.writeText(shareUrl).then(() => {
    const feedback = document.getElementById('share-feedback');
    if (feedback) {
      feedback.textContent = "✅ ¡Enlace copiado al portapapeles! Listo para enviar.";
      feedback.classList.add('text-amber-800', 'font-bold');
      setTimeout(() => {
        feedback.textContent = "El enlace guardará los nombres en la URL para abrirlos directamente.";
        feedback.classList.remove('text-amber-800', 'font-bold');
      }, 3500);
    }
  }).catch(() => {
    prompt("Copia tu enlace:", shareUrl);
  });
}

function shareOnWhatsApp() {
  const shareUrl = getGeneratedShareUrl();
  const message = `🌻 Para ti, ${receiverName}: Te he preparado este girasol con todo mi amor. Toca cada pétalo para descubrirlo: ${shareUrl}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
}

// Persistencia en localStorage
function saveProgress() {
  try {
    const data = {
      discovered: Array.from(discoveredPetals),
      current: currentPetalIndex,
    };
    localStorage.setItem('girasol_progress', JSON.stringify(data));
  } catch (e) {
    // Modo privado o storage deshabilitado
  }
}

function loadSavedProgress() {
  try {
    const saved = localStorage.getItem('girasol_progress');
    if (saved) {
      const data = JSON.parse(saved);
      if (Array.isArray(data.discovered)) {
        data.discovered.forEach(id => {
          discoveredPetals.add(id);
          const petal = document.getElementById(`petal-${id}`);
          if (petal) petal.classList.add('is-discovered');
        });
        const count = discoveredPetals.size;
        const percentage = Math.round((count / 12) * 100);
        if (progressBar) progressBar.style.width = `${percentage}%`;
        if (progressText) progressText.textContent = `${count} / 12 pétalos`;
      }
      if (typeof data.current === 'number' && data.current >= 0 && data.current < 12) {
        selectPetal(data.current, false);
      }
    }
  } catch (e) {}
}

function restartProgress() {
  localStorage.removeItem('girasol_progress');
  discoveredPetals.clear();
  currentPetalIndex = null;
  modalTriggered = false;
  
  petalElements.forEach(p => {
    p.classList.remove('is-selected', 'is-discovered');
  });
  
  if (progressBar) progressBar.style.width = '0%';
  if (progressText) progressText.textContent = '0 / 12 pétalos';
  if (tapInstruction) tapInstruction.style.opacity = '1';
  if (cardIcon) cardIcon.textContent = '🌻';
  if (cardTitle) cardTitle.textContent = 'Presiona un pétalo';
  if (cardStep) cardStep.textContent = '12 razones para ti';
  if (petalMessageText) {
    petalMessageText.textContent = '«Cada pétalo de este girasol guarda una razón por la que iluminas mis días. Elige uno para descubrirla...»';
  }
  
  closeModal();
}

// ----------------------------------------------------------------------
// SINTETIZADOR DE AUDIO (Web Audio API: Chimes & Melodía Romántica)
// ----------------------------------------------------------------------

function initAudioContext() {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioContext = new AudioContextClass();
    }
  }
  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume();
  }
}

// Campanilla armónica al pulsar pétalo (Escala Pentatónica Mayor en Fa#/Sol)
function playChimeSound(index = 0) {
  try {
    initAudioContext();
    if (!audioContext) return;

    const pentatonicFrequencies = [
      523.25, // C5
      587.33, // D5
      659.25, // E5
      783.99, // G5
      880.00, // A5
      1046.50, // C6
      1174.66, // D6
      1318.51, // E6
      1567.98, // G6
      1760.00, // A6
      2093.00, // C7
      2349.32  // D7
    ];

    const freq = pentatonicFrequencies[index % pentatonicFrequencies.length];
    const osc = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioContext.currentTime);

    gainNode.gain.setValueAtTime(0.01, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.25, audioContext.currentTime + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1.2);

    osc.connect(gainNode);
    gainNode.connect(audioContext.destination);

    osc.start();
    osc.stop(audioContext.currentTime + 1.2);
  } catch (e) {}
}

// Acorde de victoria / completado
function playVictoryMelody() {
  try {
    initAudioContext();
    if (!audioContext) return;

    const chords = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    chords.forEach((freq, i) => {
      setTimeout(() => {
        const osc = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.01, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.18, audioContext.currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1.8);
        osc.connect(gainNode);
        gainNode.connect(audioContext.destination);
        osc.start();
        osc.stop(audioContext.currentTime + 1.8);
      }, i * 140);
    });
  } catch (e) {}
}

// Melodía ambiental suave sintetizada en bucle
function toggleRomanticMusic() {
  initAudioContext();
  if (isMusicPlaying) {
    stopRomanticMelody();
  } else {
    startRomanticMelody();
  }
}

function startRomanticMelody() {
  isMusicPlaying = true;
  if (musicLabel) musicLabel.textContent = "Pausa";
  if (musicIcon) musicIcon.classList.add('animate-spin-slow');

  // Secuencia armónica suave estilo caja de música
  const notes = [
    { f: 440.00, d: 0.8 }, { f: 554.37, d: 0.8 }, { f: 659.25, d: 1.2 },
    { f: 554.37, d: 0.8 }, { f: 739.99, d: 1.2 }, { f: 659.25, d: 1.4 },
    { f: 493.88, d: 0.8 }, { f: 587.33, d: 0.8 }, { f: 739.99, d: 1.2 },
    { f: 880.00, d: 1.6 }
  ];

  let noteIndex = 0;

  function playNextAmbientNote() {
    if (!isMusicPlaying || !audioContext) return;
    const note = notes[noteIndex];
    noteIndex = (noteIndex + 1) % notes.length;

    try {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.f, audioContext.currentTime);

      gain.gain.setValueAtTime(0.001, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, audioContext.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + note.d);

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.start();
      osc.stop(audioContext.currentTime + note.d);
    } catch (e) {}
  }

  playNextAmbientNote();
  melodyInterval = setInterval(playNextAmbientNote, 1100);
}

function stopRomanticMelody() {
  isMusicPlaying = false;
  if (melodyInterval) {
    clearInterval(melodyInterval);
    melodyInterval = null;
  }
  if (musicLabel) musicLabel.textContent = "Música";
  if (musicIcon) musicIcon.classList.remove('animate-spin-slow');
}

// ----------------------------------------------------------------------
// EFECTO DE CELEBRACIÓN CON CANVAS (Confetti de corazones y pétalos)
// ----------------------------------------------------------------------
let canvas, ctx;
let particles = [];
let animFrameId = null;

function setupCanvas() {
  canvas = document.getElementById('celebration-canvas');
  if (!canvas) return;
  ctx = canvas.getContext('2d');
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function triggerCelebrationEffect() {
  if (!canvas || !ctx) return;
  particles = [];
  const count = 75;
  const colors = ['#f59e0b', '#fbbf24', '#fde047', '#ea580c', '#f43f5e', '#ffffff'];

  for (let i = 0; i < count; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.7) * 15,
      size: Math.random() * 12 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 8,
      type: Math.random() > 0.4 ? 'heart' : 'sparkle'
    });
  }

  if (!animFrameId) {
    renderCelebration();
  }
}

function renderCelebration() {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let activeParticles = 0;

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.28; // Gravedad
    p.vx *= 0.98; // Fricción
    p.rotation += p.vRot;
    p.alpha -= 0.009;

    if (p.alpha > 0) {
      activeParticles++;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillStyle = p.color;

      if (p.type === 'heart') {
        ctx.font = `${p.size}px serif`;
        ctx.fillText('💛', -p.size / 2, p.size / 2);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  });

  if (activeParticles > 0) {
    animFrameId = requestAnimationFrame(renderCelebration);
  } else {
    animFrameId = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}
