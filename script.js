const questions = [
    { q: "¿Cuál ejemplo ilustra mejor la promesa de la epidemiología histórica?", opts: ["Etiología de anquilostomiasis", "Ignorancia sobre el uso histórico de primaquina", "Éxito de Rockefeller", "Ébola en África"], ans: 1, info: "La epidemiología histórica reveló que la primaquina ya se había usado masivamente en los 50s." },
    { q: "¿Qué conclusión crítica surge de comparar campañas del siglo XX y XXI?", opts: ["Erradicación con fármacos", "Tecnología superó al contexto", "Falta de conocimiento histórico repite errores", "Resistencia es nueva"], ans: 2, info: "El tratamiento médico sin saneamiento ambiental resulta en reinfecciones constantes." },
    // ... (Se pueden añadir las 10 preguntas siguiendo el mismo patrón)
];

let current = 0; let score = 0;

function initMap() {
    const map = document.getElementById('map-stations');
    for(let i=0; i<10; i++) {
        const dot = document.createElement('div');
        dot.className = `station-dot ${i === 0 ? 'active' : ''}`;
        dot.id = `dot-${i}`;
        dot.innerText = i + 1;
        map.appendChild(dot);
    }
    loadQuestion();
}

function loadQuestion() {
    const q = questions[current];
    document.getElementById('quiz-card').classList.remove('hidden');
    document.getElementById('q-text').innerText = q.q;
    document.getElementById('avatar-text').innerText = `¡Estación ${current + 1}! Analiza bien la pregunta.`;
    
    const stack = document.getElementById('options-stack');
    stack.innerHTML = '';
    q.opts.forEach((o, i) => {
        const btn = document.createElement('button');
        btn.innerText = o; btn.className = 'btn-opt';
        btn.onclick = () => check(i);
        stack.appendChild(btn);
    });
}

function check(idx) {
    if(idx === questions[current].ans) {
        score += 200;
        document.getElementById('avatar-text').innerText = "¡Excelente! Has ganado 200 monedas.";
    } else {
        document.getElementById('avatar-text').innerText = "¡Oh no! Recuerda que sin saneamiento no hay cura real.";
    }
    
    current++;
    document.getElementById('points').innerText = score;
    document.getElementById('station').innerText = `${current + 1}/10`;
    
    if(current < 10) {
        document.querySelectorAll('.station-dot').forEach(d => d.classList.remove('active'));
        document.getElementById(`dot-${current}`).classList.add('active');
        loadQuestion();
    } else {
        finish();
    }
}

function finish() {
    document.getElementById('quiz-card').innerHTML = `<h2>¡Misión Cumplida! Nota: ${(score/100)}/20</h2>`;
    document.getElementById('avatar-text').innerText = "¡Felicidades! Has completado el recorrido epidemiológico.";
}

// Función de IA - Simula respuesta basada en el contexto del examen
function askAI() {
    const input = document.getElementById('ai-input');
    const chat = document.getElementById('chat-box');
    const userText = input.value.toLowerCase();
    
    let botReply = "Interesante pregunta. Recuerda que el texto enfatiza que la salud pública no es solo biomédica, sino también social.";
    
    if(userText.includes("primaquina")) botReply = "La primaquina es clave. Se usó en los 50 y 60, y olvidarlo puso en riesgo a personas con deficiencia de G6PD.";
    if(userText.includes("saneamiento")) botReply = "¡Exacto! Rockefeller descubrió que sin saneamiento (letrinas), la gente se reinfecta de anquilostomiasis.";

    chat.innerHTML += `<p><strong>Tú:</strong> ${input.value}</p>`;
    chat.innerHTML += `<p class="bot-msg"><strong>IA:</strong> ${botReply}</p>`;
    input.value = '';
    chat.scrollTop = chat.scrollHeight;
}

initMap();
