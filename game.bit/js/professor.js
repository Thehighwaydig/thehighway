// ========== PROFESSOR BIT - PIXEL ART ENGINE ==========

const PROF_COLORS = {
  skin: '#f4c88a',
  hair: '#2a1800',
  shirt: '#0044aa',
  pants: '#1a1a1a',
  glasses: '#00ff41',
  mouth: '#cc6644',
  eyes: '#000',
  shadow: '#c09960',
  shirt2: '#0033cc',
  tie: '#cc0000',
  shoes: '#111'
};

// Professor expressions
const EXPRESSIONS = {
  happy:    { eyeY: 0, mouthType: 'smile', eyebrowY: -1 },
  excited:  { eyeY: -1, mouthType: 'open', eyebrowY: -2 },
  teach:    { eyeY: 0, mouthType: 'talk', eyebrowY: 0 },
  proud:    { eyeY: 0, mouthType: 'bigsmile', eyebrowY: -2 },
  thinking: { eyeY: 1, mouthType: 'hmm', eyebrowY: 1 },
  stern:    { eyeY: 0, mouthType: 'flat', eyebrowY: 2 },
  wow:      { eyeY: -2, mouthType: 'O', eyebrowY: -3 },
  sad:      { eyeY: 1, mouthType: 'frown', eyebrowY: 2 }
};

let profAnimFrame = 0;
let profAnimTimer = null;
let profExpression = 'happy';

