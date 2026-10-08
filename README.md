# ⏰ Alarma Divertida - Configuración del dispositivo Android

## 📱 Configuración necesaria para que las alarmas funcionen correctamente

Esta aplicación utiliza `react-native-wake-alarm` para ejecutar alarmas reales en Android.

Para que la alarma pueda sonar correctamente cuando el teléfono esté bloqueado o la aplicación esté en segundo plano, es necesario configurar algunos permisos y restricciones del sistema.

> ⚠️ Estas configuraciones pueden variar ligeramente dependiendo de la marca y versión de Android.

---

# 1. 🔔 Permitir notificaciones

Ir a:

**Configuración → Aplicaciones → Alarma divertida → Notificaciones**

Activar:

- ✅ Permitir notificaciones

Esto permite que Android muestre las notificaciones relacionadas con la alarma.

---

# 2. ⏰ Permitir alarmas y recordatorios

Ir a:

**Configuración → Aplicaciones → Acceso especial de aplicaciones → Alarmas y recordatorios**

Buscar:

**Alarma divertida**

Activar:

- ✅ Permitir alarmas y recordatorios

Este permiso es importante para que Android pueda programar alarmas exactas.

---

# 3. 📱 Permitir notificaciones de pantalla completa

Ir a:

**Configuración → Aplicaciones → Acceso especial de aplicaciones → Notificaciones de pantalla completa**

Buscar:

**Alarma divertida**

Activar:

- ✅ Permitir

## ¿Por qué es importante?

Este permiso permite que la aplicación pueda mostrar su pantalla de alarma por encima de la pantalla de bloqueo.

Si este permiso está desactivado, Android puede mostrar solamente una notificación como:

> Despertar  
> ¡Es hora de despertar!  
> Stop

En lugar de mostrar la pantalla personalizada de la aplicación.

Con este permiso activado se puede mostrar:

> 🔴 ¡DESPIERTA!  
> 🔘 Botón que se mueve por la pantalla

---

# 4. 🔋 Permitir uso en segundo plano

Ir a:

**Configuración → Aplicaciones → Alarma divertida → Batería**

Buscar una opción similar a:

- Uso en segundo plano
- Permitir uso en segundo plano
- Batería
- Actividad en segundo plano

Seleccionar:

- ✅ Permitir uso en segundo plano

Esto evita que el sistema cierre o limite la aplicación mientras está funcionando en segundo plano.

---

# 5. 🔋 Desactivar la administración automática de la aplicación

En algunos dispositivos, especialmente Motorola, puede existir una opción similar a:

**Administrar la aplicación si no se usa**

o una opción de optimización automática.

Para una aplicación de alarma se recomienda evitar que Android suspenda automáticamente la aplicación.

Si existe una opción como:

- ❌ Administrar automáticamente
- ❌ Suspender aplicación si no se usa
- ❌ Optimización agresiva de batería

desactivarla para esta aplicación.

---

# 6. 🔒 Probar con el teléfono bloqueado

Después de realizar las configuraciones:

1. Abrir **Alarma divertida**.
2. Crear una alarma.
3. Activarla.
4. Cerrar la aplicación.
5. Bloquear el teléfono.
6. Esperar la hora programada.

La aplicación debe:

1. 🔊 Reproducir el sonido seleccionado.
2. 📱 Encender/mostrar la pantalla de alarma.
3. 🔴 Mostrar la pantalla personalizada.
4. 🔘 Mostrar el botón que se mueve.
5. 👆 Solicitar 3 aciertos para detener la alarma.

---

# 7. 🔊 Sonidos personalizados

La aplicación incluye varios sonidos:

