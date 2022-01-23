import Experience from '../Experience'
import * as THREE from 'three'
import vertexShader from '../Utils/Shaders/vertex.glsl'
import fragmentShader from '../Utils/Shaders/fragment.glsl'
import { Color } from 'three'

export default class Projects
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.currentIntersect = null
        this.projectGroup = []

        this.setGeometry()
        this.setMaterials()
        this.setMeshs()

    }

    setGeometry()
    {
        this.geometry = new THREE.PlaneBufferGeometry(30, 20)
    }

    setMaterials()
    {
        this.material1 = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms:
            {
                uFrequency: { value: new THREE.Vector2(0.1, 0)},
                uSpeed: { value: 0.001},
                uTime: { value: 0},
                uColor: { value: new THREE.Color('black')},
                uTexture: { value: this.resources.items.project1}

            }
        })

        this.material2 = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms:
            {
                uFrequency: { value: new THREE.Vector2(0.1, 0)},
                uSpeed: { value: 0.001},
                uTime: { value: 0},
                uColor: { value: new THREE.Color('black')},
                uTexture: { value: this.resources.items.project2}

            }
        })

        this.material3 = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms:
            {
                uFrequency: { value: new THREE.Vector2(0.1, 0)},
                uSpeed: { value: 0.001},
                uTime: { value: 0},
                uColor: { value: new THREE.Color('black')},
                uTexture: { value: this.resources.items.project3}

            }
        })
    }

    setMeshs()
    {
        this.mesh1 = new THREE.Mesh(this.geometry, this.material1)
        this.mesh1.position.set(50, 47.5, 0)
        this.mesh1.rotation.x = Math.PI /6
        this.scene.add(this.mesh1)
        
        this.mesh2 = new THREE.Mesh(this.geometry, this.material2)
        this.mesh2.position.set(200, 47.5, 0)
        this.mesh2.rotation.x = Math.PI /6
        this.scene.add(this.mesh2)

        this.mesh3 = new THREE.Mesh(this.geometry, this.material3)
        this.mesh3.position.set(200, 47.5, 0)
        this.mesh3.rotation.x = Math.PI /6
        this.scene.add(this.mesh3)

        this.projectGroup = [this.mesh1, this.mesh2, this.mesh3]
    }

    update()
    {
        // this.material1.uniforms.uTime.value = this.time.elapsed
        // this.material2.uniforms.uTime.value = this.time.elapsed

        this.experience.raycaster.setFromCamera(this.experience.mouse, this.experience.camera.instance)
        this.intersects = this.experience.raycaster.intersectObjects(this.projectGroup)

        if(this.intersects.length)
        {
            this.currentIntersect = this.intersects[0]
        }
        else 
        {
            this.currentIntersect = null
        }
    }   
    
}