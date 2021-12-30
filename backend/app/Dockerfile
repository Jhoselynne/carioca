FROM php:8.0.9-apache

RUN apt update && apt upgrade -y
RUN apt install zip gnupg2 -y

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt update && \
    apt install sudo yarn -y

RUN a2enmod rewrite
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php -r "if (hash_file('sha384', 'composer-setup.php') === '906a84df04cea2aa72f40b5f787e49f22d4c2f19492ac310e8cba5b96ac8b64115ac402c8cd292b8a03482574915d1a8') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" && \
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
