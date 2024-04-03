import React, { useState } from "react";
import UserContact from "./UserContact";
const Contacts = (props) => {  const [selectedItem, setSelectedItem] = useState("");
  const handleContactClick = (contactId) => {
    setSelectedItem(contactId);
  };
  const choseContact = (contact) => {
    props.onChatuser(contact);
  };
  const [search, setSearch] = useState("");

  const renderContact = (contact, index) => {
    if (!contact.name?.includes(search)) return;
    let messages = props.messages.filter(
      (e) => e.sender === contact.id || e.receiver === contact.id,
    );
    let lastMessage = messages[messages.length - 1];
    let unseen = messages.filter(
      (e) => !e.seen && e.sender === contact.id,
    ).length;
    return (
      <div
        onClick={() => {
          choseContact(contact);
        }}
        key={index}
        className=' w-full flex flex-col justify-center  '
      >
        <UserContact
          isSelected={contact.id === selectedItem}
          onClick={() => handleContactClick(contact.id)}
          unseen={unseen}
          contact={contact}
          message={lastMessage}
        />
      </div>
    );
  };
  return (
    <div className=' w-[85%] h-screen bg-blue-100  '>
      <div className='  flex flex-col  justify-between rounded-lg items-center '>
        <form className='  rounded-xl shadow-2xl bg-white p-5 w-[95%] m-2'>
          <div className=' text-blue-500 border-b-2 border-blue-500'>
            <input
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
              placeholder='search'
              className='ml-2 mb-2 font-bold w-[90%]  placeholder:text-blue-500 outline-none  '
            />
            <i className=' text-xl text-blue-500 fa-sharp fa-solid fa-magnifying-glass'></i>
          </div>
        </form>
        <div className=' bg-white h-screen rounded-lg w-[95%] over scrollbar-hidden '>
          {props.contacts.map((contact, index) =>
            renderContact(contact, index),
          )}
        </div>
      </div>
    </div>
  );
};
export default Contacts;