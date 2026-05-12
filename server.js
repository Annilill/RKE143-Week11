const express = require('express');
const recipeRouter = require('./routes/recipes.routes');
const ingredientRouter = require('./routes/ingredients.routes');
const fullRecipesRouter = require('./routes/fullRecipes.routes');
const randomRouter = require('./routes/randomRecipe.routes');
const db = require("./db");

const app = express();

db.query(`
DROP TABLE IF EXISTS ingredientinrecipe;
DROP TABLE IF EXISTS ingredient;
DROP TABLE IF EXISTS recipe;

CREATE TABLE recipe (
    id SERIAL PRIMARY KEY,
    recipeName VARCHAR(255),
    instructions TEXT
);

CREATE TABLE ingredient (
    id SERIAL PRIMARY KEY,
    ingredientName VARCHAR(255)
);

CREATE TABLE ingredientinrecipe (
    id SERIAL PRIMARY KEY,
    recipeId INTEGER REFERENCES recipe(id),
    ingredientId INTEGER REFERENCES ingredient(id)
);

INSERT INTO recipe (recipeName, instructions)
VALUES
('Pumpkin Pasties', 'Pumpkin recipe'),
('Pumpkin Tartlets', 'Tartlets recipe'),
('Creamy Pumpkin Soup', 'Soup recipe');

INSERT INTO ingredient (ingredientName)
VALUES
('pumpkin puree'),
('sugar'),
('cinnamon');

INSERT INTO ingredientinrecipe (recipeId, ingredientId)
VALUES
(1,1),
(1,2),
(2,1),
(3,3);
`)
.then(() => console.log("Database ready"))
.catch(err => console.log(err));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/ingredients', ingredientRouter);
app.use('/recipes', recipeRouter);
app.use('/fullRecipes', fullRecipesRouter);
app.use('/random', randomRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on Port 3000.');
});