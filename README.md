# BTF_Express
Express app to track a users various social media profiles

This project requires npm, node, express, express-handlebars (templating,) body-parser, and mongoose (to connect to mongodb,) mocha, chai, and chai-http. These node modules have been included in this repository but if you download without them then adding them will become essential. You can achieve this with the command 'npm install express express-handlebars body-parser mongoose mocha, chai, chai-http --save' (once npm and node are installed.)

You will also need a mongodb installation. I suggest going to mongodb.com --> software --> community --> download. Once mongo is downloaded you must open a command prompt and navigate to where your mongo download is. For me this is c:\Program Files\MongoDB\Server\4.4\bin. Once you are there run mongod.exe to start your database servers. For me it started on port 27017 so I set the code in my db schema 'Users.js' to correspond with this. If for some reason if your server is running on another port you can edit this code 'mongoose.connect('mongodb://localhost:27017/btf_profile');' in Users.js to reflect the port.

Now you should be set up. You can navigate to where you downloaded the project and run 'node index.js' to launch the project. You can then view it by navigating to localhost:3000 on your chosen web browser. You can run the test suite using npm test. At any time you can visit localhost:3000/showall to print all data in the db to the screen. This was useful to me in testing and I'm leaving it in as I continue to work on this project.
