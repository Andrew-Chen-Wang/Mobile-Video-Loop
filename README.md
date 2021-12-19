<p align="center">
  <img alt="TardaLogo" width="257.5" height="243.5" src="https://user-images.githubusercontent.com/60190294/146651345-a3db86be-cbf5-4400-aeeb-232deeb34352.png" />
</p>
<p align="center"><a href="https://apps.apple.com/us/app/tarda/id1601057188">Download the app here</a></p>
<p align="center">Creating product improvements that big tech won't</p>
<p align="center">Perfect for background music lovers or meme remixers</p>
<p align="center">
  By: <a href="https://github.com/Andrew-Chen-Wang/">Andrew-Chen-Wang</a>
</p>

iOS (and soon MacOS) Safari Extension
that lets you loop a video on your current website.

Coming soon: images in YouTube and Reddit comments

### What This Does

Features:
- [X] Loop video from start to end
- [X] Loop video from user selected timestamps
- [X] Incorporate PiPifier in app for multi-video support
- [ ] Images/GIFs/Other Media in YouTube comments
- [ ] Images/GIFs/Other Media in Reddit comments (even if implemented, I'll rework to also show past comments' images that aren't in MD format)

<details><summary>Click to View Demo</summary>

https://user-images.githubusercontent.com/60190294/146646158-3b700b45-30b5-412d-a55a-fe555390c62c.mov

<details><summary><sub>Old Demo</sub></summary>
  
https://user-images.githubusercontent.com/60190294/142752006-cff93fc5-ad84-4cb4-a7b5-2ba7277fb93a.mov

</details>
</details>
  
Additionally,  with PiPifier, you can watch YouTube videos even when
your phone is shut off. You'll just need to press the play button
on shut off. This can save power.

### Why?

I just didn't want to download the YouTube app which
contains ads. Perfect combination for any situation:
AdBlock + PiPifier (once enabled, you can play in 
background since it's in PiP mode) + Tarda.

Big tech also stifles product innovation, favoring R&D to make more
money rather than product improvements to make their products more fun such
as looping videos from specific time frames. There are also other factors
such as moderation costs of images in comments.

Perfect for background music lovers or meme remixers.

### License and Credit

This repository's code is licensed under Apache 2.0

I could also not have done this without looking at the open-source source
code for PiPifier; it allowed me to finally get a working extension
(with an `alert(0)`) as I've never developed a browser extension before.
It also showed me how to incorporate the PiPifying
action -- which was necessary to vendor for the future multi-video
support. Props to [Arno Appenzeller](https://github.com/arnoappenzeller)!
