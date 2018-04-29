<template>
    <!-- template must have a SINGLE root tag that encloses all others -->
    <div class="login col-lg-12">
        <div class="btnChoices">
            <!--<input type="text" v-model="email" placeholder="Email"><br>-->
            <!--<input type="password" v-model="password" placeholder="Password"><br>-->
            <!--<button class="registerBtn" @click="register">Register</button><br>-->

            <button id="registerPlayerBtn">Register<br>New Player</button>
            <button id="registerTeamBtn">Register<br>New Team</button><br>

            Already have an account?<br>
            <router-link to="/login" class="signInLink">Sign in now!</router-link><br><br>
            <router-link to="/">
                <button class="guestBtn">Continue as Guest</button>
            </router-link><br><br>
            <hr>
        </div>

        <div class="registerPlayerOption">
            <br><input type="text" v-model="email" placeholder="Email"><br>
            <input type="password" v-model="password" placeholder="Password"><br>
            <input type="text" v-model="teamcode" placeholder="Your Team Code"><br>
            <button class="registerBtn" @click="registerPlayer">Register</button><br>

            Already have an account?<br>
            <router-link to="/login" class="signInLink">Sign in now!</router-link><br><br>

            <router-link to="/">
                <button class="guestBtn">Continue as Guest</button>
            </router-link><br><br>
            <hr>
        </div>

        <div class="registerTeamOption">
            <br><input type="text" v-model="email" placeholder="Email"><br>
            <input type="password" v-model="password" placeholder="Password"><br>
            <input type="text" v-model="teamcode" placeholder="Unique Team Code"><br>
            <button class="registerBtn" @click="registerTeam">Register</button><br>

            Already have an account?<br>
            <router-link to="/login" class="signInLink">Sign in now!</router-link>

            <router-link to="/">
                <button class="guestBtn">Continue as Guest</button>
            </router-link><br><br>
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
                username: ''
            }
        },
        methods: {
            register: function() {
              Firebase.auth().createUserWithEmailAndPassword(this.username, this.password).catch(error => alert(error.message));
            },
            registerPlayer: function() {
                this.register();
                console.log("Yay");
                if (this.isUniqueTeamCode()) {
                    alert("This team code is not in our system");
                } else {
                    var key = this.teams.filter(team => team["code"] === this.teamCode)[0];
                    var people_in_team = this.teams.filter(team => team["code"] === this.teamCode)[0]["People"].length;
                    this.teamsRef.child(key['.key']).child("People").child(people_in_team).set({
                        "available": this.generateFullArray(),
                        "schedule": this.generateFullArray().map(arr => arr.map(bool => !bool)),
                        "captain": false,
                        "name": this.email,
                        "pass": this.password,
                        "key": people_in_team
                    });
                }
                this.email = '';
                this.password = '';
                this.teamcode = '';
            },
            registerTeam: function() {
                if (!this.checkEmptyInput()) {
                    if (this.isUniqueTeamCode()) {
                        this.teamsRef.push({
                            "People" : {
                                "0": {
                                    "available": this.generateFullArray(),
                                    "schedule": this.generateFullArray().map(arr => arr.map(bool => !bool)),
                                    "captain": true,
                                    "key": "0",
                                    "name": this.email,
                                    "pass": this.password
                                }
                            },
                            "code": this.teamcode
                        });
                    } else {
                        alert("This team code already exists!");
                    }
                } else {
                    alert("You didn't input a email/password/team code!");
                }
                this.email = '';
                this.password = '';
                this.teamcode = '';
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
            }
        }
    }

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
        width: 10%;
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
</style>


