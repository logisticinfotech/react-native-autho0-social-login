var { EventEmitter } = require("fbemitter");

export const commonConstant = {
    alertTitle: "Auth0",
    emitter: new EventEmitter(),
    invalidEmail: "Please enter valid email address.",
    invalidPassword: "The Password length must be must be between 6 to 15.",
}