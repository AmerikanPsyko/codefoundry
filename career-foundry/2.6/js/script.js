// Begin IIFE 
   //Pokemon Repository list of Pokemon
let pokemonRepository = (function (){
  let pokemonList = [
    {name: "Bulbasaur", type: "Grass", height: 7},
    {name: "Charizard", type: "Fire", height: 5},
    {name: "Pikachu", type: "Electric", height: 3}, 
    {name: "Evee", type: "Dark", height: 4},
  ];

    //Function that will return all pokemon, retrieved from: pokemonList
  function getAll(pokemon) {
    return pokemonList;
  };

    //Function that will add pokemon, and push to: pokemonList
  function add(pokemon) {
    pokemonList.push(pokemon);
  };
    //Return for add/getAll
  return {
    add: add,
    getAll: getAll
  };
  })();

    //Updated loop from "for" to "forEach"
  pokemonRepository.getAll().forEach (function (pokemon) {

    // Calls on selecting 'pokemon-list' from DOM
    let ul = document.querySelector('.pokemon-list');

    //create element 'li'
    let listItem = document.createElement('li');

    //creates element 'button
    let button = document.createElement('button');

    //Append button to 'ul'
    ul.appendChild(button);

    //Adds inner text to button using pokemon.name to pull from Repository
    button.innerText = pokemon.name;

    //Adds class ID 'button-list/ to button
    button.classList.add('button-list');

    //Appends 'li' to 'ul' 
    ul.appendChild(listItem);
  });

  
    //Add "Dragonite" to the pokemonList, logged in console and printed to DOM
  pokemonRepository.add({name: 'Dragonite'});
  console.log(pokemonRepository.getAll());