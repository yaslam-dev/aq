import { render, screen, cleanup, RenderResult } from "@testing-library/react";
import { describe, it, afterEach, expect } from "vitest";
import Layout from "./Layout";

describe("Layout component", () => {
  // Clean up the rendered elements after each test case
  afterEach(() => {
    cleanup();
  });

  it("renders the layout container", () => {
    const { getByTestId }: RenderResult = render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );
    const layoutContainer = getByTestId("layout-container");
    expect(layoutContainer).toBeDefined();
  });

  it("renders the header component", () => {
    const { getByTestId }: RenderResult = render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );
    const headerElement = getByTestId("header");
    expect(headerElement).toBeDefined();
  });

  it("renders the footer component", () => {
    const { getByTestId }: RenderResult = render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );
    const footerElement = getByTestId("contentinfo");
    expect(footerElement).toBeDefined();
  });

  it("renders children inside the main element", () => {
    const { getByTestId }: RenderResult = render(
      <Layout>
        <div data-testid="test-child">Test Content</div>
      </Layout>
    );
    const childElement = getByTestId("test-child");
    expect(childElement).toBeDefined();
  });
});
