var contactListApp = angular.module("contactListApp", ["ngStorage"]);

contactListApp.service("getContacts", ["$http", "$localStorage", function getContacts($http, $localStorage){
    //This service will get us contacts from server.

    function callServer(method, url, timeout, successCallback, errorCallback){
        $http({
            method : method,
            url : url,
            responseType : "json"
            //you can add cache as well or showoff localStorage knowledge

        }).then(function(response){
            //Success Callback
            successCallback(response);
        },
        function(error){
            //Error Callback
            errorCallback(response);
        });
    }

    this.getContacts = function(successCallback, errorCallback){
        var method = "GET";
        var url = "https://candidate­-test.herokuapp.com/contacts";
        var getContactTimeout = 8000;
        if(typeof ($localStorage.contacts) !== "undefined"){
            getContactTimeout = 1000;
        }

        var success = function(response){
            $localStorage.contacts = response.data;
            successCallback(response.data);
        };
        var error = function(response){
            //Fail silently if we already have user data
            if(typeof ($localStorage.contacts) !== "undefined"){
                successCallback($localStorage.contacts);
            }else{
                errorCallback(response);
            }
        };

        callServer(method, url, getContactTimeout, success, error);
    };
}]);

contactListApp.service("stModifiers", [function stModifiers(){

    this.getPhoneString = function(phone){
        if(phone != ""){
            return 'Phone Number: ' + phone;
        }else{
            return '';
        }
    }

    this.getJobStr = function(job, company){
        if(job != "" && company != ""){
            return job + ' | ' + company;
        }else if(job == "" && company != ""){
            return company;
        }else if(job != ""){
            return job;
        }
    }


}]);


contactListApp.controller("contactListController", ["$scope", "getContacts", "stModifiers", function contactListController($scope, getContacts, stModifiers){

    getContacts.getContacts(function(contacts){
        $scope.contacts = contacts;
    },function(response){
        //Do something here
        console.log("it Failed. Status Code: " + response.code);
    });

    $scope.getPhoneString = stModifiers.getPhoneString;
    $scope.getJobStr = stModifiers.getJobStr;

}]);