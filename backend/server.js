const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const app = express();
const path = require("path");
const prisma = require("./prisma");
require("dotenv").config();
const { generateSummary, generateFlashcards, generateQuiz, } = require("./ai");
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
    
    const file = req.file;
    let extractedText = "";

    if (file.mimetype === "application/pdf") {
    const pdfBuffer = fs.readFileSync(file.path);
    const pdfData = await pdfParse(pdfBuffer);
    extractedText = pdfData.text;
    }
    else if (file.mimetype.startsWith("image/")) {
    // TODO: OCR code here
    }
    else if (
    file.mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
    // TODO: DOCX parser here
    }
    else {
    return res.status(400).json({
        message: "Unsupported file type"
    });
}

const note = await prisma.note.create({
    data: {
        title: path.parse(file.originalname).name,
        fileName: file.originalname,
        filePath: file.path,
        extractedText: extractedText,
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

app.post("/notes/:id/summary", async (req, res) => {
    try {
        const id = Number(req.params.id);

        const note = await prisma.note.findUnique({
            where: { id }
        });

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        if (!note.extractedText) {
            return res.status(400).json({
                message: "No extracted text available"
            });
        }

        const summary = await generateSummary(note.extractedText);

        await prisma.note.update({
            where: { id },
            data: {
                summary: summary
            }
        });

        res.json({
            summary
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Summary generation failed"
        });
    }
});

app.post("/notes/:id/flashcards", async (req, res) => {
    try {
        const id = Number(req.params.id);

        const note = await prisma.note.findUnique({
            where: { id }
        });

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        if (!note.extractedText) {
            return res.status(400).json({
                message: "No extracted text available"
            });
        }

        const flashcards = await generateFlashcards(note.extractedText);

        await prisma.note.update({
            where: { id },
            data: {
                flashcards: flashcards
            }
        });

        res.json({
            flashcards
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Flashcard generation failed"
        });
    }
});

app.post("/notes/:id/quiz", async (req, res) => {
    try {
        const id = Number(req.params.id);

        const note = await prisma.note.findUnique({
            where: { id }
        });

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        if (!note.extractedText) {
            return res.status(400).json({
                message: "No extracted text available"
            });
        }

        const quiz = await generateQuiz(note.extractedText);

        await prisma.note.update({
            where: { id },
            data: {
                quiz: quiz
            }
        });

        res.json({
            quiz
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Quiz generation failed"
        });
    }
});

app.get("/notes", async (req, res) => {
    try {
        const notes = await prisma.note.findMany({
            orderBy: {    
             uploadedAt: "desc",
            },
        });

        res.json(notes);

    } catch (err) {
        res.status(500).json({
           error:err.message
        });
    }
});

app.get("/notes/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        const note = await prisma.note.findUnique({
            where: { id }
        });

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.json(note);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
});

app.delete("/notes/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.note.delete({
      where: { id }
    });

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/test-ai", async (req, res) => {
    try {
        const summary = await generateSummary(
            "Java is an object-oriented programming language. It supports inheritance, polymorphism, encapsulation and abstraction."
        );

        res.json({
            summary,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message,
        });
    }
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});