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

<table class="highlighttable">
<tr>
	<td class="linenos" >
	<div class="linenodiv">
	<pre><code class="language-js" data-lang="js" > 1
 2
 3
 4
 5
 6
 7
 8
 9
10
</code></pre></div></td>
<td class="code" >
<div class="highlight" >
<pre>
<span class="c1">// Exemplo 1:</span>
<span class="kd">function</span> <span class="nx">getNome(){</span>
  <span class="kd">var</span> <span class="p">nome = </span><span class="s2">"victor"</span><span class="p">;</span>
  <span class="k">return</span> <span class="p">nome;</span>
<span class="p">}</span><span class="c1">//--> victor</span>

<span class="kd">function</span> <span class="nx">getCachorroNome(){</span>
  <span class="kd">var</span> <span class="p">nome = </span><span class="s2">"Calango JR."</span><span class="p">;</span>
  <span class="k">return</span> <span class="p">nome;</span>
<span class="p">}</span><span class="c1">//--> Calango JR.</span>
</pre>
</div>
</td></tr>
</table>

<blockquote class="trivia">
<p><strong class="cabecalho">Exemplo 1</strong>
A palavra reservada <span class="kd-s">var</span> especifica que a variável seja do escopo atual, com isso, usando a variável nome em outras funcoes não irá atrapalhar, pois ela apenas faz parte do seu escopo.</p>
</blockquote>


<table class="highlighttable">
<tr>
	<td class="linenos" >
	<div class="linenodiv">
	<pre><code class="language-js" data-lang="js" > 1
 2
 3
 4
 5
 6
 7
 8
 9
10
11
12
</code></pre></div></td>
<td class="code" >
<div class="highlight" >
<pre>
<span class="c1">//Exemplo 2:</span>
<span class="kd">var</span> <span class="p">cachorro;</span>
<span class="kd">function</span> <span class="nx">setCachorroNome(){</span>
  <span class="p">cachorro</span><span class="o">=</span><span class="p">nome;</span>
<span class="p">}</span>
<span class="kd">function</span> <span class="nx">modificaNome(){</span>
  <span class="p">cachorro</span><span class="o">=</span><span class="s2">'spike'</span><span class="p">;</span>
  <span class="p">setNomeCachorro("calango");</span>
  <span class="p">modificaNome();</span>
  <span class="p">console.log(cachorro);</span>
  <span class="c1">//--> Calango JR.</span>
<span class="p">}</span>
</pre>
</div>
</td></tr>
</table>

<blockquote class="trivia">
<p><strong class="cabecalho">Exemplo 2</strong>
Repare que damos um nome de calango, mas a funcao <span class="kd-s">modificaNome( )</span> altera o nome da variável, isso acontece por ela ser uma variável global, um conceito importante que ainda veremos melhor.</p>
</blockquote>


<table class="highlighttable">
<tr>
	<td class="linenos" >
	<div class="linenodiv">
	<pre><code class="language-js" data-lang="js" > 1
 2
 3
 4
 5
 6
</code></pre></div></td>
<td class="code" >
<div class="highlight" >
<pre>
<span class="c1">//Exemplo 3:</span>
<span class="kd">function</span> <span class="nx">imprimeCachorro(){</span>
  <span class="p">console.log(cachorro);</span>
<span class="p">}</span>
<span class="p">imprimeCachorro();</span>
<span class="c1">//</span><span class="err">ReferenceError: a is not defined</span>
</pre>
</div>
</td></tr>
</table>

O erro acontece pois não declaramos nenhum cachorro, então vamos lá =)


<table class="highlighttable">
<tr>
	<td class="linenos" >
	<div class="linenodiv">
	<pre><code class="language-js" data-lang="js" > 1
 2
 3
 4
 5
 6
 7
</code></pre></div></td>
<td class="code" >
<div class="highlight" >
<pre>
<span class="c1">//Exemplo 4:</span>
<span class="kd">var</span> <span class="p">cachorro </span><span class="o">=</span><span class="s2">'dog'</span><span class="p">;</span>
<span class="kd">function</span> <span class="nx">imprimeCachorro(){</span>
  <span class="p">console.log(cachorro);</span>
  <span class="kd">var</span> <span class="p">cachorro</span><span class="o">=</span><span class="s2">'spike'</span><span class="p">;</span>
<span class="p">}</span>
<span class="p">imprimeCachorro();</span><span class="c1">//--></span><span class="err">underfine</span>
</pre>
</div>
</td></tr>
</table>

