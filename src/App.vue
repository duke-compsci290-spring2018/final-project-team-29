<template>
  <div id="app">
    <label>Input a user to see their schedule (Eg. "Matt", "Matthew", "Christine", "Other")</label>
    <input v-model="nameInput">
    <button @click="submitName">View Info</button>
    <p>{{currName}} is part of {{curr_team["code"]}}</p>
    <br/>
    <h1>Personal Availability: Click any cell to edit</h1>
    <Personal_Availability :schedule="curr_person['available']"
                           :storage_ref="availability_ref"
                           :db="db"

    ></Personal_Availability>

    <Personal_Schedule :teamsRef="storage"
                       :teams="teams"
                       :name="currName"
                       :team="curr_team"
    >
    </Personal_Schedule>
    <button @click="createSchedule">Generate a random schedule for this user</button>
    <br/> <br/>
    <New_User :teams="teams"
              :teamsRef="storage">
    </New_User>
    <h1>Global Calendar:</h1>
    <Global_Schedule :teams="teams"
    >

    </Global_Schedule>
    <h1>Events Calendar:</h1>
    <br/>
    <Event_Creator :db="db"
                   :events="events"
    ></Event_Creator>
    <br/>
    <br/>
    <Events_Calendar :events="events">

    </Events_Calendar>

    <!--<div v-for="arr in events">-->
      <!--<div v-for="event in arr">-->
        <!--<div v-for="bool in event">-->
          <!--{{bool}}-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--<p>{{events[0]['.value']}}</p>-->


  </div>

</template>

<script>
  import Firebase from 'firebase';

  import Schedule_Builder from './components/Schedule_Builder.vue'
  import Personal_Schedule from './components/Personal_Schedule.vue'
  import New_User from './components/New_User.vue'
  import Global_Schedule from './components/Global_Schedule.vue'
  import Event_Creator from './components/Event_Creator.vue'
  import Events_Calendar from './components/Events_Calendar.vue'
  import Personal_Availability from './components/Personal_Availability.vue'


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
      db: db
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

    }
  },
  components: {
    Schedule_Builder,
    Personal_Schedule,
    New_User,
    Global_Schedule,
    Events_Calendar,
    Event_Creator,
    Personal_Availability
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
</script>

<style lang="scss">
</style>
