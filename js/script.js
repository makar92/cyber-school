
//---- burger -------

document.querySelector('.burger-menu__list').innerHTML = document.querySelector('.menu__list').innerHTML;

document.querySelector('#burgerBtn').addEventListener('click', function() {
  document.querySelector('#burgerMenu').classList.add('open');
})
document.querySelector('.burger-menu__close').addEventListener('click', function() {
  document.querySelector('#burgerMenu').classList.remove('open');
})
//--- modal --------------------

new HystModal({
  linkAttributeName: 'data-hystmodal',
  catchFocus: true,
  waitTransitions: true,
  closeOnButton: true,
});

//-------- data ---------------------

import baseTreners from './treners.json' assert {type: 'json'};

new AddTrener("FranciscaGarcia");
new AddTrener("LindseyCastonguay");
new AddTrener("RichardMcCraw");
new AddTrener("RaymondBarton");
new AddTrener("NatashaPoirier");



let btns = document.getElementsByClassName('item-slide__specific');

function AddTrener(trener) {
  
  let treners = document.querySelector('.trainers__items');
  
  let photo = baseTreners[trener].photo;
  let name = baseTreners[trener].firstName + " " + baseTreners[trener].lastName;
  let position = baseTreners[trener].position;

  treners.innerHTML += `
	<div class="trainers__slide swiper-slide">
			<div class="trainers__item item-slide" id="${trener}">
				<div class="item-slide__image"><img src="img/treners/${photo}" alt=""></div>
				<div class="item-slide__name">${name}</div>
				<div class="item-slide__appointment">${position}</div>
				<a href="#" class="item-slide__specific" data-hystmodal="#myModal">Detailed</a>
			</div>
		</div>
  `;
} 

//console.log(baseTreners.franciscaGarcia.firstName);

function infoModal(trener) {
  let name = document.getElementsByClassName('trainers-modal__name')[0];
  let photo = document.getElementsByClassName('trainers-modal__image')[0];
  let position = document.getElementsByClassName('trainers-modal__position')[0];
  let education = document.getElementById('education');
  let experience = document.getElementById('experience');
  let awards = document.getElementById('awards');

  name.innerHTML = 
  baseTreners[trener].firstName + " " + baseTreners[trener].lastName;
  photo.innerHTML = `<img src="img/treners/${baseTreners[trener].photo}" alt="">`;
  position.innerHTML = baseTreners[trener].position;

  education.innerHTML = 
  baseTreners[trener].education.maneEducation[0].dateStart + " — " + 
  baseTreners[trener].education.maneEducation[0].dateEnd + "<br>" +
  baseTreners[trener].education.maneEducation[0].title + "<br>" +
  "Faculty: " + baseTreners[trener].education.maneEducation[0].faculty + "<br>" +
  "Profession: " + baseTreners[trener].education.maneEducation[0].specialty + "<br>" +
  "Form of education: " + baseTreners[trener].education.maneEducation[0].form + "<br><br>"

  if ('additionalEducation' in baseTreners[trener].education) {
    education.innerHTML += 
    "<div class=\"trainers-modal__addEd\">Courses and trainings:</div><br>" +
    baseTreners[trener].education.additionalEducation[0].dateStart + " — " + 
    baseTreners[trener].education.additionalEducation[0].dateEnd + "<br>" +
    baseTreners[trener].education.additionalEducation[0].title + "<br>" +
    baseTreners[trener].education.additionalEducation[0].place + "<br>"
  }

  if ('experience' in baseTreners[trener]) {
    experience.innerHTML = 
    baseTreners[trener].experience[0].dateStart + " — " + 
    baseTreners[trener].experience[0].dateEnd + "<br>" +
    baseTreners[trener].experience[0].title + "<br>" +
    baseTreners[trener].experience[0].place + "<br>"
  }

  if ('achievements' in baseTreners[trener]) {
    awards.innerHTML = 
    baseTreners[trener].achievements[0].date + "<br>" +
    baseTreners[trener].achievements[0].title + "<br>" +
    baseTreners[trener].achievements[0].place + "<br>"
  }
}

//----------- slider trainers ---------------

new Swiper('.trainers__slider', {
  navigation: {              
    prevEl: '.swiper-button-prev', 
    nextEl: '.swiper-button-next', 
  },
  scrollbar: {
   el: '.trainers__scrollbar',
    draggable: true,     
  },
  slidesPerView: 3,
  spaceBetween: 40,
  breakpoints: {
    1024: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    0: {
      slidesPerView: 1,
      spaceBetween: 40,
    },
  },
});

