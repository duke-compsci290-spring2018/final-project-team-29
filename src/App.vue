<template>
    <div v-if="curr_team != undefined" id="app">
        <div class="col-lg-4">
            <div class="nav" id="openBtn">☰</div>
            <div class="sidenav">
              <p>Test</p>
                <a href="javascript:void(0)" class="closebtn" id="closeBtn">&times;</a>

                <tr class="navOption">
                    <i class="fa fa-home" aria-hidden="true"> Home</i>
                </tr>
                <tr class="navOption">
                    <i class="fa fa-search" aria-hidden="true"> Search</i>
                </tr>
                <tr class="navOption" v-if="userStatus === 'admin'">
                    <i @click="showAllTeams = true" class="fa fa-group" aria-hidden="true"> Teams</i>
                    <div v-if="showAllTeams">
                        <div v-for="team in teams">
                            <p @click="showPlayers(team)">{{team['code']}}</p>
                        </div><br>
                        <div v-for="person in people">
                            <p @click="currName=person">{{person}}</p>
                        </div>
                    </div>
                </tr>
                <tr class="navOption">
                    <i class="fa fa-gear" aria-hidden="true"> Settings</i>
                </tr>

                <tr class="">
                    <a class="didDukeOption" href="https://diddukewin.com">did duke win?</a>
                </tr>
            </div>
        </div>

        <div class="col-lg-4">
            <h1 class="routerLink" @click="refresh">K-VITE</h1>
        </div>

        <div class="col-lg-4">
            <button class="signInBtn routerLink" @click="goToLogin" v-if="userStatus === 'guest' && !signingIn">Sign in</button>

            <h2 class="welcomeMsg" v-if="userStatus === 'user'">Welcome, {{ currName }}!</h2>
            <h2 class="welcomeMsg" v-if="userStatus === 'admin'">Welcome, admin!</h2>

            <div class="dropdown" v-if="userStatus !== 'guest'">
                <i class="profileIcon fa fa-user-circle-o" aria-hidden="true"></i>
                <div class="dropdown-content">
                    <a href="#" @click="logout">LOG OUT</a>
                </div>
            </div>
        </div>

        <div v-if="signingIn">
            <Login :teams="teams"
                   :userStatus="userStatus"
                   :teamsRef="storage"
                   @updateUserStatus="onUpdateUser"
                   @updateUserEmail="onUpdateName">
            </Login>
        </div>

        <br><br><br><br><br>
        <div v-if="userStatus === 'guest' && !signingIn">
            <Guest :teams="teams"
                   :events="events">
            </Guest><br>
        </div>

        <div v-if="userStatus === 'user' && !signingIn">
            <User :name="currName"
                  :teams="teams"
                  :events="events"
                  :db="db"
                  :userStatus="userStatus">
            </User>
        </div>

        <div v-if="userStatus === 'admin' && !signingIn">
            <Admin :teams="teams"
                   :events="events"
                   :db="db"
                   :currName="currName"
                   :userStatus="userStatus">
            </Admin>
        </div>

        <router-view></router-view>

    </div>
</template>

<script>
    import Firebase from 'firebase'

    import Personal_Schedule from './components/Personal_Schedule.vue'
    import Global_Schedule from './components/Global_Schedule.vue'
    import Event_Creator from './components/Event_Creator.vue'
    import Events_Calendar from './components/Events_Calendar.vue'
    import Personal_Availability from './components/Personal_Availability.vue'
    import Schedule_Builder from './components/Schedule_Builder.vue'
    import Team_Schedule from './components/Team_Schedule.vue'
    import Login from './components/Login.vue'
    import Guest from './components/Guest.vue'
    import User from './components/User.vue'
    import Admin from './components/Admin.vue'
    import Register from './components/Register.vue'

    var config = {
        apiKey: "AIzaSyCk3ttnDL-mfdMNJO27thtvd31CvRxpmvM",
        authDomain: "final-efcc8.firebaseapp.com",
        databaseURL: "https://final-efcc8.firebaseio.com",
        projectId: "final-efcc8",
        storageBucket: "final-efcc8.appspot.com",
        messagingSenderId: "718555914790"
    };

    var db = Firebase.initializeApp(config).database();
    var teamsRef = db.ref('Teams');
    var eventsRef = db.ref('events');

    export default {
        name: 'app',
        data () {
            return {
                storage: teamsRef,
                currName: "matt",
                nameInput: '',
                db: db,
                userStatus: 'guest',
                signingIn: false,
                registering: false,
                userEmail: '',
                people: [],
                showAllTeams: false
            }
        },
        firebase: {
            teams: teamsRef,
            events: eventsRef
        },
        computed: {
            firebase_teams: function() {
                this.teams.filter(team => team['code'] === 'TEAM 0');
            },
            curr_team: function() {
                return this.teams.filter(team => this.containsName(team, this.currName))[0];
            },
            curr_person: function() {
                if (this.curr_team !== undefined) {
                    return this.curr_team["People"].filter(person => person["name"] === this.currName)[0];
                }
            },
            availability_ref: function() {
                return 'Teams/' + this.curr_team['.key'] + "/People/" + this.curr_person['key'] + "/available/";
            },
            schedule_ref: function() {
                return 'Teams/' + this.curr_team['.key'] + "/People/" + this.curr_person['key'] + "/schedule/";
            }
        },
        components: {
            Personal_Schedule,
            Global_Schedule,
            Events_Calendar,
            Event_Creator,
            Personal_Availability,
            Schedule_Builder,
            Team_Schedule,
            Login,
            Guest,
            User,
            Admin,
            Register
        },
        methods: {
            refresh: function() {
                this.$router.push('/');
            },
            onUpdateUser(newStatus) {
                this.userStatus = newStatus;
                this.signingIn = false;
            },
            onUpdateName(newName) {
                this.currName = newName.split("@")[0];
            },
            goToLogin: function() {
                this.signingIn = true;
            },
            containsName: function(team, name) {
                try {
                    team["People"].forEach(person => console.log(person));
                    return team["People"].filter(person => person["name"] === name).length >= 1;
                } catch(err) {
                }
            },
            submitName: function() {
                this.currName = this.nameInput;
                this.nameInput = '';
            },
            test: function() {
                console.log(this.containsName('TEAM 0', 'Matt'));
                console.log('a');
            },
            createSchedule: function() {
                db.ref("Teams/" + this.curr_team[".key"] + "/People/" + this.curr_person["key"] + "/schedule").set(
                    this.generateRandomSchedule());
            },
            generateRandomSchedule: function() {
                return this.curr_person["schedule"].map(arr => arr.map(bool => Math.random() >= 0.5));
            },
            logout: function() {
                var sure = confirm("Are you sure you want to log out?");
                if (sure) {
                    this.userStatus = 'guest';
                }
            },
            showPlayers: function(team) {
                this.people = team["People"].map(person => person['name']);
            }
        }
    }

    $(document).ready(function(){
        $(document).on('click', '#openBtn', function() {
            $('.sidenav').css('width', '20%');
            $('body').css('margin-left', '20%');
        });
        $(document).on('click', '#closeBtn', function() {
            $('.sidenav').css('width', '0');
            $('body').css('margin-left', '0');
        });
    });

