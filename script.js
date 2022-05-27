const blocks = document.querySelectorAll('.block')
const block = Array.from(blocks)

const languages = document.querySelectorAll('[data-lang]')
const langSelector = document.querySelector('select')
const languagesArr = Array.from(languages)

const form = document.querySelector('form')
const inputName = document.querySelector('#name')
const email = document.querySelector('#email')
const message = document.querySelector('#msg')
const submitBtn = document.querySelector('#btn-submit')


/* Email endpoint */
form.addEventListener("submit", formSubmit);

function formSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
        'name',
        document.querySelector('input[name="name"]').value
    )
    formData.append(
        'email',
        document.querySelector('input[name="email"]').value
    )

    formData.append(
        'message',
        document.querySelector('textarea[name="message"]').value
    )

    fetch("https://getform.io/f/ff652147-69e5-40df-8652-ef06f80aa65d", {
        method: "POST",
        body: formData,
    })
        .then(response => console.log(response))
        .catch(error => console.log(error))
}

/* Submit message */
form.addEventListener('submit', (e) => {
    e.preventDefault()
    form.reset()

    const thankYouEng = document.createElement('div')
    const thankYouRu = document.createElement('div')
    thankYouEng.classList.add('thank-you')
    thankYouRu.classList.add('thank-you')
    thankYouEng.setAttribute('data-lang', 'eng')
    thankYouRu.setAttribute('data-lang', 'ru')
    thankYouEng.innerHTML = 'Thank you for your message'
    thankYouRu.innerHTML = 'Спасибо за сообщение'

    if (langSelector.value == 'eng') {
        form.parentElement.appendChild(thankYouEng)
    } else {
        form.parentElement.appendChild(thankYouRu)
    }
    setTimeout(() => {
        if (langSelector.value == 'eng') {
            form.parentElement.removeChild(thankYouEng)
        } else {
            form.parentElement.removeChild(thankYouRu)
        }
    }, 2000)
})

/* Initial language */
languagesArr.map(elem => {
    if (elem.getAttribute('data-lang') == 'eng') {
        elem.style.display = 'flex'

        inputName.parentElement.children[0].textContent = 'Name'
        inputName.setAttribute('placeholder', 'Enter your name here...')

        email.parentElement.children[0].textContent = 'Email'
        email.setAttribute('placeholder', 'Enter your email here...')

        message.parentElement.children[0].textContent = 'Message'
        message.setAttribute('placeholder', 'Enter your message here...')

        submitBtn.textContent = 'Send'

    } else {
        elem.style.display = 'none'
    }
})

/* Change language logic */
langSelector.addEventListener('change', () => {
    const selectedLang = langSelector.value

    if (langSelector.value == 'eng') {
        inputName.parentElement.children[0].textContent = 'Name'
        inputName.setAttribute('placeholder', 'Enter your name here...')

        email.parentElement.children[0].textContent = 'Email'
        email.setAttribute('placeholder', 'Enter your email here...')

        message.parentElement.children[0].textContent = 'Message'
        message.setAttribute('placeholder', 'Enter your message here...')

        submitBtn.textContent = 'Send'
    }

    if (langSelector.value == 'ru') {
        inputName.parentElement.children[0].textContent = 'Имя'
        inputName.setAttribute('placeholder', 'Введите своё имя...')

        email.parentElement.children[0].textContent = 'Почта'
        email.setAttribute('placeholder', 'Введите свою электронную почту...')

        message.parentElement.children[0].textContent = 'Сообщение'
        message.setAttribute('placeholder', 'Оставте своё сообщение здесь...')

        submitBtn.textContent = 'Отправить'
    }

    languagesArr.map(elem => {
        if (elem.getAttribute('data-lang') == selectedLang) {
            elem.style.display = 'flex'
        } else {
            elem.style.display = 'none'
        }
    })
})

/* Scaling logic for content-wide while entering @media */
window.addEventListener('resize', () => {
    block.map(elem => {
        if (elem.children[1].classList.contains('active')) {
            if (innerWidth <= 815) {
                elem.setAttribute("style", "height: 100vh !important; z-index: 9; transition: height .5s ease;")
            } else {
                elem.setAttribute("style", "width: 100vw; z-index: 9; transition: width .5s ease;")
            }
        }
    })
})

/* Scaling logic for widening */
function widen(bl, event) {
    event.stopPropagation()

    bl.setAttribute("style", "width: 100vw; z-index: 9; transition: width .5s ease;")
    if (innerWidth <= 815) {
        bl.setAttribute("style", "height: 100vh !important; z-index: 9; transition: height .5s ease;")
    }
    bl.children[0].classList.remove('active')
    bl.children[1].classList.add('active')

    const val = bl.classList[0]
    block.map(el => {
        if (!el.classList.contains(`${val}`)) {
            el.setAttribute('style', 'z-index: -1;')
        }
    })

}

/* Scaling logic for shrinkening */
function shrinken(bl, event) {
    event.stopPropagation()

    bl.parentNode.parentNode.removeAttribute('style')
    bl.parentNode.classList.remove('active')
    bl.parentNode.parentNode.children[0].classList.add('active')
}

/* Change blocks */
function changeBl(n, event) {
    event.stopPropagation()

    const val = n.getAttribute("data-block")

    block.map(elem => {
        if (elem.classList.contains(`${val}`)) {
            elem.setAttribute("style", "width: 100vw; z-index: 9; transition: width .5s ease;")
            if (innerWidth <= 815) {
                elem.setAttribute("style", "height: 100vh !important; z-index: 9; transition: height .5s ease;")
            }
            elem.children[1].classList.add('active')
            elem.children[0].classList.remove('active')
        } else {
            elem.setAttribute('style', 'z-index: -1;')
            elem.children[1].classList.remove('active')
            elem.children[0].classList.add('active')
        }
    })
}




