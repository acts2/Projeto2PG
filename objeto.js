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
		this.pontos2d = new Array(this.qtdP);
	}

	coordView(camera){
		/*
		Para cada ponto do objeto, projete-o para coordenadas de vista, podendo já descartar os pontos em coordenadas de mundo:
		P_objeto_vista = [I]e,alfa * (P_objeto_mundo - C)
		*/
		var matriz = camera.getMatriz();
		for(var i=0;i<this.qtdP;i++){
			pMinusC = subtrai(camera.posicao,this.vertices[i]);
			this.vertices[i] = multMatriz3x1(matriz,pMinusC); //descarta o ponto original

			this.verticesNormais[i] = new Vetor(0,0,0); //inicializa as normais dos vertices com zero
		}
	}

	coor2D(camera){
		/*
		Para cada ponto do objeto, projete-o para coordenadas de tela 2D, sem descartar os pontos em coordenadas de vista 3D:
		// a linha abaixo gera os pontos 2D parametrizados no intervalo [-1, 1]:
		P_objeto_tela = ((d/hx)*(P_objeto_vista.x/P_objeto_vista.z), (d/hy)*(P_objeto_vista.y/P_objeto_vista.z))
		// em seguida parametrizamos os pontos para as dimensões da janela (intervalos [0, width] e [0, height]) ,
		// transformando tudo em inteiro, podendo descartar os pontos gerados no intervalo [-1, 1].
		P_objeto_tela.x = (int)((P_objeto_tela.x + 1) * width / 2)  width == hx
		P_objeto_tela.y = (int)((1 - P_objeto_tela.y) * height / 2) height == hy
		*/

		for(var i=0;i<this.qtdP;i++){
			this.pontos2d[i] = new Vetor(0,0,0);
			this.pontos2d[i].x = (camera.distancia/camera.hx) * (this.vertices[i].x/this.vertices[i].z);
			this.pontos2d[i].y = (camera.distancia/camera.hy) * (this.vertices[i].y/this.vertices[i].z);

			this.pontos2d[i].x = Math.round((this.pontos2d[i].x +1)*(camera.hx/2));
			this.pontos2d[i].y = Math.round((1-this.pontos2d[i].y)*(camera.hy/2));

		}

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

			//somar ela a normal de cada um dos 3 pontos 
			this.verticesNormais[vix] = adiciona(this.verticesNormais[vix],this.triNormais[i]);//normal do vertice que esta em vix
			this.verticesNormais[viy] = adiciona(this.verticesNormais[viy],this.triNormais[i]);
			this.verticesNormais[viz] = adiciona(this.verticesNormais[viz],this.triNormais[i]);
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
				
				
				if((this.triangulos[i].x == j+1) || (this.triangulos[i].y ==j+1) || (this.triangulos[i].z == j+1)){
					
					normalVertice = adiciona(normalVertice,this.triNormais[i]);
					qtd++;	
					
				}			
			}	
		
			var aux = normalVertice.multPorEsc(1/qtd);

			//pq as normais dos vertices ja foram inicializadas no cálculo das normais dos triângulos
			this.verticesNormais[j] = adiciona(this.verticesNormais[j],aux);

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