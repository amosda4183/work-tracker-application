<template>
   <v-container class="mt-5">
		 <v-layout row v-if="error">
			 <v-flex xs12 sm6 offset-sm3>
				 <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
			 </v-flex>
		 </v-layout>
     <v-layout row>
			 <v-flex xs12 sm6 offset-sm3>
				 <v-card>
					 <v-card-text>
						 <v-container>
							 <h2>Register Your Account:</h2>
							 <form @submit.prevent ="onSignup">
								 <v-layout row>
									 <v-flex xs12>
										 <v-text-field
										 name ="email"
										 label ="Email"
										 id="email"
										 v-model ="newUser.email"
										 type="email"
										 :rules="[rules.required]">											 
										 </v-text-field>
									 </v-flex>
								 </v-layout>
								 <v-layout row>
									 <v-flex xs12>
										 <v-text-field
										 name ="password"
										 label ="Password"
										 id="password"
										 v-model ="newUser.password"
										 type="password"
										 :rules="[rules.required]">											 
										 </v-text-field>
									 </v-flex>
								 </v-layout>
									<v-layout row>
									 <v-flex xs12>
										 <v-text-field
										 name ="confirmPassword"
										 label ="Confirm Password"
										 id="confirmPassword"
										 v-model ="confirmPassword"
										 type="password"
										 :rules="[comparePasswords]">											 
										 </v-text-field>
									 </v-flex>
								 </v-layout>
								 <v-layout row>
									 <v-flex xs12>
										 <v-btn :disabled="!formIsValid || loading" :loading="loading" class ="info" type="submit">Sign Up
											 <span slot="loader" class = "custom-loader">
												 <v-icon light>cached</v-icon>
											 </span>
										 </v-btn>
									 </v-flex>
								 </v-layout>
							 </form>
						 </v-container>
					 </v-card-text>
				 </v-card>
			 </v-flex>
		 </v-layout>
   </v-container>
</template>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>

<script>
  export default {
    data () {
      return {
        rules: {
          required: value => !!value || 'Required.'
				},
				newUser: {
					email: null,
					password: null,
				},
				confirmPassword: null
			}
		},

		methods:{
			onSignup(){
				//Use Vuex to add new user to firebase authentication
				this.$store.dispatch('signUserUp', this.newUser)

				//this.$store.dispatch('addNewUser', this.newUser)
			},
			onDismissed(){
				this.$store.dispatch('clearError')
			}
		},
	
		computed:{
			comparePasswords(){
				return this.newUser.password !== this.confirmPassword ? 'Passwords do not match' : ''
			},
			user(){
				return this.$store.getters.user
			},
			error(){
				return this.$store.getters.error
			},
			loading(){
				return this.$store.getters.loading
			},
			formIsValid() { //user has entered data in all fields
					return 	this.newUser.email != null &&
									this.newUser.password != null && 
									this.confirmPassword != null 
			}
		},
		watch: {
			user(value) {
				if(value !== null && value !== undefined) {
					this.$router.push('/')
				}
			}
		}
	}

</script>