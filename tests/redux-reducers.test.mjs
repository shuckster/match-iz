import assert from "node:assert";
import { describe, test } from "node:test";

import { match, otherwise, pluck, when } from "../src/match-iz.mjs";
import { desc } from "./lib/describe.mjs";

const cases = [
  {
    input: [{ todos: [] }, { type: "unknown" }],
    expecting: {
      todos: [],
    },
  },
  {
    input: [
      { todos: [] },
      { type: "add-todo", payload: "Do the dishes" },
    ],
    expecting: {
      todos: [{ text: "Do the dishes", completed: false }],
    },
  },
  {
    input: [
      { todos: [{ text: "Do the dishes", completed: false }] },
      { type: "set-visibility-filter", payload: true },
    ],
    expecting: {
      todos: [{ text: "Do the dishes", completed: false }],
      visFilter: true,
    },
  },
  {
    input: [
      { todos: [{ text: "Do the dishes", completed: false }] },
      { type: "toggle-todo", payload: 0 },
    ],
    expecting: {
      todos: [{ text: "Do the dishes", completed: true }],
    },
  },
];

describe("Redux reducers", () => {
  cases.forEach(({ input, expecting }, index) => {
    test(desc(index, input, expecting), () => {
      const [state, action] = input;
      assert.deepEqual(
        match(action)(
          when({ type: "set-visibility-filter", payload: pluck() })(
            visFilter => ({
              ...state,
              visFilter,
            }),
          ),
          when({ type: "add-todo", payload: pluck() })(text => ({
            ...state,
            todos: [...state.todos, { text, completed: false }],
          })),
          when({ type: "toggle-todo", payload: pluck() })(index => ({
            ...state,
            todos: state.todos.map((todo, i) =>
              match(i)(
                when(index)({ ...todo, completed: !todo.completed }),
                otherwise(todo),
              )
            ),
          })),
          otherwise(state),
        ),
        expecting,
      );
    });
  });
});
