# Product.md

### What was built and how did it differ from the original plan?

In our [third meeting](https://github.com/csc302-spring-2019/proj-CookieHour/blob/master/Meeting_Minutes/Meeting%203%20.pdf) , we discussed what we wanted to get accomplished for phase 2. Our plan was to complete the following in the backend and frontend with tests. Priorities are labeled P0 to P3 accordingly.:

**For the Instructor, allow them to do the following:**

Create new class with classList - P0

Create office hours interval - P0

See Meetings - P0


**For Student, allow them to do the following:**

Book meeting slot - P0

Including in advance! (Propose agenda or ask questions) P1


Despite having one less member, we were able to finish everything on the frontend and backend for the instructor, such as creating a course section, creating an office hours for a course section and displaying it on the frontend. However for the student, we completed the backend functionality of allowing students to book a meeting and set an agenda, edit an agenda , create a comment, reschedule a meeting time or date and delete a meeting.

We did more than we planned to do for the backend in regards to the student but we still didn't have this work reflected in the frontend. This was because we have three people working on the frontend, with only two people working on the frontend. The frontend members of our team have not used React or bootstrap before so it took them longer than anticipated.

We also created tests for the features we implemented. However, we still have more tests to add to the frontend. The frontend is not adequately tested because of the time crunch.


### High-level design of our software

Our system is divided into two endpoints:
- Client web application : This handles our user interface. It uses Bootstrap and React.
- Server web application : This handles database requests from the client web app and returns data accordingly. We are using Node.js, Express(for the RESTful API) and MongoDb.



### Technical highlights

- Interesting bugs

One of the bugs was caused by one person switching the versions of a few node dependencies.
Since we were pulling the code and using 'npm install' without previously removing node_modules,
the bug was masked during the stage of the pull request review. Only when one of the team members
cloned the entire master repository and tried to run the application, did the bug show up. 
[Bug fix pull request](https://github.com/csc302-spring-2019/proj-CookieHour/pull/18)

Another bug was caused by the '.find()' function, which is querying the database, 
sending the response header at the end of its call. We have found it by trying to see where in the code
the header was being sent. Then we moved the code inside the query, so that we have nested queries.
[Bug fix pull request](https://github.com/csc302-spring-2019/proj-CookieHour/pull/23), 
[Bug fix pull request 2](https://github.com/csc302-spring-2019/proj-CookieHour/pull/24)


- Challenges

One of the challenges was the frontend team members coding struggling to use React for the first time. This caused delays in the project and resulted in us not completing everything we sought out to do.

Another challenge was getting the file upload to work when a teacher uploads a classList. Originally Kyra who took that task was trying to follow [this](https://medium.freecodecamp.org/how-to-create-file-upload-with-react-and-node-2aa3f9aab3f0) tutorial which used express-fileupload npm module. However, after several hours of getting it to work, Kyra found out that Express 4 doesn't support the npm module without extra modules. Thus, multer was used instead for the file upload and that worked instead. 

- Lessons learned

-We learned that we should reshuffle the team and put someone else on frontend in order for us to not fall behind on that end. We also learned we should be more vocal with each other so we can know when someone is falling behind.


- Observations

Due to time constraints, its more time consuming to practice TDD and write tests. We need to account for this testing time in our story points calculation. 

### Reflection

Overall, we did pretty well in regards to getting a lot of the backend work done. However, we still need to catch up on writing tests and make more progress on the frontend. 

For collaboration tools, we used the "Agile Tools" powerup on Trello so we can set story points to our tasks this sprint. The Agile Tools also came with a trial to Corrello that allows us to see our burndown chart. We set our sprint for phase 2 from Monday, March 4 to Saturday, March 23 which is the amount of time we spent working on phase 2. The burndown can be seen below.

![here](https://github.com/csc302-spring-2019/proj-CookieHour/blob/master/Meeting_Minutes/Screen%20Shot%202019-03-23%20at%201.28.34%20PM.png "Burndown"). 

For phase 2, we completed 50 points in all and currently only have 4 tasks left, which all relate to frontend tasks allowing students to book office hour meetings as discussed in our Challenges. On thursday, March 21, the burndown went up because we added some backend tasks as dicussed in the "What was built and how did it differ from the original plan?" section of this document. 

Our team worked well when it came to code reviews. We all worked from seperate branches related to our tasks and merged it in only if two people approved it.
[Example of a pull request](https://github.com/csc302-spring-2019/proj-CookieHour/pull/13)

What we can improve on is being more vocal when one is struggling on completing their tasks. This will enable us to work as a team and help each other to get our tasks completed accordingly. Another solution is to have more team meetings. We only had two meetings this phase, [meeting 3](https://github.com/csc302-spring-2019/proj-CookieHour/blob/master/Meeting_Minutes/Meeting%203%20.pdf) and [meeting 4](https://github.com/csc302-spring-2019/proj-CookieHour/blob/master/Meeting_Minutes/Meeting%204.pdf) . However, we do recognize it is hard to meet more frequently because of everyone's schedule.


### Plan for phase 3

For plan 3, we want to ensure the frontend is sufficiently tested since we didn't get to do that for phase 2. The following are the features we have left. We will be focusing on doing the frontend, backend and tests for the features, unless otherwise stated. The following is prioritized from P0 to P3:

##### **Instructor**
- Sync/Export intervals and meetings to personal electronic calendar(s) -  **P1**
- Manage meetings in intervals - **P0**: (Frontend only)
  - Reschedule meetings to another interval
  - Cancel/Delete meetings
- Instructor Manage Comments (Comments associated with meeting, shared with student) - **P1**: (Frontend only)
  - Create comment
  - Edit comment
  - Delete comment
  - Find comment
- Instructor Manage notes (Notes private to instructor) -  **P1**:
  - Create note about student meeting
  - Find a note made about a student
  - Find a comment made for a student
  - Delete a note
  - Edit a note
- Generate persistent link to share meetings and/or intervals (eg in a quercus announcement or email) -  **P2**
- Instructor notify system that meetings are running late - **P2**


##### **Student**
- Book meeting slot - **P0** (Frontend only)
- Cancel meeting slot - **P0**
- Edit meeting slot(Reschedule, update agenda) - **P0** (Frontend only)
- Student Manage Comments **P0** (Frontend only)
    - Create comment 
    - Delete, Edit comments
    - Find comments
- Including in advance! (Propose agenda or ask questions) **P0** (Frontend only)
- Sync/Export meetings to personal electronic calendar(s) **P1**
- Efficiently Inform instructor when running late for meeting. System should adapt - **P2**
