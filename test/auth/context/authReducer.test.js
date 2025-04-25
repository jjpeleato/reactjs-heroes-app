/* globals describe, expect, test */

import { authReducer } from "../../../src/auth/context";
import { types } from "../../../src/auth/types/types";

describe("authReducer", () => {
  test("should return the initial state when an unknown action is dispatched", () => {
    const state = authReducer({ logged: false }, { type: "unknown" });
    expect(state).toEqual({ logged: false });
  });

  test("should set user and logged to true on login", () => {
    const user = {
      id: "ABC",
      name: "Son Gokū",
    };
    const action = {
      type: types.login,
      payload: user,
    };
    const state = authReducer({ logged: false }, action);

    expect(state).toEqual({
      logged: true,
      user: user,
    });
  });

  test("should set logged to false and clear user on logout", () => {
    const user = {
      id: "ABC",
      name: "Son Gokū",
    };
    const action = {
      type: types.logout,
      payload: user,
    };
    const state = authReducer({ logged: true, user: user }, action);

    expect(state).toEqual({
      logged: false,
      user: null,
    });
  });
});
