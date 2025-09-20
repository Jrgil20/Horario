/**
 * Generador de horario de estudio
 * Clase principal para generar y renderizar el horario
 */

/**
 * Clase principal para generar el horario de estudio
 */
class ScheduleGenerator {
    /**
     * Constructor del generador de horario
     * @param {Object} config - Configuración del horario
     * @param {Object} data - Datos del horario
     */
    constructor(config, data) {
        this.config = config;
        this.scheduleData = data;
        this.progressTracker = new ProgressTracker(config, data);
    }

    /**
     * Detecta automáticamente si un período está dentro del horario universitario
     * @param {string} timeSlot - Slot de tiempo actual
     * @param {number} dayIndex - Índice del día (0-6)
     * @returns {boolean} - True si está en período universitario
     */
    isInUniversityPeriod(timeSlot, dayIndex) {
        const { timeSlots } = this.config.schedule;
        const currentTimeIndex = timeSlots.indexOf(timeSlot);
        
        // Buscar el índice de "Universidad" en este día
        let universityStartIndex = -1;
        let regresoIndex = -1;
        
        // Buscar desde el inicio hasta encontrar "Universidad"
        for (let i = 0; i < timeSlots.length; i++) {
            const dayData = this.scheduleData[timeSlots[i]] || [];
            const cellContent = dayData[dayIndex] || '';
            
            if (cellContent.includes('Universidad')) {
                universityStartIndex = i;
                break;
            }
        }
        
        // Buscar "Regreso" después del inicio de universidad
        if (universityStartIndex !== -1) {
            for (let i = universityStartIndex + 1; i < timeSlots.length; i++) {
                const dayData = this.scheduleData[timeSlots[i]] || [];
                const cellContent = dayData[dayIndex] || '';
                
                if (cellContent.includes('Regreso')) {
                    regresoIndex = i;
                    break;
                }
            }
        }
        
        // Si encontramos ambos, verificar si estamos en el rango
        if (universityStartIndex !== -1 && regresoIndex !== -1) {
            // Estamos en universidad si estamos después del inicio y antes del regreso
            return currentTimeIndex > universityStartIndex && currentTimeIndex < regresoIndex;
        }
        
        // Si solo encontramos inicio pero no regreso, asumir que estamos en universidad hasta el final del día
        if (universityStartIndex !== -1 && regresoIndex === -1) {
            return currentTimeIndex > universityStartIndex;
        }
        
        return false;
    }

    /**
     * Obtiene la clase CSS correspondiente para una celda
     * @param {string} content - Contenido de la celda
     * @param {string} timeSlot - Slot de tiempo
     * @param {number} dayIndex - Índice del día
     * @returns {string} - Clase CSS
     */
    getCellClass(content, timeSlot, dayIndex) {
        let universityClass = '';
        let progressClass = '';
        
        // Determinar automáticamente si está en universidad
        const isInUniversity = this.isInUniversityPeriod(timeSlot, dayIndex);
        
        if (isInUniversity) {
            universityClass = ' in-university';
        }
        
        // Obtener clases de progreso
        const timeSlotIndex = this.config.schedule.timeSlots.indexOf(timeSlot);
        progressClass = this.progressTracker.getProgressClasses(dayIndex, timeSlotIndex);
        
        // Si no hay contenido, solo devolver las clases de universidad y progreso
        if (!content) return universityClass + progressClass;
        
        // Clases de materias
        if (content.includes('DESARROLLO SOFTWARE')) return 'subject-desarrollo-estudio' + universityClass + progressClass;
        if (content.includes('Desarrollo de Software')) return 'subject-desarrollo-clase' + universityClass + progressClass;
        if (content.includes('CIBERSEGURIDAD')) return 'subject-ciberseguridad-estudio' + universityClass + progressClass;
        if (content.includes('Ciberseguridad')) return 'subject-ciberseguridad-clase' + universityClass + progressClass;
        if (content.includes('MÉTODOS NUMÉRICOS')) return 'subject-metodos-estudio' + universityClass + progressClass;
        if (content.includes('Métodos Numéricos')) return 'subject-metodos-clase' + universityClass + progressClass;
        if (content.includes('INTELIGENCIA NEGOCIOS')) return 'subject-inteligencia-estudio' + universityClass + progressClass;
        if (content.includes('Inteligencia de Negocios')) return 'subject-inteligencia-clase' + universityClass + progressClass;
        if (content.includes('INGLÉS')) return 'subject-ingles-estudio' + universityClass + progressClass;
        if (content.includes('Inglés I')) return 'subject-ingles-clase' + universityClass + progressClass;
        if (content.includes('ÉTICA PROFESIONAL')) return 'subject-etica-estudio' + universityClass + progressClass;
        if (content.includes('Ética Profesional')) return 'subject-etica-clase' + universityClass + progressClass;
        
        // Clases de actividades
        if (content.includes('IBM')) return 'activity-ibm' + universityClass + progressClass;
        if (content.includes('Universidad') || content.includes('Preparación') || content.includes('Regreso') || content.includes('Prep. Semana')) return 'activity-transporte' + universityClass + progressClass;
        if (content.includes('Almuerzo') || content.includes('Desayuno') || content.includes('Cena')) return 'activity-almuerzo' + universityClass + progressClass;
        if (content.includes('OCIO')) return 'activity-ocio' + universityClass + progressClass;
        if (content.includes('Sueño') || content.includes('Revisión semanal')) return 'activity-libre' + universityClass + progressClass;
        if (content.includes('Descanso')) return 'activity-descanso' + universityClass + progressClass;
        
        // Para cualquier otro contenido
        return universityClass + progressClass;
    }

