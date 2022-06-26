---
title: Perform network requests with vanilla React
author: Binh Nguyen
date: '2021-01-17'
category: guide
tags: javascript, react
---

_Disclaimer: using vanilla React is great for understanding React. However, when writing production code, you probably should consider external solutions like Tanner Linsley's [`react-query`](https://react-query.tanstack.com) or Next.js' [`swr`](https://github.com/vercel/swr), which provide caching, better controls, retries, etc. out of the box. Please also check out the React team's official documentation on data fetching [here](https://beta.reactjs.org/learn/synchronizing-with-effects#fetching-data)._

First things first, you can view the completed Codesandbox [here](https://codesandbox.io/s/vanilla-react-network-request-tjugq?file=/src/App.js). It's a React application that fetches random dog images from the [random dog images API](https://dog.ceo/dog-api). You can change how many images to fetch using an input.

With the above target application in mind, let's dive into this step by step!

#### 1. The API request

Let's create a function that fetches dog image URLs from the API. We can check the [API](https://dog.ceo/dog-api/documentation/random)'s documentation to see which URL to call, as well as what the response will be.

```js
/**
 * Fetch random dog images. API documentation: https://dog.ceo/dog-api/documentation/random
 *
 * @param {number} [howMany] - How many images to fetch. Leave empty to fetch just 1. Max = 50.
 *
 * @returns {Promise<string[] | Error>} - A Promise that resolves to an array of dog image URL(s), or an error
 */
const fetchDogImages = async (howMany) => {
  const url = `https://dog.ceo/api/breeds/image/random/${
    howMany && howMany > 0 ? howMany : ''
  }`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      const errMsg = await res.text();
      return new Error(errMsg);
    }

    const { message } = await res.json();

    // Parse and return the image URLs
    return Array.isArray(message) ? message : [message];
  } catch (err) {
    return err;
  }
};
```

Our asynchronous `fetchDogImages` function takes in a number that controls how many images should be fetched from the API. It then makes a network request using `fetch` which is a standard web API.

A `try/catch` block is used to handle network errors (in case the user is offline). In addition, if the `fetch` request fails for whatever reason (e.g. Bad Request), we catch these too via the `!res.ok` check.

If everything goes well, the function returns an array of dog image URLs.

#### 2. The React component - No API

Let's create the React component without any API stuff. We have:

- A number input to allow users to control how many images should be fetched
- A text block to display our fetches' loading status
- A text block to display fetch errors
- A section to display images of cute doggos 🐶!

```js
import * as React from 'react';
import './styles.css';

export default function App() {
  const [howMany, setHowMany] = React.useState(3);

  const [apiResponse, setApiResponse] = React.useState();
  const [apiIsLoading, setApiIsLoading] = React.useState(false);
  const [apiError, setApiError] = React.useState(null);

  // Just a standard event handler for React controlled components
  const handleChange = (e) => {
    setHowMany(e.target.value);
  };

  return (
    <div className="App">
      <h1>Doggos!</h1>

      <label>
        <span>How many images to fetch (max: 50): </span>
        <input
          type="number"
          min={1}
          max={100}
          value={howMany}
          onChange={handleChange}
        />
      </label>

      <p>{apiIsLoading ? '⌛⌛⌛' : '✅'}</p>
      <p>{apiError ? apiError.message : 'No error occurred'}</p>

      {apiResponse && (
        <div className="dog-img-ctn">
          {apiResponse.map((url) => (
            <img className="dog-img" src={url} alt="A cute doggo!" />
          ))}
        </div>
      )}
    </div>
  );
}
```

Here's the CSS file to style our doggo image section:

```css
.App {
  font-family: sans-serif;
  text-align: center;
}

.dog-img-ctn {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap: 0.5rem;

  margin: 0 auto;
  max-width: 40rem;
  padding: 0.5rem;
  background-color: #eee;
  border-radius: 5px;
}

.dog-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
```

#### 3. The React component - With API

Network requests are **side effects**, thus they should be performed in `useEffect` hooks, which trigger after every render. This is now a good time to read about `useEffect` [here](https://reactjs.org/docs/hooks-effect.html) and [here](https://overreacted.io/a-complete-guide-to-useeffect/).

```js
// ...

export default function App() {
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
      // We start out by setting the loading state to true and clear
      // out any previous errors
      setApiIsLoading(true);
      setApiError(null);

      // Call the fetch function defined in part 1, passing information
      // on how many images it should fetch
      const res = await fetchDogImages(howMany);

      // The fetch function has finished now. The Promise returned from
      // it has been settled. We can set the loading state back to false.
      setApiIsLoading(false);

      // If an error occurred, we update the error state and terminate
      // this executor function (hence the 'return').
      if (res instanceof Error) {
        return setApiError(res);
      }

      // If no errors occurred, we update the API response state.
      setApiResponse(res);
    };

    // Execute the function defined above after every render.
    void executor();
  }, [howMany, setApiResponse]);

  // ...
}
```

#### 4. All together now

The completed React file (the completed `styles.css` file is already further above!):

```js
import * as React from 'react';
import './styles.css';

/**
 * Fetch random dog images. API documentation: https://dog.ceo/dog-api/documentation/random
 *
 * @param {number} [howMany] - How many images to fetch. Leave empty to fetch just 1. Max = 50.
 *
 * @returns {Promise<string[] | Error>} - A Promise that resolves to an array of dog image URL(s), or an error
 */
const fetchDogImages = async (howMany) => {
  const url = `https://dog.ceo/api/breeds/image/random/${
    howMany && howMany > 0 ? howMany : ''
  }`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      const errMsg = await res.text();
      return new Error(errMsg);
    }

    const { message } = await res.json();

    // Parse and return the image URLs
    return Array.isArray(message) ? message : [message];
  } catch (err) {
    return err;
  }
};

export default function App() {
  const [howMany, setHowMany] = React.useState(3);

  const [apiResponse, setApiResponse] = React.useState();
  const [apiIsLoading, setApiIsLoading] = React.useState(false);
  const [apiError, setApiError] = React.useState(null);

  // Network requests are side effects. Put them in a useEffect().
  // The function within this useEffect() argument block will be called after
  // every render, provided at least one of the variables within the "dependency
  // array" (the second argument of useEffect()) has changed.
  React.useEffect(() => {
    // Defining an asynchronous "executor" function here allows us to use
    // async/await syntax within the useEffect(). The other alternative is using
    // .then().catch()
    const executor = async () => {
      // We start out by setting the loading state to true and clear
      // out any previous errors
      setApiIsLoading(true);
      setApiError(null);

      // Call the fetch function defined in part 1, passing information
      // on how many images it should fetch
      const res = await fetchDogImages(howMany);

      // The fetch function has finished now. The Promise returned from
      // it has been settled. We can set the loading state back to false.
      setApiIsLoading(false);

      // If an error occurred, we update the error state and terminate
      // this executor function (hence the 'return').
      if (res instanceof Error) {
        return setApiError(res);
      }

      // If no errors occurred, we update the API response state.
      setApiResponse(res);
    };

    // Execute the function defined above after every render.
    void executor();
  }, [howMany, setApiResponse]);

  // Just a standard event handler for React controlled components
  const handleChange = (e) => {
    setHowMany(e.target.value);
  };

  return (
    <div className="App">
      <h1>Doggos!</h1>

      <label>
        <span>How many images to fetch (max: 50): </span>
        <input
          type="number"
          min={1}
          max={100}
          value={howMany}
          onChange={handleChange}
        />
      </label>

      <p>{apiIsLoading ? '⌛⌛⌛' : '✅'}</p>
      <p>{apiError ? apiError.message : 'No error occurred'}</p>

      {apiResponse && (
        <div className="dog-img-ctn">
          {apiResponse.map((url) => (
            <img className="dog-img" src={url} alt="A cute doggo!" />
          ))}
        </div>
      )}
    </div>
  );
}
```

And that's it! Now after every render (including the first one where the user loads the page), if React detects that the count of how many images should be fetched has changed, our application will automatically re-fetches a new list of dog images from GitHub's API.

The completed application: [Codesandbox link](https://codesandbox.io/s/vanilla-react-network-request-tjugq?file=/src/App.js)
