$(document).ready(function () {
    // showTemperatureChart();
    // showHumidityChart();
    showWaterqualityChart();
    showWaterLevelchart();
    startChart();

    setInterval(function () {
        startChart();
    }, 10000);
});

var audio = new Audio("audio/ariba.mp3");

(() => {
    if (!"speechSynthesis" in window) {
        // alert("Sorry, your browser doesn't support text to speech!");
        return;
    }

    const button = document.getElementById("magsalitaka");
    const pauseButton = document.getElementById("hinto");
    const voiceSelect = document.getElementById("voices");
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();

    setVoices();

    button.addEventListener("click", () => {
        if (synth.paused === true) {
            synth.resume();
            return;
        }

        const main = document.querySelector("main");
        textToSpeech("TIME TO SHINE");
    });

    pauseButton.addEventListener("click", () => {
        audio.pause();
    });

    function textToSpeech(text) {
        // const msg = new SpeechSynthesisUtterance();
        // msg.text = text;
        // msg.voice = getSelectedVoice();

        // synth.speak(msg);
        audio.play();
        audio.loop = true;
    }

    function setVoices() {
        if (voices.length === 0) {
            // alert(
            //     "Sorry, it seems this browser does not support different voices."
            // );
            voiceSelect.remove();
        }

        for (let i = 0; i < voices.length; i++) {
            const option = document.createElement("option");
            option.textContent = `${voices[i].name} (${voices[i].lang})`;

            if (voices[i].default) {
                option.textContent += " — DEFAULT";
            }

            option.setAttribute("data-lang", voices[i].lang);
            option.setAttribute("data-name", voices[i].name);
            voiceSelect.appendChild(option);
        }
    }

    function getSelectedVoice() {
        const option = voiceSelect.selectedOptions[0];
        return voices.find(
            (voice) =>
                voice.name === option.dataset.name &&
                voice.lang === option.dataset.lang
        );
    }
})();

var temperatureLabel = [];
var temperatureData = [];
var humidityLabel = [];
var humidityData = [];
var soilMoistureLabel = [];
var soilMoistureData = [];
var co2Label = [];
var co2Data = [];
var waterqualityLabel = [];
var waterqualityData = [];
var lightLabel = [];
var lightData = [];
var waterLevelLabel = [];
var waterLevelData = [];
var myTemperatureChart;
var myHumidityChart;
var soilMoistureChart;
var carbonDioxideChart;
var myWaterQualityChart;
var lightChart;
var waterLevelChart;

function startChart() {
    // $.ajax({
    //     type: "GET",
    //     url: "api/sensorsconfigurations",
    //     dataType: "json",
    //     encode: true,
    //     success: function (datas) {
    //         $("#config_name").html(datas[0].configuration_name);
    //         if (datas[0].temperaturestatusval == 0) {
    //             myTemperatureChart.stop();
    //             $("#tempstat").html(
    //                 '<div class="badge badge-secondary">Sensor is OFF</div>'
    //             );
    //         } else {
    //             fetchTemperature();
    //         }
    //     },
    // });

    // $.ajax({
    //     type: "GET",
    //     url: "api/sensorsconfigurations",
    //     dataType: "json",
    //     encode: true,
    //     success: function (data) {
    //         if (data[0].humiditystatusval == 0) {
    //             myHumidityChart.stop();
    //             $("#humiditystat").html(
    //                 '<div class="badge badge-secondary">Sensor is OFF</div>'
    //             );
    //         } else {
    //             fetchHumidity();
    //         }
    //     },
    // });

    $.ajax({
        type: "GET",
        url: "api/sensorsconfigurations",
        dataType: "json",
        encode: true,
        success: function (data) {
            if (data[0].waterqualitystatusval == 0) {
                myWaterQualityChart.stop();
                $("#waterqualitystat").html(
                    '<div class="badge badge-secondary">Sensor is OFF</div>'
                );
            } else {
                fetchWaterquality();
            }
        },
    });

    fetchWaterLevel();
}

function fetchWaterquality() {
    // audio.play();
    $.ajax({
        url: "api/waterqualities/getNewVal",
        type: "GET",
        dataType: "json",
        success: function (data) {
            waterqualityLabel = [];
            waterqualityData = [];

            // alert(data[0].temperature);

            var newdata = data.reverse();
            $.each(newdata, function (bb) {
                waterqualityLabel.push(newdata[bb].phvalue + "ppm");
                waterqualityData.push(newdata[bb].phvalue);
                // alert(bb);
                if (data.length - 1 == bb) {
                    // console.log(data[bb].status);
                    if (data[bb].status == 0) {
                        $("#waterqualitystat").html(
                            '<div class="badge badge-danger">' +
                                data[bb].statusName +
                                "</div>"
                        );
                    } else if (data[bb].status == 1) {
                        $("#waterqualitystat").html(
                            '<div class="badge badge-success">' +
                                data[bb].statusName +
                                "</div>"
                        );
                    } else {
                        $("#waterqualitystat").html(
                            '<div class="badge badge-warning">' +
                                data[bb].statusName +
                                "</div>"
                        );
                    }
                }
            });
            showWaterqualityChart();
        },
    });
}

