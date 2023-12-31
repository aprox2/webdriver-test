@echo off

set NETWORK_NAME=selenium-grid
set HUB_NAME=selenium-hub
set CHROME_NODE_IMAGE=selenium/node-chrome:latest
set APP_IMAGE=webdriverio

REM Create Docker network
@echo Attempting to create network
docker network create %NETWORK_NAME%

REM Kill and delete existing Hubs
@echo Killing and deleting
docker kill %HUB_NAME%
docker rm %HUB_NAME%

REM Start Selenium Hub container
@echo Starting Selenium Hub
docker run -d -p 4442-4444:4442-4444 --net %NETWORK_NAME% --name %HUB_NAME% selenium/hub:latest

REM Kill and delete all Chrome Nodes
@echo Killing and deleting all Chrome Nodes
FOR /F %%i IN ('docker ps -aqf "ancestor=%CHROME_NODE_IMAGE%"') DO (
    docker stop %%i
    docker rm %%i
)

REM Start Chrome Node container
@echo Starting a Chrome Node
docker run -d --net %NETWORK_NAME% -e SE_EVENT_BUS_HOST=%HUB_NAME% --shm-size="2g" -e SE_EVENT_BUS_PUBLISH_PORT=4442 -e SE_EVENT_BUS_SUBSCRIBE_PORT=4443 selenium/node-chrome:latest

REM Build WebdriverIO
@echo Building WebdriverIO Image
docker build . -t webdriverio --no-cache
