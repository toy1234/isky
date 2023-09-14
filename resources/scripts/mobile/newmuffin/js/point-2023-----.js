$(document).ready(function () {

    bodyScroll()
    inputVal()
    layerOpen()
    layerClose()


    var body = document.querySelector('body')
    var pointEvent = document.querySelector('.muffin_point_wrap_mobile')
    var pageY = document.documentElement.scrollTop


    //body scroll
    function bodyScroll() {
        document.addEventListener("scroll", function () {
            var scrollY = document.documentElement.scrollTop
            var layerOpen = body.classList.contains('scroll_blocked')
            var target = pointEvent.firstElementChild

            // header fixed
            if (!layerOpen) {
                if (scrollY >= 16) {
                    target.classList.add("active")
                } else {
                    target.classList.remove("active")
                }
            }
        })
    }


    //layerPopup
    function layerActive(obj) {
        var el = obj.firstElementChild
        var altPop = el.classList.contains('alert')

        // show/hide
        var type = (obj.style.display == '') ? 'block' : ''
        obj.style.display = type

        // slideUp
        if (!altPop) {
            el.classList.toggle('fade')
        }
        // body scroll 차단
        body.classList.toggle('scroll_blocked')

        var posY = (body.style.top == '') ? - pageY + 'px' : ''
        body.style.top = posY

        window.scrollTo({ 'top': pageY })
    }


    function layerOpen() {
        var btnOpen = document.querySelectorAll('.l_open')
        for (var i = 0; i < btnOpen.length; i++) {
            btnOpen[i].addEventListener("click", function (e) {
                e.preventDefault()
                var item = this.dataset.id
                var target = document.querySelector(item)
                pageY = document.documentElement.scrollTop
                layerActive(target)
                // console.log(pageY)
            })
        }
    }


    function layerClose() {
        var btnClose = document.querySelectorAll('.l_close, .overlay')
        for (var i = 0; i < btnClose.length; i++) {
            btnClose[i].addEventListener("click", function (e) {
                e.preventDefault()
                var target = this.closest('.muffin_point_layer_popup')
                layerActive(target)
                // console.log(pageY)
            })
        }
    }




    //Comma 
    function numberWithCommas(num) {
        var parts = num.toString().split(".")
        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "")
    }

    //number
    function chkNumber(obj) {
        var tmpValue = obj.value.replace(/[^0-9,]/g, '')
        tmpValue = tmpValue.replace(/[,]/g, '');
        obj.value = numberWithCommas(tmpValue)
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

    // reset Button show/hide
    function chkValue(obj) {
        var el = obj.closest('.input_box')
        if (obj.value == "") {
            el.classList.remove('is_focus')
        } else {
            el.classList.add('is_focus')
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
