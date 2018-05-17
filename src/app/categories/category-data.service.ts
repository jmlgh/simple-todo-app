// The CategoryData Service will manage categories instances

import { Injectable } from '@angular/core';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoryDataService {

  lastId: number = 0;
  categories: Category[] = [];

  constructor() { 
    // this.lastId = 0;
    // this.categories = [];
  }

  // POST /categories
  public addCategory(category: Category): CategoryDataService{
    if(!category.id){
      category.id = ++this.lastId;
    }
    this.categories.push(category);
    return this;
  }

  // DELETE /categories/:id
  public deleteCategoryById(id: number): CategoryDataService{
    this.categories = this.categories
      .filter( (category) => category.id !== id);
    return this;
  }

  // PUT /categories/:id
  public updateCategoryById(id: number, values: Object = {}): Category{
    let category = this.getCategoryById(id);
    if(!category){
      return null;
    }
    Object.assign(category, values);
    return category;
  }

  // GET /categories
  public getAllCategories(): Category[]{
    return this.categories;
  }

  // GET /categories/:id
  public getCategoryById(id: number): Category{
    return this.categories
      .filter( category => category.id === id )
      .pop();
  }
}
