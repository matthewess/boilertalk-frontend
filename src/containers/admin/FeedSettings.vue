<template lang="pug">
#feed-settings
  box(title='Feed Settings')
    .notification.is-danger(v-if='error')
      p.content {{ errorMessage }}
    h1.title.is-4 New Post
    newPostForm
    .is-divider
    h1.title.is-4 Edit Feed
    .notification.is-info(v-if='feedModified')
      p.content Feed has been modified, please remember to save your changes.
    editFeedForm
</template>

<script>
import { mapState } from 'vuex';
import box from '@/components/box';
import newPostForm from '@/components/admin/newPostForm';
import editFeedForm from '@/components/admin/editFeedForm';

export default {
  name: 'FeedSettings',
  components: { box, newPostForm, editFeedForm },
  computed: {
    ...mapState({
      feedModified: state => state.admin.feedModified,
      error: state => state.admin.error,
      errorMessage: state => state.admin.errorMessage,
    }),
  },
};
</script>
