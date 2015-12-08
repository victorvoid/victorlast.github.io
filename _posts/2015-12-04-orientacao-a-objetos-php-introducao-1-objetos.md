---
layout: post
title:  "Orientação a objetos com PHP #1 - Objetos e Classes"
date:   2015-12-04 00:12:31 -0400
tags: php
subtitle: Saiba os princípios básicos de orientação a objetos com php e no que ele pode te ajudar.
---
#Programação Orientada a Objetos com PHP

####Victor Igor


<img class="img-responsive" src="{{ "/img/tirinha-orientacao-a-objetos.png"}}">

####fonte: [Vida de programador](http://vidadeprogramador.com.br/2012/04/02/php-orientado-a-objetos/)

###Resumo
Não fiz essa série para provar que orientação a objetos é o melhor paradigma para utilizar em seus projetos ou forçar que você deva usar, mas que
você deveria conhecer, aliás ele pode resolver algum de seu determinado problema. =)

####Criei uma série abordando os seguintes tópicos:

1. Introdução/Classes e objetos
2. Herança
3. Encapsulamento
4. PDO
5. MVC
6. E agora ? Já sei tudo ?

#Introdução


<blockquote class="highlight-paragraph pull-in">
	<p class="citacao">"Preciso mesmo aprender isso ?"</p>
	O curioso
</blockquote><br>

    
Pra responder é bastante simples, se até hoje você nunca precisou usar, tudo bem, mas algum dia você pode. Não seria melhor ficar preparado ?
Aprender um novo paradigma nunca vai ser ruim, seja funcional, estrutural ou lógico, ainda tem muitas pessoas que preferem a forma estrutural
da coisa do que até mesmo utilizar a programação orientada a objetos. Aprender um certo paradigma, não significa que você precisa
usar-lo pra sua vida, e claro abstrair conhecimentos necessários que até podem ser usados e melhorados no seu código do dia-a-dia.

###PHP suporte a orientação a objetos ?

PHP era somente estrutural, mas na versão 3 ele começou a suportar orientação a objetos, mas a verdade que a versão 3, a única coisa
que podíamos fazer era criar classes e agrupar métodos, e parava por aí, não tinha um suporte além disso para a orientação a objetos. 
Na versão 4 o motor e a linguagem foram reescrito, o que tornou mais rápido e instável, mas que na orientação a objetos não mudou nada, não valia a 
pena criar sistema orientado a objetos, pois no procedural era muito mais tranquilo e simples de trabalhar. Como muitas pessoas começavam a usar o PHP OO(**Orientada a objetos**), 
porque viam de outras linguagens, então o PHP viu que necessitava melhorar o motor pra esse modelo de programação. Antigamente o PHP
tratava tudo como variável, até os objetos (Conceito que vamos ver). Quando veio a versão 5 ele realmente veio todo reformulado trazendo
conceitos de encapsulamento, uso de interfaces, métodos e classes abstratas, clonagem de objetos, etc. Agora programação orientada a 
objetos com php ficou melhor, podendo trabalhar com outro modelo, que é o de abstração, criando uma arquitetura de classe especializada 
em gerenciar o sistema.

#Classes e Objetos
`Classe`: é uma representação de um tipo de objeto; pense como uma estrutura que descreve o objeto.

`Objetos`: de maneira legal, é uma classe sendo estanciada. Ou de maneira chata, é algo que contém atributos (ou propriedades) e possui um comportamento. Cada objeto tem uma identidade e é distinguível de outro mesmo que seus atributos sejam idênticos. 

Para criamos uma classe precisamos de alguns pré requisitos:

