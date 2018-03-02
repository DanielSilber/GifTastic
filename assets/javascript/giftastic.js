

var bandsArray = ["Talking Heads", "Modest Mouse", "David Bowie", "Thee Oh Sees", "Sonic Youth", "Isaac Hayes", "Joy Division", "James Brown",   "Radiohead", "Tame Impala"];

$(document).ready(function() {
    for (var i = 0; i < bandsArray.length; i++) {
        $("#bands-buttons").append("<button type='button' onclick='searchGif(\"" + bandsArray[i] + "\")' class='btn btn-primary' value=' " + bandsArray[i] + "'> " + bandsArray[i] + " </button>");
    }
});

function bandsButtonClicked() {
    var userInput = $('#bands-input').val();
    searchGif(userInput);
}

function submitButtonClicked() {
    var userInput = $('#bands-input').val();

    if (userInput) {
        $('#bands-buttons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
    }
}

function searchGif(bands) {
    $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?q= ' + bands + ' &api_key=nzP2Lzt3Lg3ktw4VVQV9sZLnMwFHi830&limit=10',
            type: 'GET',
        })
        .done(function(response) {
            displayGif(response);
        })
}

function displayGif(response) {
    $('#bands').empty();
    for (var i = 0; i < response.data.length; i++) {
        var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:250px; height:250px">';

        image = '<div class="col-md-4">' + image + "</div>";
        $('#bands').append(image);
    }

    $('.movImage').on('click', function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }

    });
}
