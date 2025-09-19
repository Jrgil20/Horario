# Sistema de Horario de Estudio Refactorizado

## 📋 Descripción

Este proyecto contiene un sistema de horario de estudio que ha sido refactorizado para ser más mantenible, escalable y estándar. Se ha separado el CSS del HTML y se ha creado una estructura modular que permite fácil modificación sin afectar la presentación visual.

## 🏗️ Arquitectura

### Archivos Principales

1. **`index.html`** - Archivo principal con interfaz mejorada y detección automática
2. **`styles.css`** - Archivo CSS separado con variables CSS y clases genéricas
3. **`Horario202615_Sem_SepEne_2526_PR.html`** - Archivo original (mantenido para referencia)
4. **`schedule-generator.js`** - Generador dinámico de horarios (opcional)
5. **`README.md`** - Documentación completa del sistema

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
- Generación automática desde configuración embebida
- Detección automática de períodos de universidad
- Interfaz mejorada con controles y estadísticas
- API para modificar horarios programáticamente

### 5. Detección Automática de Universidad
- **Detección inteligente**: Busca automáticamente celdas con "Universidad"
- **Rango automático**: Marca con recuadro azul desde "Universidad" hasta "Regreso"
- **Sin configuración manual**: No necesitas marcar horarios manualmente
- **Flexible**: Se adapta automáticamente a cualquier cambio en los horarios

#### Cómo Funciona la Detección Automática:
1. **Busca "Universidad"**: El sistema encuentra la celda que contiene "Universidad"
2. **Busca "Regreso"**: Encuentra la celda que contiene "Regreso" después del inicio
3. **Aplica recuadro azul**: Marca automáticamente todas las celdas entre ambos puntos
4. **Maneja casos especiales**: Si no hay "Regreso", marca hasta el final del día

#### Ejemplo de Funcionamiento:
```
Jueves:
07:00-08:00: "🚌 Universidad" ← INICIO (detectado automáticamente)
08:00-09:00: "🏫📊 Métodos..." ← Recuadro azul automático
09:00-10:00: "🏫📊 Métodos..." ← Recuadro azul automático
...
18:00-19:00: "🚌 Regreso" ← FIN (detectado automáticamente)
```

## 🚀 Uso

### Archivo Principal (Recomendado)
```html
<!-- Abrir index.html en el navegador -->
<!-- Incluye interfaz mejorada y detección automática -->
```

### Características del Index.html
- **Interfaz profesional**: Header con gradiente y controles
- **Detección automática**: Períodos de universidad detectados automáticamente
- **Controles integrados**: Actualizar, imprimir, ver estadísticas
- **Responsive**: Se adapta a cualquier dispositivo

### Modificar Horarios
Para cambiar horarios, editar el objeto `scheduleData` en `index.html`:
- Agregar/remover actividades
- Cambiar horarios de clases
- El sistema detecta automáticamente períodos de universidad

## 🔧 API del Generador

```javascript
// Obtener instancia del generador
const generator = window.scheduleGenerator;

// Obtener estadísticas
const stats = generator.getScheduleStats();

// Regenerar horario
generator.render('schedule-container');

// Verificar si está en universidad (automático)
const isInUni = generator.isInUniversityPeriod('10:00-11:00', 0); // Lunes 10:00
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
8. **Automatización**: Detección automática de períodos de universidad
9. **Interfaz mejorada**: Controles profesionales y estadísticas

## 🔄 Migración

Para migrar un horario existente:

1. **Identificar patrones**: Materias, actividades, estados
2. **Crear clases genéricas**: Basadas en los patrones encontrados
3. **Extraer variables**: Colores, espaciados, tipografías
4. **Refactorizar HTML**: Usar las nuevas clases
5. **Crear configuración**: JSON con datos del horario
6. **Implementar generador**: Para versiones dinámicas

## 📝 Próximos Pasos

- [x] ✅ Detección automática de períodos de universidad
- [x] ✅ Interfaz mejorada con controles
- [x] ✅ Sistema de estadísticas
- [ ] Implementar exportación a PDF
- [ ] Crear interfaz de edición visual
- [ ] Agregar temas (claro/oscuro)
- [ ] Implementar notificaciones de horarios
- [ ] Crear sistema de plantillas
- [ ] Agregar validación de horarios

## 🤝 Contribución

Para contribuir al proyecto:

1. Seguir las convenciones de nomenclatura establecidas
2. Mantener la separación de responsabilidades
3. Documentar nuevas funcionalidades
4. Probar cambios en ambas versiones (estática y dinámica)

## 📄 Licencia

Este proyecto es de uso personal y educativo.
