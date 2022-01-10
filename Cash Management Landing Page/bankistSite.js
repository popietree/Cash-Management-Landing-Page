'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
//section 1 nav link
const section1 = document.querySelector('#section--1');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  //prevents page from refreshing or jumping to top when modla is open
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//replace for loop wil for each
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);
//btn open model is node list, because result of quesry slector all
//use for each to add event lister to all buttons
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
  //cordinates of btn realtive to viewport
  // const s1cords = section1.getBoundingClientRect();
  // console.log(s1cords);
  // console.log('current scroll x/y', window.pageXOffset, window.pageYOffset);
  //scrolling
  //old way
  // window.scrollTo({
  //   left: s1cords.left + window.pageXOffset,
  //   top: s1cords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  //modern way in modern browsers no postition or calculation
});

//event delegation fo nav links to scroll down to section
//1. add event listener to common partent elelmet
//2. determin what element originated the event and match the class ID

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
      // block: 'start',
      // inline: 'nearest',
    });
  }
});

//no event delegation
//get node list then add evetn handler that will precent the anchor scrolling default.. in the handler get the section ID as alomst like a quesry selctort
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     //smooth scrolling instrad of anchor

//     e.preventDefault();
//     const id = this.getAttribute('href'); //this will be the str section #n
//     //select id to work with in js
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//     console.log(this, id);
//   });
// });

//Tabbed Componment

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

//add event handler to the tab by event delagation. attavhe to coommon parent

tabsContainer.addEventListener('click', function (e) {
  //matching not parent and not cild span
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  //ignore clciks in tabs container iwth Guard Clause
  //if clicked is null then null is false and !null is true
  if (!clicked) return;

  // or;
  // if (clicked) {
  // clicked.classList.add('operations__tab--active');
  // }

  //clearing the up tabs
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  //clearing the active content text area
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //added the active of pulling tab up a little
  clicked.classList.add('operations__tab--active');

  //Activate content area
  //console.log(`operations__content--${clicked.dataset.tab}`);

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    console.log(link);
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    console.log(siblings);
    //robust soltuion by dom traversing
    //selct logo, move to closet parent, then searh for image
    const logo = link.closest('.nav').querySelector('img');

    //change opacity of sibling links

    siblings.forEach(el => {
      //do not select for the current link with cursor
      if (el !== link && !el.classList.contains('nav__link--btn'))
        //will change hte opacity
        el.style.opacity = this;
      //console.log(el);
      // console.log(el.classList.contains('nav__link--btn'));
    });
  }
};

const nav = document.querySelector('.nav');
//passign argument in to handler
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

//Sticky navigation

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const stickyNavCallback = function (entries) {
  //entries is the array of threshold entries passed by argument 2
  const [entry] = entries;
  //console.log(entry);
  //if its not on/intersecting view port put stikcy
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNavCallback, {
  root: null,
  //when 0% of header viewed, then exceute sticky
  threshold: 0,
  // will exceute function with this much room on intersection
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//The Intersection Observer API
// const obsCallback = function (entries, observer) {
//   //loop entries
//   entries.forEach(entry => console.log(entry));
// };

// const obsOptions = { root: null, threshold: [0, 0.2] };

// const observer = new IntersectionObserver(obsCallback, obsOptions);

// //target element section 1 interacting viewport (root null) at threshold 10% {obsOptions}, the function will get called (scrolling up or down)
// //function call with two arguments (entries, observer)
// observer.observe(section1);

//scroll event, fire off each scroll, inefficient will excutem function many times, bad performnace
// //calcutae the Y position dynamically
// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function (e) {
//   console.log(window.scrollY);
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   //else nav.classList.remove('sticky');
// });

// Reveal sections all sections after they are hidden
//show in viewport when is in view

const allSections = document.querySelectorAll('.section');
const revealSectionCallback = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry);
  //gurard clasue, only trigger with section is intersecting
  if (!entry.isIntersecting) return;
  //only selct for the targeto get observred, will change the sectionObserver.observe(section) <- target only
  //have hidden is shifted 8 rem down
  entry.target.classList.remove('section--hidden');
  //section already remove teh hidden, so can unobserve
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSectionCallback, {
  root: null,
  //sectionrevaeal 15% visibale
  threshold: 0.15,
  // rootMargin: `160px`,
});

allSections.forEach(function (section) {
  if (!section.classList.contains('section--sign-up')) {
    //console.log(section);
    sectionObserver.observe(section);

    //section.classList.add('section--hidden');
  }
});

//Lazy Loading Images, performance
const imgTargets = document.querySelectorAll('img[data-src]');
//console.log(imgTargets);

const loadImage = function (entries, observer) {
  const [entry] = entries;
  ///console.log(entry);
  // only do something if is intersecting
  if (!entry.isIntersecting) return;

  //replace src attribute by data-src
  //image is at entry . target
  console.log(entry.target.src);
  entry.target.src = entry.target.dataset.src;

  //remove blurry filer on the images
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  imageObserver.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0,
  //make image load with out user seeing
  rootMargin: '100px',
});

imgTargets.forEach(img => imageObserver.observe(img));

//Slider Componnet
//dont pollute name space. so crate a slider function, but can also pass optiona rgument
const slider = function (options) {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const slider = document.querySelector('.slider');
  const dotContainer = document.querySelector('.dots');

  //change the transform porperty as clciked
  let curSlide = 0;
  const maxSlide = slides.length;

  //slider.style.transform = 'scale(0.2)';
  //change overflow to visible

  //slider.style.overflow = 'visible';
  //loop through slide and set styke

  //create dots, one elemnt foreach slide for index
  const createDots = function () {
    //throw away, only need index
    // before end is add as last child
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  //activate dot to different color,
  const activateDot = function (slide) {
    //deactivte the dots
    //selcted all dots, add hte for each dot remove any actviated
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    //selced the dot we want
    console.log('dot current slide', curSlide);

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    //zerobased index slide
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);

    //increase the slide to 0%
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      //go back to the end for previous;
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    //set the slider to side by side set to slide 0
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    console.log(e);
    if (e.key === 'ArrowRight') nextSlide();
    e.key === 'ArrowLeft' && prevSlide();
  });

  //event delegation with dots
  //make a dot respond to a click then get slide
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      //dataset is object slide is
      const { slide } = e.target.dataset;
      //slide is a number that was stored in dataset
      goToSlide(slide);
      //clicking dots does not update current slide, so use slide # to show which dot to go to
      activateDot(slide);

      console.log('click slide', slide, 'current', curSlide);
    }
  });
};
slider();
//activeDot to slide 0 when hte page is reloaded

///////////////////////////////////////////
