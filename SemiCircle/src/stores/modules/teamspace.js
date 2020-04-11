import { firebaseDB } from "../../plugins/firebaseConfig";

const state = {};

const mutations = {};

const actions = {
  sendTeamMessage: (state, payload) => {
    var messageRef = firebaseDB.ref("teamChat/" + payload.teamChatKey + "/messages").push();
    var messageKey = messageRef.key;

    var newMessage = {
      messageKey: messageKey,
      message: payload.message,
      by: payload.by
    };

    messageRef.set(newMessage);
    return;
  },
  sendBulletinUpdate: (state, payload) => {
    var updateRef = firebaseDB.ref("bulletinBoard/" + payload.bulletinBoardKey + "/updates").push();
    var updateKey = updateRef.key;

    var newUpdate = {
      updateKey: updateKey,
      update: payload.update,
      by: payload.by
    };

    updateRef.set(newUpdate);
    return;
  },
  deleteUpdate: (state, payload) => {
    firebaseDB.ref("bulletinBoard/" + payload.bulletinBoardKey + "/updates/" + payload.updateKey).remove();
    return;
  }
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
};
