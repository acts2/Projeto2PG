class Triangulo{
	
	constructor(pontosVista, pontos2d, normaisVertice){
		this.vista = pontosVista;
		this.p2d = pontos2d;
		this.normais = normaisVertice;
		this.mudou = false;
		this.limites = new Array();
	}

	calculaCoordBaricentricas(ponto){
		var coords = new Array();

		var v1 = this.p2d[0];
	    var v2 = this.p2d[1];
		var v3 = this.p2d[2];
		//console.log(v1,v2,v3);

		var A1 = v1.x, A2 = v1.y;
		var B1 = v2.x, B2 = v2.y;
		var C1 = v3.x, C2 = v3.y;

		var x = ponto.x, y = ponto.y;

	
		var a = (B2 - C2)*(x - C1) - (C1 - B1)*(C2 - y);
		//console.log(a);
		var b = (C2 - A2)*(x - C1) - (A1 - C1)*(C2 - y);
		var c = (A2 - B2)*(x - B1) - (B1 - A1)*(B2 - y);

		var aux = (A1 - C1)*(B2 - C2) - (A2 - C2)*(B1 - C1);
		//console.log(aux);	

	

		/*var P1 = ponto.x, P2 = ponto.y;
		//console.log(P1,P2);

		var a = (B2 - C2)*P1 + (C1 - B1)*P2 + (B1*C2 - B2*C1);
		//console.log(""+B2 + "-"+C2+"*"+P1);
		var b = (C2 - A2)*P1 + (A1 - C1)*P2 + (C1*A2 - C2*A1);
		//console.log(b);
		var c = (A2-B2)*P1 + (B1-A1)*P2 + (A1*B2 - A2*B1);
		//console.log(c);

		
		var aux = A1*(B2-C2) + B1*(C2-A2) + C1*(A2-B2);	
		*/

		coords[0] = a/aux;
		coords[1] = b/aux;
		coords[2] = c/aux;

		return coords; //ok


	}

	calculaPLinha(coords){
		var p1 = this.vista[0];
		var p2 = this.vista[1];
		var p3 = this.vista[2];

		var x = coords[0]*p1.x + coords[1]*p1.y + coords[2]*p1.z;
		var y = coords[0]*p2.x + coords[1]*p2.y + coords[2]*p2.z;
		var z = coords[0]*p3.x + coords[1]*p3.y + coords[2]*p3.z;


		var pLinha = new Vetor(x,y,z);

		return pLinha;


	}

	getNormalAprx(coords,pert){

		

		var n1 = adiciona(this.normais[0],pert[0]);
		var n2 = adiciona(this.normais[1],pert[1]);
		var n3 = adiciona(this.normais[2],pert[2]);

	

		let x = coords[0]*n1.x + coords[1]*n1.y + coords[2]*n1.z;
		let y = coords[0]*n2.x + coords[1]*n2.y + coords[2]*n2.z;
		let z = coords[0]*n3.x + coords[1]*n3.y + coords[2]*n3.z;


		var normalA = new Vetor(x,y,z);

		return normalA.normaliza();
	}


/*
  Calcula os limites do poligono
*/
   	calculaLimites() {	

		var v1 = this.p2d[0],
			v2 = this.p2d[1],
			v3 = this.p2d[2];

		var coefs = new Array();

		coefs[0] = ((Math.round(v2.y) - Math.round(v1.y)) / (Math.round(v2.x) - Math.round(v1.x)));
		coefs[1] = ((Math.round(v3.y) - Math.round(v1.y)) / (Math.round(v3.x) - Math.round(v1.x)));
		coefs[2] = ((Math.round(v3.y) - Math.round(v2.y)) / (Math.round(v3.x) - Math.round(v2.x)));

		var maxY = Math.max(v1.y, v2.y, v3.y);

		var Y = [v1.y,maxY];

		var X = [v1.x,v1.x];

		if (Math.abs(v1.y - v2.y) == 0) {
			X[0] = Math.min(v1.x, v2.x);
			X[1] = Math.max(v1.x, v2.x);
			coefs[0] = coefs[2];
		} else if (Math.abs(v1.y - v3.y) == 0) {
			this.mudou = true;
			X[0] = Math.min(v1.x, v3.x);
			X[1] = Math.max(v1.x, v3.x);
			coefs[1] = coefs[2];
		}

		this.limites = [X, Y, coefs];
		return this.limites;
	}

	atualizaLimites(y) {
		if (!this.mudou
			&& (y == Math.round(this.p2d[1].y)
				|| y == Math.round(this.p2d[2].y))) {
			if (Math.abs(y - this.p2d[1].y) == 0) {
				this.limites[2][0] = this.limites[2][2];
			} else {
				this.limites[2][1] = this.limites[2][2];
			}
			this.mudou = true;
		}

		if (this.limites[2][0] != Number.POSITIVE_INFINITY
			&& this.limites[2][0] != Number.NEGATIVE_INFINITY
			&& this.limites[2][0] != 0 && this.limites[2][0] != Number.NaN) {
			this.limites[0][0] += 1 / this.limites[2][0];
		}

		if (this.limites[2][1] != Number.POSITIVE_INFINITY
			&& this.limites[2][1] != Number.NEGATIVE_INFINITY
			&& this.limites[2][1] != 0
			&& this.limites[2][1] != Number.NaN) {
			this.limites[0][1] += 1 / this.limites[2][1];
		}
	}

	orientacao(){
		var v1 = this.p2d[0],
			v2 = this.p2d[1],
			v3 = this.p2d[2];

		var xA = v1.x, yA = v1.y,
			xB = v2.x, yB = v2.y,
			xC = v3.x, yC = v3.y;

		return (xB-xA)*(yC-yA) - (yB-yA)*(xC-xA);
	}

 	isValid() {
		var v1 = this.p2d[0],
			v2 = this.p2d[1],
			v3 = this.p2d[2];
			//console.log(v1,v2);

		if((v1.x == v2.x && v1.y == v2.y  || (v1.x == v3.x && v1.y == v3.y) || (v2.x == v3.x && v2.y == v3.y))){
			return true;
		}else{
		    return false;
		    }//((v1.x == v2.x && v1.y == v2.x) || (v1.x == v3.x && v1.y == v3.y) || (v2.x == v3.x && v2.y == v3.y));
	}


	sortVertices() {
		this.p2d.sort(function(v1, v2){
			return v1.y-v2.y;
		});

		var v1 = this.p2d[0];
		var v2, v3;

		var orient = this.orientacao();

		if (orient < 0) { 
			v2 = this.p2d[1];
			v3 = this.p2d[2];
		} else if (orient > 0) { 
			v2 = this.p2d[2];
			v3 = this.p2d[1];
		} else if (this.p2d[1].x < v1.x && this.p2d[2].x < v1.x) {
			v2 = this.p2d[1];
			v3 = this.p2d[2];
		} else if (this.p2d[1].x > v1.x && this.p2d[2].x > v1.x) {
			v2 = this.p2d[2];
			v3 = this.p2d[1];
		} else if (this.p2d[1].x < this.p2d[2].x) {
			v2 = this.p2d[1];
			v3 = this.p2d[2];
		} else {
			v2 = this.p2d[2];
			v3 = this.p2d[1];
		}

		this.p2d[1] = v2;
		this.p2d[2] = v3;

		//console.log(this.vista[v1.i]);
		var view1 = this.vista[v1.i];
		var view2 = this.vista[v2.i];
		var view3 = this.vista[v3.i];

		this.vista[0] = view1;
		this.vista[1] = view2;
		this.vista[2] = view3;

		var normal1 = this.normais[v1.i];
		var normal2 = this.normais[v2.i];
		var normal3 = this.normais[v3.i];

		this.normais[0] = normal1;
		this.normais[1] = normal2;
		this.normais[2] = normal3;
	}
}



/*var p2d1 = new Vetor(1,2,0);
var p2d2 = new Vetor(-1,2,0);
var p2d3 = new Vetor(3,1,0);

var view1 = new Vetor(2,1,2);
var view2 = new Vetor(1,1,2);
var view3 = new Vetor(2,-1,-3);

var n1 = new Vetor(3,4,1);
var n2 = new Vetor(0,2,1);
var n3 = new Vetor(-1,1,0);

var p2 = [p2d1,p2d2,p2d3];
var view = [view1,view2,view3];
var normal = [n1,n2,n3];

var trian = new Triangulo(view,p2,normal);

console.log();
var co = trian.calculaCoordBaricentricas(new Vetor(0,0,0));
var teste = co[0]+co[1]+co[2];
console.log(teste);*/
//console.log(tri.calculaLimites());
//tri.atualizaLimites();
//console.log(tri.limites);*/
//var t = new Triangulo(tr[0],tr[1],tr[2]);
//console.log(t);

