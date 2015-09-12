if(!Detector.webgl){
    Detector.addGetWebGLMessage();
} else {

    var container = document.getElementById('container');
    var globe = new DAT.Globe(container);

    var xhr;
    TWEEN.start();

    xhr = new XMLHttpRequest();
    xhr.open('GET', '/globe/myjson.json', true);
    xhr.onreadystatechange = function(e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var years = [];
                var data = JSON.parse(xhr.responseText);
                window.data = data;
                for (i=0;i<data.length;i++) {
                    globe.addData(data[i][1], {format: 'magnitude', name: data[i][0], animated: true});
                    years.push(i);
                }
                globe.createPoints();
                document.body.style.backgroundImage = 'none'; // remove loading

                console.log(globe);
                var i, tweens = [];

                var settime = function(globe, t) {
                    return function() {
                        new TWEEN.Tween(globe).to({time: t/years.length},500).easing(TWEEN.Easing.Cubic.EaseOut).start();
                        var y = document.getElementById('timeline'+years[t]);
                        if (y.getAttribute('class') === 'year active') {
                            return;
                        }
                        var yy = document.getElementsByClassName('year');
                        for(i=0; i<yy.length; i++) {
                            yy[i].setAttribute('class','year');
                        }
                        y.setAttribute('class', 'year active');
                    };
                };

                for(var i = 0; i<years.length; i++) {
                    var y = document.getElementById('timeline'+years[i]);
                    y.addEventListener('mouseover', settime(globe,i), false);
                }

                settime(globe,0)();
                globe.animate();
            }
        }
    };


    xhr.send(null);
}


