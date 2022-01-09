$(document).ready(function(){

    $('#button1').click(function () {
       /* $('.class4, .class5, .class6').toggleClass('this classNEW');*/
$('p[id]').removeAttr('id');

       $('.frame').css({'font-size': '19pt' });
        $('.frame').css({'border': '1px solid red', });

    });


    $("img[id='imgid']").dblclick(function (){
        $("img[id='imgid']").animate({opacity: '0%'}, 1000);
    });

/*
    $('#button1').click(function () {
        $('id2').attr("id2", "id2NEW");  
        
        

    });*/
/*
    $('#button1').click(function () {
        $('.class2 p').attr('id2', 'id2NEW');
    });
*/
/*
    $('#button2').click(function () {
        $('#id2, #id4, #id6').hide(1000);
    });*/


    btn = document.querySelector('.btn');

    $('#button3').click(function () {
        $('.class1>img, .class2>img, .class3>img, .class4>img, .class6>img, .class5>img').slideUp('slow');
        btn.setAttribute('disabled', true);
    });
    
});

