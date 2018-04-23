<template>
  <div id="app">
    <h1>Personal Calendar:</h1>
    {{teamsRef}}
  </div>

</template>

<script>

  import Firebase from '../App.vue';

  import Personal_Calendar from './Personal_Calendar.vue'


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
    props: [ 'name'],
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
    computed: {
      person_schedule: function() {
        this.teams.forEach(user => console.log(user));
        return this.teams;
      }
    },
    firebase: {
      teams: teamsRef
    }
  }
</script>

<style lang="scss">
</style>
