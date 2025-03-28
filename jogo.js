 //moonlander. Um jogo de alunissagem.
 //Henrique Carvalho (https://github.com/RickTheBestDev)
//28/03/25
//Versão 0.1.0

 /** @type {HTMLCanvasElement} */

 //sessão de modelagem de dados
 let canvas = document.querySelector("#jogo")
 let contexto = canvas.getContext("2d")


let moduloLunar = {

    posicao: {

        x: 100,
        y: 100
    },
    angulo: 0,
    largura: 20,
    altura: 20,
    cor: "lightgray",
    motorLigado: false,
    velocidade: {
        x:0,
        y:0
    },
    combustivel: 1000
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
    contexto.textAlign = "center";
    contexto.textBaseLine = "middle";
    contexto.fillStyle = 'lightgray';
    let velocidade = `velocidade: ${(10*moduloLunar.velocidade.y).toFixed(1)}`;
    contexto.fillText(velocidade, 100, 60);

}

function mostrarCombustivel(){
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "center";
    contexto.textBaseLine = "middle";
    contexto.fillStyle = 'lightgray';
    let combustivel = `combustivel: ${(10*moduloLunar.combustivel).toFixed(0)}`;
    contexto.fillText(combustivel, 100, 80);
    

}



function desenhar(){
    contexto.clearRect(0, 0, canvas.width, canvas.height);
    atracaoGravitacional();
    desenharModuloLunar();
    mostrarVelocidade();
    mostrarCombustivel();
  if(moduloLunar.posicao.y >= (canvas.height - 0.5)){
    
    if(moduloLunar.velocidade.y >= 0.5){
        return alert("voce morreu de queda")
    }else{
        return alert("voce conseguiu pousar")
    }
  }
  requestAnimationFrame(desenhar); 
}



document.addEventListener("keydown", teclaPressionada)
function teclaPressionada(evento){
    if(evento.keyCode == 38 ){
        moduloLunar.motorLigado = true 
            
                
            }
                    
                }
            
    
document.addEventListener("keyup", teclaSolta)

function teclaSolta(evento){
    if(evento.keyCode == 38 ){
        moduloLunar.motorLigado = false
        
    }
}

function gasto (){
    if(moduloLunar.combustivel > 0){
        moduloLunar.combustivel-=5
    }else{
        moduloLunar.combustivel = 0
        moduloLunar.motorLigado = false
    }

}

let gravidade = 0.01
function atracaoGravitacional(){
    moduloLunar.posicao.x += moduloLunar.velocidade.x
    moduloLunar.posicao.y += moduloLunar.velocidade.y
    if(moduloLunar.motorLigado){
       moduloLunar.velocidade.y -= 0.02
       gasto()
       
    }
    moduloLunar.velocidade.y += gravidade
    


}


desenhar();

    
