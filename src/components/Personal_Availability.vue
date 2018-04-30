<template>
  <div id="app">
    <table>
      <tr>
        <th class="time" v-for="n in 14">
          {{convert_to_time(n)}}
        </th>
      </tr>
      <tr class="border" v-for="(one, col) in schedule">
          <div class="day"><br>Day {{col+1}}</div><br>
            <th class="rows" @click="toggleAvailability(col, row)" v-for="(two, row) in one" v-bind:style="[two ? trueStyle : falseStyle]">
            </th>
       </tr>
      <!--<p>{{test[0]}}</p>-->
    </table>
  </div>
  <!-- template must have a SINGLE root tag that encloses all others -->
</template>

<script>
  // export anonymous object from this module so it can be accessed by others when imported
  export default {
    name: 'Personal_Availability',
    props: [ 'schedule', 'storage_ref', 'db'],
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
        }
      },
      toggleAvailability(col, row) {
        this.db.ref(this.storage_ref + col.toString() + "/" + row.toString()).set(
          !this.schedule[col][row]
        );

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
    table {
        width: 97%;
    }
</style>