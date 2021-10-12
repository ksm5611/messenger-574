export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    newConvo.latestMessageText = message.text;
    newConvo.isNewMessage = true;
    return [newConvo, ...state];
  }
  //added isNewMessage to track active conversation
  return state.map((conv) => {
    if (conv.id === message.conversationId) {
      const newConvo = { ...conv };
      newConvo.messages = newConvo.messages.filter(
        (msg) => msg.id !== message.id
      );
      newConvo.messages.push(message);
      newConvo.latestMessageText = message.text;
      newConvo.isNewMessage = true;
      return newConvo;
    } else {
      return conv;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const newConv = { ...convo };
      newConv.id = message.conversationId;
      newConv.messages = [...newConv.messages, message];
      newConv.latestMessageText = message.text;
      return newConv;
    } else {
      return convo;
    }
  });
};

// to update isRead to true

export const readMessageFromconvoToStore = (state, payload) => {
  const { conversationId, messages, latestReadMessageId } = payload;
  return state.map((convo) => {
    if (convo.id === conversationId) {
      const newConvo = { ...convo };
      if (latestReadMessageId) {
        newConvo.latestReadMessageId = latestReadMessageId;
      }
      newConvo.isNewMessage = false;
      newConvo.messages = messages;
      return newConvo;
    }
    return convo;
  });
};
