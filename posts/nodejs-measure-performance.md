---
title: Measure Node.js performance
author: Binh Nguyen
date: "2020-11-02"
category: nugget
tags: javascript, nodejs, performance
---

Here's how you do it:

```js
const startTime = process.hrtime(); // [seconds, nanoseconds]

// Do some stuff...

const elapsedTime = process.hrtime(startTime); // [seconds, nanoseconds]
```

The Node.js function [process.hrtime()](https://nodejs.org/api/process.html#process_process_hrtime_time), when called with no parameters, returns the current real time in a `[seconds, nanoseconds]` array.

When called with the result of a previous `process.hrtime()` call, the difference between the previous result and the current time is returned in a new `[seconds, nanoseconds]` array.
