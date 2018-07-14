
function init(){  //por enquanto só funciona no edge

	loadFiles()
		.then(function(data){
			var cameraFileContent = data[0];				
			var lightFileContent = data[1];
			//console.log(lightFileContent);
			var objectFileContent = data[2];
			//console.log(objectFileContent);

			var camera = loadCamera(cameraFileContent);
			var light = loadIluminacao(lightFileContent);
			var object = loadObjeto(objectFileContent);	
			//console.log(object);	


		});

}



function loadFiles(){
	var cameraFileName = '../inputs/Cameras/01_Camera.cfg';
	var lightFileName = '../inputs/iluminacao.txt';
	var objectFileName = '../inputs/objeto.byu';

	return Promise.all([
		requestFile(cameraFileName),
		requestFile(lightFileName),
		requestFile(objectFileName)])
};

var requestFile = function(filename,alias,attributes,callback) {

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
				lineValues[0],
				lineValues[1],
				lineValues[2]
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
			'ambColor',
			'diff',
			'vetDif',
			'spec',
			'cor',
			'rug',
		];

		for (var i=0; i < lightFileLines.length; i++) {
			var line = lightFileLines[i];
			var lineValues = line.split(' ');

			if(lineAtr[i]) {
				if (lineValues.length == 1) {
					light[lineAtr[i]] = lineValues[0];
				} else {
					light[lineAtr[i]] = new Vetor(
						lineValues[0],
						lineValues[1],
						lineValues[2]
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
		//console.log(objectFileLines[0]);
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
				var vertice = verticeLine.split(' ').slice(1);
				//console.log(vertice);

				if(vertice.length === 3) {
					object.vertices.push(parseFloat(vertice[0]));
					object.vertices.push(parseFloat(vertice[1]));
					object.vertices.push(parseFloat(vertice[2]));

					vS++;
				} else {
					vS++;
					vF++;
				}
			}

			object.vertices = new Float32Array(object.vertices);

			if (object.vertices.length !== 3*verticesQtd) {
				return;
			}

			//console.log(object.vertices[10]);

			
			var tS = vS;
			var tF = vS+trianglesQtd-1;

			object.triangles = [];

			while (tS <= tF && objectFileLines[tS] !== undefined) {
				var triangleLine = objectFileLines[tS];
				var triangle = triangleLine.split(' ').slice(0,-1);				

				if(triangle.length === 3) {
					object.triangles.push(parseInt(triangle[0]));
					object.triangles.push(parseInt(triangle[1]));
					object.triangles.push(parseInt(triangle[2]));
					tS++;
				} else {
					tS++;
					tF++;
				}
			}

			object.triangles = new Float32Array(object.triangles);

			if (object.triangles.length !== 3*trianglesQtd) {
				return;
			}
		}

		//console.log(object.triangles[0]);

		var obj = new Objeto(object);
		console.log(obj.triangulo[4]);
		return obj;

}

init();




