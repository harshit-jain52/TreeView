# Development stage
FROM node:18-bookworm-slim as development

WORKDIR /app

COPY package*.json  .

RUN npm ci

COPY . .

ARG REACT_APP_API_URL
RUN REACT_APP_API_URL=${REACT_APP_API_URL} npm run build

# Production stage
FROM caddy:2-alpine as production

COPY Caddyfile /etc/caddy/Caddyfile

COPY --from=development /app/build /srv