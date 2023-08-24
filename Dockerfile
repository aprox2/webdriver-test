FROM bitnami/node:latest as downloader
WORKDIR /Downloads
RUN apt-get update && apt-get install git -y


FROM bitnami/node:18.8.0
WORKDIR /app

COPY --from=downloader /Downloads /Downloads

RUN npm install -g webdriverio \
    && git clone https://github.com/aprox2/webdriver-test \
    && cd ./webdriver-test \
    && npm install

RUN npx wdio ./wdio.conf_docker.ts


#CMD ["/bin/bash"]
