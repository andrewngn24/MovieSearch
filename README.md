# MovieSearch - My First Full Stack Project

**[Try the live app →](https://movie-search-one-zeta.vercel.app/)**

A movie search and watchlist app I built while learning full stack web development. This project taught me a lot about APIs, state management, responsive design, and how to actually ship something that works across devices.

## What This Project Is

It's a simple but functional app where you can search for movies and save them to a personal watchlist. Nothing fancy—just clean vanilla JavaScript, some CSS styling, and the OMDB API. The watchlist persists in your browser, so your movie list stays even after you close the app.

I built this to practice the fundamentals before jumping into frameworks. It forced me to think about how data flows, how to handle user interactions, and how to structure code in a way that doesn't become a mess.

## What I Built

**Search & Discovery**
- Search for movies by title (powered by OMDB API)
- See results with year, type, and poster images
- Real-time button states so you know what's already saved

**Watchlist**
- Add/remove movies from your personal list
- Everything saves automatically to your browser
- Switch between search and watchlist views

**Actually Handling Edge Cases**
- Empty searches are blocked (no point hitting the API)
- Prevents duplicate additions with a simple check
- Missing poster images fall back to a placeholder
- API errors are caught and logged
- Search button disables while fetching (prevents spam clicking)

**Making It Feel Good**
- Works on mobile, tablet, and desktop (mobile-first design)
- Enter key to search—feels faster than clicking
- Button changes appearance when a movie's already saved
- Smooth animations when results load
- Dark theme with just enough accent color

## The Tech I Used

- **HTML5** for structure
- **CSS3** (Grid, Flexbox, animations) for layout and styling
- **Vanilla JavaScript** (ES6) for logic—no frameworks
- **OMDB API** for movie data
- **localStorage** to save the watchlist

## Lessons I Learned Building This

**Organization Matters**
I started with everything in one file and it was chaos. Split it into `common.js` (shared stuff), `search.js` (search page), and `watchlist.js` (watchlist page). Each file has one job. Way easier to debug and maintain.

**Mobile-First is Real**
I designed for mobile first, then added tablet and desktop styles. This forced me to think about what's actually important instead of cramming features everywhere. The layout works way better because of it.

**Error Handling is Not Optional**
Trying to add a movie with missing data? The app catches it. API fails? It logs the error and shows a message. These edge cases matter way more than you think when real users are clicking.

**State Management Gets Complex Fast**
Keeping the watchlist in sync between pages, updating button states, persisting to localStorage—all this needs to be thought through. I learned why apps use state management libraries (hint: this is easy compared to bigger projects).

**APIs Need Respect**
Every API call costs resources. Disabling the button during fetch, preventing empty searches, checking for duplicates—these aren't fancy features, they're respect for the API and the user's experience.

That's it. Just search for a movie and start building your watchlist.

## What I'd Do Differently Next Time

- Add a loading spinner instead of just disabling the button
- Build a proper movie detail modal for more info
- Add search history or recent searches
- Maybe rate movies in your watchlist
- Better error messages instead of generic alerts

But honestly? This version works, it's clean, and I learned a ton building it. That's what matters.

## What This Taught Me

This isn't a groundbreaking app, but building it taught me fundamentals that'll carry over to everything else:
- How to structure a project so it doesn't become spaghetti code
- How to handle async operations and user state
- How responsive design actually works (not just theory)
- That small details (like button disabled states) make a huge difference in UX
- How to debug when things break (hint: console.log is your friend)

---

**Built during my full stack coding course. First real project I'm actually proud of.**

