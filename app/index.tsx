import { Text, View } from "react-native";
import { ChatProvider } from './context/ChatContext'
import ChatScreen from './screens/ChatScreen'

export default function Index() {
  return (
    <ChatProvider>
      <ChatScreen />
    </ChatProvider>
  );
}
