<template>
  <v-container
    fluid
    v-if="currentRunDetails != null"
    style="width: 105vw; margin: -10px 0 0 -2px"
  >
    <div>
      <v-card
        class="pa-2"
        outlined
        tile
        color="#00cc66"
        style="height: 5%; text-align: center; font-weight: bold"
      >
        <div
          style="background-color: white; width: 50%; margin: auto; border-style: double"
        >
          OBSERVER
        </div>
      </v-card>
    </div>

    <!-- Video -->
    <div no-gutters v-show="broadcasting">
      <v-card
        class="pa-2 card-video"
        outlined
        tile
        style="width: 100%; overflow: hidden;"
      >
        <v-row no-gutters>
          <div
            id="localVideo"
            class="card-video"
            style="margin-left: 12vw"
          ></div>
          <v-spacer></v-spacer>
          <div
            id="remoteVideo"
            class="card-video"
            style="margin-right: 17vw"
          ></div>
        </v-row>
      </v-card>
    </div>

    <!-- Chat and Lap information -->
    <div>
      <v-row no-gutters justify="space-around" style="height: 30%;">
        <!-- Chat -->
        <v-col cols="6" md="8">
          <v-card
            class="pa-2 card-chat"
            outlined
            tile
            style="width: 100%; height: 100%; overflow: scroll"
            id="chat"
          >
            <div>
              <div style="color: white; float: right">
                "Lorem ipsum dolor sit amet, consec {{ runTimer }} adipiscing
                elit."
              </div>
              <v-list
                dense
                v-for="(item, key, index) in currentRunChatDetails.messages"
                :key="index"
                style="font-weight: bold"
              >
                <div v-if="key == 0">{{ item }}</div>
                <div
                  class="bubble-driver"
                  v-if="item.substring(0, 3) === '(D)'"
                >
                  {{ item.slice(3) }}
                </div>
                <div
                  class="bubble-pitcrew"
                  v-if="item.substring(0, 3) === '(P)'"
                >
                  {{ item.slice(3) }}
                </div>
              </v-list>
            </div>
          </v-card>
        </v-col>

        <!-- Lap information -->
        <v-col cols="6" md="4">
          <v-row no-gutters>
            <v-card
              class="pa-2 card-details"
              outlined
              tile
              style="width: 100%; overflow: hidden; font-weight: bold"
            >
              <div style="text-align:center; margin-top: -1%">
                Elapsed Time
                <h4 v-if="!currentRunDetails.running">{{ runTimer }} +/- 5s</h4>
                <h4 v-if="currentRunDetails.running">{{ deltaTime }} +/- 5s</h4>
              </div>
            </v-card>
          </v-row>
          <v-row no-gutters>
            <v-card
              class="pa-2 card-details"
              outlined
              tile
              style="width: 100%; overflow: hidden; font-weight: bold"
            >
              <div style="text-align:center;  margin-top: -1%">
                Laps
                <h4>
                  {{ currentRunDetails.currentLap }} /
                  {{ currentRunDetails.noOfLaps }}
                </h4>
              </div>
            </v-card>
          </v-row>
        </v-col>
      </v-row>
    </div>

    <!-- Controls -->
    <div>
      <v-card outlined tile class="pa-2" style="width: 100%; height: 100%;">
        <!-- Emergency -->
        <v-row
          justify="space-around"
          no-gutters
          style="margin-top: 4px; padding: 4px; text-align: center"
        >
          <v-card
            class="pa-2 card-emergency"
            outlined
            tile
            style="background: silver; font-weight: bold;margin-top: 10px"
          >
            Emergency
            <br />Button
            <br />
            <div v-if="!currentRunDetails.emergency">
              <img class="icon-emergency" src="../../assets/alarm_off.png" />
              <br />Off
            </div>
            <div v-if="currentRunDetails.emergency">
              <img class="icon-emergency" src="../../assets/alarm_on.png" />
              <br />On
            </div>
          </v-card>

          <div style="text-align: center;">
            <v-btn
              color="green"
              :disabled="broadcasting"
              @click="startBroadcast"
              >Join Broadcast</v-btn
            >
            <v-btn
              color="purple"
              :disabled="!broadcasting"
              @click="stopBroadcast"
              >Stop Broadcast</v-btn
            >
            <v-btn color="error" @click="leaveRun">Exit</v-btn>
          </div>
        </v-row>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      deltaTime: "00 : 00",
      message: "",
      broadcasting: false,
      connection: new RTCMultiConnection()
    };
  },
  computed: {
    monitorInRunChange() {
      return this.$store.getters.inRun;
    },
    currentRunDetails() {
      return this.$store.getters.currentRunDetails;
    },
    currentRunChatDetails() {
      return this.$store.getters.currentRunChatDetails;
    },
    runTimer() {
      if (this.currentRunDetails != null && this.currentRunDetails.running) {
        var now, timeElapsed;

        // Repeat every second on loop, double loop could be performance intensive
        setInterval(
          function() {
            if (this.currentRunDetails == null || !this.monitorInRunChange) {
              return;
            }
            setInterval(
              function() {
                if (
                  this.currentRunDetails == null ||
                  !this.currentRunDetails.running
                ) {
                  return;
                }
                var totalTime = this.currentRunDetails.totalTime;

                now = new Date().getTime() / 1000;
                timeElapsed = parseInt(now - totalTime);

                // Format timer properly
                var minutes, seconds;
                minutes = parseInt(timeElapsed / 60);
                seconds = parseInt(timeElapsed % 60);
                timeElapsed =
                  minutes.toString().padStart(2, "0") +
                  " : " +
                  seconds.toString().padStart(2, "0");

                this.deltaTime = timeElapsed;
              }.bind(this),
              1000
            );
          }.bind(this),
          1000
        );

        return timeElapsed;
      } else {
        return "00 : 00";
      }
    }
  },
  watch: {
    currentRunChatDetails() {
      setTimeout(function() {
        var elem = document.getElementById("chat");
        elem.scrollTop = elem.scrollHeight;
      }, 100);
    }
  },
  methods: {
    ...mapActions(["setInRun", "setCurrentRun"]),
    ...mapMutations(["setCurrentRunDetails", "setCurrentRunChatDetails"]),

    startBroadcast() {
      this.connection.socketURL =
        "https://rtcmulticonnection.herokuapp.com:443/";

      this.connection.mediaConstraints = {
        video: true,
        audio: true
      };

      this.connection.sdpConstraints.mandatory = {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: true
      };

      this.connection.dontCaptureUserMedia = true;

      this.connection.onstream = function(event) {
        if (event.type === "local") {
          // Do nothing
        }

        if (event.type === "remote") {
          var remoteVideo = document.getElementById("remoteVideo");
          var video = event.mediaElement;
          video.style.height = "80%";
          video.style.border = "thick solid #0000b3";
          video.removeAttribute("controls");
          remoteVideo.appendChild(video);
        }
      };

      this.connection.checkPresence(
        this.currentRunDetails.runKey + this.currentRunChatDetails.runKey,
        function(isRoomExist, roomid) {
          if (isRoomExist === true) {
            this.connection.join(
              this.currentRunDetails.runKey + this.currentRunChatDetails.runKey
            );
            this.broadcasting = true;
          } else {
            alert("Cannot join broadcast as driver is not broadcasting.");
          }
        }.bind(this)
      );
    },
    stopBroadcast() {
      // disconnect with all users
      this.connection.getAllParticipants().forEach(
        function(pid) {
          this.connection.disconnectWith(pid);
        }.bind(this)
      );

      // stop all local cameras
      this.connection.attachStreams.forEach(function(localStream) {
        localStream.stop();
      });

      // close socket.io connection
      this.connection.closeSocket();
      this.broadcasting = false;
    },
    async leaveRun() {
      if (this.broadcasting) {
        // disconnect with all users
        this.connection.getAllParticipants().forEach(
          function(pid) {
            this.connection.disconnectWith(pid);
          }.bind(this)
        );

        // close socket.io connection
        this.connection.closeSocket();
        this.broadcasting = false;
      }

      this.setCurrentRun(0);
      this.setCurrentRunDetails(null);
      this.setCurrentRunChatDetails(null);
      this.$emit("leaveRun", null);
      clearInterval();
      this.setInRun(false);
    }
  }
};
</script>

