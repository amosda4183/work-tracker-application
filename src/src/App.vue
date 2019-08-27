<template>
  <v-app>  
    
<v-navigation-drawer fixed dark temporary v-model = "sideNav">
  <v-list>
    <v-list-tile class="mb-4" router to="/">
      <v-list-tile-action>
        <v-list-tile-content>
          <v-btn flat> <v-icon left>home</v-icon>Home</v-btn>
        </v-list-tile-content>
      </v-list-tile-action>
    </v-list-tile>

    <v-list-tile v-for="item in menuItems" :key="item.title" router :to="item.link">
      <v-list-tile-action>
        <v-list-tile-content>
            <v-btn flat><v-icon left>{{item.icon}}</v-icon>{{item.title}}</v-btn>
        </v-list-tile-content>
      </v-list-tile-action>
    </v-list-tile>

    <v-list-tile v-if="userIsAuthenticated">
      <v-list-tile-action @click ="onLogout" router to ="/">
        <v-list-tile-content>
            <v-btn flat><v-icon left>exit_to_app</v-icon>Logout</v-btn>
        </v-list-tile-content>
      </v-list-tile-action>
    </v-list-tile>
  </v-list>
</v-navigation-drawer>

   <v-toolbar fixed dark class = "secondary">
     <v-toolbar-side-icon class = "hidden-sm-and-up" @click="sideNav = !sideNav"></v-toolbar-side-icon>
     <v-toolbar-title>
       <router-link to = "/" tag ="span" style = "cursor:pointer">{{title}}</router-link>
     </v-toolbar-title>
     <v-spacer></v-spacer>
     <v-btn v-for="item in menuItems" :key="item.title" router :to="item.link" flat class = "hidden-xs-only">
       <v-icon left>{{item.icon}}
       </v-icon>{{item.title}}</v-btn>

       <v-btn v-if="userIsAuthenticated" 
       flat class = "hidden-xs-only"
       @click ="onLogout"
       router to="/">
       <v-icon left>exit_to_app
       </v-icon>Logout</v-btn>
   </v-toolbar>

    <main>
      <router-view></router-view>
    </main>



<v-footer dark height="auto" fixed> 
  <v-card class="flex" flat tile>
    <v-card-actions class="secondary justify-center">
      &copy;2018 — <strong>David Amos Web Development</strong>
    </v-card-actions>
  </v-card>
</v-footer>

  </v-app>
</template>

<style>
</style>

<script>
export default {
  data () {
    return {
      sideNav: false,
      title:'JKC Work Tracker',
    }
  },
  name: 'App',

  computed:{
    menuItems (){       
       let menuItems = [
         { icon: 'account_box', title: 'Register', link: '/register'},
         { icon: 'lock_open', title:'Login', link:'/login'}]
         
      if(this.userIsAuthenticated){
        menuItems =[          
          { icon: 'add',  title:'New Day', link:'/newday'},
          //add later { icon: 'build',  title:'Edit Day' , link:'/editDay'},
          { icon: 'person',  title:'Profile' , link:'/profile'}
        ]
      }
       return menuItems
    },
    userIsAuthenticated (){
      return this.$store.getters.user !== null &&
       this.$store.getters.user !== undefined
    }
  },
  methods: {
    onLogout (){
      this.$store.dispatch('logout')
      this.$router.push('/')
    }
  },
  watch:{
			user(value){
				if(value !== null || value !== undefined){
					this.$router.push('/')
				}
			}
		}
}
</script>
