# MARKET_APP

Este es un proyecto utiliza Vite como su servidor de desarrollo y construcción.
Utiliza TypeScript y ESLint.

# Scripts

- dev: Inicia el servidor de desarrollo usando Vite.
- build: Construye el proyecto para producción.
- lint: Lintea el código usando ESLint.
- preview: Previsualiza la construcción de producción localmente.

# Dependencias Principales

- React: Biblioteca para construir interfaces de usuario.
- React Router DOM: Biblioteca de enrutamiento para React.
- axios: Cliente HTTP para realizar solicitudes.
- Tailwind CSS: Marco de CSS utilitario.
- Notistack: Biblioteca de notificaciones para React.

# Configuraciones Adicionales

- Tailwind CSS: Personalizado para agregar colores y purgar clases no utilizadas.
- Vite: Configurado con alias para facilitar la importación de módulos.
- TypeScript: Configurado con opciones estrictas para una mejor experiencia de desarrollo.

# Docker

Se proporciona un Dockerfile para construir la aplicación dentro de un contenedor.
Simplemente ejecuta `docker build . -t "market_app"` . para construir la imagen y luego `docker run -d -p 8080:8080 market_app` para ejecutar la aplicación.
Para detener el contenedor ejecutando `docker kill id_del_contenedor`. Reemplaza id_del_contenedor con el ID o el nombre de tu contenedor Docker.

# Levantar el Proyecto Local

- Clona este repositorio.
- Instala las dependencias con npm install.
- Ejecuta `npm run dev` para iniciar el servidor de desarrollo.
- Visita `http://localhost:8080` en tu navegador para ver la aplicación en funcionamiento.
