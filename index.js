import { Raycaster } from "three";
import Experience from "./Expereience/Experience";
import './style.css'

const experience = new Experience(document.querySelector('canvas.webgl'));



/**
 * Scroll fade CSS
 */

const name = document.querySelectorAll(".name")
const description = document.querySelectorAll(".description")
const social = document.querySelectorAll(".social")
const projectName = document.querySelectorAll(".projectName")
const projectDescription = document.querySelectorAll(".projectDescription")
const arrowBtn = document.querySelectorAll(".arrow") 
const project = document.querySelectorAll(".project")

let scrollY = window.scrollY
let currentSection = 0

console.log(scrollY)

window.addEventListener('scroll', () =>
{
    
    scrollY = window.scrollY
    const newSection = scrollY / experience.sizes.height
    if(newSection < currentSection)
        {
            currentSection = newSection * -1
        }
    else
        {
        currentSection = newSection
        }
    if (newSection < 1.2 && newSection > 1)
    {
        name[0].classList.remove("fadeOut")
        name[0].classList.add("fadeIn")
        social[0].classList.add("stopLink")
    }
    else if (newSection > 1.2 && newSection < 1.5)
    {
        name[0].classList.remove("startFade")
        name[0].classList.remove("fadeIn")
        name[0].classList.add("fadeOut")
        description[0].classList.remove("fadeIn")
        description[0].classList.add("fadeOut")
        social[0].classList.add("stopLink")
    }
    else if (newSection > 1.8 && newSection < 3.15)
    {
        description[0].classList.remove("fadeOut")
        description[0].classList.add("fadeIn")
        social[0].classList.remove("stopLink")
    }
    else if (newSection > 3.15 && newSection < 3.6)
    {   
        description[0].classList.remove("fadeIn")
        description[0].classList.add("fadeOut")
        social[0].classList.add("stopLink")
        projectName[0].classList.remove("fadeIn")
        projectName[0].classList.add("fadeOut")
    }
    else if (newSection > 3.16 && newSection < 4.8)
    {   
        projectName[0].classList.remove("fadeOut")
        projectName[0].classList.add("fadeIn")
        project[experience.slider.counter].classList.remove("fadeIn")
        project[experience.slider.counter].classList.add("fadeOut")
        projectDescription[0].classList.remove("fadeIn")
        projectDescription[0].classList.add("fadeOut")
    }
    else if (newSection > 4.8 && newSection < 5.4)
    {
        projectName[0].classList.remove("fadeIn")
        projectName[0].classList.add("fadeOut")
        project[experience.slider.counter].classList.add("fadeOut")
        project[experience.slider.counter].classList.remove("fadeIn")
        projectDescription[0].classList.add("fadeOut")
        projectDescription[0].classList.remove("fadeIn")
    }
    else if (newSection > 5.4)
    {
        project[experience.slider.counter].classList.remove("fadeOut")
        project[experience.slider.counter].classList.add("fadeIn")
        projectDescription[0].classList.remove("fadeOut")
        projectDescription[0].classList.add("fadeIn")
    }
    console.log(newSection)
})


window.onbeforeunload = function () {
    name[0].classList.add("startFade")
    window.scrollTo(0, 0);
}