Retorna <span class="err-s">underfine</span> por ter uma variável no seu escopo <span class="kd-s">imprimeCachorro( )</span> declarada, porém não instanciada. Você pode tá se perguntando 'Como não foi instanciada se antes da função eu defino o cachorro recebendo <em>dog</em> e dentro da função defino cachorro recebendo <em>spike</em> ?

A lógica de muitas linguagens seria mostrar 'dog', pois já foi instanciada no topo. Taí um dos porquês que você precisa estudar a linguagem como funciona e não apenas sua sintaxe, JavaScript diferente de algumas linguagens, tem seus comportamentos diferenciado, e se você já estudou C, vai perceber que a sua ação é diferente. E é aí amiguinho que a mágica acontece, a variávei foi 'hoisteada', elevada para o topo. Isso acontece pois o compilador na verdade, declara todas as variáveis, logo que seu código começa a ser compilado.

###Como acontece? ⬇


<table class="highlighttable">
<tr>
	<td class="linenos" >
	<div class="linenodiv">
	<pre><code class="language-js" data-lang="js" > 1
 2
 3
 4
 5
 6
 7
 8
 9
 10
</code></pre></div></td>
<td class="code" >
<div class="highlight" >
<pre>
<span class="c1">//Exemplo 5:</span>
<span class="kd">var</span> <span class="p">cachorro;</span>
<span class="c1">//underfine -compilador elevando</span>
<span class="p">cachorro</span> <span class="o">=</span> <span class="s2">'spike'</span>
<span class="kd">function</span> <span class="nx">imprimeCachorro(){</span>
<span class="c1">//var cachorro; compilador elevando</span>
  <span class="p">console.log(cachorro);</span>
  <span class="p">cachorro</span><span class="o"> = </span><span class="s2">'spike'</span><span class="p">;</span>
}</span>
<span class="p">ImprimeCachorro();</span><span class="c1">//-->underfine</span>
</pre>
</div>
</td></tr>
</table>

<blockquote class="trivia">
<p><strong class="cabecalho">Exemplo 5</strong>
Logo depois ele executará a funcao <span class="kd-s">imprimeCachorro( )</span>, e entao ele pula as declarações e começa a executar o <em>console.log(cachorro)</em>, porém não houve nenhuma atribuição ao cachorro dentro do <span class="kd-s">imprimeCachorro( )</span>, já que foi declarada e hoisteada, e com isso ele continuou com o valor <em>underfine</em> e imprimiu.</p>
</blockquote>

Com isso, já sabemos o que significa o underfine quando aparecer.

###A mesma coisa pode ser aplicada para uma função.

<table class="highlighttable">
<tr>
	<td class="linenos" >
	<div class="linenodiv">
	<pre><code class="language-js" data-lang="js" > 1
 2
 3
 4
 5
 6
 7
 8
 9
 10
 11
 12
</code></pre></div></td>
<td class="code" >
<div class="highlight" >
<pre>
<span class="c1">//Exemplo 6:</span>
<span class="kd">function</span> <span class="nx">getQualquerValor(){</span>
  <span class="kd">function</span> <span class="nx">pegaValor(){</span>
    <span class="k">return</span> <span class="p">0;</span>
  <span class="p">}</span>
  <span class="k">return</span><span class="p"> pegaValor();</span>
  <span class="kd">function</span> <span class="nx">pegaValor(){</span>
    <span class="k">return</span> <span class="p">1;</span>
  <span class="p">}</span>
<span class="p">}</span>
<span class="kd">var</span> <span class="p">valor</span> <span class="o"> = </span><span class="p">getQualquerValor();</span>
<span class="p">console.log(valor);</span><span class="c1">//--> 1</span>
</pre>
</div>
</td></tr>
</table>

<blockquote class="trivia">
<p><strong class="cabecalho">Exemplo 6</strong>
Acontece que as duas funções <span class="kd-s">pegaValor( )</span> foram jogadas para o topo, e em seguida é retornada a última <span class="kd-s">pegaValor( )</span>, pois ela sobrescreve a primeira.</p>
</blockquote>

###Como acontece ? ⬇

