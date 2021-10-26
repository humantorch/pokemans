# Vue.js Pokedex

## preamble

A live version of this is running at https://main.d2wkiu11w7t9kq.amplifyapp.com

This was built using the following packages:

* `element-ui` UI Kit (https://element.eleme.io/)
* `vuex`
* `vue-router`
* `sass`
* `axios`
* The Pokedex API (https://pokeapi.co/)

The idea was to build something that matched the provided mockups (i.e.: this was a coding exercise, _not_ a design exercise). Pixel-perfection was not a requirement, nor was any feature not included in the scope description below.

## Requirements

* **A sidebar** with a list of Pokemon types. You should be able to filter the list by typing your query in the search bar. You can get the list of types from the API.
* **Main content section.** When you click a Pokemon type in the sidebar, the app loads all Pokemon of that type from the API and shows them in the main content section. Every Pokemon item should be rendered as a square and include Pokemon name, number (its `id` in the API) and a button for adding it to or removing it from the "My Favourites" section.
* **"My Favourites"** section. When you click the "Star" button on a Pokemon, it should show a modal where you can enter a memo (Mockup #2). After you confirm, the Pokemon appears in the My Favourites section. You can click the "X" button to remove it from favourites. Keep in mind that you can't add a Pokemon to favourites twice.

### tradeoffs

This was a quick build to show some functionality examples and therefore naturally contains some tradeoffs. A few things that I would have invested more time and resources into had this been a real-world project:

1. This was my first time using Vue.js and I'm certain there are aspects of it that could be written more efficiently. I'm not particularly thrilled that I have the entire app contained in one .vue + .js file; some of the intricacies around passing states between components when I tried breaking the project up across multiple files for maintainability was breaking the app so rather than get bogged down in that I've left it as-is. It's ok for a project of this size but for something with more complexity this would be a bad practice.
1. I really wish the Pokédex didn't require a separate call to the API to retrieve each individual Pokémon's (Pokéman?) sprite, I feel like this results in a _ton_ of back-and-forth between the server and the client, in a heavy-use project or on a slow internet connection this could be a huge performance bottleneck.
1. I've sprinkled a few Element UI Kit pieces throughout but didn't make use of it for layout at all – again, this was a toolkit I've never used before and with more time to dig into it I'm sure it could have built the 3-column layout rather than rolling it manually.
