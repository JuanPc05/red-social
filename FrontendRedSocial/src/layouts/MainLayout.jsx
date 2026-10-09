import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSocial } from "../components/SocialContext";

export default function MainLayout({ children }) {
  const { isDarkMode } = useSocial();
  return (
    <div className={isDarkMode ? "w3-dark-grey w3-text-white" : "w3-light-grey"} style={{ minHeight: "100vh" }}>
      <Navbar />
      <div className="w3-container w3-content" style={{ maxWidth: 1400, paddingTop: 80 }}>
        {children}
      </div>
      <br />
      <Footer />
    </div>
  );
}
