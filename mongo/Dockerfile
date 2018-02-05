# File for import data into Docker container
FROM mongo:latest
RUN mkdir -p /usr/src/db
WORKDIR /usr/src/db
COPY restaurants.json .
COPY users.json .
CMD mongoimport --host mongodb --db frontcamp --collection restaurants /usr/src/db/restaurants.json &&\
    mongoimport --host mongodb --db frontcamp --collection users /usr/src/db/users.json