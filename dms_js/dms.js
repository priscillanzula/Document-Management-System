const { MongoClient } = require("mongodb");
const inquirer = require("inquirer").default;

const url = "mongodb://127.0.0.1:27017/";
const dbName = "document_management_system";
let collection;

async function connectDB() {
  try {
    const client = new MongoClient(url);
    await client.connect();
    console.log("✅ Connected to MongoDB");
    const db = client.db(dbName);
    collection = db.collection("documents");
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1);
  }
}

// 🟢 CREATE
async function createDocument() {
  try {
    const answers = await inquirer.prompt([
      { name: "id", message: "Enter unique document ID:" },
      { name: "title", message: "Enter document title:" },
      { name: "content", message: "Enter document content:" },
    ]);

    if (!answers.id || !answers.title || !answers.content) {
      console.log("⚠️ All fields (ID, title, content) are required.");
      return;
    }

    const exists = await collection.findOne({ _id: answers.id });
    if (exists) {
      console.log(`⚠️ Document with ID "${answers.id}" already exists.`);
      return;
    }

    await collection.insertOne({
      _id: answers.id,
      title: answers.title,
      content: answers.content,
    });
    console.log("📄 Document created successfully!");
  } catch (err) {
    console.error("❌ Error creating document:", err.message);
  }
}

// 🔵 READ
async function readDocuments() {
  try {
    const docs = await collection.find().toArray();
    if (docs.length === 0) {
      console.log("⚠️ No documents found.");
    } else {
      console.log("\n📚 Documents:");
      docs.forEach((doc) => {
        console.log(`ID: ${doc._id} | Title: ${doc.title} | Content: ${doc.content}`);
      });
    }
  } catch (err) {
    console.error("❌ Error reading documents:", err.message);
  }
}

// 🟡 UPDATE
async function updateDocument() {
  try {
    const { id, field, value } = await inquirer.prompt([
      { name: "id", message: "Enter document ID to update:" },
      { name: "field", type: "list", message: "Select field to update:", choices: ["title", "content"] },
      { name: "value", message: "Enter new value:" },
    ]);

    if (!id || !value) {
      console.log("⚠️ Document ID and new value are required.");
      return;
    }

    const result = await collection.updateOne({ _id: id }, { $set: { [field]: value } });
    result.matchedCount
      ? console.log("✅ Document updated successfully!")
      : console.log(`⚠️ Document with ID "${id}" not found.`);
  } catch (err) {
    console.error("❌ Error updating document:", err.message);
  }
}

// 🔴 DELETE
async function deleteDocument() {
  try {
    const { id } = await inquirer.prompt([
      { name: "id", message: "Enter document ID to delete:" },
    ]);

    if (!id) {
      console.log("⚠️ Document ID is required.");
      return;
    }

    const result = await collection.deleteOne({ _id: id });
    result.deletedCount
      ? console.log("🗑️ Document deleted successfully!")
      : console.log(`⚠️ Document with ID "${id}" not found.`);
  } catch (err) {
    console.error("❌ Error deleting document:", err.message);
  }
}

// 🔍 QUERY
async function queryDocuments() {
  try {
    const { id } = await inquirer.prompt([
      { name: "id", message: "Enter document ID to search:" },
    ]);

    if (!id) {
      console.log("⚠️ Document ID is required.");
      return;
    }

    const doc = await collection.findOne({ _id: id });
    if (doc) {
      console.log(
        `\n🔍 Found Document:\nID: ${doc._id} | Title: ${doc.title} | Content: ${doc.content}`
      );
    } else {
      console.log(`⚠️ No document found with ID "${id}".`);
    }
  } catch (err) {
    console.error("❌ Error querying documents:", err.message);
  }
}


// 🏠 MAIN MENU
async function mainMenu() {
  while (true) {
    const { choice } = await inquirer.prompt([
      {
        type: "list",
        name: "choice",
        message: "Select an action:",
        choices: [
          "Create Document",
          "Read Documents",
          "Update Document",
          "Delete Document",
          "Query Documents",
          "Exit",
        ],
      },
    ]);

    if (choice === "Create Document") await createDocument();
    else if (choice === "Read Documents") await readDocuments();
    else if (choice === "Update Document") await updateDocument();
    else if (choice === "Delete Document") await deleteDocument();
    else if (choice === "Query Documents") await queryDocuments();
    else if (choice === "Exit") {
      console.log("👋 Exiting...");
      process.exit();
    }
  }
}

(async () => {
  await connectDB();
  await mainMenu();
})();
