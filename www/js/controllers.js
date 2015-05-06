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
    .controller('GymDetailCtrl', function($scope, $stateParams, GymData) {
        $scope.gymid = $stateParams.gymId;
        GymData.getgymddetail($scope.gymid, function(data) {
            console.log(JSON.stringify(data));
        });
    })

.controller('AccountCtrl', ['$scope', '$http', 'Geo','$ionicModal',
    function($scope, $http, Geo, $ionicModal) {

        var longitude = 116.43183;
        var latitude = 39.99274;

        $scope.gymlist = [];
        $scope.curloc = undefined;
		$scope.mapmode = false;
		$scope.toggleDisplayMode = function(){
			$scope.mapmode = !$scope.mapmode;
		}

        $ionicModal.fromTemplateUrl('templates/gym-detail.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        Geo.getloc(function(loc) {
            $scope.curloc = loc;
        });
        Geo.nearby(function(gymlist) {
            $scope.gymlist = gymlist;
        });
        var markerclickaction = function(gym) {
			if($scope.gym != gym){
				$scope.gym = gym;
			}
            $scope.modal.show();
        }
        $scope.mapOptions = {
            center: {
                longitude: longitude,
                latitude: latitude
            },
            zoom: 16,
            city: 'Beijing',
            markers: [],
            markerclick: markerclickaction
        };
    }
]);
