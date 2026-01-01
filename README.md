# Frontend Technologies
1) Node JS with npm - (version - 22.20.0)
2) Vue JS- frontend framework.
3) Vue-router - for routing.
4) Pinia - to store the data.
5) Pinia-plugin-persistedstate - to persist data.
6) axios - to call the apis.
7) eslist - to maintain code quality.
8) husky & lint-staged - to check the errors of the staged files. 

# Instructions to run the application
1) Install the Node JS.
2) Clone the project from the main branch using the provided Git repository link: ( https://github.com/sampathvadlakonda4/movies_app.git ).
3) install node_modules ( npm i or npm install ).
4) Start the development server ( npm run dev ).

# Features
1) Responsive single page movies application.
2) Movie search functionality that allows users to search movies by name. Implemented search effectively without need of debouncing.
3) Theme Support with two modes - dark and light. default is dark.
4) Dynamic skeleton loader.
5) User friendly - displayed proper prompts where required.
6) Handled api calls effectively.
7) Data persisting.
8) Eslint with husky & lint-staged to check staged files only to maintain code quality.

# Tested - Unit Test Cases
1) On first load of the application, redirected to dashboard page, a skeleton loader is displayed while data is fetching from 'https://api.tvmaze.com/shows' (get-api). Fetched the data only once, then stored it in the pinia and persisted for future use. if data already exists in pinia store then not fetching the data again from api.

2) skeleton loader's number of cards and genres are dynamically calculated according to window size.

3) After fetching data, loader is hidden and data started loading. If the data is empty then on UI displayed 'No data available.'.

4) Movies list grouped by genre and sorted according to rating in descending order.

5) In place of the movies poster, user can able to see the movie icon as the placeholder image, once the original image is loaded then it will be placed.

6) In the header, search field is displayed only if had data.

7) searched text related movies are shown up on display based on name of the movie, remaining are hidden.

8) If not found any results related to searched text then on UI displayed prompt.

9) On empty search, displayed all the movies.

10) Theme switching button which placed in header is working fine. default theme is dark.

11) If current theme is light, then after page reload also light theme styles are applied.

12) Arrow buttons of genres, Left arrow button is shown up only if had something to scroll on to left side, otherwise hidden.

13) Right arrow button also working similarly to left button.

14) If their is no scrollable content then both arrows are hidden.

15) On search of text also checked for arrow buttons visibility.

16) On click of movie card redirecting to route and displayed details of movie. And also search field of the header is hidden.

17) If manually enteres any un-matched route then redirected to dashboard page.

18) If tries to open movieDetails route manually, then also redirecting to dashboard page.

19) Responsiveness checked.

