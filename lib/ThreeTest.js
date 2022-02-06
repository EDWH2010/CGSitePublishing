
function threeInit(){
    if(THREE.TrackballControls){
        	console.log('TrackballControls class exists');
    }

   		 const disBlock = getTestBlock();
		const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

			const renderer = new THREE.WebGLRenderer();
			renderer.setSize( 500, 500 );
			disBlock.appendChild( renderer.domElement );

			const geometry = new THREE.BoxGeometry();
			const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			const cube = new THREE.Mesh( geometry, material );
			scene.add( cube );

       		 scene.add(new THREE.AmbientLight(0xaa0000));

			camera.position.z = 5;

			function animate() {
				requestAnimationFrame( animate );

				cube.rotation.x += 0.01;
				cube.rotation.y += 0.01;

				renderer.render( scene, camera );
			};

			animate();
}

function getTestBlock(){
    return document.getElementById('threeScene');
}

function create3DObject(){
    
}