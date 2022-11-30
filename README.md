# Description

This is the fifth version of my Todo Application. I'm currently building this to practice TDD with React & TypeScript

I'll be streaming most of my progress at https://www.twitch.tv/teeang.

![xobiudhCSV](https://user-images.githubusercontent.com/8443215/204760613-9f696347-dc78-4e08-8217-f585c77ee1ed.gif)

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

![pkFfNu4blD](https://user-images.githubusercontent.com/8443215/204761824-78964bcb-fce9-420b-875a-d1738cbb578b.gif)


## Currently Implemented Features

- Delete todo with optimistic rendering.

## Technologies & Techniques Used
Test-Driven Development, TypeScript, Next.js, React, TailwindCSS, Jest, React Query, React Testing Library & Mock Service Worker

Note: I haven't decided yet if I want to build a backend for this application.

## General Methodology
1. Write a smoke test to see if the component renders
2. Identify a behaviour
3. Write the full test for the behaviour
4. Add implementation so that my test passes
5. Refactor as much as possible
6. If the surface area is large, I will decompose my changes into smaller commits using `$ git stash`

It would be good to see how this process evolves over time.
