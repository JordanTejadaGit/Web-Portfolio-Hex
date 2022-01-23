import gsap from 'gsap';
import Experience from './Experience';
import Projects from './World/Projects';

export default class Slider
{
    constructor()
    {
        const prevBtn = document.querySelector('#prevBtn')
        const nextBtn = document.querySelector('#nextBtn')
        const projects = document.querySelectorAll(".project")
        const git = document.querySelectorAll(".git")
        const clickable = document.querySelectorAll("body");
        this.experience = new Experience();
        this.projects = this.experience.world.projects.projectGroup

        this.counter = 0
        const size = projects.length

        projects

        // Next Project 
        nextBtn.addEventListener('click', () => {
            if (this.counter + 1 > size - 1) {
                projects[this.counter].classList.remove("fadeIn")
                projects[this.counter].classList.add("fadeOut")
                projects[0].classList.remove("fadeOut")
                projects[0].classList.add("fadeIn")
                git[this.counter].classList.add("stopLink")
                git[0].classList.remove("stopLink")
                clickable[0].classList.add("unclickable")
                clickable[0].classList.remove("unclickable")
                gsap.fromTo(this.projects[0].position, 
                    {x: 200}, 
                    {x: 50, duration: 1.5, ease: "power4"})
                gsap.fromTo(this.projects[this.counter].position, 
                        {x: 50}, 
                        {x: -170, duration: 1.5, ease: "power4"})
                this.counter = 0
            }
            else {
                projects[this.counter].classList.remove("fadeIn")
                projects[this.counter].classList.add("fadeOut")
                projects[this.counter + 1].classList.remove("fadeOut")
                projects[this.counter + 1].classList.add("fadeIn")
                git[this.counter].classList.add("stopLink")
                git[this.counter + 1].classList.remove("stopLink")
                clickable[0].classList.add("unclickable")
                clickable[0].classList.remove("unclickable")
                gsap.fromTo(this.projects[this.counter + 1].position, 
                        {x: 200}, 
                        {x: 50, duration: 1.5, ease: "power4"})
                gsap.fromTo(this.projects[this.counter].position, 
                        {x: 50}, 
                        {x: -170, duration: 1.5, ease: "power4"})
                this.counter++
            }
        })

        // Previous Project
        prevBtn.addEventListener('click', () => {
            if (this.counter - 1 < 0) {
                projects[this.counter].classList.remove("fadeIn")
                projects[this.counter].classList.add("fadeOut")
                projects[size - 1].classList.remove("fadeOut")
                projects[size - 1].classList.add("fadeIn")
                git[this.counter].classList.add("stopLink")
                git[size - 1].classList.remove("stopLink")
                clickable[0].classList.add("unclickable")
                clickable[0].classList.remove("unclickable")
                gsap.fromTo(this.projects[size - 1].position, 
                    {x: -170}, 
                    {x: 50, duration: 1.5, ease: "power4"})
                gsap.fromTo(this.projects[this.counter].position, 
                    {x: 50}, 
                    {x: 200, duration: 1.5, ease: "power4"})
                this.counter = size - 1
            }
            else {
                projects[this.counter].classList.remove("fadeIn")
                projects[this.counter].classList.add("fadeOut")
                projects[this.counter - 1].classList.remove("fadeOut")
                projects[this.counter - 1].classList.add("fadeIn")
                git[this.counter].classList.add("stopLink")
                git[this.counter - 1].classList.remove("stopLink")
                clickable[0].classList.add("unclickable")
                clickable[0].classList.remove("unclickable")
                gsap.fromTo(this.projects[this.counter - 1].position, 
                    {x: -170}, 
                    {x: 50, duration: 1.5, ease: "power4"})
                gsap.fromTo(this.projects[this.counter].position, 
                    {x: 50}, 
                    {x: 200, duration: 1.5, ease: "power4"})
                this.counter--
            }
        })
    }
}