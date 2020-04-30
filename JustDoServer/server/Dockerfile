FROM node:alpine
WORKDIR /usr/app/back
EXPOSE 4000
COPY ormconfig.docker.json ./ormconfig.json
COPY ./ ./
RUN npm install
ENTRYPOINT ["sh", "./entrypoint.sh"]
