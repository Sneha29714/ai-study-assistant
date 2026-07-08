import {
  Upload,
  FileText,
  Brain,
  ClipboardList,
  Bookmark,
} from "lucide-react";

const steps = [
  {
    number: 1,
    icon: <Upload size={40} />,
    title: "Upload Your Notes",
    desc: "Upload your notes in PDF, DOCX, or TXT format.",
  },
  {
    number: 2,
    icon: <FileText size={40} />,
    title: "AI Processes Notes",
    desc: "Our AI reads and understands your notes instantly.",
  },
  {
    number: 3,
    icon: <Brain size={40} />,
    title: "Generate Insights",
    desc: "Get summaries, flashcards, quizzes, and more.",
  },
  {
    number: 4,
    icon: <ClipboardList size={40} />,
    title: "Study & Practice",
    desc: "Review flashcards and strengthen understanding.",
  },
  {
    number: 5,
    icon: <Bookmark size={40} />,
    title: "Save & Continue",
    desc: "Save progress and revisit anytime.",
  },
];

function HowItWorks() {
  return (
    <section id="howitworks" className="section-header">

      <div className="section-tag">
        Simple Process
      </div>

      <h2>How It Works</h2>

      <p className="subtitle">
        From upload to insights in just a few simple steps
      </p>

      <div className="steps-container">

        {steps.map((step) => (
          <div className="step-card" key={step.number}>

            <div className="step-number">
              {step.number}
            </div>

            <div className="icon-circle">
              {step.icon}
            </div>

            <h3>{step.title}</h3>

            <p>{step.desc}</p>

          </div>
        ))}

      </div>

    </section>
  );
}

export default HowItWorks;