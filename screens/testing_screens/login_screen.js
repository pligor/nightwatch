// https://nightwatchjs.org/api/element/

const login_button = by.css("button[name='action']")
const email_field = by.css("input#email")
const login_label_email = by.css("[for='email']")
const password_field = by.css("input#password")
const login_label_password = by.css("[for='password']")

const login_email_error = by.css(".s12 .row:nth-of-type(1) .invalid-feedback")
const login_password_error = by.css(".row:nth-of-type(2) .invalid-feedback")

module.exports = {
    login_button,
    email_field,
    login_label_email,
    password_field,
    login_label_password,
    login_email_error,
    login_password_error,
}
