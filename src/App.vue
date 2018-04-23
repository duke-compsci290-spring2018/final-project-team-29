<template>
  <div id="app">
    <h1>Personal Calendar:</h1>
    <Personal_Calendar :test="calendarInfo"></Personal_Calendar>
    <Schedule_Builder :test="calendarInfo"></Schedule_Builder>
    <div v-for="thing in person_schedule">
      This is the schedule for {{thing["People"][0]["name"]}}
      <Personal_Calendar :test='thing["People"][0]["schedule"]'></Personal_Calendar>
      <br/>
    </div>
  </div>

</template>

<script>
  import Firebase from 'firebase';

  import Personal_Calendar from './components/Personal_Calendar.vue'
  import Schedule_Builder from './components/Schedule_Builder.vue'


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
      calendarInfo: [
        [true, true, true, false, false, false, false, true],
        [true, true, false, false, false, true, false, true],
        [true, false, true, true, false, false, true, false],
        [false, true, true, true, false, false, false, true],
        [false, false, false, true, false, false, false, false]
      ],
      msg: 'This is a cool calendar!'

    }
  },
  firebase: {
    teams: teamsRef
  },
  computed: {
    person_schedule: function() {
      console.log(this.teams[0]);
      this.teams.forEach(user => console.log(user));
      return this.teams.filter(user => true);
    }
  },
  components: {
    Personal_Calendar,
    Schedule_Builder
  },
  methods: {
    testFirebase: function() {
      // teamsRef.push({
      //   Teams: "Matt"
      // });
      console.log(this.teams);
    }
  }
}
</script>

<style lang="scss">
</style>
