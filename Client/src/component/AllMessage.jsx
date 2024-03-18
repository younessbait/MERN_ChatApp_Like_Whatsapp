import React, { useEffect, useRef } from "react";
import Message from "./Message";

const AllMessage = (props) => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [props.messages]);

    const renderMessage = (message, index) => {
        message.senderORreceiver = message.receiver !== props.user.id;
        return (
            <div key={index} ref={messagesEndRef}>
                <Message message={message} />
            </div>
        );
    };

    return props.messages.map((message, index) => renderMessage(message, index));
};

export default AllMessage;
