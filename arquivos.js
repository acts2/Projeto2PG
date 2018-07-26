
function init(rugosity){  //por enquanto só funciona no edge

	loadFiles()
		.then(function(data){
			var cameraFileContent = data[0];				
			var lightFileContent = data[1];
			//console.log(lightFileContent);
			var objectFileContent = data[2];
			//console.log(objectFileContent);

			var camera = loadCamera(cameraFileContent);
			//console.log(camera);
			var light = loadIluminacao(lightFileContent);
			var object = loadObjeto(objectFileContent);	
			

			light.rugosidade = rugosity;
			//console.log(object);
			
			camera.calculaVetorN();

			camera.calculaVetorV();
			camera.calculaVetorU();	
			

			console.log(camera);

			light.toViewCoord(camera);
			console.log(light);

			object.views(camera);
			//console.log(object);
			object.coord2d(camera);
			
			object.normalTriangulos();
			//object.normalVertices();
			console.log(object);

			var rd = new Renderiza(camera,object,light);
			rd.inicializaZBuffer();
			console.log(rd);


			

			
			rd.render();
			//rd.colore();	



		});

}



function loadFiles(){

	var objectName = document.getElementById('object-file').value;
	var cameraFileName = 'inputs/Cameras/'+ objectName +'.cfg';
	var lightFileName = 'inputs/iluminacao.txt';
	var objectFileName = 'inputs/Objetos/'+ objectName +'.byu';

	return Promise.all([
		requestFile(cameraFileName),
		requestFile(lightFileName),
		requestFile(objectFileName)])
};

var requestFile = function(filename) {

	var request = new XMLHttpRequest();			
	console.info('Requesting ' + filename);
	request.open("GET",filename,true);

	return new Promise(function(resolve,reject) {

		request.onreadystatechange = function() {
			if (request.readyState == 4) {
				if(request.status == 404) {
					console.info(filename + ' não existe');
					reject();
				}
				else {
					resolve(request.responseText);

				}
			}
		};
		request.send();
	});


};


function loadCamera(fileContent){

	var cameraFileLines = fileContent.split('\n');
	//console.log(cameraFileLines);
	var camera = {};
	var lineAttr = [
	    'pos',
		'N',
		'V',
		'distHxHy',
		];		

	for (var i=0; i < cameraFileLines.length; i++) {
		var line = cameraFileLines[i];
		var lineValues = line.split(' ');
		if(lineAttr[i] && lineValues.length === 3) {
			camera[lineAttr[i]] = new Vetor(
				parseFloat(lineValues[0]),
				parseFloat(lineValues[1]),
				parseFloat(lineValues[2])
				);
		}
	}		
		
	camera.dist = camera.distHxHy.x;	
	camera.hx = camera.distHxHy.y;
	camera.hy = camera.distHxHy.z;
	delete camera.distHxHy;

	let cam = new Camera(camera);
	//console.log(cam);	

	return cam;
};

function loadIluminacao(fileContent){

		var lightFileLines = fileContent.split('\n').slice(0,-1);
		//console.log(lightFileLines);
		var light = {};
		var lineAtr = [
			'pos',
			'amb',
			'corAmb',
			'diff',
			'vetDif',
			'espec',
			'cor',
			'rug',
		];

		for (var i=0; i < lightFileLines.length; i++) {
			var line = lightFileLines[i];
			var lineValues = line.split(' ');

			if(lineAtr[i]) {
				if (lineValues.length == 1) {
					light[lineAtr[i]] = parseFloat(lineValues[0]);
				} else {
					light[lineAtr[i]] = new Vetor(
						parseFloat(lineValues[0]),
						parseFloat(lineValues[1]),
						parseFloat(lineValues[2])
					);
				}
			}
		}
		//console.log(light);
		var ilum = new Iluminacao(light);

		return ilum;


}

function loadObjeto(fileContent){
		var objectFileLines = fileContent.split('\n').slice(0,-1);
		//console.log(objectFileLines);
		var object = {};
		var lineAttr = [
			'qtd',
			'vertices',
			'triangles',
		];

		var i = 0;

		var line = objectFileLines[i];
		var lineValues = line.split(' ');
		if(lineAttr[i] == 'qtd' && lineValues.length === 2) {
			
			var verticesQtd = parseInt(lineValues[0]);
			var trianglesQtd = parseInt(lineValues[1]);
			object[lineAttr[i]] = [];
			object[lineAttr[i]].push(verticesQtd);
			object[lineAttr[i]].push(trianglesQtd);

			
			var vS = i+1;
			var vF = i+verticesQtd;

			object.vertices = [];

			while (vS <= vF && objectFileLines[vS] !== undefined) {
				var verticeLine = objectFileLines[vS];
				var vertice = verticeLine.split(' ');
				if(vertice[0] == ""){
					vertice = vertice.slice(1);
				}

				if(vertice.length === 3) {
					var v = new Vetor(
							(parseFloat(vertice[0])),
							(parseFloat(vertice[1])),
							(parseFloat(vertice[2]))
						);
					//console.log(v);
					object.vertices.push(v);
					//console.log(object.vertices);

					vS++;
				} else {
					vS++;
					vF++;
				}
			}

				
			
			if (object.vertices.length !== verticesQtd) {
				return;
			}

			

			
			var tS = vS;			
			var tF = vS+trianglesQtd-1;

			object.triangles = [];

			while (tS <= tF && objectFileLines[tS] !== undefined) {
				var triangleLine = objectFileLines[tS];
				var triangle = triangleLine.split(' ');	
				if(triangle.length > 3){
					triangle = triangle.slice(0,-1);
				}			

				if(triangle.length === 3) {
					var t = new Vetor(
							(parseInt(triangle[0])),
							(parseInt(triangle[1])),
							(parseInt(triangle[2]))
						);
					object.triangles.push(t);
					tS++;
				} else {
					tS++;
					tF++;
				}
			}

			

			if (object.triangles.length !== trianglesQtd) {
				return;
			}
		}


		var obj = new Objeto(object);
		//console.log(obj.triangulos[4].x);
		return obj;

}






