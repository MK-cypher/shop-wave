import ChangePassword from "./changePassword";
import RecentLogin from "./recentLogin";

export default function SecurityTab({sessions, userData}: {sessions: any; userData: any}) {
  return (
    <div className="max-sm:mt-5">
      <ChangePassword userData={userData} />
      <RecentLogin activity={sessions} />
    </div>
  );
}
