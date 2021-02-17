FROM node:10
# Create app directory
WORKDIR /app
ADD . /app/

RUN npm install
RUN npm rebuild node-sass
RUN npm run build

ENV HOST 0.0.0.0
ENV PORT 80
EXPOSE 80

# start command
CMD [ "npm", "run", "start" ]
