<template>
  <v-app>
    <v-container fluid style="width: 105vw; margin: -10px 0 0 -2px">
      <div v-if="!monitorInRunChange">
        <v-card style="text-align: center; margin-left: 4px; margin-right: 4px">
          <v-card-text class="text-xs-center">
            <h3 class="card-title font-weight-light">Are you ready to run?</h3>
            You can select a driver to join their latest run session.
            <br />
            <v-btn color="success" @click="GetTeamDriversLocal"
              >Load Drivers</v-btn
            >
            <v-divider></v-divider>
            <v-row>
              <v-col v-for="(item, key, index) in teamDrivers" :key="index">
                <v-card
                  style="height: auto; width: auto; border-radius: 10vh; margin-left: 4px; margin-right: 4px"
                  outlined
                  tile
                  @click="JoinARunLocal(item.latestRun, index)"
                  link
                >
                  <v-card-text>
                    <div class="text--primary">{{ item.email }}</div>
                    <div>Number of Runs: {{ item.numberOfRuns }}</div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </div>

      <div
        style="position:absolute; top: -85px; left: -10px;"
        v-if="monitorInRunChange"
      >
        <app-pitcrew-screen></app-pitcrew-screen>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import PitcrewScreen from "./PitcrewScreen";

export default {
  data() {
    return {
      //
    };
  },
  computed: {
    monitorInRunChange() {
      return this.$store.getters.inRun;
    },
    listOfMembers() {
      return this.$store.getters.currentMembersDetails.membersDetails;
    },
    teamDrivers() {
      return this.$store.getters.teamDrivers;
    }
  },
  methods: {
    ...mapActions([
      "setInRun",
      "setCurrentRun",
      "getCurrentRunDetails",
      "getCurrentRunChatDetails",
      "getTeamDrivers"
    ]),

    GetTeamDriversLocal() {
      this.getTeamDrivers(this.listOfMembers);
    },
    JoinARunLocal(runKey) {
      if (runKey == "0") return;

      this.setCurrentRun(runKey);
      this.getCurrentRunDetails(runKey);
      this.getCurrentRunChatDetails(runKey).then(() => {
        this.setInRun(true);
      });
    }
  },
  components: {
    appPitcrewScreen: PitcrewScreen
  }
};
</script>
