/**
 * Configuración del horario de estudio
 * Contiene toda la configuración estática del sistema
 */

/**
 * Configuración principal del horario
 * @type {Object}
 */
const scheduleConfig = {
    "schedule": {
        "title": "📚 Horario de Estudio Semanal",
        "timeSlots": [
            "06:00-07:00",
            "07:00-08:00",
            "08:00-09:00",
            "09:00-10:00",
            "10:00-11:00",
            "11:00-12:00",
            "12:00-13:00",
            "13:00-14:00",
            "14:00-15:00",
            "15:00-16:00",
            "16:00-17:00",
            "17:00-18:00",
            "18:00-19:00",
            "19:00-20:00",
            "20:00-21:00",
            "21:00-22:00",
            "22:00+"
        ],
        "days": ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
        "considerations": [
            "🔴 Texto rojo: Todas las clases presenciales en universidad",
            "🔵 Recuadro azul: Todo el tiempo que estás en universidad (incluyendo esperas)",
            "🏫 Universidad: Los jueves y viernes te quedas todo el día hasta terminar",
            "📚 Estudio: Sesiones de estudio en casa con tonos más claros",
            "Desarrollo Software: Máxima prioridad con plan de respaldo para faltas del profesor",
            "Períodos de 1h: Destinados a ocio según tus preferencias",
            "Máximo 3h seguidas: En días libres para evitar saturación",
            "IBM: 5 horas distribuidas estratégicamente",
            "Tiempo libre: Celdas vacías para flexibilidad"
        ]
    },
    "subjects": {
        "desarrollo": {
            "name": "Desarrollo de Software",
            "classColor": "subject-desarrollo-clase",
            "studyColor": "subject-desarrollo-estudio",
            "icon": "💻",
            "priority": 1,
            "weeklyStudyHours": 8,
            "weeklyStudySessions": 9
        },
        "ciberseguridad": {
            "name": "Ciberseguridad",
            "classColor": "subject-ciberseguridad-clase",
            "studyColor": "subject-ciberseguridad-estudio",
            "icon": "🛡️",
            "priority": 2,
            "weeklyStudyHours": 4,
            "weeklyStudySessions": 5
        },
        "metodos": {
            "name": "Métodos Numéricos",
            "classColor": "subject-metodos-clase",
            "studyColor": "subject-metodos-estudio",
            "icon": "📊",
            "priority": 3,
            "weeklyStudyHours": 3,
            "weeklyStudySessions": 4
        },
        "inteligencia": {
            "name": "Inteligencia de Negocios",
            "classColor": "subject-inteligencia-clase",
            "studyColor": "subject-inteligencia-estudio",
            "icon": "📈",
            "priority": 4,
            "weeklyStudyHours": 3,
            "weeklyStudySessions": 4
        },
        "ingles": {
            "name": "Inglés I",
            "classColor": "subject-ingles-clase",
            "studyColor": "subject-ingles-estudio",
            "icon": "🇺🇸",
            "priority": 5,
            "weeklyStudyHours": 2,
            "weeklyStudySessions": 3
        },
        "etica": {
            "name": "Ética Profesional",
            "classColor": "subject-etica-clase",
            "studyColor": "subject-etica-estudio",
            "icon": "⚖️",
            "priority": 6,
            "weeklyStudyHours": 1.5,
            "weeklyStudySessions": 1,
            "isVirtual": true
        }
    },
    "activities": {
        "ibm": {
            "name": "IBM",
            "color": "activity-ibm",
            "icon": "🔧",
            "weeklyHours": 5
        },
        "transporte": {
            "name": "Transporte",
            "color": "activity-transporte",
            "icon": "🚌"
        },
        "almuerzo": {
            "name": "Almuerzo",
            "color": "activity-almuerzo",
            "icon": "🍽️"
        },
        "ocio": {
            "name": "Ocio",
            "color": "activity-ocio",
            "icon": "🎮"
        },
        "libre": {
            "name": "Tiempo Libre",
            "color": "activity-libre",
            "icon": "💤"
        },
        "descanso": {
            "name": "Descanso",
            "color": "activity-descanso",
            "icon": "😴"
        }
    }
};

