$(document).ready(function () {

    $('#display-information').click(function () {
        var url = '../js/modal.js';
        $.getScript(url);
    });

    $('#read-xml').click(function () {
        ajaxGetXML();
    });

    $('#add-new-field').click(function () {
        count();
    });


    $('.radio').on('change', function () {
        if ($('#radio-font-size1').is(':checked')) {
            $('#input-count').css({
                fontSize: '14px',
            })
        } else {
            $('#input-count').css({
                fontSize: '32px',
            })
        }
    })
});

function ajaxGetXML() {
    $.ajax({
        type: "GET",
        url: "../resourse/xml.xml",
        dataType: "xml",
        success: function (data) {
            if ($('#radio-font-size1').is(':checked')) {

                $('#input-count').css({
                    fontSize: '14px',
                })
            }else {
                $('#input-count').css({
                    fontSize: '32px',
                })
            }
            $('#firstimp').val($(data).find('birth').html());
            $('#secondimp').val($(data).find('nam').html());
            $('#thirdimp').val($(data).find('surn').html());

        },
        error: function () {
            window.open('../404.html' );
        }
    });
}

function count() {
    var birth = $('#firstimp').val();
 

    if($.isNumeric(birth)) {
        if (!$("input").is("#input-count")) {
            $('<input/>').attr({type: 'text', id: 'input-count'}).appendTo('#form');
            $('#input-count').css({
                marginBottom: '30px',
                width: '40%',
                border: '4px solid black',
                borderRadius: '5px',
            });
        }
        $('#input-count').val(2021-birth + "лет, вуз - БГУИР");

        if (birth==1){
        
            window.open('../404.html' );
        }
        
    }
}

