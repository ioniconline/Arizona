angular.module('app.services', [])

.factory('StoryService', ["$q", "$http", function ($q, $http) {
    var service = {};
    service.fetchStoryList = function (cateId) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var progress;
        var final_url = "http://192.168.1.108:9004/data/?type=" + cateId;

        $http.get(final_url)
            .success(function (data) {
                deferred.resolve(data.list);
            })
            .error(function (error) {
                deferred.reject(error);
                console.log(error);
            });
        return deferred.promise;
    };

    service.fetchStoryDetail = function (storyId) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var progress;
        var final_url = "http://192.168.1.108:9004/datadetail/?id=" + storyId;
        console.log(final_url);

        $http.get(final_url)
            .success(function (data) {
                console.log(data);
                deferred.resolve(data);
            })
            .error(function (error) {
                deferred.reject(error);
                console.log(error);
            });
        return deferred.promise;
    };


    service.chatRobot = function (text, robot_uid) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var progress;
        var final_url = "http://i.caredear.com/robot/";
        console.log(final_url);
        $http.post(final_url, {
                "text": text,
                "uid": robot_uid,
                "type": 0,
            })
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    return service
}])

.service('BlankService', [function () {

}]);