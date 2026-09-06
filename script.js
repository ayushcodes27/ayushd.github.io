// 1. Intersection Observer (Scroll Animations)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 2. Active Nav Dot (Highlight Current Section)
const sections = document.querySelectorAll('.section');
const navDots = document.querySelectorAll('.nav-dot');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navDots.forEach(dot => dot.classList.remove('active'));
      const activeId = entry.target.id;
      const activeDot = document.querySelector(`.nav-dot[href="#${activeId}"]`);
      if (activeDot) activeDot.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));

// 3. Smooth Page Wipe Transition
const wipe = document.getElementById('wipe-transition');

document.querySelectorAll('.nav-dot').forEach(dot => {
  dot.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(dot.getAttribute('href'));
    if (target) {
      wipe.classList.add('active');
      wipe.classList.remove('finish');
      
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'auto', block: 'start' });
        wipe.classList.remove('active');
        wipe.classList.add('finish');
      }, 400);
    }
  });
});

// 4. Spencer 3D Arc Carousel Engine (with Trackpad Wheel & Touch Swipe)
let activeCardIndex = 0;
const cards = document.querySelectorAll('.arc-card');
const pillBtn = document.getElementById('arc-pill-btn');
const prevBtn = document.getElementById('arc-prev');
const nextBtn = document.getElementById('arc-next');
const track = document.getElementById('arc-track');
const carouselWrapper = document.querySelector('.arc-carousel-wrapper');

const projectTitles = [
  'REACT AGENT',
  'MED-BOT',
  'ARCADE ROOM'
];

function updateArcCarousel() {
  if (!cards || cards.length === 0) return;
  const total = cards.length;
  
  cards.forEach((card, idx) => {
    card.classList.remove('active', 'left-card', 'right-card');
    
    // Calculate relative diff to active index
    const diff = (idx - activeCardIndex + total) % total;
    
    if (diff === 0) {
      card.classList.add('active');
    } else if (diff === 1 || diff === -(total - 1)) {
      card.classList.add('right-card');
    } else {
      card.classList.add('left-card');
    }
  });

  // Update dynamic pill button label
  if (pillBtn && projectTitles[activeCardIndex]) {
    pillBtn.innerText = projectTitles[activeCardIndex];
  }
}

if (cards.length > 0) {
  // Click on cards
  cards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      activeCardIndex = idx;
      updateArcCarousel();
    });
  });

  // Nav arrow buttons (secondary)
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      activeCardIndex = (activeCardIndex - 1 + cards.length) % cards.length;
      updateArcCarousel();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      activeCardIndex = (activeCardIndex + 1) % cards.length;
      updateArcCarousel();
    });
  }

  // Trackpad / Mouse Wheel Swipe Navigation (Two-Finger Slide)
  let isWheelThrottled = false;
  if (carouselWrapper) {
    carouselWrapper.addEventListener('wheel', (e) => {
      // Determine dominant swipe direction (deltaX for horizontal trackpad, deltaY for shift+scroll)
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

      if (Math.abs(delta) > 12 && !isWheelThrottled) {
        isWheelThrottled = true;
        if (delta > 0) {
          activeCardIndex = (activeCardIndex + 1) % cards.length;
        } else {
          activeCardIndex = (activeCardIndex - 1 + cards.length) % cards.length;
        }
        updateArcCarousel();

        // Lock for 450ms so a single flick only steps 1 card over
        setTimeout(() => {
          isWheelThrottled = false;
        }, 450);
      }
    }, { passive: true });
  }

  // Mobile Touch Swipe support
  let touchStartX = 0;
  if (track) {
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diffX = touchStartX - touchEndX;
      
      if (Math.abs(diffX) > 40) {
        if (diffX > 0) {
          activeCardIndex = (activeCardIndex + 1) % cards.length;
        } else {
          activeCardIndex = (activeCardIndex - 1 + cards.length) % cards.length;
        }
        updateArcCarousel();
      }
    }, { passive: true });
  }

  updateArcCarousel();
}

