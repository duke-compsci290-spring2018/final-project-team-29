<template>
  <div id="app">
    <Button @click="showEvents = !showEvents">Click here to add a new event</Button>
    <div v-if="showEvents">
      <Label>Input a new event</Label>
      <input v-model="eventName">
      <br/>
      <Label>Select days for this event</Label>
      <br/>
      <input type="checkbox" value="0" v-model="days">
      <label>Day 1 </label>
      <input type="checkbox" value="1" v-model="days">
      <label>Day 2 </label>
      <input type="checkbox" value="2" v-model="days">
      <label>Day 3 </label>
      <input type="checkbox" value="3" v-model="days">
      <label>Day 4 </label>
      <input type="checkbox" value="4" v-model="days">
      <label>Day 5 </label>
      <br/>
      <Label>Select hours for this event</Label>
      <br/>
      <input type="checkbox" value="0" v-model="hours">
      <label>9am</label>
      <input type="checkbox" value="1" v-model="hours">
      <label>10am </label>
      <input type="checkbox" value="2" v-model="hours">
      <label>11am</label>
      <input type="checkbox" value="3" v-model="hours">
      <label>NOON</label>
      <input type="checkbox" value="4" v-model="hours">
      <label>1pm</label>
      <input type="checkbox" value="5" v-model="hours">
      <label>2pm</label>
      <input type="checkbox" value="6" v-model="hours">
      <label>3pm </label>
      <input type="checkbox" value="7" v-model="hours">
      <label>4pm</label>
      <input type="checkbox" value="8" v-model="hours">
      <label>5pm</label>
      <input type="checkbox" value="9" v-model="hours">
      <label>6pm</label>
      <input type="checkbox" value="10" v-model="hours">
      <label>7pm</label>
      <input type="checkbox" value="11" v-model="hours">
      <label>8pm</label>
      <input type="checkbox" value="12" v-model="hours">
      <label>9pm</label>
      <br/>
      <!--<span>Days: {{ days }}</span>-->
      <!--<span>Hours: {{ hours }}</span>-->
      <button @click="submitEvent">Submit</button>

    </div>


  </div>

</template>

<script>
  // export anonymous object from this module so it can be accessed by others when imported
  //TODO: Checkboxes are hard-coded, do them with a for loop using v-for
  export default {
    name: 'Personal_Calendar',
    props: [ 'db', 'events'],
    data: function() {
      return {
        showEvents: false,
        eventName: '',
        days: [],
        hours: [],
        day_data: [0,1,2,3,4,5]
      }
    },
    methods: {
      submitEvent: function() {
        this.days.forEach(day =>  this.hours.forEach(hour => {
          if (!this.events[day]['.value'][hour]) {
            this.db.ref("events/" + day.toString() + "/" + hour.toString() + "/0").set(this.eventName);
          } else {
            var event_size = this.events[day]['.value'][hour].length;
            this.db.ref("events/" + day.toString() + "/" + hour.toString() + "/" + event_size.toString()).set(this.eventName);
          }
        }));
        // this.days.forEach(day => this.hours.forEach(hour => this.db.ref("events/" + day.toString() + "/" +
        //   hour.toString()).push(this.eventName)));
      }

    }


  }
</script>

<style lang="scss">

</style>


