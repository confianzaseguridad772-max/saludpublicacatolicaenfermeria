const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxHs_XHJFBrwEWNBG__ewKegZt3qmrfjpa6KdQvytBREe2Abnp_7UlUr9RsfG79e348CA/exec"; 
let datosPeru = [];
let maestrosPacientes = {}; 
let baseVacunas = {}; // Nueva variable para historial de inmunizaciones

// Elementos de los Modales
const modalRegistro = document.getElementById("modalRegistro");
const modalClinico = document.getElementById("modalClinico");

// Botones de Apertura
const btnAbrirRegistro = document.getElementById("btnAbrirRegistro");
const btnAbrirClinico = document.getElementById("btnAbrirClinico");

// Botones de Cierre
const btnCerrarRegistro = document.getElementById("closeBB");
const btnCerrarClinico = document.getElementById("closeClinico");

window.onload = () => {
    // 1. Carga inicial de datos de ubicación (Perú)
    fetch(SCRIPT_URL).then(res => res.json()).then(data => {
        datosPeru = data;
        poblarDeps();
    }).catch(err => console.error("Error cargando ubicaciones"));

    // 2. NUEVO: Cargar toda la base de datos existente al iniciar (Hoja 1 y Vacunas)
    cargarBaseDeDatos();

    // Escuchador para calcular edad en el Registro BB
    document.getElementById('fechaNacimiento').addEventListener('change', function() {
        document.getElementById('edad').value = calcularEdadExacta(this.value);
    });

    // --- Lógica de "Un clic = Fecha General" con BLOQUEO de seguridad ---
    document.querySelectorAll('.vax-input').forEach(input => {
        input.onclick = function() {
            // RESTRICCIÓN: Si el DNI no está en Hoja 1, no permite ingresar nada
            const nombreValido = document.getElementById('nombreClinico').value;
            if (!nombreValido || nombreValido.includes("No encontrado")) {
                alert("⚠️ Acción bloqueada: El DNI no existe en el Registro BB (Hoja 1).");
                return;
            }

            const fechaG = document.getElementById('fechaGeneralVacuna').value;
            if (!fechaG) {
                alert("Por favor, seleccione primero la 'FECHA DE APLICACIÓN (General)'");
                return;
            }
            // Si el campo está vacío o tiene otra fecha, pone la general. Si ya la tiene, la limpia.
            this.value = (this.value === fechaG) ? "" : fechaG;
        };
    });
};

// --- NUEVO: Función para sincronizar datos al abrir la app ---
async function cargarBaseDeDatos() {
    try {
        const resp = await fetch(SCRIPT_URL + "?action=leerTodo");
        const data = await resp.json();
        
        // Cargar pacientes (Hoja 1)
        if (data.pacientes) {
            data.pacientes.forEach(p => {
                maestrosPacientes[p.dni] = p;
                actualizarTabla(p); // Llena el panel principal
            });
        }
        
        // Cargar historial de vacunas
        if (data.vacunas) {
            data.vacunas.forEach(v => {
                baseVacunas[v.dni] = v;
            });
        }
        console.log("Sincronización completa");
    } catch (e) {
        console.error("Error sincronizando base de datos:", e);
    }
}

// --- CONTROL DE MODALES ---
btnAbrirRegistro.onclick = () => modalRegistro.style.display = "block";
btnAbrirClinico.onclick = () => modalClinico.style.display = "block";

btnCerrarRegistro.onclick = () => modalRegistro.style.display = "none";
btnCerrarClinico.onclick = () => modalClinico.style.display = "none";

window.onclick = (e) => { 
    if (e.target == modalRegistro) modalRegistro.style.display = "none"; 
    if (e.target == modalClinico) modalClinico.style.display = "none"; 
};

// --- FUNCIONES DE APOYO (EDAD Y UBICACIÓN) ---
function calcularEdadExacta(fechaNac) {
    if (!fechaNac) return "";
    const hoy = new Date();
    const cumple = new Date(fechaNac);
    let años = hoy.getFullYear() - cumple.getFullYear();
    let meses = hoy.getMonth() - cumple.getMonth();
    if (meses < 0 || (meses === 0 && hoy.getDate() < cumple.getDate())) {
        años--;
        meses += 12;
    }
    return años > 0 ? `${años} años, ${meses} m` : `${meses} meses`;
}

function poblarDeps() {
    const sel = document.getElementById('region');
    if (!sel) return;
    const deps = [...new Set(datosPeru.map(i => i[0]))].sort();
    let html = '<option value="">Seleccione...</option>';
    deps.forEach(d => html += `<option value="${d}">${d}</option>`);
    sel.innerHTML = html;
}

function cargarProvincias() {
    const dep = document.getElementById('region').value;
    const provs = [...new Set(datosPeru.filter(i => i[0] === dep).map(i => i[1]))].sort();
    let html = '<option value="">Seleccione...</option>';
    provs.forEach(p => html += `<option value="${p}">${p}</option>`);
    document.getElementById('provincia').innerHTML = html;
}

function cargarDistritos() {
    const dep = document.getElementById('region').value;
    const prov = document.getElementById('provincia').value;
    const dists = datosPeru.filter(i => i[0] === dep && i[1] === prov).map(i => i[2]).sort();
    let html = '<option value="">Seleccione...</option>';
    dists.forEach(d => html += `<option value="${d}">${d}</option>`);
    document.getElementById('distrito').innerHTML = html;
}

