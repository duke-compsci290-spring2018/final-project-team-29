<template>
  <div id="app">
    <button id="eventBtn" class="addEventBtn">
        <i class="fa fa-plus-square" aria-hidden="true"></i>
    </button>
      
    <div class="modal"><br><br><br>
      <div class="eventModal">

        <span class="close">&times;</span>
        <br><label>New Event</label><br><br>
        <input v-model="eventName" class="eventInput" placeholder="Event Name">
        <br><br>
        
        <div class="left">  
            <span class="select">Select days for this event:</span>
            <br>
            <input type="checkbox" value="0" v-model="days">
            <label class="options">Day 1 </label>
            <input type="checkbox" value="1" v-model="days">
            <label class="options">Day 2 </label>
            <input type="checkbox" value="2" v-model="days">
            <label class="options">Day 3 </label>
            <input type="checkbox" value="3" v-model="days">
            <label class="options">Day 4 </label>
            <input type="checkbox" value="4" v-model="days">
            <label class="options">Day 5 </label>
            <br><br>
        </div>
        
        <div class="left">
            <span class="select">Select hours for this event:</span>
            <br>
            <input type="checkbox" value="0" v-model="hours">
            <label class="options">9am</label>
            <input type="checkbox" value="1" v-model="hours">
            <label class="options">10am </label>
            <input type="checkbox" value="2" v-model="hours">
            <label class="options">11am</label>
            <input type="checkbox" value="3" v-model="hours">
            <label class="options">NOON</label>
            <input type="checkbox" value="4" v-model="hours">
            <label class="options">1pm</label>
            <input type="checkbox" value="5" v-model="hours">
            <label class="options">2pm</label><br>
            <input type="checkbox" value="6" v-model="hours">
            <label class="options">3pm </label>
            <input type="checkbox" value="7" v-model="hours">
            <label class="options">4pm</label>
            <input type="checkbox" value="8" v-model="hours">
            <label class="options">5pm</label>
            <input type="checkbox" value="9" v-model="hours">
            <label class="options">6pm</label>
            <input type="checkbox" value="10" v-model="hours">
            <label class="options">7pm</label>
            <input type="checkbox" value="11" v-model="hours">
            <label class="options">8pm</label>
            <input type="checkbox" value="12" v-model="hours">
            <label class="options">9pm</label>
            <br><br>
        </div>
          
        <button @click="submitEvent" class="submitBtn">Submit</button><br><br>
      </div>
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
      }
    }
  }
    
    $(document).ready(function(){
        $(document).on('click', '#eventBtn', function() {
            $('.modal').css('display', 'block');
        });
        $(document).on('click', '.close', function() {
            $('.modal').css('display', 'none');
        });
        $(document).on('click', '.submitBtn', function() {
            $('.modal').css('display', 'none');
        });
    });
</script>

<style lang="scss">
    .addEventBtn {
        background-color: transparent;
        border: none;
        position: absolute;
        margin-left: 17%;
        margin-top: -2.4%;
    }
    .modal {
        display: none;
        position: fixed;
        z-index: 1;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0,0,0);
        background-color: rgba(0,0,0,0.4);
    }
    .eventModal {
        background-color: #fefefe;
        margin: auto;
        width: 40%;
        color: black;
    }
    .close {
        color: #aaa;
        float: right;
        padding-right: 2%;
        font-size: 1em;
        font-weight: bold;
    }
    .close:hover, .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
    }
    .select {
        font-size: 0.3em;
        font-family: Arial;
        font-weight: bold;
        font-style: italic;
    }
    .options {
        font-size: 0.3em;
        font-family: Arial;
        text-transform: lowercase;
        font-weight: none;
    }
    .left {
        text-align: left;
        margin-left: 4%;
    }
    .eventInput {
        width: 50%;
        font-size: 0.4em;
    }
    .submitBtn {
        background-color: #ffdce2;
        border-radius: 5px;
        border: 0;
        width: 30%;
        font-size: 0.6em;
        font-family: Arial;
        text-transform: uppercase;
        font-weight: bold;
        padding: 2%;
    }
</style>


