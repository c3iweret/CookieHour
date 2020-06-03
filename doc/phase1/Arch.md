# Arch.md

## Architecture of the application



#### Stack

We have decided to use **MERN stack** (Node.js, Express, React, Redux & MongoDB) to implement the Instructor client UI and the Student client UI. This is because these are frameworks that some of the members of the team have experience with ,whereas the other members want to benefit from learning it.



### Webapps

Our two web applications will run on the **Node.js** server, and use **React** for the UI view and **Express** as the application control layer.

##### Instructor client web application use cases support
- Sync/Export intervals and meetings to personal electronic calendar(s)
- Create office hours interval
- Create new class
- Manage meetings in intervals
- Instructor Manage Comments (Comments associated with meeting, shared with student)
- Delete interval with no meetings
- Instructor Manage notes (Notes private to instructor)
- Generate persistent link to share meetings and/or intervals (eg. in a Qercus announcement or email)
- Instructor notify system that meetings are running late
- Manage preferences


##### Student client web application use cases support
- Choose meeting slot
- Cancel meeting slot
- Edit meeting slot
- Student Manage Comments
- Including in advance! (Propose agenda or ask questions)
- Efficiently Inform instructor when running late for meeting. System should adapt



### Services

For the services we have decided to use **Node.js** and **MongoDB**. 
MongoDB, being a NoSQL database provides flexible scalability and easy maintenance. Our collections can be quickly changed and therefore we have chosen it over SQL databases.

Since we are using the continuous integration, we have also decided to use **Travis** and for testing 
we are using **Chai** to test our nodeJS fucntionalities and **Jest** to test our react components. Providing snapshot testing and quick implementation, 
Jest will enable us to quickly develop code and ensure we can avoid accidental UI regressions. Chai will allow us to test our endpoints.


##### List of services and their support for use cases
- Database service - for scheduling and managing the meetings by both the instructor client web app and the student client web app
  *  Technologies:
     * MongoDB
     * Node.js
     * Express (for the RESTful API)
     
- Calendar integration service - for syncing/exporting intervals and meetings to personal calendar(s)
  * Technologies:
    * MongoDB
    * Node.js
    * Express (for the RESTful API)
    * Google Calendars
