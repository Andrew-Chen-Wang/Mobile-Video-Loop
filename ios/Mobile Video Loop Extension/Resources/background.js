/**
 * @typedef {Object} VideoCacheProperties
 * @property {number} intervalMin lower bound of video for looping
 * @property {number} intervalMax upper bound of video for looping
 * @property {number} interval The actual, created interval to be cleared on "Cancel"
 */
/**
 * @type {Object.<string,VideoCacheProperties>}
 */
let videoCache = {};

function onExecuted(result) {
    videoCache = result;
    console.log(result);
    console.log(videoCache);
}

function onError(error) {}

function getCode() {
    const stringified = JSON.stringify(videoCache);
    // Contains the ShadowDOM overlay
    return `
function setupExtensionDiv() {
    const extensionDiv = document.createElement("div");
    document.body.append(extensionDiv);

    let shadow = extensionDiv.attachShadow({mode: "open"});
    return [extensionDiv, shadow];
}
shadowDomOverlay(JSON.parse('${stringified}'), ...setupExtensionDiv())
`;
}

function executeExtensionCode() {
    const executing = browser.tabs.executeScript({"code": getCode()});
    executing.then(onExecuted, onError);
}

let hasInjectedOneTime = false;
browser.browserAction.onClicked.addListener(
    function(tab) {
        if (!hasInjectedOneTime) {
            hasInjectedOneTime = true;
            browser.tabs.executeScript({"file": "one-time.js"}, executeExtensionCode);
        } else {
            executeExtensionCode();
        }
    }
);
