/*
 iluminacao.txt
/---------------------------------------\
| -200 -50 300                          | ; Pl - Posicao da luz em coordenadas de mundo
| 1                                     | ; ka - reflexao ambiental
| 2 2 2                                 | ; Ia - vetor cor ambiental
| 1                                     | ; kd - constante difusa
| 1 1 1                                 | ; Od - vetor difuso
| 0.5                                   | ; ks - parte especular
| 0 255 0                               | ; Il - cor da fonte de luz
| 2                                     | ; n  - constante de rugosidade
|                                       |
\---------------------------------------/
*/

class Iluminacao{

	constructor(atr){
		this.posicaoLuz = atr.pos; //P1
	    this.ambiente= atr.amb;
		this.corAmbiente = atr.corAmb;
		this.constDif = atr.diff;
		this.vetDif = atr.vetDif;
		this.especular = atr.espec;
		this.cor = atr.cor;
		this.rugosidade = atr.rug;
	}

	/*
	Passar a posicao da fonte de luz de coordenadas de mundo para coordenadas de vista, podendo descartar o Pl original:
	Pl_vista = [I]e,alfa * (Pl - C)
	*/
	toViewCoord(camera){
		var matrix = camera.getMatriz(); // estou assumindo que os vetores já estão normalizados
		var p1MinusC = subtrai(camera.posicao,this.posicaoLuz);
		this.posicaoLuz = multMatriz3x1(matrix,p1MinusC);
		return this.posicaoLuz;

	}

	
}