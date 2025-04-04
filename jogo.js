 //moonlander. Um jogo de alunissagem.
 //Henrique Carvalho (https://github.com/RickTheBestDev)
//28/03/25
//Versão 0.1.0

 

/** @type {HTMLCanvasElement} */

//Seção de de modelagem de dados
let canvas  = document.querySelector("#jogo");
let contexto = canvas.getContext("2d");

let lancamentoPelaEsquerda = (Math.round(Math.random()) == 0)

let moduloLunar = {
    posicao: {
        x: lancamentoPelaEsquerda ? 100 : 700, 
        y: 100
    },
    angulo: lancamentoPelaEsquerda ? -Math.PI/2 : Math.PI/2,
    largura: 40,
    altura: 40, 
    cor: "white",
    motorLigado: false,
    velocidade:{
        x: lancamentoPelaEsquerda ? 2 : -2, 
        y: 0
    },
    combustivel: 100,
    rotacaoAntiHorario: false,
    rotacaoHorario: false
}

let estrelas = [];

for(let i = 0;i < 500; i++){
    estrelas[i] = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        raio: Math.sqrt(4 * Math.random()),
        brilho: 1.0,
        apagando: true,
        cintilacao: 0.05 * Math.random()
    }
}

const imagemLander = new Image();
imagemLander.src = 'lander.png'



//seção de vizualização
function desenharModuloLunar(){
    contexto.save();
    contexto.beginPath();
    contexto.translate(moduloLunar.posicao.x, moduloLunar.posicao.y);
    contexto.rotate(moduloLunar.angulo);
    contexto.drawImage(imagemLander, -moduloLunar.largura/2, - moduloLunar.altura/2, moduloLunar.largura, moduloLunar.altura)
    //contexto.rect(moduloLunar.largura * -0.5, moduloLunar.altura * -0.5, moduloLunar.largura, moduloLunar.altura);
    //contexto.fillStyle = moduloLunar.cor;
    //contexto.fill();
    contexto.closePath();

    if(moduloLunar.motorLigado){
        desenharChama();
    }

    contexto.restore();
}

function desenharChama(){
    contexto.beginPath();
    contexto.moveTo(moduloLunar.largura * -0.5, moduloLunar.altura * 0.5);
    contexto.lineTo(moduloLunar.largura * 0.5, moduloLunar.altura * 0.5);
    //determina o tamanho da chama
    contexto.lineTo(0, moduloLunar.altura * 0.5 + Math.random() * 100);
    //contexto.lineTo(moduloLunar.largura * -0.5, moduloLunar.altura * 0.5);
    contexto.closePath();
    contexto.fillStyle = "blue";
    contexto.fill();
}
 

function mostrarVelocidadeY(){
    mostrarIndicador(
        `velocidadeY: ${(10 * moduloLunar.velocidade.y).toFixed(2)}`,
        x = 50,
        y = 60
    )
}

function mostrarVelocidadeX(){
    mostrarIndicador(
        mensagem = `velocidadeX: ${(10 * moduloLunar.velocidade.x).toFixed(2)}`,
        x = 50,
        y = 40
    )
}

function mostrarAngulo(){
    mostrarIndicador(
    mensagem = `Angulo: ${(moduloLunar.angulo * 180 /Math.PI).toFixed(0)}°`,
    x = 400,
    y = 40
);
}

function mostrarAltitude(){
    mostrarIndicador(
        mensagem = `altitude: ${(canvas.height - moduloLunar.posicao.y 
                                ).toFixed(0)} m`,
        x = 400,
        y = 60
    )
    
}

function mostrarCombustivel(){
    mostrarIndicador(
        `Combustível: ${(moduloLunar.combustivel/ 100) * 100 .toFixed(0)}%`,
     x = 50,
     y = 80
    )
}

 function gasto(){
    if (moduloLunar.combustivel > 0) {
        moduloLunar.combustivel --;
        }else{
            moduloLunar.combustivel = 0;
            moduloLunar.motorLigado = false;
        }
    }

    function desenharEstrelas(){
        contexto.save()
        for(let i = 0; i < estrelas.length; i++){
        let estrela = estrelas[i];
        contexto.beginPath();
        contexto.arc(estrela.x, estrela.y, estrela.raio, 0, 2 * Math.PI);
        contexto.closePath();
        contexto.fillStyle = `rgba(255, 255, 255, ${estrela.brilho})`;
        contexto.fill();
        if(estrela.apagando){
            estrela.brilho -= estrela.cintilacao;
            if(estrela.brilho <= 0.1){
                estrela.apagando = false;
            }
        } else{
            estrela.brilho += estrela.cintilacao;
            if(estrela.brilho >= 0.95){
                estrela.apagando = true;
            }
        }



        }
        contexto.restore();
    }
function desenhar(){
    //limpar a tela
    contexto.clearRect(0, 0, canvas.width, canvas.height)

    //essa função atualiza a posição do moduloLunar em função da gravidade

    atracaoGravitacional();
    desenharEstrelas();
    mostrarVelocidadeY();
    mostrarVelocidadeX();
    mostrarAngulo();
    mostrarAltitude();
    mostrarCombustivel();
    desenharModuloLunar();
    //esta função repete a execução da função desenhar a cada quadro
    if(moduloLunar.posicao.y >= (canvas.height - 0.5 * moduloLunar.altura)){

    if(moduloLunar.velocidade.y >= 0.5 || 
        Math.abs(moduloLunar.velocidade.x) >= 0.5 || 
        5 < Math.abs(moduloLunar.angulo)
    )
    {
        return MostrarResultado("Se Lascou", "red");
    }else{
        return MostrarResultado("Boa", "blue");
    }
    }
       requestAnimationFrame(desenhar);
}

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


//seção de controle

document.addEventListener("keydown", teclaPressionada)
function teclaPressionada(evento){
    if(evento.keyCode== 38){
        moduloLunar.motorLigado = true;
        gasto();
    } 
    else if(evento.keyCode == 39){
        moduloLunar.rotacaoAntiHorario = true;
    }else if(evento.keyCode == 37){
        moduloLunar.rotacaoHorario = true;
    }
    }

document.addEventListener("keyup", teclaSolta);
    function teclaSolta(evento){
    if(evento.keyCode == 38){
    moduloLunar.motorLigado = false;
    }else if(evento.keyCode == 39){
    moduloLunar.rotacaoAntiHorario = false
  }
  else if(evento.keyCode == 37){
    moduloLunar.rotacaoHorario = false
            }
        }


    let gravidade = 0.03;
    function atracaoGravitacional(){
        moduloLunar.posicao.x += moduloLunar.velocidade.x;
        moduloLunar.posicao.y += moduloLunar.velocidade.y;
        if(moduloLunar.rotacaoAntiHorario){
            moduloLunar.angulo += Math.PI/180;
        }else if(moduloLunar.rotacaoHorario){
            moduloLunar.angulo -= Math.PI/180;
        }

        if(moduloLunar.motorLigado){
            moduloLunar.velocidade.y -= 0.1 * Math.cos(moduloLunar.angulo);
            moduloLunar.velocidade.x += 0.1 * Math.sin(moduloLunar.angulo);
        }

        moduloLunar.velocidade.y += gravidade;

        if(moduloLunar.posicao.y < 10){
            moduloLunar.posicao.y = 10;
            moduloLunar.velocidade.y = 0;

       }if(moduloLunar.posicao.y > 590){
           moduloLunar.posicao.y = 590;
           moduloLunar.velocidade.y = 0; }
        
        
    
    }


desenhar();
    
