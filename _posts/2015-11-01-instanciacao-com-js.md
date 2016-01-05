---
layout: post
title:  "Instanciação com JavaScript"
date:   2015-11-25 00:07:31 -0400
tags: [jsbemean]
subtitle: Closure ? Hoisting ? Instanciação usando uma IIFE?
---
#Instanciação com JavaScript  

####Victor Igor

Primeiro de tudo, você deve está se perguntando, *"qual o objetivo desse post ?
Ensinar declarar uma variável no JavaScript ? Vou aprender alguma coisa ? Vai ser importante para mim ?*"

##Resumo

O objetivo não é ensinar a declarar uma variável ou lhe encher de teorias (também não tem como fugir totalmente delas).
Se você realmente quer saber como funciona **JavaScript**, e quer ter uma opinião para defender-la, pra isso não há nada
mais importante que ficar sabendo a fundo o assunto, não é ? Portanto veremos alguns conceitos que muitas 
vezes não sabemos, por acontecer *'escondido'*. 

1. O que é ?
2. Como usa ?
3. Como funciona ?

Hoisting, Closures, Variáveis globais, Variável por parâmetro e instanciação usando uma IIFE, com JavaScript.

##Palavras chaves:

hosting, closures, variáveis, javascript, instancia, escopo

##Hoisting

Não precisa ser um gênio para entender. Muitos que não sabem seu significado pode está pensando 
*"Nossa, deve ser algo difícil!"*, mas na verdade precisa mais de atenção, a linguagem usa e você não tá percebendo, porém pode causar bastante confusão se não souber da sua existência, por ter comportamentos *'ocultos'*. Então o que significa **Hoisting** ? Traduzindo para português, seria *'elevação'*, e isso tem todo sentido no JavaScript. 
Antes de mostrar um exemplo com hoisting, é importante entender como funciona a declaração de uma variável no 
javascript.

{% highlight javascript %}
// Exemplo 1:
function getNome(){
  var nome = "victor";
  return nome;
}//--> victor

function getCachorroNome(){
  var nome = "Calango JR.";
  return nome;
}//--> Calango JR.

{% endhighlight %}

<blockquote class="trivia">
<p><strong class="cabecalho">Exemplo 1</strong>
A palavra reservada <span class="kd-s">var</span> especifica que a variável seja do escopo atual, com isso, usando a variável nome em outras funcoes não irá atrapalhar, pois ela apenas faz parte do seu escopo.</p>
</blockquote>

{% highlight javascript %}
//Exemplo 2:
var cachorro;
function setCachorroNome(){
  cachorro=nome;
}
function modificaNome(){
  cachorro='spike';
  setNomeCachorro("calango");
  modificaNome();
  console.log(cachorro);
  //--> Calango JR.
}
{% endhighlight %}

<blockquote class="trivia">
<p><strong class="cabecalho">Exemplo 2</strong>
Repare que damos um nome de calango, mas a funcao <span class="kd-s">modificaNome( )</span> altera o nome da variável, isso acontece por ela ser uma variável global, um conceito importante que ainda veremos melhor.</p>
</blockquote>

{% highlight javascript %}
//Exemplo 3:
function imprimeCachorro(){
  console.log(cachorro);
}
imprimeCachorro();
//ReferenceError: a is not defined
{% endhighlight %}

O erro acontece pois não declaramos nenhum cachorro, então vamos lá =)

{% highlight javascript %}
//Exemplo 4:
var cachorro = 'dog';
function imprimeCachorro(){
  console.log(cachorro);
  var cachorro='spike';
}
imprimeCachorro();//-->underfine
{% endhighlight %}

Retorna <span class="err-s">underfine</span> por ter uma variável no seu escopo <span class="kd-s">imprimeCachorro( )</span> declarada, porém não instanciada. Você pode tá se perguntando 'Como não foi instanciada se antes da função eu defino o cachorro recebendo <em>dog</em> e dentro da função defino cachorro recebendo <em>spike</em> ?'

