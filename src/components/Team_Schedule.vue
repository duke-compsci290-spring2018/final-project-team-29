<template>
  <!-- template must have a SINGLE root tag that encloses all others -->
  <div id="app">
    <Team_Calendar :schedule="team_schedule"
    >
    </Team_Calendar>
  </div>
</template>

<script>

  import Team_Calendar from './Team_Calendar.vue'


  // export anonymous object from this module so it can be accessed by others when imported
  export default {


    name: 'Personal_Calendar',
    props: [ 'curr_team'],
    data: function() {
      return {
        trueStyle: {
          backgroundColor: 'green'
        },
        falseStyle: {
          backgroundColor: 'red'
        }
      }
    },
    computed: {
      team_schedule: function() {
        var final_data = [[], [], [], [], []];
        this.curr_team['People'].forEach(person => {
          person['schedule'].forEach((day, row) => {
            day.forEach((hour, col) => {
              if (hour) {
                if (final_data[row][col] === undefined) {
                  final_data[row][col] = [person['name']];
                } else {
                  final_data[row][col].push(person['name']);
                }
              }
            })
          })
        });
        return final_data;
      }
    },
    components: {
      Team_Calendar
    }

  }
</script>

<style lang="scss">
  table tr th {
    border: 1px solid black;
    width: 50px;
  }
  .green {
    background-color: green;

  }
</style>


