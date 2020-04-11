<template>
  <v-app>
    <v-container fluid style="width: 105vw; margin: -10px 0 0 -2px">
      <v-card style="text-align: center">
        <v-card-text class="text-xs-center">
          <h3
            class="card-title font-weight-light"
            style="background-color: purple; color: white"
          >
            Team Management
          </h3>
          <v-card>
            <v-card-text class="text-xs-center">
              <h3 class="card-title font-weight-light">Current Members</h3>

              <v-list v-for="(item, key, index) in listOfMembers" :key="index">
                <v-list-group>
                  <template v-slot:activator>
                    <v-list-item-title>
                      <div style="font-weight: bold">{{ item.email }}</div>
                      ({{ item.role }}
                      <manager v-if="item.teamManager">/ Manager</manager>)
                    </v-list-item-title>
                  </template>

                  <v-list-group
                    v-if="
                      databaseUser.teamManager &&
                        !(item.userKey == databaseUser.userKey)
                    "
                    no-action
                    sub-group
                    value="true"
                    style="margin-left: -5vw"
                  >
                    <template v-slot:activator>
                      <v-list-item-content>
                        <v-list-item-title>Manager Actions</v-list-item-title>
                      </v-list-item-content>
                    </template>

                    <v-list-item
                      v-if="!item.teamManager"
                      @click="setManagerLocal(item.userKey, true, index)"
                      link
                    >
                      <v-list-item-title
                        >Promote as Team Manager</v-list-item-title
                      >
                    </v-list-item>
                    <v-list-item
                      v-if="item.teamManager"
                      @click="setManagerLocal(item.userKey, false, index)"
                      link
                    >
                      <v-list-item-title
                        >Remove as Team Manager</v-list-item-title
                      >
                    </v-list-item>
                    <v-list-item
                      @click="removeMemberLocal(item.userKey, item.teamKey)"
                      link
                    >
                      <v-list-item-title>Remove From Team</v-list-item-title>
                    </v-list-item>
                  </v-list-group>

                  <v-list-group
                    sub-group
                    no-action
                    style="margin-left: -5vw"
                    v-if="databaseUser.teamManager"
                  >
                    <template v-slot:activator>
                      <v-list-item-content>
                        <v-list-item-title>Assign Role</v-list-item-title>
                      </v-list-item-content>
                    </template>
                    <v-list-item
                      v-if="!(item.role == 'Observer')"
                      @click="setRoleLocal(item.userKey, 'Observer')"
                      link
                    >
                      <v-list-item-title>Set as Observer</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                      v-if="!(item.role == 'Pitcrew')"
                      @click="setRoleLocal(item.userKey, 'Pitcrew')"
                      link
                    >
                      <v-list-item-title>Set as Pitcrew</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                      v-if="!(item.role == 'Driver')"
                      @click="setRoleLocal(item.userKey, 'Driver')"
                      link
                    >
                      <v-list-item-title>Set as Driver</v-list-item-title>
                    </v-list-item>
                  </v-list-group>
                </v-list-group>
              </v-list>

              <v-divider></v-divider>
              <h3 class="card-title font-weight-light">
                Send An Invite via Email
              </h3>
              <div class="input" :class="{ invalid: $v.email.$error }">
                <p
                  v-if="!$v.email.email && $v.email.required && $v.email.$dirty"
                >
                  Please provide a valid email address.
                </p>
              </div>
              <v-text-field
                v-model="email"
                :outlined="true"
                :rounded="true"
                @blur="$v.email.$touch()"
                style="margin: auto; width: 75%"
              ></v-text-field>
              <v-btn
                color="success"
                rounded
                class="font-weight-light"
                x-large
                style="border-radius:2vh"
                @click="sendInvite"
                :disabled="$v.$invalid || sending"
                >Send Invitation</v-btn
              >
              <v-divider></v-divider>
              <v-btn
                v-if="!confirmLeave"
                color="blue"
                rounded
                class="font-weight-light"
                x-large
                style="border-radius:2vh"
                @click="askIfLeaving"
                >Leave Team</v-btn
              >
              <div v-if="confirmLeave">
                <v-btn
                  color="error"
                  rounded
                  class="font-weight-light"
                  x-large
                  style="border-radius:2vh"
                  @click="leaveTeamLocal"
                  >Leave Team</v-btn
                >
                <v-btn
                  color="grey"
                  rounded
                  class="font-weight-light"
                  x-large
                  style="border-radius:2vh"
                  @click="cancelLeaving"
                  >Cancel</v-btn
                >
              </div>
            </v-card-text>
          </v-card>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      sending: false,
      randomPassword: null,
      confirmLeave: false
    };
  },
  computed: {
    databaseUser() {
      return this.$store.getters.currentDatabaseUser;
    },
    listOfMembers() {
      return this.$store.getters.currentMembersDetails.membersDetails;
    },
    databaseDriver() {
      return this.$store.getters.currentDatabaseDriver;
    }
  },
  validations: {
    email: {
      required,
      email
    }
  },
  mounted() {
    this.$nextTick(function() {
      let emailJSscript = document.createElement("script");
      emailJSscript.setAttribute(
        "src",
        "https://cdn.jsdelivr.net/npm/emailjs-com@2.3.2/dist/email.min.js"
      );
      document.head.appendChild(emailJSscript);
    });
  },
  methods: {
    ...mapActions([
      "deleteUser",
      "addMemberInDatabase",
      "createMemberInAuth",
      "getMembersFromDatabase",
      "setManager",
      "setRole",
      "removeMember"
    ]),
    setManagerLocal(userKey, value) {
      var payload = {
        userKey,
        value
      };
      this.setManager(payload);
    },
    setRoleLocal(userKey, value) {
      var payload = {
        userKey,
        value
      };
      this.setRole(payload);
    },
    removeMemberLocal(userKey, teamKey) {
      var payload = {
        userKey,
        teamKey
      };
      this.removeMember(payload);
    },
    sendInvite() {
      this.sending = true;
      this.sendRequestToAddMember();
    },
    sendRequestToAddMember() {
      this.randomPassword = String(
        Math.floor(10000000 + Math.random() * 900000)
      );
      this.email = this.email.toLowerCase();
      var payload1 = {
        email: this.email,
        password: this.randomPassword
      };
      this.createMemberInAuth(payload1).then(() => {
        var payload2 = {
          teamKey: this.$store.getters.currentDatabaseUser.teamKey,
          email: this.email
        };
        this.addMemberInDatabase(payload2).then(() => {
          this.sendEmail(this.email);
          this.email = "";

          if (this.$store.getters.currentDatabaseUser.hasTeam) {
            var payload = {
              teamKey: this.$store.getters.currentDatabaseUser.teamKey,
              userKey: this.$store.getters.currentDatabaseUser.userKey
            };
            this.getMembersFromDatabase(payload);
          }
        });
      });
    },
    sendEmail(email) {
      event.preventDefault();
      // Send invitation email using EmailJS
      emailjs.init("user_NjsqTvqcSj3KgQY5BlS8S");
      var link = this.email + "-;-" + this.randomPassword;
      emailjs
        .send("gmail", "semicircle_invitation", {
          to_email: this.email,
          link_html:
            '<a href="https://semicircle-b0e4e.firebaseapp.com/#/Invited/' +
            link +
            '">Set up your account</a>'
        })
        .then(
          response => {
            this.sending = false;
          },
          error => {
            this.sending = false;
          }
        );
    },
    askIfLeaving() {
      this.confirmLeave = true;
    },
    cancelLeaving() {
      this.confirmLeave = false;
    },
    leaveTeamLocal() {
      var payload = {
        userKey: this.databaseUser.userKey,
        driverKey: this.databaseUser.driverKey,
        pitcrewKey: this.databaseUser.pitcrewKey,
        teamKey: this.databaseUser.teamKey,
        runs: this.databaseDriver.runs
      };
      this.deleteUser(payload);
      this.$router.replace({ name: "Login" });
    }
  }
};
</script>

<style scoped>
.input.invalid p {
  color: red;
}
</style>