1. Precisa ter um arquivo somente para ela, assim cada classe separada em um arquivo único
2. Caracteres únicos, sem uso de acentos, pontos e traços.
3. Não é aconselhável usar um underline e sim separando através da caixa alta e começando sempre com uma letra maiúscula, por exemplo: `MinhaClasse`.
4. Precisamos de uma extensão para que a arquitetura identifique que o arquivo é uma classe, ela é: `.class.php` exemplo: `MinhaClasse.class.php`.
5. O nome da classe tem que ser o mesmo do arquivo.
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
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
<span class="c1">//Exemplo 1:</span>
<span class="kd">&lt;?php</span>
<span class="kd">class</span> <span class="nc">MinhaClasse</span><span class="p">{</span> 
<span class="c1">//A palavra reservada class para informar o escopo.</span>
  <span class="kd">var </span><span class="nv">$Classe;</span>
  <span class="kd">var </span><span class="nv">$Funcao;</span>
  <span class="kd">function</span><span class="nf"> getClasse</span><span class="p">(</span><span class="nv">$Classe, $Funcao</span><span class="p">){</span>
  <span class="c1">////método - dando auxílio para nossas variáveis</span>
    <span class="kd">echo </span><span class="p">"</span><span class="s1">A classe {$Classe} serve para {$Funcao}.</span><span class="p">";</span>
  <span class="p">}</span>
  <span class="kd">function </span><span class="nf">verClasse</span><span class="p">(){</span>
    <span class="kd">print_r</span><span class="p">(</span><span class="nv">$this</span><span class="p">);</span>
    <span class="c1">//$this serve pra referenciar a própria classe.</span>
  <span class="p">}</span>
<span class="p">}</span>
</pre>
</div>
</td></tr>
</table>
Arquivo usando a classe:
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
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
<span class="c1">//exemplo 2 usando Exemplo 1</span>
<span class="kd">&lt;?php</span>
  <span class="kd">require</span><span class="p">('</span><span class="s1">class/MinhaClasse.class.php</span><span class="p">');</span>
  <span class="c1">//incorporando em nosso arquivo</span>
  <span class="nv">$teste</span> <span class="o">=</span> <span class="kd">new </span><span class="nc">MinhaClasse</span><span class="p">();</span>
  <span class="nv">$teste</span><span class="p">-></span><span class="nf">getClasse</span><span class="p">('</span><span class="s1">de cachorro</span><span class="p">', '</span><span class="s1">mostrar</span><span class="p">');</span>
  <span class="c1">//--> A classe de cachorro serve para mostrar.</span>
  <span class="nv">$teste</span><span class="p">-></span><span class="nf">verClasse</span><span class="p">();</span>
  <span class="c1">/*^mostra os valores dos atributos todos vazio.</span>
  <span class="c1">pois não salvamos o valor na variável</span>
  <span class="c1">salvando: */</span>
  <span class="nv">$teste</span><span class="p">-></span><span class="nv">Classe</span> <span class="o">= </span><span class="p">'</span><span class="s1">de cachorro</span><span class="p">';</span>
  <span class="nv">$teste</span><span class="p">-></span><span class="nv">Funcao</span><span class="o"> = </span><span class="p">'</span><span class="s1">mostrar</span><span class="p">';</span>
  <span class="nv">$teste</span><span class="p">-></span><span class="nf">verClasse</span><span class="p">();</span>
  <span class="c1">//^agora mostra os valores adicionados.</span>
</pre>
</div>
</td></tr>
</table>
<blockquote class="trivia">
<p><strong class="cabecalho">Exemplo 2</strong>
O operador <span class="kd-s">new</span> tranforma a variável em um objeto (nesse caso um objeto da <span class="nc-s">MinhaClasse</span>). Aliás o <span class="nv-s">$teste</span> = <span class="kd-s">new</span> <span class="nc-s">MinhaClasse</span>;também pode ser instanciado sem o uso do ( ).</p>
</blockquote>
Arquivo usando a classe:

