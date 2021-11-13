const socket = io();
const title = document.getElementById("titulo");
const mivideo = document.getElementById("miVideo");
const playerdiv = document.getElementById("player");
var player = '';

const scene = document.getElementById('scene');
const videoFrame = document.getElementById('videoFrame');

const clave = '360';

socket.on('envio:video', (data) => {

  if (data.includes(clave)) {

    mivideo.style.display = 'none';
    scene.style.display = 'block';
    videoFrame.setAttribute('src', data);

    /*document.querySelector('a-scene').enterVR();
    document.getElementsByClassName('a-enter-vr-button').click();*/

  }
  else {
    if (typeof (data) === 'string') {

      //var newVideo = document.createElement("video");
      //newVideo.setAttribute("id", "miVideo");
      scene.style.display = 'none';
      mivideo.style.display = 'block';
      mivideo.setAttribute("src", data);
      //newVideo.setAttribute("autoplay", "");
      //newVideo.setAttribute("width", "320");
      //newVideo.setAttribute("height", "240");

      //title.after(newVideo);

    } 
    else {
      for (let i = 0; i < data.length; i++) {

        //var newVideo = document.createElement("video");
        //newVideo.setAttribute("id", "miVideo");
        scene.style.display = 'none';
        mivideo.style.display = 'block';
        mivideo.setAttribute("src", data[i]);
        //newVideo.setAttribute("autoplay", "");
        //newVideo.setAttribute("width", "320");
        //newVideo.setAttribute("height", "240");

        //title.after(newVideo);

      }
    }
  }

  function timeVideo() {

    if (!mivideo.getAttribute("src")) {
      var r = confirm("Se recomienda recargar, presione aceptar para continuar...")
      if (r == true) {
        location.reload();
      }
    }
  }

  var cantVideos = document.querySelectorAll('video');
  var cant = 0;

  $(document).ready(function () {

    $('video').on('ended', function () {
      cant += 1;
      if (cant === cantVideos.length) {
        //mivideo.style.display = 'none';
        mivideo.setAttribute("src", "");
        //document.exitFullscreen();
        //quitar el id
        //salir de pantalla completa
        //setTimeout(timeVideo, 80000);
      }
    });
  });


});
function idleTimer() {
  var t;
  //window.onload = resetTimer;
  /*window.onmousemove = resetTimer; // catches mouse movements
  window.onmousedown = resetTimer; // catches mouse movements
  window.onclick = resetTimer;     // catches mouse clicks
  window.onscroll = resetTimer;    // catches scrolling
  window.onkeypress = resetTimer;  //catches keyboard actions*/
  window.onunload = resetTimer;

  function logout() {
    window.location.href = '/logout';  //Adapt to actual logout script
  }

  /*function reload() {
         window.location = self.location.href;  //Reloads the current page
  }*/

  function resetTimer() {
    clearTimeout(t);
    t = setTimeout(logout, 20000);  // time is in milliseconds (1000 is 1 second)
    //     t= setTimeout(reload, 300000);  // time is in milliseconds (1000 is 1 second)
  }
}
idleTimer();

var atrVideo = mivideo.getAttribute("src");

document.getElementById("Entrar").addEventListener("click", function (e) {
  
  mivideo.style.display = 'block';
  getFullscreen(document.getElementById("miVideo"));

  /*if (atrVideo == null) {
    getFullscreen(document.querySelector("canvas"));
  }
  else {
    mivideo.style.display = 'block';
    getFullscreen(document.getElementById("miVideo"));
  }*/

}, false);


function getFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}