/**
 * Datos del horario semanal
 * Contiene la información específica de cada día y hora
 * @type {Object}
 */
const scheduleData = {
    "06:00-07:00": ["", "", "", "Preparación", "Preparación", "", ""],
    "07:00-08:00": ["", "", "", "🚌 Universidad", "🚌 Universidad", "", ""],
    "08:00-09:00": ["Preparación", "Desayuno", "Desayuno", "🏫📊 Métodos Numéricos", "🏫🛡️ Ciberseguridad (Práctica)", "", ""],
    "09:00-10:00": ["🚌 Universidad", "📚💻 DESARROLLO SOFTWARE", "📚💻 DESARROLLO SOFTWARE", "🏫📊 Métodos Numéricos", "🏫🛡️ Ciberseguridad (Práctica)", "Desayuno", "Desayuno"],
    "10:00-11:00": ["🏫📈 Inteligencia de Negocios", "📚💻 DESARROLLO SOFTWARE", "📚💻 DESARROLLO SOFTWARE", "", "", "🔧 IBM", ""],
    "11:00-12:00": ["🏫📈 Inteligencia de Negocios", "📚💻 DESARROLLO SOFTWARE", "📚💻 DESARROLLO SOFTWARE", "", "", "🔧 IBM", ""],
    "12:00-13:00": ["🏫📈 Inteligencia de Negocios", "🍽️ Almuerzo", "🍽️ Almuerzo", "🍽️ Almuerzo", "🍽️ Almuerzo", "🍽️ Almuerzo", "🍽️ Almuerzo"],
    "13:00-14:00": ["🍽️ Almuerzo", "🔧 IBM", "🔧 IBM", "", "", "📚💻 DESARROLLO SOFTWARE", ""],
    "14:00-15:00": ["🎮 OCIO", "🔧 IBM", "🔧 IBM", "", "", "📚💻 DESARROLLO SOFTWARE", ""],
    "15:00-16:00": ["🏫🛡️ Ciberseguridad", "Descanso", "Descanso", "🏫🇺🇸 Inglés I", "", "", ""],
    "16:00-17:00": ["🏫🛡️ Ciberseguridad", "📚🛡️ CIBERSEGURIDAD", "📚📈 INTELIGENCIA NEGOCIOS", "🏫🇺🇸 Inglés I", "🏫💻 Desarrollo de Software", "", ""],
    "17:00-18:00": ["🎮 OCIO", "📚🛡️ CIBERSEGURIDAD", "📚📈 INTELIGENCIA NEGOCIOS", "🏫🇺🇸 Inglés I", "🏫💻 Desarrollo de Software", "", "📋 Prep. Semana"],
    "18:00-19:00": ["🏫💻 Desarrollo de Software", "🍽️ Cena", "🍽️ Cena", "🚌 Regreso", "🚌 Regreso", "🍽️ Cena", "📖 Revisión semanal"],
    "19:00-20:00": ["🏫💻 Desarrollo de Software", "📚📊 MÉTODOS NUMÉRICOS", "📚🇺🇸 INGLÉS", "🏫⚖️ Ética Profesional (Virtual)", "🍽️ Cena", "📚⚖️ ÉTICA PROFESIONAL", "🍽️ Cena"],
    "20:00-21:00": ["🚌 Regreso", "", "", "🏫⚖️ Ética Profesional (Virtual)", "", "", ""],
    "21:00-22:00": ["🍽️ Cena", "", "", "🍽️ Cena", "", "", ""],
    "22:00+": ["💤 Sueño", "💤 Sueño", "💤 Sueño", "💤 Sueño", "💤 Sueño", "💤 Sueño", "💤 Sueño"]
};

// Hacer las variables disponibles globalmente
window.scheduleConfig = scheduleConfig;
window.scheduleData = scheduleData;
