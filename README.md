# Umberto Mirko Garozzo infinite scroll implementation

## Available Scripts

In the project directory, you can run:

### `yarn`

Will bootstrapp the app and download dependencies.

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

## My solution  

I implemented a React app that leverages the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). The scope of this API is to asynchronously observes changes in the intersection of a top level element.
It then registers a callback that is executed when a monitored element "touches" another targeted element or the viewport.

I fetch the API through an asynchronous operation that gets fired on `setEffect` hook. This methods gets triggered by default on component mounting and every time the user scrolls to the bottom of the viewport. By default it queries the first page of the API but it progressively fetches following pages in order (e.g. on first scroll to the bottom fetches second page, on third scroll  third page etc.)

To handle the instability of the server I  am catching an eventual 503 error since JS do not have an option to `continue` on `try...catch` errors and resursively iterate over the same fetching method. When the server returns an error. 
If the server is not working correctly a spinner is shown to the user in the center of viewport and the current list of houses container will be shown with an opaque background.
If a different error is catched I am simply console logging it.

The default number of elements fetched for page is 10 but this can be changed from the input box at the top of the page. I decided to add this as it can be useful to test the application and see how performance improves/decreseas with different number of houses fetched per page.

For the style I am using CSS grids as default two columns that goes down to one on mobile sizes using CSS media queries. The image of the house itself uses the `background-cover` property to render correctly regardless of width/height.


## Testing

I am using Jest and Enzyme for unit testing. I have tested the main functionalities in the `Card` component and some of the functionalities in `Layout`. In `Layout` I am not mocking the fetch request due to time constraints but I am checking the state change triggered by side effects.

## TODO list
- Improve spinner architecture (e.g. maybe it should be shown for X amount of time and then a different error message shown if the server is still unstable. This will avoid disrupting user experience).
- Split `Layout` component in subcomponents.
- Add more in depth tests for `Layout`.
- Improve catch of server errors that are not 503.
- Improve style.

