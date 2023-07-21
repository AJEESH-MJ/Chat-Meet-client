import React, { useRef, useState, useEffect } from "react";
import { BsBlockquoteLeft } from "react-icons/bs";
import { PiCodeBlockLight } from "react-icons/pi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faBold,
  faItalic,
  faStrikethrough,
  faLink,
  faListUl,
  faListOl,
  faCode,
  faPlus,
  faFaceSmile,
  faAt,
} from "@fortawesome/free-solid-svg-icons";
import { Picker } from "emoji-mart";
import "./chatInput.css";

const ChatInput = ({ sendMessage }) => {
  const textInputRef = useRef();
  const [messageToSend, setMessageToSend] = useState("");
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [messageSent, setMessageSent] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMentionList, setShowMentionList] = useState(false);
  const placeholderText = "Chat comes here...";

  const handleSendMessage = (e) => {
    e.preventDefault();
    const trimmedMessage = messageToSend?.trim();
    if (trimmedMessage) {
      sendMessage(trimmedMessage);
      textInputRef.current.innerHTML = "";
      setMessageSent(true);
      // Set focus on the input element after sending the message
      setTimeout(() => {
        textInputRef.current.focus();
      }, 0);
    }
  };

  const handleInputChange = () => {
    const textInput = textInputRef.current.textContent;
    setMessageToSend(textInput);
    setShowPlaceholder(textInput.trim() === "");
    setMessageSent(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage(event);
    }
  };

  const makeBold = () => {
    document.execCommand("bold", false, null);
    textInputRef.current.focus();
  };

  const makeItalic = () => {
    document.execCommand("italic", false, null);
    textInputRef.current.focus();
  };

  const makeStrikethrough = () => {
    document.execCommand("strikethrough", false, null);
    textInputRef.current.focus();
  };

  const insertLink = () => {
    const url = prompt("Enter the URL:");
    if (url) {
      document.execCommand("createLink", false, url);
    }
    textInputRef.current.focus();
  };

  const insertBulletedList = () => {
    document.execCommand("insertUnorderedList", false, null);
    textInputRef.current.focus();
  };

  const insertNumberedList = () => {
    document.execCommand("insertOrderedList", false, null);
    textInputRef.current.focus();
  };

  const makeBlockquote = () => {
    document.execCommand("formatBlock", false, "<blockquote>");
    textInputRef.current.focus();
  };

  const insertCodeSnippet = () => {
    document.execCommand(
      "insertHTML",
      false,
      `<code>${window.getSelection().toString()}</code>`
    );
    textInputRef.current.focus();
  };

  const insertCodeBlock = () => {
    document.execCommand("formatBlock", false, "<pre>");
    textInputRef.current.focus();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("File uploaded:", file.name);
    }
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const insertEmoji = (emoji) => {
    document.execCommand("insertText", false, emoji);
    textInputRef.current.focus();
  };

  const toggleMentionList = () => {
    setShowMentionList(!showMentionList);
  };

  useEffect(() => {
    if (!messageSent) {
      textInputRef.current.focus();
    } else {
      setMessageToSend("");
      setShowPlaceholder(true);
    }
  }, [messageSent]);

  useEffect(() => {
    // When the component mounts, set the focus on the input element
    textInputRef.current.focus();
  }, []);

  return (
    <div className="chat-footer bg-gray-900 py-3 px-2 flex flex-col rounded-b-xl">
      <div className="bg-gray-800 border border-gray-400 rounded-xl p-4">
        <div className="section-1 mb-2 flex">
        <div className="formatting-buttons flex flex-row md:flex-row gap-4">
          <button
            className="text-lg text-gray-400 hover:text-gray-300"
            onClick={makeBold}
          >
            <FontAwesomeIcon icon={faBold} />
          </button>
          <button
            className="text-lg text-gray-400 hover:text-gray-300"
            onClick={makeItalic}
          >
            <FontAwesomeIcon icon={faItalic} />
          </button>
          <button
            className="text-lg text-gray-400 hover:text-gray-300"
            onClick={makeStrikethrough}
          >
            <FontAwesomeIcon icon={faStrikethrough} />
          </button>
          <div className="border-l-2 border-gray-700 h-6 hidden md:block"></div>
          {/* Divider visible on medium and above screens */}
          <button
            className="text-lg text-gray-400 hover:text-gray-300"
            onClick={insertLink}
          >
            <FontAwesomeIcon icon={faLink} />
          </button>
          <div className="border-l-2 border-gray-700 h-6 hidden md:block"></div>
          {/* Divider visible on medium and above screens */}
          <button
            className="text-lg text-gray-400 hover:text-gray-300"
            onClick={insertNumberedList}
          >
            <FontAwesomeIcon icon={faListOl} />
          </button>
          </div>
        
        <div className="formatting-buttons flex flex-row md:flex-row gap-4 mt-2 md:mt-0 sm:ml-4">
          <button
            className="text-lg text-gray-400 hover:text-gray-300"
            onClick={insertBulletedList}
          >
            <FontAwesomeIcon icon={faListUl} />
          </button>
          <div className="border-l-2 border-gray-700 h-6 hidden md:block"></div>
          <button
            className="text-lg text-gray-400 hover:text-gray-300"
            onClick={makeBlockquote}
          >
            <BsBlockquoteLeft className="w-6 h-6" />
          </button>
          <div className="border-l-2 border-gray-700 h-6 hidden md:block"></div>
          <button
            className="text-lg text-gray-400 hover:text-gray-300"
            onClick={insertCodeSnippet}
          >
            <FontAwesomeIcon icon={faCode} />
          </button>
          <button
            className="text-lg text-gray-400 hover:text-gray-300"
            onClick={insertCodeBlock}
          >
            <PiCodeBlockLight className="w-6 h-6" />
          </button>
        </div>
        </div>

        <div className="section-2 mb-0">
          <form onSubmit={handleSendMessage}>
            <div
              className="w-full px-0 py-2 bg-gray-800 text-gray-300 outline-none"
              contentEditable
              ref={textInputRef}
              onInput={handleInputChange}
              onKeyDown={handleKeyDown}
            >
              {showPlaceholder && (
                <span className="text-gray-400">{placeholderText}</span>
              )}
            </div>
          </form>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="formatting-buttons flex gap-4">
            <label
              htmlFor="fileInput"
              className="text-lg text-gray-400 hover:text-gray-300"
            >
              <FontAwesomeIcon icon={faPlus} />
            </label>
            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              accept=".jpg, .jpeg, .png, .gif, .pdf"
            />
            <div className="border-l-2 border-gray-700 h-6"></div>
            <button
              className="text-lg text-gray-400 hover:text-gray-300"
              onClick={toggleEmojiPicker}
            >
              <FontAwesomeIcon icon={faFaceSmile} />
            </button>
            <button
              className="text-lg text-gray-400 hover:text-gray-300"
              onClick={toggleMentionList}
            >
              <FontAwesomeIcon icon={faAt} />
            </button>
          </div>
          <button
            type="button"
            className="px-4 py-2 text-white flex gap-2 bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={handleSendMessage}
          >
            <FontAwesomeIcon icon={faPaperPlane} className="mt-1" />
            Send
          </button>
        </div>
      </div>
      {showEmojiPicker && (
        <div className="emoji-picker">
          <Picker onSelect={(emoji) => insertEmoji(emoji.native)} />
        </div>
      )}
      {showMentionList && <div className="mention-list"></div>}
    </div>
  );
};

export default ChatInput;
