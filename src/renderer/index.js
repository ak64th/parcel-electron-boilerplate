console.log('Electron:', versions.electron());

const name = 'world';

window.onload = function(){
  document.getElementById('app').innerHTML = `Hello, ${name}.`;
}