var formToValidate = $("#loginForm").validate({
    rules: {
        loginUsername: {
            required: !0,
            minlength: 3
        },
        loginPassword: {
            required: !0,
            minlength: 3
        }
    },
    messages: {
        loginUsername: {
            required: '<span style="color:red">Please enter your username<span>',
            minlength: '<span style="color:red">Please enter a valid username<span>'
        },
        loginPassword: {
            required: '<span style="color:red">Please enter your password<span>',
            minlength: '<span style="color:red">Please enter a valid password<span>'
        }
    }
});

function doMag(e) {
    var t, a = CryptoJS.enc.Utf8.parse("rTg" + e),
        o = CryptoJS.enc.Utf8.parse(e + "cgf"),
        n = (t = $("#loginPassword").val(), CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(t), a, {
            keySize: 16,
            iv: o,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }));
    $("#loginPassword").val(n)
}


function checkUser() {
    var e = {};
    document.cookie.split(";", 5).forEach(function(t) {
        var a = t.split("=", 2);
        e[a[0].trim()] = a[1]
    }), $.ajax({
        url: "user/details",
        type: "GET",
        headers: {
            "content-type": "application/json",
            Authorization: e["access-token"]
        },
        success: function(data) {
        		//console.log("user roles  :", data.roles);
        		if (data.roles.length > 1) {
                var userRoles = data.roles;
                //console.log("userRoles :", userRoles);
                var portAccess = [];
                

                for (var y = 0; y < userRoles.length; y++) {
                    //console.log("set kiya " + userRoles[y].name);
                    if (userRoles[y].name == "admin") {
                        $("#mod_radio").append(
                            "<div class='radio'><label><input type='radio' value='umg' name='mod_select'>User Mgmt</label></div>"
                        );
                    } else if (userRoles[y].name == "branch_user" || userRoles[y].name == "co_user") {
                    	 //console.log("LCBN ");
                        $("#mod_radio").append(
                            "<div class='radio'><label><input type='radio' value='lcbn' name='mod_select'>LCBN</label></div>"
                        );
                    } else if (userRoles[y].name == "ddp_maker" ) {
                    	 //console.log("DDP ");
                        $("#mod_radio").append(
                            "<div class='radio'><label><input type='radio' value='ddp_maker' name='mod_select'>Direct Dealing Maker</label></div>"
                        );
                    }else if (userRoles[y].name == "ddp_checker" ) {
                    	 //console.log("DDP ");
                        $("#mod_radio").append(
                            "<div class='radio'><label><input type='radio' value='ddp_checker' name='mod_select'>Direct Dealing Checker</label></div>"
                        );
                    }else if (userRoles[y].name == "ddp_dealer") {
                    	 //console.log("DDP ");
                        $("#mod_radio").append(
                            "<div class='radio'><label><input type='radio' value='ddp_dealer' name='mod_select'>Direct Dealing Dealer</label></div>"
                        );
                    }
                }
                $("#logDiv").replaceWith($("#roleSelector"));
                $("#roleSelector").css("visibility", "visible");
            } else if (data.roles.length == 1) {
                var finPortal = data.roles[0].name;
                if (finPortal == "admin") {
                    window.location.href = "/usermanagement";
                } else if (finPortal == "branch_user" || finPortal == "co_user") {
                    window.location.href="/lcbn";
                } else if (finPortal == "ddp_maker") {
                	window.location.href = "http://localhost:4200/customer-main";
//                	window.location.href = "../DirectDealing";
                }
				else if (finPortal == "ddp_checker") {
					window.location.href = "http://localhost:4200/checker-dashboard";
//			    	window.location.href = "../DirectDealing/checker-dashboard";
                }
				else if (finPortal == "ddp_dealer") {
					window.location.href = "http://localhost:4200/dealer";
//			    	window.location.href = "../DirectDealing/dealer-main";
                }
            } else {
                // perform something else if no matching module found
            }
        },
        error: function(data) {
            //console.log(data);
            $("#loginMessage").html("<div class='alert alert-danger'>Please login to continue</div>")
        }
    })
}

$("#portSelect").submit(function (event) {
    event.preventDefault();
    var selectedPortal = $("#portSelect")
        .find("input[name=mod_select]:checked")
        .val();
    console.log(selectedPortal);

    if (selectedPortal == "umg") {
        window.location.href = "/usermanagement";
    } else if (selectedPortal == "lcbn") {
        window.location.href="/lcbn";
    } else if (selectedPortal == "ddp_maker") {
    	window.location.href = "http://localhost:4200/customer-main";
//    	window.location.href = "../DirectDealing";
    } else if (selectedPortal == "ddp_checker") {
    	window.location.href = "http://localhost:4200/checker-dashboard";
//    	window.location.href = "../DirectDealing/checker-dashboard";
    } else if (selectedPortal == "ddp_dealer") {
    	window.location.href = "http://localhost:4200/dealer";
//    	window.location.href = "../DirectDealing/dealer-main";
    }
});

$("#loginForm").submit(function (event) {
    $("#loginMessage").html("");
    if (formToValidate.valid()) {
        var $this = $("#loginButton");
        $this.button("loading");
        //console.log("working");

        event.preventDefault();
        (radio = new Date().getTime()), doMag(radio);
        var username = $("#loginUsername").val();
        var password = $("#loginPassword").val();

        var data = {
            username: username,
            password: password
        };

        $.ajax({
            url: "auth/login",
            type: "POST",
            data: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
                radio: radio
            },
            success: function (data) {
                document.cookie =
                    "access-token=" + data.response.token + "; Path=/";
                checkUser();
                $this.button("reset");
            },
            error: function (xhr, error) {
                $("#loginMessage").html(
                    "<div class='alert alert-danger'>Login failed !</div>"
                );
                $this.button("reset");
            }
        });
    }
});

var cookieData = {},
    splittedCookie = document.cookie.split(";", 5);
splittedCookie.forEach(function(e) {
    var t = e.split("=", 2);
    cookieData[t[0].trim()] = t[1]
});
var accessToken = cookieData["access-token"];
null != accessToken && accessToken.length && checkUser();