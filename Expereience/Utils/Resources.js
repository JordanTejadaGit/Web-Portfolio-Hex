import EventEmitter from "./EventEmitter";
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";

export default class Resources extends EventEmitter
{
    constructor(sources)
    {
        super()

        
        // Options
        this.sources = sources

        // Setup
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()
    }

    setLoaders()
    {
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
        this.loaders.objLoader = new THREE.ObjectLoader()
        this.loaders.mtlLoader = new MTLLoader()
    }

    startLoading()
    {
        //Load each source

        for(const source of this.sources)
        {
            switch(source.type)
            {
                case "gltfModel":
                    this.loaders.gltfLoader.load(
                        source.path,
                        (file) =>
                        {
                            this.sourceLoaded(source, file)
                        }
                    )
                    break;
                case "mtlModel":
                    this.loaders.mtlLoader.load(
                        source.path,
                        (file) =>
                        {
                            this.sourceLoaded(source, file)
                        }
                    )
                    break;
                case "objModel":
                    this.loaders.objLoader.load(
                        source.path,
                        (file) =>
                        {
                            this.sourceLoadeed(source, file)
                        }
                    )
                    break;
                case "cubeTexture":
                    this.loaders.cubeTextureLoader.load(
                        source.path,
                        (file) =>
                        {
                            this.sourceLoaded(source, file)
                        }
                    )
                    break;
                case "texture":
                    this.loaders.textureLoader.load(
                        source.path,
                        (file) =>
                        {
                            this.sourceLoaded(source, file)
                        }
                    )
                    break;
            }
        }
    }

    sourceLoaded(source, file)
    {
        this.items[source.name] = file

        this.loaded++

        if(this.loaded == this.toLoad)
        {
            this.trigger('ready')
        }
    }
}