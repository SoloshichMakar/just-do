import {gql} from "apollo-boost";

export const USER_LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            user {
                id
                email
            }
            token
        }
    }
`;

export const SEND_INSTRUCTIONS = gql`
    mutation SendEmailPasswordRestore($email: String!) {
        sendEmailPasswordRestore(email: $email) {
            message
        }
    }
`;

export const PASSWORD_RESTORE = gql`
    mutation PasswordRestore($id: ID!, $password: String!, $token: String!) {
        passwordRestore(id: $id, password: $password, token: $token) {
            id
            email
        }
    }
`;

export const ADD_USER = gql`
    mutation AddUser($email: String!, $password: String!) {
        addUser(email: $email, password: $password) {
            id
            email
        }
    }
`;


