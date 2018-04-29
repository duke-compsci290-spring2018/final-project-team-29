<template>
  <div id="app">
    <label>Input a user to see their schedule (Eg. "Matt", "Matthew", "Christine", "Other")</label>
    <input v-model="nameInput" type="text">
    <button @click="submitName">View Info</button><br>
      
    <h1>Logged in as {{name}} (part of {{curr_team["code"]}})</h1>
    <br/>
    <h1>Personal Availability: Click any cell to edit</h1>
    <Personal_Availability :schedule="curr_person['available']"
                           :storage_ref="availability_ref"
                           :db="db">
    </Personal_Availability>

    <Personal_Schedule :teamsRef="storage"
                       :teams="teams"
                       :name="name"
                       :team="curr_team">
    </Personal_Schedule>
    
    <Schedule_Builder :availability_schedule="curr_person['available']"
                      :schedule_ref="schedule_ref"
                      :db="db"
                      :curr_team="curr_team"
                      :personal_schedule="curr_person['schedule']">
    </Schedule_Builder>
      
    <button @click="createSchedule">Generate a random schedule for this user</button>
    <br><br>

    <h1>Team Schedule: </h1>
    <Team_Schedule :curr_team="curr_team">
    </Team_Schedule>
    <br><br>

    <Guest :teams="teams"
           :events="events">
    </Guest>
      
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


  export default {
    name: 'app',
    props: ['name', 'teams', 'events', 'db', 'teamsRef'],
    data () {
      return {
        storage: this.db.ref('Teams'),
        nameInput: ''
      }
    },
    computed: {
      curr_team: function() {
        return this.teams.filter(team => this.containsName(team, this.name))[0];
      },
      curr_person: function() {
        if (this.curr_team != undefined) {
          return this.curr_team["People"].filter(person => person["name"] === this.name)[0];
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
      Guest
    },
    methods: {
      containsName: function(team, name) {
        try {
          team["People"].forEach(person => console.log(person));
          return team["People"].filter(person => person["name"] === name).length >= 1;
        } catch(err) {
        }
      },
      createSchedule: function() {
        this.db.ref("Teams/" + this.curr_team[".key"] + "/People/" + this.curr_person["key"] + "/schedule").set(
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