// function fetchTemperature() {
//     $.ajax({
//         url: "api/temperatures/getNewVal",
//         type: "GET",
//         dataType: "json",
//         success: function (data) {
//             temperatureLabel = [];
//             temperatureData = [];

//             // alert(data[0].temperature);

//             var newdata = data.reverse();
//             $.each(newdata, function (bb) {
//                 temperatureLabel.push(newdata[bb].temperature + "°C");
//                 temperatureData.push(newdata[bb].temperature);
//                 // alert(bb);
//                 if (data.length - 1 == bb) {
//                     // console.log(data[bb].status);
//                     if (data[bb].status == 0) {
//                         $("#tempstat").html(
//                             '<div class="badge badge-danger">' +
//                                 data[bb].statusName +
//                                 "</div>"
//                         );
//                         $("#status").val(
//                             "Temperature Sensor Detect " +
//                                 data[bb].statusName +
//                                 " Having " +
//                                 newdata[bb].temperature +
//                                 "°C"
//                         );
//                         $("#sensorname").val(
//                             "Temperature Sensor Alert Notification"
//                         );
//                         //   $("#samplemessage").submit(function(e) {
//                         //     // e.preventDefault();
//                         //     alert("asd");
//                         // });
//                     } else if (data[bb].status == 1) {
//                         $("#tempstat").html(
//                             '<div class="badge badge-success">' +
//                                 data[bb].statusName +
//                                 "</div>"
//                         );
//                     } else {
//                         $("#tempstat").html(
//                             '<div class="badge badge-warning">' +
//                                 data[bb].statusName +
//                                 "</div>"
//                         );
//                     }
//                 }
//             });

//             // tempstat
//             showTemperatureChart();
//         },
//     });
// }

// function fetchHumidity() {
//     $.ajax({
//         url: "api/humidities/getNewVal",
//         type: "GET",
//         dataType: "json",
//         success: function (data) {
//             humidityLabel = [];
//             humidityData = [];

//             var newdata = data.reverse();
//             $.each(newdata, function (bb) {
//                 humidityLabel.push(newdata[bb].humidity + " %");
//                 humidityData.push(newdata[bb].humidity);
//                 if (data.length - 1 == bb) {
//                     if (data[bb].status == 0) {
//                         $("#humiditystat").html(
//                             '<div class="badge badge-danger">' +
//                                 data[bb].statusName +
//                                 "</div>"
//                         );
//                     } else if (data[bb].status == 1) {
//                         $("#humiditystat").html(
//                             '<div class="badge badge-success">' +
//                                 data[bb].statusName +
//                                 "</div>"
//                         );
//                     } else {
//                         $("#humiditystat").html(
//                             '<div class="badge badge-warning">' +
//                                 data[bb].statusName +
//                                 "</div>"
//                         );
//                     }
//                 }
//             });
//             showHumidityChart();
//         },
//     });
// }

// function fetchSoilMoisture() {
//     $.ajax({
//         url: "api/soil/getNewVal",
//         type: "GET",
//         dataType: "json",
//         success: function (data) {
//             soilMoistureLabel = [];
//             soilMoistureData = [];

//             var newdata = data.reverse();
//             $.each(newdata, function (bb) {
//                 soilMoistureLabel.push(newdata[bb].soilmoisture + " %");
//                 soilMoistureData.push(newdata[bb].soilmoisture);

//                 if (data.length - 1 == bb) {
//                     if (data[bb].status == 0) {
//                         $("#soilmoisturestat").html(
//                             '<div class="badge badge-danger">' +
//                                 data[bb].statusName +
//                                 "</div>"
//                         );
//                     } else if (data[bb].status == 1) {
//                         $("#soilmoisturestat").html(
//                             '<div class="badge badge-success">' +
//                                 data[bb].statusName +
//                                 "</div>"
//                         );
//                     } else {
//                         $("#soilmoisturestat").html(
//                             '<div class="badge badge-warning">' +
//                                 data[bb].statusName +
//                                 "</div>"
//                         );
//                     }
//                 }
//             });
//             showSoilMoistureChart();
//         },
//     });
// }

// function fetchCarbonDioxide() {
//     $.ajax({
//         url: "api/carbondioxides/getNewVal",
//         type: "GET",
//         dataType: "json",
//         success: function (data) {
//             co2Label = [];
//             co2Data = [];

//             var newdata = data.reverse();
//             $.each(newdata, function (bb) {
//                 co2Label.push(newdata[bb].carbondioxideAmount + " ppm");
//                 co2Data.push(newdata[bb].carbondioxideAmount);

