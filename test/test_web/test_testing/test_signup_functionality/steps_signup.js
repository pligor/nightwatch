const { signup_menu_button } = require('./../../../../screens/testing_screens/home_screen');
const { verify_title, verify_content } = require('./../../../../screens/testing_screens/verify_account_screen');
const { label_name, name_field, label_email, email_field, label_password, password_field, label_company, company_field, label_address, address_field, signup_action } = require('./../../../../screens/testing_screens/signup_screen');
const { naturally_fill_pmtool_input } = require('./../conftest');

const step_visit_signup = async (browser) => {
    await browser.url(browser.launch_url + '/')
    await element(signup_menu_button).click()
}

const step_fill_signup_form = async (signup_form) => {
    await naturally_fill_pmtool_input(element(label_name), element(name_field), signup_form.name)
    await naturally_fill_pmtool_input(element(label_email), element(email_field), signup_form.email)
    await naturally_fill_pmtool_input(element(label_password), element(password_field),signup_form.password)
    await naturally_fill_pmtool_input(element(label_company), element(company_field), signup_form.company)
    await naturally_fill_pmtool_input(element(label_address), element(address_field), signup_form.address)
}

const step_assert_signup_form = async (signup_form) => {
    await expect(element(name_field)).to.have.value.that.equals(signup_form.name)
    await expect(element(email_field)).to.have.value.that.equals(signup_form.email)
    await expect(element(password_field)).to.have.value.that.equals(signup_form.password)
    await expect(element(company_field)).to.have.value.that.equals(signup_form.company)
    await expect(element(address_field)).to.have.value.that.equals(signup_form.address)
    await expect(element(signup_action)).to.be.visible
}

const step_submit_signup = async () => {
    await element(signup_action).click()
}

const step_assert_verify_screen = async () => {
    await expect(element(verify_title)).to.be.visible
    await expect(element(verify_title)).text.to.equal('Verify your account')
    await expect(element(verify_content)).to.be.visible
}

const step_register_new_user = async (browser, signup_form) => {
    // await browser.url(browser.launch_url + '/signup')
    await step_visit_signup(browser)
    await step_fill_signup_form(signup_form)
    await step_assert_signup_form(signup_form)
    await step_submit_signup()
    await step_assert_verify_screen()
}


module.exports = {
    step_register_new_user,
}