```text
alarm.mp3
alarm2.mp3
alarm3.mp3
alarm4.mp3
alarm5.mp3
alarm6.mp3
alarm7.mp3

12. 🛠️ Tecnología utilizada
La aplicación utiliza:
- React Native
- Expo
- Expo Router
- TypeScript
- NativeWind
- AsyncStorage
- Expo Audio
- React Native Wake Alarm
- EAS Build
La ejecución de la alarma real en Android depende principalmente de:
react-native-wake-alarm

La pantalla personalizada de la alarma utiliza:
NativeAlarmScreen

13. 🔄 Flujo de funcionamiento
Usuario crea alarma
        ↓
Selecciona hora
        ↓
Selecciona días
        ↓
Selecciona sonido
        ↓
Guarda alarma
        ↓
AsyncStorage
        ↓
WakeAlarm.schedule()
        ↓
Android programa la alarma
        ↓
Teléfono bloqueado
        ↓
Llega la hora
        ↓
WakeAlarm ejecuta la alarma
        ↓
Se reproduce el sonido
        ↓
Se muestra la pantalla completa
        ↓
NativeAlarmScreen
        ↓
Botón se mueve
        ↓
3 aciertos
        ↓
Alarma detenida

14. 📌 Importante
Los nombres de los menús pueden cambiar dependiendo del fabricante del teléfono.
Por ejemplo, Motorola, Samsung, Xiaomi, Redmi, OPPO, etc. pueden mostrar las opciones en lugares diferentes.
Las opciones importantes que se deben comprobar son:
✅ Notificaciones
✅ Alarmas y recordatorios
✅ Notificaciones de pantalla completa
✅ Uso en segundo plano
✅ Sin restricciones excesivas de batería

Una vez configuradas estas opciones, la aplicación puede funcionar correctamente incluso cuando el teléfono está bloqueado.

🛠️ Instalación y configuración del proyecto
1. Requisitos
Para trabajar con el proyecto se necesita:
- Node.js
- npm
- Expo
- Expo Router
- EAS CLI
- Git
- Una cuenta de Expo para generar el APK mediante EAS Build
- Un dispositivo Android para probar las alarmas reales
Importante
Para generar el APK de este proyecto no es necesario compilar Android localmente.
No se utiliza:
Android Studio
Gradle local
JAVA_HOME
Android SDK local

La compilación de Android se realiza mediante:
eas build

2. Crear / instalar dependencias
El proyecto utiliza Expo SDK 54.
Instalar las dependencias del proyecto:
npm install

Las principales tecnologías y librerías utilizadas son:
Expo
React Native
TypeScript
Expo Router
NativeWind
AsyncStorage
Expo Audio
Expo Asset
Expo Notifications
React Native Safe Area Context
React Native Wake Alarm

3. Dependencias principales
Expo Audio
Se utiliza para reproducir sonidos y realizar la previsualización de los sonidos de alarma.
npx expo install expo-audio

En app.json se habilita la reproducción en segundo plano:
[
  "expo-audio",
  {
    "enableBackgroundPlayback": true
  }
]

4. Expo Asset
Se utiliza para manejar los recursos y archivos de audio incluidos en la aplicación.
Instalación:
npx expo install expo-asset

5. Expo Notifications
Se utiliza para registrar los sonidos como recursos de Android y mantener compatibilidad con el sistema de notificaciones.
Instalación:
npx expo install expo-notifications

Los sonidos están registrados en app.json:
[
  "expo-notifications",
  {
    "sounds": [
      "./assets/sounds/alarm.mp3",
      "./assets/sounds/alarm2.mp3",
      "./assets/sounds/alarm3.mp3",
      "./assets/sounds/alarm4.mp3",
      "./assets/sounds/alarm5.mp3",
      "./assets/sounds/alarm6.mp3",
      "./assets/sounds/alarm7.mp3"
    ]
  }
]

6. React Native AsyncStorage
Se utiliza para guardar las alarmas localmente en el teléfono.
Las alarmas se almacenan utilizando:
@alarma_react_native_alarms

Instalación:
npx expo install @react-native-async-storage/async-storage

La información guardada incluye:
ID
Hora
Minuto
Días
Nombre
Estado activado/desactivado
Sonido seleccionado

Ejemplo:
{
  "id": "123456789",
  "hour": 7,
  "minute": 30,
  "days": [0, 1, 2, 3, 4],
  "label": "Despertar",
  "sound": "alarm4",
  "enabled": true
}

7. React Native Safe Area Context
Se utiliza para manejar correctamente las áreas seguras de la pantalla.
Instalación:
npx expo install react-native-safe-area-context

8. React Native Wake Alarm
Esta es una de las partes más importantes del proyecto.
Se utiliza:
react-native-wake-alarm

Instalación:
npm install react-native-wake-alarm

Esta librería permite programar alarmas reales de Android.
La aplicación utiliza:
WakeAlarm.schedule()
WakeAlarm.cancel()
WakeAlarm.requestPermissions()
WakeAlarm.registerRingScreen()

9. ⚠️ Importante sobre React Native Wake Alarm
react-native-wake-alarm es una dependencia nativa.
Por eso, después de instalarla o realizar cambios importantes en la configuración nativa, se debe ejecutar:
npx expo prebuild --clean

Esto genera/actualiza el proyecto Android.
No agregar manualmente:
"react-native-wake-alarm"

dentro de plugins en app.json.
La librería se integra mediante autolinking de React Native.
10. Pantalla personalizada de la alarma
La pantalla personalizada está en:
components/NativeAlarmScreen.tsx

Esta pantalla se registra desde:
app/_layout.tsx

mediante:
WakeAlarm.registerRingScreen(NativeAlarmScreen);

La pantalla permite:
- Mostrar la alarma en pantalla completa.
- Mostrar el mensaje de despertar.
- Mover el botón.
- Cambiar la posición del botón automáticamente.
- Requerir 3 aciertos.
- Detener la alarma después de 3 aciertos.
El botón se mueve aproximadamente cada:
700 ms

11. 🔊 Sonidos de alarma
Los sonidos están almacenados en:
assets/sounds/

Actualmente:
assets/
└── sounds/
    ├── alarm.mp3
    ├── alarm2.mp3
    ├── alarm3.mp3
    ├── alarm4.mp3
    ├── alarm5.mp3
    ├── alarm6.mp3
    └── alarm7.mp3

Los archivos también deben terminar disponibles dentro del proyecto Android después del prebuild.
Comprobar con:
dir android\app\src\main\res\raw

Debe aparecer:
alarm.mp3
alarm2.mp3
alarm3.mp3
alarm4.mp3
alarm5.mp3
alarm6.mp3
alarm7.mp3

12. 🎵 Selector de sonidos
El selector se encuentra en:
app/configurar.tsx

El usuario puede:
1. Abrir el selector.
2. Escuchar una previsualización.
3. Detener la previsualización.
4. Seleccionar un sonido.
5. Guardar la alarma.
Los identificadores utilizados son:
alarm
alarm2
alarm3
alarm4
alarm5
alarm6
alarm7

Por ejemplo:
alarm4

corresponde a:
alarm4.mp3

13. ⚙️ Configuración de app.json
El proyecto necesita estos plugins principales:
"plugins": [
  "expo-router",
  [
    "expo-splash-screen",
    {
      "image": "./assets/images/icono_de_alarma.png",
      "imageWidth": 250,
      "resizeMode": "contain",
      "backgroundColor": "#0B0F12"
    }
  ],
  [
    "expo-audio",
    {
      "enableBackgroundPlayback": true
    }
  ],
  [
    "expo-notifications",
    {
      "sounds": [
        "./assets/sounds/alarm.mp3",
        "./assets/sounds/alarm2.mp3",
        "./assets/sounds/alarm3.mp3",
        "./assets/sounds/alarm4.mp3",
        "./assets/sounds/alarm5.mp3",
        "./assets/sounds/alarm6.mp3",
        "./assets/sounds/alarm7.mp3"
      ]
    }
  ],
  "expo-asset"
]

14. 🔐 Permisos Android
El proyecto utiliza permisos relacionados con:
Notificaciones
Alarmas exactas
Pantalla completa
Vibración
Wake Lock
Ejecución de servicios en segundo plano

Parte de estos permisos son proporcionados por react-native-wake-alarm.
No se deben eliminar los permisos nativos necesarios para el funcionamiento de la alarma.
15. 🔄 Sincronización de alarmas
El componente:
components/AlarmScheduler.tsx

se encarga de recuperar las alarmas almacenadas cuando se inicia la aplicación.
El flujo es:
AsyncStorage
      ↓
AlarmScheduler
      ↓
Busca alarmas activadas
      ↓
WakeAlarm.schedule()

El sonido se conserva mediante:
sound: alarm.sound || "alarm"

Esto también permite que las alarmas antiguas que no tengan un sonido guardado utilicen automáticamente:
alarm.mp3

16. Activar y desactivar alarmas
Desde:
app/index.tsx

el usuario puede activar o desactivar una alarma.
Al desactivar:
WakeAlarm.cancel(id);

Al activar:
WakeAlarm.schedule({
  ...
  sound: alarm.sound || "alarm",
  ...
});

17. Editar una alarma
Las alarmas se pueden editar desde:
app/configurar.tsx

El sistema conserva:
Hora
Minutos
Días
Nombre
Sonido
Estado

Al modificar una alarma existente, primero se cancela la programación anterior:
await WakeAlarm.cancel(savedAlarm.id);

y después se vuelve a programar.
18. 🩺 Comprobar el proyecto antes de compilar
Antes de generar un APK se recomienda ejecutar:
npx tsc --noEmit

Si no aparece ningún error, TypeScript está correcto.
También se puede ejecutar:
npx expo-doctor

El proyecto debe pasar las comprobaciones.
19. 🔨 Generar los archivos nativos
Cuando se hayan realizado cambios en configuración nativa:
npx expo prebuild --clean

Después comprobar que los sonidos estén en:
android/app/src/main/res/raw/

20. ☁️ EAS Build
La aplicación se compila utilizando EAS.
Instalar EAS CLI:
npm install -g eas-cli

Iniciar sesión:
eas login

Configurar EAS si todavía no está configurado:
eas build:configure

21. 📦 Generar APK de prueba
Para generar el APK:
eas build -p android --profile preview

El perfil preview se utiliza para generar una aplicación instalable directamente en un dispositivo Android.
22. 📲 Actualizar la aplicación
Si ya existe una versión instalada en el teléfono y el nuevo APK utiliza el mismo:
package

se puede instalar encima de la versión anterior.
Package utilizado:
com.pmsl.alarma_react_native

Normalmente Android conservará los datos almacenados por la aplicación.
23. ⚠️ No desinstalar durante las pruebas
Si solamente se quiere actualizar la aplicación:
APK nuevo
      ↓
Instalar
      ↓
Actualizar

No es necesario desinstalar la versión anterior.
Desinstalar la aplicación elimina los datos locales de la aplicación, incluyendo las alarmas almacenadas en AsyncStorage.
24. 🧪 Prueba completa después de generar el APK
Después de instalar una nueva versión:
1. Abrir la aplicación
2. Crear una alarma
3. Seleccionar un sonido
Por ejemplo:
Alarma 4

4. Seleccionar los días
5. Guardar
6. Comprobar que la alarma aparezca en la pantalla principal
7. Bloquear el teléfono
8. Esperar la hora programada
9. Comprobar:
🔊 Suena el sonido seleccionado
        ↓
📱 Se abre la pantalla completa
        ↓
🔴 ¡DESPIERTA!
        ↓
🔘 El botón se mueve
        ↓
👆 3 aciertos
        ↓
⏹️ Se detiene la alarma

25. 🚨 Problemas conocidos
Aparece solamente una notificación con "Stop"
Comprobar:
Notificaciones de pantalla completa

Debe estar permitido para:
Alarma divertida

La alarma no suena con el teléfono bloqueado
Comprobar:
Alarmas y recordatorios
Notificaciones
Uso en segundo plano
Configuración de batería

El sonido seleccionado no funciona
Comprobar que el archivo exista:
assets/sounds/

y después ejecutar:
npx expo prebuild --clean

Comprobar:
dir android\app\src\main\res\raw

Deben existir los 7 archivos.
26. ❌ No modificar estas configuraciones sin necesidad
El proyecto actualmente funciona con:
react-native-wake-alarm
NativeAlarmScreen
WakeAlarm.registerRingScreen()
EAS Build

No cambiar la arquitectura de la alarma sin necesidad.
Especialmente no eliminar:
WakeAlarm.registerRingScreen(NativeAlarmScreen);

ni reemplazar WakeAlarm por una notificación normal si se necesita una alarma real con el teléfono bloqueado.
27. 🚫 No utilizar compilación Android local
Para este proyecto no es necesario utilizar:
Android Studio
Gradle local
JAVA_HOME
Android SDK local

La generación del APK se realiza mediante:
eas build -p android --profile preview

28. 🚀 Flujo recomendado para una nueva versión
Cuando se realicen cambios importantes:
npm install

Comprobar TypeScript:
npx tsc --noEmit

Comprobar Expo:
npx expo-doctor

Regenerar proyecto nativo si hubo cambios nativos:
npx expo prebuild --clean

Comprobar sonidos:
dir android\app\src\main\res\raw

Generar APK:
eas build -p android --profile preview

Instalar el APK en el teléfono.
Realizar una prueba con el teléfono bloqueado.
📌 Resumen de la arquitectura
                    ALARMA DIVERTIDA
                           │
                           ▼
                  ┌─────────────────┐
                  │  React Native   │
                  │     + Expo      │
                  └────────┬────────┘
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
        Configurar      AsyncStorage   NativeWind
             │             │
             ▼             ▼
        Seleccionar      Guardar
          sonido        alarmas
             │             │
             └──────┬──────┘
                    ▼
             WakeAlarm
                    │
                    ▼
              Android Alarm
                    │
                    ▼
             Sonido seleccionado
                    │
                    ▼
          NativeAlarmScreen
                    │
                    ▼
             Botón móvil
                    │
                    ▼
                3 aciertos
                    │
                    ▼
             Alarma detenida

📦 Resumen de comandos principales
# Instalar dependencias
npm install

# Instalar EAS CLI
npm install -g eas-cli

# Instalar dependencias Expo utilizadas
npx expo install expo-audio expo-asset expo-notifications
npx expo install @react-native-async-storage/async-storage
npx expo install react-native-safe-area-context

# Wake Alarm
npm install react-native-wake-alarm

# Verificar TypeScript
npx tsc --noEmit

# Verificar proyecto Expo
npx expo-doctor

# Regenerar Android
npx expo prebuild --clean

# Iniciar sesión en EAS
eas login

# Configurar EAS
eas build:configure

# Generar APK
eas build -p android --profile preview

⚠️ Nota
Si el proyecto ya tiene las dependencias instaladas, no es necesario ejecutar nuevamente todos los comandos expo install o npm install. Esos comandos sirven principalmente para preparar el proyecto desde cero o instalar una dependencia que todavía no exista.