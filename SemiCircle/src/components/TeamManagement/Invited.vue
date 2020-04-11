<template>
  <v-app>
    <v-container grid-list-md text-center>
      <v-layout justify-center row>
        <v-layout align-center column fill-height wrap>
          <v-card class="v-card-profile text-center" style="border-radius: 2vh">
            <v-card-text class="text-xs-center">
              <h3 class="card-title font-weight-light">SemiCircle</h3>
              <v-divider></v-divider>
              <v-card class="v-card-profile text-center" style="width: 100vh">
                <v-card-text class="text-xs-center">
                  <h3 class="card-title font-weight-light">
                    <div v-if="!isSet">
                    <p>Someone has invited you to join their teamspace.</p>
                    {{ email }}
                    <p>Please set your password before proceeding.</p>
                    Password
                        <div class="input" :class="{invalid: $v.newPassword.$error}">
                          <p
                            v-if="!$v.newPassword.required && $v.newPassword.$dirty"
                          >Please provide a password.</p>
                          <p
                            v-if="!$v.newPassword.minLen && $v.newPassword.$dirty"
                          >Please provide a password at least 6 characters long.</p>
                          <v-text-field
                            v-model="newPassword"
                            :outlined="true"
                            :rounded="true"
                            :clearable="true"
                            type="password"
                            @blur="$v.newPassword.$touch()"
                          ></v-text-field>
                        </div>
                        Confirm Password
                        <div class="input" :class="{invalid: $v.confirmPassword.$error}">
                          <p
                            v-if="!$v.confirmPassword.sameAs && $v.confirmPassword.$dirty && $v.confirmPassword.$anyError"
                          >Passwords do not match.</p>
                          <v-text-field
                            v-model="confirmPassword"
                            :outlined="true"
                            :rounded="true"
                            :clearable="true"
                            type="password"
                            @blur="$v.confirmPassword.$touch()"
                          ></v-text-field>
                        </div>
                    <v-btn
                      color="success"
                      rounded
                      class="font-weight-light"
                      x-large
                      style="border-radius:2vh"
                      @click="SetPasswordLocal()"
                      :disabled="$v.$invalid"
                    >Set Password</v-btn>
                    </div>
                    <div v-if="isSet">
                    <h4 style="background-color: green; color: white">Your password has been set and you may log in now.<p>Please click the link below to continue.</p></h4>
                    <h4><a href="https://semicircle-b0e4e.firebaseapp.com/#/">Proceed to Login ~></a></h4>
                    </div>
                  </h3>
                  <v-divider></v-divider>
                  <h4
                    class="card-title font-weight-light"
                  >Download the <a href="https://www.dropbox.com/s/j4sg50ehyft2qdu/SemiCircle%20Android.apk?dl=0">Android installer</a> to get the application on your phone today.</h4>
                  <!-- link to apk -->
                </v-card-text>
              </v-card>
            </v-card-text>
          </v-card>
        </v-layout>
      </v-layout>
    </v-container>
  </v-app>
</template>
    
<script>
import { mapActions } from "vuex";
import { required, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      link: this.$route.params.link,
      email: null,
      password: null,
      newPassword: "",
      confirmPassword: "",
      isSet: false,
    };
  },
  created() {
    // Decipher email and password from link param
    var array = this.link.split("-;-");
    this.email = array[0];
    this.password = array[1];
  },
  validations: {
    newPassword: {
      required,
      minLen: minLength(6)
    },
    confirmPassword: {
      sameAs: sameAs("newPassword")
    }
  },
  methods: {
    ...mapActions(["setPassword"]),

    SetPasswordLocal() {
      var payload = {
        email: this.email,
        password: this.password,
        newPassword: this.newPassword,
      };
      this.setPassword(payload).then(() => {
        this.isSet = true;
        //this.$router.replace({ name: "Login", replace: true });
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