// --- LÓGICA DE BÚSQUEDA Y TABLA ---
function buscarYValidarDNI() {
    const dni = document.getElementById('dniNino').value;
    const modo = document.getElementById('modoForm');
    if (dni.length === 8 && maestrosPacientes[dni]) {
        const p = maestrosPacientes[dni];
        modo.innerText = "(Editando)";
        Object.keys(p).forEach(key => {
            const el = document.getElementById(key === 'dni' ? 'dniNino' : key);
            if (el) el.value = p[key];
        });
    } else {
        modo.innerText = "(Nuevo)";
    }
}

// --- ACTUALIZADO: Trae nombre Y FECHAS de vacunas ya ingresadas ---
function buscarNombrePorDNI() {
    const dni = document.getElementById('dniClinico').value;
    const campoNombre = document.getElementById('nombreClinico');
    const vaxInputs = document.querySelectorAll('.vax-input');
    
    // Limpiar campos antes de buscar
    campoNombre.value = "";
    vaxInputs.forEach(input => input.value = "");
    document.getElementById('fechaCitaVACUNA').value = "";

    if (dni.length === 8) {
        if (maestrosPacientes[dni]) {
            campoNombre.value = maestrosPacientes[dni].nombre;
            
            // Si ya tiene vacunas en la base de datos, las cargamos en los inputs
            if (baseVacunas[dni]) {
                const historial = baseVacunas[dni];
                vaxInputs.forEach(input => {
                    // Si el ID del input existe en el objeto historial, ponemos su valor
                    if (historial[input.id]) {
                        input.value = historial[input.id];
                    }
                });
                // Cargar también la próxima cita si existe
                if (historial.proximacita) {
                    document.getElementById('fechaCitaVACUNA').value = historial.proximacita;
                }
            }
        } else {
            campoNombre.value = "❌ No encontrado en Hoja 1";
        }
    }
}

function filtrarTabla() {
    const busq = document.getElementById('buscador').value.toLowerCase();
    document.querySelectorAll('#tbody tr').forEach(r => {
        r.style.display = r.innerText.toLowerCase().includes(busq) ? "" : "none";
    });
}

function actualizarTabla(d) {
    const tbody = document.getElementById('tbody');
    const rows = Array.from(tbody.rows);
    const exist = rows.find(r => r.cells[0].innerText === d.dni);
    const rowHtml = `<td>${d.dni}</td><td>${d.nombre}</td><td>${d.distrito}</td><td>${exist ? '<span class="badge-edit" style="background:#e67e22; color:white; padding:2px 5px; border-radius:4px;">MODIFICADO</span>' : '✅ Nuevo'}</td>`;
    
    if(exist) {
        exist.innerHTML = rowHtml;
    } else {
        tbody.insertAdjacentHTML('afterbegin', `<tr>${rowHtml}</tr>`);
    }
}

// --- ENVÍO DE FORMULARIOS ---
document.getElementById('registroForm').onsubmit = function(e) {
    e.preventDefault();
    const btn = document.getElementById('btnSave');
    btn.disabled = true;
    btn.innerText = "Procesando...";

    const datos = { tipoForm: "GENERAL" };
    const inputs = this.querySelectorAll('input, select');
    inputs.forEach(inp => {
        const id = inp.id === 'dniNino' ? 'dni' : inp.id;
        if(id) datos[id] = inp.value;
    });

    maestrosPacientes[datos.dni] = datos;

    fetch(SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(datos) })
    .then(() => {
        alert("¡Registro del niño guardado con éxito!");
        actualizarTabla(datos);
        this.reset();
        modalRegistro.style.display = "none";
        document.getElementById('modoForm').innerText = "(Nuevo)";
        btn.disabled = false;
        btn.innerText = "GUARDAR REGISTRO COMPLETO";
    }).catch(() => { 
        alert("Error de conexión"); 
        btn.disabled = false; 
    });
};

document.getElementById('clinicoForm').onsubmit = function(e) {
    e.preventDefault();
    const btn = document.getElementById('btnSaveClinico');
    btn.disabled = true;
    btn.innerText = "Actualizando Vacunas...";

    const datos = { 
        tipoForm: "VACUNAS",
        dni: document.getElementById('dniClinico').value,
        nombres: document.getElementById('nombreClinico').value,
        proximaCita: document.getElementById('fechaCitaVACUNA').value
    };

    this.querySelectorAll('.vax-input').forEach(inp => {
        if(inp.id) datos[inp.id] = inp.value;
    });

    // Actualizamos la base de datos local para que la próxima consulta muestre los cambios sin recargar
    baseVacunas[datos.dni] = datos;

    fetch(SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(datos) })
    .then(() => {
        alert("¡Esquema de vacunas actualizado correctamente!");
        this.reset();
        modalClinico.style.display = "none";
        btn.disabled = false;
        btn.innerText = "ACTUALIZAR ESQUEMA DE VACUNAS";
    }).catch(() => {
        alert("Error al conectar con el servidor");
        btn.disabled = false;
    });
};