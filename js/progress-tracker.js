/**
 * Seguimiento de progreso semanal
 * Muestra el progreso en tiempo real del horario de estudio
 */

class ProgressTracker {
    /**
     * Constructor del rastreador de progreso
     * @param {Object} scheduleConfig - Configuración del horario
     * @param {Object} scheduleData - Datos del horario
     */
    constructor(scheduleConfig, scheduleData) {
        this.config = scheduleConfig;
        this.data = scheduleData;
        this.currentDate = new Date();
        this.currentTime = this.getCurrentTime();
        this.currentDayIndex = this.getCurrentDayIndex();
        this.currentTimeSlotIndex = this.getCurrentTimeSlotIndex();
    }

    /**
     * Obtiene la hora actual en formato HH:MM
     * @returns {string} Hora actual
     */
    getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    /**
     * Obtiene el índice del día actual (0-6, donde 0 es Lunes)
     * @returns {number} Índice del día actual
     */
    getCurrentDayIndex() {
        const dayOfWeek = this.currentDate.getDay();
        // Convertir domingo (0) a 6, lunes (1) a 0, etc.
        return (dayOfWeek + 6) % 7;
    }

    /**
     * Obtiene el índice del slot de tiempo actual
     * @returns {number} Índice del slot de tiempo
     */
    getCurrentTimeSlotIndex() {
        const currentTime = this.currentTime;
        const timeSlots = this.config.schedule.timeSlots;
        
        for (let i = 0; i < timeSlots.length; i++) {
            const slot = timeSlots[i];
            
            if (slot === "22:00+") {
                // Para el último slot, verificar si son las 22:00 o más
                if (currentTime >= "22:00") {
                    return i;
                }
            } else {
                const [startTime, endTime] = slot.split('-');
                if (currentTime >= startTime && currentTime < endTime) {
                    return i;
                }
            }
        }
        
        // Si no se encuentra un slot específico, retornar el último
        return timeSlots.length - 1;
    }

    /**
     * Verifica si una celda está en el pasado
     * @param {number} dayIndex - Índice del día (0-6)
     * @param {number} timeSlotIndex - Índice del slot de tiempo
     * @returns {boolean} True si está en el pasado
     */
    isInPast(dayIndex, timeSlotIndex) {
        // Si el día está en el pasado
        if (dayIndex < this.currentDayIndex) {
            return true;
        }
        
        // Si es el día actual y el tiempo está en el pasado
        if (dayIndex === this.currentDayIndex && timeSlotIndex < this.currentTimeSlotIndex) {
            return true;
        }
        
        return false;
    }

    /**
     * Verifica si una celda es la hora actual
     * @param {number} dayIndex - Índice del día (0-6)
     * @param {number} timeSlotIndex - Índice del slot de tiempo
     * @returns {boolean} True si es la hora actual
     */
    isCurrentTime(dayIndex, timeSlotIndex) {
        return dayIndex === this.currentDayIndex && timeSlotIndex === this.currentTimeSlotIndex;
    }

    /**
     * Obtiene las clases CSS para el progreso
     * @param {number} dayIndex - Índice del día
     * @param {number} timeSlotIndex - Índice del slot de tiempo
     * @returns {string} Clases CSS adicionales
     */
    getProgressClasses(dayIndex, timeSlotIndex) {
        let classes = '';
        
        if (this.isInPast(dayIndex, timeSlotIndex)) {
            classes += ' past-time';
        }
        
        if (this.isCurrentTime(dayIndex, timeSlotIndex)) {
            classes += ' current-time';
        }
        
        return classes;
    }

    /**
     * Obtiene el emoji de progreso para una celda
     * @param {number} dayIndex - Índice del día
     * @param {number} timeSlotIndex - Índice del slot de tiempo
     * @returns {string} Emoji de progreso
     */
    getProgressEmoji(dayIndex, timeSlotIndex) {
        if (this.isCurrentTime(dayIndex, timeSlotIndex)) {
            return '👤'; // Emoji de persona para hora actual
        }
        
        if (this.isInPast(dayIndex, timeSlotIndex)) {
            return '✅'; // Check mark para tiempo pasado
        }
        
        return ''; // Sin emoji para tiempo futuro
    }

    /**
     * Obtiene información del progreso actual
     * @returns {Object} Información del progreso
     */
    getProgressInfo() {
        const days = this.config.schedule.days;
        const timeSlots = this.config.schedule.timeSlots;
        
        return {
            currentDay: days[this.currentDayIndex],
            currentTime: this.currentTime,
            currentTimeSlot: timeSlots[this.currentTimeSlotIndex],
            dayIndex: this.currentDayIndex,
            timeSlotIndex: this.currentTimeSlotIndex,
            weekProgress: this.calculateWeekProgress()
        };
    }

    /**
     * Calcula el progreso semanal como porcentaje
     * @returns {number} Porcentaje de progreso (0-100)
     */
    calculateWeekProgress() {
        const totalSlots = this.config.schedule.timeSlots.length * 7; // 7 días
        const currentSlot = this.currentDayIndex * this.config.schedule.timeSlots.length + this.currentTimeSlotIndex;
        
        return Math.round((currentSlot / totalSlots) * 100);
    }

    /**
     * Actualiza el progreso (para usar en intervalos)
     */
    updateProgress() {
        this.currentDate = new Date();
        this.currentTime = this.getCurrentTime();
        this.currentDayIndex = this.getCurrentDayIndex();
        this.currentTimeSlotIndex = this.getCurrentTimeSlotIndex();
    }

    /**
     * Obtiene el estado de la semana (iniciada, en progreso, completada)
     * @returns {string} Estado de la semana
     */
    getWeekStatus() {
        const progress = this.calculateWeekProgress();
        
        if (progress === 0) {
            return 'iniciada';
        } else if (progress < 100) {
            return 'en progreso';
        } else {
            return 'completada';
        }
    }
}

// Hacer la clase disponible globalmente
window.ProgressTracker = ProgressTracker;
