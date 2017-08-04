Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: () => Meteor.subscribe('posts'),
});

Router.route('/', {name: 'postsList'});
Router.route('/posts/:_id', {
  name: 'postPage',
  data: () => Posts.findOne({ _id: this.params._id })
});
