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

// Save a quiz attempt
app.post("/notes/:id/quiz-attempts", async (req, res) => {
  try {
    const noteId = Number(req.params.id);
    const { answers } = req.body;

    if (!Number.isInteger(noteId) || noteId <= 0) {
      return res.status(400).json({ error: "Invalid note ID" });
    }

    if (!Array.isArray(answers)) {
      return res.status(400).json({ error: "Answers must be an array" });
    }

    const note = await prisma.note.findUnique({
      where: { id: noteId },
      select: { quiz: true },
    });

    if (!note || !note.quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    const questions = JSON.parse(note.quiz);

    if (
      !Array.isArray(questions) ||
      questions.length === 0 ||
      answers.length !== questions.length
    ) {
      return res.status(400).json({ error: "Invalid quiz answers" });
    }

    let score = 0;

    questions.forEach((question, index) => {
      if (
        typeof answers[index] === "string" &&
        answers[index].trim() === question.correctAnswer?.trim()
      ) {
        score++;
      }
    });

    const attempt = await prisma.quizAttempt.create({
      data: {
        noteId,
        score,
        totalQuestions: questions.length,
      },
    });

    res.status(201).json({
      message: "Quiz attempt saved",
      attempt,
    });
  } catch (error) {
    console.error("Error saving quiz attempt:", error);
    res.status(500).json({ error: "Failed to save quiz attempt" });
  }
});

// Get quiz attempt history
app.get("/notes/:id/quiz-attempts", async (req, res) => {
  try {
    const noteId = Number(req.params.id);

    if (!Number.isInteger(noteId) || noteId <= 0) {
      return res.status(400).json({ error: "Invalid note ID" });
    }

    const attempts = await prisma.quizAttempt.findMany({
      where: { noteId },
      orderBy: { attemptedAt: "desc" },
    });

    res.json(attempts);
  } catch (error) {
    console.error("Error fetching quiz attempts:", error);
    res.status(500).json({ error: "Failed to fetch quiz history" });
  }
});


app.get("/progress/dashboard", async (req, res) => {
  try {
    const attempts = await prisma.quizAttempt.findMany({
      orderBy: { attemptedAt: "asc" },
      include: {
        note: {
          select: {
            title: true,
          },
        },
      },
    });

    const totalAttempts = attempts.length;

    const totalQuestions = attempts.reduce(
      (sum, attempt) => sum + attempt.totalQuestions,
      0
    );

    const totalCorrect = attempts.reduce(
      (sum, attempt) => sum + attempt.score,
      0
    );

    const averageAccuracy =
      totalQuestions > 0
        ? Math.round((totalCorrect / totalQuestions) * 100)
        : 0;

    const bestAttempt = attempts.reduce(
      (best, attempt) => {
        if (!best) return attempt;

        const currentAccuracy =
          attempt.totalQuestions > 0
            ? attempt.score / attempt.totalQuestions
            : 0;

        const bestAccuracy =
          best.totalQuestions > 0
            ? best.score / best.totalQuestions
            : 0;

        return currentAccuracy > bestAccuracy ? attempt : best;
      },
      null
    );

    const quizzesCompleted = new Set(
      attempts.map((attempt) => attempt.noteId)
    ).size;

    const recentAttempts = [...attempts]
      .reverse()
      .slice(0, 10)
      .map((attempt) => ({
        id: attempt.id,
        noteId: attempt.noteId,
        noteTitle: attempt.note.title || "Untitled Note",
        score: attempt.score,
        totalQuestions: attempt.totalQuestions,
        accuracy:
          attempt.totalQuestions > 0
            ? Math.round(
                (attempt.score / attempt.totalQuestions) * 100
              )
            : 0,
        attemptedAt: attempt.attemptedAt,
      }));

    res.json({
      totalAttempts,
      averageAccuracy,
      bestAttempt: bestAttempt
        ? {
            score: bestAttempt.score,
            totalQuestions: bestAttempt.totalQuestions,
            accuracy: Math.round(
              (bestAttempt.score / bestAttempt.totalQuestions) * 100
            ),
          }
        : null,
      quizzesCompleted,
      recentAttempts,
      
    scoreTrend: attempts.map((a, index) => ({
        id: a.id,
        noteId: a.noteId,
        noteTitle: a.note.title || "Untitled Note",
    accuracy:
        a.totalQuestions > 0
            ? Math.round((a.score / a.totalQuestions) * 100)
            : 0,
    attemptedAt: a.attemptedAt,
    topicAttempt: attempts
        .slice(0, index + 1)
        .filter((previous) => previous.noteId === a.noteId).length,
    })),

    });
  } catch (error) {
    console.error("Error fetching progress dashboard:", error);
    res.status(500).json({
      error: "Failed to load progress dashboard",
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});