<template>
  <v-app>
    <v-container fluid>
      <v-form>
        <v-layout justify-center row>
          <v-layout align-center column fill-height>
            <v-flex xs12>
              <v-card
                flat
                xs
                class="v-card-profile text-center"
                style="width: 90vw; min-width: 100%;"
              >
                <div style="padding-top: 5vh;">
                  <v-avatar class="mx-auto d-block" size="100">
                    <img src="../../assets/logo.png" />
                  </v-avatar>
                  <v-card-text class="text-xs-center">
                    <h3 class="card-title font-weight-light">Enter Your TeamSpace</h3>

                    <v-alert type="error" v-if="errorMessage != ''">{{errorMessage}}</v-alert>
                    <h4>
                      Email
                      <div class="input" :class="{invalid: $v.email.$error}">
                        <p
                          v-if="!$v.email.email && $v.email.required && $v.email.$dirty"
                        >Please provide a valid email address.</p>
                        <p
                          v-if="!$v.email.required && $v.email.email && $v.email.$dirty"
                        >This field must not be empty.</p>
                        <form @submit.prevent="loginLocal">
                          <v-text-field
                            v-model="email"
                            :outlined="true"
                            :rounded="true"
                            @blur="$v.email.$touch()"
                            style="max-width: 75%; margin: auto"
                          ></v-text-field>
                        </form>
                      </div>Password
                      <div class="input" :class="{invalid: $v.password.$error}">
                        <p
                          v-if="!$v.password.required && $v.password.$dirty"
                        >Please provide a password.</p>
                        <p
                          v-if="!$v.password.minLen && $v.password.$dirty"
                        >Please provide a password at least 6 characters long.</p>
                        <form @submit.prevent="loginLocal">
                          <v-text-field
                            v-model="password"
                            :outlined="true"
                            :rounded="true"
                            type="password"
                            @blur="$v.password.$touch()"
                            style="max-width: 75%; margin: auto"
                          ></v-text-field>
                        </form>
                      </div>
                    </h4>

                    <v-btn
                      color="success"
                      rounded
                      class="font-weight-light"
                      x-large
                      style="border-radius:2vh"
                      @click="loginLocal"
                      :disabled="$v.$invalid"
                    >Log In</v-btn>

                    <h5>
                      <a @click="registerLocal">Register Team</a>
                    </h5>
                    <!-- <h5>
                      <a>Forgot your password?</a>
                    </h5> -->

                    <!-- <v-btn @click="goTest">Test</v-btn> -->
                  </v-card-text>
                </div>
              </v-card>
            </v-flex>
          </v-layout>
        </v-layout>
      </v-form>
    </v-container>
  </v-app>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: ""
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
    }
  },
  created() {
    var token = localStorage.getItem("token");
    var fbUser = localStorage.getItem("firebaseUser");

    if (token && fbUser) {
      this.setFirebaseUser();
      this.getUserDetailsFromDatabase();
      this.tryAutoLogin(token).then(() => {
        this.$router.replace({ name: "Dashboard", replace: true });
      });
    }
  },
  methods: {
    ...mapActions([
      "login",
      "tryAutoLogin",
      "setFirebaseUser",
      "getUserDetailsFromDatabase"
    ]),

    loginLocal() {
      var payload = {
        email: this.email,
        password: this.password
      };
      this.login(payload)
        .then(() => {
          this.setFirebaseUser();
          this.getUserDetailsFromDatabase();
          this.email = "";
          this.password = "";
          this.$router.replace({ name: "Dashboard", replace: true });
        })
        .catch(error => {
          this.errorMessage = error.message;
          this.password = "";
        });
    },
    registerLocal() {
      this.$router.push({ name: "Register" });
    },
    goTest() {
      this.$router.replace({ name: "test", replace: true });
    }
  }
};
</script>

<style scoped>
.input.invalid p {
  color: red;
}
</style>