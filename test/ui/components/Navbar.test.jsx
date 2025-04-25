/* globals beforeEach, describe, expect, jest, test */

import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { AuthContext } from "../../../src/auth";
import { Navbar } from "../../../src/ui/components/Navbar";

const mockUseNavigate = jest.fn();

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockUseNavigate,
}));

describe("Navbar component", () => {
  const contextValue = {
    logged: true,
    user: {
      id: "1",
      name: "Son Gokū",
    },
    logout: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  test("the username should be displayed when you log in.", () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Son Gokū")).toBeTruthy();
  });

  test("should call the logout button and navigate to the login page", () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const logoutBtn = screen.getByRole("button");
    fireEvent.click(logoutBtn);
    expect(contextValue.logout).toHaveBeenCalled();
    expect(mockUseNavigate).toHaveBeenCalledWith("/login", { replace: true });
  });
});
