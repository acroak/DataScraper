## Example Typescript MySQL Backend API
### Made by Charlie :)

This backend was built off of the 
[official dummy mySQL database](https://github.com/datacharmer/test_db)
.

In order to use this yourself, I would recommend cloning this repo, 
importing it into a mySQL database, and pointing your .env
variables to reflect how you set it up.

I would recommend connecting to the Database first in a tool like
[dbeaver](https://dbeaver.io/) to test your connection variables and any
SQL queries in a very convenient setting.


#### Building the project

Once you clone this, you can run the following to 
build out the repo:
```bash
npm init
```

If you are unfamiliar with typescript, first compile the code with the following:
```bash
npx tsc
```

Then run with:
```bash
node index.js
```

#### Connecting

An example connection string for this is:
```
localhost:8000/api/v1/employee?resultsPerPage=30&page=1
```

As it is implemented now there are 2 http queries:

* resultsPerPage: How many employees will be displayed in one query
* page: The page of employees that we are viewing