</script>

<style lang="scss">
    body {
        background-color: aliceblue;
    }
    .routerLink, .routerLink:hover, .routerLink:visited, .routerLink:active, .routerLink:link {
        color: black;
        text-decoration: none;
        cursor: pointer;
    }
    h1 {
        font-family: Didot;
        text-align: center;
        font-weight: bold;
        font-size: 3em;
    }
    .nav {
        margin-left: 3%;
        margin-top: 2%;
        font-size: 3em;
        position: absolute;
        z-index: 1;
    }
    .teamName {
        right: 0;
        margin-right: 1.5%;
        margin-top: -4.5%;
        position: absolute;
        font-family: Didot;
        font-size: 2.5em;
    }
    .calendar {
        margin-left: 10%;
    }
    .userIcon {
        font-size: 0.8em;
    }
    .navIcon {
        color: black;
    }
    .signInBtn {
        background-color: white;
        border-radius: 5px;
        border: 0;
        width: 30%;
        font-size: 1.5em;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        padding: 2%;
        margin-top: 3%;
        margin-left: 65%;
        color: navy;
        font-weight: bold;
        text-decoration: none;
    }
    .createScheduleBtn {
        margin: 0 auto;
        width: 15%;
    }
    .sidenav {
        background-color: white;
        height: 100%; width: 0;
        position: fixed;
        top: 0; left: 0;
        overflow: hidden;
        padding-top: 10%;
        text-align: center;
    }
    .sidenav, .navOption {
        display: block;
        padding-bottom: 5%;
        font-family: Didot;
        text-transform: lowercase;
        font-size: 2em;
    }
    .sidenav, .closebtn, .closebtn:hover {
        position: absolute;
        top: 0; right: 10%;
        font-size: 3em;
        color: black;
        text-decoration: none;
    }
    .didDukeOption {
        padding-top: 50%;
        text-transform: uppercase;
        color: navy;
        font-weight: bold;
        font-size: 2em;
        font-family: Arial;
        text-transform: uppercase;
        text-align: center;
        padding-top: 60%;
    }
    .welcomeMsg {
        font-family: Didot;
        text-align: left;
        font-style: italic;
        font-size: 2.2em;
        margin-left: 30%;
        margin-top: 6%;
    }
    .profileIcon {
        color: navy;
        padding-bottom: 5%;
        font-size: 3em;
        border: none;
        margin-right: 10%;
        margin-top: 10%;
    }
    .dropdown {
        position: relative;
        display: inline-block;
        float: right;
        margin-right: 3%;
        margin-top: -12%;
    }
    .dropdown-content {
        display: none;
        position: absolute;
        font-size: 1.2em;
        background-color: #f1f1f1;
        width: 350%;
        z-index: 1;
        right: 0;
    }
    .dropdown-content a {
        color: black;
        padding: 10%;
        font-weight: bold;
        text-align: center;
        display: block;
    }
    .dropdown-content a:hover {
        background-color: #ddd;
        font-style: italic;
        text-decoration: none;
    }
    .dropdown:hover .dropdown-content {
        display: block;
    }
</style>
