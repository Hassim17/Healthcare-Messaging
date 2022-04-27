import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ChatBox from "../components/ChatBox";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import { ChatState } from "../Context/chatProvider";

import "../styles/chatPage.scss";

const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div className="chatPage">
      {user && <SideDrawer />}
      <Box className="chatPage-container">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
