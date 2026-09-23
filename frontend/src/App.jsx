import { useEffect, useState } from "react";
import Navbar from "./components/navbar/navbar";
import InternshipCard from "./components/internshipC/internshipCard";
import "./App.css";

function App() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/internships")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch internships");
        }

        return response.json();
      })
      .then((data) => {
        setInternships(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const exploreInternships = () => {
    document.getElementById("internships").scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      <Navbar />

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-content">
            <p className="hero-label">INTERNSHIP TRACKER</p>

            <h1>
              Find your next
              <br />
              <span>opportunity.</span>
            </h1>

            <p className="hero-description">
              Internship opportunities collected from multiple platforms,
              brought together in one place.
            </p>

            <button
              className="hero-button"
              onClick={exploreInternships}
            >
              Explore internships
              <span>↓</span>
            </button>
          </div>

          <div className="hero-glow"></div>
        </section>

        {/* INTERNSHIPS */}
        <section className="internships-section" id="internships">
          <div className="section-heading">
            <div>
              <p>OPPORTUNITIES</p>
              <h2>Latest internships</h2>
            </div>

            <span className="internship-count">
              {internships.length} opportunities
            </span>
          </div>

          {loading ? (
            <div className="loading">
              Loading opportunities...
            </div>
          ) : (
            <div className="internship-grid">
              {internships.map((internship) => (
                <InternshipCard
                  key={internship._id}
                  internship={internship}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default App;