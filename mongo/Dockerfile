FROM mongo:latest
RUN mkdir -p /usr/src/db
WORKDIR /usr/src/db
COPY restaurants.json .
CMD mongoimport --host mongodb --db frontcamp --collection restaurants /usr/src/db/restaurants.json