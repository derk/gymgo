angular.module('starter.controllers', ["baiduMap"])

.controller('DashCtrl', function($scope) {
    $scope.updates = [{
        avator: "http://ionicframework.com/img/docs/mcfly.jpg",
        img: "http://ionicframework.com/img/docs/delorean.jpg",
        description: "hahahaha"
    }];
})

.controller('ChatsCtrl', function($scope, Chats) {
    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
        Chats.remove(chat);
    }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})
.controller('GymDetailCtrl',function($scope,$stateParams, GymData){
    $scope.gymid = $stateParams.gymId;
	GymData.getgymddetail($scope.gymid, function(data){
		console.log(JSON.stringify(data));
	});
})

.controller('AccountCtrl', ['$scope', '$http', 'Geo',
    function($scope, $http, Geo) {

		var longitude = 116.43183;
		var latitude = 39.99274;

        $scope.gymlist = [];
		$scope.curloc = undefined;
		Geo.getloc(function(loc){
			$scope.curloc = loc;
		});
		Geo.nearby(function(gymlist){
			$scope.gymlist = gymlist;
		});
        $scope.mapOptions = {
            center: {
                longitude: longitude,
                latitude: latitude
            },
            zoom: 17,
            city: 'Beijing',
            markers: []
        };
    }
]);
