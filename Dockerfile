FROM bitnami/node:latest as downloader
WORKDIR /Downloads
RUN apt-get update && apt-get install git -y


FROM bitnami/node:18.8.0
WORKDIR /app

RUN npm install -g webdriverio \
    && git clone https://github.com/aprox2/webdriver-test \
    && cd ./webdriver-test \
    && npm install

CMD cd ./webdriver-test/ && npx wdio ./wdio.conf_docker.ts
