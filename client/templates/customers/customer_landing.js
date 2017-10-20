Template.customerLanding.events({
	'submit form': function(e) {
    e.preventDefault();
    var zip = $(e.target).find('[name=zip]').val();
    Router.go("storeList", {query: 'zip='+ zip});
	}
});