---
title: Measuring Node.js performance
author: Binh Nguyen
date: '2020-11-02'
category: nugget
tags: javascript, nodejs, performance
---

# Using Node.js's performance hooks

Main documentation: [Performance Hooks](https://nodejs.org/api/perf_hooks.html)

Here's how you do it:

```js
import { PerformanceObserver, performance } from 'node:perf_hooks';

function longRunningProcess() {
  // Something that takes a long time... 
}

// Create a new PerformanceObserver instance.
const obs = new PerformanceObserver((performanceEntries) => {
  // Measurement results are available in each performanceEntry.
  console.log(performanceEntries.getEntries());
});

// Subscribe to new 'measure' type PerformanceEntry instances.
//
// Possible PerformanceEntry types are: 'node', 'mark', 'measure', 'gc',
// 'function', 'http2', and 'http'.
// https://nodejs.org/docs/latest-v18.x/api/perf_hooks.html#class-performanceentry
obs.observe({ entryTypes: ['measure'] });

// Start the thing we want to measure, with measurement marks.
performance.mark('1');
await longRunningProcess();
performance.mark('2');

// Measure the duration between mark "1" and mark "2".
// Since the PerformanceObserver 'obs' is subscribed to all 'measure' entries,
// it will be notified of this measurement.
performance.measure('My measure', '1', '2');
```

# Using Node.js's process.hrtime()

Here's how you do it:

```js
const startTime = process.hrtime(); // [seconds, nanoseconds]

// Do some stuff...

const elapsedTime = process.hrtime(startTime); // [seconds, nanoseconds]
```

The Node.js function [process.hrtime()](https://nodejs.org/api/process.html#process_process_hrtime_time), when called with no parameters, returns the current real time in a `[seconds, nanoseconds]` array.

When called with the result of a previous `process.hrtime()` call, the difference between the previous result and the current time is returned in a new `[seconds, nanoseconds]` array.
