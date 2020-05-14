import {createStore} from "redux";
import MainReducer from "../../../store/reducers/MainReducer";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import AuthorizationConnector from "../../../store/connectors/AuthorizationConnector";
import {mount, configure} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import {gql} from "apollo-boost";
import {ApolloProvider} from "react-apollo";
import {createMockClient} from "mock-apollo-client";
import { act } from 'react-dom/test-utils';
import { USER_LOGIN } from "../../../graphQL/shemas"

const email = "test@mail.com";
const password = "123456EE@";



configure({adapter: new Adapter()});

describe('Authorization click events ', () => {

    let wrapper: any;

    let store = createStore(MainReducer);

    beforeEach(() => {
        const mockClient = createMockClient();

        mockClient.setRequestHandler(
            USER_LOGIN,
            () => Promise.resolve({ data: { login: { user:{  id: 1, email: email  }, token: "someTokenAssdasdasdasd"}} }));

        wrapper = mount(<ApolloProvider client={mockClient}><Provider store={store}><BrowserRouter><AuthorizationConnector/></BrowserRouter></Provider></ApolloProvider>);
    });
    afterEach(() => {
        wrapper.unmount();
    });

    it('should set email', () => {
        const container = wrapper.find('#email_input').hostNodes();
        expect(container.length).toEqual(1);
        container.simulate('change', {target: {value: email}});
        expect(store.getState().AuthorizationReducer.email).toEqual(email);
    });

    it('should set password', () => {
        const container = wrapper.find('#password_input').hostNodes();
        expect(container.length).toEqual(1);
        container.simulate('change', {target: {value: password}});
        expect(store.getState().AuthorizationReducer.password).toEqual(password);
    });

    it('should LogIn', async () =>
    {

        let container = wrapper.find('#email_input').hostNodes();
        container.simulate('change', {target: {value: email}});

        container = wrapper.find('#password_input').hostNodes();
        container.simulate('change', {target: {value: password}});

        container = wrapper.find('#color_button').hostNodes();
        await act(async () => {
            await container.simulate('click');
        });
        wrapper.update();
        expect(localStorage.token).toEqual(`someTokenAssdasdasdasd`);
    });



    it('should throw Login Error when user is exist', async () =>
    {
        const mockClient = createMockClient();

        mockClient.setRequestHandler(
            USER_LOGIN,
            () => Promise.reject(new Error('User is exist')));

        wrapper = mount(<ApolloProvider client={mockClient}><Provider store={store}><BrowserRouter><AuthorizationConnector/></BrowserRouter></Provider></ApolloProvider>);

        let container = wrapper.find('#email_input').hostNodes();
        container.simulate('change', {target: {value: email}});

        container = wrapper.find('#password_input').hostNodes();
        container.simulate('change', {target: {value: password}});

        container = wrapper.find('#color_button').hostNodes();
        await act(async () => {
            await container.simulate('click');
        });
        wrapper.update();
        expect(store.getState().AuthorizationReducer.message).toEqual(`Invalid credentials`);
    });
});