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
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  unreadPreviewText: {
    fontSize: 12,
    color: "#000000",
    letterSpacing: -0.17,
    fontWeight: "bold",
  },
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
  const classes = useStyles();
  const { conversation, unReadMessageCounts } = props;
  const { latestMessageText, otherUser } = conversation;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        {unReadMessageCounts > 0 ? (
          <Typography className={classes.unreadPreviewText}>
            {latestMessageText}
          </Typography>
        ) : (
          <Typography className={classes.previewText}>
            {latestMessageText}
          </Typography>
        )}
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
