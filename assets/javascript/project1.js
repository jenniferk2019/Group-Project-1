



//javascript for edemam api/ cooking
var queryURL = "https://api.edamam.com/search?q=salmon-teriyaki&app_id=dbf4510b&app_key=f6b010164002a524ec934d0070183bf6"

$("#cook-button").on("click", function (event) {
    event.preventDefault();
$.ajax({
  url: queryURL,
  method: "GET"
})

  .then(function(response) {

    
    $("#edemam").text(response.hits[0].recipe.url)
    $("#edemam").append("<img src='" + response.hits[0].recipe.image + "' >")
    

    // Log the resulting object
    console.log(response);


  });

  // javascript for yelp/finding a restaraunt
  var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=cold-noodles&location=philadelphia"



  $("#cook-button").on("click", function (event) {
    event.preventDefault();
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
      $("#yelp").text(response.businesses[0].name);
      $("#yelp").append(response.businesses[0].phone);
      $("#yelp").append(response.businesses[0].location.address1);
      $("#yelp").append("<img src='" + response.businesses[0].image_url + "' />" );
      $("#yelp").append(response.businesses[0].rating);


      
      // Log the resulting object
      console.log(response);


    });
