Posts = new Mongo.Collection('posts');

Posts.allow({
  update: function(userId, post) {
    return ownsDocument(userId, post);
  },
  remove: function(userId, post) {
    return ownsDocument(userId, post);
  }
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    //may only edit the following two fields:
    return (_.without(fieldNames, 'url', 'title').length>0);
  }
});

Meteor.methods({
  postInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, { //have to meteor add check and meteor add audit-argument-checks first
      title: String,
      url: String
    });
    var user = Meteor.user();
    var post = _.extend(postAttributes, { //meteor add underscore for _
      userId: user._id, author: user.username, submitted: new Date()
    });
    var postId = Posts.insert(post);
    return {
      _id: postId
}; }
});
