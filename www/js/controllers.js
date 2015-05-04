angular.module('starter.controllers', ["baiduMap", 'geolocation'])

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

.controller('AccountCtrl', ['$scope', '$http', 'geolocation',
    function($scope, $http, geolocation) {

        var url = 'http://localhost:1337/gym/nearby';
		var longitude = 116.43183;
		var latitude = 39.99274;
        $scope.gymlist = [];
		$scope.curloc = undefined;

        geolocation.getLocation().then(function(data) {
            latitude  = data.coords.latitude;
            longitude = data.coords.longitude;
			alert(longitude + "," + latitude);
			$scope.curloc = {latitude: latitude, longitude:longitude};
            $http.post(url, $scope.curloc)
                .success(function(data, status) {
                    $scope.gymlist = data;
                })
                .error(function(data, status) {});
        });

        $scope.mapOptions = {
            center: {
                longitude: longitude,
                latitude: latitude
            },
            zoom: 17,
            city: 'ShangHai',
            markers: []
        };
    }
]);
