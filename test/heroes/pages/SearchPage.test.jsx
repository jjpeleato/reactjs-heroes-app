/* globals beforeEach, describe, expect, jest, test */

import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { SearchPage } from "../../../src/heroes";

const mockUseNavigate = jest.fn();

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockUseNavigate,
}));

describe("SearchPage component", () => {
  beforeEach(() => jest.clearAllMocks());

  test("display the search page correctly with the initial values", () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  test("should show Batman and the input with the value of the queryString", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <SearchPage />
      </MemoryRouter>
    );

    const textbox = screen.getByRole("textbox");
    expect(textbox.value).toBe("batman");

    const img = screen.getByRole("img");
    expect(img.src).toContain("/assets/heroes/dc-batman.jpg");
  });

  test("should display an error if the hero (b4tman) is not found", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=b4tman"]}>
        <SearchPage />
      </MemoryRouter>
    );

    const textbox = screen.getByRole("textbox");
    expect(textbox.value).toBe("b4tman");

    const alert = screen.getByLabelText("alert");
    expect(alert.className).toContain("alert-danger");
    expect(alert.innerHTML).toContain("Not hero with <b>b4tman</b>");
  });

  test("should call navigate and move you to the new page.", () => {
    const hero = "superman";
    render(
      <MemoryRouter initialEntries={["/search?q=b4tman"]}>
        <SearchPage />
      </MemoryRouter>
    );

    const textbox = screen.getByRole("textbox");
    fireEvent.change(textbox, {
      target: { name: "searchText", value: hero },
    });

    const form = screen.getByTestId("form");
    fireEvent.submit(form);

    expect(mockUseNavigate).toHaveBeenCalledWith(`?q=${hero}`);
    expect(mockUseNavigate).toHaveBeenCalledTimes(1);
  });
});
