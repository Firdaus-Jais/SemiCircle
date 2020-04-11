import { firebaseAuth, firebaseDB } from "../../plugins/firebaseConfig";
import firebase from "firebase";

const state = {
  projectId: "semicircleb0e4e",
  isLoggedIn: firebaseAuth().currentUser != null,
  firebaseUser: firebaseAuth().currentUser,
  databaseUser: null,
  databaseDriver: null,
  databasePitcrew: null,
  membersDetails: null,
  teamChatDetails: null,
  bulletinBoardDetails: null
};

const mutations = {
  AUTH_STATUS_CHANGE(state) {
    state.isLoggedIn = firebaseAuth().currentUser != null;
    state.firebaseUser = firebaseAuth().currentUser;
    actions.getUserDetailsFromDatabase();

    localStorage.setItem("firebaseUser", firebaseAuth().currentUser.uid);
    firebaseAuth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(function(idToken) {
        localStorage.setItem("token", idToken);
      })
      .catch(function(error) {
        // Handle error
      });
  },
  setDatabaseUser(state, payload) {
    state.databaseUser = payload;
  },
  setDatabaseDriver(state, payload) {
    state.databaseDriver = payload;
  },
  setDatabasePitcrew(state, payload) {
    state.databasePitcrew = payload;
  },
  setMembersDetails(state, payload) {
    state.membersDetails = payload;
  },
  setTeamChatDetails(state, payload) {
    state.teamChatDetails = payload;
  },
  setBulletinBoardDetails(state, payload) {
    state.bulletinBoardDetails = payload;
  }
};

