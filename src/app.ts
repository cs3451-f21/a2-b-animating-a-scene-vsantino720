// abstract library
import { DrawingCommon } from './common';
import * as THREE from 'three'
import { Vector3 } from 'three';

const ANIMSPEED = 1;

// A class for our application state and functionality
class Drawing extends DrawingCommon {

    constructor (canv: HTMLElement) {
        super (canv)
        // @ts-ignore
        this.ballMesh = this.scene.ballMesh;
        // @ts-ignore
        this.pantherHeadMesh = this.scene.pantherHeadMesh;
    }

    ballMesh: THREE.Mesh;
    pantherHeadMesh: THREE.Mesh;
    /*
	Set up the scene during class construction
	*/
	initializeScene(){
        const objectRoot = new THREE.Group();
        objectRoot.scale.set(0.8, 0.8, 0.8)

        // HeadRoot
        var headRoot = new THREE.Group();

        // Snout
        var snoutRoot = createSnout();
        snoutRoot.position.set(0.4, 0, 0)
        headRoot.add(snoutRoot);

        // Skull
        var geometry : THREE.BufferGeometry = new THREE.SphereGeometry( 0.7, 100, 100 );
        var material = new THREE.MeshPhongMaterial( { color: 0x202020, flatShading: true } );
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(0,0,0);
        mesh.scale.set(1, .95, 1)
        headRoot.add( mesh );

        // Eyes
        var eyeR = createEye();
        eyeR.position.set(0.58, 0.13, -0.3);
        headRoot.add( eyeR );

        var eyeL = createEye();
        eyeL.position.set(0.58, 0.13, 0.3);
        headRoot.add(eyeL);

        // Ear L
        geometry = new THREE.ConeGeometry(2, 2, 5, 10);
        material = new THREE.MeshPhongMaterial( { color: 0x202020, flatShading: true } );
        mesh = new THREE.Mesh( geometry, material );
        
        mesh.scale.set(0.15, 0.15, 0.15)
        mesh.position.set(0, 0.6, 0.4)
        mesh.rotation.set((Math.PI / 8), -(Math.PI / 4), (2 * Math.PI / 4))

        headRoot.add( mesh );

        // Ear R
        geometry = new THREE.ConeGeometry(2, 2, 5, 10);
        material = new THREE.MeshPhongMaterial( { color: 0x202020, flatShading: true } );
        mesh = new THREE.Mesh( geometry, material );
        
        mesh.rotateZ((Math.PI / 2))
        mesh.rotateX((Math.PI/4))
        mesh.rotateY((Math.PI / 4))
        mesh.position.set(0, 0.6, -0.4)
        mesh.scale.set(0.15, 0.15, 0.15)

        headRoot.add( mesh );

        // BodyRoot
        var bodyRoot = new THREE.Group();

        // Torso
        geometry = new THREE.CylinderGeometry(1, 0.75, 2, 10, 10)
        material = new THREE.MeshPhongMaterial( { color: 0x202020, flatShading: true } );
        mesh = new THREE.Mesh( geometry, material );

        mesh.position.set(0,0,0);
        mesh.rotation.set(0, 0, -(Math.PI / 2))
        bodyRoot.add(mesh);

        geometry = new THREE.CylinderGeometry(0.75, 0.75, 1, 10, 10)
        material = new THREE.MeshPhongMaterial( { color: 0x202020, flatShading: true } );
        mesh = new THREE.Mesh( geometry, material );

        mesh.position.set(-1.5,0,0);
        mesh.rotation.set(0, 0, -(Math.PI / 2))
        bodyRoot.add(mesh);

        var geometry : THREE.BufferGeometry = new THREE.SphereGeometry( 1, 100, 100 );
        var material = new THREE.MeshPhongMaterial( { color: 0x202020, flatShading: true } );
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(0.9, -.05, 0);
        bodyRoot.add( mesh );

        var geometry : THREE.BufferGeometry = new THREE.SphereGeometry( 0.75, 100, 100 );
        var material = new THREE.MeshPhongMaterial( { color: 0x202020, flatShading: true } );
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(-2, -.035, 0);
        bodyRoot.add( mesh );

        // Neck
        geometry = new THREE.CylinderGeometry(1, 0.5, 1.5, 10);
        material = new THREE.MeshPhongMaterial( { color: 0x202020, flatShading: true } );
        mesh = new THREE.Mesh( geometry, material );
                
        mesh.position.set(1.5, 0.4, 0)
        mesh.rotateZ(2 * Math.PI / 3)
        
        bodyRoot.add( mesh );

        // Legs

        var legFL = new THREE.Group();
        var legFR = new THREE.Group();
        var legBL = new THREE.Group();
        var legBR = new THREE.Group();

        var ulegFR = createUpperLeg(.5, .2);
        var ulegFL = createUpperLeg(.5, .2);

        legFR.add(ulegFR);
        legFL.add(ulegFL);

        var ulegBR = createUpperLeg(.45, .2);
        ulegBR.rotateZ(-Math.PI / 9)
        ulegBR.rotateX(-Math.PI / 12)
        legBR.add(ulegBR);

        var ulegBL = createUpperLeg(.45, .2);
        ulegBL.rotateZ(-Math.PI / 9)
        ulegBL.rotateX(Math.PI / 12)
        legBL.add(ulegBL);

        var llegFR = createLowerLeg(.2, .1);
        llegFR.position.set(0, -1.45, 0)
        legFR.add(llegFR);

        var llegFL = createLowerLeg(.2, .1);
        llegFL.position.set(0, -1.45, 0)
        legFL.add(llegFL);

        var llegBR = createLowerLeg(.2, .1);
        llegBR.position.set(-0.5, -1.4, 0.4);
        legBR.add(llegBR);

        var llegBL = createLowerLeg(.2, .1);
        llegBL.position.set(-0.5, -1.4, -0.4);
        legBL.add(llegBL);

        legBL.scale.set(1.2, 1.1, 0.75);
        legBR.scale.set(1.2, 1.1, 0.75);
        legFR.scale.set(1, 1, 0.75);
        legFL.scale.set(1, 1, 0.75);

        legFR.position.set(0.9, -0.45, -0.5);
        legFL.position.set(0.9, -0.45, 0.5);
        legBR.position.set(-2.15, -0.25, 0.35);
        legBL.position.set(-2.15, -0.25, -0.35);

        bodyRoot.add(legBL);
        bodyRoot.add(legFR);
        bodyRoot.add(legFL);
        bodyRoot.add(legBR);


        // Tail
        var tailGroup = createTail();
        tailGroup.position.set(-2.6, 0.4, 0)
        bodyRoot.add(tailGroup);
    
        headRoot.position.set(2.5, 1, 0)

        objectRoot.add(headRoot);
        objectRoot.add(bodyRoot);

        // Add Animated Ball
        var geometry : THREE.BufferGeometry = new THREE.SphereGeometry( 0.7, 100, 100 );
        var material = new THREE.MeshPhongMaterial( { color: 0xFF0000, flatShading: true } );
        var mesh = new THREE.Mesh( geometry, material );

        this.scene.add(mesh);

        // @ts-ignore
        this.scene.ballMesh = mesh;
        // @ts-ignore
        this.scene.pantherHeadMesh = headRoot;

        const dirLight1 = new THREE.DirectionalLight( 0xffffff );
		dirLight1.position.set( 1, 1, 1 );
		this.scene.add( dirLight1 );
        
        this.scene.add( objectRoot );
        this.camera.lookAt(new THREE.Vector3())
    }

