# Project: prime-tables
  A coding exercise made to display multiplication tables of a certain quantity of prime numbers.


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
  
  * *Additional features that could be implemented*
    * One could export the list of prime numbers into an .xls file, for use by other applications.
    * One could export the multiplication tables too.
    * One could use the algorithm implemented in this application for cryptographic purposes.
    * One could implement the sieve of Atkin instead of the sieve of Eratosthenes. This sieve, although a bit more complex in its application seems to deal better with the generation of very very large list of prime numbers.
