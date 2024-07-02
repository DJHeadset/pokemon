# Simple Pokemon game


## Table of Contents
- [Description](#description)
- [Features](#features)
- [Future Roadmap](#future-roadmap)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [License](#license)

## Description
Welcome to the world of Pokémon! This web application, built using React Router, invites you to embark on an exciting journey inspired by the beloved Pokémon game. The project leverages the power of GitHub Actions, automatically deploying the frontend Docker container to DockerHub upon each push to the main branch.

The application adopts a microservices architecture, with distinct backends managing user controls and Pokémon battles. Security is paramount, ensured through the use of JSON Web Tokens (jsonwebtoken). 



## Features
- Home page with aminated login/sign in.
![welcome](./frontend/src/resources/readmePics/welcome.gif)

- Choose your own Pokemon to battle against a randomly selected enemy from the chosen city.
![List of own pokemons with pictures and their names on the left sid and a detailed view of the enemy pokemon on the right](./frontend/src/resources/readmePics/ownPokemon.jpg)

- Engage in a battle with our interactive battle interface.
![Detiled view of chozen and enemy pokemon with a big "ATTACK" button](./frontend/src/resources/readmePics/battle.jpg)

### Future Roadmap
- **Battle Rework:** Improving and refining the battle mechanics.
- **Player vs. Player (PvP):** Introducing the ability for players to battle each other.
- **Tournaments:** Setting the stage for epic Pokémon tournaments.

## Technologies Used
<img alt="Static Badge" src="https://img.shields.io/badge/React-react?style=plastic&logo=reactrouter&label=6.18.0&labelColor=blue&color=%23CA4245" height="30">

<img alt="Static Badge" src="https://img.shields.io/badge/Node.js-node?style=plastic&logo=nodedotjs&logoColor=white&label=18.2.0&labelColor=%23339933" height="30">

<img alt="Static Badge" src="https://img.shields.io/badge/Github_Actions-github?style=plastic&logo=githubactions&logoColor=white&color=%232088FF" height="30">

<img alt="Static Badge" src="https://img.shields.io/badge/Docker-docker?style=plastic&logo=docker&color=blue" height="30">

<img alt="Static Badge" src="https://img.shields.io/badge/JsonWebToken-token?style=plastic&logo=jsonwebtokens&color=blue" height="30">

<img alt="Static Badge" src="https://img.shields.io/badge/Mongo-mongo?logo=mongodb&color=green" height="30">


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

In a different terminal:
1. Enter the backend folder
2. Install dependencies
3. Start backend

```
cd backend
npm i
npm run dev
```

## License
This project is open-source and available under the [MIT License](LICENSE).

**Note:** Pokémon is a trademark of Nintendo, Game Freak, and Creatures. This project is a fan-made game and is not affiliated with or endorsed by the creators of Pokémon. All Pokémon-related content is the intellectual property of Nintendo, Game Freak, and Creatures. The use of Pokémon in this project is for creative and educational purposes.