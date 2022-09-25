FROM node:16

RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections

RUN apt-get -y update && \
    apt-get -y install \
    dialog \
    apt-utils \
    php \
    php-pgsql \
    php-gd \
    postgresql-client && \
    apt-get -y upgrade && \
    apt-get -y clean

WORKDIR /usr/src/app

# Clone BOCA repository
RUN git clone https://github.com/cassiopc/boca.git

WORKDIR boca

# Copy modified source code files
RUN wget -O ./src/private/conf.php \
    https://raw.githubusercontent.com/joaofazolo/boca-docker/master/src/private/conf.php
RUN wget -O ./src/private/createdb.php \
    https://raw.githubusercontent.com/joaofazolo/boca-docker/master/src/private/createdb.php

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["/bin/bash", "-c", "sh ./docker/init.sh ; yarn dev"]
