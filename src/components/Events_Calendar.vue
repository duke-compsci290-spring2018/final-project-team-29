<template>
  <div id="app">
    {{jsonPath}}
    <table>
      <tr>
        <th v-for="n in 14">
          {{convert_to_time(n)}}
        </th>
      </tr>
      <tr class="border" v-for="(one, col) in events">
        Day {{col+1}}
        <th class="border" v-for="(two, row) in one['.value']">
          <ul v-for="event in two">
            <li>{{event}}</li>
          </ul>
        </th>
      </tr>
      <!--<p>{{test[0]}}</p>-->
    </table>
  </div>
  <!-- template must have a SINGLE root tag that encloses all others -->

</template>
this.jsonPath = require("../data/" + path + ".json" );

<script>
  // export anonymous object from this module so it can be accessed by others when imported
  export default {
    name: 'Personal_Calendar',
    props: [ 'events'],
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
      convert_time_to_int(time) {
        
      }
    },
    computed: {
      jsonPath: function() {
        var data = require("../data/mens_bball.json");
        return data[0];
      }
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


