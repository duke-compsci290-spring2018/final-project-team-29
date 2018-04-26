<template>
  <div id="app">
    <h1>Personal Calendar:</h1>
    <Personal_Calendar :schedule='person_schedule'></Personal_Calendar>
  </div>

</template>

<script>
  import Personal_Calendar from './Personal_Calendar.vue'


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
      }
    },
    components: {
      Personal_Calendar
    }
  }
</script>

<style lang="scss">
</style>
