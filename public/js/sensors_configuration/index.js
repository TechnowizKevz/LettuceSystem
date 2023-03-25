$(document).ready(function () {
    // $(window).on( "load", function()
    getCurrentSensorsVal();
    setInterval(function () {
        getCurrentSensorsVal();
    }, 20000);
    function getCurrentSensorsVal() {
        $.ajax({
            type: "GET",
            url: "api/waterlevels/getNewVal",
            dataType: "json",
            encode: true,
            success: function (data) {
                if (data.length == 0) {
                    $("#currentwaterlevel").text = 0;
                } else {
                    $("#currentwaterlevel").text(data[0].waterlevel + " cfs");
                }
            },
        });

        $.ajax({
            type: "GET",
            url: "api/waterqualities/getNewVal",
            dataType: "json",
            encode: true,
            success: function (data) {
                if (data.length == 0) {
                    $("#currentwaterqua").text = 0;
                } else {
                    $("#currentwaterqua").text(data[0].phvalue + " ppm");
                }
            },
        });
    }

    $.ajax({
        type: "GET",
        url: "api/sensorsconfigurations",
        success: function (data) {
            console.log(data);
            if (data.length == 0) {
                $("#updateTemperatureSetting").hide();
            } else {
                $("#sensor_limit_value_l").val(
                    data[0].configuration_limit_value
                );
                $("#sensor_max_value_l").val(data[0].configuration_max_value);
                $("#sensor_limit_value_q").val(
                    data[1].configuration_limit_value
                );
                $("#sensor_max_value_q").val(data[1].configuration_max_value);
                // $("#sensor_limit_value_q").val(data[1].configuration_limit_value);
            }
        },
    });

    $("#updateWaterLevelSetting").click(function (event) {
        //   event.preventDefault();
        var formData = {
            id: 2,
            configuration_limit_value: $("#sensor_limit_value_q").val(),
            configuration_max_value: $("#sensor_max_value_q").val(),
        };

        if (
            parseInt(formData.configuration_limit_value) >
            parseInt(formData.configuration_max_value)
        ) {
            swal.fire({
                icon: "error",
                title: "Oops...",
                showConfirmButton: false,
                timer: 3000,
                text: "Limit Value Cannot be Greater Than Max Value",
                footer: "<a href>CleverTech</a>",
            });
        } else {
            $.ajax({
                type: "PUT",
                url: "api/sensorsconfigurations/" + formData.id + "/update",
                data: formData, // serializes the form's elements.
                success: function (data) {
                    swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500,
                        footer: "<a href>InnovaTech</a>",
                    });
                },
            });
        }
    });

    $("#updateWaterQualitySetting").click(function (event) {
        //   event.preventDefault();
        var formData = {
            id: 1,
            configuration_limit_value: $("#sensor_limit_value_l").val(),
            configuration_max_value: $("#sensor_max_value_l").val(),
        };

        if (
            parseInt(formData.configuration_limit_value) >
            parseInt(formData.configuration_max_value)
        ) {
            swal.fire({
                icon: "error",
                title: "Oops...",
                showConfirmButton: false,
                timer: 3000,
                text: "Limit Value Cannot be Greater Than Max Value",
                footer: "<a href>CleverTech</a>",
            });
        } else {
            $.ajax({
                type: "PUT",
                url: "api/sensorsconfigurations/" + formData.id + "/update",
                data: formData, // serializes the form's elements.
                success: function (data) {
                    swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500,
                        footer: "<a href>InnovaTech</a>",
                    });
                },
            });
        }
    });
});
