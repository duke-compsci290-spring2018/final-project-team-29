<template>
  <div id="app">
    <Personal_Calendar :test="calendarInfo"></Personal_Calendar>
  </div>
</template>

<script>

  import Personal_Calendar from './components/Personal_Calendar.vue'

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
      msg: 'This is a cool calendar!'
    }
  },
  components: {
    Personal_Calendar
  }
}
</script>

<style lang="scss">
</style>
