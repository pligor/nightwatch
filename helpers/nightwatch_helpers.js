const os = require('os');
const assert = require('assert');
const msecBETWEEN_KEYBOARD_KEYS = 50
const { sleep } = require('./node_helpers');


const send_keys = async (elem, characters, naturalSpeed = false, delayMsBetweenKeys = msecBETWEEN_KEYBOARD_KEYS) => {
    assert(characters.length > 0, "use non empty strings as input, otherwise use safeClearInputElement directly");

    if (naturalSpeed) {
        await sleep(delayMsBetweenKeys);
        for (let curChar of characters) {
            elem.sendKeys(curChar);
            await sleep(delayMsBetweenKeys);
        }
    } else {
        elem.sendKeys(characters);
    }
}

const safe_clear_input_element = async (elem) => {
    const os_base = os.platform().toLowerCase()

    const sel_all = (os_base === 'darwin' ? Keys.COMMAND : Keys.CONTROL) + 'A'

    await elem.sendKeys(sel_all)
    await elem.sendKeys(Keys.DELETE)

    //redundant supposingly but better be both implicit and explicit
    await elem.clear(elem)

    await expect(elem).to.have.value.that.equals('')
}


module.exports = {
    is_displayed: async function(elem, browser) {
        const curid = await elem.getId()
        return await browser.elementIdDisplayed(curid)
    },
    safe_clear_input_element,
    send_keys,
}

//export async function (elem, browser) {
//  curid = await elem.getId()
//  return await browser.elementIdDisplayed(curid)
//}

