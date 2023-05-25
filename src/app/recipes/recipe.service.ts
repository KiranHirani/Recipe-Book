import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  constructor(private slService: ShoppingListService) {}
  // recipeSelected = new EventEmitter<Recipe>();
  recipeSelected = new Subject<Recipe>();
  recipeAdded = new Subject<Recipe[]>();

  // private recipes: Array<Recipe> = [
  //   new Recipe(
  //     'A Test recipe',
  //     ' Test',
  //     'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/04/french-fries-recipe.jpg',
  //     [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
  //   ),
  //   new Recipe(
  //     'Test Recipe 2',
  //     ' Test 2',
  //     'https://www.ruchiskitchen.com/wp-content/uploads/2020/12/Paneer-butter-masala-recipe-3-500x375.jpg',
  //     [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
  //   ),
  // ];
  private recipes: Recipe[] = [];
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeAdded.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getSingleRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipes(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeAdded.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeAdded.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeAdded.next(this.recipes.slice());
  }
}