//                 if (data.length - 1 == bb) {
//                     if (data[bb].status == 0) {
//                         $("#co2stat").html(
//                             '<div class="badge badge-danger">' +
//                                 data[bb].statusName +
//                                 "</div>"
//                         );
//                     } else if (data[bb].status == 1) {
//                         $("#co2stat").html(
//                             '<div class="badge badge-success">' +
//                                 data[bb].statusName +
//                                 "</div>"
//                         );
//                     } else {
//                         $("#co2stat").html(
//                             '<div class="badge badge-warning">' +
//                                 data[bb].statusName +
//                                 "</div>"
//                         );
//                     }
//                 }
//             });
//             // $("#curco2").html(co2Label[co2Label.length-1]);
//             showCarbonDioxideChart();
//         },
//     });
// }

// function fetchLight() {
//     $.ajax({
//         url: "api/lights/getNewVal",
//         type: "GET",
//         dataType: "json",
//         success: function (data) {
//             lightLabel = [];
//             lightData = [];

//             var newdata = data.reverse();
//             $.each(newdata, function (bb) {
//                 lightLabel.push(newdata[bb].lightsAmount + " lm");
//                 lightData.push(newdata[bb].lightsAmount);

//                 if (data.length - 1 == bb) {
//                     if (data[bb].status == 0) {
//                         $("#lightstat").html(
//                             '<div class="badge badge-danger">' +
//                                 data[bb].statusName +
//                                 "</div>"
//                         );
//                     } else if (data[bb].status == 1) {
//                         $("#lightstat").html(
//                             '<div class="badge badge-success">' +
//                                 data[bb].statusName +
//                                 "</div>"
//                         );
//                     } else {
//                         $("#lightstat").html(
//                             '<div class="badge badge-warning">' +
//                                 data[bb].statusName +
//                                 "</div>"
//                         );
//                     }
//                 }
//             });
//             // $("#curlig").html(lightLabel[lightLabel.length-1]);
//             showLightChart();
//         },
//     });
// }

function fetchWaterLevel() {
    $.ajax({
        url: "api/waterlevels/getNewVal",
        type: "GET",
        dataType: "json",
        success: function (data) {
            waterLevelLabel = [];
            waterLevelData = [];

            var newdata = data.reverse();
            $.each(newdata, function (bb) {
                waterLevelLabel.push(newdata[bb].waterlevel + " cfs");
                waterLevelData.push(newdata[bb].waterlevel);

                if (data.length - 1 == bb) {
                    if (data[bb].status == 0) {
                        $("#waterlevelstat").html(
                            '<div class="badge badge-danger">' +
                                data[bb].statusName +
                                "</div>"
                        );
                    } else if (data[bb].status == 1) {
                        $("#waterlevelstat").html(
                            '<div class="badge badge-success">' +
                                data[bb].statusName +
                                "</div>"
                        );
                    } else {
                        $("#waterlevelstat").html(
                            '<div class="badge badge-warning">' +
                                data[bb].statusName +
                                "</div>"
                        );
                    }
                }
            });
            showWaterLevelchart();
        },
    });
}

("use strict");

function showWaterqualityChart() {
    var ctx = document.getElementById("waterqualityChart").getContext("2d");
    myWaterQualityChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: waterqualityLabel,
            datasets: [
                {
                    label: "PH Value",
                    data: waterqualityData,
                    borderWidth: 2,
                    backgroundColor: "#33ff69",
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

function showTemperatureChart() {
    var ctx = document.getElementById("temperatureChart").getContext("2d");
    myTemperatureChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: temperatureLabel,
            datasets: [
                {
                    label: "Temperature",
                    data: temperatureData,
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

function showHumidityChart() {
    var ctx = document.getElementById("humidityChart").getContext("2d");
    myHumidityChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: humidityLabel,
            datasets: [
                {
                    label: "Humidity",
                    data: humidityData,
                    borderWidth: 2,
                    backgroundColor: "#f27e1f",
                    borderColor: "#bd833c",
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

function showSoilMoistureChart() {
    var ctx = document.getElementById("soilMoistureChart").getContext("2d");
    soilMoistureChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: soilMoistureLabel,
            datasets: [
                {
                    label: "Soil Moisture",
                    data: soilMoistureData,
                    borderWidth: 2,
                    backgroundColor: "#ab8363",
                    borderColor: "#edc6a6",
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

function showCarbonDioxideChart() {
    var ctx = document.getElementById("co2Chart").getContext("2d");
    carbonDioxideChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: co2Label,
            datasets: [
                {
                    label: "Carbon Dioxide",
                    data: co2Data,
                    borderWidth: 2,
                    backgroundColor: "#38fcae",
                    borderColor: "#0c945d",
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

function showLightChart() {
    var ctx = document.getElementById("lightChart").getContext("2d");
    lightChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: lightLabel,
            datasets: [
                {
                    label: "Light Lumen",
                    data: lightData,
                    borderWidth: 2,
                    backgroundColor: "#e6faf9",
                    borderColor: "#8fc4c2",
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

function showWaterLevelchart() {
    var ctx = document.getElementById("waterLevelChart").getContext("2d");
    waterLevelChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: waterLevelLabel,
            datasets: [
                {
                    label: "Cubic Feet Per Second",
                    data: waterLevelData,
                    borderWidth: 2,
                    backgroundColor: "#62f5ed",
                    borderColor: "#a4ede9",
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