A lógica de muitas linguagens seria mostrar 'dog', pois já foi instanciada no topo. Taí um dos porquês que você precisa estudar a linguagem como funciona e não apenas sua sintaxe, JavaScript diferente de algumas linguagens, tem seus comportamentos diferenciado, e se você já estudou C, vai perceber que a sua ação é diferente. E é aí amiguinho que a mágica acontece, a variávei foi 'hoisteada', elevada para o topo. Isso acontece pois o compilador na verdade, declara todas as variáveis, logo que seu código começa a ser compilado.

###Como acontece? ⬇

{% highlight javascript %}
//Exemplo 5:
var cachorro;
//underfine -compilador elevando
cachorro = 'dog'
function imprimeCachorro(){
//var cachorro; compilador elevando
  console.log(cachorro);
  cachorro = 'spike';
}
ImprimeCachorro();//-->underfine
{% endhighlight %}

<blockquote class="trivia">
<p><strong class="cabecalho">Exemplo 5</strong>
Logo depois ele executará a funcao <span class="kd-s">imprimeCachorro( )</span>, e entao ele pula as declarações e começa a executar o <em>console.log(cachorro)</em>, porém não houve nenhuma atribuição ao cachorro dentro do <span class="kd-s">imprimeCachorro( )</span>, já que foi declarada e hoisteada, e com isso ele continuou com o valor <em>underfine</em> e imprimiu.</p>
</blockquote>

Com isso, já sabemos o que significa o underfine quando aparecer.

###A mesma coisa pode ser aplicada para uma função.
{% highlight javascript %}
//Exemplo 6:
function getQualquerValor(){
  function pegaValor(){
    return 0;
  }
  return pegaValor();
  function pegaValor(){
    return 1;
  }
}
var valor  = getQualquerValor();
console.log(valor);//--> 1
{% endhighlight %}

<blockquote class="trivia">
<p><strong class="cabecalho">Exemplo 6</strong>
Acontece que as duas funções <span class="kd-s">pegaValor( )</span> foram jogadas para o topo, e em seguida é retornada a última <span class="kd-s">pegaValor( )</span>, pois ela sobrescreve a primeira.</p>
</blockquote>

###Como acontece ? ⬇

{% highlight javascript %}
//Exemplo 6:
var valor;
//underfine - Elevada para o topo
function getQualquerValor(){
//continua no topo
  function pegaValor(){
  //elevada para o topo
    return 0;
  }
   function pegaValor(){
    return 1;
  }
  return pegaValor();
  //prevalece a última
}
valor  = getQualquerValor(); //--> 1
{% endhighlight %}

###E agora ? Vai ser o mesmo resultado ?
{% highlight javascript %}
//Exemplo 7:
function getQualquerValor(){
  var pegaValor = function(){
    return 0;
  }
  return pegaValor();
  var pegaValor = function(){
    return 1;
  }
}
var valor  = getQualquerValor();
console.log(valor);//--> 0
{% endhighlight %}

Agora cuidado, estamos usando uma funções anônima, com isso a declaração sobe e as funções (atribuição) continuam no mesmo lugar, e assim prevalecendo sempre a de cima.

###Como acontece ? ⬇

{% highlight javascript %}
//Exemplo 8:
var valor;
//underfine - elevada para o topo
function getQualquerValor(){
  var pegaValor = function(){
    return 0;
  }
  return pegaValor();
  var pegaValor = function(){
    return 1;
  }
}
valor  = getQualquerValor();
console.log(valor);//--> 0
{% endhighlight %}
##Closures

Traduzindo closure, podemos dizer que é algo de encerramento, no sentido de guardar, pôr em um lugar fechado. JavaScript não é a única a usar essa poderosa técnica, ela veio das linguagens funcionais, mas que acabou difundindo e implementado em outras linguagens como C#.

### Um exemplo comum ⬇

{% highlight javascript %}
//Exemplo 9:
function somador(n1){
  return function(n2){
  return n1+n2;
  }
}
{% endhighlight %}
Mas cuidado, o <em>somador</em> não é uma closure, e sim o seu valor que retorna.

{% highlight javascript %}
var closureSoma2 = somador(2);
var total  = closureSoma2(5);
console.log(total);//--> 7

{% endhighlight %}
###Outro exemplo ಠ_ಠ  

