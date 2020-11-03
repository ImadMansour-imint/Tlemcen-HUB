





var swiper = new Swiper('.swiper-container', {
effect: 'coverflow',
grabCursor: true,
centeredSlides: true,
slidesPerView: 'auto',
coverflowEffect: {
rotate: 0,
stretch: 900,
depth: 600,
modifier: 1,
slideShadows : false,
},
pagination: {
el: '.swiper-pagination',
},
});

$('#btnn').hide();

$(document).ready(function(){
$('#see').click(function(){
 $('#btnn').show();
 $('#see').hide();

});
});
