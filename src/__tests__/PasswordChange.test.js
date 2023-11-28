// PasswordChange.test.js
import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter for testing navigation
import PasswordChange from "../components/PasswordChange";

// Mocking the navigate function before importing the component
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("PasswordChange Component Snapshot", () => {
  it("renders correctly", () => {
    // Render the component within MemoryRouter and create a snapshot
    const tree = renderer
      .create(
        <MemoryRouter>
          <PasswordChange username="testUser" />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
