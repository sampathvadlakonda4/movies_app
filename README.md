# Frontend Technologies
1) Node JS - (version - 22.20.0)
2) Vue JS- frontend framework
3) Vue-router - for routing
4) Pinia - to store the data
5) Pinia-plugin-persistedstate - to persist data
6) axios - to call the apis
7) eslist - to maintain code quality

# Instructions to run the application
1) Install the Node JS.
2) Clone the project from the main branch using the provided Git repository link: ( https://github.com/sampathvadlakonda4/movies_app.git ).
3) install node_modules ( npm i or npm install ).
4) Start the development server ( npm run dev ).

# Features
1) Responsive SPA movies application.
2) Movie search functionality that allows users to search movies by name.
3) Theme Support with two modes - dark and light. default is dark.
4) Dynamic skeleton loader.
5) User friendly - displayed proper prompts where required.
6) Handled api calls effectively.
7) Data persisting.

# Tested - Unit Test Cases
1) On first load of the application, a skeleton loader is displayed while data is fetching from 'https://api.tvmaze.com/shows' get-api. Fetching the data only once then stored it in the pinia and persisted for future use. if data already exists in pinia store then not fetching the data again from api.
2) skeleton loader's number of cards and genres are dynamically calculated according to window size.
3) After fetching data, loader is hidden and data started loading. If the data is empty then on UI displayed prompt.
4) In place of the movies poster, user can able to see the movie icon as the initial image, once the original image is loaded then it will be placed.
5) In the header, search field is displayed only if had data.
6) searched text related movies are shown up on display based on name of the movie, remaining are hidden.
7) If not found any results related to searched text then on UI displayed prompt.
8) and also theme switching button which placed in header is working fine. default theme is dark.
9) If current theme is light, then after page reload light theme styles are applied.
10) Arrow buttons of genres, Left arrow button is shown up only if had something to scroll on to left side, otherwise hidden.
11) Right arrow button also working similarly to left button.
12) If their is no scrollable content then both arrows are hidden.
13) On click of movie card redirecting to route and displayed details of movie. And also search field of the header is hidden.
14) If manually enteres any un-matched route then redirected to dashboard page.
15) If tries to open movieDetails route manually, then also redirecting to dashboard page.

