#!/bin/bash

NETWORK_NAME="selenium-grid"
HUB_NAME="selenium-hub"
NODE_IMAGE="selenium/node-chrome:latest"
APP_IMAGE="webdriverio"

# Create Docker network
docker network create "$NETWORK_NAME"

# Stop and remove existing Hub
docker stop "$HUB_NAME" &> /dev/null
docker rm "$HUB_NAME" &> /dev/null

# Start Selenium Hub container
docker run -d -p 4442-4444:4442-4444 --net "$NETWORK_NAME" --name "$HUB_NAME" selenium/hub:latest

# Stop and remove all Chrome Nodes
for container_id in $(docker ps -aqf "ancestor=$NODE_IMAGE"); do
    docker stop "$container_id" &> /dev/null
    docker rm "$container_id" &> /dev/null
done

# Start Chrome Node container
docker run -d --net "$NETWORK_NAME" -e SE_EVENT_BUS_HOST="$HUB_NAME" --shm-size="2g" -e SE_EVENT_BUS_PUBLISH_PORT=4442 -e SE_EVENT_BUS_SUBSCRIBE_PORT=4443 "$NODE_IMAGE"

# Build WebdriverIO
docker build . -t "$APP_IMAGE" --no-cache
