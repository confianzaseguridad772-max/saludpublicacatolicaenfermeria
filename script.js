const questions = [
    { q: "¿Cuál ejemplo ilustra mejor la promesa de la epidemiología histórica?", opts: ["Etiología de anquilostomiasis en Europa", "Ignorancia sobre uso de primaquina en campañas de malaria", "Éxito de la Fundación Rockefeller", "Anticuerpos de ébola"], ans: 1 },
    { q: "¿Qué conclusión crítica se extrae de comparar las campañas del siglo XX y XXI?", opts: ["Erradicación con fármacos", "Tecnología superó al contexto", "Falta de conocimiento histórico repite errores biomédicos", "Resistencia es fenómeno nuevo"], ans: 2 },
    { q: "En el brote de Ébola 2013-2015, ¿cuál fue la lección clave?", opts: ["Priorizar respuesta biomédica", "Respuesta local exclusiva", "Integración temprana de ciencias sociales con lo biomédico", "Intervención puramente viral"], ans: 2 },
    { q: "¿Por qué el autor enfatiza la interdisciplinariedad?", opts: ["Datos médicos ocultos", "Análisis de registros antiguos", "Interpretar el pasado con ciencia moderna", "Financiación"], ans: 2 },
    { q: "En la anquilostomiasis, el tratamiento es efectivo si:", opts: ["Es administración masiva", "Se reducen perspectivas de reinfección con saneamiento", "Hay apoyo del gobierno", "Se identifica causa de anemia"], ans: 1 },
    { q: "¿Qué implica que los proyectos de malaria fueran un éxito técnico pero fracaso político?", opts: ["Metas irrelevantes", "Reducción de morbilidad aunque no hubo erradicación total", "Programas insuficientes", "Métricas no fiables"], ans: 1 },
    { q: "Tras los proyectos en Liberia, el resurgimiento epidémico enseñó que:", opts: ["Intervenciones deben ser sostenidas a largo plazo", "Impacto corto es mejor", "Deterioro inevitable", "Erradicación es prioritaria"], ans: 0 },
    { q: "¿Qué hallazgo histórico pudo prevenir errores en malaria del siglo XXI?", opts: ["Fracaso de proyectos OMS con insecticidas", "Cloroquina hasta los 80", "Mutaciones genéticas", "Reubicación de comunidades"], ans: 0 },
    { q: "El riesgo de centrarse en fármacos (MDA) sin saneamiento es:", opts: ["Disminución de carga", "Inmunidad adquirida", "Resistencia a fármacos sin abordar raíz de transmisión", "Rendimiento escolar"], ans: 2 },
    { q: "El obstáculo insuperable en la investigación de anemia en Malasia fue:", opts: ["Resistencia cultural", "Costo de determinar causa específica en cada paciente", "Falta de vigilancia", "Mito de mineros"], ans: 1 }
];

let idx = 0; let score = 0;

function load() {
    const q = questions[idx];
    document.getElementById('q-count').innerText = `${idx + 1}/${questions.length}`;
    document.getElementById('question-text').innerText = q.q;
    const grid = document.getElementById('options-grid');
    grid.innerHTML = '';
    
    q.opts.forEach((o, i) => {
        const b = document.createElement('button');
        b.innerText = o; b.className = 'btn-option';
        b.onclick = () => { if(i === q.ans) score++; idx++; if(idx < questions.length) load(); else show(); };
        grid.appendChild(b);
    });
    document.getElementById('progress-fill').style.width = `${(idx / questions.length) * 100}%`;
}

function show() {
    document.getElementById('quiz-box').classList.add('hidden');
    document.getElementById('results-box').classList.remove('hidden');
    const grade = (score / questions.length) * 20;
    document.getElementById('final-grade').innerText = grade.toFixed(1);
    document.getElementById('feedback').innerText = grade >= 13 ? "¡Excelente! Dominas la epidemiología histórica." : "Sigue fortaleciendo tus conocimientos en salud pública.";
}

load();
