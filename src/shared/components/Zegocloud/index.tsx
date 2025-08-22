import React from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { log } from "console";

const InviteButton = () => {
  const userID = "03204608756";
  const userName = "Salim";
  const appID = 313814609;
  const serverSecret = "1d0ce4f5331b3e3e31ef568e8a69abce";

  const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    userID,
    userName
  );

  const zp = ZegoUIKitPrebuilt.create(TOKEN);

  // zp.addPlugins({ ZIM });
  const invite = () => {
    const targetUser = {
      userID: "03204608756", // Replace with the actual target user ID
      userName: "King Roger", // Replace with the actual target user name
    };
    zp?.sendCallInvitation({
      callees: [targetUser],
      callType: ZegoUIKitPrebuilt.InvitationTypeVideoCall,
      timeout: 60, // Timeout duration (second). 60s by default, range from [1-600s].
    })
      .then((res) => {
        // console.warn(res);
      })
      .catch((err: any) => {
        // console.warn(err);
      });
  };

  return <button onClick={invite}>Invite</button>;
};

export default InviteButton;
