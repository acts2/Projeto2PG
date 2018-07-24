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
		this.vert = atr.vertices;
		this.triangulos = atr.triangles;
		this.triNormais = new Array(this.qtdTri);
		this.verticesNormais = [];
		this.pontos2d = new Array(this.qtdP);
	}

	views(camera){
		/*
		Para cada ponto do objeto, projete-o para coordenadas de vista, podendo já descartar os pontos em coordenadas de mundo:
		P_objeto_vista = [I]e,alfa * (P_objeto_mundo - C)
		*/
		var matriz = camera.getMatriz();
		for(var i=0;i<this.qtdP;i++){
			var pMinusC = subtrai(camera.posicao,this.vert[i]);
			this.vert[i] = multMatriz3x1(matriz,pMinusC); //descarta o ponto original
			this.vert.i = i;

			this.verticesNormais[i] = new Vetor(0,0,0); //inicializa as normais dos vertices com zero
		}
		return this.vert;
	}

	coord2d(camera){
		/*
		Para cada ponto do objeto, projete-o para coordenadas de tela 2D, sem descartar os pontos em coordenadas de vista 3D:
		// a linha abaixo gera os pontos 2D parametrizados no intervalo [-1, 1]:
		P_objeto_tela = ((d/hx)*(P_objeto_vista.x/P_objeto_vista.z), (d/hy)*(P_objeto_vista.y/P_objeto_vista.z))
		// em seguida parametrizamos os pontos para as dimensões da janela (intervalos [0, width] e [0, height]) ,
		// transformando tudo em inteiro, podendo descartar os pontos gerados no intervalo [-1, 1].
		P_objeto_tela.x = (int)((P_objeto_tela.x + 1) * width / 2)  width == hx
		P_objeto_tela.y = (int)((1 - P_objeto_tela.y) * height / 2) height == hy
		*/
		let height = 480;
		let width = Math.round(height * (camera.hx/camera.hy));

		for(var i=0;i<this.qtdP;i++){
			this.pontos2d[i] = new Vetor(0,0,0);
			this.pontos2d[i].x = (camera.distancia/camera.hx) * (this.vert[i].x/this.vert[i].z);
			this.pontos2d[i].y = (camera.distancia/camera.hy) * (this.vert[i].y/this.vert[i].z);

			this.pontos2d[i].x = Math.round((this.pontos2d[i].x +1)*(width/2));
			this.pontos2d[i].y = Math.round((1-this.pontos2d[i].y)*(height/2));			

		}


	}
	getTriangulo(indice){
		if(indice<0 || indice >= this.qtdTri){
			return;
		}else{
			var ind = this.triangulos[indice];
			var index = [ind.x,ind.y,ind.z];
		
			var vista = []; // pontos em coordenadas de vista
			var p2d = []; //pontos em coordenadas de tela 2d
			var normais = []; //normais de cada vertice do triangulo
			for(var i=0;i<3;i++){
				let view = this.vert[index[i]];
				vista[i] = new Vetor(view.x,view.y,view.z);

				
				let doisd = this.pontos2d[index[i]];
				p2d[i] = new Vetor(doisd.x,doisd.y,doisd.z);
				p2d[i].i = i;

				let nor = this.verticesNormais[index[i]];
				normais[i] = new Vetor(nor.x,nor.y,nor.z);
			}
		
			var p = new Triangulo(vista,p2d,normais);
			return p;
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
			//console.log(vix,viy,viz); 
			//console.log(this.verticesNormais[viz]);

			var v1 = this.vert[vix-1];
			var v2 = this.vert[viy-1];    
			var v3 = this.vert[viz-1];
			//console.log(v1,v2,v3); ok

			var v1v2 = subtrai(v1,v2);
			//console.log(v1v2); ok
			var v1v3 = subtrai(v1,v3); // não tenho certeza se é v2v3 ou v1v3
			//console.log(v2v3); ok
			this.triNormais[i] = produtoVetorial(v1v2,v1v3); //calcula a normal
			this.triNormais[i] = this.triNormais[i].normaliza();//depois normaliza
			//console.log(this.triNormais[i]);
			//console.log(this.verticesNormais[vix]);

			//somar ela a normal de cada um dos 3 pontos 
			var aux = this.verticesNormais[vix-1];
			
			
			this.verticesNormais[vix-1] = adiciona(aux,this.triNormais[i]).normaliza();//normal do vertice que esta em vix
			//this.verticesNormais[vix-1].normaliza();
			var aux1 = this.verticesNormais[viy-1];
			this.verticesNormais[viy-1] = adiciona(aux1,this.triNormais[i]).normaliza();
			
			var au = this.verticesNormais[viz-1];
			this.verticesNormais[viz-1] = adiciona(au,this.triNormais[i]).normaliza();


			
		}

		for(var x=0;x<this.qtdP;x++){
				this.verticesNormais[x].normaliza();
			}		

	}

	/*normalVertices(){
		/*
		A normal de um vértice é calculada somando todas normais dos triângulos que tem esse vértice e
		dividindo pela quantidade de triângulos aos quais o vértice pertence
		

		for(var j=0;j<this.qtdP;j++){
			var normalVertice = new Vetor(0,0,0);
			//console.log(normalVertice);
			var qtd = 0;			
			
			for(var i=0;i<this.qtdTri;i++){				
				
				
				if((this.triangulos[i].x == j+1) || (this.triangulos[i].y ==j+1) || (this.triangulos[i].z == j+1)){
					
					normalVertice = adiciona(normalVertice,this.triNormais[i]);
					normalVertice = normalVertice.normaliza();
					qtd++;	
					
				}			
			}	
		
			var aux = normalVertice.multPorEsc(1/qtd);
			aux = aux.normaliza();

			//pq as normais dos vertices ja foram inicializadas no cálculo das normais dos triângulos
			this.verticesNormais[j] = adiciona(this.verticesNormais[j],aux);
			this.verticesNormais[j] = this.verticesNormais[j].normaliza();

		}


	}*/

	
}

/*var p1 = new Vetor(1,2,-2);
var p2 = new Vetor(3,-1,2);
var p3 = new Vetor(-1,3,4);
var p4 = new Vetor(2,2,1);

var verti = [p1,p2,p3,p4];

var t1 = new Vetor(1,2,3);
var t2 = new Vetor(2,1,4);

var tri = [t1,t2];
var qt = [4,2];

var obj = {};
obj['qtd'] = qt;
obj['vertices'] = verti;
obj['triangles'] = tri;

var ob = new Objeto(obj);
//console.log(ob.vert)
//console.log(ob.triangulos);
ob.views(ca);
ob.coord2d(ca);
ob.normalTriangulos();
//console.log(ob.getTriangulo(0));

//var t = new Triangulo(tr[0],tr[1],tr[2]);*/

//console.log(t);
//console.log(tr);
//console.log(ob.verticesNormais);
//ob.normalTriangulos();
//ob.normalVertices();
//console.log(ob);*/

