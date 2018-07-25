/*
Geram-se números
aleatórios para se multiplicar pelos vetores das arestas do triângulo para serem somados à
normal (a perturbação é paralela ao plano do triângulo, por isso se utilizam os vetores das
arestas). Deixar um fator multiplicador arbitrado pelo usuário para controlar o grau de
rugosidade. Calculam-se também os demais vetores (L, V e R) e os substitui na equação do
modelo de iluminação de Phong produzindo a cor do pixel atual.
*/


class Renderiza{

    constructor(camera,objeto,light){
		this.camera = camera;
		this.objeto = objeto;
		this.iluminacao = light;
		this.zBuffer = new Array();		
		this.Height = 480;
		this.Width = Math.round(this.Height * (camera.hx/camera.hy));
		this.contexto = this.context();
	
		
	}





	inicializaZBuffer(){

	/*
	cada posicao do zBuffer corresponde a um pixel na tela
	zBuffer[i][j] -> tela[i][j]
	*/
		for(var i=0;i<this.Width;i++){
			this.zBuffer[i] = new Array();
			
			for(var j=0;j<this.Height;j++){
				this.zBuffer[i][j] = Infinity;
				
			}
		}

		
		


	}
	

	render(){		

		for (let i = 0; i<this.objeto.qtdTri;i++) {
			
			var cadaTriangulo = this.objeto.getTriangulo(i);

			var v2v1 = subtrai(cadaTriangulo.vista[0],cadaTriangulo.vista[1]);
			var v3v2 = subtrai(cadaTriangulo.vista[1],cadaTriangulo.vista[2]);
			var v3v1 = subtrai(cadaTriangulo.vista[0],cadaTriangulo.vista[2]);

			var pe = [v2v1,v3v1,v3v2];

			var rand = getRandom();

			var pert = [pe[0].multPorEsc(rand),pe[1].multPorEsc(rand),pe[2].multPorEsc(rand)];

			
			//console.log(cadaTriangulo,v2v1);
			
			

			cadaTriangulo.sortVertices();
			//console.log(cadaTriangulo);


			
			if (cadaTriangulo.isValid() == true) {
				
				continue;
			}
			
			cadaTriangulo.calculaLimites();
			
			

			for (var y = Math.round(cadaTriangulo.limites[1][0]); y <= Math.round(cadaTriangulo.limites[1][1]); y++) {

				for (var x = Math.round(cadaTriangulo.limites[0][0]); x <= Math.round(cadaTriangulo.limites[0][1]); x++) {
					var pixel = new Vetor(x, y, 0);
					//console.log("aqui também",pixel);

					var coordenadas = cadaTriangulo.calculaCoordBaricentricas(pixel);
					//console.log("testando coordenadas",cadaTriangulo,coordenadas);

					var pLinha = cadaTriangulo.calculaPLinha(coordenadas);					

					if (x >= 0 && y >= 0 && x < this.zBuffer.length && y < this.zBuffer[0].length
							 && pLinha.z > 0 && pLinha.z < this.zBuffer[Math.round(x)][Math.round(y)]) {

						//console.log("cheguei");

						this.zBuffer[Math.round(x)][Math.round(y)] = pLinha.z;
						//console.log(pLinha);

						var pontoNormal = cadaTriangulo.getNormalAprx(coordenadas,pert);	
						//console.log("testando normal",pontoNormal);

						//var pontoNormal = adiciona(pontoNormal,pert[0]);
						//var pontoNormal = adiciona(pontoNormal,pert[1]);
						//var pontoNormal = adiciona(pontoNormal,pert[2]);


						/*if (coordenadas[0]<0.1 || coordenadas[1]<0.1 || coordenadas[2] < 0.1) {
							this.iluminacao.vetDif = new Vetor(10/256,200/256,10/256);
						} else
							if ((coordenadas[0]<0.6 && coordenadas[0]>0.3) || (coordenadas[1]<0.6 && coordenadas[1]>0.3) ||
						(coordenadas[2]<0.6 && coordenadas[2]>0.3)) {
							this.iluminacao.vetDif = new Vetor(10/256,10/256,200/256);
						} else {
							this.iluminacao.vetDif = new Vetor(200/256,10/256,10/256);
						}*/



						
						var cor = this.calculaCor(pLinha, pontoNormal);
						//console.log("sera que eu cheguei aqui");					
						
						colorePonto(x,y,cor,this.contexto);						
							
					}
				}

				cadaTriangulo.atualizaLimites(y);
				
			}				
			
		}	


	}

