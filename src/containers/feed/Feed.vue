<template lang="pug">
#feed
  box(title='Welcome to your feed!')
    .notification(v-if='error')
      p.content {{ errorMessage }}
    setNameForm(v-if='participant === ""')
    template(v-else)
      postComposer
      template(v-for='(post, index) in feed.posts')
        post(:post='post' :date='new Date()' :index='index')
      p.subtitle.
        That's it! Please click to #[a(@click='submitResults({ feed, experimenterCode })') sign out]
        if you're all done interacting with your feed.
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import box from '@/components/box';
import post from '@/components/feed/post';
import setNameForm from '@/components/feed/setNameForm';
import postComposer from '@/components/feed/postComposer';
import types from '@/store/modules/feed/types';

const { mapState, mapActions, mapMutations } = createNamespacedHelpers('feed');

export default {
  name: 'Feed',
  components: { box, setNameForm, post, postComposer },
  computed: {
    ...mapState({
      feed: state => state.feed,
      participant: state => state.participant,
      experimenterCode: state => state.experimenterCode,
      error: state => state.error,
      errorMessage: state => state.errorMessage,
    }),
  },
  mounted() {
    if (this.experimenterCode === null) {
      this.$router.push('login');
    }
    this.fetchLatestFeed();
  },
  methods: {
    ...mapActions([
      types.action.FETCH_LATEST_FEED,
      types.action.SUBMIT_RESULTS,
    ]),
    ...mapMutations([types.mutation.SET_POSTS]),
    shuffle(array) {
      for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        // eslint-disable-next-line
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
  },
};
</script>
