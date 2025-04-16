import { useState } from 'react';
import { FaEllipsisV, FaSearch } from 'react-icons/fa';

const Sidebar = ({ bots, onSelectBot, selectedBotId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredBots = searchTerm 
    ? bots.filter(bot => bot.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : bots;

  return (
    <div className="w-full md:w-1/4 bg-white border-r border-gray-200 flex flex-col h-full overflow-hidden">
      {/* Sidebar Header */}
      <div className="bg-whatsapp-headerBg text-white p-3 flex items-center shadow-md">
        <div className="flex-1 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="ml-4 font-semibold">ChatBots</span>
        </div>
        <div>
          <FaEllipsisV className="h-5 w-5" />
        </div>
      </div>
      
      {/* Bot Search */}
      <div className="bg-whatsapp-lightGray p-2">
        <div className="bg-white rounded-full flex items-center px-3 py-1">
          <FaSearch className="h-5 w-5 text-gray-500" />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search or start new chat" 
            className="ml-2 py-1 flex-1 focus:outline-none text-sm" 
          />
        </div>
      </div>
      
      {/* Bot List */}
      <div className="flex-1 overflow-y-auto scrollbar-custom">
        <div className="bot-list">
          {filteredBots.map((bot) => (
            <div 
              key={bot.id}
              onClick={() => onSelectBot(bot.id)}
              className={`bot-item flex items-center p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-200 ${
                selectedBotId === bot.id ? 'bg-gray-100' : ''
              }`}
            >
              <div className={`w-12 h-12 ${bot.bgColor} rounded-full flex items-center justify-center text-white font-bold mr-3`}>
                <span>{bot.initials}</span>
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">{bot.name}</div>
                <div className="text-sm text-gray-500 truncate">{bot.description}</div>
              </div>
              <div className="text-xs text-gray-500">{bot.lastActive}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
