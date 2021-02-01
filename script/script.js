
$(function () {
    function buildOutput(result, input) {
        var resultBlock = '<div class="result-container"><span id="input-url">' + input + '</span><div class="result-output"><span id="output-url">' + result + '</span><button type="button" id="copy-btn">Copy</button></div></div>';
        $('.service-container').prepend(resultBlock);
    };

    $('#btn-hamburger').on('click', function () {
        $(this).toggleClass('open');
        $('.header-mobile').toggleClass('open');
    });

    $('.service-container').on('click','#copy-btn', function () {
        $(this).html('Copied');
        var content = $(this).siblings('span').get(0);
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(content);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
    });



    $('#shorten-submit').on('click', function () {
            if ($('.shorten-input-area').hasClass('input-error')) {
                $('.shorten-input-area').removeClass('input-error');
            }
            var url = 'https://api.shrtco.de/v2/shorten?url=' + $(this).siblings('input').val();
            $.ajax({
                type: "POST",
                url: url,
                dataType: "json",
            }).done(function (data) {
                var resultLink = data.result.full_short_link;
                var inputURL = data.result.original_link;
                buildOutput(resultLink, inputURL);
            }).fail(function (data) {
                var errorCode = data.responseJSON.error_code;

                if (errorCode == '2') {
                    $('.shorten-input-area').addClass('input-error');
                }
            })
        
    })
});