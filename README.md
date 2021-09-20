# Pokemon Pagination Frontend

This powers the frontend for Pokemon GraphQL pagination caching pet project.

## How it works

The initial requests consist of the first 10 Pokemon. Clicking `load more` button will initiate the next 10 Pokemon

ie.

- first request - offset:0, limit:10
- second request - offset:10, limit:10

The backend handles the merging strategy and supplies the full data to the frontend

## Prerequisite

[`pokemon-graphql`](https://github.com/raphsutti/pokemon-graphql) running

`yarn start` Start the app

![Demo of app](./public/pokemon.gif)
