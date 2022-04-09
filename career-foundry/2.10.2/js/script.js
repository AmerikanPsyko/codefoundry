// Begin IIFE
//Pokemon Repository list of Pokemon
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  // Load list fetch from API
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // Load details fetch from API
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        (item.imageUrl = details.sprites.front_default),
          (item.height = details.height);
        item.weight = details.weight;
        item.abilities = [];
        for (let i = 0; i < details.abilities.length; i++) {
          item.abilities.push(details.abilities[i].ability.name);
        }
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //Public Functions
  function getAll(pokemon) {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showDetails(pokemon);
    });
  }

  function addListener(button, pokemon) {
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  //Pass public functions to return
  return {
    add: add,
    getAll: getAll,
    addListener: addListener,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
  };

  //Modal section
  function showModal() {
    let modalContainer = document.querySelector("#Pokemon");
    modalContainer.classList.add("is-visible");
  }

  document.querySelector("#show-modal").addEventListener("click", () => {
    showModal();
  });

  function showModal(pokemon) {
    let modalContainer = document.querySelector("#list-group");
    modalContainer.innerHTML = "";

    let modal = document.createElement("div");
    modal.classList.add("modal");

    // let closeButtonElement = document.createElement("button");
    // closeButtonElement.classList.add("modal-close");
    // closeButtonElement.innerText = "Close";
    // closeButtonElement.addEventListener("click", hideModal);

    window.addEventListener("keydown", (e) => {
      let modalContainer = document.querySelector("#modal-container");
      if (
        e.key === "Escape" &&
        modalContainer.classList.contains("is-visible")
      ) {
        hideModal();
      }

     

    });

      modalContainer.addEventListener('click', (e) => {
        let target = e.target;
          if (target === modalContainer) {
            hideModal();
          }
      });


    let modalTitle = document.querySelector(".modal-title");
    let modalBody = document.querySelector(".modal-body");
    let pokemonName = $("<h2>" + pokemon.name + "</h2>");
    let pokemonHeight = $("<p>" + "Height: " + pokemon.height + "</p>");
    let pokemonWeight = $("<p>" + "Weight: " + pokemon.weight + "</p>");
    let pokemonAbilities = $(
      "<p>" + "Abilities: " + pokemon.abilities + "</p>"
    );
    let pokemonImage = $("<img class='pokemon-modal-image'>");
    let button = document.querySelector("button");

    pokemonImage.attr("src", pokemon.imageUrl);
    button.innerText = item.name;
    button.setAttribute("data-toggle", ".modal");
    button.setAttribute("data-target", "#triggerModal");
    // button.setAttribute("type", "button");
    button.classList.add("btn", "btn-lg", "btn-block");

    modalTitle.append(pokemonName);
    modalBody.append(pokemonImage);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonWeight);
    modalBody.append(pokemonAbilities)

    modalContainer.classList.add("is-visible");
  }

  // document.querySelector("#list-group").addEventListener("click", () => {
  //   showModal("Modal Title", "This is the modal content");
  // });

  function hideModal() {
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.remove("is-visible");
  }

  // End Modals
})();

// End IIFE

//For each loop, create button, return data
function addListItem(pokemon) {
  pokemonRepository.getAll().forEach(function (pokemon) {
    let pokemonList = document.querySelector(".list-group");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    pokemonList.appendChild(button);
    button.innerText = pokemon.name;
    button.classList.add("btn");
    pokemonList.appendChild(listItem);
    pokemonRepository.addListener(button, pokemon);
  });
}

// Load pokemon list forEach loop
pokemonRepository.loadList().then(function () {
  addListItem();
});
