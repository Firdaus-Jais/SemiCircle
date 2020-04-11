<template>
  <v-app>
    <v-container fluid style="width: 105vw; margin: -10px 0 0 -2px">
      <div v-if="databaseUser.hasTeam">
        <v-card style="text-align: center; margin-left: 4px; margin-right: 4px">
          <v-card-text class="text-xs-center">
            <h3
              class="card-title font-weight-bold"
              style="background-color: purple; color: white"
            >
              {{ databaseUser.teamName }}
            </h3>
            <!-- Info Card -->
            <v-card style="padding: 1vw">
              <h4>Email: {{ databaseUser.email }}</h4>
              <h4>Role: {{ databaseUser.role }}</h4>
              <h4 v-if="databaseUser.teamManager">Team Manager</h4>
              <h4 v-if="databaseUser.role === 'Driver'">
                Number of runs made: {{ databaseDriver.numberOfRuns }}
              </h4>
            </v-card>

            <v-row no-gutters justify="space-around" style="height: 80%;">
              <!-- Team Bulletin -->
              <v-col cols="6" md="6">
                <v-card class="pa-2 teamspace-card" outlined tile id="bulletin">
                  <h4
                    style="text-align: center; margin-bottom: 0.8vw; background-color: #5cc2fdde"
                  >
                    Bulletin Board & Updates
                  </h4>
                  <v-list
                    dense
                    v-for="(item, key, index) in databaseBulletinBoard.updates"
                    :key="index"
                    style="font-weight: bold;"
                  >
                    <div class="item-bulletin">
                      <!-- <div class="item-by">{{ item.by }}:</div> -->
                      <div class="item-update">{{ item.update }}</div>
                      <img class="item-delete" src="../../assets/delete.png" v-if="databaseUser.teamManager" @click="deleteUpdateLocal(item.updateKey)" style="float: right; padding-right: 13px; cursor: pointer;"/>
                    </div></v-list
                  >
                </v-card>
                <form
                  v-if="databaseUser.teamManager"
                  @submit.prevent="submitUpdateLocal"
                >
                  <v-text-field
                    v-model="update"
                    :outlined="true"
                    label="Post Bulletin Update"
                    style="margin: auto; width: 80%; padding-top: 2vw;"
                  >
                    <template v-slot:append>
                      <v-fade-transition leave-absolute>
                        <img
                          width="24"                          height="24"
                          @click="submitUpdateLocal"
                          src="../../assets/send.png"
                          style="cursor: pointer"
                        />
                      </v-fade-transition>
                    </template>
                  </v-text-field>
                </form>
              </v-col>

              <!-- Team Chat -->
              <v-col cols="6" md="6">
                <v-card class="pa-2 teamspace-card" outlined tile id="chat">
                  <h4
                    style="text-align: center; margin-bottom: 0.8vw; background-color: #00cc66"
                  >
                    Team Chat
                  </h4>
                  <v-list
                    dense
                    v-for="(item, key, index) in databaseTeamChat.messages"
                    :key="index"
                  >
                    <div class="item-chat">
                      <div class="item-by">{{ item.by }}:</div>
                      <div class="item-message">{{ item.message }}</div>
                    </div>
                  </v-list>
                </v-card>

                <form @submit.prevent="submitMessageLocal">
                  <v-text-field
                    v-model="message"
                    :outlined="true"
                    label="Message"
                    style="margin: auto; width: 80%; padding-top: 2vw;"
                  >
                    <template v-slot:append>
                      <v-fade-transition leave-absolute>
                        <img
                          width="24"
                          height="24"
                          @click="submitMessageLocal"
                          src="../../assets/send.png"
                          style="cursor: pointer"
                        />
                      </v-fade-transition>
                    </template>
                  </v-text-field>
                </form>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- <br />
        <div>firebaseUser: {{ firebaseUser }}</div>
        <div>databaseUser: {{ databaseUser }}</div>
        <div>databaseDriver: {{ databaseDriver }}</div>
        <div>databasePitcrew: {{ databasePitcrew }}</div>
        <div>databaseTeamChat: {{ databaseTeamChat }}</div>
        <div>databaseBulletinBoard: {{ databaseBulletinBoard }}</div>
        <br />
        <ul>
          <li v-for="(item, key, index) in listOfMembers" :key="index">
            {{ item }}
          </li>
        </ul> -->
      </div>

      <div v-if="!databaseUser.hasTeam && databaseUser.email != null">
        <v-container grid-list-md text-center>
          <v-layout justify-center row>
            <v-layout align-center column fill-height wrap>
              <v-card
                class="v-card-profile text-center"
                style="border-radius: 2vh"
              >
                <v-card-text class="text-xs-center">
                  <h3 class="card-title font-weight-light">
                    Sorry to Interrupt but..
                  </h3>
                  <v-divider></v-divider>
                  <v-card
                    class="v-card-profile text-center"
                    style="width: 100vh"
                  >
                    <v-card-text class="text-xs-center">
                      <h3 class="card-title font-weight-light">
                        You currently do not have a team.
                      </h3>

                      <v-divider></v-divider>
                      <h4 class="card-title font-weight-light">
                        Please click the button below to reset your account so
                        you may register a new team or accept invites from
                        another team.
                      </h4>

                      <v-btn
                        color="success"
                        rounded
                        class="font-weight-light"
                        x-large
                        style="border-radius:2vh"
                        @click="deleteUserLocal"
                        >Reset Account</v-btn
                      >
                    </v-card-text>
                  </v-card>
                </v-card-text>
              </v-card>
            </v-layout>
          </v-layout>
        </v-container>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      message: "",
      update: ""
    };
  },
  computed: {
    firebaseUser() {
      return this.$store.getters.currentFirebaseUser;
    },
    databaseUser() {
      return this.$store.getters.currentDatabaseUser;
    },
    listOfMembers() {
      return this.$store.getters.currentMembersDetails.membersDetails;
    },
    databaseDriver() {
      return this.$store.getters.currentDatabaseDriver;
    },
    databasePitcrew() {
      return this.$store.getters.currentDatabasePitcrew;
    },
    databaseTeamChat() {
      return this.$store.getters.currentTeamChatDetails.teamChatDetails;
    },
    databaseBulletinBoard() {
      return this.$store.getters.currentBulletinBoardDetails
        .bulletinBoardDetails;
    }
  },
  watch: {
    databaseTeamChat() {
      setTimeout(function() {
        var elem = document.getElementById("chat");
        elem.scrollTop = elem.scrollHeight;
      }, 100);
    }
  },
  methods: {
    ...mapActions(["deleteUser", "sendTeamMessage", "sendBulletinUpdate", "deleteUpdate"]),
    submitMessageLocal() {
      // Sending message from pitcrew
      if (this.message == "") return;
      var payload = {
        teamChatKey: this.databaseTeamChat.teamChatKey,
        message: this.message,
        by: this.databaseUser.email
      };
      this.message = "";
      this.sendTeamMessage(payload);
    },
    submitUpdateLocal() {
      // Sending message from pitcrew
      if (this.update == "") return;
      var payload = {
        bulletinBoardKey: this.databaseBulletinBoard.bulletinBoardKey,
        update: this.update,
        by: this.databaseUser.email
      };
      this.update = "";
      this.sendBulletinUpdate(payload);
    },
    deleteUserLocal() {
      var payload = {
        userKey: this.databaseUser.userKey,
        driverKey: this.databaseUser.driverKey,
        pitcrewKey: this.databaseUser.pitcrewKey,
        teamKey: this.databaseUser.teamKey,
        runs: this.databaseDriver.runs
      };
      this.deleteUser(payload);
      this.$router.replace({ name: "Login" });
    },
    deleteUpdateLocal(value) {
      var payload = {
        updateKey: value,
        bulletinBoardKey: this.databaseBulletinBoard.bulletinBoardKey,
      }
      this.deleteUpdate(payload);
    }
  }
};
</script>

