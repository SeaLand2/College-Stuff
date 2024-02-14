**To run the backend:**

1.  Install node packages 
        - make sure node.js is installed
        - run `npm install` in command prompt while in the the correct directory

2.  Run the backend
        - make sure your MySQL database is called `healthadvicegroup`
        - make sure `database/databaseHandler.js` has the correct credentials for your MySQL database
        - make sure your database has the correct table names and collumns
            - accounts: accountid, email, password
            - advice: adviceid, title, type, image, description
        - run `node app.js` in command prompt while in the the correct directory