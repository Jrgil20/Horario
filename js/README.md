# Módulos JavaScript del Horario de Estudio

Esta carpeta contiene los módulos JavaScript separados para el sistema de horario de estudio.

## Estructura de Archivos

### 📁 js/
- **`config.js`** - Configuración estática del horario
- **`schedule-generator.js`** - Clase principal para generar el horario
- **`app.js`** - Aplicación principal y funciones de control

## Descripción de Módulos

### config.js
Contiene toda la configuración estática del sistema:
- Configuración del horario (franjas horarias, días, consideraciones)
- Configuración de materias (colores, iconos, prioridades)
- Configuración de actividades
- Datos del horario semanal

**Exporta:**
- `scheduleConfig` - Configuración completa del sistema
- `scheduleData` - Datos del horario por día y hora

### schedule-generator.js
Clase principal que maneja la generación del horario:
- Detección automática de períodos universitarios
- Generación de clases CSS
- Creación de tabla HTML
- Generación de leyendas
- Cálculo de estadísticas

**Exporta:**
- `ScheduleGenerator` - Clase principal del generador

### app.js
Aplicación principal que maneja:
- Inicialización del sistema
- Funciones de control (refresh, export, print, stats)
- Manejo de errores
- Disponibilidad global de funciones

**Exporta:**
- `refreshSchedule()` - Actualiza el horario
- `exportSchedule()` - Exporta el horario
- `printSchedule()` - Imprime el horario
- `showStats()` - Muestra estadísticas

## Uso

El sistema se inicializa automáticamente cuando se carga la página a través de:

```html
<script type="module" src="js/app.js"></script>
```

## Beneficios de la Modularización

1. **Separación de responsabilidades**: Cada archivo tiene una función específica
2. **Mantenibilidad**: Es más fácil modificar y debuggear código separado
3. **Reutilización**: Los módulos pueden ser reutilizados en otros proyectos
4. **Escalabilidad**: Fácil agregar nuevas funcionalidades
5. **Legibilidad**: Código más organizado y fácil de entender

## Tecnologías Utilizadas

- **ES6 Modules**: Para importación/exportación de módulos
- **JavaScript Vanilla**: Sin dependencias externas
- **HTML5**: Estructura semántica
- **CSS3**: Estilos personalizados
