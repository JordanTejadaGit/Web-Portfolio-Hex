import Experience from '../Experience.js'
import * as THREE from 'three'
import Grid from './Grid.js'

export default class AbooutMeModels
{
    constructor()
    {
        this.experience = new Experience()
        this.grid = new Grid()
        this.scene = this.experience.scene
        this.hexParameters = this.grid.hexParameters
        this.coordinates = this.grid.gridCordinates
        this.time = this.experience.time
        this.resources = this.experience.resources
        this.hexModel = this.experience.world.hexagon
        this.indexModel = []
        
        // this.setSnowboard()
        // this.setPC()
        // this.setSNES()
        // this.setCleaver()
    }

    setSnowboard()
    {
        this.indexModel.push(this.coordinates.findIndex( (position) =>
        {
            return position.row === this.hexParameters.row + 16 &&
                position.rowCount === 27
        }))

        this.snowboard = this.resources.items.snowboardModel
        this.snowboard.scene.scale.set(0.025, 0.025, 0.025)
        this.snowboard.scene.rotation.y = Math.PI / 4

        this.snowboard.scene.position.set(
            this.coordinates[this.indexModel[0]].x,
            8,
            this.coordinates[this.indexModel[0]].z
        )
        this.scene.add(this.snowboard.scene)

        this.scene.traverse((child) =>
        {
            if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
            {
                child.material.needsUpdate = true
                child.castShadow = true
                child.receiveShadow = true
            }
        })

    }

    setPC()
    {
        this.indexModel.push(this.coordinates.findIndex( (position) =>
        {
            return position.row === this.hexParameters.row + 16 &&
                position.rowCount === 38
        }))

        this.pc = this.resources.items.pcModel
        this.pc.scene.scale.set(0.6, 0.6, 0.6)
        this.pc.scene.rotation.y =  5 * Math.PI /4

        this.pc.scene.position.set(
            this.coordinates[this.indexModel[1]].x,
            6.2,
            this.coordinates[this.indexModel[1]].z
        )
        this.scene.add(this.pc.scene)

        this.scene.traverse((child) =>
        {
            if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
            {
                child.material.needsUpdate = true
                child.castShadow = true
                child.receiveShadow = true
            }
        })

    }

    setSNES()
    {
        
        this.indexModel.push(this.coordinates.findIndex( (position) =>
        {
            return position.row === this.hexParameters.row + 14 &&
                position.rowCount === 29
        }))

        this.snes = this.resources.items.snesModel
        this.snes.scene.scale.set(0.05, 0.05, 0.05)
        // this.snes.scene.rotation.y =  5 * Math.PI /4
     
        
        this.snes.scene.rotation.x = Math.PI / 2
        this.snes.scene.rotation.z =-  (Math.PI / 4)
        this.scene.add(this.snes.scene)

        this.snes.scene.position.set(
            this.coordinates[this.indexModel[2]].x,
            6.4,
            this.coordinates[this.indexModel[2]].z
        )

        this.snes.scene.traverse((child) =>
        {
            if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
            {
                child.material.needsUpdate = true
                child.castShadow = true
                child.receiveShadow = true
            }
        })
    }

    setCleaver()
    {
        this.indexModel.push(this.coordinates.findIndex( (position) =>
        {
            return position.row === this.hexParameters.row + 14 &&
                position.rowCount === 38
        }))

        this.cleaver = this.resources.items.cleaverModel
        this.cleaver.scene.scale.set(0.01, 0.01, 0.01)
        this.scene.add(this.cleaver.scene)

        this.cleaver.scene.position.set(
            this.coordinates[this.indexModel[3]].x,
            6,
            this.coordinates[this.indexModel[3]].z
        )

        this.cleaver.scene.traverse((child) =>
        {
            if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
            {
                child.material.needsUpdate = true
                child.castShadow = true
                child.receiveShadow = true
            }
        })
    }

    update()
    {
        // if(this.experience.newScroll > 2 && this.experience.newScroll < 3.5)
        // {
        //     this.snowboard.scene.visible = true;
        //     this.pc.scene.visible = true;
        //     this.snes.scene.visible = true;
        //     this.cleaver.scene.visible = true;
        // }
        // else
        // {
        //     this.snowboard.scene.visible = false;
        //     this.pc.scene.visible = false;
        //     this.snes.scene.visible = false;
        //     this.cleaver.scene.visible = false;
        // }

    }
}