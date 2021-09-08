import express from "express";
import { Recipes } from "../models/recipe.js";
const router = express.Router();

router
  .route("/")
  .get(async (request, respone) => {
    // const { like } = request.query;
    // `^${request.query.title}`
    console.log("before", request.query);
    if (request.query.title) {
      request.query.title = new RegExp("^" + request.query.title, "i");
    }

    console.log("after", request.query);

    const recipe = await Recipes.find(request.query);
    respone.send(recipe);
  })
  .post(async (request, respone) => {
    const addRecipe = request.body;
    console.log(addRecipe);
    const recipe = new Recipes(addRecipe);

    try {
      const newRecipe = await recipe.save();
      respone.send(newRecipe);
    } catch (err) {
      respone.status(500);
      respone.send(err);
    }
  });

router.get("/:id", async (request, respone) => {
  const { id } = request.params;
  const recipe = await Recipes.findById(id);
  respone.send(recipe);
});

export default router;
