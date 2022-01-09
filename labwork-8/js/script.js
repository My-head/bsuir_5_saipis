$('.modal_close').click((event) => {
    $('.modal_wrapper').fadeOut(150);
})

var gooo = "lwwww";

$('#receiveButton').click((event) => {
    console.log('into');
    $.get('/resource/dataPlain.txt', (data) => {
        console.log(data);
        $('.modal_text-data').html(data.replace(/\s+/g, '<br>'));
        alert(gooo)
    });
    
    $.get({
        url : '/resource/dataXML.xml',
        dataType : 'text',
        success : (data) => {
            console.log(data);
            $('.modal_xml-data').text(data);
        },
    })
    $('.modal_wrapper').fadeIn(150);
})