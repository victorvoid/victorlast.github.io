---
layout: post
title:  "MongoDB - Aggregate e Groups #5"
date:    2016-01-01 00:06:31 -0400
tags: mongobemean
subtitle: Conceitos vistos na aula 05 no bemean, descobrindo a quantidade de elementos, limitando, ordenando e distinguindo valores de uma collection, agrupando...
---

# MongoDB - Aggregate e Groups
Antes de fatos aprendermos sobre Agreggate e Groups, vamos ver alguns tópicos importantes.
Para seguir os primeiros exemplos vamos usar a collection <span class="nc-s">restaurantes</span>
use o [restaurantes.json](https://raw.githubusercontent.com/Webschool-io/be-mean-instagram/master/Apostila/module-mongodb/src/data/restaurantes.json) para importar.【ツ】<br> 

##Como saber a quantidade de documentos que eu tenho? 

Podemos usar a função length:
<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; db.restaurantes.find().length()
</pre>
</div>
</td></tr>
</table>

Porém dessa forma o resultado é 'lento', para isso temos uma função própria que é muito mais rápida que o <span class="nf-s">length( )</span>
<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; db.restaurantes.count()
</pre>
</div>
</td></tr>
</table>
Resultado:
<pre>
25359
</pre><br>
Com o <span class="nf-s">count( )</span> também podemos usar querys que usamos no <span class="nf-s">find( )</span> para saber a quantidade do que queremos.

<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
  2
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; var query = {borough:'Bronx'}
&gt; db.restaturantes.count(query)
</pre>
</div>
</td></tr>
</table>
Resultado:
<pre>
2338
</pre>

##Distinct

Neste nosso restaurantes temos a seguinte estrutura:

<pre>
  {
 <span class="sx-s"> "_id"</span>: ObjectId("564d6c5af9e09ea567dade51"),
  <span class="sx-s">"address"</span>: {
    <span class="sx-s">"building"</span>: "2780",
    <span class="sx-s">"coord"</span>: [
      -73.98241999999999,
      40.579505
    ],
    <span class="sx-s">"street"</span>: "Stillwell Avenue",
    <span class="sx-s">"zipcode"</span>: "11224"
  },
  <span class="sx-s">"borough"</span>: "Brooklyn",
  <span class="sx-s">"cuisine"</span>: "American ",
  <span class="sx-s">"grades"</span>: [
    {
      <span class="sr-s">"date"</span>: ISODate("2014-06-10T00:00:00Z"),
      <span class="sr-s">"grade"</span>: "A",
      <span class="sr-s">"score"</span>: 5
    },
    {
      <span class="sr-s">"date"</span>: ISODate("2013-06-05T00:00:00Z"),
      <span class="sr-s">"grade"</span>: "A",
      <span class="sr-s">"score"</span>: 7
    },
    {
      <span class="sr-s">"date"</span>: ISODate("2012-04-13T00:00:00Z"),
      <span class="sr-s">"grade"</span>: "A",
      <span class="sr-s">"score"</span>: 12
    },
    {
      <span class="sr-s">"date"</span>: ISODate("2011-10-12T00:00:00Z"),
      <span class="sr-s">"grade"</span>: "A",
      <span class="sr-s">"score"</span>: 12
    }
  ],
  <span class="sx-s">"name"</span>: "Riviera Caterer",
  <span class="sx-s">"restaurant_id"</span>: "40356018"
}
</pre>
Repare, e se quisermos saber todas as <span class="sx-s">borough</span> nesse universo de 25359 documentos?
Precisamos saber encontrar valores únicos de uma propriedade, pois ela pode se repetir em outros documentos. O <span class="nf-s">distinct( ) </span>vai nos ajudar com isso.

<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; db.restaurantes.distinct('borough')
</pre>
</div>
</td></tr>
</table>

Resultado:
<pre>
[
  "Brooklyn",
  "Manhattan",
  "Queens",
  "Staten Island",
  "Bronx",
  "Missing"
]
</pre>

Ora se ele retorna um array, e usamos JavaScript, podemos usar um <span class="nf-s">length</span> para saber a quantidade não é ?
<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; db.restaurantes.distinct('borough').length
</pre>
</div>
</td></tr>
</table>

Resultado: 
<pre>6</pre>

##Tem como trazer o resultado ordenado ? 

Quem ae já estudou os algoritmos de ordenação, <del>sabe que dá muita raiva</del> sabe que existe vários algoritmos de ordenação e com vários casos cada um. Poxa e agora ? <del>se lascou, vai ter que implementar uma função para isso</del>
HEYY!!! Lembre, se estamos usando JavaScript, podemos usar a função <span class="nf-s">sort( )</span> para isso! e para os curiosos, ele usa o algorimo MergeSort, veja o código [aqui](http://mxr.mozilla.org/seamonkey/source/js/src/jsarray.c).

<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; db.restaurantes.distinct('borough').sort()
</pre>
</div>
</td></tr>
</table>

Resultado:
<pre>
[
  "Bronx",
  "Brooklyn",
  "Manhattan",
  "Missing",
  "Queens",
  "Staten Island"
]
</pre>
Porém se quiser fazer o contrário, use a função <span class="nf-s">reverse( )</span>

<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; db.restaurantes.distinct('borough').sort().reverse()
</pre>
</div>
</td></tr>
</table>

##Limite

Agora vamos usar uma collection <span class="nc-s">pokemons</span> nos próximos exemplos, use o [pokemons.json](https://raw.githubusercontent.com/wbruno/boas-praticas-js/master/pokemon-seed/pokemons.json) para importar.



As vezes podemos querer colocar um limite de busca, assim limitando o número de resultados, como por exemplo:
<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; db.pokemons.find({}, {name:1, _id:0}).limit(3)
</pre>
</div>
</td></tr>
</table>
Resultado:
<pre>
{
  <span class="sx-s">"name"</span>: "Pidgeotto"
}
{
  <span class="sx-s">"name"</span>: "Raticate"
}
{
  <span class="sx-s">"name"</span>: "Fearow"
}
</pre>

Com ele podemos também usar o <span class="nf-s">skip( )</span>, para pedir para pular um determinado valor.

<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1

</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; db.pokemons.find({}, {name:1, _id:0}).limit(5)
 .skip(2)
</pre>
</div>
</td></tr>
</table>

Assim ele pulou os 2 primeiros pokemons e retornou os próximos 5. Podemos fazer uma paginação com ele, assim mostrando de 5 em 5 por exemplo.
<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1

  2

  3

</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; db.pokemons.find({}, {name:1, _id:0}).limit(5)
.skip(5*0)]
&gt; db.pokemons.find({}, {name:1, _id:0}).limit(5)
.skip(5*1)
&gt; db.pokemons.find({}, {name:1, _id:0}).limit(5)
.skip(5*2)
</pre>
</div>
</td></tr>
</table>

##Distinct
Geralmente em uma collection que possui muitos documentos, contém propriedades com valores iguais. Nesse exemplo de pokemons, repare que não existe um exclusivo <span class="sx-s">type</span> pra cada um, ele se repete em outros. Vamos descobrir quais e quantos <span class="sx-s">types</span> de pokemons existe na collection:

<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
  2
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; db.pokemons.distinct('types').length
&gt; db.pokemons.distinct('types')
</pre>
</div>
</td></tr>
</table>
Resultado:
<pre>18
[
  "bug",
  "poison",
  "flying",
  "normal",
  "electric",
  "water",
  "fighting",
  "psychic",
  "grass",
  "fairy",
  "fire",
  "rock",
  "ice",
  "ground",
  "steel",
  "ghost",
  "dark",
  "dragon"
]
</pre>

##Agrupamento 

Podemos agrupar cada tipo de pokemons e poder mandar contar quantos pokemons tem aquele valor por exemplo.

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
<pre>
<span class="c1">//exemplo 1</span>
db.pokemons.group({
  <span class="kd-s">initial</span>: {total : 0},
  <span class="kd-s">reduce</span> : <span class="nf-s">function</span> (curr, result){
    curr.types.<span class="kd-s">forEach</span>(<span class="nf-s">function</span>(type){
      <span class="nc-s">if</span>(result[type]){
        result[type]++;
      }<span class="nc-s">else</span>{
        result[type] = 1;
      }
      result.total++;
    });
  }
});
</pre>
</div>
</td></tr>
</table>

Resultado:
<pre>
[
  {
    <span class="sx-s">"total"</span>: 934,
    <span class="sx-s">"normal"</span>: 79,
    <span class="sx-s">"flying"</span>: 81,
    <span class="sx-s">"poison"</span>: 54,
    <span class="sx-s">"bug"</span>: 58,
    <span class="sx-s">"electric"</span>: 47,
    <span class="sx-s">"water"</span>: 101,
    <span class="sx-s">"fighting"</span>: 42,
   <span class="sx-s"> "psychic"</span>: 61,
    <span class="sx-s">"grass"</span>: 70,
    <span class="sx-s">"fairy"</span>: 31,
    <span class="sx-s">"fire"</span>: 53,
    <span class="sx-s">"rock"</span>: 42,
    <span class="sx-s">"ice"</span>: 28,
    <span class="sx-s">"ground"</span>: 53,
    <span class="sx-s">"steel"</span>: 35,
    <span class="sx-s">"ghost"</span>: 34,
    <span class="sx-s">"dark"</span>: 35,
    <span class="sx-s">"dragon"</span>: 30
  }
]
</pre>

###Entendo o exemplo 1

Usamos algumas propriedades do group, que é o <span class="nf-s">init</span> e o <span class="nf-s">reduce</span>:
No init inicializamos a variável total para contar e em seguida o reduce onde toda a mágica acontece.
No reduce escrevemos uma função que recebe o <span class="sr-s">curr</span> como parâmetro e será de fato cada objeto, e o <span class="sr-s">result</span> que é responsável pelo resultado, em seguida acesso o tipo de cada pokemon e faço um <span class="kd-s">forEach</span> para descobrir quantos pokemons tem esse tipo.

###Colocando condições
Vamos usar a propriedade <span class="kd-s">cond</span> para informar nossa condição.

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
<div class="highlight">
<pre>
db.pokemons.group({
  <span class="kd-s">initial</span>:{total : 0},
  <span class="kd-s">cond</span>   :{defense: {$gt:200}},
  <span class="kd-s">reduce</span> :<span class="nf-s">function</span> (curr, result){
    curr.types.<span class="kd-s">forEach</span>(<span class="nf-s">function</span>(type){
      <span class="nc-s">if</span>(result[type]){
        result[type]++;
      }<span class="nc-s">else</span>{
        result[type] = 1;
      }
      result.total++;
    });
  }
});
</pre>
</div>
</td></tr>
</table>
Resultado:
<pre>
[
  {
    <span class="sx-s">"total"</span>: 2,
    <span class="sx-s">"rock"</span>: 1,
    <span class="sx-s">"bug"</span>: 1
  }
]
</pre>

##Finalize
Ao contrários das outras propriedades que é sempre chamada para cada documento, o <span class="kd-s">finalize</span> é chamada apenas ao final da execução.


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
<pre>
<span class="c1">//exemplo 2</span>
db.pokemons.group({
  <span class="kd-s">initial</span>: {total: 0, defense: 0, attack:0},
  <span class="kd-s">reduce</span> : <span class="nf-s">function</span> (current, result){
    result.total++;
    result.defense += current.defense;
    result.attack  += current.attack;
    },
  <span class="kd-s">finalize</span>: <span class="nf-s">function</span>(result){
     result.media_defense = 
                  result.defense/result.total;
     result.media_attack  = 
                  result.attack/result.total;
  }
})
</pre>
</div>
</td></tr>
</table>

Resultado:
<pre>
[
  {
    <span class="sx-s">"total"</span>: 620,
   <span class="sx-s"> "defense"</span>: 44363,
    <span class="sx-s">"attack"</span>: 47022,
    <span class="sx-s">"media_defense"</span>: 71.55322580645161,
    <span class="sx-s">"media_attack"</span>: 75.84193548387097
  }
]
</pre>

<blockquote class="trivia">
<p><strong class="cabecalho">Exemplo 2 ? WTF</strong>
Usamos o <span class="kd-s">finalize</span> para sabermos a média de <span class="sx-s">attacks</span> e <span class="sx-s">defenses</span>, pra isso ao final de tudo pegamos a soma deles e dividimos pela quantidade. Simples não é? ( ͡°﻿ ͜ʖ ͡°)</p>
</blockquote>


##Aggregate
Similar ao <strong>group</strong>, podemos fazer a mesma coisa em menor tamanho de linhas. Basicamente tudo que fazemos com o group, podemos fazer com o <strong>aggregate</strong>.
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
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
<span class="c1">//exemplo 3</span>
db.pokemons.aggregate({
  <span class="nf-s">$group</span>:{
      <span class="kd-s">_id</span>:{},
      <span class="kd-s">media_defense</span>:{ <span class="nf-s">$avg</span>: '$defense'},
      <span class="kd-s">media_atack</span>: {<span class="nf-s">$avg</span>: '$attack'},
      <span class="kd-s">defense</span>: {<span class="nf-s">$sum</span>: '$defense'},
      <span class="kd-s">attack</span>: {<span class="nf-s">$sum</span>: '$attack'},
      <span class="kd-s">total</span>: {<span class="nf-s">$sum</span>: 1}
  }
})
</pre>
</div>
</td></tr>
</table>

Resultado:
<pre>{
  <span class="sx-s">"result"</span>: [
    {
      <span class="sr-s">"_id"</span>: {
        
      },
      <span class="sr-s">"media_defense"</span>: 71.55322580645161,
      <span class="sr-s">"media_atack"</span>: 75.84193548387097,
      <span class="sr-s">"defense"</span>: 44363,
      <span class="sr-s">"attack"</span>: 47022,
      <span class="sr-s">"total"</span>: 620
    }
  ],
  <span class="sx-s">"ok"</span>: 1
}
</pre>
Você vai ver que deu o mesmo valor do <em>exemplo 1</em>

###Entendendo o exemplo 3
No <em>aggregate</em> tenho uma propriedade chamada <span class="nf-s">$group</span>, e todas as funções do <em>aggregate</em> começa com o<strong> $.</strong> O <strong>_id</strong> serve para definir o agrupamento, por exemplo se eu quisesse agrupar por <em>data</em> ou <em>tempo</em>, mas como nesse exemplo não vai precisar separar nada, fica vazio. Usei a função <span class="nf-s">$avg</span> para trazer a média da coluna <span class="sx-s">defense</span> e <span class="sx-s">attack</span>, a <span class="nf-s">$sum</span> foi para trazer o somatório de cada, é importante destacar que ao definir a coluna precisamos colocar o <strong>$</strong> no início para informar o mongo que ela é uma coluna.

Como no outro exemplo fiz uma condição, no <em>aggregate</em> também podemos.
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
<pre>
<span class="c1">//exemplo 4</span>
db.pokemons.aggregate([
{<span class="nf-s">$match</span>: {types: 'fire'}},
{
  <span class="nf-s">$group</span>:{
      <span class="kd-s">_id</span>:{},
      <span class="kd-s">media_defense</span>:{ <span class="nf-s">$avg</span>: '$defense'},
      <span class="kd-s">media_atack</span>: {<span class="nf-s">$avg</span>: '$attack'},
      <span class="kd-s">defense</span>: {<span class="nf-s">$sum</span>: '$defense'},
      <span class="kd-s">attack</span>: {<span class="nf-s">$sum</span>: '$attack'},
      <span class="kd-s">total</span>: {<span class="nf-s">$sum</span>: 1}
  }
}])
</pre>
</div>
</td></tr>
</table>
Resultado:

<pre>
{
  <span class="sx-s">"result"</span>: [
    {
      <span class="sr-s">"_id"</span>: {
        
      },
      <span class="sr-s">"media_defense"</span>: 67.20754716981132,
      <span class="sr-s">"media_atack"</span>: 78.88679245283019,
      <span class="sr-s">"defense"</span>: 3562,
      <span class="sr-s">"attack"</span>: 4181,
      <span class="sr-s">"total"</span>: 53
    }
  ],
  <span class="sx-s">"ok"</span>: 1
}
</pre>

<strong>Group</strong> e <strong>Aggregate</strong> são conceitos muitos importantes e usados. Na [documentação](https://docs.mongodb.org/manual/) você pode encontrar mais exemplos.
