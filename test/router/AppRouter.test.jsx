/* globals describe, expect, test */

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { AuthContext } from "../../src/auth/context";
import { AppRouter } from "../../src/router";

describe("AppRouter Component", () => {
  test("show login if not logged", () => {
    const contextValue = {
      logged: false,
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/marvel"]}>
          <AppRouter />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getAllByText("Login").length).toBe(2);
  });

  test("show component of Home when user is logged", () => {
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
          <AppRouter />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getAllByText("Son Gokū").length).toBe(1);
  });
});
