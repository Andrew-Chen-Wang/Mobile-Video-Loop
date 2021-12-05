(function() {
    function generateUUID() { // Public Domain/MIT
        var d = new Date().getTime();//Timestamp
        var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16;//random number between 0 and 16
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
    const divUUID = generateUUID();
    // ------------------------------
    
    const extensionStyle = `
    #overlay {
      position: fixed;
      height: 100%;
      width: 100%;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(0,0,0,0.8);
    }

    #popup {
      max-width: 600px;
      width: 80%;
      max-height: 300px;
      height: 80%;
      padding: 20px;
      position: relative;
      background: #fff;
      margin: 20px auto;
    }

    #close {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
      color: #000;
    }

    input[type=range] {
      box-sizing: border-box;
      -webkit-appearance: none;
         -moz-appearance: none;
              appearance: none;
      width: 70vw;
      margin: 0;
      padding: 0 2px;
      /* Add some L/R padding to ensure box shadow of handle is shown */
      overflow: hidden;
      border: 0;
      border-radius: 1px;
      outline: none;
      background-size: 100% 2px;
      pointer-events: none;
    }
    input[type=range]:active,
    input[type=range]:focus {
      outline: none;
    }
    input[type=range]::-webkit-slider-thumb {
      height: 28px;
      width: 28px;
      border-radius: 28px;
      background-color: #fff;
      position: relative;
      margin: 5px 0;
      /* Add some margin to ensure box shadow is shown */
      cursor: pointer;
      -webkit-appearance: none;
              appearance: none;
      pointer-events: all;
      box-shadow: 0 1px 4px 0.5px rgba(0, 0, 0, 0.25);
    }
    input[type=range]::-webkit-slider-thumb::before {
      content: ' ';
      display: block;
      position: absolute;
      top: 13px;
      left: 100%;
      width: 2000px;
      height: 2px;
    }
    .multi-range {
      position: relative;
      height: 50px;
    }
    .multi-range input[type=range] {
      position: absolute;
    }
    .multi-range input[type=range]:nth-child(2) {
      background: none;
    }
    .buttons {
        position: relative;
        text-align: center;
    }
    .buttons span {
        color: rgb(0,122,255);
        padding: 10px;
        position: relative;
        display: inline-block;
        cursor: pointer;
    }
    `;
    
    const extensionCode = `
    function formatSecondsToPlayback(duration) {
        // Hours:minutes:seconds.milliseconds
        let hrs = ~~(duration / 3600),
            mins = ~~((duration % 3600) / 60),
            secs = ~~duration % 60,
            milliseconds = "0",
            ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        try {
            milliseconds = duration.toString().split(".").pop();
        } catch {}
        return ret + "." + milliseconds;
    }
    
    // Grab the video
    const videos = document.getElementsByTagName("video");
    let video;
    if (videos.length === 1) {
        video = videos[0];
    } else if (videos.length === 0) {
        // Check if it's a YT video in iframe - thanks PiPifier
        try {
            video = document.getElementsByClassName("youtube-player")[0].getElementsByTagName("video")[0];
        } catch {
            if (window.confirm("Unable to find video. If you think is is a bug, press OK to be redirected to a Google Form")) {
                window.open("https://forms.gle/UtBXJDK1pi5bZ7Yt5", "_blank");
            }
        }
    } else {
        // TODO - Multiple videos - figure out how to get thumbnail for videos and then display it for user selection.
        // TODO An interesting feature would be to have multiple loops happening at once. This requires reworking our min/max saved dataset values
        video = videos[0];
    }
    
    // Contains the ShadowDOM overlay
    let extensionDiv = document.getElementById(${divUUID});
    if (!extensionDiv) {
        extensionDiv = document.createElement("div");
        extensionDiv.id = divUUID;
        extensionDiv.style.display = "none";
    }
    // Method of storing user's current preferences for loop
    // video.currentTime is in seconds
    if (!extensionDiv.dataset.min)
        extensionDiv.dataset.min = "0";
    if (!extensionDiv.dataset.max)
        extensionDiv.dataset.max = video.duration;
    
    let shadow = extensionDiv.attachShadow({mode: "open"});
    function shadowDomOverlay() {
        const style = document.createElement("style"),
            sliderStyle = document.createElement("style"),
            overlay = document.createElement("div"),
            popup = document.createElement("div"),
            closeButton = document.createElement("div"),
            multiRange = document.createElement("span"),
            input1 = document.createElement("input"),
            input2 = document.createElement("input"),
            startText = document.createElement("div"),
            endText = document.createElement("div"),
            buttonsContainer = document.createElement("div"),
            cancelButton = document.createElement("span"),
            okButton = document.createElement("span");
        style.textContent = ${extensionStyle};
        style.type = sliderStyle.type = "text/css";
        overlay.id = "overlay";
        popup.id = "popup";
        multiRange.className = "multi-range";
        input1.type = input2.type = "range";
        input1.min = input2.min = extensionDiv.dataset.min;
        input1.value = "0";
        input1.max = input2.max = input2.value = extensionDiv.dataset.max;
        
        // Slider handling
        input1.addEventListener("input", function() {
            let lowerVal = parseFloat(input1.value),
                upperVal = parseFloat(input2.value);
            if (lowerVal > upperVal - 1) {
                extensionDiv.dataset.max = input2.value = lowerVal + 1;
                if (upperVal == input2.max)
                    extensionDiv.dataset.min = input1.value = parseFloat(input2.max) - 1;
            }
        });
        input2.addEventListener("input", function() {
            let lowerVal = parseFloat(input1.value),
                upperVal = parseFloat(input2.value);
            if (upperVal < lowerVal + 1) {
                extensionDiv.dataset.min = input1.value = upperVal - 1;
                if (lowerVal == input1.min)
                    extensionDiv.dataset.max = input2.value = 1;
            }
        });
        // Slider background color handler
        // Helpful resource! https://stackoverflow.com/questions/49123541/how-to-add-css-to-webkit-slider-runnable-track-using-javascript
        const sliderBackgroundChange = function() {
            const lowerVal = parseFloat(input1.value),
                upperVal = parseFloat(input2.value);
            sliderStyle.textContent = 'input[type="range"]::-webkit-slider-runnable-track { background-image:-webkit-gradient(linear, left top, right top, color-stop(' + lowerVal + ', grey), color-stop(' + lowerVal + ', rgb(0,122,255)), color-stop(' + upperVal + ', rgb(0,122,255)), color-stop(' + upperVal + ', grey));}';
        }
        input1.addEventListener("change", sliderBackgroundChange);
        input2.addEventListener("change", sliderBackgroundChange);
        
        // Number boxes for displaying lowerVal and upperVal
        startText.textContent = "Start: " + input1.value;
        endText.textContent = "End: " + input2.value;
        startText.className = endText.className = "buttons";
        function timestampPrecision(timestamp) {
            const ts = timestamp.toString().split(".");
            let milliseconds = "000000";
            if (ts.length > 1) {
                milliseconds = ts[1].substring(0, 6);
            }
            return ts[0] + "." + milliseconds;
        }
        input1.addEventListener("change", function() {
            startText.textContent = "Start: " + timestampPrecision(input1.value);
        });
        input2.addEventListener("change", function() {
            endText.textContent = "End: " + timestampPrecision(input2.value);
        });
        
        // OK/Cancel/Close Button handling
        function closeOverlay() {
            
        }
        
        buttonsContainer.style.top = "50px";
        buttonsContainer.className = "buttons";
        okButton.textContent = "Save";
        let interval;
        okButton.addEventListener("click", function() {
            interval = setInterval(function() {
                if (parseFloat(extensionDiv.dataset.max) <= video.currentTime) {
                    video.currentTime = parseFloat(extensionDiv.dataset.min);
                }
            }, 50);
            video.currentTime = parseFloat(extensionDiv.dataset.min);
            closeOverlay();
        });
        
        // FIXME There's no way to maintain state, so can't use the cancel button as of yet...
        cancelButton.textContent = "Cancel";
        cancelButton.addEventListener("click", function() {
            if (interval) clearInterval(interval);
            closeOverlay();
        });

        closeButton.textContent = "X";
        closeButton.id = "close";
        closeButton.addEventListener("click", closeOverlay);

        buttonsContainer.append(okButton);
        multiRange.append(input1, input2);
        popup.append(close, multiRange, startText, endText, buttonsContainer);
        overlay.append(popup);
        shadow.append(style, sliderStyle, overlay);
    }
    if (video) shadowDomOverlay();
    `;

    browser.browserAction.onClicked.addListener(
        function() {
            browser.tabs.executeScript({code: extensionCode});
        }
    );
})();
 
 // TODO Using background might not be the right choice in manifest.json...
