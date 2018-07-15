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

function multMatriz3x1(mat1,mat2){
	var mult = new Array(mat1.length);
	if(mat2.length>3){
		return;
	}else{
		mult[0] = (mat1[0].x * mat2[0].x) + (mat1[0].y * mat2[0].y) + (mat1[0].z * mat2[0].z );
		mult[1] = (mat1[1].x * mat2[0].x) + (mat1[1].y * mat2[0].y) + (mat1[1].z * mat2[0].z );
		mult[2] = (mat1[2].x * mat2[0].x) + (mat1[2].y * mat2[0].y) + (mat1[2].z * mat2[0].z );

	}

	return mult;
}



// testes
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







