<template> 
  <v-layout
    v-show = "!loading"
    justify-center
    align-center
    class="text-xs-center"
    style="height:100vh;
            color:#F4511E;
            background: #d9d9d9">
    <v-flex>
      <h4 class="display-3 mt-5 pt-2">{{welcome}}</h4>

      <span class="subheading">{{description}}</span>

      <v-divider class="my-3 mx-2" color="#"></v-divider>

      
      <v-btn 
      color = "primary" v-if="!userIsAuthenticated"
        router to="/register" 
        round large class="my-3" dark>
        Register 
      </v-btn>
      <v-btn 
          color = "primary"
          v-else 
        router to="/profile" 
        round large class="my-3" dark>
        View Profile 
      </v-btn>
      
      <v-btn 
        color = "primary"
          v-if="!userIsAuthenticated"
        router to="/login"
        round large class="my-3" dark>
        Login 
      </v-btn>
      <v-btn 
        color = "primary" 
        v-else 
        router to="/newDay" 
        round large class="my-3 white" dark>
        New Day
      </v-btn>
    </v-flex>
  </v-layout>
</template>


<style scoped>

</style>

<script>
export default {

  computed:{
    loading(){
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
      welcome:'JKC Work Tracker',
      description:'Use this app to track your work day stats. To get started, click a button down below!'

    }
  },
  name: 'Home',
}
</script>

