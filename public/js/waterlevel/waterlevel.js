$(document).ready(function () {
    showWaterlevelChart();
    table();

    setInterval(function () {
        table();
    }, 10000);

    datePickerId.max = new Date().toISOString().split("T")[0];
});

$("body").on("click", ".btn-generate", async (e) =>
    $("#generateReport").modal("show")
);

$("#datePickerId").focusout(function () {
    console.log($("#datePickerId").val());
    datePickerId2.min = new Date($("#datePickerId").val())
        .toISOString()
        .split("T")[0];
});

$("#generateReportss").click(function () {
    var formData = {
        datef: $("#datePickerId").val(),
        datet: $("#datePickerId2").val(),
    };

    $.ajax({
        type: "POST",
        url: "api/exportwaterlevel/generatereport",
        data: formData, // serializes the form's elements.
        dataType: "json",
        encode: true,
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
});

$("#searchData").keyup(function () {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchData");
    filter = input.value.toUpperCase();
    table = document.getElementById("table-main");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
});

$(function () {
    $('input[name="daterange"]').daterangepicker(
        {
            maxDate: $.now(),
            opens: "left",
        },
        function (start, end, label) {
            console.log(
                "A new date selection was made: " +
                    start.format("YYYY-MM-DD") +
                    " to " +
                    end.format("YYYY-MM-DD")
            );
        }
    );
});

var waterlevelLabel = [];
var waterlevelData = [];
var myTemperatureChart;

function table() {
    $.ajax({
        url: "api/waterlevels/getNewVal",
        type: "GET",
        dataType: "json",
        success: function (data) {
            if (data.length > 1) {
                var html = "";
                var state = "";
                $.each(data, function (bb) {
                    if (data[bb].status == 0) {
                        state = "badge-danger";
                    } else if (data[bb].status == 1) {
                        state = "badge-success";
                    } else if (data[bb].status == 2) {
                        state = "badge-warning";
                    }
                    html +=
                        '<tr><td class="text-break">' +
                        data[bb].waterlevel +
                        ' cfs</td><td class="text-break"><div class="badge ' +
                        state +
                        '">' +
                        data[bb].statusName +
                        '</div></td><td class="text-break">' +
                        data[bb].date +
                        '</td><td class="text-break">' +
                        data[bb].time +
                        "</td></tr>";
                });
                $("#table-main").html(html);
            } else {
                $("#table-main").html(
                    '<tr><td colspan="5"><center>NO AVAILABLE DATA<center></td></tr>'
                );
            }
        },
    });

    $.ajax({
        type: "GET",
        url: "api/sensorsconfigurations",
        dataType: "json",
        encode: true,
        success: function (datas) {
            // // console.log(datas[0].temperatureSensorMinVal);
            $("#success").text(
                datas[0].configuration_limit_value +
                    " cfs and above is Good Water Level"
            );
            $("#warning").text(
                parseInt(datas[0].configuration_limit_value)-1 +
                    " cfs and above is Good Water Level"
            );
            $("#danger").text(
                datas[0].configuration_max_value +
                    " cfs and above is Good Water Level"
            );
            fetchWaterlevel();
        },
    });
}

function fetchWaterlevel() {
    $.ajax({
        url: "api/waterlevels/getNewVal",
        type: "GET",
        dataType: "json",
        success: function (data) {
            waterlevelLabel = [];
            waterlevelData = [];

            var newdata = data.reverse();
            $.each(newdata, function (bb) {
                waterlevelLabel.push(newdata[bb].waterlevel + "°C");
                waterlevelData.push(newdata[bb].waterlevel);
                if (data.length - 1 == bb) {
                    showWaterlevelChart();
                    if (data[bb].status == 0) {
                        $("#tempstat").html(
                            '<div class="badge badge-danger">' +
                                data[bb].statusName +
                                "</div>"
                        );
                    } else if (data[bb].status == 1) {
                        $("#tempstat").html(
                            '<div class="badge badge-success">' +
                                data[bb].statusName +
                                "</div>"
                        );
                    } else {
                        $("#tempstat").html(
                            '<div class="badge badge-warning">' +
                                data[bb].statusName +
                                "</div>"
                        );
                    }
                }
            });
        },
    });
}

("use strict");

function showWaterlevelChart() {
    var ctx = document.getElementById("waterlevelChart").getContext("2d");
    myTemperatureChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: waterlevelLabel,
            datasets: [
                {
                    label: "Water Level",
                    data: waterlevelData,
                    borderWidth: 2,
                    backgroundColor: "#f5f184",
                    borderColor: "#aba50c",
                    borderWidth: 2.5,
                    pointBackgroundColor: "#ffffff",
                    pointRadius: 4,
                },
            ],
        },
        options: {
            legend: {
                display: false,
            },
            scales: {
                yAxes: [
                    {
                        gridLines: {
                            drawBorder: false,
                            color: "#f2f2f2",
                        },
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
                xAxes: [
                    {
                        ticks: {
                            display: false,
                        },
                        gridLines: {
                            display: false,
                        },
                    },
                ],
            },
        },
    });
}