Existe métodos que são automáticamente executados quando se usa o `new`, são eles:
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
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre><span class="c1">//Exemplo 3:</span>
<span class="kd">&lt;?php</span>
<span class="c1">/*Criando um construtor, método chamado assim </span>
<span class="c1">que estanciar um objeto*/</span>
  <span class="kd">function</span><span class="nf"> __construct</span><span class="p">(</span><span class="nv">$Nome, $Idade</span><span class="p">){</span>
    <span class="nv">$this</span><span class="p">-></span><span class="nv">Nome</span><span class="o"> = </span><span class="p"> (</span><span class="kd">string</span><span class="p">)</span> <span class="nv">$Nome</span><span class="p">;</span>
    <span class="nv">$this</span><span class="p">-></span><span class="nv">Idade</span><span class="o"> = </span><span class="p"> (</span><span class="kd">string</span><span class="p">)</span> <span class="nv">$Idade</span><span class="p">;</span>
  <span class="p">}</span>
  <span class="c1">/*Outro metodo que é executado sozinho assim  </span>
   <span class="c1">que não usar mais o objeto.*/</span>
  <span class="kd">function</span><span class="nf"> __destruct</span><span class="p">(</span><span class="nv">$Nome, $Idade</span><span class="p">){</span>
    <span class="kd">echo</span><span class="p">'</span><span class="s1">O objeto foi destruido !</span><span class="p">';</span>
  <span class="p">}</span>
</pre>
</div>
</td></tr>
</table>

###Como posso usar esses conceitos a meu favor na criação de um sistema ?

<del>Te vira! </del>As vezes utilizamos muitas query para consultarmos nosso banco em várias partes do site, e nessas diversas vezes acabamos repetindo pedaços da mesma query. Sabemos que POO é abstração de dados. Para resolver é fácil, vamos fazer o uso de replica clonagem, aproveitando características de um objeto.

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
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
<span class="c1">//Exemplo 4:</span>
<span class="kd">&lt;?php</span>
<span class="kd">class</span> <span class="nc">ReplicaClonagem</span><span class="p">{</span> 
  <span class="kd">function</span><span class="nf"> __construct</span><span class="p">(</span><span class="nv">$Tabela, $Termos, $addQuery</span><span class="p">){</span>
    <span class="nv">$this</span><span class="p">-></span><span class="nv">Tabela</span><span class="o">   = </span><span class="nv">$Tabela</span><span class="p">;</span>
    <span class="nv">$this</span><span class="p">-></span><span class="nv">Termos</span><span class="o">   = </span><span class="nv">$Termos</span><span class="p">;</span>
    <span class="nv">$this</span><span class="p">-></span><span class="nv">addQuery</span><span class="o"> = </span><span class="nv">$addQuery</span><span class="p">;</span>
  <span class="p">}</span>
  <span class="kd">function</span><span class="nf"> setTabela</span><span class="p">(</span><span class="nv">$Tabela</span><span class="p">){</span>
     <span class="nv">$this</span><span class="p">-></span><span class="nv">Tabela</span><span class="o">   = </span><span class="nv">$Tabela</span><span class="p">;</span>
  <span class="p">}</span>
  <span class="kd">function</span><span class="nf"> setTermos</span><span class="p">(</span><span class="nv">$Termos</span><span class="p">){</span>
     <span class="nv">$this</span><span class="p">-></span><span class="nv">Termos</span><span class="o">  = </span><span class="nv">$Termos</span><span class="p">;</span>
  <span class="p">}</span>
  <span class="kd">function</span><span class="nf"> Ler</span><span class="p">()</span><span class="p">{</span>
     <span class="nv">$this</span><span class="p">-></span><span class="nv">Query</span><span class="o">=</span><span class="p">"</span><span class="s1">select * from {$this->Tabela}</span>
        <span class="s1">where{$this->Termos} {$this->addQuery}</span><span class="p">";</span>
     <span class="kd">echo</span> <span class="nv">$this</span><span class="p">-></span><span class="nv">Query</span><span class="p">;</span>
  <span class="p">}</span>
<span class="p">}</span>
</pre>
</div>
</td></tr>
</table>

