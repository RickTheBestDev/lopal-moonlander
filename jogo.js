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

let lancamentoPelaEsquerda = (Math.round(Math.round())== 0)





let moduloLunar = {

    posicao: {

        x: lancamentoPelaEsquerda ? 100 : 700,
        y: 100
    },
    angulo: lancamentoPelaEsquerda ? -Math.PI/2 : Math.PI/2,
    largura: 20,
    altura: 20,                                                            
    cor: "lightgray",
    motorLigado: false,
    velocidade: {
        x:lancamentoPelaEsquerda ? 2 : 2,
        y:0
    },
    combustivel: 1000, 
    rotacaoAntiHorario: false,
    rotacaoHorario: false
}  

let estrelas = [];

for(let i = 0; i <700 ; i++){
    estrelas[i] = {
        x: Math.random()* canvas.width,
        y: Math.random()* canvas.height,
        raio:2 * Math.random(),
        brilho: 1.0,
        apagando: true,
        cintilacao: 0.05 * Math.random()
    }

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
    
        mostrarIndicador(
            mensagem = `velocidade: ${(moduloLunar.velocidade.y * 180/ Math.PI).toFixed(0)}`,
            x = 100,
            y = 40
    
        )
    }



function mostrarCombustivel(){
        mostrarIndicador(
            mensagem = `combustivel: ${(moduloLunar.combustivel * 180/ Math.PI).toFixed(0)}`,
            x = 100,
            y = 60
    
        )
    }

function desenharEstrelas(){
    contexto.save()
    for(let i = 0; i < estrelas.length; i++){
        let estrela = estrelas[i];
        contexto.beginPath()
        contexto.arc(estrela.x,estrela.y,estrela.raio, 0, 2*Math.PI)
        contexto.closePath()
        contexto.fillStyle = `rgba(255, 255, 255,  ${estrela.brilho} )`;
        contexto.fill()

        if(estrela.apagando){
            estrela.brilho -= estrela.cintilacao;
            if(estrela.brilho <= 0.1){
                estrela.apagando = false;
            }
        }else{
            estrela.brilho += estrela.cintilacao;
            if(estrela.brilho >= 0.95){
                estrela.apagando = true;
            }
        }
    }
    contexto.restore()
}


//function desenharEstrelas(){
   // for(let i = 0; i < estrelas.length; i++){
       // let estrela = estrelas[i];
       // contexto.beginPath();
        //contexto.arc(estrela.x, estrela.y, estrela.raio, 0, 2 * Math.PI);
        //contexto.closePath();
        //contexto.fillStyle = "rgba(255, 255, 255," + estrela.transparencia +")"
        //contexto.fill();
        //contexto.restore();
    //}
//}




function MostrarResultado(mensagem, cor){
    contexto.font = "bold 32px Arial";
    contexto.textAlign = "center";
    contexto.textBaseLine = "middle";
    contexto.fillStyle = cor;
    contexto.fillText(mensagem, 550, 500);
}

function mostrarIndicador(mensagem, x, y){
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "left";
    contexto.textBaseLine = "middle";
    contexto.fillStyle = "lightgray";
    contexto.fillText(mensagem, x, y);
}



function mostrarVelocidadeH(){
    mostrarIndicador(
        mensagem = `velocidadeH: ${(moduloLunar.velocidade.x * 180/ Math.PI).toFixed(0)}`,
        x = 400,
        y = 60

    )
}

function mostrarAngulo(){
    mostrarIndicador(
        mensagem = `angulo: ${(moduloLunar.angulo * 180/ Math.PI).toFixed(0)}°`,
        x = 400,
        y = 40

    )
}


function mostrarAltitude(){
    mostrarIndicador(
        mensagem = `altitude: ${(canvas.height - moduloLunar.posicao.y 
                                ).toFixed(0)}`,
        x = 400,
        y = 100
    )
    
}
    
    
    

function desenhar(){
    contexto.clearRect(0, 0, canvas.width, canvas.height);
    atracaoGravitacional();
    desenharEstrelas()
    desenharModuloLunar();
    mostrarVelocidade();
    mostrarCombustivel();
    mostrarVelocidadeH()
    mostrarAngulo()
    mostrarAltitude()
   
    if(moduloLunar.posicao.y >= (canvas.height - 0.5 * moduloLunar.altura)){

        if(moduloLunar.velocidade.y >= 0.5 || 
            Math.abs(moduloLunar.velocidade.x) >= 0.5 || 
            5 < Math.abs(moduloLunar.angulo)
        )
        {
            return MostrarResultado("death", "red");
        }else{
            return MostrarResultado("win", "yellow");
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

    
