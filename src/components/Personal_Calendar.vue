<template>
  <!-- template must have a SINGLE root tag that encloses all others -->
  <table>
    <tr v-for="(one, index1) in test">
      Day {{index1+1}}
      <th v-for="(two, index2) in one" v-bind:style="[two ? trueStyle : falseStyle]">

      </th>
    </tr>
    <!--<p>{{test[0]}}</p>-->
  </table>
</template>

<script>
  // export anonymous object from this module so it can be accessed by others when imported
  export default {
    name: 'Personal_Calendar',
    props: [ 'test'],
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


