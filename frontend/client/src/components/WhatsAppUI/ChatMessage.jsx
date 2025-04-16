import { formatTimestamp } from "../../utils/helpers";

const ChatMessage = ({ message, onButtonClick }) => {
  const isUser = message.sender === "user";

  // Helper: Render text as message content
  const renderTextContent = (text) => (
    <p className="text-gray-800 whitespace-pre-wrap">{text}</p>
  );

  // Helper: Render a list of buttons with special handling for Yes/No options
  const renderButtons = (buttons) => {
    const isYesNoButtons =
      buttons.length === 2 &&
      buttons.some((b) => b.reply.title.toLowerCase() === "yes") &&
      buttons.some((b) => b.reply.title.toLowerCase() === "no");

    return (
      <div
        className={`mt-2 ${
          isYesNoButtons ? "flex flex-row space-x-2" : "flex flex-col space-y-2"
        }`}
      >
        {buttons.map((button) => (
          <button
            type="button"
            key={button.reply.id}
            onClick={() =>
              !message.buttonsDisabled &&
              onButtonClick(button.reply.id, button.reply.title)
            }
            disabled={message.buttonsDisabled}
            className={`text-center px-4 py-2.5 rounded-lg text-[#128C7E] border border-gray-200 text-sm font-medium 
              hover:bg-gray-100 transition-colors ${
                isYesNoButtons ? "flex-1" : "w-full"
              } ${
              message.buttonsDisabled ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {button.reply.title}
          </button>
        ))}
      </div>
    );
  };

  // ✅ Updated: Smarter parser that only detects button options if slashes are present
  const parseTextOptions = (text) => {
    const match = text.match(/\(([^)]+)\)/); // extract content inside ( )
    if (!match) return null;

    const rawContent = match[1];

    // Only treat it as options if it contains slashes (e.g. "Yes / No")
    if (!rawContent.includes("/")) return null;

    const options = rawContent.split("/").map((opt) => opt.trim());
    const cleanedText = text.replace(match[0], "").trim();

    return { cleanedText, options };
  };

  // Decide what content to show
  const renderContent = () => {
    // WhatsApp interactive button messages
    if (
      message.type === "interactive" &&
      message.interactive?.type === "button"
    ) {
      return (
        <>
          {renderTextContent(message.text?.body || "Message")}
          {renderButtons(message.interactive.action.buttons)}
        </>
      );
    }

    // Messages with options flagged from backend
    if (message.text?.isOptionMessage && message.text?.body) {
      const parsed = parseTextOptions(message.text.body);
      if (parsed) {
        const { cleanedText, options } = parsed;
        const isYesNoOptions =
          options.length === 2 &&
          options.some((opt) => opt.toLowerCase() === "yes") &&
          options.some((opt) => opt.toLowerCase() === "no");

        return (
          <>
            {renderTextContent(cleanedText)}
            <div
              className={`mt-2 ${
                isYesNoOptions
                  ? "flex flex-row space-x-2"
                  : "flex flex-col space-y-2"
              }`}
            >
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() =>
                    !message.buttonsDisabled && onButtonClick(option, option)
                  }
                  disabled={message.buttonsDisabled}
                  className={`text-center px-4 py-2.5 rounded-lg text-[#128C7E] border border-gray-200 
                    text-sm font-medium hover:bg-gray-100 transition-colors ${
                      isYesNoOptions ? "flex-1" : "w-full"
                    } ${
                    message.buttonsDisabled
                      ? "opacity-60 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        );
      }
    }

    // Regular text messages
    if (message.text?.body) {
      return renderTextContent(message.text.body);
    }

    // Fallback
    return renderTextContent("Message received");
  };

  return (
    <div
      className={`flex flex-col space-y-1 ${
        isUser ? "items-end" : "items-start"
      } mb-3 px-2 sm:px-3`}
    >
      <div
        className={`relative p-2 sm:p-3 max-w-[85%] shadow-sm rounded-lg ${
          isUser
            ? "bg-[#d9fdd3] rounded-tr-none chat-bubble-user"
            : "bg-white rounded-tl-none chat-bubble-bot"
        }`}
      >
        {renderContent()}

        {/* Timestamp */}
        <div className="text-right text-[11px] text-gray-500 mt-1">
          {formatTimestamp(message.timestamp)}
        </div>

        {/* Bubble triangle */}
        <div
          className={`absolute top-0 w-3 h-3 ${
            isUser ? "right-0 -mr-1.5 bg-[#d9fdd3]" : "left-0 -ml-1.5 bg-white"
          }`}
          style={{
            clipPath: isUser
              ? "polygon(100% 0, 0 0, 100% 100%)"
              : "polygon(0 0, 100% 0, 0 100%)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default ChatMessage;
