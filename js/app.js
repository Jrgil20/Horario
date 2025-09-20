/**
 * Aplicación principal del horario de estudio
 * Maneja la inicialización y funciones de control
 */

// Las variables scheduleConfig, scheduleData y ScheduleGenerator
// están disponibles globalmente desde los otros archivos

/**
 * Variable global para el generador de horario
 * @type {ScheduleGenerator|null}
 */
let scheduleGenerator = null;

/**
 * Refresca el horario mostrando un indicador de carga
 */
function refreshSchedule() {
    const container = document.getElementById('schedule-container');
    if (!container) {
        console.error('❌ Contenedor del horario no encontrado');
        return;
    }
    
    container.innerHTML = '<div class="loading"><p>⏳ Actualizando horario...</p></div>';
    
    setTimeout(() => {
        try {
            scheduleGenerator = new ScheduleGenerator(scheduleConfig, scheduleData);
            scheduleGenerator.render('schedule-container');
            console.log('✅ Horario actualizado correctamente');
        } catch (error) {
            console.error('❌ Error al actualizar el horario:', error);
            container.innerHTML = '<div class="error"><h3>❌ Error al actualizar el horario</h3><p>Por favor, recarga la página.</p></div>';
        }
    }, 500);
}

/**
 * Exporta el horario (función en desarrollo)
 */
function exportSchedule() {
    alert('📄 Función de exportación a PDF en desarrollo. Por ahora puedes usar Ctrl+P para imprimir.');
}

/**
 * Imprime el horario actual
 */
function printSchedule() {
    window.print();
}

/**
 * Muestra las estadísticas del horario
 */
function showStats() {
    if (!scheduleGenerator) {
        alert('❌ No se ha inicializado el generador de horario');
        return;
    }
    
    try {
        const stats = scheduleGenerator.getScheduleStats();
        
        let message = `📊 Estadísticas del Horario:\n\n`;
        message += `📚 Horas de Estudio: ${stats.totalStudyHours}h\n`;
        message += `🏫 Horas de Clase: ${stats.totalClassHours}h\n`;
        message += `🔧 Horas de IBM: ${stats.totalIBMHours}h\n`;
        message += `📈 Total de Horas Académicas: ${stats.totalStudyHours + stats.totalClassHours + stats.totalIBMHours}h\n\n`;
        
        message += `📋 Detalle por Materia:\n`;
        Object.entries(stats.subjects).forEach(([subject, data]) => {
            if (data.classHours > 0 || data.studyHours > 0) {
                message += `• ${subject}: ${data.classHours}h clase + ${data.studyHours}h estudio\n`;
            }
        });
        
        alert(message);
    } catch (error) {
        console.error('❌ Error al obtener estadísticas:', error);
        alert('❌ Error al obtener las estadísticas del horario');
    }
}

/**
 * Inicializa la aplicación del horario
 */
function initializeApp() {
    try {
        console.log('🚀 Inicializando aplicación del horario...');
        
        // Crear el generador de horario
        scheduleGenerator = new ScheduleGenerator(scheduleConfig, scheduleData);
        
        // Renderizar el horario
        scheduleGenerator.render('schedule-container');
        
        // Hacer el generador disponible globalmente para funciones de control
        window.scheduleGenerator = scheduleGenerator;
        
        // Hacer las funciones de control disponibles globalmente
        window.refreshSchedule = refreshSchedule;
        window.exportSchedule = exportSchedule;
        window.printSchedule = printSchedule;
        window.showStats = showStats;
        
        // Iniciar actualización automática del progreso cada minuto
        setInterval(() => {
            if (scheduleGenerator) {
                scheduleGenerator.updateProgress();
            }
        }, 60000); // Actualizar cada minuto
        
        console.log('✅ Aplicación del horario inicializada correctamente');
    } catch (error) {
        console.error('❌ Error al inicializar la aplicación:', error);
        const container = document.getElementById('schedule-container');
        if (container) {
            container.innerHTML = '<div class="error"><h3>❌ Error al cargar el horario</h3><p>Por favor, recarga la página o contacta al administrador.</p></div>';
        }
    }
}

/**
 * Inicializa la aplicación cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', initializeApp);

// Las funciones ya están disponibles globalmente a través de window
