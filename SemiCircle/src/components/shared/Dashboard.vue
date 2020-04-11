<template>
  <v-app>
    <div v-if="!monitorInRunChange">
      <app-toolbar
        :currentView="currentView"
        @changeView="currentView = $event"
      ></app-toolbar>
    </div>
    <div style="margin-top: 80px;">
      <app-team-space v-if="currentView == 'TeamSpace'"></app-team-space>
      <app-driver-start-run
        v-if="currentView == 'DriverStartRun'"
      ></app-driver-start-run>
      <app-pitcrew-start-run
        v-if="currentView == 'PitcrewStartRun'"
      ></app-pitcrew-start-run>
      <app-observer-start-run
        v-if="currentView == 'ObserverStartRun'"
      ></app-observer-start-run>
      <app-driver-setup v-if="currentView == 'DriverSetup'"></app-driver-setup>
      <!-- <app-crewpit-setup v-if="currentView == 'CrewpitSetup'"></app-crewpit-setup> -->
      <app-team-management
        v-if="currentView == 'TeamManagement'"
      ></app-team-management>
    </div>
  </v-app>
</template>

<script>
import Toolbar from "./Toolbar.vue";
import TeamSpace from "../TeamSpace/TeamSpace.vue";
import DriverStartRun from "../Run/DriverStartRun.vue";
import PitcrewStartRun from "../Run/PitcrewStartRun.vue";
import ObserverStartRun from "../Run/ObserverStartRun.vue";
import DriverSetup from "../Setup/DriverSetup.vue";
import CrewpitSetup from "../Setup/CrewpitSetup.vue";
import TeamManagement from "../TeamManagement/TeamManagement.vue";

import { mapActions } from "vuex";

export default {
  data() {
    return {
      currentView: "TeamSpace"
    };
  },
  computed: {
    monitorFirebaseChange() {
      return this.$store.getters.currentFirebaseUser;
    },
    monitorDatabaseChange() {
      return this.$store.getters.currentDatabaseUser;
    },
    monitorInRunChange() {
      return this.$store.getters.inRun;
    }
  },
  watch: {
    monitorFirebaseChange() {
      this.getUserDetailsFromDatabase();
    },
    monitorDatabaseChange() {
      if (this.$store.getters.currentDatabaseUser.hasTeam) {
        var payload = {
          teamKey: this.$store.getters.currentDatabaseUser.teamKey,
          userKey: this.$store.getters.currentDatabaseUser.userKey
        };
        this.getMembersFromDatabase(payload);
        this.getTeamChatDetailsFromDatabase(payload);
        this.getBulletinBoardDetailsFromDatabase(payload);
        this.getDriverDetailsFromDatabase();
        this.getPitcrewDetailsFromDatabase();
      }
    }
  },
  methods: {
    ...mapActions([
      "getUserDetailsFromDatabase",
      "getMembersFromDatabase",
      "getTeamChatDetailsFromDatabase",
      "getBulletinBoardDetailsFromDatabase",
      "getDriverDetailsFromDatabase",
      "getPitcrewDetailsFromDatabase"
    ]),

    moveWindow() {
      window.scroll(0, 0);
    }
  },
  beforeMount() {
    this.moveWindow();
  },
  components: {
    appToolbar: Toolbar,
    appTeamSpace: TeamSpace,
    appDriverStartRun: DriverStartRun,
    appPitcrewStartRun: PitcrewStartRun,
    appObserverStartRun: ObserverStartRun,
    appDriverSetup: DriverSetup,
    appCrewpitSetup: CrewpitSetup,
    appTeamManagement: TeamManagement
  }
};
</script>
