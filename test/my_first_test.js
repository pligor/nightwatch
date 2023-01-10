const assert = require('assert');
const { is_displayed } = require('../helpers/nightwatch_helpers');
const { async_filter } = require('../helpers/node_helpers');


module.exports = {
  'My first test': async function (browser) {
    browser.url('https://xm.com') // open the URL
      .waitForElementVisible('body'); // wait for the body element to be present

    const logo = by.css(".modal-header > img[alt='xm logo']")

    expect.element(element(logo)).to.be.visible;

    return

    browser.assert.textEquals(".gtm-acceptDefaultCookieFirstVisit", "ACCEPT ALL")

    browser.expect.element(".cookie-modal__defaultBlock h4").to.be.visible;

    browser.click(".gtm-acceptDefaultCookieFirstVisit")

    browser.expect.element(".cookie-modal__defaultBlock h4").to.not.be.visible;

//    elems = await browser.findElements('.btn.btn-block.btn-green.btn-solid');

    let demo_account_xpath = '//a[@href="https://www.xm.com/goto/demo/en"]/div[.="Open a Demo Account"]'
//    browser.waitForElementVisible('xpath', demo_account_xpath).click('xpath', demo_account_xpath)

//    browser.expect.useXpath.elements('xpath',
//    '//a[@href="https://www.xm.com/goto/demo/en"]/div[.="Open a Demo Account"]'
//    ).count.to.equal(4)

    console.log('HELLOOOOO')

    let elems = await browser.useXpath().findElements(demo_account_xpath);

//    const result = await browser.elements('xpath', demo_account_xpath);
    console.log('result is:', elems)

    let filtered = await async_filter(elems, async function(elem) {
      let isdisplayed = await is_displayed(elem, browser)
      // console.log('is displayed ?', isdisplayed)
      return isdisplayed;
    })

    assert(filtered.length === 1, "expected 1 element to be displayed")

    let someelem = filtered[0]

    browser.elementIdClick(await someelem.getId())

    // const header = element('h1')
    // console.log('header is:', header.text())

    browser.useCss()

    browser.expect.element('h1').text.to.equal('Demo Account Registration')

    // ==================
    const field_css = 'input#email'
    // const elem = "/html//input[@id='email']"

    const locator = await by.css(field_css);
    const elem = element(locator);
    console.log(locator)
    console.log(elem)

    const characters = 'gp@mail.com'
    // await browser.setValue(field_css, characters) //works ok
    // await browser.setValue(locator, characters) // works the same
    // await browser.setValue(elem, characters) // works the same
    await elem.sendKeys(characters) // this works because of https://nightwatchjs.org/api/element/
    // ==================

    browser.end(); // end the test
  }
};
