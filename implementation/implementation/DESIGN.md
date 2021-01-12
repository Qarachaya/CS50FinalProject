In the application.py file, I have created pathways to each of the site's pages: home, learn, lesson, and quiz.
Home, learn, and lesson are simple GET pathways that render their respective templates. I designed the HMTL templates
with bootstrap, and my only CSS addition was a color I called "regal" (since it is a shade of red that looks somewhat royal).

The HTML template layout.html contains the <head> element and navbar for all pages, and uses Jinja to work with other templates
(I based this part on CS50 Finance). The head only contains links to Bootstrap and the CSS file,  a viewport element to
help make the site responsive, and the site title. The body contains a navbar with the logo and heading. Then there is the Jinja
to render the site content from another template.

I used the Bootstrap grid system to design the home, learn, and lesson pages. I used divs marked with classes designating their location
on the page; in order of priority (the latter elements are nested in the former): "container" then "row" then "col". I used "url_for()" from
Jinja for the href elements in links to make them more dynamic than hardcode. I used the class "btn btn-danger" on links to make them look
like buttons (I used danger because it goes with the color scheme of my site; it is not semantic though, and I read on the Bootstrap documentation
that it is not used by screen readers). I added the class d-flex and justify-content-center to center elements, and I added padding.

The quiz has two functional components: the Python and the JavaScript. First, the number of questions is randomly selected (between 5 and 10) and
used to query from the SQL database into a Python list of dicts with this format: [{Assyrian: word, English: word}]. The quiz number is set to 1 in Python,
and the quiz number and questions are send to HTML when the GET request is called. There, they are converted to a JSON object in the script at the end
of the document, and the external JavaScript file is called. This file then picks up the list.

The JavaScript splits the list into the quiz number and questions. It initializes the points counter and question number, and then calls main.
I chose to give almost all the elements in quiz.html id's and save them as variables in JavaScript with document.querySelector('#'). I did this
because when I was first building the JavaScript quiz (in a simple JavaScript-HTML-CSS file and http-server), I kept running into redundancy with
getting elements by id multiple times, and variable scope issues. I know it is probably not the most size efficient but it made things easier to
keep track of.

In main, the updateUI() function sets up the quiz. It updates the innerHTMl of the quiz number header, the points counter, question number, and prompt.
To turn the list of dictionaries into a question, it iterates through the list based on question number and randomly selects either the English or
Assyrian version of the word to be the question/answer in the quiz.

The other function in main stops forms from being submitted. I had a lot of trouble getting the quiz to work since it kept refreshing the page and restarting
the quiz whenever a button was clicked or the enter key pressed, especially since I originally put the user response <input> tags inside of a <form>.
Professor Malan told me earlier today (on the Ed discussion board) that forms cannot be nested in forms, and since the whole page is inside of a form (since
Flask uses forms to send GET and POST requests), I put all the inputs insde of divs and gave them onclick functions (even event listeners on these inputs
were causing issues).

The other functions in quizzes.js are called by onclick in quiz.html. The toggler() function is simple: when the Toggle Assyrian Keyboard is pressed, the
<table> holding the keyboard is shown and centered, and if it is pressed again, it is hidden. I had to remove/add the d-flex class because it overrides
display: none. The press(key) function concatenates the key pressed on the keyboard to the string in the user response input box. I got inspiration for
this code from assyrianlanguages.org/sureth (which is a great Assyrian dictionary site).

The check() function when the "Check Answer" button is clicked, and it compares the string in the user response <input> text box to the answer of the
current question. Then it calls either the correct() or incorrect() function to show the result in a <span>. If the answer is correct, the points counter
is incremented. The nextButton function is called to remove everything the user could input (so they don't spam the correct answer and get a ton of points)
and show the next question button (or the finish quiz button if the last question has been answered). I tried just hiding the <div> containing the user
input box and submit button, but this didn't work (the div actually disappeared sometimes in inspect element), so I hid every element.

The nextQuestion() function triggers the resetButtons() function, which hides the next question button and results, and reveals the user input again.
nextQuestion() also increments the question counter and calls updateUI(), which gets a new question from the list of dicts (originally from Python).

When the final question has been answered, and the user presses the "Finish Quiz" button, the <div> I labelled "footer" (containing everything except the
quiz name, which is the "header") is hidden, and the results <div> is shown. The percentage score is calculate by division with the points counter and quiz
length, and displayed. The "Return to Lesson" button is already configured to redirect to the lesson page, and the "Take Quiz Again" button triggers the
restartQuiz() function. This function resets everything to the way it was when the quiz was first loaded, retaining the same question list the user just
answered.
