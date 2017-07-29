$(document).ready(function() {

// VARIABLES ====================================================================
	var newButton;
	var myBtns = ["Cats" , "Fairies" , "Buffy" , "Wine" , "Glitter" , "Millenials" , "Tattoos" , "Crystals" , "Wicca" , "Nails"];
	
// FUNCTIONS ====================================================================
	function renderButtons() {
		for (var i = 0; i < myBtns.length; i++) {
		$("#buttons-here").append("<button class='search' value='"+ myBtns[i] +"'>" + myBtns[i] + "</button>");
			}
		};


// MAIN PROCESS =================================================================
	renderButtons();

// searches Giphy API for gifs and displays them to the page
	$(document).on("click", "button", function(){
		console.log(this);
		var search = $(this).attr("value");
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=924658a05f41431d80eacb5d77304466&limit=10";

		$.ajax({
		      url: queryURL,
		      method: "GET"
		    }).done(function(data) {
		    	var results = data.data;
		    	for (var i = 0; i < results.length; i++) {
		    		var still = results[i].images.fixed_height_still.url;
		    		var animate = results[i].images.fixed_height.url;
		    		$("#show-gifs")
		    		$("#show-gifs").prepend("<img class='gif' src='" + still + "' data-still='" + still + "' data-animate='" + animate + "' data-state='still'>");
		    	}
		    	});	      
	});

// changes Gif from still to animated
	$(document).on("click", ".gif" , function(){
// console.log(this);
		var state = $(this).attr("data-state");
			if (state === "still") {
				var animate = $(this).attr("data-animate");
				$(this).attr("src",animate);
				$(this).attr("data-state", "animate");
			}
			else {
				var still = $(this).attr("data-still");
				$(this).attr("src" , still);
				$(this).attr("data-state" , "still");
			}
	});	  
// Allows user to add a new button 
	$("#go").on("click", function(event) {
	    	event.preventDefault();
	    	newButton = $("#user-input").val().trim();
	    	myBtns.push(newButton);
	  		$("#buttons-here").empty();
	    	renderButtons();
    });

// Final Close
});
