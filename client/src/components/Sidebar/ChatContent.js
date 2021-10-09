import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: (props) => ({
    fontSize: 12,
    color: props.unread ? "#000000" : "#9CADC8",
    letterSpacing: -0.17,
    fontWeight: props.unread ? "bold" : "regular",
  }),
}));
const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 25,
    marginRight: "25px",
    padding: "0 4px",
    fontWeight: "bold",
  },
}))(Badge);

const ChatContent = (props) => {
  const styleProps = {
    unread: props.unReadMessageCounts > 0,
  };
  const classes = useStyles(styleProps);
  const { conversation, unReadMessageCounts } = props;
  const { latestMessageText, otherUser } = conversation;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
          {latestMessageText}
        </Typography>
      </Box>
      <StyledBadge
        color="primary"
        badgeContent={unReadMessageCounts}
        max={999}
      />
    </Box>
  );
};

export default ChatContent;
