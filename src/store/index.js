import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({


	state: { 
		
		loadedDays: [null],
		loading: false,
		error: null,
		user: null
	},
	
	mutations:{ //Add newly created day to the array of days
		
		setUser(state, payload){
			state.user = payload
		},
		addNewDay (state, payload) { 
			state.loadedDays.push(payload)
		},
		setLoadedDays(state, payload) {
			state.loadedDays = payload
		},
		setLoading(state,payload){
			state.loading = payload
		},
		setError(state,payload){
			state.error = payload
		},
		clearError(state){
			state.error = null
		}
	},
	actions: {

		loadedDays ({commit, getters}) {

			firebase.database().ref( 'users/' + getters.user.id + '/days').once('value') //retrieves data from 'days' node in database
			.then((data) => { //data is all days in the 'days' node
				const days = [] //store data in days const
				const obj = data.val() //gives access to objects in data

				for(let key in obj) { //add each object in 'days' node to the days array const
					days.push({
						id: key,
						payRate: obj[key].payRate,
						displayName: obj[key].displayName,
						date: obj[key].date,
						startTime: obj[key].startTime,
						endTime: obj[key].endTime,
						totalStops: obj[key].totalStops,
						hoursWorked: obj[key].hoursWorked,
						hourlyPay: obj[key].hourlyPay,
						totalPay: obj[key].totalPay,
						hourlyStops: obj[key].hourlyStops,
						creatorId: obj[key].creatorId
					})
				}
				//commit mutation to load days onto loadedDays array
				commit('setLoadedDays', days) 
				
			})
			.catch( (error) => {
				console.log(error)
			})
		},
		
		
		addNewDay ({commit, getters}, payload) { //Create new day to add to array of days

			let currentUser = getters.user.id
		
			const day = {
				displayName: payload.displayName,
				payRate: payload.payRate,
				date: payload.date,
        startTime: payload.startTime,
        startMiles: payload.startMiles,
        endTime: payload.endTime,
				endMiles: payload.endMiles,
				milesDriven: payload.milesDriven,
				totalStops: payload.totalStops,
				hoursWorked: payload.hoursWorked,
				hourlyPay: payload.hourlyPay,
				totalPay: payload.totalPay,
				hourlyStops: payload.hourlyStops
			}

			firebase.database().ref('/users/' + currentUser + '/days').push(day)
			.then( (data) => { //Promise callback returned by firebase function
				const key = data.key
				commit('addNewDay', { //commit action to be pushed by mutation
					...day,
					id: key
				}) 
			})
			.catch( (error) => {
				console.log(error)
			})
		},
		clearError({commit}) {
			commit('clearError')
		},
			
		signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
						commit('setUser', user)
					})
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          })
		},

		signUserIn ({commit}, payload) {
      commit('setLoading', true)
			commit('clearError')
			
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
							id: user.id
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
          }
        )
    },
			
		autoSignIn({commit}, payload) { //payload is user object passed by firebase
			commit('setUser',
			 {id: payload.uid})
		},

		fetchUserData ({commit, getters}) {
			commit('setLoading', true)
			
			firebase.database().ref('/users/' + getters.user.id + '/days/').once('value')
			.then( (data) => {
				const values = data.val() // contains all days in the node
				let days = [] //for storing the individual days, one at each index		
				
				for(let key in values) { //push each day object onto days array
					days.push(values[key])
				}
				commit('setLoading', false)
				commit('setLoadedDays', days)
			})
			.catch(error => {
				console.log(error)
				commit('setLoading', false)
			})
		},

		logout({commit}){
			firebase.auth().signOut() //log user out on firebase by removing local token
			commit('setUser', null) //set user auth state to null to logout user
		}
	},

	getters: {

		user(state){
			return state.user
		},
		error(state){
			return state.error
		},
		loading(state){
			return state.loading
		},
		loadedDays (state) {
			 //Retrieve loadedDays array and sort base on date - newest first
			return state.loadedDays.sort((dayA, dayB) => {
				return dayA.date < dayB.date ? 1 : dayA.date > dayB.date ? -1 : 0
			})		
		},
		loadedDay (state){ 
			//Retrieve a single day by id from array of days, for editing or other actions
			return (dayId) => {
				return state.loadedDays.find((day) => {
					 // Find day by ID - may find by date later
					return day.id === dayId
				})
			}
		}
	}
})