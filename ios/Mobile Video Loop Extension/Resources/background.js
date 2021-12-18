function generateUUID() { // Public Domain/MIT
    let d = new Date().getTime();
    let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function onExecuted() {}
function onError() {}

const videoCacheID = generateUUID();

browser.browserAction.onClicked.addListener(
    function(tab) {
        browser.runtime.sendNativeMessage("Loop Video", {"message": "hi"}).then(function(data) {
            let code = `shadowDomOverlay('${videoCacheID}');`;
            if (data.simple) {
                code = "simpleVideoLoop();";
            }
            const executing = browser.tabs.executeScript({"code": code});
            executing.then(onExecuted, onError);
        }).catch(err => {console.log("Failed: " + err)});
    }
);
