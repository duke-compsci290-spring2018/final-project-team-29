<template>
  <div id="app">
    <table>
        <tr>
            <th class="time" v-for="n in 14">
              {{convert_to_time(n)}}
            </th>
          </tr>
          <tr class="border" v-for="(one, col) in events">
              <div class="day"><br>D<br>a<br>y<br><br> {{col+1}}</div><br>
            <th class="border" v-for="(two, row) in one['.value']">
              <ul class="events" v-for="event in two">
                  <li><i class="fa fa-user" aria-hidden="true">{{event}}</i></li>
              </ul>
            </th>
          </tr>
    </table>
  </div>
  <!-- template must have a SINGLE root tag that encloses all others -->

</template>

<script>
  // export anonymous object from this module so it can be accessed by others when imported
  export default {
    name: 'Personal_Calendar',
    props: [ 'events'],
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


