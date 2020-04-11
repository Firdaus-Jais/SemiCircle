<template>
  <v-app></v-app>
</template>

<script>
export default {
  data() {
    return {
      //
    };
  },
  mounted() {
    var connection = new RTCMultiConnection();

    // this line is VERY_important
    connection.socketURL = "https://rtcmulticonnection.herokuapp.com:443/";

    connection.mediaConstraints = {
      video: true,
      audio: true
    };

    connection.sdpConstraints.mandatory = {
      OfferToReceiveAudio: true,
      OfferToReceiveVideo: true
    };
    // connection.addStream({
    //   video: true,
    //   oneway: true
    // });
    connection.onstream = function(event) {
      if (event.type === "local") {
        // yourOwnVideo.src = URL.createObjectURL(event.stream);
      }

      if (event.type === "remote") {
        remoteVideo.src = URL.createObjectURL(event.stream);
      }
    };
    connection.openOrJoin("semicircle");
  },
  methods: {
    //
  }
};
</script>

<style scoped>
</style>