    animating = false;
    animspeed = ANIMSPEED;
    animStart = 0;
    animEnd = 0;
    animLengthTime = 10000;
    ballStartPos = new THREE.Vector3(8, -2, 0);
    ballEndPos = new THREE.Vector3(3.8, -2, 0);
    headStartRot = new THREE.Vector3(0, 0, 0);
    headEndRot = new THREE.Vector3(0, 0, -Math.PI / 4)
    cameraStartPos = this.camera.position;
    cameraEndPos = new THREE.Vector3(8, 1, 0);
    i1StartTime = 0;
    i1EndTime = 0;
    i1LengthTime = 5000;

	/*
	Update the scene during requestAnimationFrame callback before rendering
	*/
	updateScene(time: DOMHighResTimeStamp){
        if (!this.animating) {
            this.animating = true
            this.animStart = time;
            this.animEnd = this.animStart + this.animLengthTime
            this.i1StartTime = time
            this.i1EndTime = time + this.i1LengthTime
        }
        if (time > this.animEnd) {
            return;
        }
        if (time <= this.i1EndTime && time >= this.i1StartTime) { //First interval
            var t = (time - this.i1StartTime) / this.i1LengthTime;
            this.ballMesh.position.x = this.ballStartPos.x + (this.ballEndPos.x - this.ballStartPos.x) * t;
            this.ballMesh.position.y = this.ballStartPos.y + (this.ballEndPos.y - this.ballStartPos.y) * t;
            this.ballMesh.position.z = this.ballStartPos.z + (this.ballEndPos.z - this.ballStartPos.z) * t;

            this.pantherHeadMesh.rotation.z = this.headStartRot.z + (this.headEndRot.z - this.headStartRot.z) * t;

            this.camera.position.x = this.cameraStartPos.x + (this.cameraEndPos.x - this.cameraStartPos.x) * t;
            this.camera.position.y = this.cameraStartPos.y + (this.cameraEndPos.y - this.cameraStartPos.y) * t;
            this.camera.position.z = this.cameraStartPos.z + (this.cameraEndPos.z - this.cameraStartPos.z) * t;
    
            this.camera.lookAt(new Vector3());
            return;
        } 
        if (time > this.i1EndTime) { // Transition block 
            this.i1StartTime = time;
            this.i1EndTime = this.i1StartTime + this.i1LengthTime;
            var temp = this.ballEndPos;
            this.ballEndPos = this.ballStartPos;
            this.ballStartPos = temp;
            this.headEndRot = this.headStartRot;
            this.headStartRot = this.pantherHeadMesh.rotation.toVector3();
        }
        if (time <= this.i1EndTime && time >= this.i1StartTime) { // Second Interval
            var t = (time - this.i1EndTime) / this.i1LengthTime;
            this.ballMesh.position.x = this.ballStartPos.x + (this.ballEndPos.x - this.ballStartPos.x) * t;
            this.ballMesh.position.y = this.ballStartPos.y + (this.ballEndPos.y - this.ballStartPos.y) * t;
            this.ballMesh.position.z = this.ballStartPos.z + (this.ballEndPos.z - this.ballStartPos.z) * t;

            this.pantherHeadMesh.rotation.z = this.headStartRot.z + (this.headEndRot.z - this.headStartRot.z) * t;

            return;
        } 
        
        var t = (time - this.animStart) / this.animLengthTime;
    }
}

