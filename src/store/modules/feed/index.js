import state from './state';
import mutations from './mutations';
import actions from './actions';

const feed = {
  namespaced: true,
  state,
  mutations,
  actions,
};

export default feed;
