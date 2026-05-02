# Project description

This project is a book forum application. The application presents the user with communities. Within each community are multiple threads and within each thread are multiple posts. A normal user can create threads and posts and interact with other users' threads by posting.


## How to run the app (setup steps)
## Prerequisites

Before getting started, make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download) (v18 or higher recommended)
- MySQL (or MySQL Workbench)

## Database Setup
Open MySQL Workbench or a terminal and run the schema file to create the database and tables.

**CMD or WSL:**
```bash
mysql -u root -p < db/schema.sql
```

**PowerShell:**
```powershell
Get-Content db/schema.sql | mysql -u root -p
```

When prompted, enter your MySQL root password.

Alternatively, open `db/schema.sql` in MySQL Workbench and click the lightning bolt to execute it.

### Environment Variables

Create a `.env` file in the server directory based on the provided `.env.example`:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=yourdbname
JWT_SECRET=yoursecretkey
```

### Installation

Install all dependencies (including Vite) by running the following in both the client and server directories:

```bash
npm install
```

If you do not have nodemon installed, install it globally:

```bash
npm install -g nodemon
```

### Running the App

You will need two separate terminal windows:

**Terminal 1 — Backend:**
```bash
nodemon server.js
```

**Terminal 2 — Frontend:**
```bash
npm run dev
```

The app will be running at `http://localhost:5173` by default.

## User Information

While the database has no special users, it is helpful for testing to know the information of a few user records stored in the database. Only admins can create, edit and delete communities.

username: "Jude",
password: "Jude",
role: "admin"

username: "Isaiah",
password: "Isaiah",
role: "pleb" (not an admin)
