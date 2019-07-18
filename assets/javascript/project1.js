// Firebase Configuration
var firebaseConfig = {
  apiKey: "AIzaSyCPI4zDJJupPUAUhou8t-GtrA24WHahe1s",
  authDomain: "cookbook-d8079.firebaseapp.com",
  databaseURL: "https://cookbook-d8079.firebaseio.com",
  projectId: "cookbook-d8079",
  storageBucket: "cookbook-d8079.appspot.com",
  messagingSenderId: "172042055074",
  appId: "1:172042055074:web:91ef5364e42a1946"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//sets variable for the database call
var database = firebase.database();



//javascript for edemam api/ cooking

// cook button click functionality
$("#cook-button").on("click", function (event) {
  //clears the results from the display and replaces them with a div to append new display to
  $("#resultsContainer").html("<div id='results-display'></div>");

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
        //for loop to display 5 recommendations
        for (var i = 0; i < 5; i++) {

          //gives id and text for the name of the food
          var foodName = $("<div>");
          foodName.text(response.hits[i].recipe.label);
          foodName.attr("id", '"recName' + i + '"');
          foodName.addClass("foodDiv")


          // gives id, class and display food image
          var foodPic = $("<img src='" + response.hits[i].recipe.image + "' id='recPic" + i + "' >");
          foodPic.addClass("foodPic");

          //gives id and link for the recipe of the food
          var foodRecipe = $("<div>");
          foodRecipe.append("<a href='" + response.hits[i].recipe.url + "' target='_blank'>CLICK HERE FOR THE RECIPE!</a>");
          foodRecipe.attr("id", '"recLink' + i + '"');
          foodRecipe.addClass("foodRecipeDiv");


          //creates a favorite button and gives it an id for each food
          var favButton = $("<button type='button' class='favButton' id='recFav" + i + "'>Recommend this!</button>");
          //gives name and link attributes so they can be sent to database later
          favButton.attr("data-recipeName", response.hits[i].recipe.label);
          favButton.attr("data-recipeLink", response.hits[i].recipe.url);
          favButton.addClass("favButtonDiv")

          // variables for sorting results into columns
          var collOne = $("<div class='col text-right'>");
          var collTwo = $("<div class='col text-left'>");
          var newRow = $("<div class='row'>");

          //appends created elements to display 
          collOne.append(foodPic);
          collTwo.append(foodName, foodRecipe, favButton);
          newRow.append(collOne, collTwo);
          newRow.addClass("addedRow")
          $("#results-display").append(newRow);
          $("#results-display").append("<hr class='divide-line'>");

        };
        // Log the 10 responses from the call
        console.log(response);

      });

  }
});
//function for submitting info to database, submits name and link!
$(document).on("click", ".favButton", function () {
  event.preventDefault();
  // retrieves the attributes from the buttons
  var name = $(this).attr("data-recipeName");
  var link = $(this).attr("data-recipeLink");

// puts the button attributes in an object to be sent to the database
  var recommendRecipe = {
    name: name,
    link: link
  }
  //adds new object to database
  database.ref().push(recommendRecipe)


});
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
 //clears the results from the display and replaces them with a div to append to
  $("#resultsContainer").html("<div id='results-display'></div>");
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

      .then(function (response) {
        //loop to display the 5 results from the yelp api
        for (i = 0; i < 5; i++) {

          //creates display for restaurant name
          var name = $("<div><a href='" + response.businesses[i].url + "' target='_blank'>" + response.businesses[i].name + "</a></div><br>");
          name.addClass("nameDiv");

           //creates display for restaurant phone number
          var phone = $("<p>");
          phone.text("Phone #: " + response.businesses[i].phone);
          phone.addClass("phoneDiv");

           //creates display for restaurant address
          var location = $("<p>");
          location.text(response.businesses[i].location.address1);
          location.addClass("locationDiv");

           //creates display for restaurant picture
          var image_url = $("<img src='" + response.businesses[i].image_url + "' />");
          image_url.addClass("yelpPic");

           //creates display for restaurant rating
          var rating = $("<p>");
          rating.text("Rating: " + response.businesses[i].rating + "/5");
          rating.addClass("ratingDiv");

          //creates display for yelp information
          var colOne = $("<div class='col text-right'>");
          var colTwo = $("<div class='col text-left'>");
          var newRow = $("<div class='row'>");
          colOne.append(image_url);
          colTwo.append(name, phone, location, rating);
          newRow.append(colOne, colTwo);
          newRow.addClass("addedRow");
          $("#results-display").append(newRow);
          $("#results-display").append("<hr class='divide-line'>");

        }
        // Log the resulting object
        console.log(response);

      })
  }
});

// calls to database to display the last 10 recommended recipes
database.ref().limitToLast(10).on('child_added', function (snapshot) {
  var store = snapshot.val();
  // creates row to add to table later
  var tRow = $("<tr>");
  // creates an table division that is the name of the recipe and that name links to the recipe page
  var recipeName = $("<td>").html("<a class='newRecipe' href='" + store.link + "' target='_blank'>" + store.name + "</a>");
  recipeName.addClass("newRecipe");

  tRow.append(recipeName);

  $("tbody").prepend(tRow);

});

