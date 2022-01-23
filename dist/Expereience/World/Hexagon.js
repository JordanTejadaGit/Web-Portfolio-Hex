import Experience from "../Experience";
import * as THREE from 'three'
import Grid from '././Grid'


export default class Hexagon
{
    constructor(points)
    {
        this.experience = new Experience()
        this.grid = new Grid()
        this.aboutMeModels = this.experience.world.aboutMeModels
        this.skillsModels = this.experience.world.skillsModels
        this.hexParameters = this.grid.hexParameters
        this.coordinates = this.grid.gridCordinates
        this.uniform = this.grid.uniforms
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.scrollY = window.scrollY
        this.indexAround = []
        this.hexWidth = Math.sqrt(3) * this.hexParameters.radiusTop
        this.hexHeight = 2 * this.hexParameters.radiusTop 
        this.currentScroll =0

        this.setGeometry()
        this.setMaterial()
        this.setHex()
    }

    setGeometry()
    {
        this.geometry = new THREE.CylinderBufferGeometry(
            this.hexParameters.radiusTop,
            this.hexParameters.radiusBottom,
            this.hexParameters.height,
            6
        )
    }    

    setMaterial()
    {
        this.material = new THREE.MeshStandardMaterial({
           color: this.hexParameters.color,
           shininess: 100
        })
    }
    setHex()
    {   
        this.dummy = new THREE.Object3D()
        this.hex = new THREE.InstancedMesh(this.geometry, this.material, this.hexParameters.amount)
        this.hex.receiveShadow = true
        this.hex.castShadow = true
        this.scene.add(this.hex)
        for(let i = 0; i < this.hexParameters.amount; i++) {
            this.dummy.position.set (
                this.coordinates[i].x,
                this.coordinates[i].y,
                this.coordinates[i].z,
            );
            this.dummy.updateMatrix();
            this.hex.setMatrixAt(i, this.dummy.matrix)
        }
        this.hex.instanceMatrix.needsUpdate = true;
        this.hex.receiveShadow = true
        this.hex.castShadow = true
    }

    update()
    {
        const time = this.time.elapsed

        // Waves
        this.waves(time)

        if (this.experience.newScroll >= 1 && this.experience.newScroll <= 2.25) 
        {
            this.liftMiddleRow(time, this.experience.newScroll - 1)
        }
        else if (this.experience.newScroll >= 3 && this.experience.newScroll <= 4.25)
        {
            this.liftMiddleRow(time, this.experience.newScroll - 3)
        }
        else{
            this.mouseHover(time)
        }

        if(this.experience.newScroll > 2 && this.experience.newScroll < 3.8)
        {
            // this.liftAboutMeModels()
            this.liftSkillsModels()
        }
        // Cast intersect

    }

    waves(time)
    {
        for(let i = 0; i < this.hexParameters.amount; i++) {
            const wave1 = Math.sin(time * this.uniform.uSpeed.value + this.coordinates[i].x * this.uniform.uFrequency.value.x)
            const wave2 = Math.sin(time * this.uniform.uSpeed.value + this.coordinates[i].y * this.uniform.uFrequency.value.y)
            const wave = wave1 * wave2 * this.uniform.uAmplitude.value
            this.dummy.position.set (
                this.coordinates[i].x,
                wave,
                this.coordinates[i].z,
            );
            this.dummy.updateMatrix();
            this.hex.setMatrixAt(i, this.dummy.matrix)
         }
         this.hex.instanceMatrix.needsUpdate = true;
    }

    aroundMouse(index) 
    {
        let findIndex = []
        let topAddition = 0
        let bottomAddition = 0

        if (this.coordinates[index].row < (this.hexParameters.row - 1))
        {
            bottomAddition = 1
        }
        else if (this.coordinates[index].row > (this.hexParameters.row - 1))
        {
            topAddition = 1
        }
        else
        {   

        }

        //Left
        findIndex.push(this.coordinates.findIndex( (position) =>
        {
            return position.row === this.coordinates[index].row - 1 &&
                position.rowCount === this.coordinates[index].rowCount - 1 + topAddition
        }))
        //Top Right
        findIndex.push(this.coordinates.findIndex( (position) =>
        {
            return position.row === this.coordinates[index].row - 1 &&
                position.rowCount === this.coordinates[index].rowCount + topAddition
        }))
        //Right
        findIndex.push(this.coordinates.findIndex( (position) =>
        {
            return position.row === this.coordinates[index].row &&
                position.rowCount === this.coordinates[index].rowCount + 1
        }))
        //Bottom Right
        findIndex.push(this.coordinates.findIndex( (position) =>
        {
            return position.row === this.coordinates[index].row + 1 &&
                position.rowCount === this.coordinates[index].rowCount + bottomAddition
        }))
        //Bottom Left
        findIndex.push(this.coordinates.findIndex( (position) =>
        {
            return position.row === this.coordinates[index].row + 1 &&
                position.rowCount === this.coordinates[index].rowCount - 1 + bottomAddition
        }))
        //Left
        findIndex.push(this.coordinates.findIndex( (position) =>
        {
            return position.row === this.coordinates[index].row &&
                position.rowCount === this.coordinates[index].rowCount - 1
        }))

        return findIndex
    }

