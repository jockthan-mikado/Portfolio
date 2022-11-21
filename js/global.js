/* ceci est un commentaire js */
// 

// string 

let myVar = "ma variable";
myVar = "variable changée";

const myVar2 = "ma variable 2";

// console.log(myVar);

// boolean
let isTrue = true;
let isFalse = false;

// console.log(isFalse);

// chiffres et opérateurs

let chiffre1 = 4;
let chiffre2 = 3;

// console.log(typeof chiffre1, typeof chiffre2);

// template string, littéraux de gabarits et concat

let test = 'test ' + myVar + 'value';
let test2 = `test ${myVar} dzqdqzd `;

// console.log(test2);
/*
if (chiffre1 <= 3) {
  console.log('condition est valide');
} else if (chiffre1 <= 4) {
  console.log('je passe la');
} else {
  console.log('condition pas valide')
}
*/

// tableaux 

let array = ['item 1', 'item 2', 'item 3', 'item 4'];
// console.log(array[3]);

// objets

let obj = {
  title: 'Mon titre',
  description: 'Ma description'
}

// console.log(obj.title, obj.description);

// les boucles, while, for, foreach
/*
for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}

array.forEach(item => {
  console.log(item);
})

*/

// fonctions 

/*function myFunction(item, item2) {
  console.log(item, item2);
}*/

const myFunction = (item, item2) => {
  // console.log(item, item2);
}

myFunction('toto', 5);
myFunction('tata', 6);

const calcul = (nb1, nb2) => {
  return nb1 + nb1;
}

let result = calcul(4, 5);
// console.log(result);

// interagir avec le dom // methode, propriete, evement

// selectors
// let header = document.querySelector('.header');
// console.log(header);

// let grids = document.querySelectorAll('.grid');
/*
grids.forEach(grid => {
  grid.classList.add('titi');
  console.log(grid)
});
*/
// evenements les plus courants
/*
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM entièrement chargé et analysé");
});

header.addEventListener('click', (e) => {
  console.log(e);
});

header.addEventListener('mouseenter', (e) => {
  console.log('souris entre');
});*/

// insertion dom et navigation dans le dom

let div = document.createElement('div'); //on crée un div
div.classList.add('top'); //on ajoute une class
div.innerHTML = `<span>Top zone</span>`;  //on insère un contenu html
//header.append(div); // on rajoute la div dans le header
//header.parentNode.append(div);  // on ajoute la div avant la fermeture du parent du header
// console.log(header.nextElementSibling); //on cible le prochain élément après le header

// fin de la théorie 

/* Menu mobile */

function menuMobile() {
  const btn = document.querySelector('.burger');  //on cible la bar
  const header = document.querySelector('.header'); //on cible la class header
  const links = document.querySelectorAll('.navbar a'); //on cible tous les liens dans la nav bar

  btn.addEventListener('click', () => {
    header.classList.toggle('show-nav');
  });
  //au click sur le lien dans la nav bar on supprime la class show-nav
  links.forEach(link => {
    link.addEventListener('click', () => {
      header.classList.remove('show-nav');
    });
  });
}

menuMobile();

/* Porfolio */

function tabsFilters() {
  const tabs = document.querySelectorAll('.portfolio-filters a'); //on cible tous les liens dans portfolio-filters
  const projets = document.querySelectorAll('.portfolio .card');  //on cible tous les card dans portfolio
  //supprime toutes les classes actives
  const resetActiveLinks = () => {
    tabs.forEach(elem => {
      elem.classList.remove('active');
    })
  }

  const showProjets = (elem) => {
    console.log(elem);
    projets.forEach(projet => { //on parcours tous les cards

      let filter = projet.getAttribute('data-category'); // on recupère chacune de valeur de card

      if (elem === 'all') { //si l'element cliquer a pour valeur all on supprime la classe hide
        projet.parentNode.classList.remove('hide');
        return
      }

      console.log('tutu');
      // ne sera pas pris en compte !
      /*if (filter !== elem) {   //si le lien qu'on a cliquer ne correspond pas a la veleur du card
        projet.parentNode.classList.add('hide'); //on ajoute la class hide
      } else {
        projet.parentNode.classList.remove('hide');
      }*/

      // ou par l'opérateur ternaire
      filter !== elem ? projet.parentNode.classList.add('hide') : projet.parentNode.classList.remove('hide');

    });
  }

  tabs.forEach(elem => {
    elem.addEventListener('click', (event) => {  //on parcours tous les liens
      event.preventDefault();
      let filter = elem.getAttribute('data-filter'); // on recupère chacune de valeur du lien
      showProjets(filter)   // on passe la valeur de data-filter du lien qu'on a clicker
      resetActiveLinks();
      elem.classList.add('active'); //on rend la class active
    });
  })
}

tabsFilters()

function showProjectDetails() {
  const links = document.querySelectorAll('.card__link');
  const modals = document.querySelectorAll('.modal');
  const btns = document.querySelectorAll('.modal__close');

  const hideModals = () => {
    modals.forEach(modal => {
      modal.classList.remove('show');
    });
  }

  links.forEach(elem => {
    elem.addEventListener('click', (event) => {
      event.preventDefault();

      document.querySelector(`[id=${elem.dataset.id}]`).classList.add('show');
    });
  });

  btns.forEach(btn => {
    btn.addEventListener('click', (event) => {
      hideModals();
    });
  });

}

showProjectDetails();

// effets

const observerIntersectionAnimation = () => {
  const sections = document.querySelectorAll('section');
  const skills = document.querySelectorAll('.skills .bar');

  sections.forEach((section, index) => {
    if (index === 0) return;
    section.style.opacity = "0";
    section.style.transition = "all 1.6s";
  });

  skills.forEach((elem, index) => {

    elem.style.width = "0";
    elem.style.transition = "all 1.6s";
  });

  let sectionObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let elem = entry.target;
        elem.style.opacity = 1;
      }
    });
  });

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  let skillsObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let elem = entry.target;
        elem.style.width = elem.dataset.width + '%';
      }
    });
  });

  skills.forEach(skill => {
    skillsObserver.observe(skill);
  });
}

observerIntersectionAnimation();





