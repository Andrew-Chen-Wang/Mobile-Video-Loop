try {
    // Tests whether we need to set videoCache ourselves
    browser.runTime;
} catch (e) {
    /**
     * @typedef {Object} VideoCacheProperties
     * @property {HTMLVideoElement} video video index user selects from document.getElementsByTagName("videos")
     * @property {number} intervalMin lower bound of video for looping
     * @property {number} intervalMax upper bound of video for looping
     * @property {number} interval The actual, created interval to be cleared on "Cancel"
     */
    /**
     * @type {Object.<string,VideoCacheProperties>}
     */
    const videoCache = {};
}

// Contains the ShadowDOM overlay
const extensionDiv = document.createElement("div");
document.body.append(extensionDiv);

let shadow = extensionDiv.attachShadow({mode: "open"});
shadowDomOverlay(videoCache, extensionDiv, shadow)
