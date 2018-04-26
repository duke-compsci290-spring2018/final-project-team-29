<template>
    <!-- template must have a SINGLE root tag that encloses all others -->
    <div class="login col-lg-12">
        <input type="text" v-model="username" placeholder="Name"><br>
        <input type="text" v-model="useremail" placeholder="Email"><br><br>
        <button class="loginBtn" @click="login">Login</button><br><br>
        Don't have an account?<br>
        <router-link to="/register" class="signUpLink">Sign up now!</router-link><hr>
    </div>
</template>

<script>
    import Firebase from 'firebase'
    
    export default {
        name: 'Login',
        data: function() {
            console.log("hi");
            return {
                username: '',
                useremail: ''
            }
        },
        methods: {
            login: function() {
                Firebase.auth().signInWithEmailAndPassword(this.username, this.useremail).then(
                    function(user) {
                        alert("Welcome!");
                    },
                    function(err) {
                        alert("Oops! " + err.message);
                    }
                );
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


