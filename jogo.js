 //moonlander. Um jogo de alunissagem.
 //Henrique Carvalho (https://github.com/RickTheBestDev)
//28/03/25
//Versão 0.1.0

 /** @type {HTMLCanvasElement} */

 //sessão de modelagem de dados
 let canvas = document.querySelector("#jogo")
 let contexto = canvas.getContext("2d")

let x
let velocidadeX
let angulo

if(Math.round(Math.random()) == 0){
     x = 100
     velocidadeX = 2
     angulo = Math.PI/2

}else{
    x = 700
    velocidadeX = -2
    angulo = Math.PI/2
}





let moduloLunar = {

    posicao: {

        x: x,
        y: 100
    },
    angulo: -Math.PI/2,
    largura: 20,
    altura: 20,                                                            
    cor: "lightgray",
    motorLigado: false,
    velocidade: {
        x:velocidadeX,
        y:0
    },
    combustivel: 1000, 
    rotacaoAntiHorario: false,
    rotacaoHorario: false
}  

let estrelas = []
for(let i = 0; i < 500; i++){
    estrelas[i] = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        raio: Math.sqrt(Math.random()* 2),
        transprencia:  1.0,
        diminuicao: true,
        razaoDeCintilacao: Math.random() * 0.05
    };
}

function desenharModuloLunar(){
    
    contexto.save()
    contexto.beginPath()
    contexto.translate(moduloLunar.posicao.x, moduloLunar.posicao.y)
    contexto.rotate(moduloLunar.angulo)
    contexto.rect( moduloLunar.largura * -0.5, moduloLunar.altura * -0.5,
         moduloLunar.altura, moduloLunar.altura)
    contexto.fillStyle = moduloLunar.cor
    contexto.fill()
    contexto.closePath()
    
    if(moduloLunar.motorLigado){
    desenharChama()
    
    }

    contexto.restore()

    
}

function desenharChama(){
    contexto.beginPath()
    contexto.moveTo(moduloLunar.largura * -0.5, moduloLunar.altura * 0.5)
    contexto.lineTo(moduloLunar.largura * 0.5, moduloLunar.altura * 0.5)
    //determina o tamanho
    contexto.lineTo(0, moduloLunar.altura * 0.5 + Math.random() * 200)
    //contexto.lineTo(moduloLunar.largura * -0.5, moduloLunar.altura * 0.5)
    contexto.closePath()
    contexto.fillStyle = "orange"
    contexto.fill()
}  

function mostrarVelocidade(){
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "left";
    contexto.textBaseLine = "middle";
    contexto.fillStyle = 'lightgray';
    let velocidade = `velocidade: ${(10*moduloLunar.velocidade.y).toFixed(1)}`;
    contexto.fillText(velocidade, 100, 60);

}

function mostrarCombustivel(){
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "left";
    contexto.textBaseLine = "middle";
    contexto.fillStyle = 'lightgray'; 
    let combustivel = `combustivel: ${((moduloLunar.combustivel/1000) * 100).toFixed(0)}%`;
    contexto.fillText(combustivel, 100, 80);

}

function desenharEstrelas(){
    for(let i = 0; i < estrelas.length; i++){
        let estrela = estrelas[i];
        contexto.beginPath();
        contexto.arc(estrela.x, estrela.y, estrela.raio, 0, 2 * Math.PI);
        contexto.closePath();
        contexto.fillStyle = "rgba(255, 255, 255," + estrela.transparencia +")"
        contexto.fill();
        contexto.restore();
    }
}

function mostrarVelocidadeH(){
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "left";
    contexto.textBaseLine = "middle";
    contexto.fillStyle = 'lightgray';
    let velocidade = `velocidade: ${(10*moduloLunar.velocidade.x).toFixed(1)}`;
    contexto.fillText(velocidade, 400, 60);

}

function mostrarAngulo(){
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "left";
    contexto.textBaseLine = "middle";
    contexto.fillStyle = 'lightgray';
    let angulo = `angulo: ${(moduloLunar.angulo* 180/ Math.PI).toFixed(1)}°`;
    contexto.fillText(angulo, 400, 80);
}

function mostrarAltitude(){
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "left";
    contexto.textBaseLine = "middle";
    contexto.fillStyle = 'lightgray';
    let posicao = `altitude: ${(canvas.height - moduloLunar.posicao.y).toFixed(1)}`;
    contexto.fillText(posicao, 600, 80);
}

function desenhar(){
    contexto.clearRect(0, 0, canvas.width, canvas.height);
    atracaoGravitacional();
    desenharModuloLunar();
    mostrarVelocidade();
    mostrarCombustivel();
    mostrarVelocidadeH()
    mostrarAngulo()
    mostrarAltitude()
    desenharEstrelas()
  if(moduloLunar.posicao.y >= (canvas.height - 0.5 * moduloLunar.altura)){
    
    if(moduloLunar.velocidade.y >= 0.5|| 
        moduloLunar.velocidade.x != 0 ||
         5 < moduloLunar.angulo ||
          moduloLunar.angulo < -5
    
    ){
        
        contexto.font = "bold 60px Arial";
        contexto.textAlign = "left";
        contexto.textBaseLine = "middle";
        contexto.fillStyle = 'red';
            return contexto.fillText("Death 💀", 300, 300);
    }else{
        contexto.font = "bold 60px Arial";
        contexto.textAlign = "left";
        contexto.textBaseLine = "middle";
        contexto.fillStyle = 'yellow';
            return contexto.fillText("Win 🏆",  300, 300); 
    }
  }
  requestAnimationFrame(desenhar); 
}



document.addEventListener("keydown", teclaPressionada) 
function teclaPressionada(evento){
    if(evento.keyCode == 38 && moduloLunar.combustivel > 0){
        moduloLunar.motorLigado = true 
    }else if (evento.keyCode == 39){
        moduloLunar.rotacaoAntiHorario = true

    }else if(evento.keyCode == 37){ 
        moduloLunar.rotacaoHorario = true
    }
                    
                }
            
    
document.addEventListener("keyup", teclaSolta)

function teclaSolta(evento){
    if(evento.keyCode == 38 ){
        moduloLunar.motorLigado = false     
    }else if (evento.keyCode == 39){
        moduloLunar.rotacaoAntiHorario = false
       
    }else if(evento.keyCode == 37){
        moduloLunar.rotacaoHorario = false
       
}
}

function gasto (){
    if(moduloLunar.combustivel > 0){
        moduloLunar.combustivel-=1
    }else{
        moduloLunar.combustivel = 0
        moduloLunar.motorLigado = false
    }

}

let gravidade = 0.03
function atracaoGravitacional(){
    moduloLunar.posicao.x += moduloLunar.velocidade.x
    moduloLunar.posicao.y += moduloLunar.velocidade.y;
    if(moduloLunar.rotacaoAntiHorario){
        moduloLunar.angulo += Math.PI/180
    }else if (moduloLunar.rotacaoHorario){
        moduloLunar.angulo -= Math.PI/180
    

    }if(moduloLunar.motorLigado){
       moduloLunar.velocidade.y -= 0.1 * Math.cos(moduloLunar.angulo)
       moduloLunar.velocidade.x += 0.1* Math.sin(moduloLunar.angulo)
       gasto()
       
    }
    moduloLunar.velocidade.y += gravidade
    
   



}


desenhar();

    
