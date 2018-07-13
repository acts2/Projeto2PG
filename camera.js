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
class Camera(){

	constructor(posicao,N,V,dist,hx,hy){
		this.posicao = new Vetor(posicao) ;
	    this.vetorN = new Vetor(N);
	    this.vetorV = new Vetor(V);
	    this.distancia = dist;
	    this.hx = hx;
	    this.hy = hy;
	}


}

function ortogonaliza(camera){
	var proj = projVetores(camera.vetorV,camera.vetorN);
	var a = camera.vetorV.x - proj.x;
	var b = camera.vetorV.y - proj.y;
	var c = camera.vetorV.z - proj.z;

	var orto = new Vetor(a,b,c);


	return orto;

}

function VetorU(camera){
	var u = produtoVetorial(camera.vetorV,camera.vetorN);
	return u;
}





