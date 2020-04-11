<template>
  <v-toolbar id="core-toolbar" absolute tile style="background: #ffc300;">
    <div class="v-toolbar-title">
      <v-toolbar-items v-if="databaseUser.hasTeam">
        <v-flex justify-center layout py-2>
          <div class="toolbar-div" style="margin: auto; text-align: center">
            <img class="toolbar-item" src="../../assets/teamspace.png" @click="changeView('TeamSpace')"/>
            <img class="toolbar-item" src="../../assets/car.png" v-if="databaseUser.role == 'Driver'" @click="changeView('DriverStartRun')"/>
            <img class="toolbar-item" src="../../assets/car.png" v-if="databaseUser.role == 'Pitcrew'" @click="changeView('PitcrewStartRun')"/>
            <img class="toolbar-item" src="../../assets/observer-white.png" v-if="databaseUser.role == 'Observer' || databaseUser.role == 'Driver'" @click="changeView('ObserverStartRun')"/>
            <img class="toolbar-item" src="../../assets/driver-white.png" v-if="databaseUser.role == 'Driver'" @click="changeView('DriverSetup')"/>
            <!-- <img class="toolbar-item" src="../../assets/pitcrew-white.png" v-if="databaseUser.role == 'Pitcrew'" @click="changeView('CrewpitSetup')"/> -->
            <img class="toolbar-item" src="../../assets/user-group.png" @click="changeView('TeamManagement')"/>
          <v-btn class="toolbar-button" color="purple" @click="logoutLocal()">Logout</v-btn>
          </div>
        </v-flex>
      </v-toolbar-items>
    </div>
  </v-toolbar>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["currentView"],
  data() {
    return {
      //
    };
  },
  computed: { 
    databaseUser () {
      return this.$store.getters.currentDatabaseUser;
    }
  },
  methods: {
    ...mapActions(["logout"]),
    changeView(value) {
      this.currentView = value;
      this.$emit("changeView", this.currentView);
    },
    logoutLocal() {
      this.logout();
      this.$router.replace({ name: "Login", replace: true });
    }
  }
};
</script>

<style scoped>

.toolbar-div {
    width: 100vw
  }
.toolbar-item {
  cursor: pointer;
}

@media (min-width: 401px) {
  .toolbar-item {
  padding: 10px;
  height: 12vw;
  width: 12vw;
  margin-top: 5vw
  }
  .toolbar-button {
    top: -5vw
  }
}
@media (min-width: 600px) {
  .toolbar-item {
  padding: 10px;
  height: 8vw;
  width: 8vw;
  margin-top: 4vw
  }
  .toolbar-button {
    top: -3.5vw
  }
}
@media (min-width: 700px) {
  .toolbar-item {
  padding: 10px;
  height: 7vw;
  width: 7vw;
  margin-top: 4vw
  }
  .toolbar-button {
    top: -2.8vw
  }
}
@media (min-width: 800px) {
  .toolbar-item {
  padding: 10px;
  height: 6vw;
  width: 6vw;
  margin-top: 4vw
  }
  .toolbar-button {
    top: -2.8vw
  }
}
@media (min-width: 1000px) {
  .toolbar-div {
    width: 50vw
  }
  .toolbar-item {
  padding: 10px;
  height: 5vw;
  width: 5vw;
  margin-top: 3vw;
  padding-left: -10vw;
  }
  .toolbar-button {
    top: -2vw
  }
}
@media (min-width: 1280px) {
  .toolbar-div {
    width: 50vw
  }
  .toolbar-item {
  padding: 10px;
  height: 3.6vw;
  width: 3.6vw;
  margin-top: 3vw;
  padding-left: -10vw;
  }
  .toolbar-button {
    top: -2vw
  }
}
@media (min-width: 1600px) {
  .toolbar-div {
    width: 50vw
  }
  .toolbar-item {
  padding: 10px;
  height: 3vw;
  width: 3vw;
  margin-top: 2.5vw;
  padding-left: -10vw;
  }
  .toolbar-button {
    top: -1.5vw
  }
}
@media (max-width: 400px) {
  .toolbar-item {
  padding: 10px;
  height: 12.5%;
  width: 12.5%;
  margin-top: 7vw
  }
  .toolbar-button {
    top: -6vw
  }
}

</style>