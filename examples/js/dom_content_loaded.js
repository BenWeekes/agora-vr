var user_seat;
//by default
var room = ''; 
var appid = '';
var max_seats = 4;
var avatar_seat;

const userPositionGroups = {
	1: {
		1: {x: 0, y: 1.425, z: -2.85}
	},
	2: {
		1: {x: -1.25, y: 1.425, z: -2.57},
		2: {x: 1.25, y: 1.425, z: -2.57}
	},
	3: {
		1: {x: -1.74, y: 1.425, z: -2.2},
		2: {x: 0, y: 1.425, z: -2.5}, 
		3: {x: 1.74, y: 1.425, z: -2.2}
	},
	4: {
		1: {x: -1.88, y: 1.4, z: -2.25},
		2: {x: -0.68, y: 1.4, z: -2.5}, 
		3: {x: 0.68, y: 1.4, z: -2.5},
		4: {x: 1.88, y: 1.4, z: -2.25}
	},
	5: {
	    1: {x: -2.16, y: 1.36, z: -1.94},
	    2: {x: -1.25, y: 1.36, z: -2.57}, 
	    3: {x: 0, y: 1.36, z: -2.85},
	    4: {x: 1.25, y: 1.36, z: -2.57}, 
	    5: {x: 2.16, y: 1.36, z: -1.94}	
	}
};
const userVideoSizes = {
	1: 1.8,
	2: 1.8,
	3: 1.8,
	4: 1.7,
	5: 1.6
}


parseURL();

/* enable video streaming if seat parameter in URL */
function toggleVideoStreaming(scene) {	
	let vbg0 = 'false';
	let showLocal = 'false';
	let audio = false;
	let video = false;
	if (user_seat) {
		vbg0 = 'true';
		showLocal = 'true';
		audio = true;
		video = true;
	}
	scene.setAttribute('networked-scene', {
		app: appid,
	    room: `{'name':'${room}', 'vbg0':'${vbg0}', 'showLocal': '${showLocal}'}`,
	    adapter: 'agorartc',
	    audio: audio,
	    video: video,
    });	
	// connect to room after determining if the seat parameter is set in the URL
	//scene.emit('connect');
}

function setPlayerSeatAttr() {
	const player_avatar = document.querySelector("#player_video_avatar");
	player_avatar.setAttribute('seat', user_seat);
}

window.addEventListener('DOMContentLoaded', (event) => {
	const scene = document.querySelector('a-scene');
	setPlayerSeatAttr();
	scene.addEventListener('loaded', ()=>{
		const playerCameraEl = document.querySelector('#player');
		playerCameraEl.setAttribute('camera', 'active', 'true');
		toggleVideoStreaming(scene);

		showTextOnBlackScreen();
		window.addEventListener('click', enterScene);
	});
	const renderer = scene.renderer;

	const desk = document.getElementById('Desk');
	desk.object3D.renderOrder = 0;
	renderer.toneMappingExposure = 3;

	const backScreen = document.getElementById('BackScreen');
    backScreen.addEventListener('model-loaded', (event) => {
    	
    	backscreen_obj = event.target.object3D;
    	const video = document.getElementById('wall-video');
    	const videoTexture = new THREE.VideoTexture( video );

		videoTexture.minFilter = THREE.LinearFilter;
		videoTexture.magFilter = THREE.LinearFilter;
		videoTexture.encoding = THREE.sRGBEncoding;
		videoTexture.format = THREE.RGBAFormat;
		const backscreen_material = new THREE.MeshStandardMaterial( {map: videoTexture, side: THREE.DoubleSide} );
		backscreen_obj.material = backscreen_material;
		video.play();
		videoTexture.dispose();
	});
	const digiFrame5 = document.getElementById('DigiFrame5');
    backScreen.addEventListener('model-loaded', (event) => {
    	
    	digiFrame5_obj = event.target.object3D;
    	const video2 = document.getElementById('wall-video2');
    	const videoTexture2 = new THREE.VideoTexture( video2 );

		videoTexture2.minFilter = THREE.LinearFilter;
		videoTexture2.magFilter = THREE.LinearFilter;
		videoTexture2.encoding = THREE.sRGBEncoding;
		videoTexture2.format = THREE.RGBAFormat;
		const digiFrame5_material = new THREE.MeshStandardMaterial( {map: videoTexture2, side: THREE.DoubleSide} );
		digiFrame5_obj.material = digiFrame5_material;
		video2.play();
		videoTexture2.dispose();
	});	
});
