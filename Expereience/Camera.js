import Experience from "./Experience";
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.scrollY = window.scrollY
        this.currentScroll = 0

        this.setInstance()
        // this.setControls()
    }

    setInstance()
    {
        // Group
        this.cameraGroup = new THREE.Group()
        this.scene.add(this.cameraGroup)

        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            0.1,
            100
        )
        this.instance.position.set(20, 8.5, 75)
        this.instance.rotateX(-(Math.PI / 32))

        this.cameraGroup.add(this.instance)
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    update()
    {
        // Animate camera
        const time = this.experience.time.delta
        this.cameraGroup.position.x += ((this.experience.mouse.x * 0.5) - this.cameraGroup.position.x) * 0.05 * time
        this.cameraGroup.position.y += ( (- (this.experience.mouse.y * 0.5)) - this.cameraGroup.position.y) * 0.05 * time

        // this.controls.update()

        //Rotate Up
        if (this.experience.newScroll > 4.5 && this.experience.newScroll < 5.4)
        {
            this.instance.rotation.x = (Math.PI * ((this.experience.newScroll - 4.65) * 0.2))
        }
        else if (this.experience.newScroll > 5.4) {
            this.instance.rotation.x = (Math.PI * ((5.4 - 4.65) * 0.2))
        }
        else 
        {
            this.instance.rotation.x = -(Math.PI / 32)
        }

        // Scroll camera
        // window.addEventListener('scroll', () =>
        // {
        //     this.scrollY = window.scrollY
        //     const newSection = this.scrollY 
        //     if(newSection < this.currentScroll)
        //         { 
        //             this.instance.rotation.y += -(Math.PI * 0.00001) * 2
        //         }
        //     else 
        //     {
        //         this.instance.rotation.y += Math.PI * 0.00001
        //     }
        //     this.currentScroll = newSection

        // })
    }
}