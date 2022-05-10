import { makeObservable, observable } from "mobx";

class TodoList {
  /*
    items: TodoItem[] (할 일 리스트)
    date: Date (오늘 날짜)
  */
  _items = [];
  _date = "";

  constructor(items, date) {
    makeObservable(this, {
      _items: observable,
    });
    this._items = items;
    this._date = date;
  }

  removeTodoItem(todoId) {
    const targetTodoItemIndex = this._items.findIndex(
      (todo) => todo.id === todoId
    )
    if (targetTodoItemIndex === -1) return;
    this._items.splice(targetTodoItemIndex, 1);
  }

  pushTodoItem(todoItem) {
    this._items.push(todoItem)
  }

  _equlalsDayFillter = (todoItem) => todoItem.equalsDayOfCreatedAt(this._date);

  _notEqulalsDayFillter = (todoItem) => !todoItem.equalsDayOfCreatedAt(this._date);

  _equalsDayAndCompletedFilter = (todoItem) => (todoItem.equalsDayOfCreatedAt(this._date) && todoItem.completed);

  _equalsDayAndNotCompletedFilter = (todoItem) => (todoItem.equalsDayOfCreatedAt(this._date) && !todoItem.completed);

  get equalsDayItems() {
    return this._items.filter(this._equlalsDayFillter);
  }

  get notEqualsDayItems() {
    return this._items.filter(this._notEqulalsDayFillter);
  }

  get equalsDayAndCompletedItems() {
    return this._items.filter(this._equalsDayAndCompletedFilter)
  }

  get equalsDayAndNotCompletedItems() {
    return this._items.filter(this._equalsDayAndNotCompletedFilter)
  }
  
  get items() {
    return this._items
  }

  get date() {
    return this._date
  }
}

export default TodoList;
