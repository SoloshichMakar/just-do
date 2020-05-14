import {
    emailHelperMessage,
    passwordHelperMessage,
    confirmPasswordHelperMessage,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
} from "../../utils/validateUserDataFunction";
import {email, password} from "../testUtils/testConstant";

describe('Testing validation functions', () => {
    it('should validate email', function () {
        let result = validateEmail(false, '');
        expect(result).toEqual(false);

        result = validateEmail(true, email);
        expect(result).toEqual(false);

        result = validateEmail(true, 'asdasdad');
        expect(result).toEqual(true);
    });


    it('should validate password', function () {
        let result = validatePassword(false, '');
        expect(result).toEqual(false);

        result = validatePassword(true, password);
        expect(result).toEqual(false);

        result = validatePassword(true, 'asdasdad');
        expect(result).toEqual(true);
    });


    it('should validate confirm password', function () {
        let result = validateConfirmPassword(false, "", "");
        expect(result).toEqual(false);

        result = validateConfirmPassword(true, password, password);
        expect(result).toEqual(false);

        result = validateConfirmPassword(true, password, password + '123');
        expect(result).toEqual(true);
    });

    it('should get email helper message', function () {
        let result = emailHelperMessage(true, "");
        expect(result).toEqual('Email should not be empty');

        result = emailHelperMessage(true, 'asdasdad');
        expect(result).toEqual('Enter a valid e-mail address');
    });

    it('should get password helper message', function () {
        let result = passwordHelperMessage(true, "");
        expect(result).toEqual('Password should not be empty');

        result = passwordHelperMessage(true, 'asd');
        expect(result).toEqual('The password must be 8 symbols. Now 3');

        result = passwordHelperMessage(true, 'asdasdad3@');
        expect(result).toEqual('The password must contain at least 2 capital letters');

        result = passwordHelperMessage(true, 'asdasdad@EE');
        expect(result).toEqual('The password must contain numbers');

        result = passwordHelperMessage(true, 'asdasdad3EE');
        expect(result).toEqual('The password must contain special char (!@#$&*)');

        result = passwordHelperMessage(true, 'asdasdad @3EE');
        expect(result).toEqual('The password should not contain whitespaces');
    });

    it('should get confirm password helper message', function () {
        let result = confirmPasswordHelperMessage(true, password, password + '123');
        expect(result).toEqual('Password do not match');
    });
});