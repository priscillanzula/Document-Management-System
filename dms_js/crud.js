const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017/";
const dbName = "document_management_system";

async function connectDB() {
  try {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    return db.collection("documents");
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    throw err;
  }
}

// 🟢 CREATE with validation
async function createDocument(doc) {
  try {
    if (!doc._id || !doc.title || !doc.content) {
      throw new Error("⚠️ Missing required fields (_id, title, content).");
    }

    const collection = await connectDB();
    const exists = await collection.findOne({ _id: doc._id });
    if (exists) {
      throw new Error(`⚠️ Document with ID "${doc._id}" already exists.`);
    }

    await collection.insertOne(doc);
    console.log("📄 Document created:", doc);
  } catch (err) {
    console.error("❌ Error creating document:", err.message);
  }
}

// 🔵 READ
async function readDocuments() {
  try {
    const collection = await connectDB();
    const docs = await collection.find().toArray();

    if (docs.length === 0) {
      console.log("⚠️ No documents found.");
    } else {
      console.log("📚 Documents:", docs);
    }
    return docs;
  } catch (err) {
    console.error("❌ Error reading documents:", err.message);
  }
}

// 🟡 UPDATE with validation
async function updateDocument(id, updates) {
  try {
    if (!id) throw new Error("⚠️ Document ID is required.");
    if (Object.keys(updates).length === 0) {
      throw new Error("⚠️ At least one field must be updated.");
    }

    const collection = await connectDB();
    const result = await collection.updateOne({ _id: id }, { $set: updates });

    if (result.matchedCount === 0) {
      console.log(`⚠️ No document found with ID "${id}".`);
    } else {
      console.log("✅ Document updated:", updates);
    }
  } catch (err) {
    console.error("❌ Error updating document:", err.message);
  }
}

// 🔴 DELETE with validation
async function deleteDocument(id) {
  try {
    if (!id) throw new Error("⚠️ Document ID is required.");

    const collection = await connectDB();
    const result = await collection.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      console.log(`⚠️ No document found with ID "${id}".`);
    } else {
      console.log("🗑️ Document deleted:", id);
    }
  } catch (err) {
    console.error("❌ Error deleting document:", err.message);
  }
}

// 🔍 QUERY with validation
async function queryDocuments(field, value) {
  try {
    if (!field || !value) {
      throw new Error("⚠️ Both field and value are required for querying.");
    }

    const collection = await connectDB();
    const docs = await collection
      .find({ [field]: { $regex: value, $options: "i" } })
      .toArray();

    if (docs.length === 0) {
      console.log("⚠️ No documents matched your query.");
    } else {
      console.log("🔎 Query results:", docs);
    }
    return docs;
  } catch (err) {
    console.error("❌ Error querying documents:", err.message);
  }
}

// Example usage (safe tests)
(async () => {
  await createDocument({ _id: "1", title: "Valid Doc", content: "Hello MongoDB!" });
  await createDocument({ _id: "1", title: "Duplicate Doc", content: "Should fail." }); // Duplicate test
  await readDocuments();
  await updateDocument("1", { title: "Updated Title" });
  await deleteDocument(""); // Invalid delete test
  await queryDocuments("title", "Updated");
})();
