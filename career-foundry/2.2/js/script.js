// Variable name
let pokemonList = [
    //Start of array with 3 key values: Name, Type, Height
      {name: "Bulbasaur", type: "Grass", height: 7}, 
      {name: "Charizard", type: "Fire", height: 5}, 
      {name: "Pikachu", type: "Electric", height: 3}, 
      {name: "Evee", type: "Dark", height: 4}
  ];
  //Start of for loop stating to start at array index [0] of pokemonList
  for (let i = 0; i < pokemonList.length; i++) {
     //write key data to DOM of index.html via <div> tag. Data written: Name + Height
      document.write('<div>' + pokemonList[i].name + (' height ') + pokemonList[i].height);
    // First if statement declaring that if height is = 7, then print to DOM "Wow', thats a Huge Pokemon"
      if (pokemonList[i].height >= 7) {
          document.write(' --Wow, that\'s a Huge Pokemon');
      } 
    // First else if statement declaring that if height is less than 6 & more than 4, then print to DOM "This Pokemon is normal"
       else if (pokemonList[i].height < 6 && pokemonList[i].height > 4) {
      document.write(' --This Pokemon is Normal');
    }
    // Second else if statement declaring that if height is less than 5 & more than 3, then print to DOM "This Pokemon is normal"
        else  if (pokemonList[i].height < 5 && pokemonList[i].height > 3) {
      document.write(' --This Pokemon is Normal');
   }
    // Alternitively, can be written differently to encompass 4,5 within the same condition : 
    //      else if (pokemonList[i].height < 7 && pokemonList[i].height > 3) {
    //        document.write(' -- This Pokemon is Normal')
    //      }
    // However, for sake of practice, I added the second else if 
            else {
            document.write(' --This Pokemon is Tiny!!')
            }
  }