function drawProfessor(canvasId, scale = 1, expression = 'happy') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const S = scale;
  const W = canvas.width;
  const H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  ctx.imageSmoothingEnabled = false;

  const exp = EXPRESSIONS[expression] || EXPRESSIONS.happy;
  const bounce = Math.sin(profAnimFrame * 0.08) * 1.5 * S;
  const px = W / 2;
  const py = 10 * S + bounce;

  // ===== BODY =====
  // Legs
  ctx.fillStyle = PROF_COLORS.pants;
  ctx.fillRect(px - 12*S, py + 70*S, 9*S, 25*S);
  ctx.fillRect(px + 3*S, py + 70*S, 9*S, 25*S);
  // Shoes
  ctx.fillStyle = PROF_COLORS.shoes;
  ctx.fillRect(px - 14*S, py + 93*S, 12*S, 5*S);
  ctx.fillRect(px + 2*S, py + 93*S, 12*S, 5*S);

  // Shirt body
  ctx.fillStyle = PROF_COLORS.shirt;
  ctx.fillRect(px - 15*S, py + 40*S, 30*S, 33*S);
  // Shirt highlight
  ctx.fillStyle = PROF_COLORS.shirt2;
  ctx.fillRect(px - 13*S, py + 42*S, 5*S, 30*S);

  // Tie
  ctx.fillStyle = PROF_COLORS.tie;
  ctx.fillRect(px - 2*S, py + 42*S, 5*S, 22*S);
  ctx.fillRect(px - 4*S, py + 60*S, 9*S, 6*S);

  // Arms
  ctx.fillStyle = PROF_COLORS.shirt;
  // Left arm (waving slightly)
  const armWave = Math.sin(profAnimFrame * 0.12) * 3 * S;
  ctx.fillRect(px - 22*S, py + 42*S + armWave, 9*S, 25*S);
  ctx.fillRect(px + 14*S, py + 42*S - armWave, 9*S, 25*S);
  // Hands
  ctx.fillStyle = PROF_COLORS.skin;
  ctx.fillRect(px - 23*S, py + 65*S + armWave, 11*S, 8*S);
  ctx.fillRect(px + 13*S, py + 65*S - armWave, 11*S, 8*S);
  // Pointer in right hand
  if (expression === 'teach') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 22*S, py + 50*S - armWave, 3*S, 20*S);
  }

  // ===== HEAD =====
  // Shadow under head
  ctx.fillStyle = PROF_COLORS.shadow;
  ctx.fillRect(px - 14*S, py + 36*S, 28*S, 5*S);

  // Main head
  ctx.fillStyle = PROF_COLORS.skin;
  ctx.fillRect(px - 13*S, py + 8*S, 26*S, 30*S);

  // Hair top
  ctx.fillStyle = PROF_COLORS.hair;
  ctx.fillRect(px - 14*S, py + 4*S, 28*S, 10*S);
  ctx.fillRect(px - 14*S, py + 8*S, 4*S, 5*S);
  ctx.fillRect(px + 10*S, py + 8*S, 4*S, 5*S);
  // Side hair
  ctx.fillRect(px - 14*S, py + 10*S, 3*S, 20*S);
  ctx.fillRect(px + 11*S, py + 10*S, 3*S, 20*S);

  // Ears
  ctx.fillStyle = PROF_COLORS.skin;
  ctx.fillRect(px - 16*S, py + 18*S, 4*S, 8*S);
  ctx.fillRect(px + 12*S, py + 18*S, 4*S, 8*S);
  ctx.fillStyle = PROF_COLORS.shadow;
  ctx.fillRect(px - 15*S, py + 19*S, 2*S, 6*S);
  ctx.fillRect(px + 13*S, py + 19*S, 2*S, 6*S);

  // ===== FACE =====
  const eyeOff = exp.eyeY * S;

  // Glasses frame
  ctx.fillStyle = PROF_COLORS.glasses;
  ctx.fillRect(px - 12*S, py + 16*S + eyeOff, 10*S, 2*S);
  ctx.fillRect(px + 2*S, py + 16*S + eyeOff, 10*S, 2*S);
  ctx.fillRect(px - 12*S, py + 16*S + eyeOff, 2*S, 8*S);
  ctx.fillRect(px - 2*S, py + 16*S + eyeOff, 2*S, 8*S);
  ctx.fillRect(px + 2*S, py + 16*S + eyeOff, 2*S, 8*S);
  ctx.fillRect(px + 10*S, py + 16*S + eyeOff, 2*S, 8*S);
  ctx.fillRect(px - 12*S, py + 22*S + eyeOff, 10*S, 2*S);
  ctx.fillRect(px + 2*S, py + 22*S + eyeOff, 10*S, 2*S);
  ctx.fillRect(px - 2*S, py + 18*S + eyeOff, 4*S, 2*S); // bridge

  // Eyes
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 11*S, py + 17*S + eyeOff, 8*S, 6*S);
  ctx.fillRect(px + 3*S, py + 17*S + eyeOff, 8*S, 6*S);
  ctx.fillStyle = PROF_COLORS.eyes;
  const eyeBlinkH = (expression === 'teach' && Math.sin(profAnimFrame * 0.07) > 0.95) ? 0 : 4*S;
  ctx.fillRect(px - 8*S, py + 18*S + eyeOff, 4*S, eyeBlinkH);
  ctx.fillRect(px + 4*S, py + 18*S + eyeOff, 4*S, eyeBlinkH);
  // Eye gleam
  if (eyeBlinkH > 0) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px - 7*S, py + 18*S + eyeOff, S, S);
    ctx.fillRect(px + 5*S, py + 18*S + eyeOff, S, S);
  }

  // Eyebrows
  ctx.fillStyle = PROF_COLORS.hair;
  const eyebrowOff = exp.eyebrowY * S;
  ctx.fillRect(px - 11*S, py + 13*S + eyebrowOff, 8*S, 2*S);
  ctx.fillRect(px + 3*S, py + 13*S + eyebrowOff, 8*S, 2*S);

  // Nose
  ctx.fillStyle = PROF_COLORS.shadow;
  ctx.fillRect(px - S, py + 25*S, 3*S, 4*S);
  ctx.fillRect(px - 3*S, py + 28*S, 3*S, 2*S);
  ctx.fillRect(px + 1*S, py + 28*S, 3*S, 2*S);

  // Mustache
  ctx.fillStyle = PROF_COLORS.hair;
  ctx.fillRect(px - 6*S, py + 30*S, 12*S, 2*S);
  ctx.fillRect(px - 8*S, py + 28*S, 4*S, 3*S);
  ctx.fillRect(px + 4*S, py + 28*S, 4*S, 3*S);

  // Mouth
  drawMouth(ctx, px, py, S, exp.mouthType);

  // Cheeks (when happy/excited)
  if (['happy', 'excited', 'proud'].includes(expression)) {
    ctx.fillStyle = 'rgba(255,100,100,0.3)';
    ctx.fillRect(px - 13*S, py + 25*S, 5*S, 4*S);
    ctx.fillRect(px + 8*S, py + 25*S, 5*S, 4*S);
  }

  // Stars/effects for excited
  if (expression === 'excited' || expression === 'wow') {
    ctx.fillStyle = var_amber();
    const starT = Math.sin(profAnimFrame * 0.15) * 3;
    ctx.fillText('★', px + 16*S, py + starT);
    ctx.fillText('✦', px - 22*S, py + 5 + starT);
  }
}

