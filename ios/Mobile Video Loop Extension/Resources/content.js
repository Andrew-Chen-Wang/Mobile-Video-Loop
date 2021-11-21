function runMobileLoop() {
    const videos = document.getElementsByTagName("video");
    if (videos.length === 1) {
        videos[0].loop = true;
    } else if (videos.length === 0) {
        // Check if it's a YT video in iframe - thanks PiPifier
        try {
            document.getElementsByClassName("youtube-player")[0].getElementsByTagName("video")[0].loop = true;
        } catch {}
    } else {
        // TODO - Multiple videos using popover somehow
    }
}
runMobileLoop();
