$(document).ready(function() {

    //Declaring variables
    let topics = ["kobe bryant", "future", "programming", "javascript"];

    //Declaring loadUpFunction function
    function loadUp() {

        //Declaring this function of current button pushed
        var gpy = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?&limit=10&q=" +
            gpy + "&api_key=njC74Xhdd5F1xLLJTPbOIsCtCUjsU77i";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            //For loop to show each giphy and rating
            for (let i = 0; i < response.data.length; i++){
                let img = $("<img class='d-inline-block float-left' style='padding: 25px; margin-left: -225px;'>");
                $("#results").prepend(img.attr("src", response.data[i].images.fixed_height_still.url));
                img.attr("data-still", response.data[i].images.fixed_height_still.url);
                img.attr("data-animate", response.data[i].images.fixed_height.url);
                img.attr("data-state", "still");
                img.attr("id", "gif");
                $("#results").prepend("<div class='float-left' id='text' style='width: 200px;'>" + "Rated: " + JSON.stringify(response.data[i].rating) + "</div>");
            };
        });
    };

    function loadButtons() {
        //Empyting any buttons that are loaded
        $("#buttons").empty();

        //For loop to set the text inside the button to each item in the topics array
        for(let i = 0; i < topics.length; i++){
            //Appends button to the buttons id
            let bn = $("<button>");
            bn.addClass("topics");
            bn.attr("data-name", topics[i]);
            bn.text(topics[i]);
            $("#buttons").append(bn);
            console.log(topics[i]);
        }
    }

    //Loads new buttons in
    $("#add-giphy").on("click", function() {

        event.preventDefault();

        //Pushes giphyVal to topics array
        let giphyVal = $("#giphy-input").val().trim();

        topics.push(giphyVal);

        loadButtons();

        $("#giphy-input").val('');
    })
    
    $(document).on("click", ".topics", loadUp);

    $(document).on("click", "#gif", function() {
        let state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    loadButtons();

    //=========================MATERIALIZE========================//

    
    
});