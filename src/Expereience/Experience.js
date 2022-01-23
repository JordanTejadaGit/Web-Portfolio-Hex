import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import * as THREE from 'three'
import Camera from './Camera'
import Renderer from './Renderer'
import World from './World/World'
import Resources from "./Utils/Resources"
import Debug from './Utils/Debug.js'
import Sources from './Sources'
import Slider from "./Slider"
import NavBar from "./NavBar"

let instance = null

export default class Experience
{
    constructor(canvas)
    {
        if(instance)
        {
            return instance
        }

        instance = this

        // Global access
        window.experience = this

        // Options
        this.canvas = canvas

        // Setup
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.camera = new Camera()
        this.resources = new Resources(Sources)
        this.renderer = new Renderer()
        this.world = new World()
        this.clickable = document.querySelectorAll("body");

        this.resources.on('ready', () =>
        {
                this.slider = new Slider()
                this.nav = new NavBar();
        })

        // Mouse
        this.mouse = new THREE.Vector2()
        window.addEventListener('mousemove', (event) =>
        {
            this.mouse.x = (event.clientX / this.sizes.width * 2 - 1)
            this.mouse.y = - (event.clientY / this.sizes.height * 2 - 1)
            if(this.world.projects)
            {
                if(this.world.projects.currentIntersect)
                {
                    switch(this.world.projects.currentIntersect.object)
                    {
                        case this.world.projects.mesh1:
                            this.clickable[0].classList.add("clickable")
                            break
                        case this.world.projects.mesh2:
                            this.clickable[0].classList.add("clickable")
                            break
                    }
                }
                else
                {
                    this.clickable[0].classList.remove("clickable")
            }}
        })

        // Scroll 
        window.addEventListener('scroll', () =>
        {
            this.scrollYhex = window.scrollY
            this.newScroll = this.scrollYhex / this.sizes.height

        })

        // Clickable event
        window.addEventListener('click', () =>
        {
            if(this.world.projects.currentIntersect)
            {
                switch(this.world.projects.currentIntersect.object)
                {
                    case this.world.projects.mesh1:
                        if(this.newScroll > 5.4) {
                            window.open('https://web-portfolio-alpha.vercel.app/')
                        }
                        break
                    case this.world.projects.mesh2:
                        if(this.newScroll > 5.4) {
                            window.open('https://github.com/JordanTejadaGit/Home-Inventory-Management')
                        }
                        break
                }
            }
        })


        // Raycaster
        this.raycaster = new THREE.Raycaster()
        this.raycaster.setFromCamera(this.mouse, this.camera.instance)

        // Sizes resize event
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () =>
        {
            this.update()
        })
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {

        this.camera.update()
        this.world.update()
        this.renderer.update()
    }
}