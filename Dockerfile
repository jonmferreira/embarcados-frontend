FROM node:22.11.0 AS build

WORKDIR /app

COPY package.json package-lock.json ./

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Print the environment variable to verify it's set correctly
RUN echo "VITE_API_BASE_URL is set to $VITE_API_BASE_URL"

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
