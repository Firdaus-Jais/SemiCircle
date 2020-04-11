<template>
  <v-app>
    <v-container fluid style="width: 105vw; margin: -10px 0 0 -2px">
      <div>
        <v-card style="text-align: center; margin-left: 4px; margin-right: 4px">
          <v-card-text class="text-xs-center">
            <h3
              class="card-title font-weight-light"
              style="background-color: purple; color: white;"
            >
              Driver's Preferences
            </h3>
            <p>
              You can configure the number of runs and customize the quick
              messages you use during your run here.
            </p>

            <v-card style="font-weight:bold">
              <h4><u>Run Settings</u></h4>
              <v-row no-gutters justify="space-around">
                <v-col cols="6" md="6">
                  Number of laps per run
                </v-col>
                <v-col cols="6" md="6">
                  <img
                    class="item-laps"
                    src="../../assets/minus.png"
                    @click="changeLap(-1)"
                  />
                  <div
                    style="display: inline; padding-left: 7px; padding-right: 7px"
                  >
                    {{ laps }}
                  </div>
                  <img
                    class="item-laps"
                    src="../../assets/plus.png"
                    @click="changeLap(1)"
                  />
                </v-col>
              </v-row>
              <h4><u>Quick Messages Settings</u></h4>
              <v-row no-gutters justify="space-around">
                <v-col cols="6" md="6">
                  Number of buttons
                </v-col>
                <v-col cols="6" md="6">
                  <v-select
                    solo
                    :items="options"
                    v-model="buttons"
                    style="width: 20%; margin-left: 18vw"
                  ></v-select>
                </v-col>
              </v-row>
              <div v-if="buttons > 0">
                <v-list v-for="(item, key, index) in items" :key="index"
                  ><v-row no-gutters justify="space-around">
                    <v-col cols="2" md="2">
                      <div style="margin-top: 3vw">
                        Button {{ item[0] }}
                      </div> </v-col
                    ><v-col cols="5" md="5"
                      >Label
                      <v-text-field
                        :outlined="true"
                        v-model="item[1]"
                        style="max-width: 32%; margin: auto"
                      ></v-text-field> </v-col
                    ><v-col cols="5" md="5">
                      Message
                      <v-text-field
                        :outlined="true"
                        v-model="item[2]"
                        style="max-width: 75%; margin: auto"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-list>
              </div>
              <div v-if="saved" style="color: green">
                Your settings have been saved!
              </div>
              <div v-if="error" style="color: red">
                There was an error saving, please try again.
              </div>
              <v-btn color="success" @click="saveDriverSettingsLocal"
                >Save Settings</v-btn
              >
            </v-card>
          </v-card-text>
        </v-card>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      laps: 0,
      options: ["1", "2", "3", "4", "5", "6"],
      buttons: 0,
      items: [[]],
      saved: false,
      error: false
    };
  },
  computed: {
    databaseDriver() {
      return this.$store.getters.currentDatabaseDriver;
    }
  },
  watch: {
    buttons: function(val) {
      val = parseInt(val);
      if (val > 0) {
        var x = new Array(val);

        for (var i = 0; i < x.length; i++) {
          x[i] = new Array(3);
          x[i][0] = i + 1;
          x[i][1] = "";
          x[i][2] = "";
        }
        this.items = x;
      }
    }
  },
  mounted() {
    this.laps = this.databaseDriver.numberOfLaps;
  },
  methods: {
    ...mapActions(["saveLapSettings", "saveButtonSettings"]),

    changeLap(value) {
      this.laps += value;
      if (this.laps < 0) this.laps = 0;
    },
    saveDriverSettingsLocal() {
      this.error = false;
      this.saved = false;

      var val = parseInt(this.buttons);
      if (val > 0) {
        var x = [];

        for (var i = 0; i < parseInt(this.buttons); i++) {
          var stringified = this.items[[i]].toString();
          var str = stringified.split(",");
          if (str[1] !== "" || str[2] !== ""){
            if (str.length > 2) {
              for (var j = 3; j < str.length; j++){
                str[2] = str[2] + "," + str[j];
              }
            }
            x.push(str[1] + "-;-" + str[2]);
          }
        }

        // Payload for saving settings
        var payload = {
          driverKey: this.databaseDriver.driverKey,
          numberOfLaps: this.laps,
          buttons: x
        };
        this.saveLapSettings(payload)
          .then(() => {
            this.saveButtonSettings(payload);
            this.saved = true;
            setTimeout(function() {
              this.saved = false;
            }, 30000);
          })
          .catch(error => {
            this.error = true;
            setTimeout(function() {
              this.error = false;
            }, 30000);
          });
      } else {
        return;
      }
    }
  }
};
</script>

<style scoped>
.item-laps {
  cursor: pointer;
  width: 1vw;
}
</style>
