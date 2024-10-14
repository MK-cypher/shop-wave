import React from "react";
import ProfileUpdate from "./ProfileUpdate";

export default function GeneralTab({userData}: {userData: any}) {
  return (
    <div className="max-sm:mt-5">
      <ProfileUpdate userData={userData} />
    </div>
  );
}
