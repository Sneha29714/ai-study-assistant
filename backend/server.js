const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const app = express();
<<<<<<< HEAD
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err.name);
    console.log(err.message);
    console.log(err);
});
=======
const path = require("path");
const prisma = require("./prisma");
>>>>>>> before-mongodb

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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
    try{
    console.log("UPLOAD ROUTE HIT");
    
    const pdfBuffer = fs.readFileSync(req.file.path);

    const pdfData = await pdfParse(pdfBuffer);

    const note=await prisma.note.create({
        data: {
            title: req.file.originalname.replace(".pdf", ""),
            fileName: req.file.originalname,
            filePath: req.file.path,
            extractedText: pdfData.text,
        }
    });

    res.json({
        message: "File uploaded successfully",
        note
    });
    
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Upload failed" });
    }
});


app.get("/note/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.json(note);

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Server Error"
        });
    }
});

app.delete("/delete-note/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found",
            });
        }

        // Delete PDF from uploads folder
        if (fs.existsSync(note.filePath)) {
            fs.unlinkSync(note.filePath);
        }

        // Delete from MongoDB
        await Note.findByIdAndDelete(id);

        res.json({
            success: true,
            message: "Note deleted successfully",
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});