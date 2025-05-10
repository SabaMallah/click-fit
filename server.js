const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;
//STORING THE IMAGES IN UPLOAD IMAGES FOLDER////////////////
app.use(express.static(path.join(__dirname, "public")));
const uploadDir = path.join(__dirname, "upload_images");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded");
  console.log("Uploaded:", req.file.filename);
  res.json({ success: true, filename: req.file.filename });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//CONNECTING TO SQL SERVER MANAGEMENT STUDIO//////////////////////////////////////
const sql = require("mssql/msnodesqlv8");

const config = {
  connectionString:
    "Driver={ODBC Driver 17 for SQL Server};Server=HP2020;Database=SabaDB;Trusted_Connection=Yes;",
};

async function testConnection() {
  try {
    const pool = await sql.connect(config);
    console.log("Connected to SQL Server");
    pool.close();
  } catch (err) {
    console.error("Connection error:", err);
  }
}
///CALLING THE PROCEDURE TO ADD USER ////////////////////////////////
async function addUser(email, password, type, active) {
  try {
    const pool = await sql.connect(config);
    await pool
      .request()
      .input("email", sql.NVarChar, email)
      .input("password", sql.NVarChar, password)
      .input("type", sql.NVarChar, type)
      .input("active", sql.TinyInt, active)
      .execute("addUser");
    console.log("User added.");
  } catch (err) {
    console.error(" Error adding user:", err);
  }
}

addUser("test@example.com", "pass", "customer", 1);
