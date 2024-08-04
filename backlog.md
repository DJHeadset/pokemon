- PVP
- Post Office
    users can send messages to each other
Evolution
- No Trust
    user permissions in the database, only UserId in cookie 
- Rename own pokemon
- Implement moves
- Switch Pokemons mid-battle(?)
- .env generated from Github Secret
- mobile phone port
- hungarian language

/pokemon-game
│
├── /client               # React application
│   ├── /public           # Static files
│   └── /src
│       ├── /components   # React components
│       ├── /hooks        ## Custom hooks
│       ├── /context      # Context API providers
│       ├── /pages        ## Page components
│       ├── /services     # API calls
│       ├── /styles       ## CSS or SCSS files
│       ├── /utils        # Utility functions
│       ├── App.js        ## Main App component
│       ├── index.js      ## Entry point
│       └── ...           # Other files
│
├── /server               # Express server
│   ├── /controllers      ## Request handlers
│   ├── /models           ## Mongoose models
│   ├── /routes           ## API routes
│   ├── /middlewares      ## Middleware functions
│   ├── /utils            ## Utility functions
│   ├── /config           ## Configuration files
│   ├── server.js         ## Entry point
│   └── ...               # Other files
│
├── /config               # Environment and config files
│
├── package.json          # Project metadata and dependencies
├── README.md             # Project documentation
└── ...                   # Other files
