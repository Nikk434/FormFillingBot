import { useState, useEffect } from 'react';
import ChatArea from './ChatArea';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import BotSelection from './BotSelection';
import { botList } from '../../data/botData';
import { sendMessage } from '../../utils/api';

const WhatsAppUI = () => {
  const [selectedBotId, setSelectedBotId] = useState('health-bot');
  const [showBotSelection, setShowBotSelection] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const selectedBot = botList.find(bot => bot.id === selectedBotId) || botList[0];

  useEffect(() => {
    // Reset messages and send welcome message when bot changes
    setMessages([]);
    handleWelcomeMessage();
  }, [selectedBotId]); // This will trigger when the bot changes

  const handleWelcomeMessage = async () => {
    try {
      setLoading(true);
      const response = await sendMessage("");
      
      if (response && response.status === "success" && response.message) {
        setMessages([formatMessage(response.message)]);
      } else {
        // Handle the case where there's no response or message
        setMessages([{
          sender: 'bot',
          type: 'text',
          text: { body: `Welcome to ${selectedBot.name}! How can I help you today?` },
          timestamp: new Date(),
          buttonsDisabled: false
        }]);
      }
    } catch (error) {
      console.error("Error sending welcome message:", error);
      // Display a fallback welcome message if API fails
      setMessages([{
        sender: 'bot',
        type: 'text',
        text: { body: `Welcome to ${selectedBot.name}! How can I help you today?` },
        timestamp: new Date(),
        buttonsDisabled: false
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (text) => {
    // Add user message to chat
    const userMessage = {
      sender: 'user',
      type: 'text',
      text: { body: text },
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    try {
      setLoading(true);
      const response = await sendMessage(text);
      
      if (response && response.status === "success" && response.message) {
        setMessages(prev => [...prev, formatMessage(response.message)]);
      } else {
        // Handle the case where API fails
        setMessages(prev => [...prev, {
          sender: 'bot',
          type: 'text',
          text: { body: "I received your message. How can I assist you further?" },
          timestamp: new Date(),
          buttonsDisabled: false
        }]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Add a fallback response if API fails
      setMessages(prev => [...prev, {
        sender: 'bot',
        type: 'text',
        text: { body: "I received your message. How can I assist you further?" },
        timestamp: new Date(),
        buttonsDisabled: false
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = async (buttonId, buttonText) => {
    // Add user message showing the button text
    const userMessage = {
      sender: 'user',
      type: 'text',
      text: { body: buttonText },
      timestamp: new Date()
    };
    
    // Disable buttons in the last bot message
    setMessages(prev => {
      const updatedMessages = [...prev];
      for (let i = updatedMessages.length - 1; i >= 0; i--) {
        if (updatedMessages[i].sender === 'bot' && updatedMessages[i].type === 'interactive') {
          updatedMessages[i] = { ...updatedMessages[i], buttonsDisabled: true };
          break;
        }
      }
      return [...updatedMessages, userMessage];
    });
    
    try {
      setLoading(true);
      // Send the button text as a message to the backend
      const response = await sendMessage(buttonText);
      
      if (response && response.status === "success" && response.message) {
        setMessages(prev => [...prev, formatMessage(response.message)]);
      } else {
        // Handle the case where API fails
        setMessages(prev => [...prev, {
          sender: 'bot',
          type: 'text',
          text: { body: "Thanks for your selection. How else can I help you?" },
          timestamp: new Date(),
          buttonsDisabled: false
        }]);
      }
    } catch (error) {
      console.error("Error sending button click:", error);
      // Add a fallback response if API fails
      setMessages(prev => [...prev, {
        sender: 'bot',
        type: 'text',
        text: { body: "Thanks for your selection. How else can I help you?" },
        timestamp: new Date(),
        buttonsDisabled: false
      }]);
    } finally {
      setLoading(false);
    }
  };

  const formatMessage = (messageData) => {
    if (!messageData) return null;
    
    // Handle WhatsApp API response format
    if (typeof messageData === 'object' && messageData.messaging_product === 'whatsapp') {
      const message = {
        sender: 'bot',
        timestamp: new Date(),
        buttonsDisabled: false
      };
      
      // Handle interactive/button messages
      if (messageData.type === 'interactive' && messageData.interactive?.type === 'button') {
        message.type = 'interactive';
        message.text = messageData.text || { body: "How can I help you?" };
        message.interactive = messageData.interactive;
      } 
      // Handle text messages
      else if (messageData.type === 'text' && messageData.text) {
        message.type = 'text';
        message.text = messageData.text;
      }
      // Handle any other message type
      else {
        message.type = 'text';
        message.text = { body: "Message received" };
      }
      
      return message;
    }
    
    // For string responses or other formats
    if (typeof messageData === 'string') {
      return {
        sender: 'bot',
        type: 'text',
        text: { body: messageData },
        timestamp: new Date(),
        buttonsDisabled: false
      };
    }
    
    // Default handling
    return {
      sender: 'bot',
      ...messageData,
      timestamp: new Date(),
      buttonsDisabled: false
    };
  };

  const toggleBotSelection = () => {
    setShowBotSelection(!showBotSelection);
  };

  const handleSelectBot = (botId) => {
    setSelectedBotId(botId);
    setShowBotSelection(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 w-full md:max-w-xl lg:max-w-2xl mx-auto shadow-lg">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <ChatHeader 
          selectedBot={selectedBot}
          toggleBotSelection={toggleBotSelection}
        />
        
        <ChatArea 
          messages={messages} 
          onButtonClick={handleButtonClick}
        />
        
        <ChatInput 
          onSendMessage={handleSendMessage} 
          isLoading={loading}
        />
        
        {/* Bot Selection Dropdown */}
        {showBotSelection && (
          <BotSelection 
            bots={botList}
            onSelectBot={handleSelectBot}
          />
        )}
      </div>
    </div>
  );
};

export default WhatsAppUI;
