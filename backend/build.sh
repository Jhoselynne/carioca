#!/bin/bash

export USER_NAME=$(whoami)
export USER_ID=$(id -u)
export GROUP_ID=$(id -g)
export REACT_NATIVE_PACKAGER_HOSTNAME=$(hostname -I)

docker compose build app db phpmyadmin flyway
