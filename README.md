# REplit-Classroom-Analytics-APp
A Real-time Analytics Web App that consume the submissions events happening on a particular classroom in repl.it and present some analytics including generating a End of Day Leaderboard.


`The link below will redirect to the app.`

https://mywebhook--kishorecoder.repl.co/  


## App features:
As per the given stories, the app analyses the submission made in a classroom and lists the **"top 5 students based on the submission order"**.

Along with that, there is an extra feature that **"lists the top 5 students based on their completion time"** - the most essential part of this app because the teacher/students will **not only know** how **early they had completed** the problem, but also **how faster** they arrived at (**time taken to solve**) the solution.

 
This **feature helps** the **students** to **enhance** their **logical thinking speed** which would eventually help them **crack the coding interview** where **"time management"** plays a crucial role. Since Web hooks plays a major part here, the time measured by this app is very precise (it can measure up to the seconds taken by a student to solve the problem).

------

> **_Note: If more than one student take same amount of time (including the seconds) to complete the problem, then the one who has submitted first will take the lead._

------

## To connect app with a classroom :
https://mywebhook--kishorecoder.repl.co/submit

------

The above link should be given as a **Web hooks URL** in the classroom.

The app refreshes automatically for every 20 seconds. Hence the data in the leader board will get updated dynamically.

The submitted details will be **logged** in the **server console** as well as **stored** in the **database**.

After the app is linked with the classroom (using Web hooks URL), the moment the students start to submit the assignment, the app begins its analysis.

Multiple classrooms can be linked to this app.

------

## Technology Stack used:

*  **MongoDB Atlas** as a back end (It's a **"Cloud based service"**).
* **HTML, CSS, JavaScript** (with **AJAX**) for front end.
*  **ExpressJS** (with **NodeJS**) for server side scripting.
*  **Webhooks** (an **API** provided by [repl.it](https://www.repl.it) to sent data event to my app).

------

## Upcoming versions of the app:

Further features to my app,

*  **Sending mail** to all the participants in the classroom **automatically** at the end of the day (**12.00 A.M everyday**) regarding the **"top 10 winners of the day!"** ( **5** based on **"submission time"** + **5** based on **"completion time"**) - on progress.
> _Reason: Teacher/student will get the final report as a mail at the day end._
*  Transformation of the same app to a hybrid app using React Native - on progress.
*  Posting the students **completion status** in a **gitter room automatically** (or in some other social media) once they **complete** an assignment.
> _Reason: To publish their own activity to the world._
*  Comingup with a mechanism to detect the plagiarism.
