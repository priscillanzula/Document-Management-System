#### Document Management System (DMS)

A simple Document Management System built with MongoDB that supports both:

  -  CLI (Command Line Interface) version → Node.js + Inquirer

  - Web version → Python Flask + Jinja templates

It allows users to perform CRUD operations such as Create, Read, Update, Delete and query documents by ID.




https://github.com/user-attachments/assets/45049417-9027-4c0e-8a8f-9212810abe20



#### ✨ Features

 - Create - Add new documents with unique IDs.

 - Read -  View all stored documents.

 - Update - Edit existing documents (title or content).

 - Delete - Remove documents by ID.

 - Query Search documents by ID.

 Validation - Prevents duplicate IDs and empty inputs.

 Error Handling -   error messages for invalid operations. 

#### Two interfaces:

  1. CLI (Node.js)

  2. Web app (Flask)

#### 🛠️ Tech Stack

   - Database: MongoDB

   - CLI: Node.js, Inquirer.js, MongoDB Node.js Driver

   - Web App: Python, Flask, PyMongo, Jinja2

#### Project Structure
```
mongo/
├── dms_js/             
│   ├── dms.js         
│   ├── crud.js        
│   ├── package.json   
│   └── node_modules/
│
└── dms_flask/         
    ├── app.py         
    ├── requirements.txt
    └── templates/     
        ├── base.html
        ├── index.html
        ├── create.html
        └── update.html
```

#### ⚡ Setup Instructions

1. Install MongoDB and Download MongoDB
 

2. Run the CLI Version (Node.js)

Navigate to project folder:

```
 cd dms_js

```

Install dependencies:

```
npm install inquirer mongodb

```
Run the CLI:

 ```
node dms.js

```

Follow the menu to Create, Read, Update, Delete, or Query documents.

3. Run the Web Version (Flask)

Navigate to project folder:

```
cd dms_flask

```

Install dependencies:

```
pip install -r requirements.txt

```

Run Flask app:

```
python app.py

```

##### Open in browser:

http://127.0.0.1:5000/

####  Usage Examples
CLI
? Select an action:
  ❯ Create Document
    Read Documents
    Update Document
    Delete Document
    Query Documents
    Exit


Create - prompts for ID, title, content.

Query - enter an ID, shows matching document.

### Web

Home page → lists all documents.

Create → form to add new documents.

Update/Delete → actions available per document.

Search → enter ID in search bar.

#### 📑 Tasks Completed

  Task 1: Database setup

  Task 2: User Interface (CLI with Inquirer.js)

  Task 3: CRUD operations (MongoDB + Node.js + Flask)

  Task 4: Error handling + validation

  Task 5: Documentation + presentation

#### 🧩 Future Improvements

 Add authentication (users & roles).

 File upload support.

 Pagination for large document sets.

 API endpoints (RESTful) for integration.

### 👩‍💻 Author

Developed by Priscilla✨