const actions = {
  tryAutoLogin: (state, token) => {
    firebaseAuth()
      .signInWithCustomToken(token)
      .catch(function(error) {
        //console.log(error.code + " " + error.message);
      });
    actions.getUserDetailsFromDatabase();
    return true;
  },
  setFirebaseUser: state => {
    var savedFirebaseUser = localStorage.getItem("firebaseUser");
    state.firebaseUser = savedFirebaseUser;
  },
  logout: state => {
    localStorage.removeItem("token");
    localStorage.removeItem("firebaseUser");
    state.databaseUser = null;
    state.databaseDriver = null;
    state.databasePitcrew = null;
    state.membersDetails = null;
    state.isLoggedIn = false;
    firebaseAuth().signOut();
  },
  register: (state, payload) => {
    return firebaseAuth().createUserWithEmailAndPassword(
      payload.email,
      payload.password
    );
  },
  login: (state, payload) => {
    return firebaseAuth().signInWithEmailAndPassword(
      payload.email,
      payload.password
    );
  },
  getUserDetailsFromDatabase({ commit }) {
    var email = firebaseAuth().currentUser.email;
    var userArray = [];
    firebaseDB
      .ref("users")
      .orderByChild("email")
      .equalTo(email)
      .on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var item = childSnapshot.val();
          item.key = childSnapshot.key;
          userArray = [];
          userArray.push(item);
        });
        var payload = {
          userKey: userArray[0].userKey,
          email: userArray[0].email,
          teamKey: userArray[0].teamKey,
          teamName: userArray[0].teamName,
          driverKey: userArray[0].driverKey,
          pitcrewKey: userArray[0].pitcrewKey,
          teamManager: userArray[0].teamManager,
          role: userArray[0].role,
          hasTeam: userArray[0].hasTeam
        };
        commit("setDatabaseUser", payload);
        return payload;
      });
  },
  getDriverDetailsFromDatabase({ commit }) {
    var email = firebaseAuth().currentUser.email;
    var driverArray = [];
    firebaseDB
      .ref("drivers")
      .orderByChild("email")
      .equalTo(email)
      .on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var item = childSnapshot.val();
          item.key = childSnapshot.key;
          driverArray = [];
          driverArray.push(item);
        });
        var payload = {
          userKey: driverArray[0].userKey,
          email: driverArray[0].email,
          teamKey: driverArray[0].teamKey,
          driverKey: driverArray[0].driverKey,
          latestRun: driverArray[0].latestRun,
          numberOfRuns: driverArray[0].numberOfRuns,
          runs: driverArray[0].runs,
          numberOfLaps: driverArray[0].numberOfLaps,
          buttons: driverArray[0].buttons
        };

        commit("setDatabaseDriver", payload);
        return payload;
      });
  },
  getPitcrewDetailsFromDatabase({ commit }) {
    var email = firebaseAuth().currentUser.email;
    var pitcrewArray = [];
    firebaseDB
      .ref("pitcrew")
      .orderByChild("email")
      .equalTo(email)
      .on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var item = childSnapshot.val();
          item.key = childSnapshot.key;
          pitcrewArray = [];
          pitcrewArray.push(item);
        });
        var payload = {
          userKey: pitcrewArray[0].userKey,
          email: pitcrewArray[0].email,
          teamKey: pitcrewArray[0].teamKey,
          pitcrewKey: pitcrewArray[0].pitcrewKey
          // get pitcrew data WIP
        };

        commit("setDatabasePitcrew", payload);
        return payload;
      });
  },
  createRegistryInDatabase: (state, payload) => {
    var teamRef = firebaseDB.ref("teams").push();
    var userRef = firebaseDB.ref("users").push();
    var driverRef = firebaseDB.ref("drivers").push();
    var pitcrewRef = firebaseDB.ref("pitcrew").push();
    var teamChatRef = firebaseDB.ref("teamChat").push();
    var bulletinBoardRef = firebaseDB.ref("bulletinBoard").push();
    var teamKey = teamRef.key;
    var userKey = userRef.key;
    var driverKey = driverRef.key;
    var pitcrewKey = pitcrewRef.key;
    var teamChatKey = teamChatRef.key;
    var bulletinBoardKey = bulletinBoardRef.key;

    var teamData = {
      teamKey: teamKey,
      teamName: payload.teamName,
      teamChatKey: teamChatKey,
      bulletinBoardKey: bulletinBoardKey,
      members: [userKey]
    };
    var userData = {
      userKey: userKey,
      email: payload.email,
      teamKey: teamKey,
      teamName: payload.teamName,
      driverKey: driverKey,
      pitcrewKey: pitcrewKey,
      role: payload.role,
      teamManager: payload.teamManager,
      hasTeam: true
    };

    // Default button values for driver
    var defaultButtons = [
      "Inquiry-;-Anything I should know about?",
      "Speed-;-Should I go faster or slower?",
      "Pitstop-;-Should I enter the pitstop after this lap?",
      "Stopped-;-The car has stopped!"
    ];

    var driverData = {
      userKey: userKey,
      email: payload.email,
      teamKey: teamKey,
      driverKey: driverKey,
      latestRun: 0,
      numberOfRuns: 0,
      runs: [],
      numberOfLaps: 4,
      buttons: defaultButtons
    };

    var pitcrewData = {
      userKey: userKey,
      email: payload.email,
      teamKey: teamKey,
      pitcrewKey: pitcrewKey
      // preferences WIP
    };
    var teamChatData = {
      teamKey: teamKey,
      teamChatKey: teamChatKey
    };
    var bulletinBoardData = {
      teamKey: teamKey,
      bulletinBoardKey: bulletinBoardKey
    };

    teamRef.set(teamData);
    userRef.set(userData);
    driverRef.set(driverData);
    pitcrewRef.set(pitcrewData);
    teamChatRef.set(teamChatData);
    bulletinBoardRef.set(bulletinBoardData);

    var messagesRef = firebaseDB
      .ref("teamChat/" + teamChatKey + "/messages")
      .push();
    var updatesRef = firebaseDB
      .ref("bulletinBoard/" + bulletinBoardKey + "/updates")
      .push();
    var messageData = {
      message: "This is your team's chat where anyone can participate in.",
      by: "System message"
    };
    var updateData = {
      update:
        "This is your team's bulletin board. Check regularly for any updates from your team managers!",
      by: "System message"
    };
    messagesRef.set(messageData);
    updatesRef.set(updateData);

    return true;
  },
  createMemberInAuth: (state, payload) => {
    const config2 = {
      apiKey: "AIzaSyC7-c4Ulslc_tTgwm-s3SYpkmkrI9krcbs",
      authDomain: "semicircle-b0e4e.firebaseapp.com",
      databaseURL: "https://semicircle-b0e4e.firebaseio.com",
      projectId: "semicircle-b0e4e",
      storageBucket: "",
      messagingSenderId: "172966864618",
      appId: "1:172966864618:web:6c05c05158d98deb"
    };
    var connectionName = payload.email + payload.password;
    var secondaryConnection = firebase.initializeApp(config2, connectionName);
    secondaryConnection
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        secondaryConnection.auth().signOut();
        secondaryConnection.delete();
        return true;
      })
      .catch(error => {
        console.log(error.message);
        secondaryConnection.auth().signOut();
        secondaryConnection.delete();
        return false;
      });
  },
  getMembersFromDatabase: ({ commit }, payload) => {
    var teamKey = payload.teamKey;
    var userKey = payload.userKey;
    var teamDetails = [];
    var memberDetails = [];
    var memberKeys = [];

    // Get user keys of all members of team
    firebaseDB
      .ref("teams")
      .orderByChild("teamKey")
      .equalTo(teamKey)
      .on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var item = childSnapshot.val();
          item.key = childSnapshot.key;
          teamDetails.push(item);
        });
        var teamResponse = {
          teamName: teamDetails[0].teamName,
          teamMembers: teamDetails[0].members
        };
        // Get records of member in team
        teamResponse.teamMembers.forEach(item => {
          firebaseDB
            .ref("users")
            .orderByChild("userKey")
            .equalTo(item)
            .on("value", function(snapshot) {
              snapshot.forEach(function(childSnapshot) {
                var item = childSnapshot.val();
                item.key = childSnapshot.key;

                if (!memberKeys.includes(item.key) && item.hasTeam == true) {
                  memberDetails.push(item);
                  memberKeys.push(item.key);
                } else if (
                  memberKeys.includes(item.key) &&
                  item.hasTeam == true
                ) {
                  var index = memberDetails.findIndex(x => x.key === item.key);
                  memberDetails.splice(index, 1, item);
                } else if (
                  memberKeys.includes(item.key) &&
                  item.hasTeam == false
                ) {
                  var index = memberDetails.findIndex(x => x.key === item.key);
                  memberDetails.splice(index, 1);
                }
              });
            });
        });

        commit("setMembersDetails", memberDetails);
        return memberDetails;
      });
  },
  getTeamChatDetailsFromDatabase: ({ commit }, payload) => {
    var teamKey = payload.teamKey;
    var chatDetails = [];

    // Get team chat details
    firebaseDB
      .ref("teamChat")
      .orderByChild("teamKey")
      .equalTo(teamKey)
      .on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var item = childSnapshot.val();
          item.key = childSnapshot.key;
          chatDetails = [];
          chatDetails.push(item);
        });
        var payload = {
          teamKey: chatDetails[0].teamKey,
          teamChatKey: chatDetails[0].teamChatKey,
          messages: chatDetails[0].messages
        };

        commit("setTeamChatDetails", payload);
        return payload;
      });
  },
  getBulletinBoardDetailsFromDatabase: ({ commit }, payload) => {
    var teamKey = payload.teamKey;
    var bulletinDetails = [];

    // Get team chat details
    firebaseDB
      .ref("bulletinBoard")
      .orderByChild("teamKey")
      .equalTo(teamKey)
      .on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var item = childSnapshot.val();
          item.key = childSnapshot.key;
          bulletinDetails = [];
          bulletinDetails.push(item);
        });

        // Reverse updates, with recent updates at the top
        var arr = Object.keys(bulletinDetails[0].updates).map(function(key) {
          return bulletinDetails[0].updates[key];
        });
        arr.reverse();

        var payload = {
          teamKey: bulletinDetails[0].teamKey,
          bulletinBoardKey: bulletinDetails[0].bulletinBoardKey,
          updates: arr
        };

        commit("setBulletinBoardDetails", payload);
        return payload;
      });
  },
  addMemberInDatabase: (state, payload) => {
    var teamKey = payload.teamKey;
    var teamDetails = [];
    firebaseDB
      .ref("teams")
      .orderByChild("teamKey")
      .equalTo(teamKey)
      .on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var item = childSnapshot.val();
          item.key = childSnapshot.key;
          teamDetails.push(item);
        });
      });
    var teamName = teamDetails[0].teamName;
    var teamMembers = teamDetails[0].members;

    // Create registry of user
    var userRef = firebaseDB.ref("users").push();
    var driverRef = firebaseDB.ref("drivers").push();
    var pitcrewRef = firebaseDB.ref("pitcrew").push();
    var userKey = userRef.key;
    var driverKey = driverRef.key;
    var pitcrewKey = pitcrewRef.key;

    var userData = {
      userKey: userKey,
      email: payload.email,
      teamKey: teamKey,
      teamName: teamName,
      driverKey: driverKey,
      pitcrewKey: pitcrewKey,
      role: "Observer",
      teamManager: false,
      hasTeam: true
    };

    // Default button values for driver
    var defaultButtons = [
      "Inquiry-;-Anything I should know about?",
      "Speed-;-Should I go faster or slower?",
      "Pitstop-;-Should I enter the pitstop after this lap?",
      "Stopped-;-The car has stopped!"
    ];

    var driverData = {
      userKey: userKey,
      email: payload.email,
      teamKey: teamKey,
      driverKey: driverKey,
      latestRun: 0,
      numberOfRuns: 0,
      runs: [],
      numberOfLaps: 4,
      buttons: defaultButtons
    };
    var pitcrewData = {
      userKey: userKey,
      email: payload.email,
      teamKey: teamKey,
      pitcrewKey: pitcrewKey
      // preferences WIP
    };
    userRef.set(userData);
    driverRef.set(driverData);
    pitcrewRef.set(pitcrewData);

    teamMembers.push(userKey);
    firebaseDB.ref("teams/" + teamKey + "/members").set(teamMembers);

    return true;
  },
  setPassword: (state, payload) => {
    const config2 = {
      apiKey: "AIzaSyC7-c4Ulslc_tTgwm-s3SYpkmkrI9krcbs",
      authDomain: "semicircle-b0e4e.firebaseapp.com",
      databaseURL: "https://semicircle-b0e4e.firebaseio.com",
      projectId: "semicircle-b0e4e",
      storageBucket: "",
      messagingSenderId: "172966864618",
      appId: "1:172966864618:web:6c05c05158d98deb"
    };
    var secondaryConnection = firebase.initializeApp(config2, "Secondary");
    secondaryConnection
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        secondaryConnection
          .auth()
          .currentUser.updatePassword(payload.newPassword);
        secondaryConnection.auth().signOut();
        secondaryConnection.delete();
        return true;
      });
  },
  setManager: (state, payload) => {
    firebaseDB
      .ref("users/" + payload.userKey + "/teamManager")
      .set(payload.value);
  },
  setRole: (state, payload) => {
    firebaseDB.ref("users/" + payload.userKey + "/role").set(payload.value);
  },
  removeMember: (state, payload) => {
    firebaseDB.ref("users/" + payload.userKey + "/hasTeam").set(false);

    var teamKey = payload.teamKey;
    var teamDetails = [];
    firebaseDB
      .ref("teams")
      .orderByChild("teamKey")
      .equalTo(teamKey)
      .on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var item = childSnapshot.val();
          item.key = childSnapshot.key;
          teamDetails.push(item);
        });
      });
    var teamMembers = teamDetails[0].members;
    var index = teamMembers.indexOf(payload.userKey);
    teamMembers.splice(index, 1);
    firebaseDB.ref("teams/" + teamKey + "/members").set(teamMembers);
    return true;
  },
  deleteUser: (state, payload) => {
    firebaseDB
      .ref("users/" + payload.userKey)
      .remove()
      .then(() => {
        firebaseDB.ref("drivers/" + payload.driverKey).remove();
        firebaseDB.ref("pitcrew/" + payload.pitcrewKey).remove();
        for (var i=0; i < payload.runs.length; i++) {
          firebaseDB.ref("runs/" + payload.runs[i]).remove();
        }
        firebaseAuth()
          .currentUser.delete()
          .then(() => {
            return true;
          });
      });
  }
};

