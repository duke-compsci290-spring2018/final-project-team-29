<template>
    <!-- template must have a SINGLE root tag that encloses all others -->
    <div class="login col-lg-12">
        <div class="btnChoices">
            <!--people have two options of registering-->
            <button id="registerPlayerBtn">Register<br>New Player</button>
            <button id="registerTeamBtn">Register<br>New Team</button><br><br>

            <button class="guestBtn" @click="continueGuest">Continue as Guest</button><br><br>
            <hr>
        </div>

        <!--don't have an account but belong to a team-->
        <div class="registerPlayerOption">
            <h2>Register New Player</h2>
            <h3>on an existing team</h3>
            <br><input type="text" v-model="email" placeholder="Email"><br>
            <input type="password" v-model="password" placeholder="Password"><br>
            <input type="text" v-model="teamcode" placeholder="Your Team Code"><br>

            <button class="registerBtn" @click="registerPlayer">Register</button><br>

            <button class="guestBtn" @click="continueGuest">Continue as Guest</button><br><br>
            <hr>
        </div>
        
        <!--don't have an account or a team-->
        <div class="registerTeamOption">
            <h2>Register New Team</h2>
            <h3>as a new player</h3>
            <br><input type="text" v-model="email" placeholder="Email"><br>
            <input type="password" v-model="password" placeholder="Password"><br>
            <input type="text" v-model="teamcode" placeholder="Unique Team Code"><br>
            <button class="registerBtn" @click="registerTeam">Register</button><br>

            <button class="guestBtn" @click="continueGuest">Continue as Guest</button><br><br>
            <hr>
        </div>

    </div>
</template>

<script>
  import Firebase from 'firebase'

  export default {
        name: 'Register',
    props: ['teams', 'teamsRef'],
        data: function() {
            return {
                email: '',
                password: '',
                teamcode: '',
                username: '',
                newUserStatus: ''
            }
        },
        methods: {
            register: function() {
              return Firebase.auth().createUserWithEmailAndPassword(this.email, this.password);
            },
            registerPlayer: function() {
                if (this.isUniqueTeamCode()) {
                    alert("This team code is not in our system");
                } else {
                  if (this.email.split("@").length > 0) {
                    var key = this.teams.filter(team => team["code"] === this.teamcode)[0];
                    var people_in_team = this.teams.filter(team => team["code"] === this.teamcode)[0]["People"].length;
                    this.teamsRef.child(key['.key']).child("People").child(people_in_team).set({
                      "available": this.generateFullArray(),
                      "schedule": this.generateFullArray().map(arr => arr.map(bool => !bool)),
                      "captain": false,
                      "name": this.generate_user_from_email(this.email),
                      "key": people_in_team
                    });
                    alert("You've successfully created a new player!")
                    this.$router.push('/');
                    this.newUserStatus = 'user';
                    this.$emit('updateUserStatus', this.newUserStatus);
                    this.$emit('updateUserEmail', this.email);
                    this.email = '';
                    this.password = '';
                    this.teamcode = '';
                  }
                  else {
                    alert("Not a valid email address");
                  }
                }

            },
            registerTeam: function() {
                if (!this.checkEmptyInput()) {
                    if (this.isUniqueTeamCode()) {
                      if (this.email.split("@").length > 0) {
                        this.teamsRef.push({
                            "People" : {
                                "0": {
                                    "available": this.generateFullArray(),
                                    "schedule": this.generateFullArray().map(arr => arr.map(bool => !bool)),
                                    "captain": true,
                                    "key": "0",
                                    "name": this.generate_user_from_email(this.email)
                                }
                            },
                            "code": this.teamcode
                        });
                        alert("You've successfully created a new team!")
                        this.$router.push('/');
                        this.newUserStatus = 'user';
                        this.$emit('updateUserStatus', this.newUserStatus);
                        this.$emit('updateUserEmail', this.email);
                        this.email = '';
                        this.password = '';
                        this.teamcode = '';
                    } else {
                      alert("Not a valid email address")
                    }} else {
                        alert("This team code already exists!");
                    }
                } else {
                    alert("You didn't input a email/password/team code!");
                }
            },
            generate_user_from_email (email) {
                return email.split("@")[0];
            },
            generateFullArray() {
                var new_array = [[], [], [], [], []]
                return new_array.map(arr => [true, true, true, true, true, true, true, true, true, true, true, true, true]);
            },
            checkEmptyInput() {
                return (this.email === '' || this.password === '' || this.teamcode === '');
            },
            isUniqueTeamCode() {
                return this.teams.filter(team => team["code"] === this.teamcode).length === 0;
            },
            continueGuest: function() {
                this.$router.push('/');
                this.newUserStatus = 'guest';
                this.$emit('updateUserStatus', this.newUserStatus);
            }
        }
    }

    //alternates between two button options
    $(document).ready(function(){
        $(document).on('click', '#registerPlayerBtn', function() {
            $('.btnChoices').css('visibility', 'hidden');
            $('.btnChoices').css('position', 'absolute');
            $('.registerPlayerOption').css('visibility', 'visible');
            $('.registerTeamOption').css('position', 'absolute');
        });
        $(document).on('click', '#registerTeamBtn', function() {
            $('.btnChoices').css('visibility', 'hidden');
            $('.btnChoices').css('position', 'absolute');
            $('.registerPlayerOption').css('position', 'absolute');
            $('.registerTeamOption').css('visibility', 'visible');
        });
    });

</script>

<style lang="scss">
    h3 {
        font-style: italic;
        line-height: 0.1em;
    }
    .register {
        text-align: center;
    }
    #registerPlayerBtn {
        background-color: #f2e3ff;
        border-radius: 5px;
        border: 0;
        width: 15%;
        margin: 2%;
        font-size: 1.2em;
        text-transform: uppercase;
        font-weight: bold;
        padding: 1%;
    }
    #registerTeamBtn {
        background-color: #e8ffe3;
        border-radius: 5px;
        border: 0;
        width: 15%;
        margin: 2%;
        font-size: 1.2em;
        text-transform: uppercase;
        font-weight: bold;
        padding: 1%;
    }
    .registerBtn {
       background-color: #abbeff;
        border-radius: 5px;
        border: 0;
        width: 11%;
        margin: 2%;
        font-size: 1.2em;
        text-transform: uppercase;
        font-weight: bold;
        padding: 1%;
    }
    .registerPlayerOption {
        visibility: hidden;
    }
    .registerTeamOption {
        visibility: hidden;
    }
    input {
        margin: 0.2%;
    }
    .signInLink {
        font-weight: bold;
        color: black;
    }
    .backIcon {
        font-size: 2em;
    }
</style>