	/*colore(){
		
		var context = this.context();
		
		for(var i=0;i<this.Width;i++){
			for(var j=0;i<this.Height;i++){
				var cor = this.tela[i][j];
				colorePonto(i,j,cor,context);

			}
		}
	}*/


	calculaCor(pontoVista,pontoNormal){
		

		/*
		iluminacao de phong
		I = Ka*Ia + kd.<N.L>.Od*Ie + ks.<R.V>^n*Ie
		*/
		
		//componente ambiental = ka*ia

		//this.iluminacao.rugosidade = 5;
		var ambiental = componenteAmbiental(this.iluminacao);

		var cor = ambiental;
		

		//L = posicao da luz - ponto (x,y) em coordenadas de vista (pLinha)
		var vetorL = subtrai(pontoVista,this.iluminacao.posicaoLuz);
		vetorL = vetorL.normaliza();
			

		//vetor V = -P'
		var vetorV = inverte(pontoVista);
		vetorV = vetorV.normaliza();
		

		//checa se <N.V> < 0
		pontoNormal = verificaN(pontoNormal,vetorV);
		

		var dotNL = produtoEscalar(vetorL,pontoNormal);
		
	
		//se <N.L> < 0 só tem componente ambiental
		if(dotNL > 0){
			
			var difuso = componenteDifuso(dotNL,this.iluminacao);
			
			cor = adiciona(cor,difuso);
		} 
		//console.log("cor",cor);

		
	
		// R = 2*<L.N>.N - L
		var vetorR = subtrai(vetorL,(pontoNormal.multPorEsc(2*dotNL)));
		vetorR = vetorR.normaliza();
		
		var dotRV = produtoEscalar(vetorR,vetorV);
		//console.log('dotRV',dotRV)
	
		//Se <R.V> < 0 não tem especular 
		if(dotRV > 0){
			
			var especular = componenteEspecular(dotRV,this.iluminacao);
			//console.log('especular',especular);
			cor = adiciona(cor,especular);
		}
		//console.log('cor',cor);

		cor.x = Math.round(verificaCor(cor.x));
		cor.y = Math.round(verificaCor(cor.y));
		cor.z = Math.round(verificaCor(cor.z));
		return cor;

	}

	context(){
		
		var canvas = document.getElementById('canvas');
		var ctx = canvas.getContext('2d');
		ctx.width = this.Width;
		ctx.height = this.Height;
		ctx.fillStyle = 'white';	
		ctx.fillRect(0,0,ctx.width,ctx.height);

		
		return ctx;
	

}

	
}

function componenteAmbiental(iluminacao){

	var ka = iluminacao.coefAmb;
	var ambiental = iluminacao.corAmbiente.multPorEsc(ka);	
	return ambiental;
}

function componenteDifuso(dotNL,iluminacao){
	var dotNLKd = dotNL * iluminacao.constDif;
	//console.log(dotNLKd);

	var multOd = iluminacao.vetDif.multPorEsc(dotNLKd);
	//console.log("testando",multOd,iluminacao.Il);

	var dif = new Vetor(0,0,0);
	dif.x = multOd.x * iluminacao.Il.x;
	dif.y = multOd.y * iluminacao.Il.y; //produto componente a componente
	dif.z = multOd.z * iluminacao.Il.z;
	//console.log(iluminacao.Il);

	return dif;

}

function componenteEspecular(dotRV,iluminacao){
	
	
    var espec = iluminacao.especular * (Math.pow(dotRV ,iluminacao.rugosidade));
    

	var especular = iluminacao.Il.multPorEsc(espec);
	return especular;
}

function verificaCor(cor){
	
	if(cor <= 0){
		cor = 0;
	}else if(cor > 255){
		cor = 255;
	}
	return cor;
}



function verificaN(vetorNormal, vetorV){
	//inverte N se <V.N> < 0
	var dotnv = produtoEscalar(vetorNormal,vetorV);
	if(dotnv < 0){
		vetorNormal = inverte(vetorNormal);
	}

	return vetorNormal;

}

function colorePonto(i,j,cor,ctx){
	
	
	ctx.fillStyle = 'rgb('+cor.x+','+cor.y+','+cor.z+')';
	ctx.fillRect(i,j,1,1);
	
	
}

function getRandom(){
	return Math.floor((Math.random()*50)+1);
}

/*var rand = [getRandom(),getRandom(),getRandom()];
var newV = new Vetor(1,2,3);
var nda= new Vetor(3,4,5);
var k = new Vetor(2,3,4);

var pert = [(newV.multPorEsc(rand[0])),(nda.multPorEsc(rand[1])),(k.multPorEsc(rand[2]))];
console.log(rand,pert);*/


