import TodoItem from "../vo/TodoItem";
import TodoList from "../vo/TodoList";

let todoItem1, todoItem2, todoItem3, todoItem4, todoItem5;
let todoList;

beforeEach(() => {
  todoItem1 = new TodoItem(1, 'todo1', new Date());
  todoItem2 = new TodoItem(2, 'todo2', new Date());
  todoItem3 = new TodoItem(3, 'todo3', new Date());
  todoItem4 = new TodoItem(4, 'todo4', new Date());
  todoItem5 = new TodoItem(5, 'todo5', new Date());
  const todoItemList = [ todoItem1, todoItem2, todoItem3, todoItem4, todoItem5 ];
  todoList = new TodoList(todoItemList, new Date());
})

describe("할 일 목록을 가지고 있다.", () => {
  test("5개를 만들면 5개가 있다.", () => {
    expect(todoList.items).toHaveLength(5);
  });
});

describe("할 일 목록에서 삭제를 할 수 있다.", () => {
  test("5개를의 할 일이 있는데, id가 3인걸 삭제할 수 있다.", () => {
    todoList.removeTodoItem(3);
    
    expect(todoList.items).toHaveLength(4);
    expect(todoList.items.some((todoItem) => todoItem.id === 3 )).toBeFalsy();
  });
});

describe("할 일 목록에서 추가를 할 수 있다.", () => {
  test("5개를의 할 일이 있는데, id가 6인걸 추가 할 수 있다.", () => {
    const todoItem6 = new TodoItem(6, 'todo5', new Date(), true);
    todoList.pushTodoItem(todoItem6);
    
    expect(todoList.items).toHaveLength(6);
    expect(todoList.items.some((todoItem) => todoItem.id === 6 )).toBeTruthy();
  });
});

describe("생성한 할일들 중에서 오늘 할 일, 지난 할 일 구분하기", () => {
  test("5개의 할 일이 있는데, 2번 빼고 모두 오늘 만든 일이다.", () => {
    jest.spyOn(todoItem2, 'equalsDayOfCreatedAt').mockImplementation(() => false)
    
    expect(todoList.equalsDayItems).toHaveLength(4);
    expect(todoList.equalsDayItems.some((todoItem) => todoItem.id === 2 )).toBeFalsy();
  });
  
  test("5개의 할 일이 있는데, id 2번만 지난 할 일이다.", () => {
    jest.spyOn(todoItem2, 'equalsDayOfCreatedAt').mockImplementation(() => false)
    
    expect(todoList.notEqualsDayItems).toHaveLength(1);
    expect(todoList.notEqualsDayItems.some((todoItem) => todoItem.id === 2 )).toBeTruthy();
  });
});

describe("오늘 할 일 중 완료/미완료로 구분하기", () => {
  test("5개의 할 일이 있는데, 2번, 3번만 완료다.", () => {
    jest.spyOn(todoItem2, 'completed', 'get').mockReturnValue(true);
    jest.spyOn(todoItem3, 'completed', 'get').mockReturnValue(true);
    expect(todoList.equalsDayAndCompletedItems).toHaveLength(2);
  });
  
  test("5개의 할 일이 있는데, 2번, 4번만 미완료다.", () => {
    jest.spyOn(todoItem1, 'completed', 'get').mockReturnValue(true);
    jest.spyOn(todoItem3, 'completed', 'get').mockReturnValue(true);
    jest.spyOn(todoItem5, 'completed', 'get').mockReturnValue(true);
    expect(todoList.notEqualsDayAndCompletedItems).toHaveLength(2);
  });
});