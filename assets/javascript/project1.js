// Firebase Configuration
var firebaseConfig = {
  apiKey: "AIzaSyCO3GWGFUQE5CjCYpAb346YB8OnibRRC-I",
  authDomain: "mattsproject-54627.firebaseapp.com",
  databaseURL: "https://mattsproject-54627.firebaseio.com",
  projectId: "mattsproject-54627",
  storageBucket: "mattsproject-54627.appspot.com",
  messagingSenderId: "1015675607617",
  appId: "1:1015675607617:web:ba6417b6a5bbac8f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();



//javascript for edemam api/ cooking

// cook button click functionality
$("#cook-button").on("click", function (event) {
  //if statement to prevent blank search
  if ($("#search").val().trim() !== "") {
    event.preventDefault();
    // gets value for food variable from input box
    var food = $("#search").val().trim()
    // gets url for ajax call and inputs food variable
    var queryURL = "https://api.edamam.com/search?q=" + food + "&app_id=dbf4510b&app_key=f6b010164002a524ec934d0070183bf6"
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // after call gets response
      .then(function (response) {

        for (var i = 0; i < 5; i++){

      //gives id and text for the name of the food
       var foodName = $("<div>");
       foodName.text(response.hits[i].recipe.label);
       foodName.attr("id", '"recName' + i + '"');

        // gives id, class and display food image
       var foodPic = $("<img src='" + response.hits[i].recipe.image + "' id='recPic" + i + "' >");
       foodPic.addClass("foodPic");

       //gives id and link for the recipe of the food
       var foodRecipe = $("<div>");
       foodRecipe.append("<a href='" + response.hits[i].recipe.url + "' target='_blank'>CLICK HERE FOR THE RECIPE!</a>");
       foodRecipe.attr("id", '"recLink' + i + '"');

      //creates a favorite button and gives it an id for each food
       var favButton = $("<button type='button' class='favButton' id='recFav" + i + "'>Recommend this!</button>")
       
       // attaches all four previous elements and puts them into a row
       var newRow = $("<row>");
       newRow.append(foodName, foodPic, foodRecipe, favButton);
       $("#results-display").append(newRow);
        };

        // Log the 10 responses from the call
        console.log(response);


      });

    // javascript for yelp/finding a restaraunt

  }
});
//function for submitting info to database, submits name and link!
$(document).on("click", ".favButton", function() {
  event.preventDefault();

  name = $()


}
// on click functionality for book button
$("#book-button").on("click", function (event) {
  if ($("#search").val().trim() !== "") {
    event.preventDefault();
    // displays location search
    $("#locationSearch").show();

  }
});
// on click functionality for city search
$("#cityButton").on("click", function (event) {
  if ($("#inputCity").val().trim() !== "") {

    event.preventDefault();
    //creating variables for food and city
    var food = $("#search").val().trim()
    var city = $("#inputCity").val().trim()


    // url for ajax call to yelp api, uses city and food variables to complete search
    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + food + "&location=" + city
    // ajax call to yelp
    $.ajax({
      url: queryURL,
      method: "GET",
      headers: {
        Authorization: "Bearer f_OWbSivdwPfDyl30viNm1pnNTDjKRkxJILe56UtQARE0RCvNNOoDY11kZPHD3XBxpDDsHLcQ4gUlUfE_-CxM89He8J5bEgGByTO56_pk-LILybh25BE7NgrRLQsXXYx",

      },
      dataType: 'json',


    })

        .then(function(response) {

          for (i = 0; i < 5; i++){

          var name = $("<div>");
          name.text(response.businesses[i].name);
          name.addClass("nameDiv");
          
      
          var phone = $("<div>");
          phone.text("Phone #: " + response.businesses[i].phone);
          phone.addClass("phoneDiv");
          
      
          var location = $("<div>");
          location.text(response.businesses[0].location.address1);
          location.addClass("locationDiv");
          
      
          var image_url = $("<img src='" + response.businesses[i].image_url + "' />");
          image_url.addClass("yelpPic");
         
      
          var rating = $("<div>");
          rating.text("Rating: " + response.businesses[i].rating + "/5");
          rating.addClass("ratingDiv");
          
      
          var newRow = $("<row>");
          newRow.append(name, phone, location, rating, image_url);
          newRow.addClass("addedRow")
          $("#results-display").append(newRow);
          }
            // Log the resulting object
            console.log(response);
      
      })
  }
});

