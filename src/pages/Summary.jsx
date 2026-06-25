import "./Summary.css";

function Summary() {
  const summary = `
CPU Scheduling is the process of selecting
which process should execute next.

The main scheduling algorithms are:
1. FCFS
2. SJF
3. Round Robin

Scheduling improves CPU utilization and system performance.
`;

  return (
    <section className="summary-page">
      <div className="summary-header">
        <div className="section-tag">Summary</div>

        <h2>AI Generated Summary</h2>

        <p>
          Key concepts extracted from your notes.
        </p>
      </div>

      <div className="summary-card">
        <h3>Operating System Notes</h3>

        <p>{summary}</p>
      </div>
    </section>
  );
}

export default Summary;