<template>
  <v-container>
    <form @submit.prevent="onAddNewDay">
      <v-layout row wrap>
        <v-flex xs12 sm6 offset-sm3>
          <h1 class="text-xs-center primary--text pt-5 pb-3">Today's Information</h1>
        </v-flex>
      </v-layout>

      <v-layout v-if="!loadedDays[0]" row>
        <v-flex xs12 sm6 offset-sm3>
          <v-text-field
            prepend-icon="tag_faces"
            name="name"
            label="Name"
            id="name"
            v-model="displayName"
            type="text"
            solo
            :rules="[rules.required]"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-menu
            ref="menu"
            :close-on-content-click="false"
            v-model="menu"
            :nudge-right="40"
            :return-value.sync="date"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <v-text-field
              solo
              slot="activator"
              v-model="date"
              label="Today's Date"
              prepend-icon="event"
              readonly
            ></v-text-field>

            <v-date-picker v-model="date" @input="$refs.menu.save(date)"></v-date-picker>
          </v-menu>

          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="startTime"
            persistent
            lazy
            full-width
            width="290px"
          >
            <v-text-field
              solo
              slot="activator"
              v-model="startTime"
              label="Start Time"
              prepend-icon="access_time"
              readonly
            ></v-text-field>
            <v-time-picker format="24hr" v-if="modal" v-model="startTime">
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.dialog.save(startTime)">OK</v-btn>
            </v-time-picker>
          </v-dialog>

          <v-dialog
            ref="dialog2"
            v-model="modal2"
            :return-value.sync="endTime"
            persistent
            lazy
            full-width
            width="290px"
          >
            <v-text-field
              solo
              slot="activator"
              v-model="endTime"
              label="End Time"
              prepend-icon="access_time"
              readonly
            ></v-text-field>
            <v-time-picker format="24hr" v-if="modal2" v-model="endTime">
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="modal2 = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.dialog2.save(endTime)">OK</v-btn>
            </v-time-picker>
          </v-dialog>

          <v-text-field
            name="totalStops"
            label="Total Stops"
            id="totalStops"
            prepend-icon="work"
            solo
            :rules="[rules.required]"
            v-model="totalStops"
          ></v-text-field>

          <v-flex xs12>
            <v-btn
              :disabled="!formIsValid"
              class="primary mb-5"
              align-center
              offset-sm3
              block
              type="submit"
            >Submit</v-btn>
          </v-flex>
        </v-flex>
      </v-layout>
    </form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      menu: false,
      modal: false,
      modal2: false,

      rules: {
        required: value => !!value || "Required."
      },

      date: null,
      weekDay: null,
      startTime: null,
      endTime: null,
      totalStops: null,
      hoursWorked: null,
      hourlyStops: null,
      displayName: null
    };
  },
  computed: {
    user() {
      // return state for currently logged in user
      return this.$store.getters.user;
    },

    userInfo() {
      return this.$store.getters.userInfo;
    },

    isLoading() {
      return this.$store.getters.loading;
    },

    formIsValid() {
      //user has entered data in all fields

      return (
        this.date != null &&
        this.startTime != null &&
        this.endTime != null &&
        this.totalStops != null
      );
    },

    timeWorked() {
      const end = new Date(this.date);
      const start = new Date(this.date);

      if (typeof this.endTime === "string") {
        const endHours = this.endTime.match(/^(\d+)/)[1];
        const endMinutes = this.endTime.match(/:(\d+)/)[1];
        end.setHours(endHours);
        end.setMinutes(endMinutes);
      }

      if (typeof this.startTime === "string") {
        const startHours = this.startTime.match(/^(\d+)/)[1];
        const startMinutes = this.startTime.match(/:(\d+)/)[1];
        start.setHours(startHours);
        start.setMinutes(startMinutes);
      }

      //Calculate amount of time passed during work day
      return (
        Math.round(
          (end.getHours() -
            start.getHours() +
            (end.getMinutes() - start.getMinutes()) / 60) *
            100
        ) / 100
      );
    },

    userName() {
      let userName = "";

      if (!this.loadedDays[0]) {
        userName = this.displayName;
      } else {
        userName = this.loadedDays[0].displayName;
      }
      return userName;
    },

    stopsPerHour() {
      //Calculate stops completed per hour worked
      return Math.round((this.totalStops / this.timeWorked) * 100) / 100;
    },
    loadedDays() {
      //Load all user created days in the loadedDays array and display on profile
      return this.$store.getters.loadedDays;
    }
  },

  methods: {
    onAddNewDay() {
      const newDay = {
        displayName: this.userName,
        date: this.date,
        startTime: this.startTime,
        endTime: this.endTime,
        totalStops: this.totalStops,
        hoursWorked: this.timeWorked,
        hourlyStops: this.stopsPerHour,
        creatorId: this.user.id
      };
      this.$store.dispatch("addNewDay", newDay);
      this.$router.push("/");
      //On submit of form, create newDay object and dispatch the action in the Vuex store
      //to create a new day and push it to the database. Then send user to profile to view added day
    }
  }
};
</script>