# Good Screams group project
By Jesus, Kristen, Arianna, and Jaden

## Good Screams Overview
Good Screams is an application that allows users to explore the newest and scariest horror movies out today. Good Screams takes inspiration from Good Reads, a webapp that encourages users to browse an extensive library of books, allowing them to add them to groups called "bookshelves". Our webapp allows users to browse through a collection of movies within our database and add them to their personal lists, which can be created through a form implimented dynamically on the webpage. They are also able to leave reviews for movies that they may have seen, and are given the option to edit and delete said reviews. For ease of access we also implimented a search bar feature and a favorite genre / discovery feature. Users are prompted to submit their favorite genres and the webapp dynamically suggests movies that are pertaining to that genre and are also not on any of the users lists. Overall we wanted to create a webapp that would allow horror movie lovers to both expand their horizons and keep track of their movies with an easily accessable user experience.
### Key Features
* Users can signup for the website and has user login with authorization using express sessions.
* Each movie has an individual resource page where authorized users can add to their lists and review the movie
* Each movie list can be personalized and users may edit the movies within the lists
* Can search for movies by title in the navigation bar

### Link to our webpage!
https://good-screams.herokuapp.com/

### Link to our project's wiki!
https://github.com/jadenlambino/good-screams-group-project/wiki

## Technologies Used
* Frontend
>* Pug
>* Javascript
>* CSS
* Backend
>* Sequelize 
>* Javascript
>* Heroku Web Deployment

### Frontend Overview
The frontend was fully created using Javascript, Pug, and vanilla CSS. The user interface took inspiration from Good Reads but we created most of our stylings from our own imagination. Most of the features in our webpage are dynamically updated. Creating, deleting, and editing both reviews AND movie lists both are updated in real time without a page refresh with use of event listeners and DOM manipulation.

### Backend Overview
We utilized sequelize for all of our database needs within the project. We then used Javascript to query the data we created when rendering our webpage and to send changes from the front end to the database so it can be saved. We used The Movie Database API in order to get the information for our movies inside of our database, however we are not fetching from the API in our webapp, we simply created a fetch and seeded the data into our database through a JSON file.

### Technical Ability
Our technical abilities were put to the test throughout the creation of this project. Our reviews feature, all rendering dynamically was a feature that we originally were not going to implement, however we decided to step out of our comfort zone and find a way to create this feature that strayed away from the path that we were taught in class.

Another feature that tested us technically was the search feature. The search feature allows for users to query through our collection of movies and we were able to "complete" a users request by showing movies that fit the criteria that the user is inputting. The user can then click on the name of the movie that was shown in the dropdown menu and be reddirected to the single resource page for the movie. This feature took a while to impliment due to the complex nature of having to send a query to the database dynamically while also creating a tags that they would be able to click within the dropdown.

### Challenges 
We ran into a roadblock while creating our reviews feature that caused us to be setback a little during development. We were able to surpass this challenge by researching and refactoring our code so everything could be rendered dynamically, allowing us to compliment our GET feature for the reviews that created everything dynamicall. We were able to communicate with our backend efficiently through our use of fetch requests inside of event listeners that allowed users to see their CRUD features working in real time.

### Best Code Snippets
These two images demonstrate how we were able to create a working search feature for our website!
![image](https://user-images.githubusercontent.com/54949187/159229880-9069efb6-fe9a-4d45-91aa-7f0866239e28.png)
![image](https://user-images.githubusercontent.com/54949187/159229912-4efe1543-39e7-468e-9a53-3051cadd9c19.png)

These three images show how we were able to create an error model that would pop up dynamically whenever a user did something that would cause an error within the webpage.
![image](https://user-images.githubusercontent.com/54949187/159230191-dc214940-e170-4755-b767-17580d55c710.png)
![image](https://user-images.githubusercontent.com/54949187/159230221-6e23931f-8939-4e3f-91f1-67ecd3a038ae.png)
![image](https://user-images.githubusercontent.com/54949187/159230239-c631f63f-d460-4c69-a9af-70885e995b09.png)


### Conclusion 
Good Screams was a very challenging project that ended up turning into something we are all very proud of and it was a great learning experience for both the front and backend.
