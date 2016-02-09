---
layout: post
title:  "Getting Started com PHP Orientado a objetos #1"
date:   2015-12-04 00:12:31 -0400
image: '/assets/img/assets/img/phpoo/phpoo.jpg'
tags: php
categories:
- Aprendendo PHP OO
subtitle: Início de uma série de como usar a orientação a objetos no php. Objetos, Replica clonagem, Cargas automáticas, etc...
---

# Programação Orientada a Objetos com PHP


<img src="{{ "/assets/img/phpoo/phpoo.jpg"}}">

### Info

Essa série foi de acordo com o curso da <a href="https://www.upinside.com.br/" target="_blank">UpInside Treinamentos</a> (que por sinal é muito boa), porém em formato de artigos para os que não são fãs de video aulas, espero que gostem. =)

#### A série aborda os seguintes tópicos:

1. Introdução/Classes e objetos
2. Herança
3. Encapsulamento
4. PDO
5. MVC
6. E agora ? Já sei tudo ?

# Introdução


<blockquote class="highlight-paragraph pull-in">
	<p class="citacao">"Preciso mesmo aprender isso ?"</p>
	O curioso
</blockquote><br>

    
Pra responder é bastante simples, se até hoje você nunca precisou usar, tudo bem, mas algum dia você pode. Não seria melhor ficar preparado ?
Aprender um novo paradigma nunca vai ser ruim, seja funcional, estrutural ou lógico, ainda tem muitas pessoas que preferem a forma estrutural
da coisa do que até mesmo utilizar a programação orientada a objetos. Aprender um certo paradigma, não significa que você precisa
usar-lo pra sua vida, e claro abstrair conhecimentos necessários que até podem ser usados e melhorados no seu código do dia-a-dia.

### PHP suporte a orientação a objetos ?

PHP era somente estrutural, mas na versão 3 ele começou a suportar orientação a objetos, mas a verdade que a versão 3, a única coisa
que podíamos fazer era criar classes e agrupar métodos, e parava por aí, não tinha um suporte além disso para a orientação a objetos. 
Na versão 4 o motor e a linguagem foram reescrito, o que tornou mais rápido e instável, mas que na orientação a objetos não mudou nada, não valia a 
pena criar sistema orientado a objetos, pois no procedural era muito mais tranquilo e simples de trabalhar. Como muitas pessoas começavam a usar o PHP OO(**Orientada a objetos**), 
porque viam de outras linguagens, então o PHP viu que necessitava melhorar o motor pra esse modelo de programação. Antigamente o PHP
tratava tudo como variável, até os objetos (Conceito que vamos ver). Quando veio a versão 5 ele realmente veio todo reformulado trazendo
conceitos de encapsulamento, uso de interfaces, métodos e classes abstratas, clonagem de objetos, etc. Agora programação orientada a 
objetos com php ficou melhor, podendo trabalhar com outro modelo, que é o de abstração, criando uma arquitetura de classe especializada 
em gerenciar o sistema.

# Classes e Objetos
`Classe`: é uma representação de um tipo de objeto; pense como uma estrutura que descreve o objeto.

`Objetos`: de maneira legal, é uma classe sendo estanciada. Ou de maneira chata, é algo que contém atributos (ou propriedades) e possui um comportamento. Cada objeto tem uma identidade e é distinguível de outro mesmo que seus atributos sejam idênticos. 

Para criamos uma classe precisamos de alguns pré requisitos:

1. Precisa ter um arquivo somente para ela, assim cada classe separada em um arquivo único
2. Caracteres únicos, sem uso de acentos, pontos e traços.
3. Não é aconselhável usar um underline e sim separando através da caixa alta e começando sempre com uma letra maiúscula, por exemplo: `MinhaClasse`.
4. Precisamos de uma extensão para que a arquitetura identifique que o arquivo é uma classe, ela é: `.class.php` exemplo: `MinhaClasse.class.php`.
5. O nome da classe tem que ser o mesmo do arquivo.
{% highlight php %}
//Exemplo 1:
<?php
class MinhaClasse{ 
//A palavra reservada class para informar o escopo.
  var $Classe;
  var $Funcao;
  function getClasse($Classe, $Funcao){
  ////método - dando auxílio para nossas variáveis
    echo "A classe {$Classe} serve para {$Funcao}.";
  }
  function verClasse(){
    print_r($this);
    //$this serve pra referenciar a própria classe.
  }
}
{% endhighlight %}

Arquivo usando a classe:
{% highlight php%}
//exemplo 2 usando Exemplo 1
<?php
  require('class/MinhaClasse.class.php');
  //incorporando em nosso arquivo
  $teste = new MinhaClasse();
  $teste->getClasse('de cachorro', 'mostrar');
  //--> A classe de cachorro serve para mostrar.
  $teste->verClasse();
  /*^mostra os valores dos atributos todos vazio.
  pois não salvamos o valor na variável
  salvando: */
  $teste->Classe = 'de cachorro';
  $teste->Funcao = 'mostrar';
  $teste->verClasse();
  //^agora mostra os valores adicionados.
{% endhighlight %}

<blockquote>
<p><strong class="cabecalho">Exemplo 2</strong>
O operador <span class="kd-s">new</span> tranforma a variável em um objeto (nesse caso um objeto da <span class="nc-s">MinhaClasse</span>). Aliás o <span class="nv-s">$teste</span> = <span class="kd-s">new</span> <span class="nc-s">MinhaClasse</span>também pode ser instanciado sem o uso do ( ).</p>
</blockquote>

Arquivo usando a classe:

