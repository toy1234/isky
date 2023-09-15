$(document).ready(function () {

    bodyScroll()
    inputVal()
    layerPopup()

    let body = document.querySelector('body')
    const pointEvent = document.querySelector('.muffin_point_wrap_mobile')
    let pageY = document.documentElement.scrollTop


    //body scroll
    function bodyScroll() {
        document.addEventListener("scroll", function () {
            let scrollY = document.documentElement.scrollTop
            const state = body.classList.contains('scroll_blocked')
            const target = pointEvent.firstElementChild
            // header fixed
            if (!state) {
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
        const el = obj.firstElementChild
        const altPop = el.classList.contains('alert')
        // show/hide
        let type = (obj.style.display == '') ? 'block' : ''
        obj.style.display = type
        // slideUp
        if (!altPop) {
            el.classList.toggle('fade')
        }
        // body scroll 차단
        body.classList.toggle('scroll_blocked')
        let posY = (body.style.top == '') ? - pageY + 'px' : ''
        body.style.top = posY
        window.scrollTo({ 'top': pageY })
    }


    function layerPopup() {
        const btn_layer = document.querySelectorAll('.l_open, .l_close, .overlay')
        for (let i = 0; i < btn_layer.length; i++) {
            btn_layer[i].addEventListener("click", function (e) {
                e.preventDefault()
                const btn_open = this.classList.contains('l_open')
                if (btn_open) {
                    const item = this.dataset.id
                    let target = document.querySelector(item)
                    pageY = document.documentElement.scrollTop
                } else {
                    let target = this.closest('.muffin_point_layer_popup')
                }
                layerActive(target)
            })
        }
    }


    //Comma 
    function numberWithCommas(num) {
        const parts = num.toString().split(".")
        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "")
    }

    //number
    function chkNumber(obj) {
        let tmp_value = obj.value.replace(/[^0-9,]/g, '')
        tmp_value = tmp_value.replace(/[,]/g, '');
        obj.value = numberWithCommas(tmp_value)
    }

    function inpComma(obj) {
        if (obj.classList.contains('comma')) {
            chkNumber(obj)
        }
    }

    function chkUnit(obj) {
        let inp_unit = obj.dataset.unit
        const el = obj.parentNode
        if (inp_unit !== undefined) {
            el.insertAdjacentHTML('beforeend', '<i class="unit">' + inp_unit + '</i>')
        }
    }

    // reset Button show/hide
    function chkValue(obj) {
        const el = obj.closest('.input_box')
        if (obj.value == "") {
            el.classList.remove('is_focus')
        } else {
            el.classList.add('is_focus')
        }
    }

    // form input
    function inputVal() {
        let inp = document.querySelectorAll('.inp')




        inp.forEach(i => {
            let inp_reset = this.extElementSibling
            chkValue(i)
            chkUnit(i)
            inpComma(i)

            this.addEventListener('keyup', function (e) {
                e.preventDefault()
                chkValue(i)
                inpComma(i)
            })

            this.addEventListener('blur', function (e) {
                e.preventDefault()
                chkValue(i)
            })

            inp_reset.addEventListener("click", function (e) {
                e.preventDefault()
                chkValue(i)
                this.previousElementSibling.value = ''
                this.previousElementSibling.focus()
            })
        })





    }

})