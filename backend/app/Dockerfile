FROM ubuntu:20.04

RUN apt update && apt upgrade --fix-missing -y
RUN apt install sudo curl zip gnupg2 lsb-release ca-certificates apt-transport-https software-properties-common -y
RUN add-apt-repository ppa:ondrej/php -y
RUN apt update && apt upgrade -y
RUN apt install php8.1 php8.1-mysql php8.1-curl php8.1-xml php8.1-mbstring -y

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt update && \
    apt install yarn -y

RUN a2enmod rewrite
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php -r "if (hash_file('sha384', 'composer-setup.php') === '55ce33d7678c5a611085589f1f3ddf8b3c52d662cd01d4ba75c0ee0459970c2200a51f492d557530c71c15d8dba01eae') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" && \
    php composer-setup.php && \
    php -r "unlink('composer-setup.php');" && \
    mv composer.phar /usr/local/bin/composer

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
