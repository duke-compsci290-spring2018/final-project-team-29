<template>
    <!-- template must have a SINGLE root tag that encloses all others -->
    <div class="register">
        Login to your account
        <input type="text" placeholder="Name"><br>
        <input type="text" placeholder="Email"><br>
        <button onclick="login">Login</button>
        Already have an account? Login <router-link to="/login">here.</router-link>
    </div>
</template>

<script>
    // export anonymous object from this module so it can be accessed by others when imported
    export default {
        name: 'Register',
        props: ['test'],
        data: function() {
            return {
                
            }
        },
        methods: {
            login() {
                
            }
        }
    }
</script>

<style lang="scss">
    
</style>


