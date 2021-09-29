// import axios from "axios";
import React from "react";
// import { rest } from "msw";
// import { setupServer } from "msw/node";
import { render, screen } from "@testing-library/react";
import { Todo } from "./Todo";

import { AppProviders } from "contexts";

import userEvent from "@testing-library/user-event";

jest.mock("axios", () => ({
  create: () => {
    return {
      get: () =>
        Promise.resolve({
          data: [{ _id: "asdfasdf", task: "Task 1", active: false, order: 0 }],
        }),
    };
  },
}));

test("Add todo form interaction", async () => {
  // const users = [{ _id: "asdfasdf", task: "Task 1", active: false, order: 0 }];
  // const resp = { data: users };
  // (axios as jest.Mocked<typeof axios>).get.mockResolvedValue(resp);

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

// test("Renders list of todos", async () => {
//   render(
//     <AppProviders>
//       <Todo />
//     </AppProviders>
//   );

//   await waitFor(() => {
//     screen.debug();
//   });
// });
