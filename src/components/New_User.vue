<template>
  <div id="app">
    <Button v-if="teamStyle !== 'new'" @click="teamStyle = 'new'">Create a new team</Button>
    <Button v-if="teamStyle !== 'existing'" @click="teamStyle = 'existing'">Join an existing team</Button>
    <br/>
    <div v-if="teamStyle === 'new'">
      <Label>Input a new user</Label>
      <input v-model="userName">
      <br/>
      <Label>Input a code for your new team</Label>
      <input v-model="teamCode">
      <br/>
      <button @click="submitNewUser">Submit</button>
    </div>
    <div v-if="teamStyle === 'existing'">
      <Label>Input your username</Label>
      <input v-model="userName">
      <br/>
      <Label>Input your team's unique code</Label>
      <input v-model="teamCode">
      <br/>
      <button @click="submitExistingTeam">Submit</button>
    </div>


  </div>

</template>

<script>
  // export anonymous object from this module so it can be accessed by others when imported
  //TODO: ERROR CHECKING FOR DUPLICATION OF NAMES/INVALID KEY.
  export default {
    name: 'Personal_Calendar',
    props: [ 'teams', 'teamsRef'],
    data: function() {
      return {
        userName: '',
        teamStyle: '',
        teamCode: 'TEAM 1'
      }
    },
    methods: {
      submitUser: function() {
        this.teamsRef.push("Test");
      },
      submitNewUser: function() {
        console.log(this.isUniqueTeamCode());
        if (!this.checkEmptyInput()) {
          if (this.isUniqueTeamCode()) {
            this.teamsRef.push({
              "People" : {
                "0": {
                  "available": this.generateFullArray(),
                  "schedule": this.generateFullArray().map(arr => arr.map(bool => !bool)),
                  "captain": true,
                  "key": "0",
                  "name": this.userName
                }
              },
              "code": this.teamCode
            });
          } else {
            alert("This team code already exists");
          }
        } else {
          alert("You didn't input a username/team code!");
        }
        this.userName = '';
        this.teamCode = '';
      },
      submitExistingTeam: function() {
        if (this.isUniqueTeamCode()) {
          alert("This team code is not in our system");
        } else {
          var key = this.teams.filter(team => team["code"] === this.teamCode)[0];
          var people_in_team = this.teams.filter(team => team["code"] === this.teamCode)[0]["People"].length;
          this.teamsRef.child(key['.key']).child("People").child(people_in_team).set({
            "available": this.generateFullArray(),
            "schedule": this.generateFullArray().map(arr => arr.map(bool => !bool)),
            "captain": false,
            "name": this.userName,
            "key": people_in_team
          });
        }
        this.userName = '';
        this.teamCode = '';
      },
      generateFullArray() {
        var new_array = [[], [], [], [], []]
        return new_array.map(arr => [true, true, true, true, true, true, true, true, true, true, true, true, true]);
      },
      checkEmptyInput() {
        return (this.userName === '' || this.teamCode === '');
      },
      isUniqueTeamCode() {
        return this.teams.filter(team => team["code"] === this.teamCode).length === 0;
      }
    }


  }
</script>

<style lang="scss">

</style>


