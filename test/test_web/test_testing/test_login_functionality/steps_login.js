const { login_button, login_label_email, email_field, login_label_password, password_field, login_email_error, login_password_error } = require('./../../../../screens/testing_screens/login_screen');
// const { sleep } = require('../../../../helpers/node_helpers');
const { naturally_fill_pmtool_input } = require('../conftest');
const { logout_menu_link, dashboard_menu_link, task_db_menu_link, settings_menu_link } = require('./../../../../screens/testing_screens/logged_in_main_menu');
const { create_project_button } = require('./../../../../screens/testing_screens/dashboard_screen');
const { login_menu_button, signup_menu_button } = require('./../../../../screens/testing_screens/home_screen');

const step_assert_dashboard_screen_is_rendered = async (browser) => {
    await browser.expect.url().to.contain('/dashboard');

    await expect(element(create_project_button)).to.be.visible;
    await expect(element(create_project_button)).text.to.contain('CREATE');
}

const step_assert_we_are_logged_in = async () => {
    await expect(element(logout_menu_link)).text.to.equal('Logout');
    await expect(element(dashboard_menu_link)).text.to.equal('Dashboard');
    await expect(element(task_db_menu_link)).text.to.equal('TaskDB');
    await expect(element(settings_menu_link)).text.to.equal('Settings');
}

const step_login_user = async (user) => {
    await naturally_fill_pmtool_input(element(login_label_email), element(email_field), user.email)

    await naturally_fill_pmtool_input(element(login_label_password), element(password_field), user.password)

    await expect(element(login_button)).to.be.visible;

    await element(login_button).click()
}

const step_access_dashboard_for_logged_in_user = async (browser) => {
    await step_assert_we_are_logged_in()
    await browser.url(browser.launch_url + '/dashboard')
}

const step_logout = async () => {
    await step_assert_we_are_logged_in()
    await element(logout_menu_link).click()
}

const step_assert_we_are_logged_out = async () => {
    await expect(element(login_menu_button)).to.be.visible
    await expect(element(signup_menu_button)).to.be.visible
}

const step_access_dashboard_for_logged_out_user = async (browser) => {
    await step_assert_we_are_logged_out()
    await browser.url(browser.launch_url + '/dashboard')
}

const step_assert_login_is_reset = async (browser) => {
    await browser.expect.url().to.contain('/login')

    await expect(element(email_field)).to.have.value.that.equals('')
    await expect(element(password_field)).to.have.value.that.equals('')

    await expect(element(login_button)).to.be.visible
}

const step_visit_login = async (browser) => {
    await element(login_menu_button).click()
    await step_assert_login_is_reset(browser)
}

const step_assert_invalid_login = async(user) => {
    for(let elem of [login_email_error, login_password_error]) {
        await expect(element(elem)).to.be.visible
        await expect(element(elem)).text.to.equal('Invalid login info')
    }

    await expect(element(email_field)).to.have.value.that.equals(user.email)
    await expect(element(password_field)).to.have.value.that.equals(user.password)
    await expect(element(login_button)).to.be.visible
}

module.exports = {
    step_login_user,
    step_assert_we_are_logged_in,
    step_assert_dashboard_screen_is_rendered,
    step_access_dashboard_for_logged_in_user,
    step_logout,
    step_access_dashboard_for_logged_out_user,
    step_assert_login_is_reset,
    step_visit_login,
    step_assert_invalid_login,
}
