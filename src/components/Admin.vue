<template>
  <div id="app">
    <h3>All teams: (click to view players in a team and click a player to see their info)</h3>
    <div v-for="team in teams">
      <p @click="showPlayers(team)">{{team['code']}}</p>
    </div>
    <br/>
    <div v-for="person in people">
      <p @click="currName=person">{{person}}</p>
    </div>
    <br/> <br/>

    <label>Input a user to see their schedule (Eg. "Matt", "Matthew", "Christine", "Other")</label>
    <input v-model="nameInput">
    <button @click="submitName">View Info</button>

    <br/> <br/>

    <User v-if="currName !== ''" :name="currName"
          :teams="teams"
          :events="events"
          :db="db"
    ></User>

    <br/> <br/>

    <Event_Creator :db="db"
                   :events="events"
    ></Event_Creator>


  </div>

</template>

<script>

  import Personal_Schedule from './Personal_Schedule.vue'
  import New_User from './New_User.vue'
  import Global_Schedule from './Global_Schedule.vue'
  import Event_Creator from './Event_Creator.vue'
  import Events_Calendar from './Events_Calendar.vue'
  import Personal_Availability from './Personal_Availability.vue'
  import Schedule_Builder from './Schedule_Builder.vue'
  import Team_Schedule from './Team_Schedule.vue'
  import Guest from './Guest.vue'
  import User from './User.vue'

  export default {
    name: 'app',
    props: ['events', 'teams', 'db'],
    data () {
      return {
        storage: this.db.ref('Teams'),
        currName: "Matt",
        nameInput: '',
        people: []
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
      },
      all_teams: function() {
        return this.teams.map(team => team['.key']);
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
        this.currName = this.nameInput;
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
</style>
