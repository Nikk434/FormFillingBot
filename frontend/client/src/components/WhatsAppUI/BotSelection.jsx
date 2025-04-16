const BotSelection = ({ bots, onSelectBot }) => {
  return (
    <div className="absolute bg-white shadow-lg rounded-md w-[90%] sm:w-80 md:w-64 z-50 top-16 left-1/2 transform -translate-x-1/2 md:translate-x-0 md:left-4 transition-all duration-200 origin-top">
      <div className="p-3 border-b border-gray-200 font-medium text-gray-700 flex items-center justify-between">
        {/* <span>Select a Bot</span>
        <span className="text-xs text-gray-500">{bots.length} available</span> */}
      </div>
      <div className="overflow-y-auto max-h-60 md:max-h-80">
        {bots.map((bot) => (
          <div
            key={bot.id}
            onClick={() => onSelectBot(bot.id)}
            className="p-3 hover:bg-gray-100 cursor-pointer flex items-center border-b border-gray-100"
          >
            <div
              className={`w-10 h-10 ${bot.bgColor} rounded-full flex items-center justify-center text-white font-bold mr-3 flex-shrink-0`}
            >
              <span>{bot.initials}</span>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <div className="font-medium truncate">{bot.name}</div>
              <div className="text-xs text-gray-500 truncate">
                {bot.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BotSelection;
