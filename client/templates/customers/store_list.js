Template.storeList.helpers({
  business: function(){
  	var url = Router.current().request.url;
  	var zip = url.substring(url.indexOf("D")+1, url.length);
    return Business.find({"zip" : zip});
  }
});