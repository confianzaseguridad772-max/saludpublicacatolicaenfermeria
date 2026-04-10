const questions = [
    { q: "¿Cuál ejemplo ilustra mejor la promesa de la epidemiología histórica?", opts: ["Etiología de anquilostomiasis en Europa", "Ignorancia sobre uso de primaquina en campañas de malaria", "Éxito de la Fundación Rockefeller en saneamiento", "Prevalencia de anticuerpos de ébola"], ans: 1 },
    { q: "¿Qué conclusión crítica se extrae de comparar las campañas del siglo XX y XXI?", opts: ["Erradicación lograda con administración masiva", "Progreso tecnológico superó al contexto socio-cultural", "Falta de conocimiento histórico repite errores biomédicos", "La resistencia es un fenómeno nuevo"], ans: 2 },
    { q: "En el brote de Ébola 2013-2015, ¿cuál fue la lección para el modelo de respuesta?", opts: ["Priorizar respuesta biomédica", "Respuesta exclusivamente local", "Integración temprana de ciencias sociales con lo biomédico", "Intervención puramente viral"], ans: 2 },
    { q: "¿Por qué el autor enfatiza la interdisciplinariedad académica?", opts: ["Acceso a datos médicos ocultos", "Análisis riguroso de registros antiguos", "Interpretar el pasado con conocimientos biomédicos actuales", "Obtener financiación"], ans: 2 },
    { q: "En la anquilostomiasis, el tratamiento curativo es efectivo si:", opts: ["Es una administración masiva", "Se reducen perspectivas de reinfección con saneamiento", "Hay ineficacia comunitaria", "Se identifica la causa de anemia"], ans: 1 },
    { q: "¿Qué implica que los proyectos de malaria fueran un éxito técnico pero fracaso político?", opts: ["Metas de erradicación irrelevantes", "Reducción de morbilidad aunque no hubo erradicación total", "Programas nacionales insuficientes", "Métricas no fiables"], ans: 1 },
    { q: "Tras el fin de proyectos en Liberia, el resurgimiento epidémico enseñó que:", opts: ["Intervenciones deben ser sostenidas a largo plazo", "El impacto a corto plazo no es significativo", "Deterioro de inmunidad es inevitable", "Erradicación es más importante que transmisión"], ans: 0 },
    { q: "¿Qué hallazgo histórico pudo prevenir errores en la malaria del siglo XXI?", opts: ["Fracaso de proyectos OMS con insecticidas para transmisión cero", "Uso de cloroquina hasta los 80", "Existencia de mutaciones genéticas", "Reubicación a elevaciones altas"], ans: 0 },
    { q: "El riesgo de centrarse solo en medicamentos (MDA) sin saneamiento es:", opts: ["Disminución de la carga de enfermedad", "Desarrollo de inmunidad adquirida", "Resistencia a fármacos sin abordar la raíz de transmisión", "Aumento del rendimiento escolar"], ans: 2 },
    { q: "El obstáculo insuperable en la investigación de anemia en Malasia fue:", opts: ["Resistencia cultural al saneamiento", "Costo de determinar la causa específica en cada paciente", "Falta de vigilancia epidemiológica", "Creer que era enfermedad de mineros"], ans: 1 }
];

let idx = 0; let score = 0;

function load() {
    const q = questions[idx];
    document.getElementById('q-counter').innerText = `Pregunta ${idx + 1}/${questions.length}`;
    document.getElementById('question-text').innerText = q.q;
    const grid = document.getElementById('options-grid');
    grid.innerHTML = '';
    
    q.opts.forEach((o, i) => {
        const b = document.createElement('button');
        b.innerText = o; b.className = 'btn-opt';
        b.onclick = () => { 
            if(i === q.ans) score++; 
            idx++; 
            if(idx < questions.length) load(); 
            else show(); 
        };
        grid.appendChild(b);
    });
    document.getElementById('progress-fill').style.width = `${(idx / questions.length) * 100}%`;
}

function show() {
    document.getElementById('quiz-area').classList.add('hidden');
    document.getElementById('results').classList.remove('hidden');
    const grade = (score / questions.length) * 20;
    document.getElementById('grade').innerText = grade.toFixed(1);
    
    const feedback = document.getElementById('feedback');
    if(grade >= 14) feedback.innerText = "¡Excelente! Demuestras un alto criterio técnico en salud pública[cite: 35].";
    else feedback.innerText = "Sigue fortaleciendo tus conocimientos sobre la importancia del saneamiento ambiental[cite: 44].";
}

load();
