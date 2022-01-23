import { Scene } from "three";
import Experience from "../Experience";
import * as THREE from 'three'

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('environment')
        }

        // Setup
        this.setSunLight()
        this.setEnvironmentMap()
    }

    setSunLight()
    {
        // this.directionalLight = new THREE.DirectionalLight('#ffffff', 1)
        // this.directionalLight.position.set(10, 5, -2.25)
        // this.directionalLight.shadow.camera.far = 10
        // this.directionalLight.castShadow = true
        // this.directionalLight.shadow.mapSize.set(2560, 1440)
        // this.directionalLight.shadow.normalBias = 0.05
        // this.directionalLight.intensity = 5
        // this.scene.add(this.directionalLight)

        this.directionalLight2 = new THREE.DirectionalLight('#ffffff', 1)
        this.directionalLight2.position.set(20, 8.5, 80)
        this.directionalLight2.shadow.camera.far = 10
        this.directionalLight2.castShadow = true
        this.directionalLight2.shadow.mapSize.set(1920, 1080)
        this.directionalLight2.shadow.normalBias = 0.05
        this.directionalLight2.intensity = 6

        this.scene.add(this.directionalLight2)

        this.ambientLight = new THREE.AmbientLight('#ffffff', 10)
        this.scene.add(this.ambientLight)

        // this.directionalLight2Helper = new THREE.DirectionalLightHelper(this.directionalLight2 )
        // this.scene.add(this.directionalLight2Helper)
    }

    setEnvironmentMap()
    {
        this.environmentMap = {}
        this.environmentMap.intensity = 1
        this.environmentMap.texture = this.resources.items.environmentMapTexture
        this.environmentMap.texture.encoding = THREE.sRGBEncoding
        
        this.scene.background = this.environmentMap.texture
        this.scene.environment = this.environmentMap.texture

        this.environmentMap.updateMaterials = () =>
        {
            this.scene.traverse((child) =>
            {
                if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
                {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }
        this.environmentMap.updateMaterials()
    }
}