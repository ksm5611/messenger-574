import React from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
}));

const Chat = (props) => {
  const classes = useStyles();
  const { conversation, unReadMessageCounts } = props;
  const { otherUser } = conversation;

  const handleClick = async (conversation) => {
    await props.setActiveChat(conversation.otherUser.username);
  };

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
        unReadMessageCounts={unReadMessageCounts}
      />
      <ChatContent
        conversation={conversation}
        unReadMessageCounts={unReadMessageCounts}
      />
    </Box>
  );
};

// if we are using selector for example Reselect it will memoize the result
const mapStateToProps = (state, ownProps) => {
  const { conversation } = ownProps;
  const { otherUser } = conversation;
  let counting = 0;
  conversation.messages.forEach((message) => {
    if (otherUser.id === message.senderId && message.isRead === false) {
      return counting++;
    }
  });

  return {
    unReadMessageCounts: counting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
