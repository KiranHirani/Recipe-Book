import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') form: NgForm;
  subscription: Subscription;
  editMode = false;
  edittedItemIndex: number;
  edittedItem: Ingredient;

  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing.subscribe((index) => {
      this.editMode = true;
      this.edittedItemIndex = index;
      this.edittedItem = this.slService.getIngredient(index);
      this.form.setValue({
        name: this.edittedItem.name,
        amount: this.edittedItem.amount,
      });
    });
  }

  addIngredients() {
    const newIngredient = new Ingredient(
      this.form['value'].name,
      this.form['value'].amount
    );
    this.editMode
      ? this.slService.updateIngredient(this.edittedItemIndex, newIngredient)
      : this.slService.addIngredient(newIngredient);
    this.resetForm();
  }

  ngOnDestroy() {
    //So that we don't create a memory leak
    this.subscription.unsubscribe();
  }

  resetForm() {
    this.form.reset();
    this.editMode = false;
  }

  deleteItem() {
    this.slService.deleteIngredient(this.edittedItemIndex);
    this.resetForm();
  }
}
