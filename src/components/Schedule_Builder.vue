<template>
  <div id="slots">
    <br><label class="enter">Enter number of slots:</label>
    <input class="slots" v-model="slotsToSchedule"><br><br>
    <button class="best" @click="generateSchedule">Generate best schedule</button><br><br>
    <button class="reset" @click="resetSchedule">Reset all scheduled slots</button>
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
    .enter {
        margin-left: 6%;
    }
    .slots {
        width: 3%;
    }
    .best, .reset, .random {
        background-color: #abbeff;
        color: black;
        border-radius: 5px;
        border: 0;
        width: 33%;
        font-size: 1em;
        text-transform: uppercase;
        font-weight: bold;
        padding: 1.8%;
    }
    .best {
        background-color: #e8ffe3;
    }
    .reset {
        background-color: #ffdce2;
    }
    #slots {
        margin-left: 40%;
    }
</style>