// a global variable for our state.  We implement the drawing as a class, and 
// will have one instance
var myDrawing: Drawing;

// main function that we call below.
// This is done to keep things together and keep the variables created self contained.
// It is a common pattern on the web, since otherwise the variables below woudl be in 
// the global name space.  Not a huge deal here, of course.

function exec() {
    // find our container
    var div = document.getElementById("drawing");

    if (!div) {
        console.warn("Your HTML page needs a DIV with id='drawing'")
        return;
    }

    // create a Drawing object
    myDrawing = new Drawing(div);
}


function createSnout() : THREE.Group {
    var snoutRoot = new THREE.Group();
    var geometry: THREE.BufferGeometry = new THREE.CylinderGeometry( 0.35, 0.65, 1, 15, 30 );
    var material = new THREE.MeshPhongMaterial( { color: 0x202020, flatShading: true } );
    var mesh = new THREE.Mesh( geometry, material );

    mesh.rotation.set(0, 0, -(2 * Math.PI / 3))
    mesh.position.set(0, -0.25 ,0);
    snoutRoot.add( mesh );

    geometry = new THREE.SphereGeometry( 0.25, 30, 30 );
    material = new THREE.MeshPhongMaterial( { color: 0x505050, flatShading: true } );
    mesh = new THREE.Mesh( geometry, material ); 

    mesh.position.set(0.5, -0.45 , 0.15);
    snoutRoot.add( mesh );

    geometry = new THREE.SphereGeometry( 0.25, 30, 30 );
    material = new THREE.MeshPhongMaterial( { color: 0x505050, flatShading: true } );
    mesh = new THREE.Mesh( geometry, material ); 

    mesh.position.set(0.5, -0.45 , -0.15);
    snoutRoot.add( mesh );
    
    geometry = new THREE.SphereGeometry( 0.33, 30, 30 );
    material = new THREE.MeshPhongMaterial( { color: 0x707070, flatShading: true } );
    mesh = new THREE.Mesh( geometry, material ); 

    mesh.position.set(0.35, -0.50 , 0);
    snoutRoot.add( mesh );

    geometry = new THREE.CylinderGeometry(0.2, 0.4, 1, 5, 5);
    material = new THREE.MeshPhongMaterial( { color: 0x303030, flatShading: true } );
    mesh = new THREE.Mesh( geometry, material ); 

    mesh.rotateZ(-(2 * Math.PI / 3));
    mesh.rotateY(0.8 * Math.PI / 8)
    
    mesh.position.set(0.25, -0.13 , 0);
    snoutRoot.add( mesh );
    return snoutRoot;
}

