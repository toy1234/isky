document.addEventListener('DOMContentLoaded', () => {


    let pageY = document.documentElement.scrollTop
    const body = document.querySelector('body')
    const pointEvent = document.querySelector('.muffin_point_wrap_mobile')


    //body scroll
    const bodyScroll = () => {
        document.addEventListener("scroll", () => {
            const scrollY = document.documentElement.scrollTop
            const opts = body.classList.contains('scroll_blocked')
            const target = pointEvent.firstElementChild
            // header fixed
            if (!opts) {
                if (scrollY >= 16) {
                    target.classList.add("active")
                } else {
                    target.classList.remove("active")
                }
            }
        })
    }
    bodyScroll()


    //layerPopup
    const layerActive = obj => {
        const el = obj.firstElementChild
        const opts = el.classList.contains('alert')
        // show/hide
        const type = (obj.style.display == '') ? 'block' : ''
        obj.style.display = type
        // slideUp
        if (!opts) {
            el.classList.toggle('fade')
        }
        // body scroll 차단
        body.classList.toggle('scroll_blocked')
        const posY = (body.style.top == '') ? - pageY + 'px' : ''
        body.style.top = posY
        window.scrollTo({ 'top': pageY })
    }


    const layerPopup = () => {
        const btn_layer = document.querySelectorAll('.l_open, .l_close, .overlay')
        btn_layer.forEach((obj) => {
            obj.addEventListener("click", (e) => {
                e.preventDefault
                const inst = obj.classList.contains('l_open')
                const opts = obj.dataset.id

                if (inst) {
                    target = document.querySelector(opts)
                    pageY = document.documentElement.scrollTop
                } else {
                    target = obj.closest('.muffin_point_layer_popup')
                }
                layerActive(target)
            })
        })
    }
    layerPopup()


    //Comma 
    const numberWithCommas = num => {
        const parts = num.toString().split(".")
        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "")
    }

    //number
    const chkNumber = obj => {
        let tmp_value = obj.value.replace(/[^0-9,]/g, '')
        tmp_value = tmp_value.replace(/[,]/g, '');
        obj.value = numberWithCommas(tmp_value)
    }

    const chkComma = obj => {
        if (obj.classList.contains('comma')) {
            chkNumber(obj)
        }
    }

    const chkUnit = obj => {
        const unit = obj.dataset.unit
        const el = obj.parentNode
        if (unit !== undefined) {
            el.insertAdjacentHTML('beforeend', '<i class="unit">' + unit + '</i>')
        }
    }

    // reset Button show/hide
    const chkValue = obj => {
        const el = obj.closest('.input_box')
        if (obj.value == "") {
            el.classList.remove('is_focus')
        } else {
            el.classList.add('is_focus')
        }
    }

    // form input
    const inputVal = () => {
        const inp = document.querySelectorAll('.inp')

        inp.forEach((obj) => {
            const reset = obj.nextElementSibling
            chkValue(obj)
            chkUnit(obj)
            chkComma(obj)

            obj.addEventListener('keyup', (e) => {
                e.preventDefault
                chkValue(obj)
                chkComma(obj)
            })

            obj.addEventListener('blur', (e) => {
                e.preventDefault
                chkValue(obj)
            })

            reset.addEventListener("click", (e) => {
                e.preventDefault
                obj.value = ''
                obj.focus()
                chkValue(obj)
            })
        })
    }
    inputVal()

})