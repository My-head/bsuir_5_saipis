$(document).ready(function () {

    $('#overlay').fadeIn(400,
        function () { 
            $('#modal_form')
                .css('display', 'block') 
                .animate({ opacity: 1, top: '50%' }, 200); 
            $.ajax({
                type: "GET",

                url: "../resourse/text.html",

                dataType: "text",
                success: function (data) {
                    $('.text').html(data);
                },
                error: function () {
                    window.open('../404.html' );
                }
            });
            $('.text').after('Это было описание студента Владислава');
        });
 

    $('#modal_close, #overlay').click(function () { 
        $('#modal_form')
            .animate({ opacity: 0, top: '45%' }, 200,  
                function () {
                    $(this).css('display', 'none'); 
                    $('#overlay').fadeOut(400); 
                }
            );
    });
});
