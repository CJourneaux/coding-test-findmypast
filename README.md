# Project: prime-tables
  A coding exercise made to display multiplication tables of a certain quantity of prime numbers.
  On a single web page, the user can input a number and be presented with a table showing him the result of the multiplication of a certain amount of prime numbers. This amount is decided by the user.
  To make the results more readable, the multiplication table is separated in width. The user can scroll down to see a whole column, or use a navigation system to load new columns.


# Running the Javascript version
  1.  Download the content of the folder "Javascript-version"
  2.  Open the file "page.html" in a web browser (tested on Chrome, Firefox, Internet Explorer and Opera Neon)
  3.  Follow the instructions on the web page to compute as many prime numbers as you want.
 
 
# Highlights
  * I am quite pleased with the general look of the web page, and the way I managed to present tests using only Javascript.
  * I am happy to have found a way to easily switch between production and testing mode.
  * I successfully managed to implement the sieve of Eratosthenes.
  * Separating the results of the table of prime numbers allows for an easier navigation in the multiplication table.
  * The highlight of the diagonal carries on from one page to the next (scroll down to see it).


# Expansion
  * *Javascript*

This project was developped using only pure Javascript, and only the Bootstrap library for the visual aspect. Of course, this is not a viable solution in a company (even though it is enough for a single-page application).
To increase the quality of the work, it would be advised to add a library to this project. Node.js looks like an interesting choice, but since I have never used it before, I preferred taking my time to learn how to best use it to its full potential. If I had started a bit earlier, I would have switched to it, and it is not too late to do so in the future.
  
  * *Elixir*

I started this project by looking into Elixir. Since I have never used this language before, I thought it would be a great opportunity to learn. Sadly, the specificities of functional programming hindered me a lot in the testing process, and I realised I would spend too much time on the testing part, and not enough on the application. Hence I switched to Javascript.
To further expand this project, one could try to  develop the same Elixir application in a test-driven way. (I will do it anyway, just for my personal knowledge.)
Moreover, using Elixir allows to easily do multi-threading, hence making the application faster. At the moment, it is a bit slow when trying to compute more than 25 000 numbers.
  
  * *Additional features that could be implemented*
    * One could insert a progress bar showing the user how fast the computation is going (and avoiding that the browser declares that the page is not responding).
    * One could try to look for a way to make the results even more readable (but this is complicated, since there can be so many numbers).
    * One could export the list of prime numbers into an .xls file, for use by other applications.
    * One could export the multiplication tables too.
    * One could use the algorithm implemented in this application for cryptographic purposes.
    * One could implement the sieve of Atkin instead of the sieve of Eratosthenes. This sieve, although a bit more complex in its application seems to deal better with the generation of very very large list of prime numbers.
