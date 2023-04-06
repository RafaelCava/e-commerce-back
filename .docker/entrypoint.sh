#!/bin/bash

yarn install

yarn husky install

cp .env.example .env

yarn build

yarn start:debug