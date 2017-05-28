Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { 
    return [Meteor.subscribe('businesses') , Meteor.subscribe('menu')]; 
  }
});


Router.route('/', {name: 'businessList'});

Router.route('/order/:query', {name: 'storeList'});

Router.route('/manage/:_id', {
  name: 'businessPage',
  data: function() { return Business.findOne(this.params._id); }
});

Router.route('/order/store/:_id', {
  name: 'orderPage',
  data: function() { return Business.findOne(this.params._id); }
});

Router.route('/manage/editmenu/:_id', {
  name:'menuEdit',
  data: function(){ return Menu.findOne(this.params._id);}
});

Router.route('/manage/itemedit/:_id', {
  name:'itemEdit',
  data: function(){ return Menu.findOne(this.params._id);}
});

Router.route('/manage/itemsubmit/:_id', {name: 'itemSubmit'});

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