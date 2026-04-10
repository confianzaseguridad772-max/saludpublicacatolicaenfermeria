const questions = [
    {
        q: "¿Cuál ejemplo ilustra mejor la promesa de la epidemiología histórica según el texto?",
        a: [
            { text: "El descubrimiento de la anquilostomiasis en Europa", correct: false },
            { text: "La ignorancia sobre el uso histórico de la primaquina en campañas de malaria", correct: true }, // [cite: 5, 9]
            { text: "El éxito de la Fundación Rockefeller en saneamiento", correct: false },
            { text: "La prevalencia de anticuerpos de ébola en comunidades africanas", correct: false }
        ]
    },
    {
        q: "¿Qué conclusión crítica se extrae de comparar campañas del siglo XX y XXI?",
        a: [
            { text: "La tecnología eliminó la necesidad de entender el contexto", correct: false },
            { text: "La falta de conocimiento histórico repite errores biomédicos sin saneamiento", correct: true }, // [cite: 15, 17]
            { text: "Las campañas contemporáneas ya erradicaron la malaria", correct: false },
            { text: "La resistencia es un fenómeno totalmente nuevo", correct: false }
        ]
    },
    {
        q: "En el brote de Ébola 2013-2015, ¿qué lección se aprendió sobre el modelo de respuesta?",
        a: [
            { text: "El enfoque clínico es el único eficiente", correct: false },
            { text: "Se requiere integración temprana de ciencias sociales y respuesta biomédica", correct: true }, // [cite: 24, 26]
            { text: "Las respuestas deben ser lideradas solo por expertos locales", correct: false },
            { text: "Las tradiciones de entierro no afectan el origen viral", correct: false }
        ]
    },
    {
        q: "¿Por qué es esencial la interdisciplinariedad en la epidemiología histórica?",
        a: [
            { text: "Para que historiadores obtengan más financiación", correct: false },
            { text: "Para interpretar lecciones del pasado con conocimientos biomédicos actuales", correct: true }, // [cite: 32, 35]
            { text: "Para ocultar datos médicos antiguos", correct: false },
            { text: "Para que solo historiadores analicen registros", correct: false }
        ]
    },
    {
        q: "Sobre la anquilostomiasis, ¿cuál es el principio de salud sostenible?",
        a: [
            { text: "La administración masiva de medicamentos es la única vía", correct: false },
            { text: "Priorizar el saneamiento y control ambiental sobre lo puramente curativo", correct: true }, // [cite: 40, 44]
            { text: "La ineficacia de los gobiernos locales", correct: false },
            { text: "La identificación de la causa de la anemia es irrelevante", correct: false }
        ]
    },
    {
        q: "¿Qué implica que los proyectos de malaria en África fueran un éxito técnico pero fracaso político?",
        a: [
            { text: "Que las métricas de salud pública no son fiables", correct: false },
            { text: "Que redujeron morbilidad y salvaron vidas aunque no hubo erradicación total", correct: true }, // [cite: 49, 52]
            { text: "Que la erradicación es el único éxito posible", correct: false },
            { text: "Que las metas políticas son siempre irrelevantes", correct: false }
        ]
    },
    {
        q: "¿Qué lección dejó el resurgimiento epidémico en Liberia tras el fin de los proyectos?",
        a: [
            { text: "Las intervenciones deben ser sostenidas para no perder inmunidad adquirida", correct: true }, // [cite: 56, 61]
            { text: "El deterioro de la inmunidad no se puede evitar", correct: false },
            { text: "Las intervenciones a corto plazo son mejores", correct: false },
            { text: "Reducir la transmisión es menos importante que erradicar", correct: false }
        ]
    },
    {
        q: "¿Qué hallazgo histórico pudo prevenir errores en las campañas de malaria del siglo XXI?",
        a: [
            { text: "El uso de cloroquina hasta los 80", correct: false },
            { text: "Que los insecticidas tienen un límite y no garantizan por sí solos la transmisión cero", correct: true }, // [cite: 64, 68]
            { text: "Las mutaciones de células falciformes", correct: false },
            { text: "La reubicación de comunidades europeas", correct: false }
        ]
    },
    {
        q: "¿Qué riesgo existe al usar solo fármacos (MDA) sin saneamiento ambiental?",
        a: [
            { text: "Aumento del rendimiento escolar", correct: false },
            { text: "Aparición de resistencia a los fármacos sin abordar la raíz del problema", correct: true }, // [cite: 74, 76]
            { text: "Mayor inmunidad adquirida", correct: false },
            { text: "Disminución definitiva de la carga de enfermedad", correct: false }
        ]
    },
    {
        q: "¿Cuál fue el obstáculo insuperable en la investigación de anemia en Malasia?",
        a: [
            { text: "La resistencia cultural al saneamiento", correct: false },
            { text: "El costo de determinar si la causa era malaria o parásitos en cada paciente", correct: true }, // [cite: 81, 84]
            { text: "La falta de sistemas de vigilancia", correct: false },
            { text: "Creer que era solo una enfermedad de mineros", correct: false }
        ]
    }
];

let currentIdx = 0;
let score = 0;

function startQuiz() {
    showQuestion(questions[currentIdx]);
}

function showQuestion(q) {
    document.getElementById('question-title').innerText = q.q;
    const btnGrid = document.getElementById('answer-buttons');
    btnGrid.innerHTML = '';
    
    q.a.forEach(option => {
        const btn = document.createElement('button');
        btn.innerText = option.text;
        btn.classList.add('btn-option');
        btn.onclick = () => selectAnswer(option.correct);
        btnGrid.appendChild(btn);
    });
}

function selectAnswer(isCorrect) {
    if (isCorrect) score++;
    currentIdx++;
    
    const progress = (currentIdx / questions.length) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;

    if (currentIdx < questions.length) {
        showQuestion(questions[currentIdx]);
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('question-container').classList.add('hidden');
    document.getElementById('result-container').classList.remove('hidden');
    
    // Nota base 20
    const finalGrade = (score / questions.length) * 20;
    document.getElementById('score-num').innerText = finalGrade.toFixed(1);
    
    const feedback = document.getElementById('feedback-text');
    if (finalGrade >= 14) {
        feedback.innerText = "¡Excelente profesional! Dominas la perspectiva histórica de la salud pública.";
    } else {
        feedback.innerText = "Buen intento. Te recomendamos repasar las lecciones sobre control ambiental e interdisciplinariedad.";
    }
}

startQuiz();
