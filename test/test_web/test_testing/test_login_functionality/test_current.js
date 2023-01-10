const assert = require('assert');
const {is_displayed} = require('../../../../helpers/nightwatch_helpers');
const {async_filter, sleep} = require('../../../../helpers/node_helpers');

const {users} = require('./../conftest');
const {
    step_login_user,
    step_assert_we_are_logged_in,
    step_assert_dashboard_screen_is_rendered,
    step_access_dashboard_for_logged_in_user,
    step_logout,
    step_access_dashboard_for_logged_out_user,
    step_assert_login_is_reset,
    step_visit_login,
    step_assert_invalid_login,
} = require('./steps_login')

const { SignupForm } = require('../../../../screens/testing_screens/signup_screen');

const { step_register_new_user } = require('./../test_signup_functionality/steps_signup');

module.exports = {
    'Verify that right after signing up with a user, the user will be able to immediately have access to the app given valid credentials at login': async (browser) => {

        const signup_form = SignupForm.random()

        await step_register_new_user(browser, signup_form)

        await step_visit_login(browser)

        console.log('Verify that using invalid credentials in the Login screen will yield an error message and keep user in the login page')

        const invalid_user = (await users)['invalid']

        await step_login_user(invalid_user)

        await step_assert_invalid_login(invalid_user)

        console.log('Verify that after using invalid credentials in the Login screen and the error message is ' +
        'received, when the user changes the input values of either the email or the password, the invalid ' +
        'login info error message should vanish and the Login button should become enabled once again')

        await step_access_dashboard_for_logged_out_user(browser)

        await step_assert_login_is_reset(browser)

        console.log('Verify that using valid credentials in the Login screen will yield the dashboard screen of the app')

        console.log(`USER:`, signup_form)

        await step_login_user(signup_form)

        //TODO here we are getting an error which is an error of the app, the signup has completed successfully but we cannot login
        await step_assert_we_are_logged_in()

        await step_assert_dashboard_screen_is_rendered(browser)
    },

    afterEach: async function (browser, done) {
        // Code to be executed after each test goes here
        browser.pause(3000);
        browser.end()
        done();
    }
}