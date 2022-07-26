import { render } from "@testing-library/react";
import { legacy_createStore as createStore } from "redux";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { Provider } from "react-redux";
import rootReducer from "../reducers/index";
import middleware from "../middleware/index";
import { setAuthedUser } from "../actions/authedUser";
import Navigation from "./Navigation";
import "@testing-library/jest-dom";


const store = createStore(rootReducer, middleware);

describe("Navbar", () => {
it("should render the component", () => {
    store.dispatch(setAuthedUser({ id:"sarahedo"}));

    const component = render(
    <Provider store={store}>
        <BrowserRouter>
        <Navigation/>
        </BrowserRouter>
    </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
});

    it("Logout Btn rendered when user is logged in", () => {
    store.dispatch(setAuthedUser({id:"sarahedo"}));

    const component = render(
    <Provider store={store}>
        <BrowserRouter>
        <Navigation/>
        </BrowserRouter>
    </Provider>
    );
    
    const logoutBtn = component.getByTestId("logout-btn");
    expect(logoutBtn).toBeInTheDocument();
    const userSpanElement = component.getByTestId("user-info");
    console.log(userSpanElement);
    expect(userSpanElement.textContent).toBe("");
});
});