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

        for (i = 0; i < 5; i++){


       var foodName = $("<div>");
       foodName.text(response.hits[0].recipe.label);
       foodName.attr("id", "foodRatingDiv");

       var foodPic = $("<img src='" + response.hits[0].recipe.image + "' >");
       foodPic.addClass("foodPic")

       var foodRecipe = $("<div>");
       foodRecipe.append("<a href='" + response.hits[0].recipe.url + "' target='_blank'>CLICK HERE FOR THE RECIPE!</a>")
       
       var newRow = $("<row>");
       newRow.append(foodName, foodPic, foodRecipe);
       $("#results-display").append(newRow);
        };


        // Log the 10 responses from the call
        console.log(response);


      });

    // javascript for yelp/finding a restaraunt

  }
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
          name.attr("id, nameDiv");
          
      
          var phone = $("<div>");
          phone.text("Phone #: " + response.businesses[i].phone);
          phone.attr("id, phoneDiv");
          
      
          var location = $("<div>");
          location.text(response.businesses[0].location.address1);
          location.attr("id, locationDiv");
          
      
          var image_url = $("<img src='" + response.businesses[i].image_url + "' />");
          image_url.addClass("yelpPic");
         
      
          var rating = $("<div>");
          rating.text("Rating: " + response.businesses[i].rating + "/5");
          rating.attr("id, ratingDiv");
          
      
          var newRow = $("<row>");
          newRow.append(name, phone, location, rating, image_url);
          $("#results-display").append(newRow);
          }
            // Log the resulting object
            console.log(response);
      
      })
  }
});

