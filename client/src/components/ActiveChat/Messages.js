import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;

  // to find messsage which already read
  const findLatestMessageId = () => {
    let latestMessageId = null;
    messages.forEach((message) => {
      if (message.senderId === userId && message.isRead) {
        latestMessageId = message.id;
      }
    });

    return latestMessageId;
  };
  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble
            key={message.id}
            messageId={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
            isRead={message.isRead}
            latestMessageId={findLatestMessageId()}
          />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
    </Box>
  );
};

export default Messages;
