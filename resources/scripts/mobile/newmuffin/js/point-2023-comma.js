$(document).ready(function () {

    bodyScroll()
    inputVal()
    layerPopup()

    var body = document.querySelector('body')
    var pointEvent = document.querySelector('.muffin_point_wrap_mobile')


    //body scroll
    function bodyScroll() {
        document.addEventListener("scroll", function () {
            var scrollY = document.documentElement.scrollTop
            var layerOpen = body.classList.contains('scroll_blocked')
            var fixed = pointEvent.firstElementChild


            // header fixed
            if (!layerOpen) {
                if (scrollY >= 16) {
                    fixed.classList.add("active")
                } else {
                    fixed.classList.remove("active")
                }
            }
        })
    }

    function layerOpen(obj) {
        var item = obj.dataset.id
        var target = document.querySelector(item)
        var btmSheet = target.firstElementChild
        var pageY = document.documentElement.scrollTop
        var btnClose = target.querySelectorAll('.l_close, .overlay')

        target.style.display = 'block'
        btmSheet.classList.add('fade')

        body.classList.add('scroll_blocked')
        body.style.top = - pageY + 'px'

        for (var i = 0; i < btnClose.length; i++) {
            btnClose[i].addEventListener("click", function (e) {
                e.preventDefault()
                target.style.display = 'none'
                btmSheet.classList.remove('fade')

                body.classList.remove('scroll_blocked')
            })
        }
    }




    //layerPopup
    function layerPopup() {
        var btnOpen = document.querySelectorAll('.l_open')


        for (var i = 0; i < btnOpen.length; i++) {
            btnOpen[i].addEventListener("click", function (e) {
                e.preventDefault()
                layerOpen(this)
            })
        }
    }





    function numberWithCommas(num) {
        var parts = num.toString().split(".")
        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "")
    }

    function chkNumber(obj, unit) {
        var tmpValue = obj.value.replace(/[^0-9,]/g, '')
        tmpValue = tmpValue.replace(/[,]/g, '');
        obj.value = numberWithCommas(tmpValue + unit)
    }

    // cursor 위치 unit 앞으로
    function sctRange(obj, ulen) {
        var numlength = obj.value.length
        var spos = obj.selectionStart;
        obj.setSelectionRange(spos, numlength - ulen)
    }

    function isFocus(idx, opts) {
        var el = idx.closest('.input_box')
        if (opts) {
            el.classList.add('is_focus')
            return opts
        } else {
            el.classList.remove('is_focus')
            return opts
        }
    }

    function chkValue(obj) {
        if (obj.value == "") {
            isFocus(obj, false)
        } else {
            isFocus(obj, true)
        }
    }

    function inpComma(obj) {
        var unit = ''
        var ulen = 0

        if (obj.dataset.unit !== undefined) {
            unit = ' ' + obj.dataset.unit
            ulen = unit.length
        } else {
            unit = ''
        }

        if (obj.classList.contains('comma')) {
            chkNumber(obj, unit)
            sctRange(obj, ulen)
            if (obj.value == unit) {
                isFocus(obj, false)
                obj.value = ""
            }
        }
    }

    // form input
    function inputVal() {
        var inpTxt = document.querySelectorAll('.inp')
        var inpReset = document.querySelectorAll('.del')


        for (var i = 0; i < inpTxt.length; i++) {
            chkValue(inpTxt[i])
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
                isFocus(this, false)
                e.target.previousElementSibling.value = ''
            })
        }
    }



});