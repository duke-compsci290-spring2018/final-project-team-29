<template>
  <!-- template must have a SINGLE root tag that encloses all others -->
  <table>
    <tr>
      <th v-for="n in 14">
        {{convert_to_time(n)}}
      </th>
    </tr>
    <tr class="border" v-for="(one, index1) in schedule">
      Day {{index1+1}}
      <th class="border" v-for="(two, index2) in one" v-bind:style="[two ? trueStyle : falseStyle]">
      </th>
    </tr>
    <!--<p>{{test[0]}}</p>-->
  </table>
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
  .border {
    border: 1px solid black;
    width: 50px;
  }
  .green {
    background-color: green;

  }
</style>


