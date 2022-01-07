#!/bin/bash

export USER_NAME=$(whoami)
export USER_ID=$(id -u)
export GROUP_ID=$(id -g)
export REACT_NATIVE_PACKAGER_HOSTNAME=$(hostname -I)

docker-compose down
docker system prune -f

docker-compose build app
docker-compose up -d app

docker-compose exec app bash
# docker-compose exec app bash -c "expo start --tunnel"