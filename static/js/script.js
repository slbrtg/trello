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
// function displayLists(lists) {
//   // Lists should be ordered based on their 'pos' field
//   lists.rows = _.sortBy(lists.rows, 'pos');
//   lists.rows.forEach(function(list) {
//     $('#board-title').text(list.name)
//     var listDiv = $('<div>').addClass('hero is-primary');
//     var listCardDiv = $('<div>').addClass('hero-body')
//     var curElem = $('<header>').addClass('title').text(list.name);
//     if (list.cards) {
//       var innerUl = $('<ul>');
//       list.cards.forEach(function(card) {
//         innerUl.append($('<li>').text(card));
//       });
//       listCardDiv.append(curElem);
//       listCardDiv.append(innerUl);
//       listDiv.append(listCardDiv);
//     }
//     $('#board').append(listDiv);
//   });
// }


function displayLists(lists) {
  // Lists should be ordered based on their 'pos' field
  lists.rows = _.sortBy(lists.rows, 'pos');
  lists.rows.forEach(function(list) {
    $('#main-content').append(

    '<section class="hero is-primary is-medium">' +
      '<div class="hero-head">' +
        '<nav class="navbar">' +
          '<div class="container">' +
            '<div class="navbar-brand">' +
              '<a class="navbar-item">' +
                '<h1 id="board-title" class="title">' + list.name + '</h1>' +
              '</a>' +
              '<span id="burger-menu" class="navbar-burger burger" data-target="navbarMenuHeroA">' +
                '<span></span>' +
                '<span></span>' +
                '<span></span>' +
              '</span>' +
            '</div>' +
            '<div id="navbarMenuHeroA" class="navbar-menu">' +
              '<div class="navbar-end">' +
                '<a class="navbar-item is-active">' +
                  'Home' +
                '</a>' +
                '<a class="navbar-item">' +
                  'Examples' +
                '</a>' +
                '<a class="navbar-item">' +
                  'Documentation' +
                '</a>' +
                '<span class="navbar-item">' +
                  '<a class="button is-primary is-inverted">' +
                    '<span class="icon">' +
                      '<i class="fab fa-github"></i>' +
                   ' </span>'+
                    '<span>Download</span>' +
                  '</a>' +
                '</span>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</nav>' +
      '</div>' +

      
        '<div class="hero-body">' +
        '<div class="container has-text-centered">' +
          '<h1 class="title">' +
            'Title' +
          '</h1>' +
          '<h2 class="subtitle">' +
            'Subtitle' +
          '</h2>' +
        '</div>' +
      '</div>' +


      '<div class="hero-foot">' +
        '<nav class="tabs">' +
          '<div class="container">' +
            '<ul>' +
              '<li class="is-active"><a>Overview</a></li>' +
              '<li><a>Modifiers</a></li>' +
              '<li><a>Grid</a></li>' +
              '<li><a>Elements</a></li>' +
              '<li><a>Components</a></li>' +
              '<li><a>Layout</a></li>' +
            '</ul>' +
          '</div>' +
        '</nav>' +
      '</div>' +
    '</section>'
    )
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
  burgerMenu.className == "navbar-menu" 
  ? burgerMenu.className = "navbar-menu is-active" 
  : burgerMenu.className = "navbar-menu"
});

