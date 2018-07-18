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

function matrix(vet1,vet2,vet3){
	var mat =  new array();
	mat[0] = vet1;
	mat[1] = vet2;
	mat[2] = vet3;
	return mat;
}

function subtrai(v1,v2){
	var sub = new Vetor((v2.x-v1.x),(v2.y-v1.y),(v2.z-v1.z));
	return sub;
}

function adiciona(v1,v2){
	var add = new Vetor((v1.x+v2.x),(v1.y+v2.y),(v1.z+v2.z));
	return add;
}

function multMatriz3x1(mat1,mat2){ //multiplicacao de matriz 3x3 e 3x1
	var mult = new Array(mat1.length);
	if(mat2.length>3){
		return;
	}else{
		mult[0] = produtoEscalar(mat1[0],mat2);
		mult[1] = produtoEscalar(mat1[1],mat2);
		mult[2] = produtoEscalar(mat1[2],mat2);

	}

	var mult = new Vetor(mult[0],mult[1],mult[2]);
	return mult;
}



/* testes
var vetA = new Vetor(1,-2,2);
var vetB = new Vetor(-3,6,2);
var vetC = new Vetor (1,1,1);
var vet = produtoVetorial(vetA,vetB);
//var norm = norma(vetA);
var proj = projVetores(vetA,vetB);
//vetA = adiciona(vetA,vetB);
//console.log(vetA);
//console.log(adiciona(vetA,vetB));
//console.log(vet);
//console.log(vetA.norma());
//console.log(vetA.normaliza());

var vetD = new Vetor(1,2,2);
var m2 = [vetD];
var m1 = [vetA,vetB,vetC];

console.log(multMatriz3x1(m1,vetD));
*/






