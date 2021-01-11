FROM node:12

WORKDIR /backend

RUN npm install -g typescript ts-node ts-node-dev

# Add docker-compose-wait tool
ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

COPY package*.json ./
COPY tsconfig*.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3333

# CMD [ "yarn", "dev" ]