Usando a classe `ReplicaClonagem`:

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
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
<span class="c1">//Exemplo 5 usando o Exemplo 4:</span>
<span class="kd">&lt;?php</span>
  <span class="kd">require</span><span class="p">('</span><span class="s1">class/ReplicaClonagem.class.php</span><span class="p">');</span>
  <span class="nv">$readNoticia</span><span class="o"> = </span><span class="kd">new </span><span class="nc">ReplicaClonagem</span><span class="p">("</span><span class="s1">posts</span><span class="p">",</span>
  <span class="p">"</span><span class="s1">categoria = 'esporte'</span><span class="p">", "</span><span class="s1">order by data desc</span><span class="p">");</span>
  <span class="nv">$readNoticia</span><span class="p">-></span><span class="nf">Ler</span><span class="p">();</span>
  <span class="c1">/*select * from posts where categoria = 'esporte'</span>
    <span class="c1">order by data desc*/</span>
  <span class="nv">$readJogos</span><span class="o"> = </span><span class="nv">$readNoticia</span><span class="p">;</span><span class="c1">//mesmo objeto</span>
  <span class="nv">$readJogos</span><span class="p">-></span><span class="nf">setTermos</span><span class="p">("</span><span class="s1">categoria='jogos'</span><span class="p">");</span>
  <span class="nv">$readJogos</span><span class="p">-></span><span class="nf">Ler</span><span class="p">();</span>
  <span class="c1">/*select * from posts where categoria = 'jogos'</span>
   <span class="c1"> order by data desc*/</span>
  <span class="nv">$readComentario</span><span class="o"> = </span><span class="kd">clone</span><span class="p">("</span><span class="s1">comentario</span><span class="p">");</span>
   <span class="c1">//criando outro objeto, evita conflitos</span>
  <span class="nv">readComentario</span><span class="p">-></span><span class="nf">setTabela("</span><span class="s1">comentario</span><span class="p">");</span>
  <span class="nv">readComentario</span><span class="p">-></span><span class="nf">Ler</span><span class="p">();</span>
  <span class="c1">/*select * from comentario where categoria = 'jogos'</span>
   <span class="c1"> order by data desc*/</span>   
</pre>
</div>
</td></tr>
</table>

<blockquote class="trivia">
<p><strong class="cabecalho">Exemplo 5</strong>
Repare! Para aproveitar a característica e criar um novo objeto, é preciso do uso de <span class="kd-s">clone( )</span>, assim como o próprio
nome já diz, clona o objeto. </p>
</blockquote>


##Cargas automática ? 

