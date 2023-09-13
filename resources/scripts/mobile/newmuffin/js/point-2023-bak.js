$(document).ready(function () {

    bodyScroll()
    inputVal()
    layerPopup()

    var pointEvent = $('.muffin_point_wrap_mobile')
    var $body = $('body')

    //body scroll
    function bodyScroll() {
        $(window).on('scroll', function () {
            var scrollY = $(window).scrollTop()
            var layerOpen = $body.hasClass('scroll_blocked')

            // header
            if (!layerOpen) {
                if (scrollY >= 16) {
                    pointEvent.children("header").addClass("active")
                } else {
                    pointEvent.children("header").removeClass("active")
                }
            }
        })
    }


    //layerPopup
    function layerPopup() {
        $(".l_open").on('click', function (e) {
            e.preventDefault()

            var target = $(this).attr("data-id")
            var btmSheet = $('.btm_sheet')

            $(target).show()
            btmSheet.addClass('fade')

            var pageY = $(window).scrollTop()
            $body.addClass('scroll_blocked').css({ 'top': - pageY })


            $(".overlay, .l_close").on('click', function (e) {
                e.preventDefault()

                $(target).hide()
                btmSheet.removeClass('fade')

                $body.removeClass('scroll_blocked').css({ 'top': '' })
                window.scrollTo({ 'top': pageY })
            })
        })
    }



    function isFocusOut(obj) {
        var inpBox = $(obj).parent('.input_box')
        inpBox.removeClass('is_focus')
    }

    function isFocus(obj) {
        var inpBox = $(obj).parent('.input_box')
        inpBox.addClass('is_focus')
    }

    // form input
    function inputVal() {
        var inpTxt = $('.input_box > .inp')
        var inpValDel = $('.input_box > .del')

        inpTxt.each(function () {
            if ($(this).val()) {
                isFocus(this)
            }
        })

        inpTxt.on('keyup ', function () {
            if ($(this).val().trim() == '') {
                isFocusOut(this)
            } else {
                isFocus(this)
            }
        })

        inpTxt.on('blur', function () {
            if ($(this).val().trim() == '') {
                isFocusOut(this)
            } else {
                isFocus(this)
            }
        })

        inpValDel.on('click', function (e) {
            e.preventDefault();
            $(this).prev('.inp').val('')
            isFocusOut(this)
        })
    }


})