<template>
    <!-- template must have a SINGLE root tag that encloses all others -->
    <div class="login col-lg-12">
        <input type="text" v-model="username" placeholder="Username"><br>
        <input type="password" v-model="password" placeholder="Password"><br>
        <input type="text" v-model="teamcode" placeholder="Team Code"><br><br>
        <button class="registerBtn" @click="register">Register</button><br><br>
        Already have an account?<br>
        <router-link to="/login" class="signInLink">Sign in now!</router-link><hr>
    </div>
</template>

<script>
    import Firebase from 'firebase'
    
    export default {
        name: 'Register',
        data: function() {
            console.log("hi");
            return {
                username: '',
                password: '',
                teamcode: ''
            }
        },
        methods: {
            register: function() {
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
                this.username = '';
                this.password = '';
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
    .register {
        text-align: center;
    }
    .registerBtn {
        /*button formatting*/
        background-color: #e3f2ff;
        border-radius: 5px;
        border: 0;
        width: 10%;
        font-size: 1.2em;
        text-transform: uppercase;
        padding: 1%;
    }
    input {
        margin: 0.2%;
    }
    .signInLink {
        font-weight: bold;
        color: black;
    }
</style>


