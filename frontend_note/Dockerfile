# --- Stage build : build de production Angular (Node 22) ---
FROM node:22-alpine AS build
WORKDIR /app

# Dépendances d'abord (cache Docker)
COPY package*.json ./
RUN npm ci

# Code source puis build → dist/note/browser
COPY . .
RUN npm run build

# --- Stage runtime : nginx sert les fichiers statiques ---
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/note/browser /usr/share/nginx/html
EXPOSE 80