// 5. Hide Loader
window.addEventListener('load', () => {
  const loader = document.getElementById('loader-wrapper');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 500);
  }
  initBrickBreaker();
  initHexFall();
  initCustomVibingAvatar();
});

// Custom 2D Interactive Vibing Developer Engine
function initCustomVibingAvatar() {
  const canvas = document.getElementById('hero-vibing-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const wrapper = document.getElementById('hero-avatar-wrapper');
  const vibeBadge = document.getElementById('vibe-badge');

  let time = 0;
  let mouse = { x: canvas.width / 2, y: canvas.height / 2, targetX: canvas.width / 2, targetY: canvas.height / 2 };
  
  // Vibe Color Palettes
  const vibeModes = [
    { name: '🎵 VIBING MODE: SYNTHWAVE', primary: '#ff2a8d', secondary: '#00ffff', accent: '#ffe600', codeColor: '#39ff14' },
    { name: '⚡ VIBING MODE: CYBERPUNK', primary: '#39ff14', secondary: '#ff2a8d', accent: '#00ffff', codeColor: '#00ffff' },
    { name: '☕ VIBING MODE: LO-FI BEATS', primary: '#ffe600', secondary: '#ff7b00', accent: '#d0a6ff', codeColor: '#ff2a8d' }
  ];
  let currentVibeIdx = 0;

  if (wrapper) {
    wrapper.addEventListener('click', () => {
      currentVibeIdx = (currentVibeIdx + 1) % vibeModes.length;
      if (vibeBadge) vibeBadge.innerText = vibeModes[currentVibeIdx].name;
      
      // Spawn burst of music particles on vibe change
      for (let i = 0; i < 8; i++) {
        spawnMusicParticle(canvas.width / 2 + (Math.random() - 0.5) * 100, 150);
      }
    });

    wrapper.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    });

    wrapper.addEventListener('mouseleave', () => {
      mouse.targetX = canvas.width / 2;
      mouse.targetY = canvas.height / 2;
    });
  }

  // Floating Music Notes Particles
  let musicParticles = [];
  const noteSymbols = ['🎵', '🎶', '✨', '⚡', '♫', '🎹'];

  function spawnMusicParticle(x, y) {
    musicParticles.push({
      x: x + (Math.random() - 0.5) * 30,
      y: y,
      symbol: noteSymbols[Math.floor(Math.random() * noteSymbols.length)],
      vx: (Math.random() - 0.5) * 1.5,
      vy: -1.8 - Math.random() * 1.5,
      opacity: 1,
      size: 14 + Math.random() * 10,
      rot: (Math.random() - 0.5) * 0.4
    });
  }

  function render() {
    time += 0.04;

    // Smooth mouse interpolation
    mouse.x += (mouse.targetX - mouse.x) * 0.08;
    mouse.y += (mouse.targetY - mouse.y) * 0.08;

    const palette = vibeModes[currentVibeIdx];
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const baseHeadY = 175;

    // Rhythmic Head & Body Bobbing
    const headBobY = Math.sin(time * 4) * 7;
    const bodyBobY = Math.sin(time * 4) * 3;
    const headTilt = Math.cos(time * 2) * 0.04;

    // Periodically spawn music particles from headphones
    if (Math.random() < 0.07) {
      const isLeft = Math.random() > 0.5;
      spawnMusicParticle(isLeft ? centerX - 75 : centerX + 75, baseHeadY + headBobY - 10);
    }

    // 1. Background Aura Glow & Soundwaves
    const glowGradient = ctx.createRadialGradient(centerX, baseHeadY + headBobY, 20, centerX, baseHeadY, 180);
    glowGradient.addColorStop(0, palette.primary + '33');
    glowGradient.addColorStop(0.5, palette.secondary + '15');
    glowGradient.addColorStop(1, 'transparent');
    ctx.fillStyle = glowGradient;
    ctx.beginPath();
    ctx.arc(centerX, baseHeadY, 190, 0, Math.PI * 2);
    ctx.fill();

    // Equalizer Soundwaves radiating in background
    ctx.save();
    ctx.strokeStyle = palette.secondary + '44';
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
      const r = 110 + i * 25 + Math.sin(time * 5 + i) * 6;
      ctx.beginPath();
      ctx.arc(centerX, baseHeadY + headBobY * 0.5, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();

    // 2. Desk & Laptop Setup
    const deskY = 320;
    
    // Desk Surface
    ctx.fillStyle = '#1c0733';
    ctx.beginPath();
    ctx.roundRect(40, deskY, 370, 70, 16);
    ctx.fill();
    ctx.strokeStyle = palette.primary + '66';
    ctx.lineWidth = 2;
    ctx.stroke();

    // RGB Desk Mat Glow
    ctx.fillStyle = palette.secondary + '33';
    ctx.fillRect(80, deskY + 5, 290, 4);

    // Laptop Base & RGB Keyboard
    const laptopX = centerX - 85;
    const laptopY = deskY - 10;
    const laptopW = 170;
    const laptopH = 14;

    ctx.fillStyle = '#2d124d';
    ctx.beginPath();
    ctx.roundRect(laptopX, laptopY, laptopW, laptopH, [4, 4, 10, 10]);
    ctx.fill();

    // Glowing RGB Keys
    for (let k = 0; k < 7; k++) {
      const keyHue = (time * 100 + k * 40) % 360;
      ctx.fillStyle = `hsla(${keyHue}, 100%, 65%, 0.8)`;
      ctx.fillRect(laptopX + 25 + k * 18, laptopY + 3, 14, 5);
    }

    // Laptop Screen Open
    const screenX = laptopX + 15;
    const screenY = laptopY - 75;
    const screenW = 140;
    const screenH = 75;

    ctx.fillStyle = '#0a0014';
    ctx.beginPath();
    ctx.roundRect(screenX, screenY, screenW, screenH, 8);
    ctx.fill();
    ctx.strokeStyle = palette.primary;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Screen Code Lines Animation
    ctx.fillStyle = palette.codeColor;
    ctx.font = '10px "JetBrains Mono", monospace';
    const codeLines = [
      'const ai = new Agent();',
      'ai.listenToMusic();',
      'ai.code({ vibe: true });',
      '// 🚀 Building future'
    ];
    codeLines.forEach((line, idx) => {
      const lineY = screenY + 18 + idx * 15;
      const alpha = 0.5 + Math.sin(time * 4 + idx) * 0.4;
      ctx.globalAlpha = alpha;
      ctx.fillText(line, screenX + 10, lineY);
    });
    ctx.globalAlpha = 1;

    // Back of Screen Logo Glow
    ctx.fillStyle = palette.accent;
    ctx.beginPath();
    ctx.arc(centerX, screenY + 38, 6, 0, Math.PI * 2);
    ctx.fill();

    // 3. Body & Hoodie
    const bodyY = 240 + bodyBobY;
    
    // Cyber Hoodie Base
    ctx.fillStyle = '#1b0533';
    ctx.beginPath();
    ctx.moveTo(centerX - 70, deskY + 10);
    ctx.lineTo(centerX - 55, bodyY + 30);
    ctx.quadraticCurveTo(centerX, bodyY + 15, centerX + 55, bodyY + 30);
    ctx.lineTo(centerX + 70, deskY + 10);
    ctx.closePath();
    ctx.fill();

    // Hoodie Collar Accent
    ctx.strokeStyle = palette.primary;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(centerX - 35, bodyY + 35);
    ctx.lineTo(centerX, bodyY + 55);
    ctx.lineTo(centerX + 35, bodyY + 35);
    ctx.stroke();

    // Hands on Keyboard
    ctx.fillStyle = '#f5c6a5';
    ctx.beginPath();
    ctx.arc(laptopX + 35 + Math.sin(time * 8) * 3, laptopY + 2, 8, 0, Math.PI * 2);
    ctx.arc(laptopX + 135 + Math.cos(time * 8) * 3, laptopY + 2, 8, 0, Math.PI * 2);
    ctx.fill();

    // 4. Head & Face (Rotated with headTilt)
    ctx.save();
    ctx.translate(centerX, baseHeadY + headBobY);
    ctx.rotate(headTilt);

    // Neck
    ctx.fillStyle = '#e8b493';
    ctx.fillRect(-15, 45, 30, 25);

    // Head Base
    ctx.fillStyle = '#f5c6a5';
    ctx.beginPath();
    ctx.roundRect(-42, -45, 84, 90, 36);
    ctx.fill();

    // Cool Hair (Stylized Cyber Cut)
    ctx.fillStyle = '#210038';
    ctx.beginPath();
    ctx.moveTo(-45, -25);
    ctx.quadraticCurveTo(-40, -65, 0, -65);
    ctx.quadraticCurveTo(40, -65, 45, -25);
    ctx.quadraticCurveTo(20, -45, 0, -45);
    ctx.quadraticCurveTo(-20, -45, -45, -25);
    ctx.fill();

    // Front Hair Bangs
    ctx.beginPath();
    ctx.moveTo(-35, -42);
    ctx.lineTo(-20, -25);
    ctx.lineTo(-10, -40);
    ctx.lineTo(5, -22);
    ctx.lineTo(20, -38);
    ctx.lineTo(35, -25);
    ctx.lineTo(40, -42);
    ctx.closePath();
    ctx.fill();

    // Glasses Frame
    ctx.strokeStyle = palette.secondary;
    ctx.lineWidth = 3.5;
    ctx.fillStyle = 'rgba(15, 0, 30, 0.7)';
    
    // Left Lens
    ctx.beginPath();
    ctx.roundRect(-34, -12, 30, 22, 6);
    ctx.fill();
    ctx.stroke();

    // Right Lens
    ctx.beginPath();
    ctx.roundRect(4, -12, 30, 22, 6);
    ctx.fill();
    ctx.stroke();

    // Glasses Bridge
    ctx.beginPath();
    ctx.moveTo(-4, -4);
    ctx.lineTo(4, -4);
    ctx.stroke();

    // Mouse Tracking Pupils inside Glasses
    const eyeTargetDx = (mouse.x - centerX) / 18;
    const eyeTargetDy = (mouse.y - (baseHeadY + headBobY)) / 18;
    const pupilX = Math.max(-5, Math.min(5, eyeTargetDx));
    const pupilY = Math.max(-4, Math.min(4, eyeTargetDy));

    ctx.fillStyle = palette.primary;
    ctx.beginPath();
    ctx.arc(-19 + pupilX, -1 + pupilY, 4, 0, Math.PI * 2);
    ctx.arc(19 + pupilX, -1 + pupilY, 4, 0, Math.PI * 2);
    ctx.fill();

    // Glasses Glint / Reflection
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-30, -9);
    ctx.lineTo(-20, -3);
    ctx.moveTo(8, -9);
    ctx.lineTo(18, -3);
    ctx.stroke();

    // Happy Vibing Smile
    ctx.strokeStyle = '#8a3c26';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(0, 18, 10, 0.1 * Math.PI, 0.9 * Math.PI);
    ctx.stroke();

    // 5. Over-Ear Headphones with Pulsing Equalizer
    // Band
    ctx.strokeStyle = palette.primary;
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(0, -10, 48, 1.05 * Math.PI, 1.95 * Math.PI);
    ctx.stroke();

    // Earcups
    ctx.fillStyle = '#17002b';
    ctx.strokeStyle = palette.secondary;
    ctx.lineWidth = 3;

    // Left Earcup
    ctx.beginPath();
    ctx.roundRect(-56, -22, 18, 44, 10);
    ctx.fill();
    ctx.stroke();

    // Right Earcup
    ctx.beginPath();
    ctx.roundRect(38, -22, 18, 44, 10);
    ctx.fill();
    ctx.stroke();

    // Animated Earcup Equalizer Bars inside headphones
    for (let b = 0; b < 3; b++) {
      const barH1 = 8 + Math.sin(time * 12 + b * 2) * 6;
      const barH2 = 8 + Math.cos(time * 12 + b * 2) * 6;

      ctx.fillStyle = palette.accent;
      ctx.fillRect(-51 + b * 4, -barH1 / 2, 2.5, barH1);
      ctx.fillRect(43 + b * 4, -barH2 / 2, 2.5, barH2);
    }

    ctx.restore(); // Restore head transform

    // 6. Draw Floating Music Particles
    musicParticles.forEach((p, idx) => {
      p.x += p.vx + Math.sin(time * 3 + idx) * 0.5;
      p.y += p.vy;
      p.opacity -= 0.012;

      if (p.opacity <= 0) {
        musicParticles.splice(idx, 1);
      } else {
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.font = `${p.size}px sans-serif`;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillText(p.symbol, 0, 0);
        ctx.restore();
      }
    });

    requestAnimationFrame(render);
  }

  render();
}

