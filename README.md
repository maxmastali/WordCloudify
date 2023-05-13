# WordCloudify

Web application that allows users to display their top artists from Spotify as a word cloud. Users can customize their word cloud via options that let them change the word cloud's color as well as time range their data is collected from.

The application can be viewed at https://wordcloudify.herokuapp.com/.

## Running the App Locally

This app runs on Node.js. You can find instructions on how to install it [here](http://www.nodejs.org/download/).

Once installed, clone the repository and install its dependencies running:

    $ npm install

### Using your own credentials

In order to run the application locally,You will need to register your app and get your own credentials from Spotify's Developer Dashboard.

To do this, go to [your Spotify for Developers Dashboard](https://beta.developer.spotify.com/dashboard) and create your application. In my own development process, I registered this redirect URI:

- http://localhost:3000/callback

In order to run the app, open the `authorization_code` folder, and run its `app.js` file:

    $ cd authorization_code
    $ node app.js

Then, open `http://localhost:3000`.