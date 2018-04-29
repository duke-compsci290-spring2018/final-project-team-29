<template>
  <div id="app">
      
    <h1>Global Calendar:</h1>
    <Global_Schedule :teams="teams">
    </Global_Schedule>
      
    <h1>Events Calendar:</h1><br><br>
    <Events_Calendar :events="events">
    </Events_Calendar>
  </div>
</template>

<script>

  import Global_Schedule from './Global_Schedule.vue'
  import Events_Calendar from './Events_Calendar.vue'

  export default {
    name: 'app',
    props: ['teams', 'events'],
    components: {
      Global_Schedule,
      Events_Calendar
    }
  }
</script>

<style lang="scss">
</style>