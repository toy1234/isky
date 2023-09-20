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
            var target = pointEvent.children("header")

            // header
            if (!layerOpen) {
                if (scrollY >= 16) {
                    target.addClass("active")
                } else {
                    target.removeClass("active")
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





    function numberWithCommas(num) {
        var parts = num.toString().split(".")
        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "")
    }

    function chkNumber(obj) {
        var tmpValue = obj.value.replace(/[^0-9,]/g, '')
        tmpValue = tmpValue.replace(/[,]/g, '');
        obj.value = numberWithCommas(tmpValue)
    }

    function chkValue(obj) {
        var el = obj.closest('.input_box')
        if (obj.value == "") {
            el.classList.remove('is_focus')
        } else {
            el.classList.add('is_focus')
        }
    }

    function inpComma(obj) {
        if (obj.classList.contains('comma')) {
            chkNumber(obj)
        }
    }

    function chkUnit(obj) {
        var inpUnit = obj.dataset.unit
        var el = obj.parentNode
        if (inpUnit !== undefined) {
            el.insertAdjacentHTML('beforeend', '<i class="unit">' + inpUnit + '</i>')
        }
    }

    // form input
    function inputVal() {
        var inpTxt = document.querySelectorAll('.inp')
        var inpReset = document.querySelectorAll('.del')


        for (var i = 0; i < inpTxt.length; i++) {
            chkValue(inpTxt[i])
            chkUnit(inpTxt[i])
            inpComma(inpTxt[i])

            inpTxt[i].addEventListener('keyup', function (e) {
                e.preventDefault()
                chkValue(this)
                inpComma(this)
            })

            inpTxt[i].addEventListener('blur', function (e) {
                e.preventDefault()
                chkValue(this)
            })

            inpReset[i].addEventListener("click", function (e) {
                e.preventDefault()
                chkValue(this)
                e.target.previousElementSibling.value = ''
                e.target.previousElementSibling.focus()
            })
        }
    }



});
