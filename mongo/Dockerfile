FROM mongo:latest
RUN mkdir -p /usr/src/db
WORKDIR /usr/src/db
COPY restaurants.json .
RUN mongod --bind_ip 127.0.0.1 --fork --logpath /var/log/mongodb.log &&\
 mongoimport --host 127.0.0.1 --db frontcamp --collection restaurants /usr/src/db/restaurants.json
RUN rm -rf restaurants.json
EXPOSE 27017
