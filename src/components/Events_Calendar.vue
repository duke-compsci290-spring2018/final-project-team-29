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
            <th class="rows" v-for="(two, row) in one['.value']">
              <ul class="events" v-for="event in two">
                  <li><i class="globalIcon fa fa-calendar-o" aria-hidden="true">{{event}}</i><br><br></li>
              </ul>
            </th>
          </tr>
    </table><br>
      <button class="generate" v-if="showButton" @click="showbball">Show Games</button>
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
        showButton: true
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
        try {
          return parseInt(time.split("pm")[0]) + 3;
        } catch(err) {
          try {
            return parseInt(time.split("am")[0]) + 3;
          } catch(e) {
            return 3;
          }
        }
      },
      convert_to_date(string) {
        return parseInt(string.split(' ')[1]) - 1;
      },
      convert_to_name(school, home, bool) {
        if (bool) {
          return 'MENS BASKETBALL: Playing ' + school + ' @ ' + home;
        } else {
          return 'WOMENS BASKETBALL: Playing ' + school + ' @ ' + home;
        }
      },
      addEvent(data, men) {
        for (var i=0; i<parseInt(data['length']); i++) {
          var specific_data = this.events[this.convert_to_date(data['day']).toString()]['.value'][this.convert_time_to_int(data['time'])+i]
          console.log(specific_data);
          if (!specific_data) {
            this.events[this.convert_to_date(data['day']).toString()]['.value'][this.convert_time_to_int(data['time'])+i] = []
          }
          this.events[this.convert_to_date(data['day']).toString()]['.value'][this.convert_time_to_int(data['time'])+i]
            .push(this.convert_to_name(data['opponent'], data['location'], men));
        }
      },
      showbball() {
        this.showButton=false;
        var men_data = require("../data/mens_bball.json");
        this.addEvent(men_data['0'], true);
        this.addEvent(men_data['1'], true);
        this.addEvent(men_data['2'], true);
        var women_data = require("../data/womens_bball.json");
        this.addEvent(women_data['0'], false);
        this.addEvent(women_data['1'], false);
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


