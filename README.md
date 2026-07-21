# nextjs - intro

This is a learning project and is my first time using React and Next.js. It was part of the frontend education with Lexicon where we had previously worked with static HTML and CSS, followed by Typescript. This previous work can be found here:

- [Recept (HTML & CSS)](https://github.com/josiefinis/recept)
- [Evently (HTML & CSS)](https://github.com/josiefinis/Evently-2026)
- [Task tracker (Typescript)](https://github.com/josiefinis/task-tracker)

## Learning Outcomes
In this section of the course we learned about:
- Basic structure of a Next.js app router project
- Next.js naming conventions
- Components, props and params
- Built in components Link and Image
- Basic routing 
- Conditional rendering
- Dynamic routes and dynamic metadata
- Fetch API with REST
- Error handling
- URL State Management with searchParams

I also chose to work with Tailwind for the first time on this project. 

## Project structure
All application code is stored in shared folders in the root directory. The app directory is kept purely for routing.

**root**
  ├ **app**
  │  ├ **event**
  │  │  ├ **[id]** / page.tsx
  │  │  └ not-found.tsx
  │  │  
  │  ├ **listen** / page.tsx
  │  ├ **merch**  / page.tsx
  │  ├ **signup** / page.tsx
  │  ├ globals.css
  │  ├ layout.tsx
  │  └ page.tsx
  │
  ├ **components**
  │  ├ **navigation** / main-nav.tsx
  │  ├ button.tsx
  │  ├ event-date.tsx
  │  ├ hero.tsx
  │  └ live.tsx
  │
  ├ **data** / events.ts
  │
  ├ **lib**
  │  ├ errors.ts
  │  ├ types.ts
  │  └ lib.ts
  │
  └ **public**
     ├ falling-embers.png
     ├ pink-sky.jpg
     ├ winged-heart-logo.png
     └ winged-heart.png

## Development
As a learning project there were no clear design goals or overarching plan in mind from the beginning, rather the project grew organically. New features were added with the main purpose being to try out and practice the new things I had learned each day. 


## Fetch API
I chose to use the [Stockholm Open API](https://api.visitstockholm.com/) which lists events happening in and around Stockholm. The data portion of my app allows for fetching a specific page of a given number of events. In keeping with my site's theme it only fetches music events, but provides functionality to filter by music genre. It also allows fetching a single event by ID. The *live.tsx* component uses URL state management with searchParams to generate fetch queries. The dynamic route *event/[id]* generates a fetch by ID.

## Error handling
I took the opportunity to play around with some approaches to error handling that were new to me. This also gave me the chance to become more familiar with some TypeScript features like generics, which were still quite unknown to me before this project. 

## Loose ends
This project will be left in it's unfinished state as we move on to work with other things. 

There are significant issues remaining with keyboard navigation. Next.js' Link component handles keyboard focus very differently to an anchor element in ways that I still don't fully understand. For this reason I chose for example to use an anchor instead of Link from the main navigation to the Live section because Links behaviour would be confusing and frustrating for users navigating with a keyboard. I am not exactly happy with this solution and am aware that there are much better approaches. However when researching solutions I found myself frequently out of my depth in areas I know we will cover later in the course, so I decided to be patient.

## komponenter och routing
Mer om komponenter, skillnaden mellan funktioner/metoder och komponenter
Namnkonventioner i Next.js
Ev children/React.ReactNode
Förstå vad komponenter är i react
Grundläggande routing i Next.js

## Rendering, param och props
Working with interfaces in components
Understanding props in components
Parameter destructuring in components
Conditional rendering

## Dynamic routes
How dynamic routes work
Using params in components
Asynchronous components
Using notFound()
Dynamic metadata

## API:er
Förstå skillnaden och teorin bakom olika API-typer för att hämta data (REST vs GraphQL)
Förstå hur data flödar från en extern källa till vårt gränssnitt

## URL State Management with searchParams
Förstå URL State Management: Varför vi vill ha filter och sökningar i URL:en
Kunna använda searchParams i server components (page props)
Göra en ny fetch baserat på vad som står i searchParams

