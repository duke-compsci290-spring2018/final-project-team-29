<template>
    <!-- template must have a SINGLE root tag that encloses all others -->
    <div class="login">
        Login to your Account
        <input type="text" v-model="username" placeholder="Name"><br>
        <input type="text" v-model="useremail" placeholder="Email"><br>
        <button onclick="login">Login</button>
        Don't have an account? <router-link to="/register">Register.</router-link>
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
                        alert("Oops!" + err.message);
                    }
                );
            }
        }
    }
</script>

<style lang="scss">
    body {
        background-color: white;
    }
</style>