<table class="highlighttable">
<tr>
	<td class="linenos" >
	<div class="linenodiv">
	<pre><code class="language-js" data-lang="js" > 1
 2
 3
 4
 5
 6
 7
 8
 9
 10
 11
 12
 13
 14
 15
 16
</code></pre></div></td>
<td class="code" >
<div class="highlight" >
<pre>
<span class="c1">//Exemplo 6:</span>
<span class="kd">var</span> <span class="p">valor;</span>
<span class="c1">//underfine - Elevada para o topo</span>
<span class="kd">function</span> <span class="nx">getQualquerValor(){</span>
<span class="c1">//continua no topo</span>
  <span class="kd">function</span> <span class="nx">pegaValor(){</span>
  <span class="c1">//elevada para o topo</span>
    <span class="k">return</span> <span class="p">0;</span>
  <span class="p">}</span>
   <span class="kd">function</span> <span class="nx">pegaValor(){</span>
    <span class="k">return</span> <span class="p">1;</span>
  <span class="p">}</span>
  <span class="k">return</span><span class="p"> pegaValor();</span>
  <span class="c1">//prevalece a última</span>
<span class="p">}</span>
<span class="p">valor</span> <span class="o"> = </span><span class="p">getQualquerValor();</span> <span class="c1">//--> 1</span>
</pre>
</div>
</td></tr>
</table>

###E agora ? Vai ser o mesmo resultado ?

<table class="highlighttable">
<tr>
	<td class="linenos" >
	<div class="linenodiv">
	<pre><code class="language-js" data-lang="js" > 1
 2
 3
 4
 5
 6
 7
 8
 9
 10
 11
 12
</code></pre></div></td>
<td class="code" >
<div class="highlight" >
<pre>
<span class="c1">//Exemplo 7:</span>
<span class="kd">function</span> <span class="nx">getQualquerValor(){</span>
  <span class="kd">var </span><span class="p">pegaValor</span><span class="0"> = </span><span class="kd">function(){</span>
    <span class="k">return</span> <span class="p">0;</span>
  <span class="p">}</span>
  <span class="k">return</span><span class="p"> pegaValor();</span>
  <span class="kd">var </span><span class="p">pegaValor</span><span class="0"> = </span><span class="p">function(){</span>
    <span class="k">return</span> <span class="p">1;</span>
  <span class="p">}</span>
<span class="p">}</span>
<span class="kd">var</span> <span class="p">valor</span> <span class="o"> = </span><span class="p">getQualquerValor();</span>
<span class="p">console.log(valor);</span><span class="c1">//--> 0</span>
</pre>
</div>
</td></tr>
</table>

Agora cuidado, estamos usando uma funções anônima, com isso a declaração sobe e as funções (atribuição) continuam no mesmo lugar, e assim prevalecendo sempre a de cima.

###Como acontece ? ⬇


<table class="highlighttable">
<tr>
	<td class="linenos" >
	<div class="linenodiv">
	<pre><code class="language-js" data-lang="js" > 1
 2
 3
 4
 5
 6
 7
 8
 9
 10
 11
 12
 13
 14
</code></pre></div></td>
<td class="code" >
<div class="highlight" >
<pre>
<span class="c1">//Exemplo 8:</span>
<span class="kd">var</span> <span class="p">valor;</span>
<span class="c1">//underfine - elevada para o topo</span>
<span class="kd">function</span> <span class="nx">getQualquerValor(){</span>
  <span class="kd">var </span><span class="p">pegaValor</span><span class="0"> = </span><span class="kd">function(){</span>
    <span class="k">return</span> <span class="p">0;</span>
  <span class="p">}</span>
  <span class="k">return</span><span class="p"> pegaValor();</span>
  <span class="kd">var </span><span class="p">pegaValor</span><span class="0"> = </span><span class="p">function(){</span>
    <span class="k">return</span> <span class="p">1;</span>
  <span class="p">}</span>
<span class="p">}</span>
<span class="p">valor</span> <span class="o"> = </span><span class="p">getQualquerValor();</span>
<span class="p">console.log(valor);</span><span class="c1">//--> 0</span>
</pre>
</div>
</td></tr>
</table>

##Closures

