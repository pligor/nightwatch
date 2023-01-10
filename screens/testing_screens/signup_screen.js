const { get_random_name, get_random_email, get_random_numbers_fast } = require('../../helpers/random_helpers')

class SignupForm {
    constructor(name, email, password, company=null, address=null) {
        this.name = name
        this.email = email
        this.password = password
        this.company = company
        this.address = address
    }

    static random() {
        return new SignupForm(`${get_random_name(5)} ${get_random_name(8)}`,
            get_random_email('pligor.george+', 'gmail.com'),
            `${get_random_name(6)}${get_random_numbers_fast(2)}`,
            get_random_name(5),
            get_random_name(5))
    }

    to_dict() {
        return Object.fromEntries(Object.entries(this));
    }

    // def set_invalid_email(self, invalid_email='email.com'):
    // self.email = invalid_email
    // return self
}

const name_field = by.css("input#fullName")
const label_name = by.css("[for='fullName']")

const email_field = by.css("input#email")
const label_email = by.css("[for='email']")

const password_field = by.css("input#password")
const label_password = by.css("[for='password']")

const company_field = by.css("input#company")
const label_company = by.css("[for='company']")

const address_field = by.css("input#address")
const label_address = by.css("[for='address']")

const signup_action = by.css("button[name='action']")
const name_error_message = by.css(".s12 .row:nth-of-type(1) .invalid-feedback")
const email_error_message = by.css(".row:nth-of-type(2) .invalid-feedback")
const password_error_message = by.css(".row:nth-of-type(3) .invalid-feedback")

module.exports = {
    SignupForm,
    name_field,
    label_name,

    email_field,
    label_email,

    password_field,
    label_password,

    company_field,
    label_company,

    address_field,
    label_address,

    signup_action,

    name_error_message,

    email_error_message,

    password_error_message,
}
