import * as THREE from 'three';
import "./index.css"
import{ OrbitControls } from "three/examples/jsm/controls/OrbitControls"

//Scene 
const scene = new THREE.Scene();

// create a Sphere
const geometry= new THREE.SphereGeometry(3,64,64)
const material = new THREE.MeshStandardMaterial({
  color:"white",
})
const mesh = new THREE.Mesh(geometry,material)
scene.add(mesh)

//size 
const size = {
  width: window.innerWidth,
  height: window.innerHeight
}

//light
const light =  new THREE.PointLight(0xffffff , 1 ,100)
light.position.set(0,10,10)
scene.add(light)

//camera
const camera = new THREE.PerspectiveCamera(45, size.width/size.height , 0.1 ,100)
camera.position.z = 20
scene.add(camera)


//Renderer
const canvas =  document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(size.width,size.height)
renderer.setPixelRatio(2)
renderer.render(scene,camera)

//controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true 
controls.autoRotateSpeed = 5 


//Resize
window.addEventListener("resize" , () => {
  //update size
  size.width= window.innerWidth
  size.height= window.innerHeight
//update camera
  camera.aspect = size.width / size.height
  camera.updateProjectionMatrix()
  renderer.setSize(size.width,size.height)
})

const loop = () => {
  // mesh.position.x+=0.1
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()




