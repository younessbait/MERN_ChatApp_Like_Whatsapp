import React, { useEffect, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import Picker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import moment from "moment";

const Chatform = (props) => {
  const [inputstr, setinputstr] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [lasttype, setlasttype] = useState(false);
  const dropdownRef = useRef(null);
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowPicker(false);
    }
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      setlasttype(false);
      onSend();
    } else if (!lasttype || moment() - lasttype > 2000) {
      setlasttype(moment());
      props.sendtype();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    setinputstr(e.target.value);
  };

  const onSend = (e) => {
      e.preventDefault();
      if (!inputstr) return;
      const message = {
          content: inputstr,
          date: new Date().getTime(),
      };
      props.sender(message);
      setinputstr("");
  };

  return (
    <form className='relative flex justify-between items-center h-full w-screen'>
      <div ref={dropdownRef} className='mb-[56%] w-0'>
        {showPicker && (
          <Picker
            onEmojiClick={(emojiObject) =>
              setinputstr((prevMsg) => prevMsg + emojiObject.emoji)
            }
          />
        )}
      </div>
      <BsEmojiSmile
        onClick={() => setShowPicker(!showPicker)}
        size={25}
        className='cursor-pointer font-bold text-blue-500 mr-2'
      />
      <input
        value={inputstr}
        onKeyDown={onKeyDown}
        onChange={handleInputChange}
        placeholder='Write a message...'
        className='placeholder:font-semibold placeholder:text-gray-400 border-2 p-5 rounded-2xl h-full w-[89%]'
      />
      <button
        type='submit'
        onClick={(e) => onSend(e)}
        className='mr-2 text-white bg-blue-500 p-2 rounded-full'
      >
        <IoIosSend size={35} />
      </button>
    </form>
  );
};

export default Chatform;
