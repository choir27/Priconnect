# For-Everything-Priconne

This website provides a space to learn more about the mobile application Princess Connect: Re-Dive, ranging from a small demonstration of comics that can be cycled through, but also a small snippet concerning what the application is about.  The website also provides a way to dynamically create new webpages containing various images and text content provided from the add page, while also providing a method to search through those specific added text for a certain word. 

![priconne](https://user-images.githubusercontent.com/66279068/182735866-a4acdf35-5213-489f-8eb8-11e5f9419467.PNG)
<div align = 'center'><a href = 'https://odd-blue-cuttlefish-coat.cyclic.app/'>Link Here!</a></div>

## How It's Made: Tech used: HTML, CSS, JavaScript, Node, Express, EJS
Using ejs to load the data for the template page and express combined with javascript logic to ascertain particular webpages to their respective characters and content, I was able to not only dynamically add content respective to the input from the add page, but I was also able to have the content load much faster by not having any of the logic take place in a separate javascript page.  I was also able to accomplish this with the search page, using more intricate javascript logic to account for capitalization as well as punctuation and special characters like hyphens.  With the select form in the header, I was able to dynamically add new option elements for each added character, and by making it a form submitting data separate from the add page, I was able to change which name was most recently picked by the user.  Using ejs, I was also able to connect every character webpage link to either their content shown from the search page or the select form by changing the value of the queryparamater following for-everything-priconne.herokuapp.com/home/.  I also used css and js to make the comics carousel through each comic strip as they do, one section using a different method compared to the other.  Finally, I sent the data inputted from the contact page to the database using express and the app.post() method.

 ## Optimizations 
Initially, I had made both the search content and the names in the select form dynamically work using a separate javascript page, fetching the original data from the https://for-everything-priconne.herokuapp.com/api that was created using response.json() and sending the database data as a javascript object.  But after experimenting quite a bit, I realized that both elements loaded a bit too slowly for my taste and I realized that there had to be another I could implement the function that I desired while making the code compile faster and without breaking the code.  After some thought, I played around with the server side to see if I could send multiple databases at once when rendering the ejs pages, which I soon confirmed I could.  After realizing I could use both databases at the same time, I immediately implemented my javascript code to make it function in the ejs pages.  With some rewriting and time, I was eventually able to get the results that I was looking for while also decreasing the load times for both elements throughout every webpage.
 
## Lessons Learned: 
I learned that not only are you able to send multiple databases at once when rendering ejs pages, but I also learned to not be afraid to experiment with the server side more and see what can be accomplished using a combination of express, node and javascript logic.  I also learned while asking for help is always encouraged, I also need to improve on how I ask for help regarding the specifics as well as providing my helper with what I have tried already and what has ocurred when I tried compiling that code.
## Examples: 
Take a look at these couple examples that I have in my own portfolio: Illya Site: https://illyasite.herokuapp.com/ All About Pokemon: https://pk-mon.netlify.app/ Yu-Gi-Oh! Panel: https://yu-gi-oh-panel.netlify.app/
