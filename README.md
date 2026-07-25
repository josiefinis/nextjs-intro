# nextjs - intro

This is a learning project and is my first time using React and Next.js. It was part of the frontend education with Lexicon where we had previously worked with static HTML and CSS, followed by Typescript. This previous work can be found here:

- [Recept (HTML & CSS)](https://github.com/josiefinis/recept)
- [Evently (HTML & CSS)](https://github.com/josiefinis/Evently-2026)
- [Task tracker (Typescript)](https://github.com/josiefinis/task-tracker)
- [Async Practice (Typescript)](https://github.com/josiefinis/async-practice)

## Learning Outcomes
In this section of the course we learned about:
- Basic structure of a Next.js app router project
- Next.js naming conventions
- Components, props and params
- Built in components Link and Image
- Basic routing 
- Conditional rendering
- Dynamic routes and dynamic metadata
- Fetch API with REST and GraphQL
- Error handling
- URL State Management with searchParams in server components.

I also worked with Tailwind for the first time on this project. 

## Overview
This is a website for a fictional music artist. The website features a main navigation bar at the top of all pages with static routes to Merch, Signup, Listen and Home pages, and to the Live section on the home page. At the top of the home page is a hero section that uses local images. The Merch page contains an image from an external source. The Live section on the home page is a server component that uses live music event data fetched from the [Stockholm Open API](https://api.visitstockholm.com/). It uses URL state management with searchParams to provide navigation from page to page as well as for filtering events by music genre. Each event in the live section links to a dynamic route with more information about each event. This uses a fetch by id to the Stockholm Open API. 

## Project structure
All application code is stored in shared folders in the root directory. The app directory is kept purely for routing.

    root
      ├ app
      │  ├ event
      │  │  ├ [id] / page.tsx
      │  │  └ not-found.tsx
      │  │  
      │  ├ listen / page.tsx
      │  ├ merch  / page.tsx
      │  ├ signup / page.tsx
      │  ├ globals.css
      │  ├ layout.tsx
      │  └ page.tsx
      │
      ├ components
      │  ├ navigation / main-nav.tsx
      │  ├ button.tsx
      │  ├ event-date.tsx
      │  ├ hero.tsx
      │  └ live.tsx
      │
      ├ data / events.ts
      │
      ├ lib
      │  ├ errors.ts
      │  ├ types.ts
      │  └ lib.ts
      │
      └ public
         ├ falling-embers.png
         ├ pink-sky.jpg
         ├ winged-heart-logo.png
         └ winged-heart.png

## Fetch API
I used the [Stockholm Open API](https://api.visitstockholm.com/) which lists events happening in and around Stockholm. The data portion of my app allows for fetching a specific page of a given number of events. In keeping with my site's theme it only fetches music events, but provides functionality to filter by music genre. It also allows fetching a single event by ID. The `live.tsx` component uses URL state management with searchParams to generate fetch queries. The dynamic route `event/[id]` generates a fetch by ID.

## Error handling
I implemented error handling in connection with API fetch requests, mostly within `data/events.ts` and using functionality imported from `lib/errors.ts`. I took the opportunity to familiarise myself with some techniques I was interested in, including a custom BaseError class that facilitates passing context with an error, a function for ensuring all errors are passed as an instance of Error, and a generic type to wrap the API response along with a variable showing if the fetch was successful or failed. 

## Loose ends
This project will be left in it's unfinished state as we move on to work with other things, but there are a number of questions I will be looking to find answers to in future work.

There are significant issues remaining with keyboard navigation. I find it strange that Nextjs' Link component changes how keyboard focus works compared to a normal anchor, and still do not really understand why. 
I used anchors for linking to an id (e.g. `/#live`) and for skip links because I could not get keyboard focus to work correctly with nextjs Link. I am not exactly happy with this solution and am aware that there are much better approaches. However when researching solutions I found myself frequently out of my depth in areas I know we will cover later in the course, so I decided to be patient.

There is a bug in my implementation of filters with searchParams where the page does not always update when removing a genre from the filter. The URL updates correctly but the page content does not. I think this has to do with how nextjs handles rerendering of the page but have not figured out what the cause is or if there is a way to force the page to rerender.
