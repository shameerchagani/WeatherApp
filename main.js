function formatWeather(data, addTo) {

    addTo.append("<p id='city'>" + $("#input").val().toUpperCase() + " - (" + data.sys.country + ")</p>");
    let d = new Date();
    let date = d.getDate();
    date = date < 10 ? '0' + date : date;

    let month = (d.getMonth() + 1);
    month = month < 10 ? '0' + month : month;

    let year = d.getFullYear();

    let hours = d.getHours();
    hours = hours < 10 ? '0' + hours : hours;

    let minutes = d.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;

    let seconds = d.getSeconds();
    seconds = seconds < 10 ? '0' + seconds : seconds;

    let fullDate = date + "/" + month + "/" + year + "   " +
        hours + ":" + minutes + ':' + seconds;

    addTo.append('<em id="Update">Updated: ' + fullDate + '</em>');
    let image = "https://openweathermap.org/img/wn/";
    image = image + data.weather[0].icon + "@2x.png";
    // addTo.append("<img src='" + image + "' />");
    addTo.append("<span id='temparature'><img id='temp-icon' src='" + image + "' />");
    addTo.append("<h1 id='temp-value'>" + Math.floor(data.main.temp) + "<sup>&deg;</sup>C" + "</h1></span>");
    addTo.append("<small> Min: " + Math.round(data.main.temp_min) + "&nbsp;<sup>&deg;&nbsp;&nbsp;&nbsp; </sup>Max: " +
        Math.round(data.main.temp_max) + "&nbsp;<sup>&deg;</sup>&nbsp;&nbsp;&nbsp; Wind Speed: " + data.wind.speed + "Mph</small>");
    addTo.append("<p id='desc'>" + data.weather[0].description + "</p>");
}

$(function () {
    $("#location").submit(event => {
        event.preventDefault();
        let location = $('#input').val();
        if (location !== "") {
            //https://api.openweathermap.org/data/2.5/weather?q=Kampala&units=metric&appid=240192ee389079f53386bb5dee88f1e3
            let url = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=240192ee389079f53386bb5dee88f1e3"
            url = url + "&q=" + location;
            $.ajax({
                type: "GET",
                url: url,
                success: function (data) {
                    let container = $("#container");
                    container.empty();
                    formatWeather(data, container);
                    $('#input').val('');
                },
                error: function (data) {
                    let tempVal = data.status;
                    if (tempVal === 404) {
                        $('#container').empty();
                        $('#container').append("<h1>" + tempVal + " - City Not Found </h1>");
                    } else {
                        $('#container').append("<h1>" + tempVal + "Oops... Something Went Wrong, please try again later </h1>");
                    }
                }
            });
        } else (alert('Please Enter City/Town Name'));
    });
});