// 6. Arcade Modal Trigger
const openArcadeBtn = document.getElementById('open-arcade-btn');
const closeArcadeBtn = document.getElementById('close-arcade-btn');
const arcadeModal = document.getElementById('arcade-modal');

if(openArcadeBtn && closeArcadeBtn && arcadeModal) {
  openArcadeBtn.addEventListener('click', () => {
    arcadeModal.classList.remove('hidden');
  });
  closeArcadeBtn.addEventListener('click', () => {
    arcadeModal.classList.add('hidden');
  });
}

// ==========================================
// GAME ENGINES
// ==========================================

// Game 1: Retro Brick Breaker
function initBrickBreaker() {
  const canvas = document.getElementById('brickBreakerCanvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const scoreEl = document.getElementById('bb-score');
  let score = 0;
  let running = false;

  let paddle = { x: 360, y: 380, w: 80, h: 10 };
  let balls = [{ x: 400, y: 370, dx: 3, dy: -3, r: 6 }];
  let bricks = [];
  
  function createBricks() {
    bricks = [];
    const cols = 10;
    const rows = 4;
    const padding = 10;
    const w = 70;
    const h = 20;
    const startX = 5;
    for(let c=0; c<cols; c++) {
      for(let r=0; r<rows; r++) {
        bricks.push({x: startX + c*(w+padding), y: r*(h+padding) + 30, w: w, h: h, status: 1});
      }
    }
  }

  function draw() {
    if(!running) return;
    ctx.clearRect(0,0, canvas.width, canvas.height);
    
    // Paddle
    ctx.fillStyle = '#39FF14';
    ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);

    // Bricks
    let allCleared = true;
    bricks.forEach(b => {
      if(b.status === 1) {
        allCleared = false;
        ctx.fillStyle = '#00FFFF';
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.strokeStyle = '#111';
        ctx.lineWidth = 2;
        ctx.strokeRect(b.x, b.y, b.w, b.h);
      }
    });

    if(allCleared) createBricks();

    // Balls
    ctx.fillStyle = '#FF1493';
    balls.forEach((ball, idx) => {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI*2);
      ctx.fill();

      // move
      ball.x += ball.dx;
      ball.y += ball.dy;

      // Wall collision
      if(ball.x + ball.dx > canvas.width-ball.r || ball.x + ball.dx < ball.r) ball.dx = -ball.dx;
      if(ball.y + ball.dy < ball.r) ball.dy = -ball.dy;
      else if(ball.y + ball.dy > canvas.height-ball.r) {
        if(ball.x > paddle.x && ball.x < paddle.x + paddle.w) {
          // Bounce off paddle
          ball.dy = -Math.abs(ball.dy); // ensure going up
          
          // Powerup Drop simulation (Split ball at score 50)
          if(score >= 50 && balls.length === 1) {
            balls.push({x: ball.x, y: ball.y, dx: -ball.dx, dy: ball.dy, r: ball.r});
            paddle.w = 120; // Expanded paddle
          }
        } else {
          balls.splice(idx, 1);
        }
      }

      // Brick collision
      bricks.forEach(b => {
        if(b.status === 1) {
          if(ball.x > b.x && ball.x < b.x+b.w && ball.y > b.y && ball.y < b.y+b.h) {
            ball.dy = -ball.dy;
            b.status = 0;
            score += 10;
            scoreEl.innerText = score;
          }
        }
      });
    });

    if(balls.length === 0) {
      running = false;
      document.getElementById('bb-overlay').classList.remove('hidden');
      document.getElementById('bb-start').innerText = 'Game Over';
    } else {
      requestAnimationFrame(draw);
    }
  }

  document.getElementById('bb-start').addEventListener('click', () => {
    document.getElementById('bb-overlay').classList.add('hidden');
    score = 0;
    scoreEl.innerText = score;
    paddle.w = 80;
    balls = [{ x: 400, y: 370, dx: 3, dy: -3, r: 6 }];
    createBricks();
    running = true;
    draw();
  });

  // Controls
  function movePaddle(clientX) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = clientX - rect.left;
    paddle.x = mouseX - paddle.w/2;
    if(paddle.x < 0) paddle.x = 0;
    if(paddle.x + paddle.w > canvas.width) paddle.x = canvas.width - paddle.w;
  }
  
  canvas.addEventListener('mousemove', (e) => movePaddle(e.clientX));
  canvas.addEventListener('touchmove', (e) => movePaddle(e.touches[0].clientX));
}

