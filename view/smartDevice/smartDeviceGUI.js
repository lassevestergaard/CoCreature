function clickHandlers(){
    $("#feed").click(function(){
        $("#foodView").removeClass("hidden");
        $("#gameView").addClass("hidden");
    });

    $("#game").click(function(){
        $("#gameView").removeClass("hidden");
        $("#foodView").addClass("hidden");
    });
}

function updateMainView(){
    
}

function populateFoodView(){
    //$("")

}