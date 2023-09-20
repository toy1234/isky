$(document).ready(function () {

    bodyScroll()
    inputVal()
    layerPopup()

    var body = document.querySelector('body')
    var pointEvent = document.querySelector('.muffin_point_wrap_mobile')
    var pageY = document.documentElement.scrollTop


    //body scroll
    function bodyScroll() {
        document.addEventListener("scroll", function () {
            var scrollY = document.documentElement.scrollTop
            var inst = body.classList.contains('scroll_blocked')
            var target = pointEvent.firstElementChild
            // header fixed
            if (!inst) {
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
        var inst = el.classList.contains('alert')
        // show/hide
        var type = (obj.style.display == '') ? 'block' : ''
        obj.style.display = type
        // slideUp
        if (!inst) {
            el.classList.toggle('fade')
        }
        // body scroll 차단
        body.classList.toggle('scroll_blocked')
        var posY = (body.style.top == '') ? - pageY + 'px' : ''
        body.style.top = posY
        window.scrollTo({ 'top': pageY })
    }


    function layerPopup() {
        var btn_layer = document.querySelectorAll('.l_open, .l_close, .overlay')
        for (var i = 0; i < btn_layer.length; i++) {
            btn_layer[i].addEventListener("click", function (e) {
                var inst = this.classList.contains('l_open')
                if (inst) {
                    var item = this.dataset.id
                    var target = document.querySelector(item)
                    pageY = document.documentElement.scrollTop
                } else {
                    var target = this.closest('.muffin_point_layer_popup')
                }
                layerActive(target)
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
        var tmp_value = obj.value.replace(/[^0-9,]/g, '')
        tmp_value = tmp_value.replace(/[,]/g, '');
        obj.value = numberWithCommas(tmp_value)
    }

    function chkComma(obj) {
        if (obj.classList.contains('comma')) {
            chkNumber(obj)
        }
    }

    function chkUnit(obj) {
        var tmp_unit = obj.dataset.unit
        var el = obj.parentNode
        if (tmp_unit !== undefined) {
            el.insertAdjacentHTML('beforeend', '<i class="unit">' + tmp_unit + '</i>')
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
        var inp = document.querySelectorAll('.inp')

        for (var i = 0; i < inp.length; i++) {
            var inp_reset = inp[i].nextElementSibling
            chkValue(inp[i])
            chkUnit(inp[i])
            chkComma(inp[i])

            inp[i].addEventListener('keyup', function () {
                chkValue(this)
                chkComma(this)
            })

            inp[i].addEventListener('blur', function () {
                chkValue(this)
            })

            inp_reset.addEventListener("click", function (e) {
                e.target.previousElementSibling.value = ''
                e.target.previousElementSibling.focus()
                chkValue(this)
            })
        }
    }

})