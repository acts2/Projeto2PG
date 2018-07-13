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

	constructor(luz,amb,corAmb,constDif,vetDif,espec,fonteLuz,rug){
		this.posicaoLuz = luz;
	    this.ambiente= amb;
		this.corAmbiente = corAmb;
		this.constDif = constDif;
		this.vetDif = vetDif;
		this.especular = espec;
		this.fonteLuz = fonteLuz;
		this.rugosidade = rug;
	}

	
}