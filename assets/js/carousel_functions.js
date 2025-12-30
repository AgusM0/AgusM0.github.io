var carousel = document.querySelector('.carousel');
var cells = carousel.querySelectorAll('.carousel__cell');

// 1. CONFIGURACIÓN FIJA (Ya no depende del HTML)
var cellCount = cells.length; // Usa automáticamente la cantidad de divs que tengas
var selectedIndex = 0;
var cellWidth = carousel.offsetWidth;
var cellHeight = carousel.offsetHeight;
var isHorizontal = true; // Cambiar a false si lo quieres vertical
var rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
var radius, theta;

function rotateCarousel() {
  var angle = theta * selectedIndex * -1;
  // Usamos -radius dinámico para que siempre se vea a la distancia justa
  carousel.style.transform = 'translateZ(' + -radius + 'px) ' + 
    rotateFn + '(' + angle + 'deg)';
}

function changeCarousel() {
  theta = 360 / cellCount;
  var cellSize = isHorizontal ? cellWidth : cellHeight;
  
  // Cálculo matemático del radio para que no se rompa visualmente
  radius = Math.round( ( cellSize / 2) / Math.tan( Math.PI / cellCount ) );
  
  for ( var i=0; i < cells.length; i++ ) {
    var cell = cells[i];
    if ( i < cellCount ) {
      cell.style.opacity = 1;
      var cellAngle = theta * i;
      cell.style.transform = rotateFn + '(' + cellAngle + 'deg) translateZ(' + radius + 'px)';
    } else {
      cell.style.opacity = 0;
      cell.style.transform = 'none';
    }
  }
  rotateCarousel();
}

// 2. AUTO-PLAY (Para que tenga movimiento sin botones)
function startAutoplay() {
  setInterval(function() {
    selectedIndex++;
    rotateCarousel();
  }, 3000); // Cambia 3000 por los milisegundos que prefieras (3 segundos)
}

// 3. INICIALIZACIÓN
changeCarousel();
startAutoplay();