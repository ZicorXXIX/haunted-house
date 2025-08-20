import './style.css'
import { World } from './World/World'

function main() {
    const container = document.querySelector("#app")
    if (container) {
        const world = new World(container)
        world.start()
    } else {
        console.log("Create a div with id='app' in index.html");
    }
}
main()
