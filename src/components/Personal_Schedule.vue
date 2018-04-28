<template>
  <div id="app">
    <h1>Personal Calendar:</h1>
    <Personal_Availability :schedule='person_schedule'
                           :storage="teamsRef"
                           :teamKey="team['.key']"

    ></Personal_Availability>
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
