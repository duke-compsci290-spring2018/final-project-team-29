<template>
  <div v-if="curr_team != undefined" id="app">
    
    <Authentication :getUser="getUser"
                    :setUser="setUser">
    </Authentication>
                    
    <button @click="modeOfViewing = 'guest'">Guest</button>
    <button @click="modeOfViewing = 'user'">User</button>
    <button @click="modeOfViewing = 'admin'">Admin</button>

    <div v-if="modeOfViewing === 'guest'">
      <Guest :teams="teams"
             :events="events"
      ></Guest>
      <br/>
    </div>
      
      <User v-if="userStatus === 'user' && signingIn === false"
            :name="name"
            :teams="teams"
            :events="events"
            :db="db"
            :teamsRef="teamsRef">
      </User>

      <Admin v-if="userStatus === 'admin' && signingIn === false"
             :teams="teams"
             :events="events">
      </Admin>

      <div v-if="!showLoginReg">
          <Login :teams="teams"
                 :userStatus="userStatus"
                 @updateUserStatus="onUpdateUser">
          </Login>
      </div>
      
      <router-view></router-view>
      
      <a href="https://diddukewin.com" class="didduke">did duke win?</a>

  </div>
</template>

<script>
    import Firebase from 'firebase';
    
  import Personal_Schedule from './components/Personal_Schedule.vue'
  import New_User from './components/New_User.vue'
  import Global_Schedule from './components/Global_Schedule.vue'
  import Event_Creator from './components/Event_Creator.vue'
  import Events_Calendar from './components/Events_Calendar.vue'
  import Personal_Availability from './components/Personal_Availability.vue'
  import Schedule_Builder from './components/Schedule_Builder.vue'
  import Team_Schedule from './components/Team_Schedule.vue'
  import Authentication from './components/Authentication.vue'
  import Guest from './components/Guest.vue'
  import User from './components/User.vue'
  import Admin from './components/Admin.vue'

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
      currName: "Matt",
      nameInput: '',
      db: db,
      modeOfViewing: ''
    }
  },
  firebase: {
    teams: teamsRef,
    events: eventsRef
  },
  computed: {
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
    New_User,
    Global_Schedule,
    Events_Calendar,
    Event_Creator,
    Personal_Availability,
    Schedule_Builder,
    Team_Schedule,
    Authentication,
    Guest,
    User,
    Admin
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
      db.ref("Teams/" + this.curr_team[".key"] + "/People/" + this.curr_person["key"] + "/schedule").set(
        this.generateRandomSchedule());
    },
    generateRandomSchedule: function() {
      return this.curr_person["schedule"].map(arr => arr.map(bool => Math.random() >= 0.5));
    },
    getUser () {
        return this.user;
    },
    setUser (user) {
        this.user = user;
    },
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
    h2 {
        text-align: center;
        font-style: italic;
        font-size: 1.5em;
    }
    .nav {
        margin-left: 3%;
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
