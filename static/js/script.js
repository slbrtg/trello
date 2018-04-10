'use strict';
// Your client side JavaScript code goes here.
// This file is included in every page.

// Example code for creating a list on the server
function createList(name, pos, cards) {
  return $.ajax('/api/lists', {
    type: 'POST',
    data: {
      name: name,
      pos: pos,
      cards: cards
    }
  });
}

// Example code for getting all `list`s from server
function loadLists() {
  return $.ajax('/api/lists');
}

// Example code for displaying lists in the browser
function displayLists(lists) {
  // Lists should be ordered based on their 'pos' field
  lists.rows = _.sortBy(lists.rows, 'pos');
  lists.rows.forEach(function(list) {
    var listDiv = $('<div>').addClass('hero is-primary');
    var listCardDiv = $('<div>').addClass('hero-body')
    var curElem = $('<header>').addClass('title').text(list.name);
    if (list.cards) {
      var innerUl = $('<ul>');
      list.cards.forEach(function(card) {
        innerUl.append($('<li>').text(card));
      });
      listCardDiv.append(curElem);
      listCardDiv.append(innerUl);
      listDiv.append(listCardDiv);
    }
    $('#board').append(listDiv);
  });
}

loadLists()
  .then(function(data) {
    console.log('Lists', data.rows);
    if (data.rows.length) {
      // If some lists are found display them
      displayLists(data);
    } else {
      // If no lists are found, create sample list
      // and re-display.
      console.log('No lists found, creating one.');
      createList('Hello', 0, ['Card 1', 'Card 2'])
        .then(function(list) {
          console.log('Created list', list);
          return loadLists();
        })
        .then(function(lists) {
          displayLists(lists);
        })
    }

  });


///////////////////////////////////////////////
// Frontend JQ
//////////////////////////////////////////////

$(document).on('click', '#burger-menu', function(e) {
  var burgerMenu = document.getElementById("navbarMenuHeroA");
  if(burgerMenu.className == "navbar-menu") {
      burgerMenu.className = "navbar-menu is-active";
  } else {
      burgerMenu.className = "navbar-menu";
  }
});

