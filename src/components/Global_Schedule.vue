<template>
  <div id="app">
    <Global_Calendar :schedule="data_map">

    </Global_Calendar>
  </div>
</template>

<script>

  import Global_Calendar from './Global_Calendar.vue'

  // export anonymous object from this module so it can be accessed by others when imported
  export default {
    name: 'Personal_Calendar',
    props: [ 'teams'],
    data: function() {
      return {
        thing: "Hi",
        trueStyle: {
          backgroundColor: 'green'
        },
        falseStyle: {
          backgroundColor: 'red'
        }
      }
    },
    computed: {
      data_map: function() {
        var final_data = [[], [], [], [], []];
        this.teams.forEach(team => team['People'].forEach(person => {
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
        }));
        // this.teams.forEach(team => team["People"].forEach(person => myMap.set(person["name"], person["schedule"])));
        // console.log(myMap);
        return final_data;
      }

    },
    methods: {
      convert_to_time(n) {
        if (parseInt(n) == 5) {
          return "NOON";
        }
        else if (parseInt(n) >= 6) {
          return (n-5).toString() + "pm";
        }
        else if (parseInt(n) >= 2) {
          return (n+7).toString() + "am";
        } else {

        }
      }
    },
    components: {
      Global_Calendar
    }

  }
</script>

<style lang="scss">
  .border {
    border: 1px solid black;
  }
  .green {
    background-color: green;

  }
</style>


