import Experience from "../Experience";
import Environment from "./Environnment";
import Grid from "./Grid";
import Hexagon from "./Hexagon";
import AboutMeModels from "./AboutMeModels"
import SkillsModels from "./SkillsModels";
import Projects from "./Projects";

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.points = new Grid()
        this.pointParameter = this.points
        this.resources = this.experience.resources
        // this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.aboutMeModels = new AboutMeModels()
            this.skillsModels = new SkillsModels()
            this.hexagon = new Hexagon(this.points)
            this.projects = new Projects()
            this.environment = new Environment()
        })
    }
    update()
    {
        if(this.hexagon) 
            this.hexagon.update() 
        if(this.aboutMeModels)
            this.aboutMeModels.update()
        if(this.skillsModels)
            this.skillsModels.update()
        if(this.projects)
            this.projects.update()
    }
}