Traduzindo closure, podemos dizer que é algo de encerramento, no sentido de guardar, pôr em um lugar fechado. JavaScript não é a única a usar essa poderosa técnica, ela veio das linguagens funcionais, mas que acabou difundindo e implementado em outras linguagens como C#.

### Um exemplo comum ⬇

<table class="highlighttable">
<tr>
	<td class="linenos" >
	<div class="linenodiv">
	<pre><code class="language-js" data-lang="js" > 1
 2
 3
 4
 5
 6
</code></pre></div></td>
<td class="code" >
<div class="highlight" >
<pre>
<span class="c1">//Exemplo 9:</span>
<span class="kd">function </span><span class="p">somador(n1){</span>
  <span class="k">return function</span><span class="p">(n2){</span>
  <span class="k">return</span> <span class="p">n1</span><span class="o">+</span><span class="p">n2;</span>
  <span class="p">}</span>
<span class="p">}</span>
</pre>
</div>
</td></tr>
</table>

Mas cuidado, o <em>somador</em> não é uma closure, e sim o seu valor que retorna.

<table class="highlighttable">
<tr>
	<td class="linenos" >
	<div class="linenodiv">
	<pre><code class="language-js" data-lang="js" > 1
 2
 3
</code></pre></div></td>
<td class="code" >
<div class="highlight" >
<pre>
<span class="kd-s">var </span><span>closureSoma2</span><span class="o"> = </span>somador(2);
<span class="kd-s">var </span><span>total </span><span class="o"> = </span><span class="p">closureSoma2(5);</span>
<span>console.log(total);</span><span class="c1-s">//--> 7</span>
</pre>
</div>
</td></tr>
</table>

###Outro exemplo ಠ_ಠ  

<table class="highlighttable">
<tr>
	<td class="linenos" >
	<div class="linenodiv">
	<pre><code class="language-js" data-lang="js" > 1
 2
 3
 4
 5
 6
 7
 8
</code></pre></div></td>
<td class="code" >
<div class="highlight" >
<pre>
<span class="c1">//Exemplo 10:</span>
<span class="k">function</span><span class="p"> mostrarMensagem(){</span>
  <span class="kd">var</span><span class="p"> mensagem</span><span class="o"> = </span><span class="sc">"Cuidado, clojure"</span><span class="p">;</span>
  <span class="k">function</span><span class="p"> tela(){</span>
    <span class="p">console.log(mensagem);</span>
  <span class="p">}</span>
  <span class="p">tela();</span><span class="c1">//considerado uma closure</span>
<span class="p">}</span>
</pre>
</div>
</td></tr>
</table>

<blockquote class="trivia">
<p><strong class="cabecalho">Exemplo 10</strong>
Note que ao chamar a tela, ele usa a variável <em>mensagem</em>, que está no escopo <span class="kd-s">mostrarMensagem( )</span>, a função de dentro (inner), vai ter o acesso as variaveis da funcao de fora (outer).</p>
</blockquote>

<table class="highlighttable">
<tr>
	<td class="linenos" >
	<div class="linenodiv">
	<pre><code class="language-js" data-lang="js" > 1
 2
 3
</code></pre></div></td>
<td class="code" >
<div class="highlight" >
<pre>
<span class="kd-s">var </span><span>closureSoma2</span><span class="o"> = </span>somador(2);
<span class="kd-s">var </span><span>total </span><span class="o"> = </span><span class="p">closureSoma2(5);</span>
<span>console.log(total);</span><span class="c1-s">//--> 7</span>
</pre>
</div>
</td></tr>
</table>

###Mais outro exemplo, e se reclamar vem mais outro ლ(ಠ▃ಠლ)

<table class="highlighttable">
<tr>
	<td class="linenos" >
	<div class="linenodiv">
	<pre><code class="language-js" data-lang="js" > 1
 2
 3
 4
 5
 6
 7
 8
 9
 10
 11
 12
 13
 14
 15
 16
 17
 18
