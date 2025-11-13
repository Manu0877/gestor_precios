Gestor precios — Instrucciones rápidas para configurar y ejecutar

1) Crear proyecto en Firebase
   - Abre: https://console.firebase.google.com
   - Crea un nuevo proyecto.
   - En el panel del proyecto, selecciona 'Agregar app' -> web (</>).
   - Asigna un nombre (p. ej. gestor-precios-web) y registra la app.

2) Habilitar Firestore
   - En el menú de Firebase, ve a 'Firestore Database'.
   - Crea una base de datos en modo de prueba (para desarrollo).
   - Recuerda que el modo de prueba abre reglas durante 30 días; ajusta reglas antes de producción.

3) Copiar configuración de Firebase (SDK)
   - En la configuración de la app web (en Firebase), verás un bloque con las keys:
     apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId
   - Cópialas para pegarlas en el archivo src/firebase.js (ver paso 5).

4) Requisitos locales
   - Node.js (>=16) y npm instalados.
   - Opcional: yarn.

5) Editar src/firebase.js
   - Abre src/firebase.js y reemplaza el objeto FIREBASE_CONFIG con la configuración de tu proyecto.
   - El archivo ya contiene un ejemplo con variables a sustituir.

6) Ejecutar localmente
   - Desde la carpeta del proyecto (donde está package.json) ejecuta:
     npm install
     npm run dev
   - Abre http://localhost:5173

7) Desplegar en Vercel o Netlify
   - Subir el repositorio a GitHub o conecta el fichero zip directamente en Vercel/Netlify.
   - Comando de build: npm run build
   - Directorio de salida: dist

8) Notas y mejoras
   - Para búsquedas más potentes, considera indexación externa (Algolia/Typesense) o añadir campos auxiliares en minúsculas.
   - Añade Firebase Auth si quieres listas por usuario.
   - Ajusta las reglas de Firestore antes de pasar a producción.

¡Listo! Si quieres, puedo preparar también instrucciones paso-a-paso para deploy en Vercel con capturas de comandos.


---
Instrucciones adicionales para Auth:
1) En Firebase, habilitar Authentication -> Sign-in method -> Google y Email/Password.
2) Firestore Rules: allow read, write: if request.auth != null;
3) Ahora, solo usuarios autenticados pueden ver/añadir productos.
4) Los productos son compartidos entre todos los usuarios.
