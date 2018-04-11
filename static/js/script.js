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

function displayLists(lists) {
  // Lists should be ordered based on their 'pos' field
  lists.rows = _.sortBy(lists.rows, 'pos');
  lists.rows.forEach(function(list) {
    $('#main-content').append(
      
    '<div class="hero is-primary is-large is-narrow column">' +
      '<div class="hero-head">' +
        '<nav class="navbar">' +
          '<div class="container">' +
            '<div class="navbar-brand">' +
              '<a class="navbar-item">' +
                '<h1 id="board-title" class="title">' + list.name + '</h1>' +
              '</a>' +
          '</div>' +
        '</nav>' +
      '</div>' +

      '<div id="'+ list.name + '-body" class="hero-body">' +

      '</div>' +


      '<div id="'+ list.name + '-foot" class="hero-foot">' +
        '<a class="new-card-button button is-primary is-inverted">' +
          '<span>New Card</span>' +
        '</a>' +
      '</div>' +
    '</div>'
    )
  });
}

loadLists()
  .then((data) => {
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

$(document).on('click', '.new-card-button', function(e) {
  loadLists().then((data) => {
    console.log("Clicked", data.rows);
    lists.rows = _.sortBy(lists.rows, 'pos');
  });
});

