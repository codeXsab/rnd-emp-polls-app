import { fireEvent, render } from "@testing-library/react";
import { legacy_createStore as createStore } from "redux";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import Login from "./Login";
import { Provider } from "react-redux";
import rootReducer from "../reducers/index";
import middleware from "../middleware/index";
import { handleInitialData } from "../actions/shared";
import "@testing-library/jest-dom";
const store = createStore(rootReducer, middleware);


describe("Login", () => {
  it("should render the component", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });

  it("should login with proper user after clicking submit button", async () => {
    await store.dispatch(handleInitialData());

    const wrapper = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    const loginFormElement = wrapper.getByTestId("login-form");
    const usernameSelectElement = wrapper.getByTestId("login-select");
    const submitButtonElement = wrapper.getByTestId("submit");
    expect(loginFormElement).toBeInTheDocument();
    expect(usernameSelectElement).toBeInTheDocument();

    expect(submitButtonElement).toBeInTheDocument();

    fireEvent.change(usernameSelectElement, { target: { value: "sarahedo" } });
    expect(usernameSelectElement.value).toBe("sarahedo");
    fireEvent.click(submitButtonElement);
    expect(loginFormElement).toBeInTheDocument();
    expect(usernameSelectElement.value).toBe("sarahedo");
  });
});
