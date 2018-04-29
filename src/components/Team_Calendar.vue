<template>
<!-- template must have a SINGLE root tag that encloses all others -->
    <div id="app">
    <table>
      <tr>
        <th v-for="n in 14">
          {{convert_to_time(n)}}
        </th>
      </tr>
      <tr class="border" v-for="(one, col) in schedule">
        Day {{col+1}}
        <th class="border" v-for="(two, row) in one" v-bind:style="styling[people_in_cell(col, row)]">
          <ul v-for="person in two">
            <li>{{person}}</li>
          </ul>
        </th>
      </tr>
      <!--<p>{{test[0]}}</p>-->
    </table>
  </div>
</template>

<script>
  // export anonymous object from this module so it can be accessed by others when imported
  export default {
    name: 'Personal_Calendar',
    props: [ 'schedule'],
    data: function() {
      return {
        thing: "Hi",
        styling: {
          0: {
            backgroundColor: 'red'
          },
          1: {
            backgroundColor: 'orange'
          },
          2: {
            backgroundColor: 'green'
          }
        }
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
      },
      people_in_cell(day, hour) {
        if (this.schedule[day][hour] == undefined) {
          return 0;
        } else {
          return this.schedule[day][hour].length;
        }

      }
    }

  }
</script>

<style lang="scss">
</style>


