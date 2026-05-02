# Project description

This project is a book forum application. The application presents the user with communities. Within each community are multiple threads and within each thread are multiple posts. A normal user can create threads and posts and interact with other users' threads by posting.


## How to run the app (setup steps)

1. Make sure you have Vite and Node installed
2. Start the server with node and run Vite using the following commands. Click on the link Vite provides in the console to go to the app

```bash
nodemon .\server.js
npm run dev
``` 

in the project root.

## How to set up the database (schema + seed data)

1. Make sure MySQL is running
2. Run the schema file to create the database and tables and seed the data:

```bash
mysql -u root -p < db/schema.sql
```

Or open `db/schema.sql` in MySQL Workbench and execute it.

See [db/schema.sql](./db/schema.sql) for the full schema.

## User Information

While the database has no special users, it is helpful for testing to know the information of a few user records stored in the database. Only admins can create, edit and delete communities.

username: "Jude",
password: "Jude",
role: "admin"

username: "Isaiah",
password: "Isaiah",
role: "pleb" (not an admin)
