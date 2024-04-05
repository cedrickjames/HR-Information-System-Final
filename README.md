# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
### Test Local
npm start
cd server
npm run devStart

### Deployment
hr-app > npm run Build
copy the files from generated folder after run build to server folder in build folder and public folder
server> pm2 start index.js
then go to localhost:3001/dashboard or 192.168.60.53:3001/

if npm start does not work, try to use yarn install (to install yarn) then run yarn add node-sass

under server> public >index.html, add <link href="css/style.css" rel="stylesheet"> inside the head.
This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
#   H R - I n f o r m a t i o n - S y s t e m - F i n a l 


Deployment of Employee Salary Management in Windows.

Software needed:
1.	Xampp
2.	Node.js
3.	Pm2
4.	Git
5.	Yarn
6.	Visual Studio Code
Before we deploy, open your VS Code and replace all “192.168.60.53” to “127.0.0.1”. Please refer to image below.

 

Importing database.

1.	In your browser, go to http://localhost/phpmyadmin/ 
2.	Create a new database named “hr_information_system” with the collation of “utf8mb4_general_ci”
3.	Import the sql file. (This file will be given by the developer)
4.	Make sure that the history table and salaryincrease table is empty.
Importing the csv file
5.	In the hr_information_system database, go to “Import” then choose your file.
6.	Add 1 to “Skip this number of queries (for SQL) starting from the first one:” (This will skip the column names from your csv)
7.	Change the format to CSV.
8.	Then click Import. When importing has finished. You can now proceed to deployment.

Install  PM2
1.	Open your terminal and run  “npm install pm2 -g”

How to deploy?
1.	Install your xampp, node.js and git
2.	Open command prompt and enter cd xampp/htdocs/
3.	Enter “git clone https://github.com/cedrickjames/HR-Information-System-Final.git”
4.	When finished, rename the folder to “hr-app”
5.	Go back to command prompt and navigate to the hr-app folder. That would be cd xampp/htdocs/hr-app
6.	Enter “npm install”
7.	If the installation failed. Try to use node-sass. To do this, install the “yarn” first. Enter “npm install --global yarn”.
8.	To install node-sass, just enter yarn add node-sass.
9.	When the installation has finished, proceed to deployment. 
DEPLOYMENT
10.	In command prompt, navigate to hr-app and run “npm run build”. This will generate a build folder inside the hr-app folder.
11.	Copy all the files from that folder. Open the server>build folder and paste the files. 
12.	Repeat the step 11 to server>public folder. 
13.	Next is, go back to the command prompt and navigate to the server folder and run “pm2 start index.js”
14.	You can now access the web application from your browser via ipaddress:3001. Just replace the “ipaddress” of your ip address. 

Note: You can create a batch file the will run the “cd xampp/htdocs/hr-app/server” and “pm2 start index.js”. Paste the batch file to your start-up folder to start the server everytime you open the computer. 






 
 
