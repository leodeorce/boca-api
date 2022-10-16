FROM node:16.17.1

RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN apt-get -y update && \
    apt-get --no-install-recommends -y install \
    dialog=1.3-20190211-1 \
    apt-utils=1.8.2.3 \
    php=2:7.3+69 \
    php-pgsql=2:7.3+69 \
    php-gd=2:7.3+69 \
    postgresql-client=11+200+deb10u5 && \
    apt-get -y upgrade && \
    apt-get -y clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

# Clone BOCA repository
RUN git clone https://github.com/cassiopc/boca.git

WORKDIR /usr/src/app/boca/src/private

# Copy modified source code files
COPY ./docker/conf.php .
COPY ./docker/createdb.php .

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn install && \
    yarn cache clean

COPY . .

EXPOSE 3000

CMD ["/bin/bash", "-c", "sh ./docker/init.sh ; yarn docker:dev"]
