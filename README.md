# Project 1
Team: Jenn, Josh and Matt

Cook/Book Application

The basis of our app is to provide you with food and restaurant recommendations based on your cravings. To use our site you can start by using the search bar in the middle to type in the food you currently want from pizza to pasta to paninis. Then you can make a decision, do you cook it or book it? 

Cook it!
-------------
If you click the cook button you will then be presented with the top 5 recipes for your searched food item. Each of these items is pulled from the edemam API and presents the user with a picture, a link to a recipe, its name and a recommend button. The link sends you to an outside website to view the recipe. If the recommend button is clicked it sends the selected recipe to our database but more on that later. Now if none of those recipes look great or you dont feel up to the task, then you can choose to book it instead!

Book it!
-------------
Clicking the book button presents the user with and new bar for the user to type in their current city. When you click the newly generated lets go button below that you are presented with 5 nearby restaurants based on your food search. These 5 businesses are displayed using the Yelp Fusion API. From this API we pull in the business name, phone #, address, picture, its Yelp rating and a link its Yelp page. This information is all presented to the user with the name being a clickable link to the Yelp page where. From this display you are given the information to contact restaraunt to order food, make a reservation or just head right over!

Recommended recipes
-------------
This section is present at the bottom of our page and is where the users can help one another with some recommended recipes! When the recommend button is clicked under the "Cook it!" option it sends the recipe data to our Firebase database. This section pulls that data from Firebase and presents the 10 latest recommendations to our list here. The list is dynamic so if the user recommends something they will immediately see it added to the list display and all future users will see those recommendations.

https://jenniferk2019.github.io/Group-Project-1/
