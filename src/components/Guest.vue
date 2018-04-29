<template>
  <div id="app">
    <div class="calendar"> 
        <ul>
            <li class="prev" v-if="event" v-on:click="global = true; event = false">&#10094;</li>
            <li class="next" v-if="global" v-on:click="event = true; global = false">&#10095;</li>
            <li v-if="global">Global Calendar</li>
            <li v-if="event">Event Calendar</li>
        </ul>
    </div>
      
    <div v-if="global">
        <Global_Schedule :teams="teams">
        </Global_Schedule>
    </div>
      
    <div v-if="event">
        <Events_Calendar :events="events">
        </Events_Calendar>
    </div>
  </div>
</template>

<script>

  import Global_Schedule from './Global_Schedule.vue'
  import Events_Calendar from './Events_Calendar.vue'

  export default {
    name: 'app',
    props: ['teams', 'events'],
    data: function() {
      return {
        global: true,
        event: false
      }
    },
    components: {
      Global_Schedule,
      Events_Calendar
    }
  }
</script>

<style lang="scss">
    ul {
        list-style-type: none;
    }
    .calendar {
        padding: 3% 5%;
        width: 90.1%;
        margin: 0 auto;
        background: navy;
        text-align: center;
    }
    .calendar ul {
        margin: 0;
        padding: 0;
    }
    .calendar ul li {
        color: white;
        font-size: 3em;
        font-family: Didot;
        text-transform: uppercase;
        letter-spacing: 3px;
    }
    .calendar .prev {
        float: left;
    }
    .calendar .next {
        float: right;
    }
    .border {
        font-family: Didot;
        margin: 0;
        padding: 0 0;
        with: 80%;
        background-color: #f6f6f6;
        text-transform: uppercase;
    }
    .border li {
        display: inline-block;
        width: 2%;
        color: black;
        text-align: center;
    }
    .border tr {
        padding: 10%;
    }
    th {
        font-family: Didot;
        margin: 0;
        padding: 1% 0;
        background-color: #f6f6f6;
        text-transform: uppercase;
        text-align: center;
    }
    .people {
        font-family: Didot;
        margin: 0;
        margin-left: -20%;
        font-size: 0.65em;
        background-color: #f6f6f6;
        text-align: left;
    }
    .events {
        font-family: Didot;
        margin: 0;
        margin-left: -15%;
        font-size: 0.8em;
        background-color: #f6f6f6;
        text-align: left;
    }
    table {
        margin-left: 4.9%;
        width: 90.1%;
    }
    .day {
        text-align: center;
    }
</style>
