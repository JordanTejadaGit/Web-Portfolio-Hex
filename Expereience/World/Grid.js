import Experience from "../Experience";
import * as THREE from 'three'

export default class Grid
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time

        this.setParameters()

        const startingPosition = {
            x: 0,
            y: 0,
            z: 0
        }
        this.gridCordinates = []
        this.setPosition(this.hexParameters.row, this.hexParameters.amount, startingPosition)
    }
    setParameters()
    {
        this.hexParameters = {
            row: 40,
            radiusTop: 1,
            radiusBottom: 1,
            height: 10,
            color: new THREE.Color('black'),
            spaceBetween: 0.005,
            amount: 1
        }
        for (let i = 0; i < this.hexParameters.row; i++) [
            this.hexParameters.amount += (i * 6) 
        ]

        this.uniforms = {
            uTime: { value: 0 },

            //Waves
            uAmplitude: { value: 0.3 },
            uFrequency: { value: new THREE.Vector2(0.075, 0.075)},
            uSpeed: { value: 0.001 },

            uOffsetX: { value: 0 },
            uOffsetZ: { value: 0 },

            uSize: {value: 30 * this.experience.renderer.instance.getPixelRatio()},
            uColor: {value: this.hexParameters.color}
        }

    }

    setPosition(row, hexAmount, startingPosition)
    {
        let stack = []
        let stack2 = []
        let rowAddition = 0
        let hexWidth = Math.sqrt(3) * this.hexParameters.radiusTop
        let hexHeight = 2 * this.hexParameters.radiusTop 
        let hexInRow = {}
        for (let i = 1; i < (row * 2); i++)
        {   

            if (i === 1) {
                hexInRow = {
                    row: (i - 1),
                    rowCount: 0,
                    x: startingPosition.x - ((hexWidth / 2) * (Math.round(row / 2))  + this.hexParameters.spaceBetween),
                    y: startingPosition.y ,
                    z: startingPosition.z - ((hexHeight * 0.75) * (Math.round(row / 2)) + this.hexParameters.spaceBetween)
                }
                
                // saves hexagon position for next row position
                stack.push(hexInRow)
                // saves hexagon position for adding hex to row
                stack2.push(hexInRow)
                // saves overall cordinates
                this.gridCordinates.push(hexInRow)
            }
            
            // If row is past middle, places next hex position row bottom right of the previous hex row
            else if (i > row)
            {
                const prevHex = stack.pop()

                hexInRow = {
                    row: i - 1,
                    rowCount: 0,
                    x: prevHex.x + (hexWidth / 2) + this.hexParameters.spaceBetween,
                    y: prevHex.y,
                    z: prevHex.z + (hexHeight * 0.75)  + this.hexParameters.spaceBetween
                }

                stack.push(hexInRow)
                stack2.push(hexInRow)
                this.gridCordinates.push(hexInRow)
            }
            // place new hex row bottom left of previous 
            else 
            {
                const prevHex = stack.pop()

                hexInRow = {
                    row: i - 1,
                    rowCount: 0,
                    x: prevHex.x - (hexWidth / 2) - this.hexParameters.spaceBetween,
                    y: prevHex.y,
                    z: prevHex.z + (hexHeight * 0.75)  + this.hexParameters.spaceBetween
                }

                stack.push(hexInRow)
                stack2.push(hexInRow)
                this.gridCordinates.push(hexInRow)
            }

            // Add hex to the row
            for(let j = 0; j < (row-1) + rowAddition; j++) 
            {
                const prevHex = stack2.pop()
                hexInRow = {
                    row: i - 1,
                    rowCount: (j + 1),
                    x: prevHex.x + (hexWidth) + this.hexParameters.spaceBetween,
                    y: prevHex.y,
                    z: prevHex.z
                }

                stack2.push(hexInRow)
                this.gridCordinates.push(hexInRow)
            }
            // if row is more or equal to half of its size, decrease row addition
            if (i  >= row) {
                rowAddition--
            }
            // else add
            else {
                rowAddition++
            }
        }
    }
}