import React from "react";
import { render } from "@testing-library/react";
import { AddTodo } from "./AddTodo";

import userEvent from "@testing-library/user-event";

jest.mock("./useAddTodo", () => ({
  useAddTodo: () => ({
    active: false,
    task: "dupa zbita",
    handleSubmit: () => {},
    handleActiveChange: () => {},
    handleContentChange: () => {},
  }),
}));

test("Add todo form interaction", () => {
  // arrange
  const { getByRole } = render(<AddTodo />);
  // act

  // assert
  const input = getByRole("textbox");

  userEvent.type(input, "123");

  expect(input).toHaveValue("dupa zbita");

  // expect(jest.mock.handleContentChange).toHaveBeenCalled();
  expect(1 + 1).toBe(2);
});

test("dupa", async () => {
  await Promise.reject("dupa");
});

test("dupa1", () => {
  return Promise.reject("dupa");
});

test("dupa2", () => {
  return Promise.resolve("dupa");
});

test("dupa3", () => {
  Promise.resolve("dupa");
});