{% highlight javascript %}
//Exemplo 10:
function mostrarMensagem(){
  var mensagem = "Cuidado, clojure";
  function tela(){
    console.log(mensagem);
  }
  tela();//considerado uma closure
}

{% endhighlight %}

<blockquote class="trivia">
<p><strong class="cabecalho">Exemplo 10</strong>
Note que ao chamar a tela, ele usa a variável <em>mensagem</em>, que está no escopo <span class="kd-s">mostrarMensagem( )</span>, a função de dentro (inner), vai ter o acesso as variaveis da funcao de fora (outer).</p>
</blockquote>

{% highlight javascript %}
var closureSoma2 = somador(2);
var total  = closureSoma2(5);
console.log(total);//--> 7

{% endhighlight %}

###Mais outro exemplo, e se reclamar vem mais outro ლ(ಠ▃ಠლ)

{% highlight javascript %}
//Exemplo 11:
function contar(n){
  var cont = n;
  return{
    incremente:function(){
      cont++;
  //incrementa o valor passado por parametro
  //lembre, ele está no escopo de fora
    },
    get:function(){
      return cont;//pega o valor atual
    }
  }
}
var contador = contar(0);
contador.incremente();
contador.incremente();
console.log(contador.get());//--> 2
{% endhighlight %}

###Na prática ⬇

Primeiro vamos imaginar que precisamos saber quantas vezes o usuário está clicando no botão. Se você entendeu mesmo, não vai querer usar uma variável global pra sair contando, isso só vai te trazer prejuízo na frente.

{% highlight javascript %}
//Exemplo 12:
var butao = document.getElementById('button');
 button.onclick = (function(e){
  cont++;//contando
  if(cont == 1){
    alert("Aguarde um momento");
  }else
    if(cont == 2){
      alert("Eu falei pra esperar!");
    }else
      if(cont == 3){
        alert("Fica na sua quieto e aguarde!"
    }else{
    alert("Chato!");
    }
 };
})();//cria e executa
{% endhighlight %}

<blockquote class="highlight-paragraph pull-in">
	<p class="citacao">"Todos os seres humanos têm três vidas: a pública, a privada, e a secreta."</p>
	Gabriel García Márquez
</blockquote><br>

Não podemos ficar criando variáveis globais, pois elas ficam livre ao longo do código e provavelmente pode-se modificar e trazer dor de cabeça. Através de closure, podemos deixar ela escondida, ou seja, privada. Precisamos usar encapsulamento, um conceito das linguagens orientada a objetos, ora mas JavaScript é orientada a objetos ? NÃO. Porém, todavia, JS é linda, podemos criar um mecanismo de privar uma variável usando closure, e se você prestar bem atenção, não vai ter nenhuma dúvida. Vamos criar um exemplo clássico, um banco onde posso depositar e sacar, claro que quero meu dinheiro privado.

{% highlight javascript %}
//Exemplo 13:
function banco(){
  var saldo = 0;
  var cofre = {};
  function sacar(e){
  if(saldo == 0){
    console.log("Saldo: 0");
    return 0;
  }else if(saldo - e < 0){
 console.log("Saldo insuficiente para o saque");
 return 0;
    }
    saldo = saldo - e;
    console.log("Novo saldo: "+saldo);
    return e;
  }
  function depositar(e){
   saldo += e;
   console.log("Depositado com sucesso!");
  }
   cofre.sacar = sacar;
   cofre.depositar = depositar;
   return cofre;
}
var banco();
p.depositar(100);//Depositado com sucesso!
p.sacar(20);//Novo saldo: 80  
{% endhighlight %}

###Boas práticas: (⌒‿⌒)

Em projetos grande um dos problemas que acontecem muito é o de comportamento, alguns por está conseguindo acessar variáveis que não deviam, vazando escopo, sempre feche o escopo, se organize e não fique criando variáveis globais.

##Variáveis Globais

Falamos bastante sobre não criar variáveis globais, e que isso pode lhe trazer dores de cabeça lá na frente, mas por quê ? Elas podem ser acessadas por qualquer escopo, e possibilitando as chances de você modificar ou usar o mesmo nome.

