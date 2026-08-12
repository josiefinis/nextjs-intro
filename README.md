<!-- Image here -->
# Josifinix 
This project was part of the Lexicon frontend education and my first introduction to Next.js and React. It is a fictional music artist's website where one can look up live music events happening in and around Stockholm.

## :star: Features
- List live music events in the Stockholm area
- Filter by genre
- View detailed information for each event

## :wheel: Under the hood
- React components
- Conditional rendering
- Basic routing
- Dynamic route with dynamic metadata
- Fetch API with REST
- URL State management with searchParams in server components
- Error handling

<!-- screenshots here? -->
## :arrow_down_small: Installation
```bash
git clone git@github.com:josiefinis/nextjs-intro.git
cd nextjs-intro
npm install
npm run dev
```
Open http://localhost:3000 with your browser to see the result.
## :sewing_needle: Technologies
<!-- logos here -->
- Next.js
- React
- Typescript
- Tailwind

## :open_file_folder: Project structure
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
      └ lib
         ├ errors.ts
         ├ types.ts
         └ lib.ts

## :file_cabinet: API
This project uses the [Stockholm Open API](https://api.visitstockholm.com/) to retrieve information on events happening in and around Stockholm. 

## :bug: Known Issues
<!-- rewrite -->
The goal of this project was to learn basic Next.js and React, not to create a finished product. It is unlikely that it will be developed further. There were some bugs where I suspect the solution requires features of Next.js outside the scope of this project. I will keep these in mind as I continue to learn and work with Next.js and React.
- Keyboard navigation issues having to do with differences between Link elements and anchor elements
- Event list failing to update when removing a filter 

Other issues can be found under [issues](https://github.com/josiefinis/nextjs-intro/issues).

## :mortar_board: Lexicon
This project was part of the frontend education with Lexicon. Previous and subsequent projects can be found below.

- [Recept (HTML & CSS)](https://github.com/josiefinis/recept)
- [Evently (HTML & CSS)](https://github.com/josiefinis/Evently-2026)
- [Task tracker (Typescript)](https://github.com/josiefinis/task-tracker)
- [Async Practice (Typescript)](https://github.com/josiefinis/async-practice)
- **Josifinix (Next.js, React & Tailwind)**
- [Webshop (Agile, GitHub Projects, Next.js, React & Tailwind)](https://github.com/Martin-Joensson/projekt-agila-metoder-webshop)
