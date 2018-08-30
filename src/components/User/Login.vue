<template>
   <v-container class="mt-3">
     <v-layout row v-if="error">
			 <v-flex xs12 sm6 offset-sm3>
				 <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
			 </v-flex>
		 </v-layout>
		 <v-layout row>
			 <v-flex xs12 sm6 offset-sm3>
				 <v-card class = "mt-5">
					 <v-card-text>
						 <v-container>
							 <h2>Sign In To Your Account:</h2>
							 <form @submit.prevent ="onSignIn">
								 <v-layout row>
									 <v-flex xs12>
										 <v-text-field
										 name ="email"
										 label ="Email"
										 id="email"
										 v-model ="email"
										 type="email"
										 :rules="[rules.required]"
										 autofocus>											 
										 </v-text-field>
									 </v-flex>
								 </v-layout>
								 <v-layout row>
									 <v-flex xs12>
										 <v-text-field
										 name ="password"
										 label ="Password"
										 id="password"
										 v-model ="password"
										 type="password"
										 :rules="[rules.required]">											 
										 </v-text-field>
									 </v-flex>
								 </v-layout>
									
								 <v-layout row>
									 <v-flex xs12>
										 <v-btn :disabled="loading" :loading="loading" class ="info" type="submit">Sign In
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
				email:null,
				password:null
			}
		},

		methods:{
			onSignIn(){
				//Send email and password to vuex store, then commit to firebase
				this.$store.dispatch('signUserIn', {email:this.email, password:this.password})
				this.$router.push('/')
				
			},
			onDismissed(){
				this.$store.dispatch('clearError')
			}
		},
		computed:{
			user(){
				return this.$store.getters.user
			},
			error(){
				return this.$store.getters.error
			},
			loading(){
				return this.$store.getters.loading
			}
		}
}

</script>