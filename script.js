const quizData = [
    { q: "¿Cuál ejemplo ilustra mejor la promesa de la epidemiología histórica?", options: ["Etiología de anquilostomiasis en Europa", "Ignorancia sobre el uso histórico de la primaquina", "Éxito de la Fundación Rockefeller", "Prevalencia de anticuerpos de ébola"], correct: 1 },
    { q: "¿Qué conclusión crítica se extrae de comparar las campañas del siglo XX y XXI?", options: ["Erradicación lograda con fármacos", "Tecnología superó al contexto socio-cultural", "Falta de conocimiento histórico repite errores biomédicos", "La resistencia es un fenómeno nuevo"], correct: 2 },
    { q: "En el brote de Ébola 2013-2015, ¿cuál fue la lección para el modelo de respuesta?", options: ["Priorizar respuesta biomédica", "Respuesta liderada por expertos locales", "Integración temprana de ciencias sociales con lo biomédico", "Intervención puramente viral"], correct: 2 },
    { q: "¿Por qué el autor enfatiza la interdisciplinariedad académica?", options: ["Acceso a datos médicos ocultos", "Análisis riguroso de registros antiguos", "Interpretar el pasado con ciencia moderna para evitar errores", "Obtener financiación"], correct: 2 },
    { q: "En la anquilostomiasis, el tratamiento es efectivo si:", options: ["Se dan más medicinas", "Se reducen perspectivas de reinfección con saneamiento", "Hay apoyo del gobierno local", "Se identifica la causa de anemia"], correct: 1 },
    { q: "¿Qué implica que los proyectos de malaria fueran un éxito técnico pero fracaso político?", options: ["Metas de erradicación irrelevantes", "Reducción de morbilidad aunque no hubo erradicación total", "Programas nacionales insuficientes", "Métricas no fiables"], correct: 1 },
    { q: "Tras los proyectos en Liberia, el resurgimiento epidémico enseñó que:", options: ["Intervenciones deben ser sostenidas a largo plazo", "Impacto a corto plazo es mejor", "Deterioro de inmunidad es inevitable", "Erradicación es más importante"], correct: 0 },
    { q: "¿Qué hallazgo histórico pudo prevenir errores en malaria del siglo XXI?", options: ["Fracaso de proyectos OMS con insecticidas para transmisión cero", "Uso de cloroquina hasta los 80", "Mutaciones de células falciformes", "Reubicación a elevaciones altas"], correct: 0 },
    { q: "El riesgo de centrarse en fármacos (MDA) sin saneamiento es:", options: ["Disminución de la carga de enfermedad", "Desarrollo de inmunidad adquirida", "Resistencia a fármacos sin abordar la causa raíz de transmisión", "Aumento del rendimiento escolar"], correct: 2 },
    { q: "El obstáculo insuperable en la investigación de anemia en Malasia fue:", options: ["Resistencia cultural", "Costo de determinar la causa específica en cada paciente", "Falta de vigilancia", "Creencia de que era solo para mineros"], correct: 1 }
];

let currentIdx = 0; let score = 0;

function startQuiz() {
    const q = quizData[currentIdx];
    document.getElementById('q-counter').innerText = `Pregunta ${currentIdx + 1}/${quizData.length}`;
    document.getElementById('question-text').innerText = q.q;
    const grid = document.getElementById('options-grid');
    grid.innerHTML = '';
    
    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.innerText = opt; btn.className = 'btn-option';
        btn.onclick = () => handleAnswer(i);
        grid.appendChild(btn);
    });
    document.getElementById('progress-fill').style.width = `${(currentIdx / quizData.length) * 100}%`;
}

function handleAnswer(selected) {
    if (selected === quizData[currentIdx].correct) score++;
    currentIdx++;
    if (currentIdx < quizData.length) startQuiz();
    else showResults();
}

function showResults() {
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('results-area').classList.remove('hidden');
    const finalGrade = (score / quizData.length) * 20;
    document.getElementById('final-grade').innerText = finalGrade.toFixed(1);
    document.getElementById('feedback-text').innerText = finalGrade >= 13 ? "¡Excelente! Dominas la epidemiología histórica." : "Sigue fortaleciendo tus conocimientos en salud pública.";
}

startQuiz();
