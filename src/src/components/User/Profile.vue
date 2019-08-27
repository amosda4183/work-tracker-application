<template>

  <v-container  class="mt-5" fluid grid-list-md>
      <v-layout v-if = "loadedDays[0]" row wrap>
          <v-flex xs12>
              <h2 class="primary--text text-xs-center">{{loadedDays[0].displayName}}</h2>
          </v-flex>

           <v-flex xs12>
             <div v-on:click = "updateVisibleDays"
             v-if = "loadedDays.length > 5 " 
             class = "text-xs-center">
               <v-pagination
                v-model="currentPage"
                :length="Math.ceil(loadedDays.length / 5)">
                </v-pagination>
              </div>
          </v-flex>
      </v-layout>


      <v-layout v-if = "!loadedDays[0]">
        <v-flex class = "text-xs-center">
          <h4>Add A New Day to Populate Your Profile!</h4>
        </v-flex>
      </v-layout>

      <v-layout class = "mb-5" v-else row wrap>
        <v-flex v-for ="visibleDay in visibleDays" :key="visibleDay.id" 
        xs12 sm4 md3 lg2 row wrap>
          <v-card>
            <v-card-title><h4 class="primary--text">{{visibleDay.date}}</h4></v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>Start Time:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{visibleDay.startTime}}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>End Time:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{visibleDay.endTime}}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Stops:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{visibleDay.totalStops}}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Stops Per Hour:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{visibleDay.hourlyStops}}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Pay Rate:</v-list-tile-content>
                <v-list-tile-content class="align-end">${{visibleDay.payRate}}/stop</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Pay Per Hour:</v-list-tile-content>
                <v-list-tile-content class="align-end">${{visibleDay.hourlyPay}}/hr</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Total Pay:</v-list-tile-content>
                <v-list-tile-content class="align-end">${{visibleDay.totalPay}}</v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
  </v-container>
</template>


<script>
  export default {

    data() {
      return {
        nextDay: 0,
        currentPage: 1,
        pageSize: 5,
        visibleDays: []
      }
    },

    beforeMount: function() {
      this.updateVisibleDays()
    },


    computed: {
      isLoading() {
        return this.$store.getters.loading
      },
      loadedDays() { //Load all user created days in the loadedDays array and display on profile
        return this.$store.getters.loadedDays
      },
      user() { // return state for currently logged in user
				return this.$store.getters.user
      }
    },

    methods: {
      updateVisibleDays() {

        let firstIndex = ((this.currentPage - 1) * this.pageSize)
        let secondIndex = firstIndex + this.pageSize 
        this.visibleDays = this.loadedDays.slice(firstIndex, secondIndex)
                             
      }
    }
    
  }
</script>