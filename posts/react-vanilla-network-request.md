---
title: Perform network requests with vanilla React
author: Binh Nguyen
date: "2021-01-17"
category: guide
tags: javascript, react
---

*Disclaimer: using vanilla React is great for understanding React. However, when writing production code, you probably should consider external solutions like Tanner Linsley's [`react-query`](https://react-query.tanstack.com) or Next.js' [`swr`](https://github.com/vercel/swr), which provide caching, better controls, retries, etc. out of the box.*

First things first, you can view the completed Codesandbox [here](https://codesandbox.io/s/vanilla-react-network-request-tjugq?file=/src/App.js). It's a React application that fetches random words from GitHub's [wordbot API](https://noopschallenge.com/challenges/wordbot). You can change how many words to fetch using an input.

With the above target application in mind, let's dive into this step by step!

#### 1. The API request

Our purpose is to grab random words from GitHub's [wordbot API](https://noopschallenge.com/challenges/wordbot), so let's create a function that does just that:

```js
/**
 * Fetch some words from the GitHub API
 *
 * @param {number} howMany - How many words to fetch
 * @returns {Promise<string | Error>} - A Promise that resolves to a string, or an error
 */
const fetchWords = async (howMany) => {
    const url = `https://api.noopschallenge.com/wordbot?count=${howMany < 1 ? 1 : howMany}`;

  try {
    const res = await fetch(url);
  
    if (!res.ok) {
      const errMsg = await res.text();
      return new Error(errMsg);
    }
  
    const json = await res.json();
  
    return json.words.join(", ");
  } catch (err) {
    return err;
  }
};
```

Our asynchronous `fetchWords` function takes in a number that controls how many words should be fetched from the API. It then makes a network request using `fetch` which is a standard web API. 

A `try/catch` block is used to handle network errors (in case the user is offline). In addition, if the `fetch` request fails for whatever reason (e.g. Bad Request), we catch these too via the `!res.ok` check.

If everything goes well, the function returns a comma-separated string of the fetched random words.

#### 2. The React component - No API

Below is a bog-standard React component:

```js
function App() {
  return <div>Hello, world!</div>
}
```

Let's add the number input to allow users to change how many words they want to fetch, and some basic text blocks to display information.


```js
function App() {
  const [howManyWordsToFetch, setHowManyWordsToFetch] = React.useState(1);

  // Store messages received from our API fetcher function
  const [apiResponseText, setApiResponseText] = React.useState("Idle");
  // Store our API fetcher's loading state (is it loading or finished)
  const [apiIsLoading, setApiIsLoading] = React.useState(false);

  // Just a standard event handler for React controlled components
  const handleChange = (e) => {
    setHowManyWordsToFetch(e.target.value);
  };

  return (
    <div className="App">
      <label>
        <span>How many words to fetch: </span>
        <input
          type="number"
          min={1}
          max={100}
          value={howManyWordsToFetch}
          onChange={handleChange}
        />
      </label>

      <p>Message from API: {apiResponseText}</p>
      <p>{apiIsLoading ? "⌛⌛⌛" : "✅"}</p>
    </div>
  );
}
```

#### 3. The React component - With API

Network requests are **side effects**, thus they should be performed in `useEffect` hooks, which trigger after every render. This is now a good time to read about `useEffect` [here](https://reactjs.org/docs/hooks-effect.html) and [here](https://overreacted.io/a-complete-guide-to-useeffect/).

```js
function App() {
  // ...

  // Network requests are side effects. Put them in a useEffect().
  // The function within this useEffect() argument block will be called after
  // every render, provided at least one of the variables within the "dependency
  // array" (the second argument of useEffect()) has changed.
  React.useEffect(() => {
    // Defining an asynchronous "executor" function here allows us to use
    // async/await syntax within the useEffect(). The other alternative is using
    // .then().catch()
    const executor = async () => {
      // We start out setting the loading state to true. This makes React
      // re-renders the application, showing the "loading" status to the user.
      setApiIsLoading(true);
      
      // Call the fetchWords() function defined in part 1, passing information
      // on how many words it should fetch
      const res = await fetchWords(howManyWordsToFetch);

      // The fetchWords() function has finished now. The Promise returned from
      // it has been settled. We can set the loading state back to false.
      setApiIsLoading(false);

      // If an error occurred, we notify the user by setting the result text to
      // a special message.
      // You can also create another React state to hold the actual error and
      // update that error state here e.g.
      // const [error, setError] = useState(null);
      // ...
      /// setError(res);
      if (res instanceof Error) {
        return setApiResponseText(`An error occurred: ${res.message}`);
      }

      // Everything went swimmingly well, let's update the result text to the
      // list of random words returned from the API.
      setApiResponseText(`${res}`);
    };

    // Execute the function defined above after every render. Since 'executor'
    // returns a Promise, we can denote a 'void' in front to say that we don't
    // care about the Promise's result.
    void executor();
  }, [howManyWordsToFetch, setApiResponseText]);
  
  // ...
}
```

And that's it! Now after every render, if React detects that the count of how many words should be fetched has changed, it will automatically re-fetches a new list of words from GitHub's API.

The completed application: [Codesandbox link](https://codesandbox.io/s/vanilla-react-network-request-tjugq?file=/src/App.js)
