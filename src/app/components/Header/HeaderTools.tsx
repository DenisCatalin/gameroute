import React from "react";
import Profile from "./Profile";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { CiLogin } from "react-icons/ci";

const HeaderTools = async () => {
  let authenticated: boolean;
  const { isAuthenticated, getPermissions, getUser } = getKindeServerSession();
  const permissions = await getPermissions();
  const user = await getUser();

  const displayName = user?.family_name + " " + user?.given_name;

  if (await isAuthenticated()) {
    authenticated = true;
  } else {
    authenticated = false;
  }

  return (
    <div className="flex justify-evenly items-center h-20 max-w-32s relative">
      {/* <Search /> */}
      {authenticated ? (
        <Profile
          permissions={permissions?.permissions}
          userEmail={user?.email}
          userPicture={user?.picture}
          userID={user?.id}
          userName={displayName}
        />
      ) : (
        <LoginLink className="font-bold w-24 h-12 flex items-center justify-between transition rounded-regular px-2 hover:shadow-headerLightShadow hover:dark:shadow-headerDarkShadow">
          <CiLogin className="w-5 h-5" />
          Sign In
        </LoginLink>
      )}
    </div>
  );
};

export default HeaderTools;
