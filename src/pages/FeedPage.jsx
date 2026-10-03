import ProfileSidebar from "../components/ProfileSidebar";
import Feed from "../components/Feed";
import RightSidebar from "../components/RightSidebar";

export default function FeedPage() {
  return (
    <div className="w3-row">
      <ProfileSidebar />
      <Feed />
      <RightSidebar />
    </div>
  );
}
