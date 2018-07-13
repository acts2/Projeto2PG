class Vetor{

	constructor(x,y,z){
		this.x = x;
		this.y = y;
		this.z = z;
	}

	norma(){
		let norm = Math.pow(this.x,2) + Math.pow(this.y,2) + Math.pow(this.z,2);
	    return Math.sqrt(norm);

	}

	multPorEsc(esc){
		let a = this.x * esc;
	    let b = this.y * esc;
		let c = this.z * esc;

		return new Vetor(a,b,c);	

	}

	normaliza(){
		let norm = this.norma();
	    norm = 1/ norm;
	    let a = this.x * norm;
	    let b = this.y * norm;
	    let c = this.z * norm;

	    return new Vetor(a,b,c);

	}

}

function produtoEscalar(vetorA,vetorB){

		return (vetorA.x * vetorB.x) + (vetorA.y * vetorB.y) + (vetorA.z * vetorB.z);
	}

function produtoVetorial(vetA,vetB){
	let a = (vetA.y * vetB.z) - (vetA.z * vetB.y);
	let b = (vetA.z * vetB.x) - (vetA.x * vetB.z);
	let c = (vetA.x * vetB.y) - (vetA.y * vetB.x);

	return new Vetor(a,b,c);
	
}


function projVetores(vetorU,vetorV){ //projeção do vetor u na direção de v

	let esc = (produtoEscalar(vetorU,vetorV)/produtoEscalar(vetorU,vetorU));	

	return  vetorV.multPorEsc(esc);	

}



// testes
var vetA = new Vetor(1,-2,2);
var vetB = new Vetor(-3,6,2);
var vet = produtoVetorial(vetA,vetB);
//var norm = norma(vetA);
var proj = projVetores(vetA,vetB);
//console.log(vet);
//console.log(vetA.norma());
//console.log(vetA.normaliza());

