if(!Detector.webgl){
    Detector.addGetWebGLMessage();
} else {



    // Where to put the globe?
    var container = document.getElementById( 'container' );

    // Make the globe
    var globe = new DAT.Globe( container );


var temp = 0;
//server sent event handling
    if(typeof(EventSource) !== "undefined") {
        var source = new EventSource("server.php");
        source.onmessage = function(event) {
            // document.getElementById("result").innerHTML += event.data + "<br>";
temp = temp +1;

            // Parse the JSON
            var data = JSON.parse( event.data );

            // Tell the globe about your JSON data
            for ( var i = 0; i < data.length; i ++ ) {
                globe.addData( data[i][1], {format: 'magnitude', name: data[i][0]} );
            }

            // Create the geometry
            globe.createPoints();

            // Begin animation
            globe.animate();
if (temp>20) {
    source.close();
};


        };
    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support server-sent events...";
    }


    // // We're going to ask a file for the JSON data.
    // var xhr = new XMLHttpRequest();

    // // Where do we get the data?
    // xhr.open( 'GET', '/globe/myjson.json', true );

    // // What do we do when we have it?
    // xhr.onreadystatechange = function() {

    //     // If we've received the data
    //     if ( xhr.readyState === 4 && xhr.status === 200 ) {

    //         // Parse the JSON
    //         var data = JSON.parse( xhr.responseText );

    //         // Tell the globe about your JSON data
    //         for ( var i = 0; i < data.length; i ++ ) {
    //             globe.addData( data[i][1], {format: 'magnitude', name: data[i][0]} );
    //         }

    //         // Create the geometry
    //         globe.createPoints();

    //         // Begin animation
    //         globe.animate();

    //     }

    // };

    // Begin request
    // xhr.send( null );



    // var years = ['1990','1995','2000'];
    // var container = document.getElementById('container');
    // var globe = new DAT.Globe(container);

    // console.log(globe);
    // var i, tweens = [];

    // var settime = function(globe, t) {
    //     return function() {
    //         new TWEEN.Tween(globe).to({time: t/years.length},500).easing(TWEEN.Easing.Cubic.EaseOut).start();
    //         var y = document.getElementById('year'+years[t]);
    //         if (y.getAttribute('class') === 'year active') {
    //             return;
    //         }
    //         var yy = document.getElementsByClassName('year');
    //         for(i=0; i<yy.length; i++) {
    //             yy[i].setAttribute('class','year');
    //         }
    //         y.setAttribute('class', 'year active');
    //     };
    // };

    // for(var i = 0; i<years.length; i++) {
    //     var y = document.getElementById('year'+years[i]);
    //     y.addEventListener('mouseover', settime(globe,i), false);
    // }

    // var xhr;
    // TWEEN.start();

    // xhr = new XMLHttpRequest();
    // xhr.open('GET', '/globe/myjson.json', true);
    // xhr.onreadystatechange = function(e) {
    //     if (xhr.readyState === 4) {
    //         if (xhr.status === 200) {
    //             var data = JSON.parse(xhr.responseText);
    //             window.data = data;
    //             for (i=0;i<data.length;i++) {
    //                 globe.addData(data[i][1], {format: 'magnitude', name: data[i][0], animated: true});
    //             }
    //             globe.createPoints();
    //             settime(globe,0)();
    //             globe.animate();
    //             document.body.style.backgroundImage = 'none'; // remove loading
    //         }
    //     }
    // };
    // xhr.send(null);
}


