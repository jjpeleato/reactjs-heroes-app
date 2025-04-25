/* globals describe, expect, test */

import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { PublicRoute } from "../../src/router/PublicRoute";
import { AuthContext } from "../../src/auth/context";

describe("PublicRoute Component", () => {
  test("this test verifies that the PublicRoute component correctly renders its child content when the user is not logged in", () => {
    const contextValue = {
      logged: false,
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <PublicRoute>
          <h1>Public route</h1>
        </PublicRoute>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Public route")).toBeTruthy();
  });

  test("redirects authenticated users away from public routes to the home page", () => {
    const contextValue = {
      logged: true,
      user: {
        id: "1",
        name: "Son Gokū",
      },
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <h1>Public route</h1>
                </PublicRoute>
              }
            />
            <Route path="/" element={<h1>Hello World!</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Hello World!")).toBeTruthy();
  });
});