1.
{% highlight javascript %}
//Exemplo 14:
var mensagem = 'sou global';
function alteraMensagem(){
  var mensagem = 'não sou global';
}
alterarMensagem();
console.log(mensagem);//sou global
{% endhighlight %}
2.
{% highlight javascript %}
//Exemplo 15:
var mensagem = 'sou global';
function alteraMensagem(){
   mensagem = 'modifiquei';
}
alterarMensagem();
console.log(mensagem);//sou global
{% endhighlight %}

<blockquote class="trivia">
<p><strong class="cabecalho">Exemplo 14/15</strong>
Na exemplo 2 a função <em>alteraMensagem</em>, não foi criado nenhuma variável, apenas atribuição, por isso ela modificou, diferente do exemplo 1, onde tem uma palavra reservada <span class="kd-s">var</span>, onde indica uma declaração no escopo atual.</p>
</blockquote>

##Variáveis por parâmetro

É comum demais passarmos parâmetros pela nossas funções, porém no JavaScript não precisamos especificar que tipo de dados vamos receber.

{% highlight javascript %}
//Exemplo 16:
var canguru = 1;
function pular(e){
   canguru += e;
}
pular(4);
console.log(canguru);//--> 5
{% endhighlight %}

Um das coisas curiosas é que ele não verifica nossos argumentos para dar erro de sintaxe. Como por exemplo:⬇

{% highlight javascript %}
//Exemplo 17:
function somar(n1,n2){
  return n1+n2;
}
var resultado = somar(1);
console.log(canguru);//--> NaN
{% endhighlight %}

###Mas por quê ?

Simples, como não foi passado por parâmetro, ela é setada como underfined, e você não pode querer somar um número com <span class="err-s">underfined</span>.

###E quando existe mais parâmetros do que o esperado ?

Sem problemas, vamos ver outro exemplo ٩(͡๏̯͡๏)۶

{% highlight javascript %}
//Exemplo 18:
function multiplica(n1,n2){
  return n1*n2;
}
var num1 = 5;
var num2 = 10;
var num3 = 6;
var total = multiplica(num1, num2, num3);
console.log(total);//--> 50
{% endhighlight %}

Preciso nem explicar o que houve. (ړײ

##Instanciação usando uma IIFE

IIFE é comumente chamado de "fechamento" ou envoltório.

###Por que usar isso ?

Variáveis globais é um enorme risco, onde pode ocorrer colisões de nomes e trazendo grandes consequências e possívelmente um dos problemas mais difícieis de detectar. Com JavaScript é apenas uma questão de adequação, você declara dentro de um escopo local para que ela não fique jogada no escopo global, e claro, nunca esquecer da palavra-chave var, pois sem ela, a variável é global.

{% highlight javascript %}
//Exemplo 19:
function somar(n1,n2){
  return n1+n2;
}
var resultado = somar(1);
console.log(canguru);//--> NaN

{% endhighlight %}

###Mas por quê ?

Simples, como não foi passado por parâmetro, ela é setada como underfined, e você não pode querer somar um número com <span class="err-s">underfined</span>.

Vamos ver outro exemplo ٩(͡๏̯͡๏)۶

{% highlight javascript %}
//Exemplo 20:
var n = 3;
getValor = (function(){
  return e;
}(n));
n = 4;
var valor = getValue();
console.log(valor);//--> 3
{% endhighlight %}

Cuidado ao pensar que seja 4, ele chama logo preservando o contexto e retornando o argumento.

Nesse exemplo sim ⬇ ele é chamado apenas depois da atribuição no n.

{% highlight javascript %}
//melhorando o exemplo 20:
var n, getValue;
n = 1;
getValue =function(){
  return v;
};
n = 2
var valor = getValue();
//perceba que já houve mudança
console.log(valor);//--> 2
{% endhighlight %}

##Conclusão
Dessa forma aprendemos vários conceitos, todos eles são importantes, e alguns possuem até livros específicos como o de Closure: The Definitive Guide, então nunca descarte de sempre estudar.

##Bibliografia

- [Mozilla - Closures](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Closures)
- [W3School - Function Invocation](http://www.w3schools.com/js/js_function_invocation.asp)
- [Eloquente - JavaScript](https://github.com/braziljs/eloquente-javascript)
- [Learning Advanced JS](http://ejohn.org/apps/learn/)
