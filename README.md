# Trello Clone

A scratchpad of current technologies. A place where new ideas can be unwound without regard for requirements or features.

## Running locally

First, install dependencies with `yarn` or `npm install`. If `yarn` isn't installed in your system, simply replace `yarn {command}` with `npm run {command}` below.

- `yarn build` for an optimized production build.
- `yarn start` to spin up an incremental build development server.
- `yarn cosmos` to start an isolated component development environment a la Storybook.
- `yarn test` to run unit/integration tests.
- `yarn test:browser` to run E2E and image snapshot tests.
- `yarn test:ci` is a shortcut for `yarn test && yarn test:browser`, optimized for a CI environment.

Last but not least: Do not even venture changing a line of code without eslint enabled!

## Built with

- React (https://github.com/facebook/create-react-app)
- Material UI (https://github.com/mui-org/material-ui)
- React Cosmos (https://github.com/react-cosmos/react-cosmos)
- MobX (https://github.com/mobxjs/mobx)
- Apollo (https://github.com/apollographql/apollo-client)

## Why not Typescript?

Having worked with OCaml professionally, I feel Typescript's type system to be restrictive and overly verbose. That is my _personal_, _subjective_ opinion. However, I'm not against using it and as a matter of fact, I think it's an impressive piece of technology with very smart people behind it: [Modern Compiler Construction](https://www.youtube.com/watch?v=wSdV1M7n4gQ). Do not take my word for it though. Try it out for yourself and make an informed decision. I've found [You might not need static types](https://medium.com/javascript-scene/you-might-not-need-typescript-or-static-types-aa7cb670a77b) and [The shocking secret about static types](https://medium.com/javascript-scene/the-shocking-secret-about-static-types-514d39bf30a3) to resonate with me.

## Testing

#### Environments

There are two environments at use when running tests:

1. [jsdom](https://github.com/jsdom/jsdom): Regular unit/integration tests.
2. Headless browser via [puppeteer](https://github.com/GoogleChrome/puppeteer): E2E/image snapshot testing.

The first environment runs much faster since it doesn't need to spin up a browser every time and as such it should be used in tandem when developing. There is a watch mode enabled so tests are run continuously.

The second is slower (currently about 30s in my MacBook Pro late 2013) and as such it's only run on pre-commit and pre-push hooks (thanks to [Husky](https://github.com/typicode/husky)). It's also very unlikely the application's changed visually on every commit.

#### Fixtures

Each component is responsible to export its own mock fixtures. However, tests are not limited or even obligued to use these exported fixtures. They should be thought of as a mocked, encapsulated environment that tests can use to painlessly render a component.

Fixtures are both used in unit tests and in the Cosmos playground. As a matter of fact, this was the deciding factor when picking between Cosmos and Storybook for isolated component development: reusing fixtures for both testing and development.

#### Distribution of tests

Very few React components are unit tested. You might scream in terror at this statement, but before you reach the triple-melting point, read https://blog.kentcdodds.com/write-tests-not-too-many-mostly-integration-5e8c7fff591c and reconsider writing unit tests just to get that coverage up.

Also, be aware that testing React components is very different than testing plain old functions. The most effective way I've found to test them is to separate logic from presentation as much as possible. Then:
- Test logic with unit/integration tests
- Test presentation using actual image screenshots.

When testing logic, I mostly follow a couple of rules:
- If the code being tested is reused, put lots of care into its public-facing API and unit test that. Avoid assuming internal implementation details beyond what the API guarantees.
- If the code being tested is not reused (Ex: user interaction logic for a single component), it makes no sense to unit test it. Instead, render the nearest parent that enables the behavior you're testing and do an integration test as a user would.

In general, one should always be aware of the cost/reward ratio when writing tests. I've worked on projects where writing unit tests became such an imperative that most of the time was spent maintaining tests. These days I always try to write the minimum amount of tests with the most resilience to refactoring, which has led me to write more integration tests than unit tests _**for this particular project**_.

#### Why not use X?

- Jest snapshot testing: I used it for a while, but something felt wrong and I could not articulate it. Thankfully Kent came to the rescue and wonderfully blogged about it in https://blog.kentcdodds.com/effective-snapshot-testing-e0d1a2c28eca.
- Storybook: I actually used it for a bit and changed it for react-cosmos after realizing I wasn't using most of its features since this is not a team project and detailed documentation is not a high concern. A major letdown was the awkward divide between unit tests and stories, which Cosmos wonderfully solved by letting me use its fixtures for testing purposes.

#### Future plans

These look promising:

- [TestCafe](https://github.com/DevExpress/testcafe)
- [Cypress](https://github.com/cypress-io/cypress)

#### Further resources

- https://medium.com/welldone-software/an-overview-of-javascript-testing-in-2018-f68950900bc3
- [Kent C. Codds](https://medium.com/@kentcdodds/latest) blog posts on testing are very good and I recommend anyone to read them.

## State management

I tried Redux at first but later I found it more useful to separate UI state and data management. Traditionally, in a Redux application, one has to worry about a pletora of things that I've found much more natural to manage with a combination of Apollo + Mobx. I started looking at alternatives when I started reading blog posts on how to best design the file structure of your app for scaling. It came to the point that I thought twice about extracting functionality from large components, dreading creating the accompanying boilerplate. E.g. `Foo.js`, `Foo.test.js`, `Foo.reducer.js`, `Foo.actions.js`.

If and when this app becomes littered with UI state, I will consider using https://github.com/mobxjs/mobx-state-tree, a highly opinionated state management solution which shares many concepts with redux without much user involvement.

Truthfully, this application doesn't actually need MobX right now. Certainly not Redux (https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367), but I still used them keeping in the spirit of trying out new technologies.

## Data fetching/management

While using Redux I realized that a MVP data fetching/management solution with transparent caching and error management was going to be a pain to build. That isn't even taking into account good server REST API design to ensure that we don't waste much bandwidth over-fetching and other goodies such as reactive component rendering, paging, optimistic updates, etc... Thankfully, all this and more was provided for free by using Apollo GraphQL. The support is excellent, the documentation pretty good and it even comes with a Chrome DevTools extension! In truth, this project doesn't need a GraphQL solution, nor does it need all the (useful) features provided by the Apollo client. As a matter of fact, it doesn't even have a GraphQL server (I'm mocking the server in the frontend to avoid designing an HTTP API for now). But... I wanted to try GraphQL for real this time and it's been awesome so far.

## CSS in JS

I recommend https://speakerdeck.com/vjeux/react-css-in-js?slide=1. I'm definitely biased on this one since I'm a developer first and a designer 100th, therefore I really like the idea of code-locality and dislike global anything. And since Material UI already used JSS as its styling solution I dove into it and so far it has covered all my use cases.
