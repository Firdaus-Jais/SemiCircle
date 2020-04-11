<template>
  <v-app>
    <v-container fluid style="width: 105vw; margin: -10px 0 0 -2px">
      <div v-if="!monitorInRunChange">
        <v-card style="text-align: center; margin-left: 4px; margin-right: 4px">
          <v-card-text class="text-xs-center">
            <h3
              class="card-title font-weight-light"
              style="background-color: purple; color: white;"
            >
              Are you ready to run?
            </h3>
            You can select to start a new run or select a previous run to resume
            below.
            <br />

            <v-btn color="success" @click="NewRunLocal">New Run</v-btn>
            <br />
            <v-btn color="success" @click="GetRecordsLocal"
              >Load Previous Runs</v-btn
            >
            <v-divider></v-divider>
            <v-list
              dense
              two-line
              subheader
              v-for="(item, key, index) in driverRunRecords"
              :key="index"
            >
              <v-list-item @click="ContinueARunLocal(item.runKey, index)" link>
                <v-list-item-content>
                  <v-list-item-title
                    >{{ key + 1 }}. {{ item.dateCreated }}</v-list-item-title
                  >
                  <v-list-item-subtitle
                    >Laps: {{ item.currentLap }} /
                    {{ item.noOfLaps }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle v-if="item.running && !item.finished">
                    <i>Running</i>
                  </v-list-item-subtitle>
                  <v-list-item-subtitle v-if="!item.running && !item.finished">
                    <i>Stopped</i>
                  </v-list-item-subtitle>
                  <v-list-item-subtitle v-if="item.finished">
                    <i>Finished at {{ item.timeTaken }}</i>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </div>

      <div
        style="position:absolute; top: -85px; left: -10px;"
        v-if="monitorInRunChange"
      >
        <app-driver-screen></app-driver-screen>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import DriverScreen from "./DriverScreen";

export default {
  data() {
    return {
      //
    };
  },
  computed: {
    databaseDriver() {
      return this.$store.getters.currentDatabaseDriver;
    },
    monitorInRunChange() {
      return this.$store.getters.inRun;
    },
    driverRunRecords() {
      return this.$store.getters.driverRunRecords;
    }
  },
  methods: {
    ...mapActions([
      "setInRun",
      "createNewRun",
      "setCurrentRun",
      "getCurrentRunDetails",
      "getDriverRunRecords",
      "getCurrentRunChatDetails"
    ]),

    NewRunLocal() {
      this.createNewRun(this.databaseDriver).then(runKey => {
        this.setCurrentRun(runKey);
        this.getCurrentRunDetails(runKey);
        this.getCurrentRunChatDetails(runKey).then(() => {
          this.setInRun(true);
        });
      });
    },
    ContinueARunLocal(runKey) {
      this.setCurrentRun(runKey);
      this.getCurrentRunDetails(runKey);
      this.getCurrentRunChatDetails(runKey).then(() => {
        this.setInRun(true);
      });
    },
    GetRecordsLocal() {
      this.getDriverRunRecords(this.databaseDriver.driverKey);
    }
  },
  components: {
    appDriverScreen: DriverScreen
  }
};
</script>
