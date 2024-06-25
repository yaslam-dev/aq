import { RenderResult, cleanup, render } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import Header from "./Header";

describe("Header component", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the header element", () => {
    const { getByTestId }: RenderResult = render(<Header />);
    const headerElement = getByTestId("header");
    expect(headerElement).toBeDefined();
  });

  it("renders the heading with the correct text", () => {
    const { getByTestId }: RenderResult = render(<Header />);

    const headingElement = getByTestId("heading");
    expect(headingElement).toBeDefined();
    expect(headingElement.textContent).toBe("Historic global carbon footprint");
  });
});
