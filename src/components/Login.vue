<template>
    <!-- template must have a SINGLE root tag that encloses all others -->
    <div class="login col-lg-12">
        <br><input type="text" v-model="username" placeholder="Username"><br>
        <input type="password" v-model="password" placeholder="Password"><br><br>
        
        <button class="loginBtn" @click="login">Login</button><br><br>
        Don't have an account?<br>
        <router-link to="/register" class="signUpLink">Sign up now!</router-link>
    </div>
</template>

<script>
    import Firebase from 'firebase'
    
    export default {
        name: 'Login',
        props: ['teams', 'teamsRef'],
        data: function() {
            return {
                username: '',
                password: '',
                signedin: false
            }
        },
        methods: {
            login: function() {
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
                    this.$router.push('/personalsched')
                } else {
                    alert("You are not in our system. Try registering!");
                }
                this.username = '';
                this.password = '';
            }
        }
    }
</script>

<style lang="scss">
    .login {
        text-align: center;
    }
    .loginBtn {
        /*button formatting*/
        background-color: #ffdce2;
        border-radius: 5px;
        border: 0;
        width: 10%;
        font-size: 1.2em;
        text-transform: uppercase;
        font-weight: bold;
        padding: 1%;
    }
    input {
        margin: 0.2%;
    }
    .signUpLink {
        font-weight: bold;
        color: black;
    }
</style>


