############################################################
# Dockerfile to build NEXT QS API MICROSERVICE 'AUTH'
# Based on Ubunto 16.04 LTS
# VERSION 1.0
############################################################

## DOCKER RUN EXEMPLE
# docker run --name next-api-agent-actions -p 80:80 -v /var/next.api.agent.actions:/var/node -it nextqs/next.api.agent.actions bash

FROM ubuntu:16.04

# UBUNTU UPGRADE
RUN apt-get update --fix-missing
RUN apt-get -y upgrade
RUN apt-get -y update
RUN apt-get -y install nano

# GENERAL PACKAGES
RUN apt-get install -y curl
RUN apt-get -y install inetutils-ping

# NODE.JS INSTALLATION
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get -y update --fix-missing
RUN apt-get install -y nodejs
RUN mkdir /var/node

# MONGO 4.2 APENAS PARA USO VIA TERMINAL
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys D68FA50FEA312927
RUN echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.2.list
RUN apt-get update
RUN apt-get install -y mongodb-org-shell mongodb-org-tools --allow-unauthenticated	

EXPOSE 80
WORKDIR /var/node