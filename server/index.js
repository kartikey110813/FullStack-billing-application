const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require('path')
const session = require('express-session');
const passport = require('./config/passport');
const sequelize = require("./config/database");
const authRoutes = require("./routes/auth");

app.use(bodyParser.json());

// Define routes
app.use("/api", authRoutes);


// Define Views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Passport Configuration
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'kartikey-billing-app',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Sync the database and start the server
sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
    app.listen(5000, () => {
      console.log("Server started on port 5000");
    });
  })
  .catch((error) => {
    console.error("Unable to sync database:", error);
  });
