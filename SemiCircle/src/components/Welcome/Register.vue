<template>
  <v-app>
    <v-container grid-list-md text-center>
      <v-layout justify-center row>
        <v-layout align-center column fill-height wrap>
          <v-card flat xs class="v-card-profile text-center" style="width: 90vw; min-width: 100%;">
            <v-card-text class="text-xs-center">
              <h3 class="card-title font-weight-light">Register Your Team</h3>
              <v-alert type="error" v-if="errorMessage != ''">{{errorMessage}}</v-alert>
              <v-divider></v-divider>
            </v-card-text>

            <v-card class="v-card-profile text-center" style="width: 80vw; min-width: 90%; margin: auto">
              <v-card-text class="text-xs-center">
                <h3 class="card-title font-weight-light">Personal Details</h3>
                <h4>
                  Email
                  <div class="input" :class="{invalid: $v.email.$error}">
                    <p
                      v-if="!$v.email.email && $v.email.required && $v.email.$dirty"
                    >Please provide a valid email address.</p>
                    <p
                      v-if="!$v.email.required && $v.email.email && $v.email.$dirty"
                    >This field must not be empty.</p>
                    <v-text-field
                      v-model="email"
                      :outlined="true"
                      :rounded="true"
                      @blur="$v.email.$touch()"
                      style="max-width: 75%; margin: auto"
                    ></v-text-field>
                  </div>Password
                  <div class="input" :class="{invalid: $v.password.$error}">
                    <p v-if="!$v.password.required && $v.password.$dirty">Please provide a password.</p>
                    <p
                      v-if="!$v.password.minLen && $v.password.$dirty"
                    >Please provide a password at least 6 characters long.</p>
                    <v-text-field
                      v-model="password"
                      :outlined="true"
                      :rounded="true"
                      type="password"
                      @blur="$v.password.$touch()"
                      style="max-width: 75%; margin: auto"
                    ></v-text-field>
                  </div>Confirm Password
                  <div class="input" :class="{invalid: $v.confirmPassword.$error}">
                    <p
                      v-if="!$v.confirmPassword.sameAs && $v.confirmPassword.$dirty && $v.confirmPassword.$anyError"
                    >Passwords do not match.</p>
                    <v-text-field
                      v-model="confirmPassword"
                      :outlined="true"
                      :rounded="true"
                      type="password"
                      @blur="$v.confirmPassword.$touch()"
                      style="max-width: 75%; margin: auto"
                    ></v-text-field>
                  </div>
                </h4>
                <h3 class="card-title font-weight-light">Team Details</h3>
                <h4>
                  Team Name
                  <div class="input" :class="{invalid: $v.teamName.$error}">
                    <p v-if="!$v.teamName.required && $v.teamName.$dirty">Please provide a name.</p>
                    <p
                      v-if="!$v.teamName.minLen && $v.teamName.$dirty"
                    >Please provide a name at least 3 characters long.</p>
                    <v-text-field
                      v-model="teamName"
                      :outlined="true"
                      :rounded="true"
                      @blur="$v.teamName.$touch()"
                      style="max-width: 75%; margin: auto"
                    ></v-text-field>Role in Team
                    <v-overflow-btn v-model="selectedRole" :items="roles" style="margin: auto; width: 80%"></v-overflow-btn>
                  </div>
                </h4>
              </v-card-text>
            </v-card>
            <br/>
            <v-btn
              color="success"
              rounded
              class="font-weight-light"
              x-large
              style="border-radius:2vh"
              @click="submitRegistration"
              :disabled="$v.$invalid"
            >Register My Team</v-btn>
            <h5>
              <a @click="exitRegistration">
                <u>Back to Login</u>
              </a>
            </h5>
          </v-card>
        </v-layout>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      errorMessage: "",
      teamName: "",
      roles: ["Observer", "Pitcrew", "Driver"],
      selectedRole: "Observer"
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLen: minLength(6)
    },
    confirmPassword: {
      sameAs: sameAs("password")
    },
    teamName: {
      required,
      minLen: minLength(3)
    }
  },
  methods: {
    ...mapActions([
      "register",
      "createRegistryInDatabase",
      "setFirebaseUser",
      "getUserDetailsFromDatabase"
    ]),
    exitRegistration() {
      this.$router.replace({ name: "Login", replace: true });
    },
    submitRegistration() {
      var payload = {
        email: this.email,
        password: this.password
      };
      this.register(payload)
        .then(() => {
          this.createDatabaseEntry().then(() => {
            // Don't use or get error
          });
        })
        .catch(error => {
          this.errorMessage = error.message;
          this.password = "";
          this.confirmPassword = "";
        });
    },
    createDatabaseEntry() {
      var payload = {
        teamName: this.teamName,
        email: this.email,
        teamName: this.teamName,
        role: this.selectedRole,
        teamManager: true
      };
      this.createRegistryInDatabase(payload)
        .then(() => {
          this.setFirebaseUser();
          this.getUserDetailsFromDatabase();
          this.email = "";
          this.password = "";
          this.teamName = "";
          this.$router.replace({ name: "Dashboard", replace: true });
          return true;
        })
        .catch(error => {
          this.errorMessage = error.message;
        });
    }
  }
};
</script>

<style scoped>
.input.invalid p {
  color: red;
}
</style>