<style scoped>
@media (min-width: 401px) {
  .card-chat {
    min-height: 28vw;
    max-height: 28vw;
  }
  .card-video {
    height: 30vw;
  }
  .card-details {
    height: 14vw;
  }
  .card-emergency {
    width: 30vw;
    height: 30vw;
  }
  .icon-emergency {
    width: 8vw;
    height: 8vw;
  }
}
@media (min-width: 500px) {
  .card-chat {
    min-height: 28vw;
    max-height: 28vw;
  }
  .card-video {
    height: 30vw;
  }
  .card-details {
    height: 14vw;
  }
  .card-emergency {
    width: 22vw;
    height: 22vw;
  }
  .icon-emergency {
    width: 6vw;
    height: 6vw;
  }
}
@media (min-width: 680px) {
  .card-chat {
    min-height: 18vw;
    max-height: 18vw;
  }
  .card-video {
    height: 23vw;
  }
  .card-details {
    height: 9vw;
  }
  .card-emergency {
    width: 17vw;
    height: 17vw;
  }
  .icon-emergency {
    width: 4.5vw;
    height: 4.5vw;
  }
}
@media (min-width: 800px) {
  .card-chat {
    min-height: 18vw;
    max-height: 18vw;
  }
  .card-video {
    height: 21.5vw;
  }
  .card-details {
    height: 9vw;
  }
  .card-emergency {
    width: 17vw;
    height: 17vw;
  }
  .icon-emergency {
    width: 4.5vw;
    height: 4.5vw;
  }
}
@media (min-width: 900px) {
  .card-chat {
    min-height: 16vw;
    max-height: 16vw;
  }
  .card-video {
    height: 38vw;
  }
  .card-details {
    height: 8vw;
  }
  .card-emergency {
    width: 12vw;
    height: 12vw;
  }
  .icon-emergency {
    width: 3vw;
    height: 3vw;
  }
}
@media (min-width: 1280px) {
  .card-chat {
    min-height: 15vw;
    max-height: 15vw;
  }
  .card-video {
    height: 20vw;
  }
  .card-details {
    height: 7.5vw;
  }
  .card-emergency {
    width: 10vw;
    height: 10vw;
  }
  .icon-emergency {
    width: 3vw;
    height: 3vw;
  }
}
@media (min-width: 1600px) {
  .card-chat {
    min-height: 15vw;
    max-height: 15vw;
  }
  .card-video {
    height: 20vw;
  }
  .card-details {
    height: 7.5vw;
  }
  .card-emergency {
    width: 7vw;
    height: 7vw;
  }
  .icon-emergency {
    width: 2vw;
    height: 2vw;
  }
}
@media (max-width: 400px) {
  .card-chat {
    min-height: 36vw;
    max-height: 34vw;
  }
  .card-video {
    height: 30vw;
  }
  .card-details {
    height: 18vw;
  }
  .card-emergency {
    width: 32vw;
    height: 32vw;
  }
  .icon-emergency {
    width: 8vw;
    height: 8vw;
  }
}

