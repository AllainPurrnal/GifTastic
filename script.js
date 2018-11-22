$(document).ready(function(){


    var movies = ["Scrubs", "Cats", "The Office", "Red Pandas", "Game of Thrones", "Stranger Things", "Spongebob", "Parks and Recreation", "Marvel"]
    GIFArea = " "

    function renderButtons() {
    
        $("#movies-view").empty();
    
        for (var i=0; i < movies.length; i++) {  
            var a = $('<button>');
            a.addClass('movie'); 
            a.attr('data-name', movies[i]);
            a.text(movies[i]);

            $("#movies-view").append(a);
        } // end for
        s=
        $("#movie-input").focus();
    } // end renderButtons
    
    renderButtons();
    
    $("#add-movie").on('click', function() {

    event.preventDefault();
    
    var movie = $("#movie-input").val().trim();
    
    movies.push(movie);
    
    renderButtons();
    
    });
    
    $(document).on('click', 'button',  function() {
            $('#GIFArea').empty(); 
            var b = $(this).attr('data-name');
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + b + "&api_key=wPpmdGGro4FuI6dyt13cLkTPyVUgRY8H";
            console.log(queryURL); 
    
            $.ajax({
                url: queryURL,
                method: 'GET'
            })
            
            .done(function(response) {
                console.log(response);
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $('<div class="item">');      
                    var rating = results[i].rating;
                    var r = $('<p>').text("Rating: " + rating);
                    var gifImage = $('<img>');
                        gifImage.attr('src', results[i].images.fixed_height_still.url)
                            .attr('data-still', results[i].images.fixed_height_still.url)
                            .attr('data-animate', results[i].images.fixed_height.url)
                            .attr('data-state', "still")
                            .addClass("showImage");
                        gifDiv.append(r)
                            .append(gifImage);	                                	  
                        $('#GIFArea').prepend(gifDiv);
                }// end for
    
            });
    }); // end document on click button
        
    $(document).on('click', '.showImage',  function() {
        var state = $(this).data('state');
        
        if (state == "still") {
            console.log("still image works");
            $(this).attr('src', $(this).data('animate'))
            .data('state', 'animate');
        } else {
            console.log("animated image works");
            $(this).attr('src', $(this).data('still'))
            .data('state', 'still');               
            }
    
    }); //end document on click showImage
    
    });
    