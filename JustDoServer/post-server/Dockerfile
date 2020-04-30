FROM node:alpine
WORKDIR /usr/app/back
EXPOSE 5000
COPY ./ ./
RUN npm install
ENTRYPOINT ["sh", "./entrypoint.sh"]
