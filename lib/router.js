Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { 
    return [Meteor.subscribe('businesses') , Meteor.subscribe('menu')]; 
  }
});


Router.route('/', {name: 'businessList'});

Router.route('/manage/:_id', {
  name: 'businessPage',
  data: function() { return Business.findOne(this.params._id); }
});

Router.route('/manage/:_id/editinfo', {
  name: 'businessEdit',
  data: function() { return Business.findOne(this.params._id); }
});

Router.route('/register', {name: 'registration'});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {only: 'businessPage'});
Router.onBeforeAction(requireLogin, {only: 'registration'});