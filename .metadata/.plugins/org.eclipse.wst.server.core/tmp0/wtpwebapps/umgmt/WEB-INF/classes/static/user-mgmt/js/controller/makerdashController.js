DerivativeApp.controller('makerdashController', function($scope, $http, $timeout,  requestService) {
   
    $scope.actype = 'R'

    $scope.acting = false;

    $scope.preview = (request)=>{
        
        $scope.request = request
        $scope.request.payload = JSON.parse(request.serializedPayload)
    }


    $scope.loadMakerDash = ()=>{
        requestService.loadMakerRequests()
            .then((response)=>{
                $scope.makeRequests = response.data
            })
    }


    $scope.loadCheckerDash = ()=>{
        requestService.loadCheckerRequests()
        .then((response)=>{
            $scope.checkRequests = response.data
        })
    }

    $scope.accept = (request) => {
        packet = {
            comments: $scope.actcomment,
            rid: request.requestId
        }

        $scope.acting = true;

        try{
            requestService
                .acceptRequest(packet)
                    .then((response)=>{
                        $scope.acting = false;
                        $scope.chk = {
                            msg: "successfully approved",
                            stat: true
                        }
                    },(err)=>{
                        
                        $scope.acting = false;  
                        $scope.chk = {
                            msg: "operation failed",
                            stat: false
                        }
                    })
        }catch(err){
                $scope.acting = false;
        }
    }
    $scope.chk = {
        status: false
    }
    $scope.reject = (request) => {
        packet = {
            comments: $scope.actcomment,
            rid: request.requestId
        }
        $scope.acting = true;

        try{
            requestService
            .rejectRequest(packet)
                .then((response)=>{
                    console.log(response)
                    $scope.acting = false;
                    $scope.chk = {
                        msg: "successfully rejected",
                        stat: true
                    }
                },(err)=>{
                    
                    $scope.acting = false;  
                    $scope.chk = {
                        msg: "operation failed",
                        stat: false
                    }
                })
        }catch(err){
            $scope.acting = false;
        }
        
    }

    $scope.actRequest = (request, type)=>{
        $scope.actype = type
        $scope.act = request
    }


    $scope.dismissChk = ()=>{
        $scope.actcomment = ''
        $scope.chk = {
            status: false
        }
        $scope.loadCheckerDash()
    }

});
