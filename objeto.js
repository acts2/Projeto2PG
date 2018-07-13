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

	constructor(numP,numT,p1,p2,p3,tri){
		this.numPontos = numP;
		this.numTri = numT;
		this.p1 = p1;
		this.p2 = p2;
		this.p3 = p3;
		this.tri = tri;
	}
	


}