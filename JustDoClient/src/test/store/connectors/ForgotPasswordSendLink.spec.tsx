import {createStore} from "redux";
import MainReducer from "../../../store/reducers/MainReducer";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import ForgotPasswordConnector from "../../../store/connectors/ForgotPasswordConnector";
import {mount, configure} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import {ApolloProvider} from "react-apollo";
import {createMockClient} from "mock-apollo-client";
import { act } from 'react-dom/test-utils';
import { SEND_INSTRUCTIONS } from "../../../graphQL/shemas"

const email = "test@mail.com";

configure({adapter: new Adapter()});

describe('Forgot password click events ', () => {

    let wrapper: any;

    let store = createStore(MainReducer);

    beforeEach(() => {
        const mockClient = createMockClient();

        mockClient.setRequestHandler(
            SEND_INSTRUCTIONS,
            () => Promise.resolve({ data: { sendEmailPasswordRestore: {  message: "Some message"  }} }));

        wrapper = mount(<ApolloProvider client={mockClient}><Provider store={store}><BrowserRouter><ForgotPasswordConnector/></BrowserRouter></Provider></ApolloProvider>);
    });
    afterEach(() => {
        wrapper.unmount();
    });

    it('should set email', () => {
        const container = wrapper.find('#email_input').hostNodes();
        expect(container.length).toEqual(1);
        container.simulate('change', {target: {value: email}});
        expect(store.getState().ForgotPasswordReducer.email).toEqual(email);
    });

    it('should createUser', async () =>
    {

        let container = wrapper.find('#email_input').hostNodes();
        container.simulate('change', {target: {value: email}});

        container = wrapper.find('#color_button').hostNodes();
        await act(async () => {
            await container.simulate('click');
        });
        wrapper.update();
        expect(store.getState().ForgotPasswordReducer.message).toEqual(`Instruction to restore your password is sent to your email: test@mail.com`);
    });



    it('should throw an error when input email does not exist' , async () =>
    {

        const mockClient = createMockClient();

        mockClient.setRequestHandler(
            SEND_INSTRUCTIONS,
            () => Promise.reject(new Error('Error')));

        wrapper = mount(<ApolloProvider client={mockClient}><Provider store={store}><BrowserRouter><ForgotPasswordConnector/></BrowserRouter></Provider></ApolloProvider>);

        let container = wrapper.find('#email_input').hostNodes();
        container.simulate('change', {target: {value: email}});

        container = wrapper.find('#color_button').hostNodes();
        await act(async () => {
            await container.simulate('click');
        });
        wrapper.update();
        expect(store.getState().ForgotPasswordReducer.message).toEqual(`Invalid credentials`);
    });
});