// Game 2: Color-Match Hexagon Fall
function initHexFall() {
  const canvas = document.getElementById('hexFallCanvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const scoreEl = document.getElementById('hf-score');
  let score = 0;
  let running = false;
  
  let hexAngle = 0;
  const colors = ['#39FF14', '#00FFFF', '#FF1493', '#FFE600', '#B026FF', '#fff'];
  let fallingShapes = [];
  let frameCount = 0;

  function drawHexagon(x, y, r, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(r * Math.cos(i * Math.PI / 3), r * Math.sin(i * Math.PI / 3));
      ctx.lineTo(r * Math.cos((i+1) * Math.PI / 3), r * Math.sin((i+1) * Math.PI / 3));
      ctx.closePath();
      ctx.fillStyle = colors[i];
      ctx.fill();
      ctx.strokeStyle = '#111';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    ctx.restore();
  }

  function draw() {
    if(!running) return;
    ctx.clearRect(0,0, canvas.width, canvas.height);
    
    frameCount++;
    if(frameCount % 50 === 0) {
      fallingShapes.push({
        y: -20, 
        colorIdx: Math.floor(Math.random() * 6),
        speed: 2 + score/100
      });
    }

    fallingShapes.forEach((s, idx) => {
      s.y += s.speed;
      ctx.fillStyle = colors[s.colorIdx];
      ctx.fillRect(190, s.y, 20, 20);
      ctx.strokeRect(190, s.y, 20, 20);

      // Collision with center hex (radius 50)
      if(s.y > 140) { 
        // Determine which color is currently facing up
        // Base top index is 4. Each Math.PI/3 rotation shifts the index.
        let angleRotations = Math.round(hexAngle / (Math.PI/3));
        let currentTopIdx = (4 - angleRotations) % 6;
        if(currentTopIdx < 0) currentTopIdx += 6;
        
        if(currentTopIdx === s.colorIdx) {
          score += 10;
          scoreEl.innerText = score;
          fallingShapes.splice(idx, 1);
          
          // Screen shake combo effect logic placeholder
          if(score % 50 === 0) {
             canvas.style.transform = 'translate(5px, 5px)';
             setTimeout(() => canvas.style.transform = 'translate(0, 0)', 50);
          }
        } else {
          running = false;
          document.getElementById('hf-overlay').classList.remove('hidden');
          document.getElementById('hf-start').innerText = 'Game Over';
        }
      }
    });

    drawHexagon(200, 200, 50, hexAngle);

    if(running) requestAnimationFrame(draw);
  }

  document.getElementById('hf-start').addEventListener('click', () => {
    document.getElementById('hf-overlay').classList.add('hidden');
    score = 0;
    scoreEl.innerText = score;
    fallingShapes = [];
    hexAngle = 0;
    frameCount = 0;
    running = true;
    draw();
  });

  // Controls
  canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    if(cx < canvas.width/2) hexAngle -= Math.PI/3; // Left side click
    else hexAngle += Math.PI/3; // Right side click
  });
  
  window.addEventListener('keydown', (e) => {
    if(!running) return;
    if(e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') hexAngle -= Math.PI/3;
    if(e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') hexAngle += Math.PI/3;
  });
}
