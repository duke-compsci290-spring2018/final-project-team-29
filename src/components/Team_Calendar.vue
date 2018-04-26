<template>
<!-- template must have a SINGLE root tag that encloses all others -->
    <div id="app">
        <h1>{{team.code}}</h1>
        <table>
            <tr v-for="(one, index1) in test">
            Day {{index1+1}}
                <th v-for="(two, index2) in one" v-bind:style="[two ? trueStyle : falseStyle]">

                </th>
            </tr>
        </table>
    </div>
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
</style>


