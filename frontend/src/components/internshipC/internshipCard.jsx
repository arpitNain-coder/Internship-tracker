function internshipCard({ internship }) {
  return (
    <article className="internship-card">
      <p className="internship-company">{internship.company}</p>

      <h2>{internship.title}</h2>

      <p className="internship-location">
        📍 {internship.location}
      </p>
    </article>
  );
}

export default internshipCard;