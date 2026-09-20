import Navbar from "./components/navbar/navbar";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <section className="hero">
          <p className="hero-label">INTERNSHIP TRACKER</p>

          <h1>
            Find internships.
            <br />
            <span>Build your future.</span>
          </h1>

          <p className="hero-description">
            Discover internship opportunities from multiple platforms,
            all in one place.
          </p>

          <button className="hero-button">
            Explore internships
          </button>
        </section>
      </main>
    </>
  );
}

export default App;