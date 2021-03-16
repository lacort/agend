#!/bin/sh

###########################################################################
# CONFIG PASSWORDS AND AUTHENTICATION FOR DEV ENVIROMENT - DOCKER COMPOSE #
###########################################################################

mongo nextAgend --host mongo-agend -u root -p abc123 --authenticationDatabase admin --eval "db.createUser({ user: 'agend', pwd: '1234', roles: [ { role: 'readWrite', db: 'nextAgend'}]});"

echo "Started"
true
