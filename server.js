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
    imageURL VARCHAR(500),
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
INSERT INTO recipe (recipeName, imageURL, instructions)
VALUES
('Pumpkin Pasties', 'https://example.com/pumpkin-pasties.jpg', 'Pumpkin recipe'),
('Pumpkin Tartlets', 'https://example.com/pumpkin-tartlets.jpg', 'Tartlets recipe'),
('Creamy Pumpkin Soup', 'https://example.com/creamy-pumpkin-soup.jpg', 'Soup recipe'),
('Pumpkin Pancakes', 'https://example.com/pumpkin-pancakes.jpg', 'Mix ingredients and fry pancakes.');

INSERT INTO ingredient (ingredientName)
VALUES
('pumpkin puree'),
('sugar'),
('cinnamon'),
('nutmeg'),
('cloves'),
('Pastry dough'),
('Egg wash'),
('brown sugar'),
('ginger'),
('Mini tart shells'),
('Whipped cream'),
('onion'),
('garlic'),
('vegetable broth'),
('heavy cream'),
('Salt and pepper'),
('all-purpose flour'),
('baking powder'),
('baking soda'),
('salt'),
('ground cinnamon'),
('ground nutmeg'),
('ground ginger'),
('milk'),
('large egg'),
('melted butter'),
('vanilla extract'),
('Cooking spray or butter for greasing');

INSERT INTO ingredientinrecipe (recipeId, ingredientId)
VALUES
(1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),
(2,1),(2,8),(2,9),(2,3),(2,4),(2,10),(2,11),
(3,1),(3,12),(3,13),(3,14),(3,15),(3,16),
(4,17),(4,8),(4,18),(4,19),(4,20),(4,21),(4,22),(4,23),(4,24),(4,1),(4,25),(4,26),(4,27),(4,28);
`)
.then(() => console.log("Database ready"))
.catch(err => console.log(err));

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/ingredients', ingredientRouter);
app.use('/recipes', recipeRouter);
app.use('/retsepti', recipeRouter);
app.use('/fullRecipes', fullRecipesRouter);
app.use('/random', randomRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on Port 3000.');
});