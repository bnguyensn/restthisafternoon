---
title: Button with long press
author: Binh Nguyen
date: '2024-09-28'
category: nugget
tags: javascript, react
---

# Button with long press

It has been a while since I wrote some fun snippets. So here is one.

It is also a good chance for me to work on [Stackblitz](https://stackblitz.com). I find them to be very good, reminiscent of the early [Codesandbox](https://codesandbox.io) before they got bloated.

The button's concept is very simple. What you need is:
- A timer and a state, to track when the long press finishes,
- Event handlers for the mouse's `mousedown` and `mouseup` statuses,
- Some CSS to show the long press' progress.

*Hint: ignoring the `mouseclick` handling (and handle click events using `mousedown` and `mouseup` manually) makes things simpler.*

See the code on Stackblitz here: [Button with long press](https://stackblitz.com/edit/button-with-long-press?file=src%2FApp.css).

And a GIF showing the button in action below!

![button with long press gif](/post-images/button-with-long-press/button-with-long-press.gif)

That's that! Until next time.
