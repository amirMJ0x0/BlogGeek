"use client";
import ProfileTabs from "./profile-tabs";
import PublicProfile from "./public-profile";

const PrivateProfile = () => {
  return (
    <>
      <PublicProfile />
      <ProfileTabs />
    </>
  );
};

export default PrivateProfile;
