FROM ubuntu:22.04

RUN apt update && apt upgrade -y
RUN apt install sudo zip gnupg2 curl iproute2 -y

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt update && \
    apt install yarn -y

RUN yarn global add expo-cli

ARG USER_NAME
ARG USER_ID
ARG GROUP_ID
ARG USER_PW=docker

RUN useradd -m ${USER_NAME} --uid=${USER_ID} && echo "${USER_NAME}:${USER_PW}" | chpasswd
RUN adduser ${USER_NAME} sudo

COPY .bashrc /root/.bashrc
COPY .bashrc /home/${USER_NAME}/.bashrc

USER ${USER_ID}:${GROUP_ID}
WORKDIR /home/${USER_NAME}

RUN yarn global add @expo/ngrok@^4.1.0 --non-interactive
