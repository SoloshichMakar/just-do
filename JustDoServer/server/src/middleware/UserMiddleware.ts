import {User} from "../entities/User";
import {getRepository} from "typeorm";

function emailValidation(email) {
    const regularExpression = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(email);
}

function passwordValidation(password) {
    if ((password !== undefined
        && password !== null
        && password !== ''
        && password.length > 7)) {
        return true;
    }
    return false;
}

async function userIsExist(email) {
    const user = await getRepository(User).find({where: {email: email}});
    return user.length > 0;
}


module.exports = {
    async userCreateValidation(args) {
        const { email } = args;

        const isUserExists = await userIsExist(email);
        if(isUserExists) {
            throw new Error(`user ${email} already exists`);
        }
        if (emailValidation(email) && passwordValidation(args.password)) {
            return true;
        }
        throw new Error('Invalid query');
    },


    userUpdateValidation(args) {
        const { email } = args;
        const { password } = args;

        if ((emailValidation(email))
            && (passwordValidation(password))) {
        } else if ((email === undefined)
            && (passwordValidation(password))) {
        } else if ((emailValidation(email))
            && (password === undefined)) {
        } else {
            throw new Error('Invalid query');
        }
    },



};
