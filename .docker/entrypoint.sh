#!/bin/bash

yarn install

yarn husky install

cp .env.example .env

yarn start:dev