function createEye() : THREE.Group {
    var eyeGroup = new THREE.Group();
    var geometry = new THREE.SphereGeometry( 0.07, 100, 100 );
    var material = new THREE.MeshPhongMaterial( { color: 0xffff00, flatShading: true } );
    var mesh = new THREE.Mesh( geometry, material );

    mesh.position.set(0, 0, 0);
    eyeGroup.add( mesh );

    geometry = new THREE.SphereGeometry( 0.02, 100, 100 );
    material = new THREE.MeshPhongMaterial( { color: 0x000000, flatShading: true } );
    mesh = new THREE.Mesh( geometry, material );

    mesh.position.set(0.058, 0, 0);
    eyeGroup.add( mesh );
    return eyeGroup;
}
function createUpperLeg( topR : number, botR : number) : THREE.Group {
    var legGroup = new THREE.Group();

    //Make leg rotate around the top (where it attaches to torso)
    var geometry = new THREE.CylinderGeometry(topR, botR, 1.5, 20, 20, false);
    var material = new THREE.MeshPhongMaterial( { color: 0x202020, flatShading: true } );
    var mesh = new THREE.Mesh( geometry, material );

    mesh.position.set(0, -0.75, 0);
    legGroup.add(mesh);

    return legGroup;

}

function createLowerLeg(topR: number, botR: number) {
    var legGroup = new THREE.Group();

    //Make leg rotate around the top (where it attaches to torso)
    var geometry : THREE.BufferGeometry = new THREE.CylinderGeometry(topR, botR, 1, 20, 20, false);
    var material = new THREE.MeshPhongMaterial( { color: 0x202020, flatShading: true } );
    var mesh = new THREE.Mesh( geometry, material );

    mesh.position.set(0, -0.5, 0);
    legGroup.add(mesh);

    var geometry : THREE.BufferGeometry = new THREE.SphereGeometry(topR, 20, 20);
    var material = new THREE.MeshPhongMaterial( { color: 0x202020, flatShading: true } );
    var mesh = new THREE.Mesh( geometry, material );

    mesh.position.set(0, 0, 0);
    legGroup.add(mesh);


    geometry = new THREE.BoxGeometry(.5, .15, 4 * botR);
    var material = new THREE.MeshPhongMaterial( { color: 0x202020, flatShading: true } );
    var mesh = new THREE.Mesh( geometry, material );

    mesh.position.set(0.06, -1, 0);
    legGroup.add(mesh);

    return legGroup;
}

function createTail() : THREE.Group {
    var tailGroup = new THREE.Group();
    var geometry : THREE.BufferGeometry = new THREE.TorusGeometry(2, 0.1, 10, 10, 1.5);
    var material = new THREE.MeshPhongMaterial( { color: 0x202020, flatShading: true } );
    var mesh = new THREE.Mesh( geometry, material );

    mesh.rotateY(Math.PI)
    mesh.rotateZ(Math.PI * 1.1)
    mesh.position.set(-1.9, .6, 0);
    
    tailGroup.add(mesh);

    geometry = new THREE.SphereGeometry(0.1, 10, 10);
    material = new THREE.MeshPhongMaterial( { color: 0x202020, flatShading: true } );
    mesh = new THREE.Mesh( geometry, material );

    tailGroup.add(mesh);

    geometry = new THREE.SphereGeometry(0.1, 10, 10);
    material = new THREE.MeshPhongMaterial( { color: 0x202020, flatShading: true } );
    mesh = new THREE.Mesh( geometry, material );

    mesh.position.set(-2.35, -1.35, 0)
    tailGroup.add(mesh);

    return tailGroup;
}


exec()