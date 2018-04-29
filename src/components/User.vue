<template>
  <div id="app">
        <div class="calendar">
            <ul>
                <li class="prev" v-on:click="count--">&#10094;</li>
                <li class="next" v-on:click="count++">&#10095;</li>
                <li v-if="count % 6 === 0">Personal Availability<br><span class="subheading">Click on any cell to edit</span></li>
                <li v-if="count % 6 === 1">Personal Schedule<br><span class="subheading">Click button to generate a random schedule</span></li>
                <li v-if="count % 6 === 2">Schedule Builder</li>
                <li v-if="count % 6 === 3">Team Schedule</li>
                <li v-if="count % 6 === 4">Global Calendar</li>
                <li v-if="count % 6 === 5">Event Calendar</li>
            </ul>
        </div>

        <div v-if="count % 6 === 0">
            <Personal_Availability :schedule="curr_person['available']"
                                   :storage_ref="availability_ref"
                                   :db="db">
            </Personal_Availability>
        </div>

        <div v-if="count % 6 === 1">
            <Personal_Schedule :teamsRef="storage"
                               :teams="teams"
                               :name="name"
                               :team="curr_team">
            </Personal_Schedule>
        </div>


        <div v-if="count % 6 === 2">
            <Schedule_Builder :availability_schedule="curr_person['available']"
                              :schedule_ref="schedule_ref"
                              :db="db"
                              :curr_team="curr_team"
                              :personal_schedule="curr_person['schedule']">
            </Schedule_Builder>
        </div>

        <div v-if="count % 6 === 3">
            <Team_Schedule :curr_team="curr_team">
            </Team_Schedule>
        </div>

        <div v-if="count % 6 === 4">
            <Global_Schedule :teams="teams">
            </Global_Schedule>
        </div>

        <div v-if="count % 6 === 5">
            <Events_Calendar :events="events">
            </Events_Calendar>
        </div>
      <br><button class="generate" @click="createSchedule" v-if="count < 3">Generate random schedule</button><br>
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
  import Register from './Register'


  export default {
    name: 'app',
    props: ['name', 'teams', 'events', 'db', 'teamsRef'],
    data () {
      return {
        storage: this.db.ref('Teams'),
        nameInput: '',
        count: 0
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
    .subheading {
        font-size: 0.4em;
        font-style: italic;
    }
    .calendar li {
        line-height: 0.6em;
    }
    .generate {
        margin: 0 auto;
        display: block;
        background-color: #abbeff;
        color: black;
        border-radius: 5px;
        border: 0;
        width: 20%;
        font-size: 1em;
        text-transform: uppercase;
        font-weight: bold;
        padding: 1%;
    }
</style>
