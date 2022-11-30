# Description

This is the fifth version of my Todo Application

## Technologies & Techniques Used
Test-Driven Development, TypeScript, Next.js, React, TailwindCSS, Jest, React Query, React Testing Library & Mock Service Worker

Note: I haven't decided yet if I want to build a backend for this application.

## Getting Started

### Running the Developer Server

```bash
$ npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the Next.js application.

### Running Tests

```bash
$ npm run test

# or tests in watch mode
$ npm run test:watch
```

## General Methodology
1. Write a smoke test to see if the component renders
2. Identify a behaviour
3. Write the full test for the behaviour
4. Add implementation so that my test passes
5. Refactor as much as possible
6. If the surface area is large, I will decompose my changes into smaller commits using `$ git stash`

It would be good to see how this process evolves over time.
