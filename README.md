# Good Screams group project
By Jesus, Kristen, Arianna, and Jaden

## Good Screams Overview
Good Screams is an application that allows users to explore the newest and scariest horror movies out today. Good Screams takes inspiration from Good Reads, a webapp that encourages users to browse an extensive library of books, allowing them to add them to groups called "bookshelves". We implimented those features in our own webapp with a few tweaks and stylistic changes we saw fit.
### Key Features
* Users can signup for the website and has user login with authorization using express sessions.
* Each movie has an individual resource page where authorized users can add to their lists and review the movie
* Each movie list can be personalized and users may edit the movies within the lists
* Can search for movies by title in the navigation bar

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

### Conclusion 
Good Screams was a very challenging project that ended up turning into something we are all very proud of. 

We ran into a roadblock while creating our reviews feature that caused us to be setback a little during development. After surpassing the roadblock of reviews, everything moved smoothly and it was a great learning experience for both the front and backend.
