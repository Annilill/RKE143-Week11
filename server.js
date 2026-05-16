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

VALUES
INSERT INTO recipe (recipeName, imageURL, instructions)
VALUES
('Pumpkin Pasties', 'https://images.pexels.com/photos/18932267/pexels-photo-18932267/free-photo-of-ornamental-pumpkins-and-a-plate-with-baked-pastry.jpeg', 'Mix pumpkin puree, sugar, and spices.'),
('Pumpkin Tartlets', 'https://images.pexels.com/photos/4917092/pexels-photo-4917092.jpeg', 'Mix pumpkin puree, brown sugar, and spices.'),
('Creamy Pumpkin Soup', 'https://images.pexels.com/photos/5605535/pexels-photo-5605535.jpeg', 'Saute the onion and garlic in a pot until soft.')
('Pumpkin Pancakes', 'https://images.pexels.com/photos/5377574/pexels-photo-5377574.jpeg', 'Mix ingredients and fry pancakes.');

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
app.get('/fix-images', async (req, res) => {
 await db.query(`
    UPDATE recipe
    SET imageURL = 'https://images.pexels.com/photos/18932267/pexels-photo-18932267/free-photo-of-ornamental-pumpkins-and-a-plate-with-baked-pastry.jpeg'
    WHERE id = 1;

    UPDATE recipe
    SET imageURL = 'https://images.pexels.com/photos/4917092/pexels-photo-4917092.jpeg'
    WHERE id = 2;

    UPDATE recipe
    SET imageURL = 'https://images.pexels.com/photos/5605535/pexels-photo-5605535.jpeg'
    WHERE id = 3
    UPDATE recipe
    SET imageURL = 'https://images.pexels.com/photos/5377574/pexels-photo-5377574.jpeg'
     WHERE id = 4;
  `);

  res.send('Images fixed');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on Port 3000.');
});