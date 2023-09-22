# CSIS3275

## Information

This is a web app group project for Douglas College's CSIS-3275 Software Engineering Course. The purpose of this app is to provide a gamified orientation experience for Douglas College students. The studenst are able to see and complete orientation tasks, and receive virtual rewards for these tasks. There is also a mini game they can play, which can be used during face to face orientation activities. The app also includes an admin section for the approval of tasks completed by students.

This document contains information on how to install the app to run locally. If you wish to demo the app without locally running it, the following link can be used to see the deployed version: https://douglas-orientation-game.herokuapp.com/

## Team

- Mehmet Koseoglu (300351078)
- William Jongmin Lee (300341465)
- Ozgen Akgun (300346378)
- Wenqi Wang (300334323)

<br></br>

## How to Run

#### Dependencies

1. Clone Repo
2. In VS Code open a new terminal (Terminal -> New Terminal)
3. Type: **npm install**. This will install all dependencies listen in the package.json file
4. Get the default.json file from the following link (https://drive.google.com/file/d/16k0mghZy6Uy9SwooEqngsy1ue3CqWf9J/view?usp=sharing) and insert it in the /config folder (this contains confidential credentials best kept out of github)
5. To install client dependencies, in your terminal type **cd client**, this will Change Directory to the client directory. Client has its own dependencies.
6. Now again type and run **npm install**, this time the client dependencies will be installed.
7. To go back to the root folder, type **cd ..**, this will take you back to the main project folder
8. Now you are ready to run the server, the client, or both.

#### Running Both Server and Client at the same time

1. Type **npm run dev**
2. This will concurrently run the server and frontend, and open the application on localhost:3000

#### Running Only the Server

1. To run the server, type **npm run server** in the terminal inside the main project folder (to close server, on terminal use CTRL + C)
2. To do a quick test, go to Postman, next to the dropdown that says GET, type **http://localhost:5000** and press SEND
3. You will get a response saying API Running. This means the server is successfully running.
4. Additional Postman Commands have been added to Postman Collections. Everyone needs to be added to view. The Postman tests are also detailed in Trello under Resources

#### Running Only the Client

1. Type "npm start"
2. To access frontend from mobile phone, first make sure your mobile phone is connected to the same network as laptop. Then, check 'network preference' in your laptop to obtain private network address. Then open browser in mobile phone and input 'private network/3000'. Note that this approach doesn't work at a public network such as Douglas College Internal. The possible reason may be firewall. Use your home Wi-Fi or personal hotspot for accessing pages from mobile.

<br></br>

## How to Use the Web Application (User)

1. The landing page is the login page, if you have a user already registered enter your credentials to log in.
2. If you do not have an account, use the register page. A 9 digit unique studentID, a unique email address and a password of at least 8 characters is required.
3. IMPORTANT after registration, certain browsers do not receive the state containing pet and tasks immediately. If this happens you will see a main page that only has a background. Please refresh your page if this happens. It is a rare occurance. Once a user is registered this does not occur.
4. On the main page, users can view their tasks. Blue tasks are incomplete, green tasks are completed tasks.
5. On the wardrobe page, users can see the rewards they have collected. Initially users only have the green shirt and shorts, but each completed task awards new items. Clicking on an item changes the clothes of the mascor.
6. IMPORTANT on rare occasions, clicking on the item does not change the clothes of the mascot. We are looking into the issue. On our observations it happened rarely. If this happens simply try again. It should work.
7. On the settings page, it is possible to change password.
8. The play button takes the user to the pico8 game. The game consists of two parts. Fortune and Trivia. Fortune is a simple magic 8 ball style game, where you ask or think of a yes or no question, and the mascot gives a random answer. Trivia is a quiz game that will be used in orientation. For test purposes it consists of 4 questions.
9. To exit the pico8 game, simply go back on your browser, currently there is no back button on the pico8 virtual console.
10. Use the log out button when done, this will clear your token.

<br></br>

## How to Use the Web Application (Admin)

1. To log in as admin, go to /adminlogin page.
2. There are already a few admin accounts added to the system. To test please use admin1@gmail.com as login email and 12345678 as admin password.
3. On the admin management page, you can enter a studentID, a taskID from the table presented, and a true/false value. When you click submit the request is sent to the server.
4. If the request is valid (a student with the ID provided exists, a task with the ID provided exists etc.), the task of that student will automatically be marked as complete, and the corresponding reward for that task will be added to their pet.
5. To log out use the logout button which will clear your token.

<br></br>

## Branch Information

There are two important branches in the project. The main branch is for running the application locally. The Deploy branch is the one deployed on heroku at:
https://douglas-orientation-game.herokuapp.com/
This branch is slightly behind the main branch, because certain features that were developed have not been integrated to the main branch yet. This is due to our testing rules.
Other than Main and Deploy branches, any other branch you see are either temporary branches or branches where a contributor is currently working on a new feature.

<br></br>

## Setup For Team Only

#### Installs

1. Node.js
2. VS Code
3. Postman
4. Github Desktop

#### Useful Chrome Extensions (not required)

1. React Dev Tools
2. Redux Dev Tools

#### Useful VS Code Extensions (not required)

1. ES7+ React/Redux/GraphQL/React-Native snippets
2. Prettier - Code formatter

#### VS Code Settings (not required)

1. Settings -> Search: format on save -> Check: format on save
2. Settings -> Search: prettier -> Check: Jsx Single Quote, Check: Prettier Single Quote, Check: Prettier Semi
3. Ctrl + Shift + P -> Type: Open Settings -> Click: **Open Settings (JSON)** -> after the last item, put a comma. on the next line Add: "emmet.includeLanguages" : {"javascript" : "javascriptreact"}

<br></br>

## Github Rules

1. When starting the day, get the most recent version of the project (Fetch Origin -> Pull Origin)
2. Create a new branch named with the following convention (Your Name - Feature You Are Working On, Ex: Mehmet-Frontend-Tasks-Section)
3. Once You are done with the feature, test it to make sure it works without issues
4. Create a Pull request (once approved this will merge your branch with the main branch)
5. Notify others so they can review changes (at least 1 review and approval is required before merging is allowed)
6. Once Approved your branch will be  merged to main
7. Delete the old branch, now your features are added to the main project. (so the repo is not cluttered with a lot of old branches)
8. When others ask for review, make sure to go over their changes (ideally together), and test the feature. Don't approve without making sure the changes aren't messing up the project.

<br></br>