    /**
     * Genera la tabla HTML del horario
     * @returns {string} - HTML de la tabla
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
                const timeSlotIndex = this.config.schedule.timeSlots.indexOf(timeSlot);
                const progressEmoji = this.progressTracker.getProgressEmoji(i, timeSlotIndex);
                
                html += `<td class="${cellClass}">${content}`;
                if (progressEmoji) {
                    html += `<span class="progress-emoji">${progressEmoji}</span>`;
                }
                html += `</td>`;
            }
            html += '</tr>';
        });
        html += '</tbody></table>';
        
        return html;
    }

    /**
     * Genera la leyenda de materias
     * @returns {string} - HTML de la leyenda de materias
     */
    generateSubjectsLegend() {
        const { subjects } = this.config;
        let html = '';
        
        // Calcular horas reales de cada materia
        const subjectStats = this.calculateSubjectStats();
        
        Object.values(subjects).forEach(subject => {
            const stats = subjectStats[subject.name] || { classHours: 0, studyHours: 0 };
            
            // Clase presencial
            if (stats.classHours > 0) {
                html += `<div class="legend-item">
                    <div class="legend-color ${subject.classColor}"></div>
                    <span class="text-bold">🏫 ${subject.name} - Clase</span> - ${stats.classHours}h semanales
                </div>`;
            }
            
            // Estudio
            if (stats.studyHours > 0) {
                html += `<div class="legend-item">
                    <div class="legend-color ${subject.studyColor}"></div>
                    <span class="text-bold">📚 ${subject.name} - Estudio</span> - ${stats.studyHours}h semanales
                </div>`;
            }
        });
        
        return html;
    }

