import { FaSearch, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

const MobileSidebar = ({ isOpen, onClose, bots, onSelectBot, selectedBotId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredBots = searchTerm 
    ? bots.filter(bot => bot.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : bots;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white w-3/4 h-full flex flex-col">
        {/* Header */}
        <div className="bg-whatsapp-headerBg text-white p-3 flex items-center shadow-md">
          <button onClick={onClose} className="mr-2 focus:outline-none">
            <FaTimes className="h-6 w-6" />
          </button>
          <span className="ml-4 font-semibold">ChatBots</span>
        </div>
        
        {/* Search */}
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
    </div>
  );
};

export default MobileSidebar;