    mouseHover(time)
    {
        this.experience.raycaster.setFromCamera(this.experience.mouse, this.experience.camera.instance)
        const intersects = this.experience.raycaster.intersectObject(this.hex)
        if (intersects.length)
        {   
            //decrease wave of hovered object
            const inter = intersects[0].instanceId
            const wave1 = Math.sin(time * this.uniform.uSpeed.value + this.coordinates[inter].x * this.uniform.uFrequency.value.x)
            const wave2 = Math.sin(time * this.uniform.uSpeed.value + this.coordinates[inter].y * this.uniform.uFrequency.value.y)
            const wave = wave1 * wave2 * (this.uniform.uAmplitude.value) - 0.25
            this.dummy.position.set(
                this.coordinates[inter].x,
                wave,
                this.coordinates[inter].z
            )
            this.dummy.updateMatrix();
            this.hex.setMatrixAt(inter, this.dummy.matrix)
            this.hex.instanceMatrix.setUsage(THREE.DynamicDrawUsage)

            const coordinatesAround = this.aroundMouse(inter)

            //decrease wave of surronding object
            for (let i = 0; i < 6; i++)
            {
                if (coordinatesAround[i] === -1)
                {
                    continue
                }
                const wave1 = Math.sin(time * this.uniform.uSpeed.value + this.coordinates[coordinatesAround[i]].x * this.uniform.uFrequency.value.x)
                const wave2 = Math.sin(time * this.uniform.uSpeed.value + this.coordinates[coordinatesAround[i]].y * this.uniform.uFrequency.value.y)
                const wave = wave1 * wave2 * (this.uniform.uAmplitude.value) - 0.15
                this.dummy.position.set(
                    this.coordinates[coordinatesAround[i]].x,
                    wave,
                    this.coordinates[coordinatesAround[i]].z
                )
                this.dummy.updateMatrix();
                this.hex.setMatrixAt(coordinatesAround[i], this.dummy.matrix)
                this.hex.instanceMatrix.needsUpdate = true;
            }
        }
    }

    liftMiddleRow(time, currentScroll)
    {
        let index = 0
        for(let i = 0; i < this.hexParameters.row + 10  ; i++)
        {
            index = this.coordinates.findIndex( (position) =>
            {
                return position.row === this.hexParameters.row  + 23 &&
                    position.rowCount === i
            })

            const wave1 = Math.sin(time * this.uniform.uSpeed.value + this.coordinates[index].x * this.uniform.uFrequency.value.x)
            const wave2 = Math.sin(time * this.uniform.uSpeed.value + this.coordinates[index].y * this.uniform.uFrequency.value.y)
            const wave = wave1 * wave2 * (this.uniform.uAmplitude.value)

            this.hex.getMatrixAt(index, this.dummy.matrix)
            this.dummy.ro
            this.dummy.position.set(
                this.coordinates[index].x,
                wave + (Math.sin(currentScroll * 2.5) * 7),
                this.coordinates[index].z
            )
            this.dummy.updateMatrix();
            this.hex.setMatrixAt(index, this.dummy.matrix)
            this.hex.instanceMatrix.needsUpdate = true;
        }
    }

    // liftAboutMeModels()
    // {
    //     for (let i = 0; i < this.aboutMeModels.indexModel.length; i++)
    //     {
    //         this.dummy.position.set(
    //             this.coordinates[this.aboutMeModels.indexModel[i]].x,
    //             1,
    //             this.coordinates[this.aboutMeModels.indexModel[i]].z
    //         )
    //         this.dummy.updateMatrix();
    //         this.hex.setMatrixAt(this.aboutMeModels.indexModel[i], this.dummy.matrix)
    //         this.hex.instanceMatrix.needsUpdate = true;
    //     }
    // }

    liftSkillsModels()
    {
        for (let i = 0; i < this.skillsModels.indexModel.length; i++)
        {
            if (i % 2 === 0) {
                this.dummy.position.set(
                    this.coordinates[this.skillsModels.indexModel[i]].x,
                    1,
                    this.coordinates[this.skillsModels.indexModel[i]].z
                )
            }
            else {
                this.dummy.position.set(
                    this.coordinates[this.skillsModels.indexModel[i]].x,
                    3,
                    this.coordinates[this.skillsModels.indexModel[i]].z
                )
            }
            this.dummy.updateMatrix();
            this.hex.setMatrixAt(this.skillsModels.indexModel[i], this.dummy.matrix)
            this.hex.instanceMatrix.needsUpdate = true;
        }
    }     
}