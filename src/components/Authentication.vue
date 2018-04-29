<template>
    <!-- template must have a SINGLE root tag that encloses all others -->
    <div class="account">
        <div class="col-lg-4">
            <div class="nav" id="openBtn">☰</div>
            <div class="sidenav">
                <a href="javascript:void(0)" class="closebtn" id="closeBtn">&times;</a>
                <tr class="navOption">
                    <router-link to="/" class="routerLink">
                        <i class="fa fa-home" aria-hidden="true"> Home</i>
                    </router-link>
                </tr>
                <tr class="navOption">
                    <router-link to="/search" class="routerLink">
                        <i class="fa fa-search" aria-hidden="true"> Search</i>
                    </router-link>
                </tr>
                <tr class="navOption">
                    <router-link to="/team" class="routerLink">
                        <i class="fa fa-group" aria-hidden="true"> Teams</i>
                    </router-link>
                </tr>
                <tr class="navOption">
                    <i class="fa fa-gear" aria-hidden="true"> Settings</i>
                </tr>
            </div>
        </div>
        <div class="col-lg-4">
            <h1 class="routerLink" @click="refresh">K-VITE</h1>
        </div>
        <div class="col-lg-4" v-if="user"> {{ user.name }}
            <span class="glyphicon glyphicon-log-out" @click="signOut"></span>
        </div>
        <div class="col-lg-4" v-else @click="signInPopup">
        </div>
        <div id="firebaseui-auth-container" :class="{ popup: isShown }"></div>
    </div>
</template>

<script>
    import Firebase from 'firebase'
    import FirebaseUI from 'firebaseui'
    // single instance of popup credentials UI
    // var authUI = new FirebaseUI.auth.AuthUI(Firebase.auth())
    
    export default {
        name: 'Authentication',
        props: ['getUser', 'setUser'],
        data: function() {
            return {
                isShown: false,
                logEmail: '',
                logPassword: '',
                regEmail: '',
                regPassword: '',
                newUserStatus: this.userStatus,
                cTeams: this.teams
            }
        },
        computed: {
            loginCheck: function() {
                console.log(Firebase.auth().currentUser);
                return Firebase.auth().currentUser;
            },
            user () {
                return this.getUser;
            }
        },
        methods: {
            refresh: function() {
                this.$router.push('/');
            },
            signInPopup () {
                authUI.start('#firebaseui-auth-container', {
                    // open the authentication flow as a popup
                    signInFlow: 'popup',
                    // require password each time
                    credentialHelper: FirebaseUI.auth.CredentialHelper.NONE,
                    // new users automatically created for new emails
                    signInOptions: [{
                        provider: Firebase.auth.EmailAuthProvider.PROVIDER_ID,
                        requireDisplayName: true
                    }],
                    // respond to authentication attempts
                    callbacks: {
                        signInSuccessWithAuthResult: authResult => {
                            // save interesting parts of user data
                            this.signIn(authResult.user)
                            // hide styling again
                            this.isShown = false
                            // do not redirect
                            return false
                        },
                        uiShown: () => {
                            // style UI container as a popup
                            this.isShown = true
                        }
                    }
                })
            },
            signIn (user) {
                this.setUser({
                    name: user.displayName,
                    email: user.email,
                    uid: user.uid,
                    isAnonymous: user.isAnonymous
                })
            },
            signOut () {
                Firebase.auth().signOut()
                this.setUser('guest')
            },
            continueGuest: function() {
                this.setUser('guest');
            }
        },
        mounted () {
        // allow user to automatically log in if returning to site after refresh
            Firebase.auth().onAuthStateChanged(authState => {
                if (authState) {
                    this.signIn(authState);
                }
            });
        }
    }
</script>

<style lang="scss">
    .account {
        text-align: center;
    }
    .functionBtn {
        border-radius: 5px;
        border: 0;
        width: 22%;
        font-size: 1.2em;
        text-transform: uppercase;
        font-weight: bold;
        padding: 2%;
    }
    .loginBtn {
        background-color: #ffdce2;
    }
    .registerBtn {
        background-color: #abbeff;
    }
    .loginOption {
        visibility: visible;
    }
    .registerOption {
        visibility: hidden;
    }
    input {
        margin: 0.5%;
    }
    #signInLink, #signInLink:visited, #signInLink:active, #signInLink:link,
    #signUpLink, #signUpLink:visited, #signUpLink:active, #signUpLink:link {
        font-weight: bold;
        color: black;
    }
    #signInLink:hover, #signUpLink:hover {
        text-decoration: underline;
        cursor: pointer;
    }
    .guestBtn, .guestBtn:visited, .guestBtn:active, .guestBtn:link  {
        background-color: lightgrey;
        border-radius: 5px;
        border: 0;
        width: 22%;
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


