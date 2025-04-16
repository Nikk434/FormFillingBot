import { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import { BsChatLeftTextFill } from 'react-icons/bs';

const ChatArea = ({ messages, onButtonClick }) => {
  const chatContainerRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Add "today" date header
  const renderMessages = () => {
    if (messages.length === 0) return null;
    
    return (
      <>
        <div className="flex justify-center my-3">
          <div className="bg-[#E1F2FA] text-[#76a6b6] text-xs font-medium px-3 py-1 rounded-md shadow-sm">
            TODAY
          </div>
        </div>
        {messages.map((message, index) => (
          <ChatMessage 
            key={index}
            message={message}
            onButtonClick={onButtonClick}
          />
        ))}
      </>
    );
  };

  return (
    <div 
      ref={chatContainerRef}
      className="flex-1 overflow-y-auto py-2 px-1 sm:p-4 scrollbar-custom chat-background"
      id="chatMessages"
    >
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full opacity-80">
          <div className="w-16 h-16 mb-4 bg-[#e9edef] rounded-full flex items-center justify-center">
            <BsChatLeftTextFill className="w-8 h-8 text-[#d0d6d9]" />
          </div>
          <p className="text-gray-600 text-sm font-medium">Welcome to WhatsApp</p>
          <p className="text-gray-500 text-xs mt-1 text-center max-w-xs">
            Send a message to start chatting with the {messages.length ? '' : 'selected '} bot
          </p>
        </div>
      ) : (
        renderMessages()
      )}
    </div>
  );
};

export default ChatArea;
