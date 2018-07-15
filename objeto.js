/*
objeto.byu                                ; pontos do objeto (em coordenadas de mundo) e triangulos
/---------------------------------------\
| 3 1                                   | ; 3 pontos e 1 triangulo
| 50.0000 0.0000 0.000                  | ; ponto 1: P1(50, 0, 0)
| 0 50 0                                | ; ponto 2: P2(0, 50, 0)
| 0 0 50                                | ; ponto 3: P3(0, 0, 50)
| 1 2 3                                 | ; triangulo 1: formado pelos vertices 1, 2 e 3
|                                       |
\---------------------------------------/
*/

class Objeto{

	constructor(atr){
		this.qtdP = atr.qtd[0];
		this.qtdTri = atr.qtd[1];
		this.vertices = atr.vertices;
		this.triangulos = atr.triangles;
		this.triNormais = new Array(this.qtdTri);
		this.verticesNormais = [];
	}

	normalTriangulos(){
		/*
		Para cada triângulo:
		Calcular a normal do triângulo e normalizá-la. Somar ela à normal de cada um dos 3 pontos (vértices do triângulo).
		*/

		for(let i=0;i<this.qtdTri;i++){
			var vix = this.triangulos[i].x;			
			var viy = this.triangulos[i].y;  //pega os indices de cada vertice
			var viz = this.triangulos[i].z;
			//console.log(vix,viy,viz); ok

			var v1 = this.vertices[vix-1];
			var v2 = this.vertices[viy-1];    
			var v3 = this.vertices[viz-1];
			//console.log(v1,v2,v3); ok

			var v1v2 = subtrai(v1,v2);
			//console.log(v1v2); ok
			var v2v3 = subtrai(v2,v3); // não tenho certeza se é v2v3 ou v1v3
			//console.log(v2v3); ok
			this.triNormais[i] = produtoVetorial(v1v2,v2v3); //calcula a normal
			this.triNormais[i] = this.triNormais[i].normaliza();//depois normaliza
		}		

	}

	normalVertices(){
		/*
		A normal de um vértice é calculada somando todas normais dos triângulos que tem esse vértice e
		dividindo pela quantidade de triângulos aos quais o vértice pertence
		*/

		for(var j=0;j<this.qtdP;j++){
			var normalVertice = new Vetor(0,0,0);
			//console.log(normalVertice);
			var qtd = 0;			
			
			for(var i=0;i<this.qtdTri;i++){				
				
				//console.log(normalVertice,j);
				if((this.triangulos[i].x == j+1) || (this.triangulos[i].y ==j+1) || (this.triangulos[i].z == j+1)){
					//console.log(this.triangulos[i].x,this.triangulos[i].y,k);
					normalVertice = adiciona(normalVertice,this.triNormais[i]);
					qtd++;	
					
				}			
			}	
		
			var aux = normalVertice.multPorEsc(1/qtd);
			//console.log(qtd);
			this.verticesNormais.push(aux);

		}


	}

	
}
/*
var p1 = new Vetor(1,2,-2);
var p2 = new Vetor(3,-1,2);
var p3 = new Vetor(-1,3,4);
var p4 = new Vetor(2,2,1);

var vert = [p1,p2,p3,p4];

var t1 = new Vetor(1,2,3);
var t2 = new Vetor(2,1,4);

var tri = [t1,t2];
var qt = [4,2];

var obj = {};
obj['qtd'] = qt;
obj['vertices'] = vert;
obj['triangles'] = tri;

var ob = new Objeto(obj);
ob.normalTriangulos();
ob.normalVertices();
console.log(ob);
*/