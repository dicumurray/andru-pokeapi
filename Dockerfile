# Usamos la imagen base de Node.js
FROM node:20

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos el archivo package.json y package-lock.json
COPY package*.json ./

# Instalamos las dependencias de la aplicación
RUN npm install

# Instalamos serve para servir el contenido estático
RUN npm install -g serve

# Copiamos el resto del código de la aplicación
COPY . .

# Creamos la versión optimizada para producción
RUN npm run build

# Exponemos el puerto
EXPOSE 3000

# Comando para iniciar la app
CMD [ "serve", "-s", "dist", "--single" ]
