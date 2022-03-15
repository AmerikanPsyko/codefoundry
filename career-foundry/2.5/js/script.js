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
    document.write(pokemon.name + " " + pokemon.type + " " + pokemon.height);
    document.write('<p>');
  });
    //Add "Dragonite" to the pokemonList, logged in console and printed to DOM
  pokemonRepository.add({name: 'Dragonite'});
  console.log(pokemonRepository.getAll());