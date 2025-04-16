import { useState } from 'react';
import { FaSmile, FaPaperclip, FaMicrophone, FaTimes, FaSpinner } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-whatsapp-lightGray p-2 sm:p-3 flex items-center">
      <button className="focus:outline-none text-gray-500 p-1.5 sm:p-2 rounded-full hover:bg-gray-200">
        <FaSmile className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
      <button className="focus:outline-none text-gray-500 p-1.5 sm:p-2 rounded-full hover:bg-gray-200 mx-1 sm:mx-2">
        <FaPaperclip className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
      <form onSubmit={handleSubmit} className="flex-1 flex items-center">
        <div className="relative flex-1">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isLoading ? "Bot is typing..." : "Type a message"}
            className="w-full py-2 px-3 sm:px-4 rounded-full focus:outline-none text-sm sm:text-base border border-gray-300 focus:border-whatsapp-green"
            disabled={isLoading}
          />
          {message && (
            <button 
              type="button" 
              onClick={() => setMessage('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FaTimes className="h-4 w-4" />
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading || !message.trim()}
          className={`ml-1 sm:ml-2 focus:outline-none ${isLoading || !message.trim() ? 'hidden' : 'bg-whatsapp-green'} text-white p-2.5 rounded-full flex items-center justify-center`}
        >
          {isLoading ? (
            <FaSpinner className="h-5 w-5 sm:h-6 sm:w-6 animate-spin" />
          ) : (
            <IoSend className="h-5 w-5 sm:h-6 sm:w-6" />
          )}
        </button>
        {(!message.trim() && !isLoading) && (
          <button
            type="button"
            className="ml-1 sm:ml-2 focus:outline-none bg-whatsapp-green text-white p-2.5 rounded-full"
          >
            <FaMicrophone className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        )}
      </form>
    </div>
  );
};

export default ChatInput;
