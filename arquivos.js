function init(){

	loadFiles()
		.then(function(data){
			var cameraFileContent = data[0];				
			var lightFileContent = data[1];
			//console.log(lightFileContent);
			var objectFileContent = data[2];

			var camera = loadCamera(cameraFileContent);
			var light = loadIluminacao(lightFileContent);
			var object = loadObjeto(objectFileContent);		


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
					console.info(filename + ' does not exist');
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

}

init();