    /**
     * Calcula las estadísticas reales de las materias
     * @returns {Object} - Estadísticas de materias
     */
    calculateSubjectStats() {
        const stats = {};
        
        Object.values(this.scheduleData).forEach(dayData => {
            dayData.forEach(cellContent => {
                if (!cellContent) return;
                
                // Detectar materias y tipo (clase o estudio)
                if (cellContent.includes('Desarrollo de Software')) {
                    this.addSubjectStats(stats, 'Desarrollo de Software', 'class');
                } else if (cellContent.includes('DESARROLLO SOFTWARE')) {
                    this.addSubjectStats(stats, 'Desarrollo de Software', 'study');
                } else if (cellContent.includes('Ciberseguridad')) {
                    this.addSubjectStats(stats, 'Ciberseguridad', 'class');
                } else if (cellContent.includes('CIBERSEGURIDAD')) {
                    this.addSubjectStats(stats, 'Ciberseguridad', 'study');
                } else if (cellContent.includes('Métodos Numéricos')) {
                    this.addSubjectStats(stats, 'Métodos Numéricos', 'class');
                } else if (cellContent.includes('MÉTODOS NUMÉRICOS')) {
                    this.addSubjectStats(stats, 'Métodos Numéricos', 'study');
                } else if (cellContent.includes('Inteligencia de Negocios')) {
                    this.addSubjectStats(stats, 'Inteligencia de Negocios', 'class');
                } else if (cellContent.includes('INTELIGENCIA NEGOCIOS')) {
                    this.addSubjectStats(stats, 'Inteligencia de Negocios', 'study');
                } else if (cellContent.includes('Inglés I')) {
                    this.addSubjectStats(stats, 'Inglés I', 'class');
                } else if (cellContent.includes('INGLÉS')) {
                    this.addSubjectStats(stats, 'Inglés I', 'study');
                } else if (cellContent.includes('Ética Profesional')) {
                    this.addSubjectStats(stats, 'Ética Profesional', 'class');
                } else if (cellContent.includes('ÉTICA PROFESIONAL')) {
                    this.addSubjectStats(stats, 'Ética Profesional', 'study');
                }
            });
        });
        
        return stats;
    }

    /**
     * Añade estadísticas de una materia
     * @param {Object} stats - Objeto de estadísticas
     * @param {string} subjectName - Nombre de la materia
     * @param {string} type - Tipo: 'class' o 'study'
     */
    addSubjectStats(stats, subjectName, type) {
        if (!stats[subjectName]) {
            stats[subjectName] = { classHours: 0, studyHours: 0 };
        }
        
        if (type === 'class') {
            stats[subjectName].classHours += 1;
        } else if (type === 'study') {
            stats[subjectName].studyHours += 1;
        }
    }

    /**
     * Genera la leyenda de actividades
     * @returns {string} - HTML de la leyenda de actividades
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
     * Genera el horario completo con leyenda y consideraciones
     * @returns {string} - HTML completo del horario
     */
    generateFullSchedule() {
        const { title, considerations } = this.config.schedule;
        const progressInfo = this.progressTracker.getProgressInfo();
        
        return `
        <div class="schedule-container">
            <h1 class="schedule-title">${title}</h1>
            
            <div class="progress-indicator">
                <div class="progress-text">
                    <span>👤</span>
                    <span>Progreso Semanal: ${progressInfo.weekProgress}%</span>
                    <span>•</span>
                    <span>${progressInfo.currentDay} ${progressInfo.currentTime}</span>
                    <span>•</span>
                    <span>Estado: ${this.progressTracker.getWeekStatus()}</span>
                </div>
            </div>
            
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
     * Renderiza el horario en el contenedor especificado
     * @param {string} containerId - ID del contenedor
     */
    render(containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = this.generateFullSchedule();
        }
    }

    /**
     * Obtiene las estadísticas del horario
     * @returns {Object} - Estadísticas completas
     */
    getScheduleStats() {
        const subjectStats = this.calculateSubjectStats();
        const stats = {
            totalStudyHours: 0,
            totalClassHours: 0,
            totalIBMHours: 0,
            subjects: subjectStats
        };

        // Calcular totales
        Object.values(subjectStats).forEach(subject => {
            stats.totalStudyHours += subject.studyHours;
            stats.totalClassHours += subject.classHours;
        });

        // Calcular horas de IBM
        Object.values(this.scheduleData).forEach(dayData => {
            dayData.forEach(cellContent => {
                if (cellContent.includes('IBM')) stats.totalIBMHours += 1;
            });
        });

        return stats;
    }

    /**
     * Actualiza el progreso y re-renderiza el horario
     */
    updateProgress() {
        this.progressTracker.updateProgress();
        // Re-renderizar solo si ya se había renderizado antes
        const container = document.getElementById('schedule-container');
        if (container && container.innerHTML.trim()) {
            this.render('schedule-container');
        }
    }

    /**
     * Obtiene información del progreso actual
     * @returns {Object} Información del progreso
     */
    getProgressInfo() {
        return this.progressTracker.getProgressInfo();
    }
}

// Hacer la clase disponible globalmente
window.ScheduleGenerator = ScheduleGenerator;
