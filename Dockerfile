# Usamos una imagen de Node.js ligera para ahorrar recursos
FROM node:18-slim

# Creamos la carpeta de la app
WORKDIR /app

# Copiamos primero los archivos de dependencias para que la instalación sea rápida
COPY package*.json ./

# Instalamos solo lo necesario para producción
RUN npm install --production

# Copiamos el resto del código (index.js)
COPY . .

# Exponemos el puerto 8080 (el estándar de Cloud Run)
EXPOSE 8080

# Arrancamos la aplicación
CMD ["npm", "start"]
