// Header - переключение по клику и по скроллу
const links = document.querySelectorAll(".header .nav__link");

links.forEach(link => {
    link.addEventListener("click", toggleActive);
})

function toggleActive() {
    links.forEach(link => {
        link.classList.remove("active");
    })
    this.classList.add("active");
}

document.addEventListener("scroll", changeActiveLinkOnScroll);

const allSections = document.querySelectorAll(".section");

function changeActiveLinkOnScroll() {
    allSections.forEach(section => {
        const thisTopCoordinates = section.getBoundingClientRect().top;
        

        if (thisTopCoordinates > 0 && thisTopCoordinates <= 200) {

            console.dir(section.id)

            const linkToChange = document.querySelector(".header .nav__link[href='#" + section.id + "']")

            links.forEach(link => {
                link.classList.remove("active");
            })
            linkToChange.classList.add("active");
        }
        else if(pageYOffset <=200){
            const linkToChange = document.querySelector(".header .nav__link[href='#home']")

            links.forEach(link => {
                link.classList.remove("active");
            })
            linkToChange.classList.add("active");
        }
    });
}

changeActiveLinkOnScroll();

//Slider. Переключение слайдов (первый вариант был без карусели, его не удаляла, а закомментировала)
const btnLeft = document.querySelector(".slider__arrow--left");
const btnRight = document.querySelector(".slider__arrow--right");
const sliderInnerWrapper = document.querySelector(".slider__inner-wrapper");
const slider = document.querySelector(".slider")

const sliderItems = document.querySelectorAll(".slide");
const sliderLength = sliderItems.length;
let sliderCounter = 0;

btnLeft.addEventListener("click", moveToTheRight);
btnRight.addEventListener("click", moveToTheLeft);

function changeSliderBcg() {
    slider.style.transition = "all 2s"
    if (slider.classList.contains("slide--1")) {
        slider.classList.remove("slide--1");
        slider.classList.add("slide--2");
    }
    else if (slider.classList.contains("slide--2")) {
        slider.classList.remove("slide--2");
        slider.classList.add("slide--1");
    }

}

function moveToTheLeft() {
    const allItems = document.querySelectorAll(".slide");
    const itemToMove = allItems[0];
    const itemToMoveWidth = itemToMove.clientWidth;

    sliderInnerWrapper.style.transition = "all 2s"
    sliderInnerWrapper.style.transform = "translateX(" + -(itemToMoveWidth) + "px)";

    setTimeout(function () {
        sliderInnerWrapper.style.transition = "none"
        sliderInnerWrapper.style.transform = "translateX(0)";
        sliderInnerWrapper.append(itemToMove);

    }, 2000)
    changeSliderBcg();

    // if (sliderCounter < sliderLength - 2) {
    //     sliderCounter++;
    //     sliderInnerWrapper.style.transform = "translateX(" + (sliderCounter * (-312)) + "px)";
    // }
}

function moveToTheRight() {
    const allItems = document.querySelectorAll(".slide");
    const itemToMove = allItems[allItems.length - 1];
    const itemToMoveWidth = itemToMove.clientWidth;

    sliderInnerWrapper.style.transition = "none"
    sliderInnerWrapper.style.transform = "translateX(" + -(itemToMoveWidth) + "px)";
    sliderInnerWrapper.prepend(itemToMove);

    setTimeout(function () {
        sliderInnerWrapper.style.transition = "all 2s"
        sliderInnerWrapper.style.transform = "translateX(0px)";
    }, 0)
    changeSliderBcg()

    // if (sliderCounter > 0) {
    //     sliderCounter--;
    //     sliderInnerWrapper.style.transform = "translateX(" + (sliderCounter * (-312)) + "px)";
    // }
}

//Slider. Активация экранов телефонов
const phones = document.querySelectorAll(".slider__content-wrapper");

phones.forEach(phone => {
    phone.addEventListener("click", toggleActiveScreen);
})

function toggleActiveScreen() {
    if (this.classList.contains("active")) {
        this.classList.remove("active");
    }
    else {
        this.classList.add("active");
    }
}

// =>
const portfolioCards = document.querySelectorAll(".portfolio__portfolio-card");
const portfolio = document.querySelector(".portfolio__cards");
// =>

//Portfolio. Переключение табов
const portfolioNavItems = document.querySelectorAll(".portfolio__navigation .nav__item");

portfolioNavItems.forEach(item => {
    item.addEventListener("click", toggleActivePortfolioNav);
    item.addEventListener("click", togglePortfolioCardsPosition);
})

function toggleActivePortfolioNav() {
    portfolioNavItems.forEach(item => {
        item.classList.remove("active");
    })
    this.classList.add("active");
}

function togglePortfolioCardsPosition() {
    // let option = this.id;
    // let modsArr = ["all", "web-design", "graphi-design", "artwork"]
    // switch (option) {
    //     case "all":
    //         clearAllModificators(portfolio, modsArr);
    //         break;
    //     case "web-design":
    //     case "graphi-design":
    //     case "artwork":
    //         clearAllModificators(portfolio, modsArr);
    //         portfolio.classList.add(option);
    // }
    const portfolioPicturesWrapper = document.querySelector(".portfolio__cards");
    const portfolioPictures = document.querySelectorAll(".portfolio__portfolio-card");

    portfolioPicturesWrapper.append(portfolioPictures[0]);

}

function clearAllModificators(block, modsArr) {
    for (let i = 0; i < modsArr.length; i++) {
        block.classList.remove(modsArr[i]);
    }
}

//Portfolio. Взаимодействие с картинками
portfolioCards.forEach(card => {
    card.addEventListener("click", toggleActiveCard);
})

function toggleActiveCard() {
    if (this.classList.contains("active")) {
        this.classList.remove("active");
    }
    else {
        portfolioCards.forEach(card => {
            card.classList.remove("active");
        })
        this.classList.add("active");
    }
}

//Get a quote
const formButton = document.querySelector(".form__button");
const modalWindowButton = document.querySelector(".modal-window__close");
const modalWindow = document.querySelector(".modal-window");

formButton.addEventListener("click", openMessage);
modalWindowButton.addEventListener("click", closeMessage);

function openMessage(event) {
    const name = document.querySelector("#form__name");
    const email = document.querySelector("#form__email");
    const subject = document.querySelector("#form__subject");
    const message = document.querySelector("#form__message");

    console.dir([name, email, subject, message])

    if (name.value === "" || email.value === "" || !email.value.split("").includes("@")) {
        event.defaultPrevented();
    }

    const modalSubject = document.querySelector(".modal-window__subject");
    const modalMessage = document.querySelector(".modal-window__message");

    if (subject.value === "") {
        modalSubject.innerHTML = "Without subject";
    }
    else {
        modalSubject.innerHTML = "Subject: " + subject.value;
    }
    if (message.value === "") {
        modalMessage.innerHTML = "Without description";
    }
    else {
        modalMessage.innerHTML = "Description: " + message.value;
    }
    modalWindow.classList.add("active");
    clearValues([name, email, subject, message])
    event.preventDefault()

}

function clearValues(arr) {
    arr.forEach(item => {
        item.value = "";
    })
}

function closeMessage() {
    modalWindow.classList.remove("active");
}