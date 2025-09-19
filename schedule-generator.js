/**
 * Generador de Horario Dinámico
 * Permite crear horarios basados en configuración JSON
 */
class ScheduleGenerator {
    constructor(config) {
        this.config = config;
        this.scheduleData = this.loadScheduleData();
    }

    /**
     * Carga los datos del horario desde el localStorage o usa datos por defecto
     */
    loadScheduleData() {
        const defaultData = {
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
            "20:00-21:00": ["🍽️ Cena", "", "", "🏫⚖️ Ética Profesional (Virtual)", "", "", ""],
            "21:00-22:00": ["", "", "", "🍽️ Cena", "", "", ""],
            "22:00+": ["💤 Sueño", "💤 Sueño", "💤 Sueño", "💤 Sueño", "💤 Sueño", "💤 Sueño", "💤 Sueño"]
        };

        try {
            const saved = localStorage.getItem('scheduleData');
            return saved ? JSON.parse(saved) : defaultData;
        } catch (error) {
            console.warn('Error loading schedule data, using default:', error);
            return defaultData;
        }
    }

    /**
     * Guarda los datos del horario en localStorage
     */
    saveScheduleData() {
        try {
            localStorage.setItem('scheduleData', JSON.stringify(this.scheduleData));
        } catch (error) {
            console.error('Error saving schedule data:', error);
        }
    }

    /**
     * Genera el HTML de la tabla de horario
     */
    generateScheduleTable() {
        const { timeSlots, days } = this.config.schedule;
        
        let html = '<table class="schedule-table">';
        
        // Encabezado
        html += '<thead><tr>';
        html += '<th>Hora</th>';
        days.forEach(day => {
            html += `<th>${day}</th>`;
        });
        html += '</tr></thead>';
        
        // Cuerpo de la tabla
        html += '<tbody>';
        timeSlots.forEach(timeSlot => {
            html += '<tr>';
            html += `<td class="time-column">${timeSlot}</td>`;
            
            const dayData = this.scheduleData[timeSlot] || [];
            for (let i = 0; i < days.length; i++) {
                const content = dayData[i] || '';
                const cellClass = this.getCellClass(content, timeSlot, i);
                html += `<td class="${cellClass}">${content}</td>`;
            }
            html += '</tr>';
        });
        html += '</tbody></table>';
        
        return html;
    }

    /**
     * Determina la clase CSS para una celda basada en su contenido
     */
    getCellClass(content, timeSlot, dayIndex) {
        if (!content) return '';
        
        // Clases de materias
        if (content.includes('DESARROLLO SOFTWARE')) return 'subject-desarrollo-estudio';
        if (content.includes('Desarrollo de Software')) return 'subject-desarrollo-clase in-university';
        if (content.includes('CIBERSEGURIDAD')) return 'subject-ciberseguridad-estudio';
        if (content.includes('Ciberseguridad')) return 'subject-ciberseguridad-clase in-university';
        if (content.includes('MÉTODOS NUMÉRICOS')) return 'subject-metodos-estudio';
        if (content.includes('Métodos Numéricos')) return 'subject-metodos-clase in-university';
        if (content.includes('INTELIGENCIA NEGOCIOS')) return 'subject-inteligencia-estudio';
        if (content.includes('Inteligencia de Negocios')) return 'subject-inteligencia-clase in-university';
        if (content.includes('INGLÉS')) return 'subject-ingles-estudio';
        if (content.includes('Inglés I')) return 'subject-ingles-clase in-university';
        if (content.includes('ÉTICA PROFESIONAL')) return 'subject-etica-estudio';
        if (content.includes('Ética Profesional')) return 'subject-etica-clase';
        
        // Clases de actividades
        if (content.includes('IBM')) return 'activity-ibm';
        if (content.includes('Universidad') || content.includes('Preparación') || content.includes('Regreso') || content.includes('Prep. Semana')) return 'activity-transporte';
        if (content.includes('Almuerzo') || content.includes('Desayuno') || content.includes('Cena')) return 'activity-almuerzo';
        if (content.includes('OCIO')) return 'activity-ocio';
        if (content.includes('Sueño') || content.includes('Revisión semanal')) return 'activity-libre';
        if (content.includes('Descanso')) return 'activity-descanso';
        
        // Universidad (días específicos)
        if ((dayIndex === 3 || dayIndex === 4) && content.includes('🏫')) return 'in-university';
        
        return '';
    }

