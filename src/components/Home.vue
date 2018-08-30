<template> 
    <v-jumbotron  height = "703px" dark color = "primary" :gradient = "gradient">
    <v-container full-width>
      <v-layout justify-center align-center class="text-xs-center">
        <v-flex>
          <h4 class="display-3 mt-5 pt-2">{{welcome}}</h4>

          <span class="subheading">{{description}}</span>

          <v-divider class="my-3" color="#"></v-divider>

          <div class="title">{{cta}}</div>

          <v-btn  v-if="!userIsAuthenticated"
            router to="/register" 
            round large class="my-3" light>
           Register
          </v-btn>
          <v-btn  v-else 
            router to="/profile" 
            round large class="my-3" light>
            View Profile
          </v-btn>
          
          <v-btn v-if="!userIsAuthenticated"
            router to="/login"
            round large class="my-3" light>
            Login
          </v-btn>
          <v-btn v-else 
            router to="/newDay" 
            round large class="my-3 white" light>
            New Day
          </v-btn>
          <div></div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>


<style scoped>
</style>

<script>
export default {

  computed:{
    isLoading(){
			return this.$store.getters.loading
    },
  
    userIsAuthenticated () {
      return this.$store.getters.user !== null &&
       this.$store.getters.user !== undefined
    }
  },
  data () {
    return {
      gradient: 'to bottom, #5E35B1,#F4511E',
      cta:'Start here!',
      welcome:'JKC Work Tracker',
      description:'Use this app to track your work day stats. To get started, click the button down below!'

    }
  },
  name: 'Home',
}
</script>

