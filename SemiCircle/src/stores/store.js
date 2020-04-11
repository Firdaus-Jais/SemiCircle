import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import run from './modules/run';
import teamspace from './modules/teamspace';
import driverSetup from './modules/driverSetup';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		auth,
		run,
		teamspace,
		driverSetup
	}
})

export default store