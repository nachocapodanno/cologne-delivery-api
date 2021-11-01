# Cologne Delivery Api

## Intro

A private delivery service company in Cologne collects and delivers parcels for people. This is done by bikers.

## Requirements

- A sender should be able to create a parcel to be delivered by specifying
pick-up and drop-off address (should be just a text field, no need for
address validation)
- A sender should be able to see the status of his parcels.
- A biker should be able to see a list of the parcels.
- A biker should be able to pick up a parcel.
- Once a parcel is picked up by a biker, it cannot be picked up by other bikers. 
- A biker should be able to input the timestamp of the pickup and the delivery
for each order. 
- The status of the order should be updated for the sender.

## Installation

```bash
$ npm install
```

## Running API

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Prod Enviroment

[Cologne Delivery API](https://cologne-delivery-api.herokuapp.com/api/)

## Author

  Ignacio Capodanno**
