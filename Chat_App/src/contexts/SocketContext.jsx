import { SOCKET_HOST } from "@/utils/constants.js";
import { useAppStore } from "@/store";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socketInstance, setSocketInstance] = useState(null);
  const { userInfo } = useAppStore();

  useEffect(() => {
    if (userInfo) {
      const newSocket = io(SOCKET_HOST, {
        withCredentials: true,
        query: { userId: userInfo.id },
      });

      setSocketInstance(newSocket);

      newSocket.on("connect", () => {
        console.log("Connected to socket server");
      });

      const storeState = useAppStore.getState();

      const handleReceiveMessage = (message) => {
        const {
          selectedChatData,
          selectedChatType,
          addMessage,
          addContactInDMContacts,
        } = storeState;

        if (
          selectedChatType &&
          (selectedChatData?._id === message.sender._id ||
            selectedChatData?._id === message.recipient._id)
        ) {
          addMessage(message);
        }
        addContactInDMContacts(message);
      };

      const handleReceiveChannelMessage = (message) => {
        const {
          selectedChatData,
          selectedChatType,
          addMessage,
          addChannelInChannelLists,
        } = storeState;

        if (selectedChatType && selectedChatData?._id === message.channelId) {
          addMessage(message);
        }
        addChannelInChannelLists(message);
      };

      const addNewChannel = (channel) => {
        const { addChannel } = storeState;
        addChannel(channel);
      };

      newSocket.on("receiveMessage", handleReceiveMessage);
      newSocket.on("receive-channel-message", handleReceiveChannelMessage); // Fixed typo
      newSocket.on("new-channel-added", addNewChannel);

      return () => {
        newSocket.off("receiveMessage", handleReceiveMessage);
        newSocket.off("receive-channel-message", handleReceiveChannelMessage);
        newSocket.off("new-channel-added", addNewChannel);
        newSocket.disconnect();
      };
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socketInstance}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
