# Mobile Video Loop

By: [Andrew-Chen-Wang](https://github.com/Andrew-Chen-Wang)

iOS Safari Extension (soon Android) that lets you loop
a video on your current website. This only works
for the first video that appears in the website.

I just didn't want to download the YouTube app which
contains ads. Perfect combination for any situation:
AdBlock + PiPifier (once enabled, you can play in 
background since it's in PiP mode) + Mobile Video Loop.

### What This Does

https://user-images.githubusercontent.com/60190294/142752006-cff93fc5-ad84-4cb4-a7b5-2ba7277fb93a.mov

Additionally,  with PiPifier, you can watch YouTube videos even when
your phone is shut off. You'll just need to press the play button
on shut off. This can save power.

#### What Looper does specifically

I just want to make 2 things:

1. If there is only one video tag, loop it by adding loop attribute to the video tag
2. If there are multiple, then open a popup that loads the thumbnails of all the videos and have user select which video they want looped.

If you press the button again:

1. Simply disable loop
2. Show which videos to disable loop or enable loop

### License

This repository's code is licensed under Apache 2.0
