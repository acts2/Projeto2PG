class Vetor{

	constructor(x,y,z){
		this.x = x;
		this.y = y;
		this.z = z;
	}

}

function produtoEscalar(vetorA,vetorB){

		return (vetorA.x * vetorB.x) + (vetorA.y * vetorB.y) + (vetorA.z * vetorB.z);
	}

function produtoVetorial(vetA,vetB){
	let a = (vetA.y * vetB.z) - (vetA.z * vetB.y);
	let b = (vetA.z * vetB.x) - (vetA.x * vetB.z);
	let c = (vetA.x * vetB.y) - (vetA.y * vetB.x);

	var uxv = new Vetor(a,b,c);
	return uxv;
}

function multPorEsc(vetor,esc){
	let a = vetor.x * esc;
	let b = vetor.y * esc;
	let c = vetor.z * esc;

	var mult = new Vetor(a,b,c);

	return mult;
}


function projVetores(vetorU,vetorV){ //projeção do vetor u na direção de v

	let esc = (produtoEscalar(vetorU,vetorV)/produtoEscalar(vetorU,vetorU));	

	var proj = multPorEsc(vetorV,esc);

	return proj;

}

function norma(vetor){
	norm = Math.pow(vetor.x,2) + Math.pow(vetor.y,2) + Math.pow(vetor.z,2);
	return Math.sqrt(norm);
}


/* testes
var vetA = new Vetor(1,-2,2);
var vetB = new Vetor(-3,6,2);
var vet = produtoVetorial(vetA,vetB);
var norm = norma(vetA);
var proj = projVetores(vetA,vetB);
console.log(vet);
console.log(norm);
console.log(proj);

*/