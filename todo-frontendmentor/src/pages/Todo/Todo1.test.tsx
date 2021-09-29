import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Todo } from "./Todo";
import { AppProviders } from "contexts";

import { rest } from "msw";
import { setupServer } from "msw/node";

const handlers = [
  rest.get(
    "https://todo-frontendmentor/api/v1/todos",
    async (req, res, ctx) => {
      return res(
        ctx.delay(200),
        ctx.json([{ _id: "asdfasdf", task: "Task 1", active: false, order: 0 }])
      );
    }
  ),
  rest.post('',async (req,res,ctx)=>{
    
  })
];

const server = setupServer(...handlers);

describe("TODO1", () => {
  beforeAll(() => {
    server.listen({
      onUnhandledRequest: "error",
    });
  });

  afterEach(() => {
    return server.resetHandlers();
  });

  afterAll(() => {
    return server.close();
  });

  test("Add todo form interaction", async () => {
    render(
      <AppProviders>
        <Todo />
      </AppProviders>
    );

    let input = screen.getByRole("textbox");

    expect(input).toBeInTheDocument();
    userEvent.type(input, "this is todo");
    expect(input).toHaveValue("this is todo");

    userEvent.type(input, "{enter}");

    const testttt = await screen.findByText("Task 1");
    expect(testttt).toBeInTheDocument();
  });
});
