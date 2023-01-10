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
    step_assert_login_is_reset
} = require('./steps_login')

module.exports = {
    tags: ['login'],

    'Verify that logging in with valid credentials will allow the user access to the resources of the app otherwise they will be denied to him/her':
        async function (browser) {
            browser.url(browser.launch_url + '/login')

            console.log('Verify that using valid credentials in the Login screen will yield the dashboard screen of the app')

            const user = (await users)['valid']

            await step_login_user(user)

            await step_assert_we_are_logged_in()

            await step_assert_dashboard_screen_is_rendered(browser)

            console.log(`Verify that if a user is already logged in and attempts to navigate to the dashboard screen, then the user will be allowed to have access to the dashboard screen, namely that the login state is preserved`)

            await step_access_dashboard_for_logged_in_user(browser)

            await step_assert_dashboard_screen_is_rendered(browser)

            console.log('Verify that logging out of the Dashboard and attempting to access the Dashboard screen will redirect the user back to the login screen')

            await step_logout()

            await step_access_dashboard_for_logged_out_user(browser)

            await step_assert_login_is_reset(browser)
        },


    afterEach: async function (browser, done) {
        // Code to be executed after each test goes here
        browser.end()
        done();
    }
}
