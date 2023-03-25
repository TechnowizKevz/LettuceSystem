$(document).ready(function () {
    fetchDataSensor();

    setInterval(function () {
        fetchDataSensor();
    }, 10000);

    function fetchDataSensor() {
        $.ajax({
            url: "api/temperatures/getNewVal",
            type: "GET",
            dataType: "json",
            success: function (data) {
                $("#curtemp").html(data[0].temperature + " °C");
                // if(data[0].status==0){

                //     $("#notificationContainer").html('<div class="dropdown-item dropdown-item-unread"><div class="dropdown-item-icon bg-danger text-white"><i class="fas fa-temperature-high"></i></div><div class="dropdown-item-desc">'+data[0].temperature+'°C Temperature is to High<div class="time text-primary">'+data[0].date + " | "+ data[0].time+'</div></div></div>');

                // }
            },
        });

        $.ajax({
            url: "api/humidities/getNewVal",
            type: "GET",
            dataType: "json",
            success: function (data) {
                $("#curhum").html(data[0].humidity + " %");
                // if(data[0].status==0){

                //     $("#notificationContainer").html('<div class="dropdown-item dropdown-item-unread"><div class="dropdown-item-icon bg-danger text-white"><i class="fas fa-temperature-high"></i></div><div class="dropdown-item-desc">'+data[0].humidity+' °C Humidity is to High<div class="time text-primary">'+data[0].date + " | "+ data[0].time+'</div></div></div>');

                // }
            },
        });

        $.ajax({
            url: "api/waterqualities/getNewVal",
            type: "GET",
            dataType: "json",
            success: function (data) {
                $("#curphval").html(data[0].phvalue + " ppm");
                // if(data[0].status==0){

                //     $("#notificationContainer").html('<div class="dropdown-item dropdown-item-unread"><div class="dropdown-item-icon bg-danger text-white"><i class="fas fa-temperature-high"></i></div><div class="dropdown-item-desc">'+data[0].lightsAmount+' lm Light is to High<div class="time text-primary">'+data[0].date + " | "+ data[0].time+'</div></div></div>');

                // }
            },
        });

        $.ajax({
            url: "api/waterlevels/getNewVal",
            type: "GET",
            dataType: "json",
            success: function (data) {
                $("#curwaterlev").html(data[0].waterlevel + " cfs");
                // if(data[0].status==0){

                //     $("#notificationContainer").html('<div class="dropdown-item dropdown-item-unread"><div class="dropdown-item-icon bg-danger text-white"><i class="fas fa-temperature-high"></i></div><div class="dropdown-item-desc">'+data[0].carbondioxideAmount+' ppm CarbonDioxide is to High<div class="time text-primary">'+data[0].date + " | "+ data[0].time+'</div></div></div>');

                // }
            },
        });
    }
});
