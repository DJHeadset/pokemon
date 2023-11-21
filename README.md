# Simple Pokemon game


## Table of Contents
- [Description](#description)
- [Features](#features)
- [Future Roadmap](#future-roadmap)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [License](#license)

## Description
A web application using the React Router, with a strong focus on the popular game "Pokemon". the project utilises Github Actions, when there is  apush to the main branch, github will compile and upload the frontend's Docker container to DockerHub.

## Features
- Home page with a list of available cities.
![List of cities](./frontend/src/resources/readmePics/cities.jpg)

- Choose your own Pokemon to battle against a randomly selected enemy from the chosen city.
![List of own pokemons with pictures and their names on the left sid and a detailed view of the enemy pokemon on the right](./frontend/src/resources/readmePics/ownPokemon.jpg)

- Engage in a battle with our interactive battle interface.
![Detiled view of chozen and enemy pokemon with a big "ATTACK" button](./frontend/src/resources/readmePics/battle.jpg)

## Future Roadmap
- User management
- Pokemon beloning to users and leveling system
- Tournaments and battles

## Technologies Used
<img alt="Static Badge" src="https://img.shields.io/badge/React_Router-react?style=plastic&logo=reactrouter&label=6.18.0&labelColor=blue&color=%23CA4245" height="30">

<img alt="Static Badge" src="https://img.shields.io/badge/Node.js-node?style=plastic&logo=nodedotjs&logoColor=white&label=18.2.0&labelColor=%23339933" height="30">

<img alt="Static Badge" src="https://img.shields.io/badge/Github_Actions-github?style=plastic&logo=githubactions&logoColor=white&color=%232088FF" height="30">

<img alt="Static Badge" src="https://img.shields.io/badge/Docker-docker?style=plastic&logo=docker&color=blue" height="30">


## Getting Started

1. Clone the repository:
2. Enter the frontend folder
3. Install dependencies
4. Start the project
5. Access the site through [localhost](http://localhost:3000/)

```
git clone git@github.com:DJHeadset/pokemon.git
cd frontend
npm i
node start
```

## License
This project is open-source and available under the [MIT License](LICENSE).
