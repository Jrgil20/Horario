# Sistema de Horario de Estudio Refactorizado

## 📋 Descripción

Este proyecto contiene un sistema de horario de estudio que ha sido refactorizado para ser más mantenible, escalable y estándar. Se ha separado el CSS del HTML y se ha creado una estructura modular que permite fácil modificación sin afectar la presentación visual.

## 🏗️ Arquitectura

### Archivos Principales

1. **`styles.css`** - Archivo CSS separado con variables CSS y clases genéricas
2. **`Horario202615_Sem_SepEne_2526_PR_refactored.html`** - Versión refactorizada del HTML original
3. **`Horario202615_Sem_SepEne_2526_PR_dynamic.html`** - Versión completamente dinámica
4. **`schedule-config.json`** - Configuración de materias, actividades y horarios
5. **`schedule-generator.js`** - Generador dinámico de horarios
6. **`Horario202615_Sem_SepEne_2526_PR.html`** - Archivo original (mantenido para referencia)

## 🎨 Mejoras Implementadas

### 1. Separación de Responsabilidades
- **CSS separado**: Todo el estilo está en `styles.css`
- **HTML semántico**: Uso de clases descriptivas y estructura clara
- **Configuración externa**: Datos en JSON para fácil modificación

### 2. Variables CSS
```css
:root {
    --primary-color: #2c3e50;
    --desarrollo-clase: #c0392b;
    --desarrollo-estudio: #e74c3c;
    /* ... más variables */
}
```

### 3. Clases Genéricas
- `subject-{materia}-{tipo}`: Para materias (clase/estudio)
- `activity-{actividad}`: Para actividades generales
- `in-university`: Para tiempo en universidad
- Clases de utilidad: `text-center`, `text-bold`, `mb-0`, etc.

### 4. Sistema Dinámico
- Generación automática desde configuración JSON
- Persistencia en localStorage
- API para modificar horarios programáticamente

## 🚀 Uso

### Versión Estática (Refactorizada)
```html
<!-- Usar el archivo refactorizado -->
<link rel="stylesheet" href="styles.css">
<!-- El HTML usa las nuevas clases CSS -->
```

### Versión Dinámica
```html
<!-- Usar la versión dinámica -->
<div id="schedule-container"></div>
<script src="schedule-generator.js"></script>
```

### Modificar Configuración
Editar `schedule-config.json` para cambiar:
- Materias y sus colores
- Horarios de clases
- Actividades
- Consideraciones del plan

## 🔧 API del Generador

```javascript
// Obtener instancia del generador
const generator = window.scheduleGenerator;

// Actualizar una celda específica
generator.updateCell('10:00-11:00', 1, 'Nueva actividad');

// Obtener estadísticas
const stats = generator.getScheduleStats();

// Regenerar horario
generator.render('schedule-container');
```

## 📊 Estructura de Clases CSS

### Materias
- `.subject-{materia}-clase`: Clases presenciales
- `.subject-{materia}-estudio`: Sesiones de estudio

### Actividades
- `.activity-ibm`: Trabajo en IBM
- `.activity-transporte`: Transporte y preparación
- `.activity-almuerzo`: Comidas
- `.activity-ocio`: Tiempo libre
- `.activity-libre`: Tiempo libre general
- `.activity-descanso`: Descanso

### Estados
- `.in-university`: Tiempo en universidad (borde azul)

### Utilidades
- `.text-center`: Centrar texto
- `.text-bold`: Texto en negrita
- `.mb-0`, `.mt-0`: Márgenes

## 🎯 Beneficios de la Refactorización

1. **Mantenibilidad**: Cambios de color/estilo en un solo lugar
2. **Escalabilidad**: Fácil agregar nuevas materias o actividades
3. **Reutilización**: Clases CSS reutilizables
4. **Flexibilidad**: Sistema dinámico para modificaciones
5. **Estándares**: Código más limpio y semántico
6. **Performance**: CSS optimizado con variables
7. **Debugging**: Fácil identificar y modificar estilos

## 🔄 Migración

Para migrar un horario existente:

1. **Identificar patrones**: Materias, actividades, estados
2. **Crear clases genéricas**: Basadas en los patrones encontrados
3. **Extraer variables**: Colores, espaciados, tipografías
4. **Refactorizar HTML**: Usar las nuevas clases
5. **Crear configuración**: JSON con datos del horario
6. **Implementar generador**: Para versiones dinámicas

## 📝 Próximos Pasos

- [ ] Agregar validación de horarios
- [ ] Implementar exportación a PDF
- [ ] Crear interfaz de edición visual
- [ ] Agregar temas (claro/oscuro)
- [ ] Implementar notificaciones de horarios
- [ ] Crear sistema de plantillas

## 🤝 Contribución

Para contribuir al proyecto:

1. Seguir las convenciones de nomenclatura establecidas
2. Mantener la separación de responsabilidades
3. Documentar nuevas funcionalidades
4. Probar cambios en ambas versiones (estática y dinámica)

## 📄 Licencia

Este proyecto es de uso personal y educativo.
