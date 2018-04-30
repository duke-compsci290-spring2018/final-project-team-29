<template>
  <div id="app">
    <br>
    <!--admin can view everything user does and more-->
    <User v-if="currName !== ''" :name="currName"
          :teams="teams"
          :events="events"
          :db="db"
          :userStatus="currentStatus">
    </User>
    <br><br>

  </div>

</template>

<script>

  import Personal_Schedule from './Personal_Schedule.vue'
  import Global_Schedule from './Global_Schedule.vue'
  import Events_Calendar from './Events_Calendar.vue'
  import Personal_Availability from './Personal_Availability.vue'
  import Schedule_Builder from './Schedule_Builder.vue'
  import Team_Schedule from './Team_Schedule.vue'
  import Guest from './Guest.vue'
  import User from './User.vue'

  export default {
    name: 'app',
    props: ['events', 'teams', 'db', 'currName', 'userStatus'],
    data () {
      return {
        storage: this.db.ref('Teams'),
        nameInput: '',
        people: [],
        currentStatus: this.userStatus
      }
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
      Global_Schedule,
      Events_Calendar,
      Personal_Availability,
      Schedule_Builder,
      Team_Schedule,
      Guest,
      User
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
        if (this.teams.filter(team => this.containsName(team, this.nameInput.toLowerCase())).length >= 1) {
          this.currName = this.nameInput.toLowerCase();
        } else {
          alert("This user is not in our system")
        }
        this.nameInput = '';
      },
      test: function() {
        console.log(this.curr_team);
      },
      createSchedule: function() {
        this.db.ref("Teams/" + this.curr_team[".key"] + "/People/" + this.curr_person["key"] + "/schedule").set(
          this.generateRandomSchedule());
      },
      generateRandomSchedule: function() {
        return this.curr_person["schedule"].map(arr => arr.map(bool => Math.random() >= 0.5));
      },
      showPlayers: function(team) {
        this.people = team["People"].map(person => person['name']);
      }
    }
  }
</script>

<style lang="scss">
    table {
        margin-left: 1.5%;
        width: 97%;
    }
</style>
