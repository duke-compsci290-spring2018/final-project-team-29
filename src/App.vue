<template>
  <div id="app">
    <Personal_Schedule :db="db_data"
                       :teamsRef="storage"
                       :teams="teams"
    >

    </Personal_Schedule>
    <!--<h1>Personal Calendar:</h1>-->
    <!--<Personal_Calendar :schedule="calendarInfo"></Personal_Calendar>-->
    <!--<Schedule_Builder :schedule="calendarInfo"></Schedule_Builder>-->
    <!--<p>{{current_schedule[0]["code"]}}</p>-->
    <!--<p>{{curr_team_info}}</p>-->
    <!--<p>{{current_schedule}}</p>-->
    <!--<p>{{first_team["People"]}}</p>-->
    <!--<p>{{team_people}}</p>-->
    <!--<div v-for="thing in person_schedule">-->
      <!--<h1>This is the information for {{thing["code"]}}</h1>-->
      <!--This is the schedule for {{thing["People"][0]["name"]}}-->
      <!--<Personal_Calendar :test='thing["People"][0]["schedule"]'></Personal_Calendar>-->
      <!--This is the schedule for {{thing["People"][1]["name"]}}-->
      <!--<Personal_Calendar :test='thing["People"][1]["schedule"]'></Personal_Calendar>-->
      <!--<br/> <br/> <br/>-->
    <!--</div>-->
  </div>

</template>

<script>
  import Firebase from 'firebase';

  import Personal_Calendar from './components/Personal_Calendar.vue'
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
      // return this.curr_team_info();
      // var temp = this.teams.filter(team => team["code"] === "TEAM 0");
      // return temp[0]["People"].filter(person => person["name"] === this.currName);
        // .filter(person => person["name"] === this.currName);
    }
  },
  components: {
    Personal_Calendar,
    Schedule_Builder,
    Personal_Schedule
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