</code></pre></div></td>
<td class="code" >
<div class="highlight" >
<pre>
<span class="c1">//Exemplo 11:</span>
<span class="k">function </span><span class="p">contar(n){</span>
  <span class="kd">var</span><span class="p"> cont </span><span class="o">= </span><span class="p">n;</span>
  <span class="k">return</span><span class="p">{</span>
    <span class="p">incremente:</span><span class="k">function</span><span class="p">(){</span>
      <span class="p">cont++;</span>
  <span class="c1">//incrementa o valor passado por parametro</span>
  <span class="c1">//lembre, ele está no escopo de fora</span>
    <span class="p">},</span>
    <span class="p">get:</span><span class="k">function</span><span class="p">(){</span>
      <span class="k">return </span><span class="p">cont;</span><span class="c1">//pega o valor atual</span>
    <span class="p">}</span>
  <span class="p">}</span>
<span class="p">}</span>
<span class="kd">var </span><span class="p">contador</span><span class="o"> = </span><span class="p">contar(0);</span>
<span class="p">contador.incremente();</span>
<span class="p">contador.incremente();</span>
<span class="p">console.log(contador.get());</span><span class="c1">//--> 2</span>
</pre>
</div>
</td></tr>
</table>

###Na prática ⬇

Primeiro vamos imaginar que precisamos saber quantas vezes o usuário está clicando no botão. Se você entendeu mesmo, não vai querer usar uma variável global pra sair contando, isso só vai te trazer prejuízo na frente.


<table class="highlighttable">
<tr>
	<td class="linenos" >
	<div class="linenodiv">
	<pre><code class="language-js" data-lang="js" > 1
 2
 3
 4
 5
 6
 7
 8
 9
 10
 11
 12
 13
 14
 15
 16
 17
</code></pre></div></td>
<td class="code" >
<div class="highlight" >
<pre>
<span class="c1">//Exemplo 12:</span>
<span class="kd">var</span><span class="p"> butao</span><span class="o"> = </span><span class="p">document.getElementById(</span><span class="s2">'button'</span><span class="p">);</span>
<span class="p"> button.onclick</span><span class="o"> = </span><span class="p">(</span><span class="k">function</span><span class="p">(e){</span>
  <span class="p">cont++;</span><span class="c1">//contando</span>
  <span class="k">if</span><span class="p">(cont == 1){</span>
    <span class="p">alert(</span><span class="s2">"Aguarde um momento"</span><span class="p">);</span>
  <span class="p">}</span><span class="k">else</span>
    <span class="k">if</span><span class="p">(cont == 2){</span>
      <span class="p">alert(</span><span class="s2">"Eu falei pra esperar!"</span><span class="p">);</span>
    <span class="p">}</span><span class="k">else</span>
      <span class="k">if</span><span class="p">(cont == 3){</span>
        <span class="p">alert(</span><span class="s2">"Fica na sua quieto e aguarde!"</span>
    <span class="p">}</span><span class="k">else</span><span class="p">{</span>
	  <span class="p">alert(</span><span class="s2">"Chato!"</span><span class="p">);</span>
    <span class="p">}</span>
 <span class="p">};</span>
<span class="p">})();</span><span class="c1">//cria e executa</span>
</pre>
</div>
</td></tr>
</table>

<blockquote class="highlight-paragraph pull-in">
	<p class="citacao">"Todos os seres humanos têm três vidas: a pública, a privada, e a secreta."</p>
	Gabriel García Márquez
</blockquote><br>

Não podemos ficar criando variáveis globais, pois elas ficam livre ao longo do código e provavelmente pode-se modificar e trazer dor de cabeça. Através de closure, podemos deixar ela escondida, ou seja, privada. Precisamos usar encapsulamento, um conceito das linguagens orientada a objetos, ora mas JavaScript é orientada a objetos ? NÃO. Porém, todavia, JS é linda, podemos criar um mecanismo de privar uma variável usando closure, e se você prestar bem atenção, não vai ter nenhuma dúvida. Vamos criar um exemplo clássico, um banco onde posso depositar e sacar, claro que quero meu dinheiro privado.


<table class="highlighttable">
<tr>
	<td class="linenos" >
	<div class="linenodiv">
	<pre><code class="language-js" data-lang="js" > 1
 2
 3
 4
 5
 6
 7
 8
 9
 10
 11
 12
 13
 14
 15
 16
 17
 18
 19
 20
 21
 22
 23
 24
 25
 26
 27
 28
