import { Text, View } from "react-native";
import { ChatProvider } from './context/ChatContext'
import ChatScreen from './screens/ChatScreen'
import ChatScreenDemo from './screens/ChatScreenDemo'

export default function Index() {
  return (
    <ChatProvider>
      <ChatScreen />
      {/* <ChatScreenDemo /> */}
    </ChatProvider>
  );
}
