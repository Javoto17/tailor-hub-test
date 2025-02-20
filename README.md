# Aplicación React Native

## Estructura del Proyecto
```
├── src/
│   ├── components/
│   │   ├── features/     # Componentes específicos de funcionalidades
│   │   └── shared/       # Componentes reutilizables
│   ├── screens/          # Componentes de pantallas
│   ├── hooks/            # Hooks personalizados de React
│   ├── modules/          # Modulos de aplicación, infraestructura y dominio
```

## Principales Librerías y Tecnologías

### Core
- **React Native**: Framework para aplicaciones móviles
- **TypeScript**: Para seguridad de tipos y mejor experiencia de desarrollo
- **NativeWind**: Tailwind CSS para React Native, usado para estilos
- **React Navigation**: Manejo de navegación en la app

### Gestión de Estado y Obtención de Datos
- **@tanstack/react-query**: Para gestión de estado del servidor y obtención de datos
- **Zustand**: Solución ligera para gestión de estado
- **@react-native-async-storage/async-storage**: Para almacenamiento local

### Mapas y Localización
- **react-native-maps**: Para integración de mapas
- **@react-native-community/geolocation**: Servicios de localización

### Formularios y Validación
- **react-hook-form**: Manejo de formularios con validación

## Configuración del Entorno

1. Crear un archivo `.env` basado en `.env.example`:
```bash
cp .env.example .env
```

2. Variables de entorno requeridas:
```
API_URL=tu_url_api_aquí
GOOGLE_MAPS_API_KEY=tu_clave_api_google_maps_aquí
```

### Configuración de Google Maps API
Necesitas una clave de API de Google Maps con las siguientes APIs habilitadas:
- Maps SDK para Android
- Places API
- Geolocation API

Para obtener tu clave de API:
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita las APIs requeridas:
   - Maps SDK para Android
   - Places API
   - Geolocation API
4. Crea credenciales (clave API)
5. Añade la clave API a tu archivo `.env`

## Desarrollo

### Instalación
```bash
# Instalar dependencias
npm install

# Específico para iOS
cd ios && pod install && cd ..
```

### Ejecutar la Aplicación
```bash
# Iniciar Metro bundler
npm start

# Ejecutar en iOS
npm run ios

# Ejecutar en Android
npm run android
```

### Formateo de Código
```bash
# Formatear código con Prettier
npm run format
```

## Testing

### Tests Unitarios
El proyecto usa Jest y React Native Testing Library para tests unitarios.

```bash
# Ejecutar tests
npm test

# Ejecutar tests en modo watch
npm run test:watch
```

### Tests E2E con Detox
El proyecto usa Detox para pruebas end-to-end.

#### Tests E2E en iOS
```bash
# Construir app iOS para testing
npm run e2e:build:ios

# Ejecutar tests iOS
npm run e2e:test:ios

# Construir y testear versión de release
npm run e2e:build:ios:release
npm run e2e:test:ios:release
```

#### Tests E2E en Android
```bash
# Construir app Android para testing
npm run e2e:build:android

# Ejecutar tests Android
npm run e2e:test:android

# Construir y testear versión de release
npm run e2e:build:android:release
npm run e2e:test:android:release
```

## Características Principales
- Funcionalidad de login y registro con validación de formularios
- Integración de mapas con servicios de localización
- Autocompletado de Google Places para búsqueda de ubicaciones
- Seguimiento de ubicación en tiempo real
- Diseño responsive usando NativeWind (Tailwind CSS)

## Estrategia de Testing
- **Tests Unitarios**: Pruebas de componentes individuales y hooks
- **Tests E2E**: Pruebas de flujos completos de usuario como login/registro
- **Tests de Componentes**: Usando React Native Testing Library para comportamiento de componentes

## Contribuir
1. Haz fork del repositorio
2. Crea tu rama de funcionalidad (`git checkout -b feature/funcionalidad-asombrosa`)
3. Haz commit de tus cambios (`git commit -m 'Añadir alguna funcionalidad asombrosa'`)
4. Haz push a la rama (`git push origin feature/funcionalidad-asombrosa`)
5. Abre un Pull Request