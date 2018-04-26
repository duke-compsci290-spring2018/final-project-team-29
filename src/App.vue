<template>
  <div id="app">
    <div class="nav" id="openBtn">☰</div>
    <div class="sidenav">
        <a href="javascript:void(0)" class="closebtn" id="closeBtn">&times;</a>
        <tr class="navOption">
            <span class="glyphicon glyphicon-group"></span>Team
        </tr>
        <tr class="navOption">
            <span class="navIcon glyphicon glyphicon-cogwheels"></span>Settings
        </tr>
    </div>
    <h1>K-VITE</h1>
    <div class="teamName" v-if="signedIn" v-for="team in teams">
      {{team.code}} <span class="userIcon glyphicon glyphicon-user"></span>
    </div>
    <div class="teamName" v-if="!signedIn" v-for="team in teams">
        <button class="loginBtn"><router-link to="/login">Sign in</router-link></button>
    </div>
    <Personal_Schedule :db="db_data"
                       :teamsRef="storage"
                       :teams="teams">
    </Personal_Schedule>
    <a href="https://diddukewin.com" class="didduke">did duke win?</a>  
    <router-link to="/register">did duke win?</router-link>
  </div>
</template>

<script>
    import Firebase from 'firebase'
    import Register from './components/Register.vue'
    import Personal_Calendar from './components/Personal_Calendar.vue'
    import Personal_Schedule from './components/Personal_Schedule.vue'
    import Schedule_Builder from './components/Schedule_Builder.vue'
    import Team_Calendar from './components/Team_Calendar.vue'
    
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
    export default {
        name: 'app',
        data () {
            console.log(teams);
            return {
                calendarInfo: [
                    [true, true, true, false, false, false, false, true],
                    [true, true, false, false, false, true, false, true],
                    [true, false, true, true, false, false, true, false],
                    [false, true, true, true, false, false, false, true],
                    [false, false, false, true, false, false, false, false]
                ],
                db_data: db,
                storage: teamsRef,
                msg: 'This is a cool calendar!',
                currName: "Matt",
                currTeam: "TEAM 0"
            }
        },
        firebase: {
            teams: teamsRef
        },
        computed: {
            person_schedule: function() {
                console.log(this.teams[0]);
                this.teams.forEach(user => console.log(user));
                return this.teams;
            },
            first_team: function() {
                return this.teams[0];
            },
            team_people: function() {
                return this.teams[0]["People"];
            },
            curr_team_info: function() {
                return this.teams.filter(team => team["code"] === "TEAM 0")[0];
            },
            current_schedule: function() {
                return this.curr_team_info["People"].filter(person => person["name"] === this.currName)[0]["schedule"];
            }
        },
        components: {
            Personal_Calendar,
            Schedule_Builder,
            Personal_Schedule
        },
        methods: {
            testFirebase: function() {
                console.log(this.teams);
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
    h1 {
        font-family: Didot;
        text-align: center;
        font-weight: bold;
        font-size: 3em;
    }
    h2 {
        text-align: center;
        font-style: italic;
        font-size: 1.5em;
    }
    .nav {
        margin-left: 1.5%;
        margin-top: -1%;
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
    .loginBtn {
        color: navy;
        background-color: white;
        text-transform: uppercase;
        font-family: Arial;
        font-weight: bold;
        font-size: 0.8em;
        letter-spacing: 0.1em;
        text-align: center;
        border: 1% black;
    }
    .sidenav {
        background-color: white;
        height: 100%; width: 0;
        position: fixed; z-index: 1;
        top: 0; left: 0;
        overflow: hidden;
        padding-top: 30%;
        text-align: center;
    }
    .sidenav .navOption {
        display: block;
        padding-bottom: 5%;
        font-family: Didot;
        text-transform: uppercase;
        font-size: 2em;
    }
    .sidenav .closebtn {
        position: absolute;
        top: 0; right: 10%;
        font-size: 3em;
        color: black;
    }
    .didduke {
        color: navy;
        font-weight: bold;
        font-size: 1.2em;
        text-transform: uppercase;
        position: absolute;
        bottom: 2%; right: 1%;
    }
</style>