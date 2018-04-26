<template>
  <div id="app">
      <div class="nav" id="openBtn">☰</div>
      <div class="sidenav">
          <a href="javascript:void(0)" class="closebtn" id="closeBtn">&times;</a>
          <tr class="navOption">
              <router-link to="/team" class="routerLink">
                  <span class="glyphicon glyphicon-group"></span>Team
              </router-link>
          </tr>
          <tr class="navOption">
              <span class="navIcon glyphicon glyphicon-cogwheels"></span>Settings
          </tr>
      </div>
    
      <h1><router-link to="/" class="routerLink">K-VITE</router-link></h1>
      <div class="teamName" v-for="team in teams">
          <router-link to="/login">
              <button class="signInBtn">Sign in</button>
          </router-link>
      </div>
      
      <router-view></router-view>
      
      <div class="col-lg-12">
          <label>Input a user to see their schedule (Eg. "Matt", "Matthew", "Christine", "Other")</label><br>
          <input v-model="nameInput"><button @click="submitName">View Info</button>
          {{currName}} is part of {{curr_team["code"]}}
      </div>
      
      <div class="col-lg-12">
          <Personal_Schedule :teamsRef="storage"
                             :teams="teams"
                             :name="currName"
                             :team="curr_team">
          </Personal_Schedule><br>
      </div>
      <div class="createScheduleBtn">
        <button @click="createSchedule">Generate random schedule</button>
      </div>
      <a href="https://diddukewin.com" class="didduke">did duke win?</a>
  </div>
</template>

<script>
    import Firebase from 'firebase'
    import Schedule_Builder from './components/Schedule_Builder.vue'
    import Personal_Schedule from './components/Personal_Schedule.vue'
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
    
    export default {
        name: 'app',
        data () {
            return {
                storage: teamsRef,
                currName: "Matt",
                nameInput: '',
                username: '',
                useremail: ''
            }
        },
        firebase: {
            teams: teamsRef
        },
        computed: {
            curr_team: function() {
                return this.teams.filter(team => this.containsName(team, this.currName))[0];
            },
            curr_person: function() {
                return this.curr_team["People"].filter(person => person["name"] === this.currName)[0];
            }
        },
        components: {
            Schedule_Builder,
            Personal_Schedule,
            Register
        },
        methods: {
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
                console.log(this.curr_team);
            },
            createSchedule: function() {
                console.log("Teams/" + this.curr_team[".key"] + "/People/" + this.curr_person["key"] + "/schedule");
                db.ref("Teams/" + this.curr_team[".key"] + "/People/" + this.curr_person["key"] + "/schedule").set(
                this.generateRandomSchedule());
            },
            generateRandomSchedule: function() {
                return this.curr_person["schedule"].map(arr => arr.map(bool => Math.random() >= 0.5));
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
    .signInBtn {
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
    .createScheduleBtn {
        margin: 0 auto;
        width: 15%;
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