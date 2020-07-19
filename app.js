const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {

        // toggle nav

        nav.classList.toggle('nav-active');

        // links animation

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation =''
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 1.2}s`
            }

        });

        // burger animation

        burger.classList.toggle('toggle');

    });

}

navSlide();

// Name Type Writer Effect

const TypeWriter = function (txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;

}

// Type Method

TypeWriter.prototype.type = function() {
    // Current index of words ["Monroy", "Monroy"]
    const current = this.wordIndex % this.words.length;

    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
        // Remove a character
        this.txt = fullTxt.substring(0, this.txt.length - 1);

    } else {
        // Add a character
        this.txt = fullTxt.substring(0, this.txt.length + 1);

    }

    // Inset txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 300;

    if(this.isDeleting) {
        typeSpeed /= 2;

    }

    // If word is complete

    if (!this.isDeleting && this.txt === fullTxt) {
        // Make pause at end
        typeSpeed = this.wait;

        // Set delete to true
        this.isDeleting = true;

    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        // Move to next word
        this.wordIndex ++;
        // Pause before start typing
        typeSpeed = 3000;

    }

    setTimeout(() => this.type(), typeSpeed)
}

// Init on DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    // Init TypeWriter

    new TypeWriter(txtElement, words, wait);
}
