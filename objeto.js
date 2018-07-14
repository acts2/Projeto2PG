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
		this.triangulo = atr.triangles;
	}

	
}

