// 1. Staggered Bounce Reveal for Title
const titleElements = document.querySelectorAll('.hero-title .line');

titleElements.forEach((line) => {
  const textContent = line.textContent.trim();
  if (!line.classList.contains('name-highlight')) {
    line.innerHTML = '';
    textContent.split('').forEach((char) => {
      const span = document.createElement('span');
      span.className = 'char-bounce';
      span.textContent = char === ' ' ? '\u00A0' : char;
      line.appendChild(span);
    });
  } else {
    line.innerHTML = '';
    textContent.split('').forEach((char) => {
      const span = document.createElement('span');
      span.className = 'char-bounce';
      span.textContent = char === ' ' ? '\u00A0' : char;
      line.appendChild(span);
    });
  }
});

// 2. Physics Engine Initialization (Matter.js)
let engineInit = false;
function initPhysics() {
  if (engineInit) return;
  if (typeof Matter === 'undefined') return; // Ensure Matter is loaded
  engineInit = true;

  const Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Composite = Matter.Composite,
        Events = Matter.Events,
        Body = Matter.Body,
        Bodies = Matter.Bodies;

  const engine = Engine.create();
  engine.gravity.y = 0;
  engine.gravity.x = 0;

  const container = document.getElementById('physics-container');
  container.classList.add('physics-active');
  
  let ground, leftWall, rightWall, topWall;

  function updateWalls() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    const wallThickness = 100;
    const padding = 0;

    if (ground) Composite.remove(engine.world, [ground, leftWall, rightWall, topWall]);

    ground = Bodies.rectangle(width / 2, height + wallThickness / 2 - padding, width, wallThickness, { isStatic: true });
    topWall = Bodies.rectangle(width / 2, -wallThickness / 2 + padding, width, wallThickness, { isStatic: true });
    leftWall = Bodies.rectangle(-wallThickness / 2 + padding, height / 2, wallThickness, height, { isStatic: true });
    rightWall = Bodies.rectangle(width + wallThickness / 2 - padding, height / 2, wallThickness, height, { isStatic: true });

    Composite.add(engine.world, [ground, leftWall, rightWall, topWall]);
  }

  updateWalls();
  window.addEventListener('resize', updateWalls);

  const tags = document.querySelectorAll('.physics-tag');
  const bodies = [];

  tags.forEach((tag) => {
    tag.classList.add('physics-active');
    const tw = tag.offsetWidth;
    const th = tag.offsetHeight;
    
    // Start them around the center
    const body = Bodies.rectangle(
      Math.random() * (container.clientWidth - tw) + tw/2,
      Math.random() * (container.clientHeight - th) + th/2,
      tw, th,
      {
        restitution: 0.9,
        friction: 0.05,
        frictionAir: 0.02
      }
    );
    bodies.push({ element: tag, body: body, w: tw, h: th });
    Composite.add(engine.world, body);
  });

  const mouse = Mouse.create(container);
  const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
          stiffness: 0.2,
          render: { visible: false }
      }
  });
  Composite.add(engine.world, mouseConstraint);

  Events.on(engine, 'beforeUpdate', () => {
    bodies.forEach(b => {
      const body = b.body;
      if (body !== mouseConstraint.body) {
        const driftY = -0.0002; 
        const swayX = (Math.random() - 0.5) * 0.0001; 
        
        Body.applyForce(body, body.position, { x: swayX, y: driftY });
        
        if (Math.abs(body.angularVelocity) > 0.02) {
          Body.setAngularVelocity(body, body.angularVelocity * 0.95);
        }
      }
    });
  });

  Runner.run(Runner.create(), engine);

  (function render() {
      bodies.forEach(b => {
          const { x, y } = b.body.position;
          const angle = b.body.angle;
          // Apply transforms to DOM elements based on physics simulation
          b.element.style.transform = `translate(${x - b.w/2}px, ${y - b.h/2}px) rotate(${angle}rad)`;
      });
      requestAnimationFrame(render);
  })();
}

// 3. Intersection Observer (Scroll Animations)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // If this is the hero section, stagger the characters
      if (entry.target.id === 'hero') {
        const chars = entry.target.querySelectorAll('.char-bounce');
        chars.forEach((char, index) => {
          char.style.animationDelay = `${index * 0.05}s`;
          char.classList.add('visible');
        });
      }

      // Initialize physics when tech stack comes into view
      if (entry.target.id === 'physics-container') {
        initPhysics();
      }

      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.reveal, .draw-in, #hero, #physics-container').forEach(el => observer.observe(el));

// 4. Active Nav Dot (Highlight Current Section)
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

// 5. Comic Book Panel Wipe Transition
const wipe = document.getElementById('wipe-transition');

document.querySelectorAll('.nav-dot').forEach(dot => {
  dot.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(dot.getAttribute('href'));
    if (target) {
      // Trigger wipe animation
      wipe.classList.add('active');
      wipe.classList.remove('finish');
      
      setTimeout(() => {
        // Scroll instantly behind the wipe
        target.scrollIntoView({ behavior: 'auto', block: 'start' });
        // Slide out
        wipe.classList.remove('active');
        wipe.classList.add('finish');
      }, 400); // Wait 400ms for wipe to cover screen
    }
  });
});

// 6. Calculate path lengths for draw animations
document.querySelectorAll('.draw-in path').forEach(path => {
    const length = path.getTotalLength();
    path.parentElement.style.setProperty('--path-length', length);
});

// 7. Brutalist Magnetic Cursor & Trail
const colors = ['#39FF14', '#00FFFF', '#B026FF', '#FF1493', '#FFE600'];
let lastTrailTime = 0;

const cursorRing = document.createElement('div');
cursorRing.className = 'cursor-ring';
document.body.appendChild(cursorRing);

document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  
  // Magnetic Ring Logic
  const interactables = document.querySelectorAll('.brutalist-interactive, .nav-dot, .project-card');
  let isHovering = false;
  let targetNode = null;
  
  interactables.forEach(el => {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
    if (dist < 80) { // Activation radius
      isHovering = true;
      targetNode = { x: cx, y: cy };
    }
  });

  if (isHovering && targetNode) {
    cursorRing.classList.add('magnetic');
    cursorRing.style.left = targetNode.x + 'px';
    cursorRing.style.top = targetNode.y + 'px';
  } else {
    cursorRing.classList.remove('magnetic');
    cursorRing.style.left = e.clientX + 'px';
    cursorRing.style.top = e.clientY + 'px';
  }

  // Trail Logic
  if (now - lastTrailTime >= 50) {
    lastTrailTime = now;
    const dot = document.createElement('div');
    dot.className = 'cursor-trail-dot';
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    dot.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
    dot.style.setProperty('--size', (Math.random() * 10 + 6) + 'px');
    
    dot.style.transform = `translate(-50%, -50%) rotate(${Math.floor(Math.random() * 45)}deg)`;
    
    document.body.appendChild(dot);
    setTimeout(() => dot.remove(), 600);
  }
});

// 8. Hide Loader
window.addEventListener('load', () => {
  const loader = document.getElementById('loader-wrapper');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 500);
  }
  initBrickBreaker();
  initHexFall();
});

// 8.5 Arcade Modal Logic
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