Perceba que ao longo dos exemplos quando utilizamos as classes, usamos o operador <span class="kd-s">new</span> para instanciar, mas como na orientação
a objetos é comum criar uma classe específica para cada problema, no fim temos uma carga muito grande de classes, e precisamos incluir no escopo do documento. Ao usar o <span class="kd-s">require</span> ou <span class="kd-s">include</span>, automaticamente estamos pegando toda carga do documento para o seu arquivo, e muitas vezes carregamos sem utilizar. Vamos usar um método que só vai incluir um arquivo no seu documento, somente quando ele for ser utilizado. Com isso temos uma carga muito menor de conteúdo sendo incluido, trazendo assim um desempenho melhor.

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
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre><span class="c1">//Exemplo 6:</span>
<span class="kd">&lt;?php</span>
  <span class="kd">function</span><span class="nf"> __autoload</span><span class="p">(</span><span class="nv">$Class</span><span class="p">){</span>
  <span class="c1">//Método mágico =)</span>
  <span class="nv">dirName</span><span class="o"> = '</span><span class="s1">class</span><span class="p">';</span>
  <span class="c1">//O nome da pasta que está as classes</span>
  <span class="kd">if</span><span class="p">(</span><span class="kd">file_exists</span><span class="p">("</span>
    <span class="s1">{$dirName}/{$Class}.class.php</span><span class="p">")){</span>
    <span class="kd">require_once</span><span class="p">("
    </span><span class="s1">{dirName}/{$Class}.class.php</span><span class="p">");</span>
  <span class="p">}</span><span class="kd">else</span><span class="p">{</span>
    <span class="kd">die</span><span class="p">("</span><span class="s1">Erro ao incluir </span>
    <span class="s1">{$dirName}/{$Class}</span><span class="p">");</span>
  <span class="p">}</span>
<span class="p">}</span>
</pre>
</div>
</td></tr>
</table>

Essa função <span class="kd-s">__autoload</span> vai ser responsável pelo carregamento automático,
quando declaramos essa função, o operador <span class="kd-s">new</span> vai jogar para nosso 
método mágico o nome da classe.


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
<div class="highlight">
<pre><span class="c1">//usando Exemplo 6:</span>
<span class="kd">&lt;?php</span>
  <span class="kd">require</span><span class="p">('</span><span class="s1">class/inc/Config.inc.php</span><span class="p">');</span>
  <span class="c1">cada vez que requisitar uma nova classe,</span>
  <span class="c1">o nosso metodo mágico vai receber </span>
  <span class="c1">o nome da class.</span>
  <span class="nv">classeA</span><span class="o"> = </span><span class="kd">new </span><span class="nc">MinhaClasse</span><span class="p">();</span>
</pre>
</div>
</td></tr>
</table>

##Documentação com PHPDoc?
Vamos criar uma documentação utilizando o PHPDoc pra informar usuários ou até mesmo para lembrar a gente de como se utiliza uma classe, ou para que serve específico método ou variável. Não é apenas escrever na classe o que ela faz, é uma documentação interativa que podemos sempre consultar quando formos utilizar qualquer atributo, método ou quando instanciamos a classe.

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
 29
 30
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre><span class="c1">//Exemplo 7:</span>
<span class="kd">&lt;?php</span>
  <span class="c1">/**</span><span class="cp">DocumentaçãodeClasse:</span>
  <span class="c1">*</span><span class="cp">Essa classe foi criada para mostrar como usa e </span> 
  <span class="c1">*</span><span class="cp">como faz uma documentação de suas classes</span>
  <span class="c1">*</span><span class="cp">@copyright (c) 2015, Victor Igor G. Martins Study</span>
  <span class="c1">*/</span>
<span class="kd">class</span><span class="nc"> DocumentacaoDeClasse</span><span class="p">{</span>
  <span class="c1">/**</span><span class="cp">@var string Nome da Empresa</span>
  <span class="kd">public</span><span class="nv"> $Empresa</span><span class="p">;</span><span class="c1">*/</span>
  <span class="c1">/**</span><span class="cp">@var string O cargo do Funcionario</span><span class="c1">*/</span>
  <span class="kd">public</span><span class="nv"> Cargo</span><span class="p">;</span>
  <span class="c1">/**</span>
  <span class="c1">*</span> <span class="cp">Modifica nome e a idade da pessoa</span>
  <span class="c1">*/</span>
  <span class="kd">public function</span><span class="nf"> setPessoa</span><span class="p">(</span><span class="nv">$Nome, $Idade</span><span class="p">){</span>
    <span class="nv">$this</span><span class="p">-></span><span class="nv">Nome</span><span class="o"> = </span><span class="nv"> $Nome</span><span class="p">;</span>
    <span class="nv">$this</span><span class="p">-></span><span class="nv">Idade</span><span class="o"> = </span><span class="nv"> $Idade</span><span class="p">;</span>
  <span class="p">}</span>
<span class="c1">/**</span>
  <span class="c1">*</span><span class="cp">Ao executar essa função, você </span>
  <span class="c1">*</span><span class="cp">pegará o nome da pessoa. </span>
  <span class="c1">*</span><span class="cp">Você pode dar um echo neste </span>
  <span class="c1">*</span><span class="cp">para visualizar o  Nome.</span>
  <span class="c1">*</span><span class="cp">@return string</span>
  <span class="c1">*/</span>
  <span class="kd">public function</span><span class="nf"> getNome</span><span class="p">(){</span>
     <span class="kd">return </span><span class="nv">$this</span><span class="p">-></span><span class="nv">Nome</span><span class="p">;</span>
  <span class="p">}</span>
<span class="p">}</span>
</pre>
</div>
</td></tr>
</table>

Existe vários outros atributos como o `@auto`, `@abstract`, `$acess`, `$license`, entre outros para você utilizar. Mais informações sobre PHODOC [aqui](http://www.phpdoc.org/docs/latest/index.html).