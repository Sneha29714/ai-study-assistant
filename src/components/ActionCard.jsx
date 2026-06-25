function ActionCard({ icon, title, description, onClick }) {
  return (
    <div className="action-card" onClick={onClick}>
      <div className="card-icon">{icon}</div>

      <h4>{title}</h4>

      <p>{description}</p>
    </div>
  );
}

export default ActionCard;