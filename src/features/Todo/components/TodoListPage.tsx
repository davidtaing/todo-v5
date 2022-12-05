import { TodoList } from "./TodoList";

import { Todo } from "../../../types";
import { TodoItem } from "./TodoItem/TodoItem";
import { AddTodo } from "./AddTodo";
import { useTodoRequests } from "../hooks/useTodoRequests";

export const TodoListPage = () => {
  const {
    todos,
    getTodoQuery,
    onDeleteTodo,
    onToggleClick,
    onCreateTodo,
    dedupeCreateRequest,
  } = useTodoRequests();

  if (getTodoQuery.isLoading) {
    return (
      <div aria-label="todo-list page">
        <div>Loading</div>
      </div>
    );
  }

  return (
    <div aria-label="todo-list page" className="md:max-w-xl md:mx-auto">
      <TodoList
        todos={todos}
        render={(data) =>
          data.map((item: Todo) => (
            <TodoItem
              key={item.id}
              onDeleteClick={() => onDeleteTodo(item.id)}
              onToggleClick={() => onToggleClick(item)}
              todo={item}
            />
          ))
        }
      />
      <AddTodo
        onCreateTodo={onCreateTodo}
        disabled={dedupeCreateRequest.current}
      />
    </div>
  );
};