.bubble-pitcrew {
  position: relative;
  width: auto;
  height: auto;
  padding: 0px;
  margin-right: 10px;
  padding-left: 7px;
  background: #ffffff;
  -webkit-border-radius: 16px;
  -moz-border-radius: 16px;
  border-radius: 16px;
  border: #0000b3 solid 4px;
}

.bubble-pitcrew:after {
  content: "";
  position: absolute;
  border-style: solid;
  border-width: 5px 0 5px 15px;
  border-color: transparent #ffffff;
  display: block;
  width: auto;
  z-index: 1;
  margin-top: -5px;
  right: -15px;
  top: 64%;
}

.bubble-pitcrew:before {
  content: "";
  position: absolute;
  border-style: solid;
  border-width: 8px 0 8px 18px;
  border-color: transparent #0000b3;
  display: block;
  width: auto;
  z-index: 0;
  margin-top: -8px;
  right: -22px;
  top: 64%;
}
.bubble-driver {
  position: relative;
  width: auto;
  height: auto;
  padding: 0px;
  margin-left: 10px;
  padding-left: 7px;
  background: #ffffff;
  -webkit-border-radius: 16px;
  -moz-border-radius: 16px;
  border-radius: 16px;
  border: #ffad33 solid 4px;
}

.bubble-driver:after {
  content: "";
  position: absolute;
  border-style: solid;
  border-width: 5px 15px 5px 0;
  border-color: transparent #ffffff;
  display: block;
  width: auto;
  z-index: 1;
  margin-top: -5px;
  left: -15px;
  top: 64%;
}

.bubble-driver:before {
  content: "";
  position: absolute;
  border-style: solid;
  border-width: 8px 18px 8px 0;
  border-color: transparent #ffad33;
  display: block;
  width: auto;
  z-index: 0;
  margin-top: -8px;
  left: -22px;
  top: 64%;
}
</style>
