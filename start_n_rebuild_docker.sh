#!/bin/bash

NETWORK_NAME="selenium-grid"
HUB_NAME="selenium-hub"
NODE_IMAGE="selenium/node-chrome:latest"
APP_IMAGE="webdriverio"

# Create Docker network
echo Attempting to create network
docker network create "$NETWORK_NAME"

# Stop and remove existing Hub
echo Killing and deleting
docker stop "$HUB_NAME"
docker rm "$HUB_NAME"

# Start Selenium Hub container
echo Starting Selenium Hub
docker run -d -p 4442-4444:4442-4444 --net "$NETWORK_NAME" --name "$HUB_NAME" selenium/hub:latest

# Stop and remove all Chrome Nodes
echo Killing and deleting all Chrome Nodes
for container_id in $(docker ps -aqf "ancestor=$NODE_IMAGE"); do
    docker stop "$container_id"
    docker rm "$container_id"
done

# Start Chrome Node container
echo Starting a Chrome Node
docker run -d --net "$NETWORK_NAME" -e SE_EVENT_BUS_HOST="$HUB_NAME" --shm-size="2g" -e SE_EVENT_BUS_PUBLISH_PORT=4442 -e SE_EVENT_BUS_SUBSCRIBE_PORT=4443 "$NODE_IMAGE"

# Build WebdriverIO
echo Building WebdriverIO Image
docker build . -t "$APP_IMAGE" --no-cache
