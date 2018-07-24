/*
camera.cfg
/---------------------------------------\
| -200 -50 300                          | ; C - Posicao da camera em coordenadas de mundo
| 0.667 0.172 -1                        | ; Vetor N
| 0 3 0                                 | ; Vetor V
| 65 0.5 0.6                            | ; d hx hy
|                                       |
\---------------------------------------/
*/
class Camera{

	constructor(atr){
		this.posicao = atr.pos; //C
	    this.vetorN = atr.N;
	    this.vetorV = atr.V;
	    this.distancia = atr.dist;
	    this.hx = atr.hx;
	    this.hy = atr.hy;
	    this.vetorU = null;
	    this.normalizedN = null;
	    this.normalizedV = null; // e ortogonalizado
	}

	ortogonaliza(){ //Gram-Schimidt

		var proj = projVetores(this.vetorV,this.vetorN);
		var a = this.vetorV.x - proj.x;
		var b = this.vetorV.y - proj.y;
		var c = this.vetorV.z - proj.z;

		let vlinha = new Vetor(a,b,c); //V'

		return vlinha;

	}

	calculaVetorV(){//normalizado e ortogonalizado

		var vlinha = this.ortogonaliza();		
		this.normalizedV = vlinha.normaliza();
		
		return this.normalizedV;

	}

	calculaVetorN(){//normalizado
		this.normalizedN = this.vetorN.normaliza();
		return this.normalizedN;

	}
	calculaVetorU(){

		this.vetorU = produtoVetorial(this.normalizedN,this.normalizedV);

		return this.vetorU;
	}

	getMatriz(){
		var matrix = new Array(3);
		matrix[0] = this.vetorU;
		matrix[1] = this.normalizedV;
		matrix[2] = this.normalizedN;

		return matrix;
	}

}


/*var pos = new Vetor(-200,-50,300);
var N = new Vetor(0.667,0.172,-1);
var V = new Vetor(0,3,0);

var cam = {};
cam['pos'] = pos;
cam['N'] = N;
cam['V'] = V;
cam['dist'] = 65;
cam['hx'] = 0.5;
cam['hy'] = 0.6;

var ca = new Camera(cam);
//console.log(ca.posicao);
//console.log(produtoVetorial(v,n));
//console.log(ca.calculaVetorU());
console.log(ca.calculaVetorN());
console.log(ca.calculaVetorV());
console.log(ca.calculaVetorU());
//console.log(ca.getMatriz());*/








