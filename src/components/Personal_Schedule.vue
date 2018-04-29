<template>
  <div id="app">
    <Personal_Calendar :schedule='person_schedule'

    ></Personal_Calendar>
  </div>

</template>

<script>
  import Personal_Calendar from './Personal_Calendar.vue'
  import Personal_Availability from './Personal_Availability.vue'


  export default {
    name: 'app',
    props: ['teamsRef', 'teams', 'name', 'team'],
    methods: {
      push: function() {
        this.teamsRef.push("TESTING");
      }
    },
    computed: {
      person_schedule: function() {
        return this.team["People"].filter(person => person["name"] === this.name)[0]["schedule"];
      },
      team_key: function() {
        console.log("A")
        console.log(this.team['.key']);
        return this.team[".key"];
      }
    },
    components: {
      Personal_Calendar,
      Personal_Availability
    }
  }
</script>

<style lang="scss">
</style>
