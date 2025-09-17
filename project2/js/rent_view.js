import * as THREE from 'three';

			import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
			import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
			
			let camera, scene, renderer, controls;

			init();

			async function init() {

                let widthd = window.innerWidth;
			    let heightd = 700;

				camera = new THREE.PerspectiveCamera( 45, widthd / heightd, 0.1, 20 );
				camera.position.z = 2.5;

				// scene

				scene = new THREE.Scene();

				const ambientLight = new THREE.AmbientLight( 0xffffff );
				scene.add( ambientLight );

				const pointLight = new THREE.PointLight( 0xffffff, 15 );
				camera.add( pointLight );
				scene.add( camera );

				// model
				const loader = new FBXLoader();
				loader.load( '3d/car.fbx', function ( object ) {
					object.position.x = -1;
					object.position.y = -0.8;
					object.rotate.x = -1;
					object.scale.setScalar( 0.01 );
					scene.add( object );
				} );

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( widthd, heightd );
				renderer.setAnimationLoop( animate );
				document.getElementById('sub_car').appendChild(renderer.domElement);

				//

				controls = new OrbitControls( camera, renderer.domElement );
				controls.enableDamping = true;
				controls.minDistance = 2;
				controls.maxDistance = 5;

				//

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = 950 / 500;
				camera.updateProjectionMatrix();

				renderer.setSize( 950, 500 );

			}

			function animate() {

				controls.update();

				renderer.render( scene, camera );

			}