function var_amber() { return '#ffb000'; }

function drawMouth(ctx, px, py, S, type) {
  ctx.fillStyle = PROF_COLORS.mouth;
  switch(type) {
    case 'smile':
      ctx.fillRect(px - 5*S, py + 33*S, 10*S, 2*S);
      ctx.fillRect(px - 6*S, py + 31*S, 2*S, 2*S);
      ctx.fillRect(px + 4*S, py + 31*S, 2*S, 2*S);
      break;
    case 'bigsmile':
      ctx.fillStyle = '#cc0000';
      ctx.fillRect(px - 6*S, py + 32*S, 12*S, 4*S);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(px - 5*S, py + 33*S, 4*S, 2*S);
      ctx.fillRect(px + 1*S, py + 33*S, 4*S, 2*S);
      ctx.fillStyle = PROF_COLORS.mouth;
      ctx.fillRect(px - 7*S, py + 31*S, 2*S, 2*S);
      ctx.fillRect(px + 5*S, py + 31*S, 2*S, 2*S);
      break;
    case 'open':
      ctx.fillStyle = '#cc0000';
      ctx.fillRect(px - 5*S, py + 31*S, 10*S, 5*S);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(px - 4*S, py + 31*S, 3*S, 2*S);
      ctx.fillRect(px + 1*S, py + 31*S, 3*S, 2*S);
      break;
    case 'talk': {
      const talkOpen = Math.sin(profAnimFrame * 0.2) > 0 ? 4*S : 2*S;
      ctx.fillStyle = '#cc0000';
      ctx.fillRect(px - 5*S, py + 31*S, 10*S, talkOpen);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(px - 4*S, py + 32*S, 3*S, S);
      ctx.fillRect(px + 1*S, py + 32*S, 3*S, S);
      break;
    }
    case 'hmm':
      ctx.fillRect(px - 3*S, py + 33*S, 6*S, 2*S);
      ctx.fillRect(px + 2*S, py + 31*S, 2*S, 2*S);
      break;
    case 'flat':
      ctx.fillRect(px - 5*S, py + 33*S, 10*S, 2*S);
      break;
    case 'O':
      ctx.fillStyle = '#cc0000';
      ctx.fillRect(px - 4*S, py + 30*S, 8*S, 7*S);
      ctx.fillStyle = PROF_COLORS.skin;
      ctx.fillRect(px - 2*S, py + 32*S, 4*S, 3*S);
      break;
    case 'frown':
      ctx.fillRect(px - 5*S, py + 34*S, 10*S, 2*S);
      ctx.fillRect(px - 6*S, py + 35*S, 2*S, 2*S);
      ctx.fillRect(px + 4*S, py + 35*S, 2*S, 2*S);
      break;
  }
}

function startProfAnimation() {
  if (profAnimTimer) cancelAnimationFrame(profAnimTimer);
  function loop() {
    profAnimFrame++;
    // Redraw all visible professor canvases
    const allCanvases = [
      { id: 'prof-canvas-intro', scale: 1, exp: profExpression },
      { id: 'prof-canvas-name', scale: 0.7, exp: 'happy' },
      { id: 'prof-canvas-lesson', scale: 0.7, exp: profExpression },
      { id: 'prof-canvas-practice', scale: 0.55, exp: 'teach' },
      { id: 'prof-canvas-result', scale: 0.85, exp: profExpression }
    ];
    allCanvases.forEach(c => {
      if (document.getElementById(c.id)) {
        drawProfessor(c.id, c.scale, c.exp);
      }
    });
    profAnimTimer = requestAnimationFrame(loop);
  }
  loop();
}

function setProfExpression(exp) {
  profExpression = exp;
}

// Start animation on load
window.addEventListener('load', startProfAnimation);
