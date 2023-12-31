---
title: The Killer Garage Door exercise
author: Binh Nguyen
date: '2021-01-19'
category: guide
tags: state management, programming
---

I had the chance to do the [Killer Garage Door](https://www.codewars.com/kata/58b1ae711fcffa34090000ea) exercise in an interview recently.

This seems like a classic state machine problem. You have a garage door that opens and closes in response to button presses and potential obstacles encountered during movement.

Example states the garage door can be in: opening, closing, fully opened, fully closed, etc.

The exercise is pretty fun and educational, so I definitely recommend you attempt it in your own free time. Submitting the exercise shows you some pretty cool answers too (my submission is [here](https://www.codewars.com/kata/reviews/58caaae1405751ce4c000e26/groups/6006d4d1ec21450001b85928) - definitely not as clever as some others - also ignore the no-op `parseEvent` function at the top, I forgot to remove it!).

After reviewing others' answers, I went and create a React app for the exercise. You can view the Codesandbox [here](https://codesandbox.io/s/killer-garage-door-gpx1s?file=/src/door.js). I'll update this sandbox to an actual web app and write up more details in due course.

In the meantime, enjoy this GIF of the web app in action:

![killer garage door React app gif](/post-images/the-killer-door-exercise/killer-garage-door.gif)
