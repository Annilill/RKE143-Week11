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
('Pumpkin Pasties', 'Mix pumpkin puree, sugar, and spices in a bowl. Roll out the pastry dough and cut it into small circles. Place a spoonful of the pumpkin mixture in the center of each circle. Fold the dough over to create a half-moon shape and crimp the edges with a fork. Brush the pasties with egg wash. Bake at 375°F (190°C) for 20-25 minutes or until golden brown.'),
('Pumpkin Tartlets', 'Mix pumpkin puree, brown sugar, and spices in a bowl. Spoon the mixture into mini tart shells. Bake at 350°F (175°C) for 15-20 minutes or until set. Let cool and garnish with whipped cream.'),
('Creamy Pumpkin Soup', 'Sauté the onion and garlic in a pot until soft. Add the pumpkin puree and vegetable broth, and simmer for 20 minutes. Blend the soup until smooth, then return it to the pot. Stir in the heavy cream and season with salt and pepper. Heat through and serve.');

INSERT INTO ingredient (ingredientName)
VALUES
('pumpkin puree'),
('sugar'),
('cinnamon'),
('nutmeg'),
('cloves'),
('Pastry dough'),
('Egg wash (1 egg beaten with a splash of milk)'),
('brown sugar'),
('ginger'),
('Mini tart shells'),
('Whipped cream for garnish'),
('onion, chopped'),
('garlic, minced'),
('vegetable broth'),
('heavy cream'),
('Salt and pepper to taste');

INSERT INTO ingredientinrecipe (recipeId, ingredientId)
VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(2, 1),
(2, 8),
(2, 9),
(2, 3),
(2, 4),
(2, 10),
(2, 11),
(3, 1),
(3, 12),
(3, 13),
(3, 14),
(3, 15),
(3, 16);