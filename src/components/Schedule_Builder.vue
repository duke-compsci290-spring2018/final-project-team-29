<template>
  <!-- template must have a SINGLE root tag that encloses all others -->
  <table>
    <tr v-for="i in 5">
      Day {{i}}
      <th v-for="j in 12" @click="method(i,j)">
        Hour {{j}}
      </th>
    </tr>
    <br/>
    <!--<div v-for="thing in schedule">-->
      <!--{{thing}}-->
    <!--</div>-->
    <!--<p>{{test[0]}}</p>-->
  </table>
</template>

<script>
  // export anonymous object from this module so it can be accessed by others when imported
  export default {
    name: 'Schedule_Builder',
    props: [ 'test'],
    data: function() {
      return {
        thing: "Hi",
        schedule: [new Array(5), new Array(5),new Array(5),new Array(5),new Array(5)]
      }
    },
    methods: {
      method: function(one, two) {
        console.log(one);
        console.log(two);

      }
    }

  }
</script>

<style lang="scss">
  table tr th {
    border: 1px solid black;
    width: 70px;
  }
  .green {
    background-color: green;

  }
</style>


