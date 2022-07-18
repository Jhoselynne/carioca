#!/bin/bash

export USER_NAME=$(whoami)
export USER_ID=$(id -u)
export GROUP_ID=$(id -g)
export REACT_NATIVE_PACKAGER_HOSTNAME=$(hostname -I)

printf "\n____________________  NETWORKS  ____________________\n\n"
docker network list

printf "\n____________________   IMAGES   ____________________\n\n"
docker image list

printf "\n____________________ CONTAINERS ____________________\n\n"
docker container list -a

printf "\n"
