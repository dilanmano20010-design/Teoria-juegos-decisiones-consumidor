// Script de interactividad para la web de Teoría de Juegos y Decisiones del Consumidor
// Autor: Dilan Alexander Manosalvas Andrade - Econometrics ECEM

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Elementos DOM
  const qSlider = document.getElementById('qSlider');
  const qDisplay = document.getElementById('qDisplay');
  const slopeDisplay = document.getElementById('slopeDisplay');
  const btnPresets = document.querySelectorAll('.btn-preset');

  const valU = document.getElementById('val-U');
  const valM = document.getElementById('val-M');
  const valD = document.getElementById('val-D');

  const barU = document.getElementById('bar-U');
  const barM = document.getElementById('bar-M');
  const barD = document.getElementById('bar-D');

  const itemU = document.getElementById('item-U');
  const itemM = document.getElementById('item-M');
  const itemD = document.getElementById('item-D');

  const rowU = document.getElementById('row-U');
  const rowM = document.getElementById('row-M');
  const rowD = document.getElementById('row-D');

  const decisionText = document.getElementById('decisionText');

  const canvasIndif = document.getElementById('canvasIndifference');
  const ctxIndif = canvasIndif.getContext('2d');

  const canvasExpected = document.getElementById('canvasExpectedPayoffs');
  const ctxExpected = canvasExpected.getContext('2d');

  // Estado del modelo
  let q = 0.34;

  // Cálculo de utilidades esperadas
  function computePayoffs(qVal) {
    const euU = 0.0 * qVal + 4.0 * (1.0 - qVal);
    const euM = 1.0 * qVal + 1.0 * (1.0 - qVal);
    const euD = 4.0 * qVal + 0.0 * (1.0 - qVal);
    return { U: euU, M: euM, D: euD };
  }

  // Actualización de la interfaz
  function updateUI() {
    const payoffs = computePayoffs(q);
    qDisplay.textContent = q.toFixed(2);

    const slope = q >= 0.999 ? -999 : -(q / (1.0 - q));
    slopeDisplay.textContent = slope < -50 ? '-∞' : slope.toFixed(3);

    // Valores numéricos
    valU.textContent = payoffs.U.toFixed(2);
    valM.textContent = payoffs.M.toFixed(2);
    valD.textContent = payoffs.D.toFixed(2);

    // Barras de progreso porcentuales (normalizadas respecto al pago máximo = 4)
    barU.style.width = `${(payoffs.U / 4.0) * 100}%`;
    barM.style.width = `${(payoffs.M / 4.0) * 100}%`;
    barD.style.width = `${(payoffs.D / 4.0) * 100}%`;

    // Determinar mejor respuesta
    const maxVal = Math.max(payoffs.U, payoffs.M, payoffs.D);
    let best = [];
    if (Math.abs(payoffs.U - maxVal) < 0.001) best.push('U');
    if (Math.abs(payoffs.M - maxVal) < 0.001) best.push('M');
    if (Math.abs(payoffs.D - maxVal) < 0.001) best.push('D');

    // Remover clases activas previas
    [itemU, itemM, itemD].forEach(el => el.classList.remove('winner'));
    [rowU, rowM, rowD].forEach(el => el.classList.remove('active-best'));
    document.querySelectorAll('.payoff-cell').forEach(el => el.classList.remove('active-best'));

    // Resaltar ganadores
    best.forEach(strat => {
      const itemEl = document.getElementById(`item-${strat}`);
      const rowEl = document.getElementById(`row-${strat}`);
      if (itemEl) itemEl.classList.add('winner');
      if (rowEl) rowEl.classList.add('active-best');
      document.querySelectorAll(`.payoff-cell[data-strategy="${strat}"]`).forEach(el => el.classList.add('active-best'));
    });

    // Texto de recomendación estratégica
    if (best.length === 1) {
      const stratName = best[0] === 'U' ? 'U (Especialización en Red R)' : (best[0] === 'D' ? 'D (Especialización en Red L)' : 'M');
      decisionText.innerHTML = `Para <strong>$q = ${q.toFixed(2)}$</strong>, la estrategia óptima es <strong>${best[0]}</strong> con una utilidad esperada de <strong>${maxVal.toFixed(2)}</strong>.`;
    } else {
      decisionText.innerHTML = `Para el umbral crítico <strong>$q = 0.50$</strong>, el consumidor es indiferente entre <strong>U</strong> y <strong>D</strong> ($E[u] = 2.00$).`;
    }

    // Redibujar gráficos
    drawIndifferenceGraph(payoffs);
    drawExpectedPayoffGraph(payoffs);
  }

  // Gráfico 1: Espacio de Pagos (EconGraphs replica)
  function drawIndifferenceGraph(payoffs) {
    const width = canvasIndif.width;
    const height = canvasIndif.height;
    ctxIndif.clearRect(0, 0, width, height);

    const margin = { top: 40, right: 30, bottom: 50, left: 60 };
    const plotW = width - margin.left - margin.right;
    const plotH = height - margin.top - margin.bottom;

    const maxCoord = 5.0;

    function toX(val) {
      return margin.left + (val / maxCoord) * plotW;
    }
    function toY(val) {
      return margin.top + plotH - (val / maxCoord) * plotH;
    }

    // Cuadrícula y ejes
    ctxIndif.strokeStyle = 'rgba(148, 163, 184, 0.12)';
    ctxIndif.lineWidth = 1;

    for (let i = 0; i <= maxCoord; i++) {
      // Líneas verticales
      ctxIndif.beginPath();
      ctxIndif.moveTo(toX(i), toY(0));
      ctxIndif.lineTo(toX(i), toY(maxCoord));
      ctxIndif.stroke();

      // Líneas horizontales
      ctxIndif.beginPath();
      ctxIndif.moveTo(toX(0), toY(i));
      ctxIndif.lineTo(toX(maxCoord), toY(i));
      ctxIndif.stroke();

      // Etiquetas números
      ctxIndif.fillStyle = '#64748b';
      ctxIndif.font = '11px Inter, sans-serif';
      ctxIndif.fillText(i, toX(i) - 4, toY(0) + 18);
      if (i > 0) {
        ctxIndif.fillText(i, toX(0) - 20, toY(i) + 4);
      }
    }

    // Ejes principales
    ctxIndif.strokeStyle = '#94a3b8';
    ctxIndif.lineWidth = 1.8;
    ctxIndif.beginPath();
    ctxIndif.moveTo(toX(0), toY(0));
    ctxIndif.lineTo(toX(maxCoord), toY(0));
    ctxIndif.moveTo(toX(0), toY(0));
    ctxIndif.lineTo(toX(0), toY(maxCoord));
    ctxIndif.stroke();

    // Etiquetas de los ejes
    ctxIndif.fillStyle = '#cbd5e1';
    ctxIndif.font = '12px Inter, sans-serif';
    ctxIndif.fillText('Pago si el Mercado elige L (u_L)', toX(1.3), height - 12);

    ctxIndif.save();
    ctxIndif.translate(18, toY(1.4));
    ctxIndif.rotate(-Math.PI / 2);
    ctxIndif.fillText('Pago si el Mercado elige R (u_R)', 0, 0);
    ctxIndif.restore();

    // Puntos estratégicos
    const puntos = [
      { id: 'U', x: 0, y: 4, color: '#38bdf8', eu: payoffs.U },
      { id: 'M', x: 1, y: 1, color: '#f59e0b', eu: payoffs.M },
      { id: 'D', x: 4, y: 0, color: '#10b981', eu: payoffs.D }
    ];

    // Curvas de indiferencia para cada punto
    // E[u] = q * x + (1-q) * y  ==>  y = (E[u] - q * x) / (1 - q)
    puntos.forEach(p => {
      ctxIndif.beginPath();
      if (q >= 0.999) {
        // Línea vertical
        ctxIndif.moveTo(toX(p.x), toY(0));
        ctxIndif.lineTo(toX(p.x), toY(maxCoord));
      } else {
        const xStart = 0;
        const yStart = (p.eu - q * xStart) / (1.0 - q);

        const xEnd = maxCoord;
        const yEnd = (p.eu - q * xEnd) / (1.0 - q);

        ctxIndif.moveTo(toX(xStart), toY(yStart));
        ctxIndif.lineTo(toX(xEnd), toY(yEnd));
      }

      ctxIndif.strokeStyle = p.color;
      ctxIndif.lineWidth = (p.id === 'U' && q < 0.5) || (p.id === 'D' && q > 0.5) ? 2.5 : 1.2;
      ctxIndif.setLineDash(p.id === 'M' ? [5, 4] : []);
      ctxIndif.stroke();
      ctxIndif.setLineDash([]);
    });

    // Dibujar puntos
    puntos.forEach(p => {
      ctxIndif.fillStyle = p.color;
      ctxIndif.beginPath();
      ctxIndif.arc(toX(p.x), toY(p.y), 7, 0, Math.PI * 2);
      ctxIndif.fill();
      ctxIndif.strokeStyle = '#fff';
      ctxIndif.lineWidth = 2;
      ctxIndif.stroke();

      // Etiqueta del punto
      ctxIndif.fillStyle = '#fff';
      ctxIndif.font = 'bold 13px Outfit, sans-serif';
      ctxIndif.fillText(`${p.id} (${p.x}, ${p.y})`, toX(p.x) + 12, toY(p.y) - 8);
    });
  }

  // Gráfico 2: Utilidad Esperada vs q
  function drawExpectedPayoffGraph(payoffs) {
    const width = canvasExpected.width;
    const height = canvasExpected.height;
    ctxExpected.clearRect(0, 0, width, height);

    const margin = { top: 25, right: 30, bottom: 45, left: 60 };
    const plotW = width - margin.left - margin.right;
    const plotH = height - margin.top - margin.bottom;

    const maxU = 4.5;

    function toX(qVal) {
      return margin.left + qVal * plotW;
    }
    function toY(uVal) {
      return margin.top + plotH - (uVal / maxU) * plotH;
    }

    // Cuadrícula
    ctxExpected.strokeStyle = 'rgba(148, 163, 184, 0.12)';
    ctxExpected.lineWidth = 1;

    for (let u = 0; u <= 4; u++) {
      ctxExpected.beginPath();
      ctxExpected.moveTo(toX(0), toY(u));
      ctxExpected.lineTo(toX(1), toY(u));
      ctxExpected.stroke();

      ctxExpected.fillStyle = '#64748b';
      ctxExpected.font = '11px Inter, sans-serif';
      ctxExpected.fillText(u.toFixed(0), toX(0) - 20, toY(u) + 4);
    }

    for (let qVal = 0; qVal <= 1; qVal += 0.25) {
      ctxExpected.beginPath();
      ctxExpected.moveTo(toX(qVal), toY(0));
      ctxExpected.lineTo(toX(qVal), toY(4));
      ctxExpected.stroke();

      ctxExpected.fillStyle = '#64748b';
      ctxExpected.font = '11px Inter, sans-serif';
      ctxExpected.fillText(qVal.toFixed(2), toX(qVal) - 10, toY(0) + 18);
    }

    // Ejes
    ctxExpected.strokeStyle = '#94a3b8';
    ctxExpected.lineWidth = 1.5;
    ctxExpected.beginPath();
    ctxExpected.moveTo(toX(0), toY(0));
    ctxExpected.lineTo(toX(1), toY(0));
    ctxExpected.moveTo(toX(0), toY(0));
    ctxExpected.lineTo(toX(0), toY(maxU));
    ctxExpected.stroke();

    // Línea U: 4 - 4q
    ctxExpected.beginPath();
    ctxExpected.moveTo(toX(0), toY(4));
    ctxExpected.lineTo(toX(1), toY(0));
    ctxExpected.strokeStyle = '#38bdf8';
    ctxExpected.lineWidth = 2.4;
    ctxExpected.stroke();

    // Línea M: 1.00
    ctxExpected.beginPath();
    ctxExpected.moveTo(toX(0), toY(1));
    ctxExpected.lineTo(toX(1), toY(1));
    ctxExpected.strokeStyle = '#f59e0b';
    ctxExpected.lineWidth = 2;
    ctxExpected.setLineDash([4, 3]);
    ctxExpected.stroke();
    ctxExpected.setLineDash([]);

    // Línea D: 4q
    ctxExpected.beginPath();
    ctxExpected.moveTo(toX(0), toY(0));
    ctxExpected.lineTo(toX(1), toY(4));
    ctxExpected.strokeStyle = '#10b981';
    ctxExpected.lineWidth = 2.4;
    ctxExpected.stroke();

    // Punto crítico q* = 0.50
    ctxExpected.fillStyle = '#a855f7';
    ctxExpected.beginPath();
    ctxExpected.arc(toX(0.5), toY(2.0), 5, 0, Math.PI * 2);
    ctxExpected.fill();
    ctxExpected.fillText('q* = 0.50', toX(0.5) - 22, toY(2.0) - 10);

    // Línea vertical que marca la creencia actual q
    ctxExpected.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctxExpected.lineWidth = 1.5;
    ctxExpected.setLineDash([3, 3]);
    ctxExpected.beginPath();
    ctxExpected.moveTo(toX(q), toY(0));
    ctxExpected.lineTo(toX(q), toY(4.2));
    ctxExpected.stroke();
    ctxExpected.setLineDash([]);

    // Punto sobre la curva de la mejor respuesta
    const maxVal = Math.max(payoffs.U, payoffs.M, payoffs.D);
    ctxExpected.fillStyle = '#fff';
    ctxExpected.beginPath();
    ctxExpected.arc(toX(q), toY(maxVal), 6, 0, Math.PI * 2);
    ctxExpected.fill();
    ctxExpected.strokeStyle = '#38bdf8';
    ctxExpected.lineWidth = 2;
    ctxExpected.stroke();

    // Etiquetas de ejes
    ctxExpected.fillStyle = '#cbd5e1';
    ctxExpected.font = '11px Inter, sans-serif';
    ctxExpected.fillText('Creencia Subjetiva q', toX(0.42), height - 8);

    ctxExpected.save();
    ctxExpected.translate(20, toY(1.5));
    ctxExpected.rotate(-Math.PI / 2);
    ctxExpected.fillText('Pago Esperado E[u]', 0, 0);
    ctxExpected.restore();
  }

  // Event Listeners
  qSlider.addEventListener('input', (e) => {
    q = parseFloat(e.target.value);
    btnPresets.forEach(btn => btn.classList.remove('active'));
    updateUI();
  });

  btnPresets.forEach(btn => {
    btn.addEventListener('click', () => {
      btnPresets.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      q = parseFloat(btn.dataset.q);
      qSlider.value = q;
      updateUI();
    });
  });

  // Render inicial
  updateUI();

  // KaTeX rendering para fórmulas matemáticas en el DOM
  if (window.renderMathInElement) {
    window.renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false }
      ]
    });
  }
});
