<template>
  <div id="app">
    <div class="nav" id="openBtn">☰</div>
      
    <div class="sidenav">
        <a href="javascript:void(0)" class="closebtn" id="closeBtn">&times;</a>
        <tr class="navOption">
            <span class="glyphicon glyphicon-group"></span>Team
        </tr>
        <tr class="navOption">
            <span class="navIcon glyphicon glyphicon-cogwheels"></span>Settings
        </tr>
    </div>
      
    <h1>K-VITE</h1>
    
    <div class="teamName" v-for="(teamID, team) in teams">
      {{team}} <span class="userIcon glyphicon glyphicon-user"></span>
    </div>
      
    <h2>Personal Calendar</h2>
    <div class="calendar">
        <Personal_Calendar :test="calendarInfo"></Personal_Calendar>
        <Schedule_Builder :test="calendarInfo"></Schedule_Builder>
    </div>
      
    <a href="https://diddukewin.com" class="didduke">did duke win?</a>  
    <router-link to="/login">did duke win?</router-link>
  </div>

</template>

<script>
    import Firebase from 'firebase';
    import Personal_Calendar from './components/Personal_Calendar.vue'
    import Schedule_Builder from './components/Schedule_Builder.vue'
    import Team_Calendar from './components/Team_Calendar.vue'

    var config = {
        apiKey: "AIzaSyCk3ttnDL-mfdMNJO27thtvd31CvRxpmvM",
        authDomain: "final-efcc8.firebaseapp.com",
        databaseURL: "https://final-efcc8.firebaseio.com",
        projectId: "final-efcc8",
        storageBucket: "final-efcc8.appspot.com",
        messagingSenderId: "718555914790"
    };

    var db = Firebase.initializeApp(config).database();
    var teamsRef = db.ref('Teams');
    
    export default {
        name: 'app',
        data () {
            console.log(this.books);
            console.log(teams);
            return {
                calendarInfo: [
                    [true, true, true, false, false, false, false, true],
                    [true, true, false, false, false, true, false, true],
                    [true, false, true, true, false, false, true, false],
                    [false, true, true, true, false, false, false, true],
                    [false, false, false, true, false, false, false, false]
                ],
                msg: 'This is a cool calendar!',
                teams: ['Your Team']
            }
        },
        firebase() {
            return {
                teams: teamsRef
            }
        },
        components: {
            Personal_Calendar,
            Schedule_Builder
        }
    }
    
    
    $(document).ready(function(){
        $(document).on('click', '#openBtn', function() {
            $('.sidenav').css('width', '20%');
            $('body').css('margin-left', '20%');
        });
        $(document).on('click', '#closeBtn', function() {
            $('.sidenav').css('width', '0');
            $('body').css('margin-left', '0');
        });
    });
</script>

<style lang="scss">
    body {
        background-color: aliceblue;
    }
    h1 {
        font-family: Didot;
        text-align: center;
        font-weight: bold;
        font-size: 3em;
    }
    h2 {
        text-align: center;
        font-style: italic;
        font-size: 1.5em;
    }
    .nav {
        margin-left: 1.5%;
        margin-top: -1%;
        font-size: 3em;
        position: absolute;
        z-index: 1;
    }
    .teamName {
        right: 0;
        margin-right: 1.5%;
        margin-top: -4.5%;
        position: absolute;
        font-family: Didot;
        font-size: 2.5em;
    }
    .calendar {
        margin-left: 10%;
    }
    .userIcon {
        font-size: 0.8em;
    }
    .navIcon {
        color: black;
    }
    .sidenav {
        background-color: white;
        height: 100%; width: 0;
        position: fixed; z-index: 1;
        top: 0; left: 0;
        overflow: hidden;
        padding-top: 30%;
        text-align: center;
    }
    .sidenav .navOption {
        display: block;
        padding-bottom: 5%;
        font-family: Didot;
        text-transform: uppercase;
        font-size: 2em;
    }
    .sidenav .closebtn {
        position: absolute;
        top: 0; right: 10%;
        font-size: 3em;
        color: black;
    }
    .didduke {
        color: navy;
        font-weight: bold;
        font-size: 1.2em;
        text-transform: uppercase;
        position: absolute;
        bottom: 2%; right: 1%;
    }
</style>