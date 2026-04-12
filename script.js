const missionData = [
    { q: "¿Cuál ejemplo ilustra mejor la promesa de la epidemiología histórica? [cite: 3]", opts: ["Etiología de anquilostomiasis en Europa [cite: 4]", "Ignorancia sobre el uso histórico de la primaquina [cite: 5]", "Saneamiento de la Fundación Rockefeller [cite: 6]", "Anticuerpos de ébola en África [cite: 7]"], ans: 1 },
    { q: "¿Qué conclusión crítica surge de comparar las campañas del siglo XX y XXI? [cite: 12]", opts: ["Erradicación lograda con fármacos [cite: 13]", "Tecnología superó al contexto [cite: 14]", "Falta de conocimiento histórico repite errores biomédicos [cite: 15]", "Resistencia es fenómeno nuevo [cite: 16]"], ans: 2 },
    { q: "En el brote de Ébola 2013-2015, ¿cuál fue la lección para el modelo de respuesta? [cite: 20]", opts: ["Priorizar respuesta biomédica [cite: 21]", "Liderazgo exclusivo local [cite: 22]", "Intervención puramente viral [cite: 23]", "Integración temprana de ciencias sociales con lo biomédico [cite: 24]"], ans: 3 },
    { q: "¿Por qué el autor enfatiza la interdisciplinariedad académica? [cite: 29]", opts: ["Acceso a datos médicos [cite: 30]", "Análisis riguroso de registros [cite: 31]", "Interpretar el pasado con ciencia moderna para evitar errores [cite: 32]", "Financiación de salud [cite: 33]"], ans: 2 },
    { q: "En la anquilostomiasis, el tratamiento es efectivo si: [cite: 38]", opts: ["Es administración masiva [cite: 39]", "Se reducen perspectivas de reinfección con saneamiento [cite: 40]", "Hay apoyo de gobiernos [cite: 41]", "Se identifica causa de anemia [cite: 42]"], ans: 1 },
    { q: "¿Qué implica que los proyectos de malaria fueran un éxito técnico pero fracaso político? [cite: 47]", opts: ["Metas irrelevantes [cite: 48]", "Reducción de morbilidad aunque no hubo erradicación total [cite: 49]", "Programas nacionales insuficientes [cite: 50]", "Métricas no fiables [cite: 51]"], ans: 1 },
    { q: "Tras los proyectos en Liberia, el resurgimiento epidémico enseñó que: [cite: 55]", opts: ["Intervenciones deben ser sostenidas a largo plazo [cite: 56]", "Impacto corto es mejor [cite: 57]", "Deterioro inevitable [cite: 58]", "Erradicación es prioritaria [cite: 59]"], ans: 0 },
    { q: "¿Qué hallazgo histórico pudo prevenir errores en malaria del siglo XXI? [cite: 63]", opts: ["Fracaso de proyectos OMS con insecticidas para transmisión cero [cite: 64]", "Cloroquina hasta los 80 [cite: 65]", "Mutaciones genéticas [cite: 66]", "Reubicación de comunidades [cite: 67]"], ans: 0 },
    { q: "El riesgo de centrarse en fármacos (MDA) sin saneamiento es: [cite: 71]", opts: ["Disminución de carga [cite: 72]", "Inmunidad adquirida [cite: 73]", "Resistencia a fármacos sin abordar raíz de transmisión [cite: 74]", "Rendimiento escolar [cite: 75]"], ans: 2 },
    { q: "El obstáculo insuperable en la investigación de anemia en Malasia fue: [cite: 79]", opts: ["Resistencia cultural [cite: 80]", "Costo de determinar causa específica en cada paciente [cite: 81]", "Falta de vigilancia [cite: 82]", "Mito de mineros [cite: 83]"], ans: 1 }
];

let step = 0; let coins = 0;

function render() {
    const data = missionData[step];
    document.getElementById('q-badge').innerText = `Estación ${step + 1}/${missionData.length}`;
    document.getElementById('question-text').innerText = data.q;
    const grid = document.getElementById('options-grid');
    grid.innerHTML = '';
    
    data.opts.forEach((text, i) => {
        const btn = document.createElement('button');
        btn.innerText = text; btn.className = 'btn-game';
        btn.onclick = () => {
            if(i === data.ans) coins += 100;
            step++;
            if(step < missionData.length) render();
            else finish();
        };
        grid.appendChild(btn);
    });
    
    document.getElementById('score-text').innerText = `Puntos: ${coins}`;
    document.getElementById('progress-line').style.width = `${(step / missionData.length) * 100}%`;
}

function finish() {
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    const grade = (coins / (missionData.length * 100)) * 20;
    document.getElementById('final-grade').innerText = grade.toFixed(1);
    document.getElementById('feedback-text').innerText = grade >= 13 ? "¡Excelente epidemiólogo! Has asegurado a la población." : "Necesitas revisar los manuales de saneamiento ambiental.";
}

render();