<style scoped>
h4 {
  margin: 0;
}

@media (min-width: 401px) {
  .teamspace-card {
    overflow: scroll;
    height: 70vw;
  }
  .item-delete {
    height: 4vw;
  }
}
@media (min-width: 500px) {
  .teamspace-card {
    overflow: scroll;
    height: 55vw;
  }
  .item-delete {
    height: 3.2vw;
  }
}
@media (min-width: 680px) {
  .teamspace-card {
    overflow: scroll;
    height: 50vw;
  }
  .item-delete {
    height: 2.6vw;
  }
}
@media (min-width: 800px) {
  .teamspace-card {
    overflow: scroll;
    height: 40vw;
  }
  .item-delete {
    height: 2vw;
  }
}
@media (min-width: 900px) {
  .teamspace-card {
    overflow: scroll;
    height: 30vw;
  }
  .item-delete {
    height: 1.5vw;
  }
}
@media (min-width: 1280px) {
  .teamspace-card {
    overflow: scroll;
    height: 20vw;
  }
  .item-delete {
    height: 1vw;
  }
}

@media (max-width: 400px) {
  .teamspace-card {
    overflow: scroll;
    height: 100vw;
  }
  .item-delete {
    height: 4vw;
  }
}

.item-chat {
  position: relative;
  width: auto;
  height: auto;
  background: #ffffff;
  padding: 0;
  margin-top: -1.3vw;
  border: #929292bc solid 1px;
  text-align: left;
  padding-left: 2%;
}

.item-bulletin {
  position: relative;
  width: auto;
  height: auto;
  background: #ffffff;
  padding: 0;
  margin-top: -1.3vw;
  border: #ff0000e3 solid 2.5px;
  text-align: left;
  padding-left: 2%;
  font-size: large;
}

.item-by {
  display: inline;
  font-weight: bold;
}

.item-message {
  display: inline;
}

.item-update {
  display: inline;
  font-weight: bold;
}
</style>