</code></pre></div></td>
<td class="code" >
<div class="highlight" >
<pre>
<span class="c1">//Exemplo 13:</span>
<span class="k">function</span><span class="p"> banco(){</span>
  <span class="kd">var</span><span class="p"> saldo</span><span class="o"> = </span><span class="p">0;</span>
  <span class="kd">var</span><span class="p"> cofre</span><span class="o"> = </span><span class="p">{};</span>
  <span class="k">function</span><span class="p"> sacar(e){</span>
  <span class="k">if</span><span class="p">(saldo == 0){</span>
    <span class="p">console.log(</span><span class="s2">"Saldo: 0"</span><span class="p">);</span>
    <span class="k">return </span><span class="p">0;</span>
  <span class="p">}</span><span class="k">else</span> <span class="k">if</span><span class="p">(saldo - e &lt; 0){</span>
 <span class="p">console.log(</span><span class="s2">"Saldo insuficiente para o saque"</span><span class="p">);</span>
 <span class="k">return </span><span class="p">0;</span>
    <span class="p">}</span>
    <span class="p">saldo</span><span class="o"> = </span><span class="p">saldo - e;</span>
    <span class="p">console.log(</span><span class="s2">"Novo saldo: "</span><span class="p">+saldo);</span>
    <span class="k">return </span><span class="p">e;</span>
  <span class="p">}</span>
  <span class="k">function</span><span class="p"> depositar(e){</span>
  <span class="p"> saldo</span><span class="o"> += </span><span class="p">e;</span>
   <span class="p">console.log(</span><span class="s2">"Depositado com sucesso!"</span><span class="p">);</span>
  <span class="p">}</span>
   <span class="p">cofre.sacar</span><span class="o"> = </span><span class="p">sacar;</span>
   <span class="p">cofre.depositar</span><span class="o"> = </span><span class="p">depositar;</span>
   <span class="k">return</span><span class="p"> cofre;</span>
<span class="p">}</span>
<span class="kd">var</span><span class="p"> banco();</span>
<span class="p">p.depositar(100);</span><span class="c1">//Depositado com sucesso!</span>
<span class="p">p.sacar(20);</span><span class="c1">//Novo saldo: 80</span>	
</pre>
</div>
</td></tr>
</table>




###Boas práticas: (⌒‿⌒)

Em projetos grande um dos problemas que acontecem muito é o de comportamento, alguns por está conseguindo acessar variáveis que não deviam, vazando escopo, sempre feche o escopo, se organize e não fique criando variáveis globais.

##Variáveis Globais

Falamos bastante sobre não criar variáveis globais, e que isso pode lhe trazer dores de cabeça lá na frente, mas por quê ? Elas podem ser acessadas por qualquer escopo, e possibilitando as chances de você modificar ou usar o mesmo nome.

1.

<table class="highlighttable">
<tr>
	<td class="linenos" >
	<div class="linenodiv">
	<pre><code class="language-js" data-lang="js" > 1
 2
 3
 4
 5
 6
 7
</code></pre></div></td>
<td class="code" >
<div class="highlight" >
<pre>
<span class="c1">//Exemplo 14:</span>
<span class="kd">var </span><span class="p">mensagem</span><span class="o"> = </span><span class="sc">'sou global'</span><span class="p">;</span>
<span class="k">function</span><span class="p"> alteraMensagem(){</span>
  <span class="kd">var</span><span class="p"> mensagem</span><span class="o"> = </span><span class="sc">'não sou global'</span><span class="p">;</span>
<span class="p">}</span>
<span class="p">alterarMensagem();</span>
<span class="p">console.log(mensagem);</span><span class="c1">//sou global</span>
</pre>
</div>
</td></tr>
</table>
2.

<table class="highlighttable">
<tr>
	<td class="linenos" >
	<div class="linenodiv">
	<pre><code class="language-js" data-lang="js" > 1
 2
 3
 4
 5
 6
 7
</code></pre></div></td>
<td class="code" >
<div class="highlight" >
<pre>
<span class="c1">//Exemplo 15:</span>
<span class="kd">var </span><span class="p">mensagem</span><span class="o"> = </span><span class="sc">'sou global'</span><span class="p">;</span>
<span class="k">function</span><span class="p"> alteraMensagem(){</span>
  <span class="p"> mensagem</span><span class="o"> = </span><span class="sc">'modifiquei'</span><span class="p">;</span>
<span class="p">}</span>
<span class="p">alterarMensagem();</span>
<span class="p">console.log(mensagem);</span><span class="c1">//sou global</span>
</pre>
</div>
</td></tr>
</table>


