import React from "react";
import moment from "moment";

const Message = (props) => {
    const isSentToMe = !props.message.senderORreceiver;

    return (
        <div
            className={`animate__animated ${isSentToMe ? "animate__bounceInLeft" : "animate__bounceInRight"
                } ${isSentToMe ? "" : "flex justify-end"}`}
        >
            <h1
                className={`flex flex-col justify-center items-${isSentToMe ? "start" : "end"
                    } font-bold shadow-lg ${isSentToMe ? "bg-white" : "bg-blue-400 text-white"
                    } p-3 w-fit m-2 ${isSentToMe
                        ? "rounded-3xl rounded-bl-none"
                        : "rounded-3xl rounded-br-none"
                    }`}
            >
                {props.message.content}
                <p
                    className={`text-${isSentToMe ? "gray-400" : "white"
                        } font-thin text-sm`}
                >
                    {props.message ? moment(props.message.date).format("hh:mm a") : ""}
                </p>
            </h1>
        </div>
    );
};

export default Message;
