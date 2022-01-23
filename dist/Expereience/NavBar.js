import Experience from "./Experience"

export default class NavBar
{
    constructor()
    {
        const experience = new Experience()
        const home = document.querySelector('#home')
        const about = document.querySelector('#about')
        const projects = document.querySelector('#projects')
        const contact = document.querySelector('#contact')
        const name = document.querySelectorAll(".name")
        const description = document.querySelectorAll(".description")
        const projectName = document.querySelectorAll(".projectName")
        const projectDescription = document.querySelectorAll(".projectDescription")
        const arrowBtn = document.querySelectorAll(".arrow") 
        const skills = document.querySelectorAll(".skills")
        const project = document.querySelectorAll(".project") 

        home.addEventListener('click', () => {
            window.scrollTo(0, 0)
            name[0].classList.remove("fadeOut")
            name[0].classList.add("fadeIn")
            description[0].classList.remove("fadeIn")
            description[0].classList.add("fadeOut")
            projectName[0].classList.remove("fadeIn")
            projectName[0].classList.add("fadeOut")
            project[experience.slider.counter].classList.remove("fadeIn")
            project[experience.slider.counter].classList.add("fadeOut")
            projectDescription[0].classList.remove("fadeIn")
            projectDescription[0].classList.add("fadeOut")
           
        })

        about.addEventListener('click', () => {
            window.scrollTo(0, experience.sizes.height * 2.4)
            name[0].classList.remove("fadeIn")
            name[0].classList.add("fadeOut")
            description[0].classList.add("fadeIn")
            description[0].classList.remove("fadeOut")
            projectName[0].classList.remove("fadeIn")
            projectName[0].classList.add("fadeOut")
            project[experience.slider.counter].classList.remove("fadeIn")
            project[experience.slider.counter].classList.add("fadeOut")
            projectDescription[0].classList.remove("fadeIn")
            projectDescription[0].classList.add("fadeOut")
           
        })

        projects.addEventListener('click', () => {
            window.scrollTo(0, experience.sizes.height * 5.5)
            name[0].classList.remove("fadeIn")
            name[0].classList.add("fadeOut")
            description[0].classList.remove("fadeIn")
            description[0].classList.add("fadeOut")
            projectName[0].classList.remove("fadeIn")
            projectName[0].classList.add("fadeOut")
            project[experience.slider.counter].classList.add("fadeIn")
            project[experience.slider.counter].classList.remove("fadeOut")
            projectDescription[0].classList.add("fadeIn")
            projectDescription[0].classList.remove("fadeOut")
        })
    }
}