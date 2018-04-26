<template>
    <!-- template must have a SINGLE root tag that encloses all others -->
    <div class="register">
        Register for an Account
        <input type="text" v-model="username" placeholder="Name"><br>
        <input type="text" v-model="useremail" placeholder="Email"><br>
        <button onclick="register">Register</button>
        Already have an account? <router-link to="/login">Login.</router-link>
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
                useremail: ''
            }
        },
        methods: {
            register: function() {
                Firebase.auth().createUserWithEmailAndPassword(this.username, this.useremail).then(
                    function(user) {
                        alert("You've created an account!");
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