<blockquote class="trivia">
<p><strong class="cabecalho">Exemplo 14/15</strong>
Na exemplo 2 a função <em>alteraMensagem</em>, não foi criado nenhuma variável, apenas atribuição, por isso ela modificou, diferente do exemplo 1, onde tem uma palavra reservada <span class="kd-s">var</span>, onde indica uma declaração no escopo atual.</p>
</blockquote>

##Variáveis por parâmetro

É comum demais passarmos parâmetros pela nossas funções, porém no JavaScript não precisamos especificar que tipo de dados vamos receber.

<table class="highlighttable">
<tr>
	<td class="linenos" >
	<div class="linenodiv">
	<pre><code class="language-js" data-lang="js" > 1
 2
 3
 4
 5
 6
 7
</code></pre></div></td>
<td class="code" >
<div class="highlight" >
<pre>
<span class="c1">//Exemplo 16:</span>
<span class="kd">var </span><span class="p">canguru</span><span class="o"> = </span><span class="p">1</span><span class="p">;</span>
<span class="k">function</span><span class="p"> pular(e){</span>
  <span class="p"> canguru</span><span class="o"> += </span><span class="p">e;</span>
<span class="p">}</span>
<span class="p">pular(4);</span>
<span class="p">console.log(canguru);</span><span class="c1">//--> 5</span>
</pre>
</div>
</td></tr>
</table>

Um das coisas curiosas é que ele não verifica nossos argumentos para dar erro de sintaxe. Como por exemplo:⬇

<table class="highlighttable">
<tr>
	<td class="linenos" >
	<div class="linenodiv">
	<pre><code class="language-js" data-lang="js" > 1
 2
 3
 4
 5
 6
</code></pre></div></td>
<td class="code" >
<div class="highlight" >
<pre>
<span class="c1">//Exemplo 17:</span>
<span class="k">function</span><span class="p"> somar(n1,n2){</span>
  <span class="k">return </span><span class="p">n1+n2;</span>
<span class="p">}</span>
<span class="kd">var</span><span class="p"> resultado</span><span class="o"> = </span><span class="p">somar(1);</span>
<span class="p">console.log(canguru);</span><span class="c1">//--> NaN</span>
</pre>
</div>
</td></tr>
</table>

###Mas por quê ?

Simples, como não foi passado por parâmetro, ela é setada como underfined, e você não pode querer somar um número com <span class="err-s">underfined</span>.

###E quando existe mais parâmetros do que o esperado ?

Sem problemas, vamos ver outro exemplo ٩(͡๏̯͡๏)۶

<table class="highlighttable">
<tr>
	<td class="linenos" >
	<div class="linenodiv">
	<pre><code class="language-js" data-lang="js" > 1
 2
 3
 4
 5
 6
 7
 8
 9
