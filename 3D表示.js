// ページの読み込みを待つ
	 window.addEventListener('load', init);

	 function init() {
		 // 処理内容1、2、3〜〜〜

		 // 画面の見えるサイズを指定
		 const width = 1000;
		 const height = 1000;


		 // レンダラーを作成
		 const renderer = new THREE.WebGLRenderer({
			 canvas: document.querySelector('#canvas'),
			 alpha: true
		 });
		 renderer.setPixelRatio(window.devicePixelRatio);
		 renderer.setSize(width, height);

		 renderer.setClearColor(0x0000ff);


		 // シーンを作成
		 const scene = new THREE.Scene();


		 // カメラを作成
		 const camera = new THREE.PerspectiveCamera(45, width / height);
		 //	xyz軸が50
		 // camera.position.set(50, 50, 50);
		 // 原点を見る
		 camera.lookAt(new THREE.Vector3(0, 0, 0));


		 // 箱を作成
		 //	箱の大きさ（横×縦×横）
		 const geometry = new THREE.BoxGeometry(100, 500, 100);
		 const material = new THREE.MeshBasicMaterial({
			 coloe:0xffffff,
			 side:THREE.DoubleSide
		 });
		 const box = new THREE.Mesh(geometry, material);
		 // 箱の位置　（右，上，左）
		 box.position.set(0, -250, 0);
		 scene.add(box);


		 // mikan_3d
		 // mtl
		 const mikan_mtl = new THREE.MTLLoader();
		 mikan_mtl.load("models/mikan3d.mtl", function(materials){
			 materials.preload();

			 // obj
			 var mikan_obj = new THREE.OBJLoader();
			 mikan_obj.setMaterials(materials);

			 mikan_obj.load("models/mikan3d.obj", function(mesh){

				 mesh.scale.set(100,100,100);
				 mesh.position.set(0,0,0);
				 scene.add(mesh);

			 });

		 });


		 // 毎フレーム時に実行されるループイベントです
		 var rot = 0;
		 tick();
		 function tick() {
				 rot += 0.3; // 毎フレーム角度を0.3度ずつ足していく
				 const radian = (rot * Math.PI) / 180;
				 // xz平面にて半径1の円を描くように動作。
				 camera.position.x = 1000 * Math.sin(radian);
				 camera.position.z = 1000 * Math.cos(radian);
				 camera.position.y = 1000 * Math.tan(180);
				 camera.lookAt(new THREE.Vector3(0, 0, 0));//原点を見つめる
				renderer.render(scene, camera); // レンダリング
			 requestAnimationFrame(tick);
		 }
	 }
