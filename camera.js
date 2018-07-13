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

	constructor(posicao,N,V,dist,hx,hy){
		this.posicao = posicao; //C
	    this.vetorN = N;
	    this.vetorV = V;
	    this.distancia = dist;
	    this.hx = hx;
	    this.hy = hy;
	    this.vetorU = null;
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
		this.vetorV = vlinha.normaliza();
		
		return this.vetorV;

	}

	calculaVetorN(){//normalizado
		this.vetorN = this.vetorN.normaliza();
		return this.vetorN;

	}
	calculaVetorU(){

		this.vetorU = produtoVetorial(this.vetorN,this.vetorV);

		return this.vetorU;
	}


}

var pos = new Vetor(-200,-50,300);
var n = new Vetor(0.667,0.172,-1);
var v = new Vetor(0,3,0);


var cam = new Camera(pos,n,v,65,0.5,0.6);
//console.log(cam.posicao);
//console.log(produtoVetorial(v,n));
//console.log(cam.calculaVetorU());
//console.log(cam.calculaVetorN());
//console.log(cam.calculaVetorV());
//console.log(cam.calculaVetorU());








