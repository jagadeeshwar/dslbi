angular.module('tasks', ['restangular', 'ngRoute']).
	config(function ($routeProvider, RestangularProvider) {
		$routeProvider.
			when('/', {
				controller: ListCtrl,
				templateUrl: 'tasks.list.html'
			}).
			when('/edit/:SNO', {
				controller: EditCtrl,
				templateUrl: 'tasks.detail.html',
				resolve: {
					task: function (Restangular, $route) {
						return Restangular.one('tasks', $route.current.params.SNO).get();
					}
				}
			}).
			when('/new', {
				controller: CreateCtrl,
				templateUrl: 'tasks.new.html'// ,
// 				resolve: {
// 					tasks: function (Restangular, $route) {
// 						return Restangular.one('tasks', $route.current.params.SNO).get();
// 					}
// 				}
			}).
			otherwise({redirectTo: '/'});


	RestangularProvider.setBaseUrl('https://api.mongolab.com/api/1/databases/testtasks/collections');
	RestangularProvider.setDefaultRequestParams({ apiKey: 'P0vw_hCqrjuaUzOkGY0H0A-FoPUq3skZ'});
	RestangularProvider.setRestangularFields({
			id: '_id'
		});


		RestangularProvider.setRequestInterceptor(function (elem, operation, what) {

			if (operation === 'put') {
				elem._id = undefined;
				return elem;
			}
			else if (operation === 'get')
			{
			 alert('get');
			}
			return elem;
		})
	});


function ListCtrl($scope, Restangular) {
	$scope.tasks = Restangular.all("tasks").getList().$object;
	//alert('$scope.tasks' + $scope);
}


function CreateCtrl($scope, $location, Restangular) {

	$scope.tasks = Restangular.all("tasks").getList().$object;
	
// 	var stooges = [{age: 40}, {age: 50}, {age: 60}];
// 	$scope.testVal = _.max(stooges, function(stooge){ return stooge.age; });

// 	var totaltasks = [ { "_id" : 579 , "SNO" : 1 , "Item" : "Mongo DB Allocation - Non PROD" , "Details" : "\tCo-allocation of of DB  3.2 and 2.8 version in UAT is blocked for review = Authorization needs this for 3.x release \n" , "Status" : "Complete" , "Owner/Dependency" : "DBA/Test Team" , "Resolved Date" : "7/27/2014" , "Target Date" : "7/22/2014" , "Flag" :  null  , "Sign Off" :  null  , "Comments" : "Task Completed"} , { "_id" : 590 , "SNO" : 2 , "Item" : "New Task 9/3" , "Comments" : "New Task" , "Status" : "YetToStart"} ];
//  var totaltasks = $scope.tasks;
// 		$scope.getTotalTasks = _.max($scope.tasks, function(task){ return task});
// 		alert('Iam here looking for TotalTasks' + $scope.getTotalTasks);	


	$scope.statuslist =[
      {name:'InProgress'},
      {name:'Complete'},
      {name:'Pending'},
      {name:'YetToStart'}
    ];
	$scope.statusSelected = $scope.statuslist[3];

	$scope.save = function () {
		Restangular.all('tasks').post($scope.task).then(function (task) {
			$location.path('/');
		});
	}
}

function EditCtrl($scope, $location, Restangular, task) {
	var original = task;
	$scope.task = Restangular.copy(original);
	$scope.statuslist =[
      {name:'InProgress'},
      {name:'Complete'},
      {name:'Pending'},
      {name:'YetToStart'}
    ];
    //$scope.statusSelected = task.Status;
    if (task.Status == 'Complete')
	    $scope.statusSelected = $scope.statuslist[1];
	else  if (task.Status == 'InProgress')
	    $scope.statusSelected = $scope.statuslist[0];
	else  if (task.Status == 'Pending')
	    $scope.statusSelected = $scope.statuslist[2];
    else 
	    $scope.statusSelected = $scope.statuslist[3];

	
	
	$scope.isClean = function () {
		return angular.equals(original, $scope.task);
	}

	$scope.destroy = function () {
		original.remove().then(function () {
			$location.path('/list');
		});
	};

	$scope.save = function () {
		$scope.task.put().then(function () {
			$location.path('/');
		});
	};
	
	
	
}
