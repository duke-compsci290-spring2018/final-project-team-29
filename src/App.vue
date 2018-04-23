<template>
  <div id="app">
    <div v-for="team in teams">
      <p>{{team}}</p>
    </div>
    <h1>Personal Calendar:</h1>
    <Personal_Calendar :test="calendarInfo"></Personal_Calendar>
    <Schedule_Builder> :test="calendarInfo"</Schedule_Builder>
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
    console.log(this.books);
    return {
      calendarInfo: [
        [true, true, true, false, false, false, false, true],
        [true, true, false, false, false, true, false, true],
        [true, false, true, true, false, false, true, false],
        [false, true, true, true, false, false, false, true],
        [false, false, false, true, false, false, false, false]
      ],
      msg: 'This is a cool calendar!',
      teams: [1,2,3,4,5]
    }
  },
  firebase() {
    return {
      teams: teamsRef
    }
  },
  components: {
    Personal_Calendar,
    Schedule_Builder
  }
}
</script>

<style lang="scss">
</style>
