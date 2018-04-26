<template>
  <div id="app">
    <h2>Personal Calendar:</h2>
    <div v-for="team in teams">
      {{team.code}}
    </div>
    <button @click="push">Firebase</button>
  </div>

</template>

<script>
  //

  export default {
    name: 'app',
    props: ['db', 'teamsRef', 'teams'],
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
    methods: {
      push: function() {
        this.teamsRef.push("TESTING");
      }
    }
    // firebase: {
    //   teams: teamsRef
    // }
  }
</script>

<style lang="scss">
</style>
