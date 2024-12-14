import {GLTFLoader} from "https://cdn.rawgit.com/mrdoob/three.js/master/examples/jsm/loaders/GLTFLoader.js"

export function loadModel(url, position, rotation, material) {
    const loader = new GLTFLoader();
    loader.load('assest/playerModel.glb', function (glb) {
        const model = glb.scene;
        model.position.set(position[0], position[1], position[2]);
        model.rotation.set(rotation[0], rotation[1], rotation[2]);
        model.traverse(function (child) {
            if (child.isMesh) {
                child.material = material;
            }
        });
        scene.add(model);
    });
}