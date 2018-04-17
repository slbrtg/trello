'use strict';
// Your client side JavaScript code goes here.
// This file is included in every page.

// Example code for creating a list on the server
function createList(name) {
  return $.ajax('/api/lists', {
    type: 'POST',
    data: {
      name: name,
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
    
    '<div class="column">' +
      '<div id="'+ list.name + '-card-field" class="add-card-field field has-addons">' + 
        '<div class="control">' +
          '<input id="'+ list.name + '-input" class="input" type="text" placeholder="add task">' +
        '</div>' +
        '<div class="control">' +
          '<a id="'+ list.name + '-button" class="new-card-button button is-primary">Add</a>' +
        '</div>' +
      '</div>' +

      '<div class="list-hero hero is-primary is-narrow">' +
        '<div class="hero-head">' +
          '<nav class="navbar">' +
            '<div id="'+ list.name + '-head" class="container list-name">' +
              '<div class="navbar-brand">' +
                '<a class="navbar-item">' +
                  '<h1 id="board-title" class="title">' + list.name + '</h1>' +
                '</a>' +
              '</div>' +
            '</div>' +
          '</nav>' +
        '</div>' +

        '<div id="'+ list.name + '-body" class="hero-body">' +

        '</div>' +
        
      '</div>'
    )
  });
}

// Retrieves and loads lists on start
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

// add list
$(document).on('click', '#new-list-button', (e) => {
  console.log("clicked new-list-button");
  var newListName = $('#new-list-input').val();
  newListName !== "" ? createList(newListName) : console.log("new list name is empty");
  location.reload();
});


// add task
$(document).on('click', '.new-card-button', (e) => {
  console.log("clicked");
  loadLists().then((data) => {
    var parentId = $('.new-card-button').parent().parent().attr('id');
    data.rows = _.sortBy(data.rows, 'pos');
    data.rows.forEach((list) => {
      if (list.name + '-card-field' === parentId) {
        console.log("Match!");
      }
    });
  });
});

