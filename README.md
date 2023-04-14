# For-Everything-Priconne

This website provides a space to learn more about the mobile application Princess Connect: Re-Dive, ranging from a small demonstration of comics to a small snippet concerning what the application is about. The website also provides a way to dynamically create new web pages containing posted various images and text content.
<a href = 'https://odd-blue-cuttlefish-coat.cyclic.app/'>

![priconne](https://user-images.githubusercontent.com/66279068/182735866-a4acdf35-5213-489f-8eb8-11e5f9419467.PNG)

</a>

<div align = 'center'><a href = 'https://odd-blue-cuttlefish-coat.cyclic.app/'>Link Here!</a></div>

## How It's Made: Tech used: HTML, CSS, JavaScript, Node, Express, EJS
Using javascript to load the data for the template page and express combined with javascript logic to ascertain particular webpages to their respective characters and content, I was able to not only dynamically add content from posts, but I was also able to have the content load much faster by not having any of the logic take place in a separate javascript page.  Various elements of the website, like the dashboard or the add page, are only accessible by existing users, preventing any unauthenticated users from entering the URL params for those pages and instead redirecting them to the home page.  The user can edit or delete their posts while only being able to read other articles created by other users.  Users are authenticated through the Google auth library, allowing the user to use existing Google accounts to sign in.  I also used CSS and js to make the comics carousel through each comic strip as they do, one section using a different method compared to the other.  Finally, I sent the data inputted from the contact page to the database using Express.js and the post method.

 ## Optimizations 
Initially, I had made the names in the select form dynamically work using a separate javascript page, fetching the original data from the https://for-everything-priconne.herokuapp.com/api using response.json() and sending the database data as a javascript object.  But after experimenting quite a bit, I realized that both elements loaded too slowly for my taste, and I realized there had to be another I could implement the function desired while making the code compile faster and without breaking the code.  After some thought, I played around with the server side to see if I could send multiple databases when rendering the pages, which I soon confirmed I could.  After realizing I could use both databases simultaneously, I immediately implemented my javascript code to make it function as intended.  After rewriting and with time, I created what I wanted while decreasing the load times for both elements throughout every webpage.
 
## Lessons Learned: 
I learned that not only are you able to send multiple databases at once when rendering pages, but I also learned it is okay to experiment with the server side more and see what I can accomplish using a combination of express, node, and javascript logic.  Asking for help is always encouraged, but I also learned that I need to improve on how I ask for help regarding how many details I give to my helper with what I have tried already and what occurred when I tried compiling that code.

## Examples: 
Take a look at these couple examples that I have in my own portfolio: The Real Estate Beast: https://therealestatebeast.netlify.app/ K-pop Wired: https://kpopwired.netlify.app/ For Everything Priconne: https://odd-blue-cuttlefish-coat.cyclic.app/
