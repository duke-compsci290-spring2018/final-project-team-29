<template>
    <!-- template must have a SINGLE root tag that encloses all others -->
    <div class="login col-lg-12">
        <br><input type="text" v-model="username" placeholder="Username"><br>
        <input type="password" v-model="password" placeholder="Password"><br><br>
        
        <button class="loginBtn" @click="login">Login</button><br><br>
        Don't have an account?<br>{{ teams }}
        <router-link to="/register" class="signUpLink">Sign up now!</router-link><br><br>
        
        <router-link to="/">
            <button class="guestBtn" @click="clickedSignIn">Continue as Guest</button>
        </router-link><br><br>
    </div>
</template>

<script>
    import Firebase from 'firebase'
    import User from './User.vue'
    
    export default {
        name: 'Login',
        props: ['teams', 'teamsRef', 'signingIn'],
        data: function() {
            return {
                username: '',
                password: '',
                signedin: false
            }
        },
        components: {
            User
        },
        methods: {
            login: function() {
                console.log(this.teams);
                var logged = {
                    currentUser: this.username,
                    currentPass: this.password
                };
                var signedin = false;
                var i, j;
                for (i = 0; i < this.teams.length; i++) {
                    for (j = 0; j < this.teams[i]["People"].length; j++) {
                        if (this.teams[i]["People"][j]["name"] == logged.currentUser &&
                            this.teams[i]["People"][j]["pass"] == logged.currentPass) {
                            signedin = true;
                        }
                    }
                } if (signedin == true) {
                    alert("Success!");
                    this.$router.push('/user')
                } else {
                    alert("You are not in our system. Try registering!");
                }
                this.username = '';
                this.password = '';
            },
            clickedSignIn: function() {
                var newData = false;
                this.$emit('update', newData);
            }
        }
    }
</script>

<style lang="scss">
    .login {
        text-align: center;
    }
    .loginBtn {
        background-color: #ffdce2;
        border-radius: 5px;
        border: 0;
        width: 12%;
        font-size: 1.2em;
        text-transform: uppercase;
        font-weight: bold;
        padding: 1%;
    }
    input {
        margin: 0.2%;
    }
    .signUpLink, .signUpLink:visited, .signUpLink:active, .signUpLink:link {
        font-weight: bold;
        color: black;
    }
    signUpLink:hover {
        text-decoration: underline;
    }
    .guestBtn, .guestBtn:visited, .guestBtn:active, .guestBtn:link  {
        background-color: lightgrey;
        border-radius: 5px;
        border: 0;
        width: 12%;
        font-size: 0.8em;
        text-transform: uppercase;
        padding: 1%;
        color: black;
        text-decoration: none;
    }
    .guestBtn:hover {
        font-style: italic;
    }
</style>


