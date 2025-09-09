Document Management System (DMS)

A simple command-line application built with Node.js and MongoDB to manage documents.
It supports CRUD operations and querying through an interactive CLI interface.

⚙️ 1. Installation & Setup
Prerequisites

Install Node.js
 (v18+ recommended)

Install MongoDB Community Server
 or use MongoDB Atlas (cloud)

Clone or Create Project Folder
cd C:\Users\<your-username>\documents\mongo
mkdir dms_js
cd dms_js

Initialize Node.js Project
npm init -y
npm install mongodb inquirer

Project Structure
dms_js/
│
├── node_modules/           # dependencies
├── package.json
├── package-lock.json
├── crud.js                 # core CRUD operations
└── dms.js                  # interactive CLI

🗄️ 2. Database Setup

Start MongoDB locally:

mongod


(or ensure MongoDB service is running)

Open Mongo Shell:

mongosh


Create database & collection:

use document_management_system
db.createCollection("documents")

🖥️ 3. Running the Application

Run the CLI:

node dms.js


You’ll see a menu:

--- Document Management System ---
? Select an action:
  ▸ Create Document
    Read Documents
    Update Document
    Delete Document
    Query Documents
    Exit

✏️ 4. CRUD Operations
➕ Create

Choose Create Document

Enter:

Unique ID (_id)

Title

Content

Example:

Enter unique document ID: 1
Enter document title: My First Doc
Enter document content: Hello MongoDB!
📄 Document created successfully!

📖 Read

Choose Read Documents

Displays all documents:

📚 Documents:
ID: 1 | Title: My First Doc | Content: Hello MongoDB!

✏️ Update

Choose Update Document

Provide:

Document ID

Field (title/content)

New value

Example:

Enter document ID to update: 1
Select field to update: title
Enter new value: Updated Title
✅ Document updated successfully!

🗑️ Delete

Choose Delete Document

Provide:

Document ID

Example:

Enter document ID to delete: 1
🗑️ Document deleted successfully!

🔍 Query

Choose Query Documents

Provide:

Field (title/content)

Search term

Example:

Search by field: title
Enter search term: Updated
🔍 Search Results:
ID: 1 | Title: Updated Title | Content: Hello MongoDB!

🛡️ 5. Error Handling & Validation

Prevents creating documents with missing fields

Blocks duplicate _id values

Requires valid IDs for update/delete

Displays friendly messages if no documents are found or queries return empty results

🌟 6. Extra Features

Interactive CLI menu using Inquirer.js

Uses MongoDB driver for direct DB operations

Supports case-insensitive regex search in queries

Clean error handling with user-friendly feedback