import fetch from "node-fetch";

export const deleteTodo = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
