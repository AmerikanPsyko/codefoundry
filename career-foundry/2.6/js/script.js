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


function showDetails(pokemon) {
    console.log(pokemon.name);
    }

  // Add listener for button click and then passes the function to show details (Pokemon name)
    function addListener (button, pokemon) {
      button.addEventListener ('click', function () {
        showDetails(pokemon);
      })
    }


  // Function that adds list items: Button, InnerText, and gets query from DOM for .pokemon-list. Also appends pokemonList to button 
    function addListItem(pokemon) {
    
      // Updated loop from "for" to "forEach"
    pokemonRepository.getAll().forEach (function (pokemon) {

    // Calls on selecting 'pokemon-list' from DOM
    let pokemonList = document.querySelector('.pokemon-list');

    // Create element 'li'
    let listItem = document.createElement('li');

    // Creates element 'button
    let button = document.createElement('button');

    // Append button to 'ul'
    pokemonList.appendChild(button);

    // Adds inner text to button using pokemon.name to pull from Repository
    button.innerText = pokemon.name;

    // Adds class ID 'button-list/ to button
    button.classList.add('button-list');

    // Appends 'li' to 'ul' 
    pokemonList.appendChild(listItem);
     
    // Adds listener for button click 
    addListener(button, pokemon);

  });
    
  



    

   

  

    //Add "Dragonite" to the pokemonList, logged in console and printed to DOM
  pokemonRepository.add({name: 'Dragonite'});
  console.log(pokemonRepository.getAll());
}

addListItem();