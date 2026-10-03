import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="w3-container w3-content" style={{ maxWidth: 1400, marginTop: 80 }}>
        {children}
      </div>
      <br />
      <Footer />
    </>
  );
}
