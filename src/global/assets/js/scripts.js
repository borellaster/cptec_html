$.Pages.init();

var errorTeste = null;

$(document).ready(function() {
    // Initializes search overlay plugin.
    // Replace onSearchSubmit() and onKeyEnter() with 
    // your logic to perform a search and display results
    var ht = new HT({
        token: "503505f48f2bbd0df7b696356b4a1ae3"
    });

    $('[data-pages="search"]').search({
        searchField: '#overlay-search',
        closeButton: '.overlay-close',
        suggestions: '#overlay-suggestions',
        brand: '.brand',
        onSearchSubmit: function(searchString) {
            console.log("Search for: " + searchString);
        },
        onKeyEnter: function(searchString) {
            console.log("Live search for: " + searchString);
            var searchField = $('#overlay-search');
            var searchResults = $('.search-results');
            clearTimeout($.data(this, 'timer'));
            searchResults.fadeOut("fast");
            var wait = setTimeout(function() {
                searchResults.find('.result-name').each(function() {
                    if (searchField.val().length != 0) {
                        $(this).html(searchField.val());
                        searchResults.fadeIn("fast");
                    }
                });
            }, 500);
            $(this).data('timer', wait);
        }
    });
})