Existe métodos que são automáticamente executados quando se usa o `new`, são eles:
{% highlight php %}
//Exemplo 3:
<?php
/*Criando um construtor, método chamado assim 
que estanciar um objeto*/
  function __construct($Nome, $Idade){
    $this->Nome =  (string) $Nome;
    $this->Idade =  (string) $Idade;
  }
  /*Outro metodo que é executado sozinho assim  
   que não usar mais o objeto.*/
  function __destruct($Nome, $Idade){
    echo'O objeto foi destruido !';
  }
{% endhighlight %}

### Como posso usar esses conceitos a meu favor na criação de um sistema ?

<del>Te vira! </del>As vezes utilizamos muitas query para consultarmos nosso banco em várias partes do site, e nessas diversas vezes acabamos repetindo pedaços da mesma query. Sabemos que POO é abstração de dados. Para resolver é fácil, vamos fazer o uso de replica clonagem, aproveitando características de um objeto.

{% highlight php %}
//Exemplo 4:
<?php
class ReplicaClonagem{ 
  function __construct($Tabela, $Termos, $addQuery){
    $this->Tabela   = $Tabela;
    $this->Termos   = $Termos;
    $this->addQuery = $addQuery;
  }
  function setTabela($Tabela){
     $this->Tabela   = $Tabela;
  }
  function setTermos($Termos){
     $this->Termos  = $Termos;
  }
  function Ler(){
     $this->Query="select * from {$this->Tabela}
        where{$this->Termos} {$this->addQuery}";
     echo $this->Query;
  }
}
{% endhighlight %}

Usando a classe `ReplicaClonagem`:

{% highlight php %}
//Exemplo 5 usando o Exemplo 4:
<?php
  require('class/ReplicaClonagem.class.php');
  $readNoticia = new ReplicaClonagem("posts",
  "categoria = 'esporte'", "order by data desc");
  $readNoticia->Ler();
  /*select * from posts where categoria = 'esporte'
    order by data desc*/
  $readJogos = $readNoticia;//mesmo objeto
  $readJogos->setTermos("categoria='jogos'");
  $readJogos->Ler();
  /*select * from posts where categoria = 'jogos'
    order by data desc*/
  $readComentario = clone("comentario");
   //criando outro objeto, evita conflitos
  readComentario->setTabela("comentario");
  readComentario->Ler();
  /*select * from comentario where categoria = 'jogos'
    order by data desc*/   
{% endhighlight %}

<blockquote class="trivia">
<p><strong class="cabecalho">Exemplo 5</strong>
Repare! Para aproveitar a característica e criar um novo objeto, é preciso do uso de <span class="kd-s">clone( )</span>, assim como o próprio
nome já diz, clona o objeto. </p>
</blockquote>


## Cargas automática ? 

Perceba que ao longo dos exemplos quando utilizamos as classes, usamos o operador <span class="kd-s">new</span> para instanciar, mas como na orientação
a objetos é comum criar uma classe específica para cada problema, no fim temos uma carga muito grande de classes, e precisamos incluir no escopo do documento. Ao usar o <span class="kd-s">require</span> ou <span class="kd-s">include</span>, automaticamente estamos pegando toda carga do documento para o seu arquivo, e muitas vezes carregamos sem utilizar. Vamos usar um método que só vai incluir um arquivo no seu documento, somente quando ele for ser utilizado. Com isso temos uma carga muito menor de conteúdo sendo incluido, trazendo assim um desempenho melhor.

{% highlight php %}
//Exemplo 6:
<?php
  function __autoload($Class){
  //Método mágico =)
  dirName = 'class';
  //O nome da pasta que está as classes
  if(file_exists("
    {$dirName}/{$Class}.class.php")){
    require_once("
    {dirName}/{$Class}.class.php");
  }else{
    die("Erro ao incluir 
    {$dirName}/{$Class}");
  }
}
{% endhighlight %}

Essa função <span class="kd-s">__autoload</span> vai ser responsável pelo carregamento automático,
quando declaramos essa função, o operador <span class="kd-s">new</span> vai jogar para nosso 
método mágico o nome da classe.

{% highlight php %}
//usando Exemplo 6:
<?php
  require('class/inc/Config.inc.php');
  cada vez que requisitar uma nova classe,
  o nosso metodo mágico vai receber 
  o nome da class.
  classeA = new MinhaClasse();
{% endhighlight %}

## Documentação com PHPDoc?
Vamos criar uma documentação utilizando o PHPDoc pra informar usuários ou até mesmo para lembrar a gente de como se utiliza uma classe, ou para que serve específico método ou variável. Não é apenas escrever na classe o que ela faz, é uma documentação interativa que podemos sempre consultar quando formos utilizar qualquer atributo, método ou quando instanciamos a classe.

{% highlight php %}
//Exemplo 7:
<?php
  /**DocumentaçãodeClasse:
  *Essa classe foi criada para mostrar como usa e  
  *como faz uma documentação de suas classes
  *@copyright (c) 2015, Victor Igor G. Martins Study
  */
class DocumentacaoDeClasse{
  /**@var string Nome da Empresa
  public $Empresa;*/
  /**@var string O cargo do Funcionario*/
  public Cargo;
  /**
  * Modifica nome e a idade da pessoa
  */
  public function setPessoa($Nome, $Idade){
    $this->Nome =  $Nome;
    $this->Idade =  $Idade;
  }
/**
  *Ao executar essa função, você 
  *pegará o nome da pessoa. 
  *Você pode dar um echo neste 
  *para visualizar o  Nome.
  *@return string
  */
  public function getNome(){
     return $this->Nome;
  }
}
{% endhighlight %}

Existe vários outros atributos como o `@auto`, `@abstract`, `$acess`, `$license`, entre outros para você utilizar. Mais informações sobre PHODOC [aqui](http://www.phpdoc.org/docs/latest/index.html).

## Concluindo

E é isso, até a próxima, bye! =)

<img src="{{ "/assets/img/mongodb123/bye.gif"}}">