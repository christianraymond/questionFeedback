# Employee'sFeeback.
This app allows users to respond to a question sent by it's team.
User get URL sent to them, simply click on the link, then be redirected to a login page where they need to register first before submiting the response back to the sender.

The sender will be able to login as Admim, then be redirected to a page where they can easily see the users responses. 
## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing
purposes. See deployment for notes on how to deploy the project on a live system.

Clone this [Repositoy](https://github.com/christianraymond/waiter_webapp), copy and past:
`git clone https://github.com/christianraymond/waiter_webapp` inside your project folder.

# Prerequisites
Things you need to install and how to install them.
 - NodeJS,
 - ExpressJs,
 - Express-midlewares
 - Npm dependencies
 - MongoDB,
 - Mongoose
 - Heroku,

# Installation
A step by step series of examples that tell you have to get a development env running.
- Step1

Depending on your OS running in your machine,
First in your command prompt, run
`node -v` you should see something like:
`v8.3.0`, depending on your version, if you see nothing [here](https://nodejs.org/en/download/package-manager/) to install nodejs:

Next install(npm dependencies)

- [Express.Js](https://www.npmjs.com/package/express): ```$ npm install --save express```
- [body-parser](https://www.npmjs.com/package/body-parser):```$ npm install body-parser```
- [express-flash](https://www.npmjs.com/package/express-flash): ```npm install git://github.com/RGBboy/express-flash.git```
- [express-handlebars](https://www.npmjs.com/package/express-handlebars):```$ npm install express-handlebars```
- [express-session](https://www.npmjs.com/package/express-session): ```$ npm install express-session```
- [express-flash](https://www.npmjs.com/package/express-flash): ```npm install git://github.com/RGBboy/express-flash.git```
- [session](https://www.npmjs.com/package/express-session): ```$ npm install express-session```
  You also need to store the data in a database using:
- [MongoDB](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-mongodb-on-ubuntu-16-04)

  And the following link explains to you on how to: 'How To Connect Node.js to a MongoDB Database' click [Here](https://www.digitalocean.com/community/tutorials/how-to-connect-node-js-to-a-mongodb-database-on-a-vps)
- [Mongoose](http://mongoosejs.com/), This will help you to store and retrieve data on MongoDB.
You will deploy your Web Application using heroku, it’s a PaaS (Platform as a Service) - it provides a platform as a place (service) where you can easily deploy your web applications using git. click on heroku to follow the steps.
- [Heroku](https://devcenter.heroku.com/articles/deploying-nodejs).

Here is how my package.json looks after doing all the above.
This should look almost the same to yours.

```{
  "dependencies":
    "body-parser": "^1.17.2",
    "express": "^4.15.4",
    "express-flash": "0.0.2",
    "express-handlebars": "^3.0.0",
    "express-session": "^1.15.5",
    "flash": "^1.1.0",
    "flash-express": "^1.0.4",
    "heroku": "^0.2.0",
    "mongoose": "^4.11.10",
    "nodemon": "^1.12.0",
    "session": "^0.1.0"
}
```

# Running the app locally.
Assume that you already did all the above steps.
Now inside your command prompt(Terminal for Ubuntu user)go inside your root directory and type `cd(current directory)` inside your project directory.
once you are in type `index.js`
The output should like this inside your command prompt:

`App runnig on http://localhost:5000`
   `Database ready to be used...!`

  Now inside the browser type: `http://localhost:5000`
  your app should be ready and running.
  (Grap a cap of... and celebrate your success.)
  don't forget to press Ctr + c to stop the server.

# How to create the app from scratch.

 inside your Terminal type:
 `mkdir + the name of your project`,</br>
 then type `cd` in the project using this command </br> now `cd + the name of the directory your created`,
 Your can also type `pwd` to make sure in the right directory or folder.</br>
 Once you are in type `npm init -y` this will generate or create your express app.
  output should look something like this:

```
{
  "name": "readme",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

From there you can start creating the file ender your folder name and start your ExpressJs app.
[Click](https://expressjs.com/en/starter/hello-world.html) this link to get some hint on how to star your express app if you are getting stuck.

# Deploying to Github
 Assume you created a Github account.
Inside your project folder type:
  `git init `</br>
  `git add .` </br>
  `git commit -m 'write your comment here` </br>
  `git push -u origin master`
- NB
For the first time push to the branch master your need to copy and the paste the
`git add remote + the url containing your repo name`

# Deploying to Heroku
Assume that you have:
Node.js and npm installed.
an existing Node.js app.
a free Heroku account.
the Heroku CLI.

Type these commands.
```$ heroku create
Creating pure-citadel-24793 ... done, stack is cedar
http://arcane-lowlands-8408.herokuapp.com/ | git@heroku.com:arcane-lowlands-8408.git
Git remote heroku added
$ git push heroku master
...
-----> Node.js app detected
...
-----> Launching... done
       https://pure-citadel-24793.herokuapp.com/ deployed to Heroku```

And then the following.
`$ git add ,
$ git commit -m "Added a Procfile.",
$ heroku login
Enter your Heroku credentials.`   

Then start your app locally using heroku local command which is installed as a part of the Heroku CLI.
$ heroku local web Your app should now be running on http://localhost:5000/.

# Built with
- [MLAB](https://mlab.com/)(MongoDB Cloud Server),
- [Bootstrap](https://v4-alpha.getbootstrap.com/)(The web framework used),
- [NPM](https://www.npmjs.com/)(Node Package Manager/dependencies).

Visit this site online.
- [Launch](https://pure-citadel-24793.herokuapp.com/)

# Author
- Christian Ngubana -initiative work -[Christian Raymond](https://github.com/christianraymond?tab=repositories)

# version
`version": "1.0.0`.

# License
This project is licensed ender ISC -see [ISC](https://www.isc2.org/) for more information.

# Acknowledgments
  - Andre Vermeulen.
