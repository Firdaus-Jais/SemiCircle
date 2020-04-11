import { firebaseDB } from "../../plugins/firebaseConfig";

const state = {};

const mutations = {};

const actions = {
  saveLapSettings: (state, payload) => {
    firebaseDB
      .ref("drivers/" + payload.driverKey + "/numberOfLaps")
      .set(payload.numberOfLaps);
    return true;
  },
  saveButtonSettings: (state, payload) => {
    firebaseDB
      .ref("drivers/" + payload.driverKey + "/buttons")
      .set(payload.buttons);
    return true;
  }
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
};
