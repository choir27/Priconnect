Priconnect

Link Here!

How It's Made: Tech used: React, MongoDB, HTML, CSS, JavaScript, Node, Express
Taking the core UI design from the previous version of this application, version 2.0.0 adds a comment and reply function while also changing the core code from EJS to React. Separating various application elements into components and functions into hooks, React provides an efficient method of organizing and implementing code logic. Not only that, but using React allowed the code to run faster with hooks like useMemo and useCallback.


Using @react-oauth/google, users can send their Google account information to the backend, which saves the data into the MongoDB database, creating unique users' respective from Google accounts. Posts, comments, and replies are generated, edited, and deleted using a combination of URL parameters, the formData constructor, and the Axios npm library package. The React Suspense component and the union of boolean values and React states handle loading while waiting for particular elements of the application to render.


The React hook useNavigate and window.location.reload object method to handle redirects, which automatically updates the data in the MongoDB database; the Promise.all Axios method and the async method fetches the updated data. Instead of alerts, Priconnect uses the react-toastify npm library package to notify users of a particular error, which has its custom CSS styling. Lazy is a React function that helps increase the speed of rendering all the application images by only rendering the necessary UI elements first, then adding the unnecessary components later.

Optimizations:

My priority of additions or changes I want to make to this application would be to add a subscription system, where the Dashboard would first show only posts belonging to accounts that the user subscribed to; there would also be an unsubscribe option for users, allowing them to remove users from their subscriptions. Real-time text messaging between accounts is another function I would love to add, extending communications between accounts outside of just comments or replies. In that messaging system, users could send text and potentially gifs, emojis, and video links where the video thumbnail, description, and title would also show.


I would also love to add the ability to delete messages and block users, preventing communication between users with each other through messaging, comments, or replies, and posts and account pages would not be viewable. Filtering posts by particular categories, like by date and popularity, and letting the user search through the entire collection of posts for certain words or phrases is another function I want to add to this application. I want to look at my code again and see if I can reduce the render time or the logic speed by reducing their time complexity.

Lessons Learned:

After conducting experiments with the code and researching online, I successfully learned how to implement Google authentication in a React application. Consequently, I transmitted the Google account data to a MongoDB database via an established backend server. After building K-pop Wired using React, I was able to effectively implement all the elements that I learned from experimenting around, letting me build Priconnect at a faster rate.

Examples: Take a look at these couple examples that I have in my own portfolio: K-pop Wired: https://kpopwired.netlify.app/ The Real Estate Beast: https://therealestatebeast.netlify.app/