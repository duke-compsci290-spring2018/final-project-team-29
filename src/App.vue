<template>
  <div v-if="curr_team != undefined" id="app">
    <button @click="modeOfViewing = 'guest'">Guest</button>
    <button @click="modeOfViewing = 'user'">User</button>
    <button @click="modeOfViewing = 'admin'">Admin</button>


    <div v-if="modeOfViewing === 'guest'">
      <Guest :teams="teams"
             :events="events"
      ></Guest>
      <br/>
    </div>

    <div v-if="modeOfViewing === 'user'">
      <label>Input a user to see their schedule (Eg. "Matt", "Matthew", "Christine", "Other")</label>
      <input v-model="nameInput">
      <button @click="submitName">View Info</button>
      <br/>

      <User v-if="currName !== ''"
            :name="currName"
            :teams="teams"
            :events="events"
            :db="db"
      ></User>
    </div>
    <div v-if="modeOfViewing === 'admin'">
      <Admin :teams="teams"
             :events="events"
             :db="db"
      ></Admin>
    </div>

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
    }

  }
}
</script>

<style lang="scss">
</style>
