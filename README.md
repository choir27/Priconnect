## Priconnect

A social media application that evolved from the initial Priconne UI design to the current version, using <a href = "https://www.figma.com/file/IsgZ9uNNbUL79ECDpUePlE/Priconnect?type=design&node-id=36-31&mode=design&t=vkLXBgqz6VUzDAgY-0">Figma</a> and core design theories to provide a platform for Google users to connect with each other by creating public online posts and commenting on those posts.

<a href = "https://priconnect.netlify.app/">

![priconnect](https://github.com/choir27/Priconnect/assets/66279068/4377225b-efd9-43fe-8033-56203cf21ea1)

</a>

<div align = "center"><a href = "https://echostream.netlify.app/">Check out the website!</a></div>


<h1>Visual Representation of this projects lifecycle and all its different improvements</h1>

<h2>First Iteration of this project</h2>
Priconne Site Home Screen UI

![Priconnec](https://github.com/choir27/Priconnect/assets/66279068/471c0b6d-b383-40c5-a1f3-e97c7dbd1c74)

<h2>Second Iteration of this project</h2>
Priconnect Site Home Screen UI

![screencapture-priconnect-netlify-app-2023-12-12-12_06_51](https://github.com/choir27/Priconnect/assets/66279068/a03285a7-1bc4-41dd-a710-973b33be2818)

<h2>Current Iteration of this project</h2>
Priconnect Site Home Screen UI

![priconnect](https://github.com/choir27/Priconnect/assets/66279068/4377225b-efd9-43fe-8033-56203cf21ea1)

## How It's Made: Tech used: Next, TypeScript, React, AppWrite, Cloudinary

Using AppWrite's inbuilt OAuth method, user's Google data successfully stores in an AppWrite database, and using the React hooks useEffect and useState, the application is able to store the users email address in local storage to maintain the post login state.  Using React state to store and update the search term as the user is typing in the search bar, the search results page is able to update in real time as the user is typing or deleting their search query; also, when the user clicks on the search button, that search term is saved in that respective users search history, which is viewable in their account page.

By separating the Cloudinary upload widget to upload images and the AppWrite function to upload and store post data, the application is able to categorize, organize, make the code more clean.  Using conditional logic, I am able to check if the current logged in user has already added a like to a post.  If they did and click on the heart icon again, the current user will now unlike the post and updates the total number of likes for that post.

## Optimizations:

When adding new elements to an existing array element, I always used the in-built array push method to keep the code rendering at O(1) time and space complexity instead of the shift array method, which would be at O(n) time and space complexity.  I kept my code clean, organized and easy to navigate by separating functions and rendering certain elements by storing those lines of code in separate folders and files.  I plan on adding email notifications, and displaying the search suggestions with the appropriate CSS for possible search terms.

## Lessons Learned:

I really like the way I separated and organized files and folders in my project.  It made creating changes to the code base easier, efficient, and fast, which I will definitely apply this kind of organization flow to future projects.

Examples: Take a look at these couple examples that I have in my own portfolio: EchoStream https://echostream.netlify.app/ The Real Estate Beast: https://therealestatebeast.netlify.app/
