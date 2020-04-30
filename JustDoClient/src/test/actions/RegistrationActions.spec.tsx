import {
    actionTextConfirmPasswordChange,
    actionTextEmailChange,
    actionTextPasswordChange,
    actionShowPassword,
    actionShowConfirmPassword, actionClearMessage, actionCreateUserMessage, actionErrorMessage,
} from "../../store/actions/RegistrationActions";

import {TEXT_CHANGE, SHOW_CONTENT, CLEAR_MESSAGE, ERROR, CREATE_USER} from "../../utils/Constant";


describe('test ToDoMain actions', () =>{
    it('should make action email text change',  () => {
        const testString = 'Test string';
        const result = actionTextEmailChange(testString);
        expect(result).toEqual({type:TEXT_CHANGE, email: testString });
    });

    it('should make action password text change',  () => {
        const testString = 'Test string';
        const result = actionTextPasswordChange(testString);
        expect(result).toEqual({type:TEXT_CHANGE, password: testString });
    });

    it('should make action confirm password text change',  () => {
        const testString = 'Test string';
        const result = actionTextConfirmPasswordChange(testString);
        expect(result).toEqual({type:TEXT_CHANGE, confirmPassword: testString });
    });

    it('should make action show password text change',  () => {
        const testString = true;
        const result = actionShowPassword(testString);
        expect(result).toEqual({type:SHOW_CONTENT, showPassword: testString });
    });


    it('should make action show confirm password text change',  () => {
        const testString = true;
        const result = actionShowConfirmPassword(testString);
        expect(result).toEqual({type:SHOW_CONTENT, showConfirmPassword: testString });
    });


    it('should make action clear message',  () => {
        const result = actionClearMessage();
        expect(result).toEqual({type:CLEAR_MESSAGE });
    });

    it('should make action create user',  () => {
        const result = actionCreateUserMessage();
        expect(result).toEqual({type:CREATE_USER });
    });

    it('should make action error',  () => {
        const result = actionErrorMessage();
        expect(result).toEqual({type:ERROR });
    });


});