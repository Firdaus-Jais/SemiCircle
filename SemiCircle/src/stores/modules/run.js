import { firebaseDB } from "../../plugins/firebaseConfig";

const state = {
  currentRun: 0,
  currentRunDetails: null,
  currentRunChatDetails: null,
  inRun: false,
  driverRunRecords: null,
  teamDrivers: null
};

const mutations = {
  setInRun(state, payload) {
    state.inRun = payload;
  },
  setCurrentRun(state, payload) {
    state.currentRun = payload;
  },
  setCurrentRunDetails(state, payload) {
    state.currentRunDetails = payload;
  },
  setCurrentRunChatDetails(state, payload) {
    state.currentRunChatDetails = payload;
  },
  setDriverRunRecords(state, payload) {
    state.driverRunRecords = payload;
  },
  setTeamDrivers(state, payload) {
    state.teamDrivers = payload;
  }
};

const actions = {
  setInRun({ commit }, payload) {
    commit("setInRun", payload);
    return;
  },
  createNewRun: (state, payload) => {
    var runRef = firebaseDB.ref("runs").push();
    var runChatRef = firebaseDB.ref("runChat").push();
    var runKey = runRef.key;
    var runChatKey = runChatRef.key;

    var timeNow = new Date().getTime() / 1000;
    var d = new Date();
    var dateNow = d.toISOString();

    var runData = {
      runKey: runKey,
      driverKey: payload.driverKey,
      totalTime: timeNow,
      dateCreated: dateNow,
      currentLap: 1,
      noOfLaps: payload.numberOfLaps,
      running: false,
      emergency: false,
      finished: false,
      timeTaken: 0
    };
    var runChatData = {
      runKey: runKey,
      runChatKey: runChatKey,
      messages: ["Welcome to the chat!"]
    };

    // Add to driver's record
    if (payload.runs != null) {
      payload.runs.push(runKey);
    } else {
      payload.runs = [runKey];
    }

    firebaseDB.ref("drivers/" + payload.driverKey).update({
      latestRun: runKey,
      numberOfRuns: payload.numberOfRuns + 1,
      runs: payload.runs
    });

    runRef.set(runData);
    runChatRef.set(runChatData);
    return runKey;
  },
  setCurrentRun({ commit }, payload) {
    commit("setCurrentRun", payload);
    return;
  },
  getCurrentRunDetails({ commit }, payload) {
    var runArray = [];
    firebaseDB
      .ref("runs")
      .orderByChild("runKey")
      .equalTo(payload)
      .on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var item = childSnapshot.val();
          item.key = childSnapshot.key;
          runArray = [];
          runArray.push(item);
        });
        var result = {
          runKey: runArray[0].runKey,
          noOfLaps: runArray[0].noOfLaps,
          currentLap: runArray[0].currentLap,
          running: runArray[0].running,
          emergency: runArray[0].emergency,
          totalTime: runArray[0].totalTime,
          finished: runArray[0].finished,
          timeTaken: runArray[0].timeTaken
        };
        commit("setCurrentRunDetails", result);
        return;
      });
  },
  getCurrentRunChatDetails({ commit }, payload) {
    var runChatArray = [];
    firebaseDB
      .ref("runChat")
      .orderByChild("runKey")
      .equalTo(payload)
      .on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var item = childSnapshot.val();
          item.key = childSnapshot.key;
          runChatArray = [];
          runChatArray.push(item);
        });
        var result = {
          runChatKey: runChatArray[0].runChatKey,
          runKey: runChatArray[0].runKey,
          messages: runChatArray[0].messages
        };
        commit("setCurrentRunChatDetails", result);
        return;
      });
  },
  getDriverRunRecords({ commit }, payload) {
    var recordArray = [];
    var runKeys = [];
    firebaseDB
      .ref("runs")
      .orderByChild("driverKey")
      .equalTo(payload)
      .on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var item = childSnapshot.val();
          item.key = childSnapshot.key;
          item.dateCreated = item.dateCreated.split("T")[0];
          if (!runKeys.includes(item.key)) {
            recordArray.push(item);
            runKeys.push(item.key);
          }
        });
        recordArray.reverse();
        commit("setDriverRunRecords", recordArray);
        return;
      });
  },
  sendRunMessage: (state, payload) => {
    firebaseDB
      .ref("runChat/" + payload.runChatKey + "/messages")
      .push(payload.message, err =>
        console.log(err ? "error pushing" : "successful")
      );
    return;
  },
  getTeamDrivers({ commit }, payload) {
    commit("setTeamDrivers", null);

    // Get drivers only from payload which is (listOfMembers)
    var driversArray = [];
    payload.forEach(item => {
      if (item.role === "Driver") {
        driversArray.push(item.driverKey);
      }
    });
    // Get driver details of each member
    var driversDetailArray = [];

    driversArray.forEach(item => {
      firebaseDB
        .ref("drivers")
        .orderByChild("driverKey")
        .equalTo(item)
        .on("value", function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            item.key = childSnapshot.key;
            driversDetailArray.push(item);
          });
        });
    });

    commit("setTeamDrivers", driversDetailArray);
    return;
  },
  setRunRunning: (state, payload) => {
    if (payload.value) {
      var timeNow = new Date().getTime() / 1000;
      firebaseDB.ref("runs/" + payload.runKey).update({
        totalTime: timeNow,
        running: payload.value
      });
    } else {
      firebaseDB.ref("runs/" + payload.runKey).update({
        running: payload.value
      });
    }
    return;
  },
  setCurrentLap: (state, payload) => {
    firebaseDB.ref("runs/" + payload.runKey).update({
      currentLap: payload.value,
      finished: payload.finished
    });
    return;
  },
  setEmergency: (state, payload) => {
    firebaseDB.ref("runs/" + payload.runKey).update({
      emergency: payload.value
    });
    return;
  }
};

const getters = {
  inRun: state => {
    return state.inRun;
  },
  currentRun: state => {
    return state.currentRun;
  },
  currentRunDetails: state => {
    return state.currentRunDetails;
  },
  currentRunChatDetails: state => {
    return state.currentRunChatDetails;
  },
  driverRunRecords: state => {
    return state.driverRunRecords;
  },
  teamDrivers: state => {
    return state.teamDrivers;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
