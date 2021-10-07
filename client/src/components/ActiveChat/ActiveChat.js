import React, { useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Input, Header, Messages } from "./index";
import { connect } from "react-redux";
import { markAsRead } from "../../store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 8,
    flexDirection: "column",
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between",
  },
}));

// for tracking previous value
const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const ActiveChat = (props) => {
  const classes = useStyles();
  const { user, readMessages } = props;
  const conversation = props.conversation || {};

  //current message count
  const totalMessages = conversation.messages
    ? conversation.messages.length
    : 0;

  //previous message count
  const previousMessages = usePrevious(totalMessages);
  const conversationId = conversation.id || null;
  const senderId = conversation.otherUser ? conversation.otherUser.id : null;

  useEffect(() => {
    if (conversationId && senderId && totalMessages !== previousMessages) {
      readMessages(conversationId, senderId);
    }
  }, [readMessages, totalMessages, previousMessages, conversationId, senderId]);

  return (
    <Box className={classes.root}>
      {conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Messages
              messages={conversation.messages}
              otherUser={conversation.otherUser}
              userId={user.id}
            />
            <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              user={user}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  const conversation =
    state.conversations &&
    state.conversations.find(
      (conversation) =>
        conversation.otherUser.username === state.activeConversation
    );
  if (conversation) {
    conversation.messages.sort((time1, time2) => {
      if (time1.createdAt > time2.createdAt) {
        return 1;
      }
      return -1;
    });
  }
  return {
    user: state.user,
    conversation,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    readMessages: (conversationId, senderId) => {
      dispatch(markAsRead(conversationId, senderId));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ActiveChat);
