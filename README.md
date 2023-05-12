Priconnect

<a href = "https://priconnect.netlify.app/">Link Here!</a>

<a href = "https://priconnect.netlify.app/">
 
  <img width="959" alt="Screenshot 2023-05-11 200031" src="https://github.com/choir27/Priconnect/assets/66279068/7fd0a9cb-24c0-4dd2-ad24-7479a0691d1e">

</a>

<br>
How It's Made: Tech used: React, MongoDB, HTML, CSS, JavaScript, Node, Express

Taking the core UI design from the previous version of this application, version 2.0.0 adds a comment and reply function while also changing the core code from EJS to React. Separating various application elements into components and functions into hooks, React provides an efficient method of organizing and implementing code logic.  Not only that, but using React allowed the code to run faster with hooks like useMemo and useCallback.

<br>

Using @react-oauth/google, users can send their Google account information to the <a href = "https://github.com/choir27/priconne-backend">backend</a>, which saves the data into the MongoDB database, creating unique users' respective from Google accounts.  Posts, comments, and replies are generated, edited, and deleted using a combination of URL parameters, the formData constructor, and the Axios npm library package.  The React Suspense component and the union of boolean values and React states handle loading while waiting for particular elements of the application to render.

<br>

The React hook useNavigate and window.location.reload object method to handle redirects, which automatically updates the data in the MongoDB database; the Promise.all Axios method and the async method fetches the updated data.  Instead of alerts, Priconnect uses the react-toastify npm library package to notify users of a particular error, which has its custom CSS styling.   Lazy is a React function that helps increase the speed of rendering all the application images by only rendering the necessary UI elements first, then adding the unnecessary components later.

Optimizations

Lessons Learned:

Examples:
Take a look at these couple examples that I have in my own <a href ="https://choir.netlify.app/">portfolio</a>: K-pop Wired: https://kpopwired.netlify.app/ The Real Estate Beast: https://therealestatebeast.netlify.app/

