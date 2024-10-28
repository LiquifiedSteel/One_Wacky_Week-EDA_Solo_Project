# One Wacky Week Download Site

A website that will be used in the future for selling the video game I am going to make.

## Description

If you want to create a copy of this code and get it working on your computer, you will need to `npm install`, `npm run server`, and `npm run client`. You will also need to create a .env file that will hold your own stripe and cloudinary secrets
- 'SERVER_SESSION_SECRET'
- 'GAME_COST'
- 'VITE_CLOUDINARY_NAME'
- 'VITE_CLOUDINARY_UPLOAD_PRESET'

Every page has the Navbar displayed at the top and it is setup for desktop and mobile view
- There is a `Login / Register` button that will be replaced with the user's username and profile picture upon login.
- The Navbar has a `download` link that will navigate to the download page and will only show if the user is logged in.
- The `about` link will navigate the user to the about page.
- The `home` link will navigate the user to the home page.

![screenshot of the navbar on a desktop screen](./public/wireframes/navExp.png)

![screenshot of the nabar on a mobile device](./public/wireframes/navCond.png)

The Home/Landing page is the first page that a user will see
- It will have a Navbar which will have links to the about page, the download page, and the sign-in page.
- The game's patch notes will be displayed on the page from most recent to oldest.
- The game's banner which will be displayed above the patch notes
- The creator's socials will be displayed, since all I have and use is Discord, it will be the only listed social.


![screenshot of the home page](./public/wireframes/.png)


