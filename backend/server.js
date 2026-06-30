const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is running...");
});

app.get("/api/test", (req, res) => {
    res.json({
        message: "Hello from Express!"
    });
});

// multer setup here
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "uploads/");
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage:storage });


app.post("/upload", upload.single("file"), async (req, res)=>{
    console.log("UPLOAD ROUTE HIT");
    console.log(req.file);
    console.log(req.file.path);
    const pdfBuffer = fs.readFileSync(req.file.path);

    const pdfData = await pdfParse(pdfBuffer);

    console.log(pdfData.text);
    res.json({
        message: "File uploaded successfully",
        file: req.file
    });

});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});