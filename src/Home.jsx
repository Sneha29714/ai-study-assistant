import UploadNotes from "./components/UploadNotes";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import './App.css'

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <HowItWorks />
      <UploadNotes />
    </div>
  );
}

export default Home;