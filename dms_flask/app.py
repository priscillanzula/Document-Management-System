from flask import Flask, render_template, request, redirect, url_for, flash
from pymongo import MongoClient

app = Flask(__name__)
app.secret_key = "supersecretkey"  # for flash messages

# MongoDB connection
client = MongoClient("mongodb://127.0.0.1:27017/")
db = client["document_management_system"]
collection = db["documents"]

# 🏠 Home (Read all)


@app.route("/")
def index():
    docs = list(collection.find())
    return render_template("index.html", docs=docs)

# ➕ Create


@app.route("/create", methods=["GET", "POST"])
def create():
    if request.method == "POST":
        doc_id = request.form.get("id")
        title = request.form.get("title")
        content = request.form.get("content")

        if not doc_id or not title or not content:
            flash("⚠️ All fields are required!", "error")
            return redirect(url_for("create"))

        if collection.find_one({"_id": doc_id}):
            flash("⚠️ Document ID already exists!", "error")
            return redirect(url_for("create"))

        collection.insert_one(
            {"_id": doc_id, "title": title, "content": content})
        flash("✅ Document created successfully!", "success")
        return redirect(url_for("index"))

    return render_template("create.html")

# ✏️ Update


@app.route("/update/<doc_id>", methods=["GET", "POST"])
def update(doc_id):
    doc = collection.find_one({"_id": doc_id})
    if not doc:
        flash("⚠️ Document not found!", "error")
        return redirect(url_for("index"))

    if request.method == "POST":
        title = request.form.get("title")
        content = request.form.get("content")

        if not title or not content:
            flash("⚠️ Title and content are required!", "error")
            return redirect(url_for("update", doc_id=doc_id))

        collection.update_one(
            {"_id": doc_id}, {"$set": {"title": title, "content": content}})
        flash("✅ Document updated successfully!", "success")
        return redirect(url_for("index"))

    return render_template("update.html", doc=doc)

# 🗑️ Delete


@app.route("/delete/<doc_id>")
def delete(doc_id):
    result = collection.delete_one({"_id": doc_id})
    if result.deleted_count:
        flash("🗑️ Document deleted successfully!", "success")
    else:
        flash("⚠️ Document not found!", "error")
    return redirect(url_for("index"))

# 🔍 Search


@app.route("/search", methods=["POST"])
def search():
    query = request.form.get("query")

    if not query:
        flash("⚠️ Search term cannot be empty!", "error")
        return redirect(url_for("index"))

    doc = collection.find_one({"_id": query})
    docs = [doc] if doc else []

    if not docs:
        flash("⚠️ No document found with that ID!", "error")

    return render_template("index.html", docs=docs)


if __name__ == "__main__":
    app.run(debug=True)
