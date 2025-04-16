import { FaVideo, FaPhone, FaEllipsisV } from 'react-icons/fa';

const ChatHeader = ({ selectedBot, toggleBotSelection }) => {
  return (
    <div className="bg-whatsapp-headerBg text-white p-2 sm:p-3 flex items-center shadow-md">
      {/* Profile Picture (Clickable to open bot selection) */}
      <div className="relative mr-2 sm:mr-3">
        <div 
          onClick={toggleBotSelection}
          className={`w-9 h-9 sm:w-10 sm:h-10 ${selectedBot.bgColor} rounded-full flex items-center justify-center text-white font-bold cursor-pointer border-2 border-transparent hover:border-gray-300`}
          title="Change bot"
        >
          <span>{selectedBot.initials}</span>
        </div>
      </div>
      
      {/* Bot Info */}
      <div className="flex-1 min-w-0 cursor-pointer hover:opacity-90" onClick={toggleBotSelection}>
        <div className="font-semibold text-sm sm:text-base truncate">{selectedBot.name}</div>
        <div className="text-[10px] opacity-80 flex items-center">
          <span className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full mr-1"></span>
          <span>Online</span>
        </div>
      </div>
      
      {/* Action Icons */}
      <div className="flex items-center space-x-1 sm:space-x-5">
        <button className="focus:outline-none p-1.5 sm:p-2 rounded-full hover:bg-whatsapp-green/20">
          <FaVideo className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
        <button className="focus:outline-none p-1.5 sm:p-2 rounded-full hover:bg-whatsapp-green/20">
          <FaPhone className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
        <button className="focus:outline-none p-1.5 sm:p-2 rounded-full hover:bg-whatsapp-green/20">
          <FaEllipsisV className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
