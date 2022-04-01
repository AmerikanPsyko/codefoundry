function newItem() {
  let li = $("<li></li>");

  let inputValue = $("#input").val();
  li.append(inputValue);

  if (inputValue === "") {
    alert("You Must Write Something!!");
  } else {
    $("#list").append(li);
  }

  //2. Crossing out an item from the list of items:
  function crossOut() {
    li.toggleClass("strike");
  }

  li.on("dblclick", crossOut);

  //3(i). Adding the delete button "X":
  let crossOutButton = $("<crossOutButton></crossOutButton>");
  crossOutButton.append(document.createTextNode("Delete"));
  li.append(crossOutButton);

  crossOutButton.on("click", deleteListItem);

  function deleteListItem() {
    li.addClass("delete");
  }
    };
  

 


$("#list").sortable();
