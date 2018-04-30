<template>
    <div id="app">
        <table>
          <tr>
            <!--iterates through time and day possibilities to make calendar-->
            <th class="time" v-for="n in 14">
              {{convert_to_time(n)}}
            </th>
          </tr>
          <tr class="border" v-for="(one, col) in schedule">
              <div class="day"><br>D<br>a<br>y<br><br> {{col+1}}</div><br>
            <th class="rows" v-for="(two, row) in one">
              <!--displays each person for each day and time-->
              <ul class="people" v-for="person in two">
                  <li><i class="fa fa-user" aria-hidden="true">{{person}}</i></li>
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
    props: [ 'schedule'],
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
    .people {
        font-family: Didot;
        margin: 0;
        margin-left: -18%;
        font-size: 0.7em;
        background-color: #f6f6f6;
        text-align: left;
    }
</style>


