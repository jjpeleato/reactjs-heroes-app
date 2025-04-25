/* globals describe, expect, jest, test */

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { AuthContext } from "../../src/auth/context";
import { PrivateRoute } from "../../src/router/PrivateRoute";

describe("PrivateRoute Component", () => {
  test("this test verifies that the PrivateRoute component correctly renders its child content when the user is logged in", () => {
    Storage.prototype.setItem = jest.fn();

    const contextValue = {
      logged: true,
      user: {
        id: "1",
        name: "Son Gokū",
      },
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/marvel"]}>
          <PrivateRoute>
            <h1>Private route</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Private route")).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
