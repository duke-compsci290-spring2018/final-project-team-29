<template>
  <div id="app">
    <label>Enter number of slots to schedule</label>
    <input v-model="slotsToSchedule">
    <button @click="generateSchedule">Generate schedule based on availability</button>
    <br/>
    <button @click="resetSchedule">Reset Schedule (REMOVES ALL SCHEDULE SLOTS)</button>
  </div>
  <!-- template must have a SINGLE root tag that encloses all others -->
</template>

<script>
  // export anonymous object from this module so it can be accessed by others when imported
  export default {
    name: 'Schedule_Builder',
    props: [ 'availability_schedule', 'schedule_ref', 'db', 'curr_team', 'personal_schedule'],
    data: function() {
      return {
        slotsToSchedule: 0
      }
    },
    methods: {
      slotFull: function(day, hour) {
        return this.curr_team["People"].filter(person => person["schedule"][day][hour]).length >= 2;
      },
      generateSchedule: function() {
        var i = 0;
        this.availability_schedule.forEach((arr, day) => arr.forEach((bool, hour) => {
          if (bool && i < this.slotsToSchedule && !this.slotFull(day, hour) && !this.personal_schedule[day][hour]) {
            this.db.ref(this.schedule_ref + "/" + day.toString() + "/" + hour.toString()).set(true);
            i++;
          }
        }))
      },
      resetSchedule: function() {
        this.personal_schedule.forEach((arr, day) => arr.forEach((bool, hour) =>
          this.db.ref(this.schedule_ref + "/" + day.toString() + "/" + hour.toString()).set(false)
        ));

      }

    }

  }
</script>

<style lang="scss">
</style>