    /**
     * Genera la leyenda de materias
     */
    generateSubjectsLegend() {
        const { subjects } = this.config;
        let html = '<div class="legend-item"><div class="legend-color subject-desarrollo-clase"></div><span class="text-bold">🏫 Desarrollo Software - Clase</span></div>';
        
        Object.values(subjects).forEach(subject => {
            html += `<div class="legend-item">
                <div class="legend-color ${subject.classColor}"></div>
                <span class="text-bold">🏫 ${subject.name} - Clase</span>
            </div>`;
            
            html += `<div class="legend-item">
                <div class="legend-color ${subject.studyColor}"></div>
                <span class="text-bold">📚 ${subject.name} - Estudio (${subject.weeklyStudySessions})</span> - ${subject.weeklyStudyHours}h semanales
            </div>`;
        });
        
        return html;
    }

    /**
     * Genera la leyenda de actividades
     */
    generateActivitiesLegend() {
        const { activities } = this.config;
        let html = '';
        
        Object.values(activities).forEach(activity => {
            const hoursText = activity.weeklyHours ? ` - ${activity.weeklyHours}h semanales` : '';
            html += `<div class="legend-item">
                <div class="legend-color ${activity.color}"></div>
                <span class="text-bold">${activity.icon} ${activity.name}</span>${hoursText}
            </div>`;
        });
        
        return html;
    }

    /**
     * Genera el HTML completo del horario
     */
    generateFullSchedule() {
        const { title, considerations } = this.config.schedule;
        
        return `
        <div class="schedule-container">
            <h1 class="schedule-title">${title}</h1>
            
            ${this.generateScheduleTable()}

            <div class="legend">
                <h3 class="legend-title">📋 Leyenda por Importancia</h3>
                ${this.generateSubjectsLegend()}
                ${this.generateActivitiesLegend()}
            </div>
            
            <div class="info-box">
                <h4 class="info-title mt-0">✅ Consideraciones del Plan:</h4>
                <ul class="info-list mb-0">
                    ${considerations.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        </div>`;
    }

    /**
     * Renderiza el horario en el elemento especificado
     */
    render(containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = this.generateFullSchedule();
        }
    }

    /**
     * Actualiza el contenido de una celda específica
     */
    updateCell(timeSlot, dayIndex, content) {
        if (!this.scheduleData[timeSlot]) {
            this.scheduleData[timeSlot] = new Array(7).fill('');
        }
        this.scheduleData[timeSlot][dayIndex] = content;
        this.saveScheduleData();
    }

    /**
     * Obtiene estadísticas del horario
     */
    getScheduleStats() {
        const stats = {
            totalStudyHours: 0,
            totalClassHours: 0,
            subjects: {}
        };

        Object.values(this.scheduleData).forEach(dayData => {
            dayData.forEach(cellContent => {
                if (cellContent.includes('DESARROLLO SOFTWARE')) stats.totalStudyHours += 1;
                if (cellContent.includes('CIBERSEGURIDAD')) stats.totalStudyHours += 1;
                if (cellContent.includes('MÉTODOS NUMÉRICOS')) stats.totalStudyHours += 1;
                if (cellContent.includes('INTELIGENCIA NEGOCIOS')) stats.totalStudyHours += 1;
                if (cellContent.includes('INGLÉS')) stats.totalStudyHours += 1;
                if (cellContent.includes('ÉTICA PROFESIONAL')) stats.totalStudyHours += 1;
                if (cellContent.includes('IBM')) stats.totalClassHours += 1;
            });
        });

        return stats;
    }
}

// Función para inicializar el generador cuando se carga la página
function initializeSchedule() {
    fetch('schedule-config.json')
        .then(response => response.json())
        .then(config => {
            const generator = new ScheduleGenerator(config);
            generator.render('schedule-container');
            
            // Hacer el generador disponible globalmente para debugging
            window.scheduleGenerator = generator;
        })
        .catch(error => {
            console.error('Error loading schedule config:', error);
            // Fallback: usar configuración por defecto
            const defaultConfig = {
                schedule: {
                    title: "📚 Horario de Estudio Semanal",
                    considerations: [
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
                subjects: {},
                activities: {}
            };
            const generator = new ScheduleGenerator(defaultConfig);
            generator.render('schedule-container');
        });
}

// Inicializar cuando se carga el DOM
document.addEventListener('DOMContentLoaded', initializeSchedule);
