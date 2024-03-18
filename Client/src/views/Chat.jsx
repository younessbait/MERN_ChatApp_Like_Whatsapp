import React, { Component } from "react";
import socketIO from "socket.io-client";
import {
  Header,
  Contacts,
  ChatHeader,
  AllMessage,
  Chatform,
  Spinner,
} from "../component/index";
import Auth from "../Auth";
import "./component.css";
export default class Chat extends Component {
  state = {};
  sendMessage = (message) => {
    if (!this.state.contact.id) return;
    message.receiver = this.state.contact.id;
    let messages = this.state.messages.concat(message);
    this.setState({ messages });
    this.state.socket.emit("message", message);
  };

  onNewMessage = (message) => {
    let messages = this.state.messages.concat(message);
    this.setState({ messages });
  };

  componentDidMount() {
    this.initSocketConnection();
  }
  onNewUser = (user) => {
    let contacts = this.state.contacts.concat(user);
    this.setState({ contacts });
  };
  initSocketConnection = () => {
    const socket = socketIO("ws://localhost:3001", {
      transports: ["websocket"],
      query: "token=" + Auth.getToken(),
    });
    socket.on("connect", () => this.setState({ Connected: true }));
    socket.on("disconnect", () => this.setState({ Connected: false }));
    socket.on("data", (user, contacts, messages, users) => {
      let contact = contacts[0] || {};
      this.setState({ messages, contacts, user, contact }, () => {
        if (contacts) this.updateUsersState(users);
      });
    });

    socket.on("new-user", this.onNewUser);
    socket.on("message", this.onNewMessage);
    socket.on("user_status", this.updateUserState);
    socket.on("connect_error", (err) => {
      if (err.message === "auth_error") {
        console.log("Authentication error");
        Auth.logOut();
        this.props.history.push("/login");
      }
    });
    this.setState({ socket });
  };
  onChatuser = (contact) => {
    this.setState({ contact });
  };
  renderChat = () => {
    const { contact, user } = this.state;
    if (!contact) return;
    let messages = this.state.messages.filter(
      (e) => e.sender === contact.id || e.receiver === contact.id,
    );
    return <AllMessage messages={messages} user={user} />;
  };

  updateUsersState = (users) => {
    let contacts = this.state.contacts;
    contacts.forEach((element, index) => {
      if (users[element.id]) contacts[index].online = users[element.id];
    });
    this.setState({ contacts });
    let contact = this.state.contact;
    if (users[contact.id]) contact.online = users[contact.id];
    this.setState({ contact });
  };
  render() {
    if (!this.state.Connected || !this.state.messages || !this.state.contacts) {
      return (
        <div className='w-full h-screen flex justify-center items-center'>
          <Spinner />
        </div>
      );
    }
    return (
      <div className='font-[sans-serif] fixed grid grid-cols-3 w-full h-screen'>
        <div className='relative flex justify-center items-center'>
          <Header user={this.state.user} />
          <Contacts
            onChatuser={this.onChatuser}
            contacts={this.state.contacts}
            messages={this.state.messages}
          />
        </div>
        <div className='relative h-[100vh] col-span-2 flex flex-col'>
          {this.state.contact ? (
            <>
              <ChatHeader contact={this.state.contact} />
              <div className='relative bgimg h-[89.7%] scrollbar-message overflow-scroll p-5 '>
                {this.renderChat()}
              </div>
              <div className='h-[9%] flex justify-between items-center row-span-1 p-1 bg-gray-100'>
                <Chatform sender={this.sendMessage} />
              </div>
            </>
          ) : (
            <div className='bgimg grid h-screen place-content-center bg-white px-4'>
              <div className='w-full h-screen flex flex-col justify-center items-center text-center'>
                <img
                  className='mb-5 w-20'
                  src='https://seeklogo.com/images/C/chatcoin-chat-logo-D655A30A39-seeklogo.com.png'
                />
                <h1 className='text-2xl text-blue-500 font-bold'>Chat App</h1>
                <p className='text-gray-500 text-lg w-[60%] mt-5 font-anta'>
                  Join us now and enjoy connecting and interacting with the
                  world around you easily and conveniently through our chat
                  platform. Thank you for your trust in us, and we hope you have
                  an enjoyable and beneficial experience!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
