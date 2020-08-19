// ページの読み込みを待つ
	 window.addEventListener('load', init);

	 function init() {
		 // 処理内容1、2、3〜〜〜

		 // 画面の見えるサイズを指定
		 const width = 500;
		 const height = 500;


		 // レンダラーを作成
		 const renderer = new THREE.WebGLRenderer({
			 canvas: document.querySelector('#canvas')
		 });
		 renderer.setPixelRatio(window.devicePixelRatio);
		 renderer.setSize(width, height);


		 // シーンを作成
		 const scene = new THREE.Scene();


		 // カメラを作成
		 const camera = new THREE.PerspectiveCamera(45, width / height);
		 //	xyz軸が50
		 camera.position.set(50, 50, 50);
		 // 原点を見る
		 camera.lookAt(new THREE.Vector3(0, 0, 0));


		 // 箱を作成
		 //	箱の大きさ（横×縦×横）
		 const geometry = new THREE.BoxGeometry(20, 20, 20);
		 const material = new THREE.MeshNormalMaterial();
		 const box = new THREE.Mesh(geometry, material);
		 // 箱の位置　（右，上，左）
		 box.position.set(0, -50, 0);
		 scene.add(box);


		 // mikan_3d
		 // mtl
		 const mikan_mtl = new THREE.MTLLoader();
		 mikan_mtl.load("models/mikan_3d.mtl", function(materials){
			 materials.preload();

			 // obj
			 var mikan_obj = new THREE.OBJLoader();
			 mikan_obj.setMaterials(materials);

			 mikan_obj.load("models/mikan_3d.obj", function(mesh){

				 scene.add(mesh);
				 mesh.position.set(0,0,0);

			 });

		 });


		 // 毎フレーム時に実行されるループイベントです
		 tick();
		 function tick() {
			 box.rotation.y += 0.005;
			 renderer.render(scene, camera); // レンダリング

			 requestAnimationFrame(tick);
		 }
	 }
