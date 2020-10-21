# ---- Base Node ----
FROM node:alpine AS buildContainer

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package*.json ./

# Install dependencies
RUN npm install --production
RUN npm rebuild node-sass

# Copy project file
COPY . .

# Build project
RUN npm run build

# ---- Prod ----
FROM node:alpine

# Copy web app
COPY --from=buildContainer build /usr/share/build
WORKDIR /usr/share/build
RUN npm install -g serve
USER node

CMD ["serve", "-s", "/usr/share/build"]