const getters = {
  projectId: state => {
    return state.projectId;
  },
  isLoggedIn: state => {
    return state.isLoggedIn;
  },
  currentFirebaseUser: state => {
    if (state && state.firebaseUser) {
      return {
        email: state.firebaseUser.email,
        uid: state.firebaseUser.uid
      };
    } else {
      return "Fetching Data from Firebase";
    }
  },
  currentDatabaseUser: state => {
    if (state && state.databaseUser) {
      return {
        userKey: state.databaseUser.userKey,
        email: state.databaseUser.email,
        teamKey: state.databaseUser.teamKey,
        teamName: state.databaseUser.teamName,
        driverKey: state.databaseUser.driverKey,
        pitcrewKey: state.databaseUser.pitcrewKey,
        teamManager: state.databaseUser.teamManager,
        role: state.databaseUser.role,
        hasTeam: state.databaseUser.hasTeam
      };
    } else {
      return "Fetching Data from Firebase";
    }
  },
  currentDatabaseDriver: state => {
    if (state && state.databaseDriver) {
      return {
        userKey: state.databaseDriver.userKey,
        email: state.databaseDriver.email,
        teamKey: state.databaseDriver.teamKey,
        driverKey: state.databaseDriver.driverKey,
        latestRun: state.databaseDriver.latestRun,
        numberOfRuns: state.databaseDriver.numberOfRuns,
        runs: state.databaseDriver.runs,
        numberOfLaps: state.databaseDriver.numberOfLaps,
        buttons: state.databaseDriver.buttons
      };
    } else {
      return "Fetching Data from Firebase";
    }
  },
  currentDatabasePitcrew: state => {
    if (state && state.databasePitcrew) {
      return {
        userKey: state.databasePitcrew.userKey,
        email: state.databasePitcrew.email,
        teamKey: state.databasePitcrew.teamKey,
        pitcrewKey: state.databasePitcrew.pitcrewKey
        // preferences WIP
      };
    } else {
      return "Fetching Data from Firebase";
    }
  },
  currentMembersDetails: state => {
    if (state && state.membersDetails) {
      return {
        membersDetails: state.membersDetails
      };
    } else {
      return "Fetching Data from Firebase";
    }
  },
  currentTeamChatDetails: state => {
    if (state && state.teamChatDetails) {
      return {
        teamChatDetails: state.teamChatDetails
      };
    } else {
      return "Fetching Data from Firebase";
    }
  },
  currentBulletinBoardDetails: state => {
    if (state && state.bulletinBoardDetails) {
      return {
        bulletinBoardDetails: state.bulletinBoardDetails
      };
    } else {
      return "Fetching Data from Firebase";
    }
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
