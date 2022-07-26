import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
import App from "./App";
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "../reducers/index";
import middleware from "../middleware/index";
import { setAuthedUser} from "../actions/authedUser";
import "@testing-library/jest-dom";
const store = createStore(rootReducer, middleware);

describe("App", () => {
    it("should render the component", () => {
        const component = render(
            <Provider store={store}>
                <Router>
                    <App/>
                </Router>
            </Provider>
        );
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });

    it("should show Login page when not logged in", () => {
        const component = render(
            <Provider store={store}>
                <Router>
                    <App/>
                </Router>
            </Provider>
        );
        const heading = component.getByTestId("login-form");
        expect(heading).toBeInTheDocument();
    });

    it("should show Dashboard page when logged in", () => {
        store.dispatch(setAuthedUser({ id: "sarahedo" }));

        const component = render(
            <Provider store={store}>
                <Router>
                    <App/>
                </Router>
            </Provider>
        );

        const heading = component.getByTestId("navbar");
        expect(heading).toBeInTheDocument();
    });
});