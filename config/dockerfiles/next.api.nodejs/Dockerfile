############################################################
# Dockerfile to build NEXT QS API GATEWAY AND MICROSERVICES
# Based on Ubunto 16.04 LTS
# VERSION 1.0
############################################################

FROM ubuntu:16.04

# UBUNTU UPGRADE
RUN apt-get update --fix-missing
RUN apt-get -y upgrade
RUN apt-get -y update
RUN apt-get -y install nano

# GENERAL PACKAGES
RUN apt-get install -y curl
RUN apt-get -y install git
RUN apt-get -y install wget
RUN apt-get -y install unzip
RUN apt-get -y install inetutils-ping
RUN apt-get -y install cron

# NODE.JS INSTALLATION
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get -y update --fix-missing
RUN apt-get install -y nodejs
RUN mkdir /var/node

# INSTALL DB-MIGRATE
RUN npm install -g db-migrate

# MONGO 4.2 APENAS PARA USO VIA TERMINAL
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys D68FA50FEA312927
RUN echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.2.list
RUN apt-get update
RUN apt-get install -y mongodb-org-shell mongodb-org-tools --allow-unauthenticated	

# ADD GIT HUB SSH KEY SCAN FOR COMPOSER
RUN mkdir /root/.ssh/
RUN ssh-keyscan github.com >> /root/.ssh/known_hosts

# INSTALL S3CMD
RUN curl "https://bootstrap.pypa.io/get-pip.py" -o "get-pip.py"
RUN python get-pip.py
RUN wget https://sourceforge.net/projects/s3tools/files/s3cmd/2.0.2/s3cmd-2.0.2.tar.gz
RUN tar xzf s3cmd-2.0.2.tar.gz
RUN rm get-pip.py
RUN pip install setuptools
RUN cd s3cmd-2.0.2 && python setup.py install
RUN rm -R s3cmd-2.0.2

EXPOSE 80
EXPOSE 443
WORKDIR /var/node