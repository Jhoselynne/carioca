#!/bin/bash

export USER_NAME=$(whoami)
export USER_ID=$(id -u)
export GROUP_ID=$(id -g)
export REACT_NATIVE_PACKAGER_HOSTNAME=$(hostname -I)


docker-compose up -d app db phpmyadmin
docker-compose up flyway

docker-compose exec app bash
# docker-compose exec app bash -c "php -S 0.0.0.0:8000 -t public"