function medtrainers() {
  let navPrevTrainers = document.querySelector('.trainers__button-prev');
  let navNextTrainers = document.querySelector('.trainers__button-next');
  let clidesTrainers = document.querySelectorAll('.trainers__slide');
  if ((clidesTrainers.length <= 3) && (window.matchMedia('(min-width: 1024px)').matches)) {
    navPrevTrainers.style.display = "none";
    navNextTrainers.style.display = "none";
  } else {
    navPrevTrainers.style.display = "block";
    navNextTrainers.style.display = "block";
  }
}

medtrainers();

matchMedia('(max-width: 1024px)').addListener(medtrainers);

//--------- listenner for modal ---------------------

let trener
let tabs = document.querySelectorAll('.trainers-modal__tab');
let tabContents = document.querySelectorAll('.trainers-modal__content');
let modalOption = document.querySelectorAll('.trainers-modal__option');
//let modalSelect = document.querySelector('.trainers-modal__select');

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', function() {

    modalOption[0].selected = true; 
    tabContents.forEach((child) => child.classList.remove('trainers-modal__content_active'));
    document.getElementById("education").classList.add('trainers-modal__content_active'); 

    trener = btns[i].parentElement.getAttribute('id');
    infoModal(trener);
  })
}

//----------- tabs-modal  ------------

tabs[0].classList.add('trainers-modal__tab_active'); 
tabContents[0].classList.add('trainers-modal__content_active'); 

tabs.forEach((tab) => {
  tab.addEventListener('click', function(e) {
    e.preventDefault();                                         //убираем поведение для ссылок по умолчанию
    const id = e.target.getAttribute('href').replace('#', '');  //получаем атрибут нажатой ссылки

    tabs.forEach((child) => child.classList.remove('trainers-modal__tab_active'));  
    tabContents.forEach((child) => child.classList.remove('trainers-modal__content_active'));

    tab.classList.add('trainers-modal__tab_active');  
    document.getElementById(id).classList.add('trainers-modal__content_active');  
  })
});

//------- modal options ------------------

let optionDefault = document.querySelector('.trainers-modal__option-default');
let options = document.querySelectorAll('.trainers-modal__option');

optionDefault.addEventListener('click', function() {

  options.forEach((item) => {

    if (item.style.display == "block") {
      item.style.display = "none";
    } else {
      item.style.display = "block";
    }
  })
})


for (let i = 0; i < options.length; i++) {
  options[i].addEventListener('click', function() {
    optionDefault.innerHTML = options[i].innerHTML;
    options.forEach((item) => {
      item.style.display = "none";
    }) 
  })
}

let radio = document.getElementsByName('trainers-opt');

for (let i = 0; i < radio.length; i++) {
  radio[i].addEventListener('change', function() {

    let id
    if (radio[0].checked) {
      id = "education";
    }
    if (radio[1].checked) {
      id = "experience";
    }
    if (radio[2].checked) {
      id = "awards";
    }

    tabContents.forEach((child) => child.classList.remove('trainers-modal__content_active'));
    document.getElementById(id).classList.add('trainers-modal__content_active'); 
  })
}

//------- listener close modal --------------

let closeModal = document.querySelectorAll('.trainers-modal__close');

for (let i = 0; i < closeModal.length; i++) {
  closeModal[i].addEventListener('click', function() {

    options[0].style.display = "none";
    options[1].style.display = "none";
    options[2].style.display = "none"; 
  })
}

//-------- packages swiper ---------------------

new Swiper('.packages__slider', {
  navigation: {              
    prevEl: '.swiper-button-prev', 
    nextEl: '.swiper-button-next', 
  },
  scrollbar: {
    el: '.packages__scrollbar',
     draggable: true,  
   },
  spaceBetween: 20,
  slidesPerView: 1,
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

function medPackeges() {
  let navPrevPackeges = document.querySelector('.packages__button-prev');
  let navNextPackeges = document.querySelector('.packages__button-next');
  let clidesPackeges = document.querySelectorAll('.packages__slide');
  if ((clidesPackeges.length <= 3) && (window.matchMedia('(min-width: 1024px)').matches)) {
    navPrevPackeges.style.display = "none";
    navNextPackeges.style.display = "none";
  } else {
    navPrevPackeges.style.display = "block";
    navNextPackeges.style.display = "block";
  }

}

medPackeges();
matchMedia('(max-width: 1024px)').addListener(medPackeges);

