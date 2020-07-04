import Vue from "vue";
import Vuex from 'vuex';
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    skillList: []
  },
  mutations: {
    setSkillList(state, payload) {
      state.skillList = [];
      state.skillList = payload.skillList;
    },

  },
  getters: {
    // 还能这么写
    getSkillById: (state) => (id) => {
      return state.skillList.find(skill=>skill.SkillId);
    }
  }
});

export {
  store
}