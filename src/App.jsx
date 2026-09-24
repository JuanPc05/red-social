import { SocialProvider } from "./components/SocialContext";
import Navbar from "./components/Navbar";
import ProfileSidebar from "./components/ProfileSidebar";
import Feed from "./components/Feed";
import RightSidebar from "./components/RightSidebar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <SocialProvider>
      <Navbar />
      <div className="w3-container w3-content" style={{ maxWidth: 1400, marginTop: 80 }}>
        <div className="w3-row">
          <ProfileSidebar />
          <Feed />
          <RightSidebar />
        </div>
      </div>
      <br />
      <Footer />
    </SocialProvider>
  );
}
