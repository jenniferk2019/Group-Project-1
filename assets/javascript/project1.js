





//javascript for edemam api/ cooking
//var queryURL = "https://api.edamam.com/search?q=salmon-teriyaki&app_id=dbf4510b&app_key=f6b010164002a524ec934d0070183bf6"

$("#cook-button").on("click", function (event) {
  if ($("#search").val().trim() !== "") {
    
    event.preventDefault();

    var food = $("#search").val().trim()
    var queryURL = "https://api.edamam.com/search?q=" + food + "&app_id=dbf4510b&app_key=f6b010164002a524ec934d0070183bf6"
    $.ajax({
  url: queryURL,
  method: "GET"
})

  .then(function(response) {

    
    $("#results-display").text(response.hits[0].recipe.url)
    $("#results-display").append("<img src='" + response.hits[0].recipe.image + "' >")
    

    // Log the resulting object
    console.log(response);


  });

  // javascript for yelp/finding a restaraunt
  
}
});

$("#book-button").on("click", function (event) {
  if ($("#search").val().trim() !== "") {
    event.preventDefault();
    $("#locationSearch").show();
    
  }
  });

  $("#cityButton").on("click", function (event) {
    if ($("#inputCity").val().trim() !== "") {
    
      event.preventDefault();
  
      var food = $("#search").val().trim()
      var city = $("#inputCity").val().trim()



    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + food + "&location=" + city

  $.ajax({
    url: queryURL,
    method: "GET",
    headers: {
      Authorization : "Bearer f_OWbSivdwPfDyl30viNm1pnNTDjKRkxJILe56UtQARE0RCvNNOoDY11kZPHD3XBxpDDsHLcQ4gUlUfE_-CxM89He8J5bEgGByTO56_pk-LILybh25BE7NgrRLQsXXYx",

    },
    dataType: 'json',
    

  })
 
    .then(function(response) {

  
      // $("#edemam").text(response.hits[0].recipe.url)
      // $("#edemam").append("<img src='" + response.hits[0].recipe.image + "' >")
      $("#results-display").text(response.businesses[0].name);
      $("#results-display").append(response.businesses[0].phone);
      $("#results-display").append(response.businesses[0].location.address1);
      $("#results-display").append("<img src='" + response.businesses[0].image_url + "' />" );
      $("#results-display").append(response.businesses[0].rating);


      
      // Log the resulting object
      console.log(response);


    })
  }
});


