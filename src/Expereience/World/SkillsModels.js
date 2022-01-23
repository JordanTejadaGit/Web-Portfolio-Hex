import Experience from '../Experience.js'
import * as THREE from 'three'
import Grid from './Grid.js'

export default class SkillsModels
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
        
        this.setJavaScript()
        this.setJava()
        this.setHTML()
        this.setMySQL()
        this.setCSS()
        // this.setPython()
    }

    setCSS()
    {
        this.indexModel.push(this.coordinates.findIndex( (position) =>
        {
            return position.row === this.hexParameters.row + 13 &&
                position.rowCount === 37
        }))

        this.css = this.resources.items.cssModel
        this.css.scene.scale.set(25, 25, 25)
        this.css.scene.rotation.y = - (Math.PI / 6)

        this.css.scene.position.set(
            this.coordinates[this.indexModel[4]].x,
            6,
            this.coordinates[this.indexModel[4]].z
        )
        this.scene.add(this.css.scene)

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

    setHTML()
    {
        this.indexModel.push(this.coordinates.findIndex( (position) =>
        {
            return position.row === this.hexParameters.row + 15 &&
                position.rowCount === 37
        }))

        this.html = this.resources.items.htmlModel
        this.html.scene.scale.set(25, 25, 25)
        this.html.scene.rotation.y = - (Math.PI / 6)

        this.html.scene.position.set(
            this.coordinates[this.indexModel[2]].x,
            5.6,
            this.coordinates[this.indexModel[2]].z
        )
        this.scene.add(this.html.scene)

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

    setJavaScript()
    {
        this.indexModel.push(this.coordinates.findIndex( (position) =>
        {
            return position.row === this.hexParameters.row + 17 &&
                position.rowCount === 37
        }))

        this.javaScript = this.resources.items.javaScriptModel
        this.javaScript.scene.scale.set(25, 25, 25)
        this.javaScript.scene.rotation.y = - (Math.PI / 6)

        this.javaScript.scene.position.set(
            this.coordinates[this.indexModel[0]].x,
            6,
            this.coordinates[this.indexModel[0]].z
        )
        this.scene.add(this.javaScript.scene)

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
    setJava()
    {
        this.indexModel.push(this.coordinates.findIndex( (position) =>
        {
            return position.row === this.hexParameters.row + 16 &&
                position.rowCount === 37
        }))

        this.java = this.resources.items.javaModel
        this.java.scene.scale.set(1, 1, 1)
        this.java.scene.rotation.y = - (Math.PI / 6)

        this.java.scene.position.set(
            this.coordinates[this.indexModel[1]].x,
            8.2,
            this.coordinates[this.indexModel[1]].z
        )
        this.scene.add(this.java.scene)

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

    setMySQL()
    {
        this.indexModel.push(this.coordinates.findIndex( (position) =>
        {
            return position.row === this.hexParameters.row + 14 &&
                position.rowCount === 37
        }))

        this.mySQL = this.resources.items.mySQLModel
        this.mySQL.scene.scale.set(1, 1, 1)
        this.mySQL.scene.rotation.y =  Math.PI * 2

        this.mySQL.scene.position.set(
            this.coordinates[this.indexModel[3]].x,
            8.2,
            this.coordinates[this.indexModel[3]].z
        )
        this.scene.add(this.mySQL.scene)

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

    setPython()
    {
        this.indexModel.push(this.coordinates.findIndex( (position) =>
        {
            return position.row === this.hexParameters.row + 13 &&
                position.rowCount === 37
        }))

        this.python = this.resources.items.pythonModel
        this.python.scene.scale.set(0.25, 0.25, 0.25)
        this.python.scene.rotation.y = Math.PI / 3

        this.python.scene.position.set(
            this.coordinates[this.indexModel[5]].x,
            7,
            this.coordinates[this.indexModel[5]].z
        )
        this.scene.add(this.python.scene)

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

    update()
    {
        if(this.experience.newScroll > 2 && this.experience.newScroll < 3.5)
        {
            this.javaScript.scene.visible = true;
            this.css.scene.visible = true;
            this.html.scene.visible = true;
            this.java.scene.visible = true;
            this.mySQL.scene.visible = true;
            // this.python.scene.visible = true;
        }
        else
        {
            this.javaScript.scene.visible = false;
            this.css.scene.visible = false;
            this.html.scene.visible = false;        
            this.java.scene.visible = false;
            this.mySQL.scene.visible = false;
            // this.python.scene.visible = false;        
        }
    }
}