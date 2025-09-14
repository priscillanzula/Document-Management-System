#### Document Management System (DMS)

A simple Document Management System built with MongoDB that supports both:

  -  CLI (Command Line Interface) version  and  Node.js 

  - Web version  using Python Flask s

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



#### 🧩 Future Improvements

 Add authentication (users & roles).

 File upload support.

 Pagination for large document sets.

 API endpoints (RESTful) for integration.

### Priscilla Nzula

Developed by Priscilla✨
