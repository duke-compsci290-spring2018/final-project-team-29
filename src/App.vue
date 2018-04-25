<template>
  <div id="app">
    <label>Input a user to see their schedule (Eg. "Matt", "Matthew", "Christine", "Other")</label>
    <input v-model="nameInput">
    <button @click="submitName">View Info</button>
    <p>{{currName}} is part of {{curr_team["code"]}}</p>
    <Personal_Schedule :teamsRef="storage"
                       :teams="teams"
                       :name="currName"
                       :team="curr_team"
    >
    </Personal_Schedule>
    <button @click="createSchedule">Generate a random schedule for this user</button>
  </div>

</template>

<script>
  import Firebase from 'firebase';

  import Schedule_Builder from './components/Schedule_Builder.vue'
  import Personal_Schedule from './components/Personal_Schedule.vue'


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
      nameInput: ''
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
    Personal_Schedule
  },
  methods: {
    containsName: function(team, name) {
      try {
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
