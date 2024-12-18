# One Wacky Week Sales and Information Site

A website that will be used in the future for selling the video game I am going to make.

## Setup

If you want to create a copy of this code and get it working on your computer, you will need to `npm install`, `npm run server`, and `npm run client`. You will also need to create a .env file that will hold your own stripe and cloudinary secrets
- 'SERVER_SESSION_SECRET'
- 'GAME_COST'
- 'VITE_CLOUDINARY_NAME'
- 'VITE_CLOUDINARY_UPLOAD_PRESET'

You will also need to setup a database called 'alex' or you can change it to whatever you want by going to `/server/modules/pool.js on line 31` as well as copy, paste and run the code in the database.sql file into your database.

## Description

Every page has the Navbar displayed at the top and it is setup for desktop and mobile view
- There is a `Login / Register` button that will be replaced with the user's username and profile picture upon login, and if that is clicked the user will be taken to the user page.
- The Navbar has a `download` link that will navigate to the download page and will only show up if the user is logged in.
- The `about` link navigates the user to the about page.
- The `home` link navigates the user to the home page.
- When a user is logged in a `Log Out` button will appear and when clicked will log out the user.

The first image here is how the Navbar looks on desktop, the second is how it looks on mobile.
![screenshot of the navbar on a desktop screen](./public/wireframes/navExp.png)

![screenshot of the nabar on a mobile device](./public/wireframes/navCond.png)

The Home/Landing page is the first page that a user sees
- The game's patch notes are displayed on the page from most recent to oldest.
- Some game art is to be displayed above the patch notes.
- The creator's socials are displayed here.

![screenshot of the home page](./public/wireframes/home.png)

The About page is one of the four pages accessible without needing an account
- Information about the creator and the game are found on this page.
- Some different game art is to be here as the background of the page.
- A few easter eggs are to be hidden here.

![screenshot of the about page](./public/wireframes/about.png)

The Login page is another of the four pages accessible without needing an account
- The user logs into their already made account here
- The user can switch to the registration page to create a new account
- Upon login the user is taken to the user page

![screenshot of the login page](./public/wireframes/login.png)

The Registration page is another of the four pages accessible without needing an account
- Here is where a user creates a new account
- Recovery questions will be used for password recovery in the future (will be done before deployment)
- Email verification will be refined in the future
- Upon login the user is taken to the user page

![screenshot of the registration page](./public/wireframes/register.png)

The User page is where the user can view their profile information
- The user can change their profile picture here
- The user can also "delete" their account here. (Deleting here really just flags the account to be deleted on the Admin's account table)
- User will also be able to logout here

![screenshot of the user page](./public/wireframes/user.png)

The Pre Purchase Download page is where the user can purchase the game
- The user can click purchase to be taken to strip to buy the game
- After making the purchase the user will see the Post Purchase Download page
- The game trailer will be here.

![screenshot of the download page before the user has purchased the game](./public/wireframes/preDownload.png)

The Post Purchase Download page is where the user can purchase the game
- The user can click either of the download buttons to download the game, one for Windows and one for MacOS.
- The game trailer will be here as well.

![screenshot of the download page after the user has purchased the game](./public/wireframes/postDownload.png)

The Admin page is where the Admin will manage the Admin things such as accounts, payments and patch notes
- The Admin will be able to see all the user accounts in the database, including ones that have been flagged for deletion
- The accounts table will show accounts that have purchased the game at the top and will not be able to be deleted from the database
- The accounts that have not purchased the game will be displayed at the bottom of the table and will be able to be deleted from the database
- Patch notes can both be added and deleted here

![screenshot of the admin page](./public/wireframes/admin.png)