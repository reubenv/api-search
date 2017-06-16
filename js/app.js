var $albumDiv = $('#albums');

var processResults = function(data) {
    if (data.count === 0) {
        var nothingFound = `
        <li class='no-albums desc'>
            <i class='material-icons icon-help'>pan_tool</i>These are not the droids you're looking for.
        </li>
        `
        $albumDiv.html(nothingFound);
    } else {
        $albumDiv.empty();
        var $resultsArray = []
        $.each(data.results, function(index, person) {
            var objectToInsert = {};
            objectToInsert.name = person.name;
            objectToInsert.birth_year = person.birth_year;
            $resultsArray.push(objectToInsert)
        });

        $.each($resultsArray, function(index, person) {
            var gifUrl = "http://api.giphy.com/v1/gifs/search";
            var gifSearch = {
                "q": person.name,
                "limit": 1,
                "api_key": "dc6zaTOxFJmzC"
            };
            $.getJSON(gifUrl, gifSearch, function(response) {
                var albumHTML = '<li>';
                albumHTML += '<div class="album-wrap">'
                albumHTML += '<img src="' + response.data[0].images.fixed_width.url + '">';
                albumHTML += '</div>';
                albumHTML += '<span class="album-title">' + person.name + '</span>';
                albumHTML += '<span class="album-artist">' + person.birth_year + '</span>';
                albumHTML += '</li>';
                $albumDiv.append(albumHTML);
            });
        });
    };
};

$('form').submit(function(event) {
    event.preventDefault();
    var url = "http://swapi.co/api/people/"
    var searchParamaters = {
        "search": $('#search').val()
    };

    $.getJSON(url, searchParamaters, processResults);
}); // end form submit