</code></pre></div></td>
<td class="code" >
<div class="highlight" >
<pre>
<span class="c1">//Exemplo 18:</span>
<span class="k">function</span><span class="p"> multiplica(n1,n2){</span>
  <span class="k">return </span><span class="p">n1*n2;</span>
<span class="p">}</span>
<span class="kd">var</span><span class="p"> num1</span><span class="o"> = </span><span class="p">5;</span>
<span class="kd">var</span><span class="p"> num2</span><span class="o"> = </span><span class="p">10;</span>
<span class="kd">var</span><span class="p"> num3</span><span class="o"> = </span><span class="p">6;</span>
<span class="kd">var</span><span class="p"> total</span><span class="o"> = </span><span class="p">multiplica(num1, num2, num3);</span>
<span class="p">console.log(total);</span><span class="c1">//--> 50</span>
</pre>
</div>
</td></tr>
</table>
Preciso nem explicar o que houve. (ړײ

##Instanciação usando uma IIFE

IIFE é comumente chamado de "fechamento" ou envoltório.

###Por que usar isso ?

Variáveis globais é um enorme risco, onde pode ocorrer colisões de nomes e trazendo grandes consequências e possívelmente um dos problemas mais difícieis de detectar. Com JavaScript é apenas uma questão de adequação, você declara dentro de um escopo local para que ela não fique jogada no escopo global, e claro, nunca esquecer da palavra-chave var, pois sem ela, a variável é global.

<table class="highlighttable">
<tr>
	<td class="linenos" >
	<div class="linenodiv">
	<pre><code class="language-js" data-lang="js" > 1
 2
 3
 4
 5
 6
</code></pre></div></td>
<td class="code" >
<div class="highlight" >
<pre>
<span class="c1">//Exemplo 19:</span>
<span class="k">function</span><span class="p"> somar(n1,n2){</span>
  <span class="k">return </span><span class="p">n1+n2;</span>
<span class="p">}</span>
<span class="kd">var</span><span class="p"> resultado</span><span class="o"> = </span><span class="p">somar(1);</span>
<span class="p">console.log(canguru);</span><span class="c1">//--> NaN</span>
</pre>
</div>
</td></tr>
</table>

###Mas por quê ?

Simples, como não foi passado por parâmetro, ela é setada como underfined, e você não pode querer somar um número com <span class="err-s">underfined</span>.

###E quando existe mais parâmetros do que o esperado ?

Sem problemas, vamos ver outro exemplo ٩(͡๏̯͡๏)۶

<table class="highlighttable">
<tr>
	<td class="linenos" >
	<div class="linenodiv">
	<pre><code class="language-js" data-lang="js" > 1
 2
 3
 4
</code></pre></div></td>
<td class="code" >
<div class="highlight" >
<pre>
<span class="c1">//Exemplo 20:</span>
<span class="k">function</span><span class="p"> qualquer(){</span>
  <span class="kd">var</span><span class="p"> cavalo</span><span class="o"> = </span><span class="sc">'marrom'</span><span class="p">;</span>
<span class="p">}</span>
</pre>
</div>
</td></tr>
</table>

<table class="highlighttable">
<tr>
	<td class="linenos" >
	<div class="linenodiv">
	<pre><code class="language-js" data-lang="js" > 1
 2
 3
 4
 5
 6
 7
</code></pre></div></td>
<td class="code" >
<div class="highlight" >
<pre><span class="kd">var</span><span class="p"> n</span><span class="o"> = </span><span class="p">3;</span>
<span class="p">getValor</span><span class="o"> = </span><span class="p">(</span><span class="k">function</span><span class="p">(){</span>
  <span class="k">return</span><span class="p"> e;</span>
<span class="p">}(n));</span>
<span class="p">n</span><span class="o"> = </span><span class="p">4</span>
<span class="kd">var</span><span class="p"> valor</span><span class="o"> = </span><span class="p">getValue();</span>
<span class="p">console.log(valor);</span><span class="c1">//--> 3</span>
</pre>
</div>
</td></tr>
</table>

Cuidado ao pensar que seja 4, ele chama logo preservando o contexto e retornando o argumento.

Nesse exemplo sim ⬇ ele é chamado apenas depois da atribuição no n.

<table class="highlighttable">
<tr>
	<td class="linenos" >
	<div class="linenodiv">
	<pre><code class="language-js" data-lang="js" > 1
 2
 3
 4
 5
 6
 7
 8
 9
 10
</code></pre></div></td>
<td class="code" >
<div class="highlight" >
<pre>
<span class="c1">//melhorando o exemplo 20:</span>
<span class="kd">var</span><span class="p"> n, getValue;</span>
<span class="p">n</span><span class="o"> = </span><span class="p">1;</span>
<span class="p">getValue</span><span class="o"> =</span><span class="k">function</span><span class="p">(){</span>
  <span class="k">return</span><span class="p"> v;</span>
<span class="p">};</span>
<span class="p">n</span><span class="o"> = </span><span class="p">2</span>
<span class="kd">var</span><span class="p"> valor</span><span class="o"> = </span><span class="p">getValue();</span>
<span class="c1">//perceba que já houve mudança</span>
<span class="p">console.log(valor);</span><span class="c1">//--> 2</span>
</pre>
</div>
</td></tr>
</table>

##Conclusão
Dessa forma aprendemos vários conceitos, todos eles são importantes, e alguns possuem até livros específicos como o de Closure: The Definitive Guide, então nunca descarte de sempre estudar.

##Bibliografia

- [Mozilla - Closures](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Closures)
- [W3School - Function Invocation](http://www.w3schools.com/js/js_function_invocation.asp)
- [Eloquente - JavaScript](https://github.com/braziljs/eloquente-javascript)
- [Learning Advanced JS](http://ejohn.org/apps/learn/)
