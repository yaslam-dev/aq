import { RenderResult, cleanup, render } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import Footer from "./Footer";

describe("Footer component", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the footer with the correct text", () => {
    const { getByText }: RenderResult = render(<Footer />);
    const footerElement = getByText(
      /data source: https:\/\/data\.footprintnetwork\.org/i
    );
    expect(footerElement).toBeDefined();
  });
});
