function ActionCard({ icon, title, description, onClick, selected }) {
  return (
    <div className={`action-card ${selected ? "selected" : ""}`} onClick={onClick}>
      <div className="card-icon">{icon}</div>

      <h4>{title}</h4>

      <p>{description}</p>
    </div>
  );
}

export default ActionCard;