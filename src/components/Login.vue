<template>
    <!-- template must have a SINGLE root tag that encloses all others -->
  <div>
    <div v-if="!signUp" class="login col-lg-12">
      <br><input type="text" v-model="email" placeholder="Email"><br>
      <input type="password" v-model="password" placeholder="Password"><br><br>

      <button class="loginBtn" @click="login">Login</button><br><br>
      Don't have an account?<br>
      <span class="signUpLink" @click="signUp = true">Sign up now!</span><br><br>
        
      <router-link to="/">
        <button class="guestBtn">Continue as Guest</button>
      </router-link><br><br>
    </div>
    <div v-else>
      <Register :teams="teams"
                :teamsRef="teamsRef"
                @updateUserStatus="onUpdateUser"
                @updateUserEmail="onUpdateName">
      >
      </Register>
    </div>
  </div>

</template>

<script>
    import Firebase from 'firebase'
    import User from './User.vue'
    import Register from './Register.vue'

    export default {
        name: 'Login',
        props: ['teams', 'userStatus', 'teamsRef'],
        data: function() {
            return {
                email: '',
                password: '',
                newUserStatus: this.userStatus,
                cTeams: this.teams,
              signUp: false
            }
        },
        components: {
            User,
          Register
        },
        computed: {
            loginCheck: function() {
                console.log(Firebase.auth().currentUser);
                return Firebase.auth().currentUser;
            }
        },
        methods: {
            login: function() {
              if (this.email === 'admin' && this.password === 'password') {
                this.$router.push('/');
                this.newUserStatus = 'admin';
                this.$emit('updateUserStatus', this.newUserStatus);
              } else {
                Firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user) => {
                  if (user) {
                    alert("You've successfully logged in!")
                    this.$router.push('/');
                    this.newUserStatus = 'user';
                    this.$emit('updateUserStatus', this.newUserStatus);
                    this.$emit('updateUserEmail', this.email);
                  }
                }).catch((error) => {
                  alert("That combination doesn't exist in our records!");
                  console.log("fail");
                  this.email = '';
                  this.password = '';
                });
              }
            },
            logout: function() {
                Firebase.auth().signOut().then(function() {
                }).catch(function(error) {
                        alert(error.message);
                });
            },
          onUpdateUser(newStatus) {
              this.$emit('updateUserStatus', newStatus);
          },
          onUpdateName(newName) {
              this.$emit('updateUserEmail', newName);
          },
        }
    }
</script>

<style lang="scss">
    .login {
        text-align: center;
    }
    .loginBtn {
        background-color: #ffdce2;
        border-radius: 5px;
        border: 0;
        width: 12%;
        font-size: 1.2em;
        text-transform: uppercase;
        font-weight: bold;
        padding: 1%;
    }
    input {
        margin: 0.2%;
    }
    .signUpLink, .signUpLink:visited, .signUpLink:active, .signUpLink:link {
        font-weight: bold;
        color: black;
    }
    .signUpLink:hover {
        text-decoration: underline;
    }
    .guestBtn, .guestBtn:visited, .guestBtn:active, .guestBtn:link  {
        background-color: lightgrey;
        border-radius: 5px;
        border: 0;
        width: 11%;
        font-size: 0.8em;
        text-transform: uppercase;
        padding: 1%;
        color: black;
        text-decoration: none;
    }
    .guestBtn:hover {
        font-style: italic;
    }
</style>


