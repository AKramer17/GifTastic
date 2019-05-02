$(document).ready(function() {

    var characters = ['Peter Griffin', 'Spongebob Squarepants', 'Bojack Horseman', 'Timmy Turner', 'Jake the Dog', 'Tom & Jerry', 'Stan Marsh', 'Steven Universe', 'Homer Simpson'];


    function displayInfo() {
      $('#nameList').empty();
      var character = $(this).attr('data-name');
      var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + character + '&api_key=QRnpUPr0ReecuTtMHyqH1b9RQez5cUJD&limit=10';


      $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function(response) {
        if (response.pagination.total_count == 0) {
          alert('No GIFs Found');
          var itemindex = characters.indexOf(character);
            if (itemindex > -1) {
              characters.splice(itemindex, 1);
              renderButtons();
            }
        }
        

        var results = response.data;
        for (var j = 0; j < results.length; j++) {
          var newCharGif = $("<div class='characterName'>");
          var pRating = $('<p>').text('Rating: ' + results[j].rating.toUpperCase());
          var pTitle = $('<p>').text('Title: ' + results[j].title.toUpperCase());
          var gifURL = results[j].images.fixed_height_still.url;         
          var gif = $('<img>');

          gif.attr('src', gifURL);
          gif.attr('data-still', results[j].images.fixed_height_still.url);
          gif.attr('data-animate', results[j].images.fixed_height.url);
          gif.attr('data-state', 'still');
          gif.addClass('animate-gif');

          newCharGif.append(pRating);
          newCharGif.append(pTitle);
          newCharGif.append(gif);

          $('#nameList').prepend(newCharGif);
        } 
      });
    };
    

    function renderButtons() {
      $('.buttons-view').empty();

      for (var i = 0; i < characters.length; i++) {
        var createButtons = $('<button>');

        createButtons.addClass('character btn btn-info');
        createButtons.attr('data-name', characters[i]);
        createButtons.text(characters[i]);
        $('.buttons-view').append(createButtons);
      }
    }

    function removeButton(){
      $("#nameList").empty();
      var character = $(this).attr('data-name');
      var itemindex = characters.indexOf(character);
      if (itemindex > -1) {
        characters.splice(itemindex, 1);
        renderButtons();
      }
    }

    function playGif () {
      var state = $(this).attr('data-state');
      if (state === 'still') {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
      }
      else {
        $(this).attr('src' , $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
      }
    }

    $("#addCharacter").on("click", function(event) {
      event.preventDefault();

      var char = $("#newChar").val().trim();
      if (characters.toString().toLowerCase().indexOf(char.toLowerCase()) != -1) {
        alert("Exact or similar character already exists");
      }
      else {
        characters.push(char);
        renderButtons();
      }
    });


    $(document).on("click", ".character", displayInfo);
    $(document).on("click", ".animate-gif", playGif);
    $(document).on("dblclick", ".character", removeButton);

    renderButtons();


});