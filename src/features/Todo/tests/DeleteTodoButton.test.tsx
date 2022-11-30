import { render, screen } from "@testing-library/react";
import { DeleteTodoButton } from "../DeleteTodoButton";

describe("DeleteTodoButton", () => { 
  test("smoke test if it renders", () => { 
    render(<DeleteTodoButton onDeleteClick={() => { }}/>)
    
    expect(screen.getByText("❌")).toBeTruthy();
  })
})