const socket = io();
const mivideo = document.getElementById("miVideo");

socket.on('envio:video', (data) => {
  link = "https://www.youtube.com/embed/"+data

  mivideo.style.display = 'block';
  mivideo.setAttribute("src", link);

});
