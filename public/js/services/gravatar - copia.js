

/*angular.module('NotasApp')
.factory('Gravatar', function GravatarFactory(){
  var avatarSize = 80;
  var avatarUrl = "http://www.gravatar.com/avatar/";
  return function(email){
    return avatarUrl + CryptoJS.MD5(email) + "?size=" + avatarSize.toString();
  };
});*/
angular.module('NotasApp')
.provider('Gravatar', function GravatarProvider(){
  var avatarSize = 80;
  var avatarUrl = "http://www.gravatar.com/avatar/";
  this.setSize = function(size) {
    avatarSize = size;
  };
  this.$get = function() {
    return function(email){
      return avatarUrl + CryptoJS.MD5(email) + "?size=" + avatarSize.toString();
    };
  };
})
.config(function (GravatarProvider) {
  GravatarProvider.setSize(200);
});
