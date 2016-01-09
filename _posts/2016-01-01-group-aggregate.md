---
layout: post
title:  "MongoDB - Aggregate e Groups #5"
date:   2016-01-01 00:14:31 -0400
tags: mongobemean
image: '/assets/img/mongodb-post.png'
categories:
- Aprendendo o MongoDB
subtitle: Conceitos vistos na aula 05 no bemean, descobrindo a quantidade de elementos, limitando, ordenando e distinguindo valores de uma collection, agrupando...
---

# MongoDB - Aggregate e Groups

Antes de fatos aprendermos sobre Agreggate e Groups, vamos ver alguns tópicos importantes.
Para seguir os primeiros exemplos vamos usar a collection <span class="nc-s">restaurantes</span>
use o [restaurantes.json](https://raw.githubusercontent.com/Webschool-io/be-mean-instagram/master/Apostila/module-mongodb/src/data/restaurantes.json) para importar.【ツ】<br> 

##Como saber a quantidade de documentos que eu tenho? 

Podemos usar a função length:
{% highlight javascript %}
 > db.restaurantes.find().length()

{% endhighlight %}

Porém dessa forma o resultado é 'lento', para isso temos uma função própria que é muito mais rápida que o <span class="nf-s">length( )</span>
{% highlight javascript %}
 > db.restaurantes.count()
 
{% endhighlight %}

Resultado:
{% highlight javascript %}
> 25359

{% endhighlight %}

Com o <span class="nf-s">count( )</span> também podemos usar querys que usamos no <span class="nf-s">find( )</span> para saber a quantidade do que queremos.

{% highlight javascript %}
> var query = {borough:'Bronx'}
> db.restaturantes.count(query)

{% endhighlight %}

Resultado:
{% highlight javascript %}
> 2338

{% endhighlight %}


##Distinct

Neste nosso restaurantes temos a seguinte estrutura:

{% highlight json %}
  {
  "_id": ObjectId("564d6c5af9e09ea567dade51"),
  "address": {
    "building": "2780",
    "coord": [
      -73.98241999999999,
      40.579505
    ],
    "street": "Stillwell Avenue",
    "zipcode": "11224"
  },
  "borough": "Brooklyn",
  "cuisine": "American ",
  "grades": [
    {
      "date": ISODate("2014-06-10T00:00:00Z"),
      "grade": "A",
      "score": 5
    },
    {
      "date": ISODate("2013-06-05T00:00:00Z"),
      "grade": "A",
      "score": 7
    },
    {
      "date": ISODate("2012-04-13T00:00:00Z"),
      "grade": "A",
      "score": 12
    },
    {
      "date": ISODate("2011-10-12T00:00:00Z"),
      "grade": "A",
      "score": 12
    }
  ],
  "name": "Riviera Caterer",
  "restaurant_id": "40356018"
}
{% endhighlight %}

Repare, e se quisermos saber todas as <span class="sx-s">borough</span> nesse universo de 25359 documentos?
Precisamos saber encontrar valores únicos de uma propriedade, pois ela pode se repetir em outros documentos. O <span class="nf-s">distinct( ) </span>vai nos ajudar com isso.

{% highlight javascript %}
> db.restaurantes.distinct('borough')

{% endhighlight %}


Resultado:
{% highlight json %}
[
  "Brooklyn",
  "Manhattan",
  "Queens",
  "Staten Island",
  "Bronx",
  "Missing"
]
{% endhighlight %}


Ora se ele retorna um array, e usamos JavaScript, podemos usar um <span class="nf-s">length</span> para saber a quantidade não é ?
{% highlight javascript %}
> db.restaurantes.distinct('borough').length

{% endhighlight %}

Resultado: 

{% highlight javascript %}
> 6

{% endhighlight %}

##Tem como trazer o resultado ordenado ? 

Quem ae já estudou os algoritmos de ordenação, <del>sabe que dá muita raiva</del> sabe que existe vários algoritmos de ordenação e com vários casos cada um. Poxa e agora ? <del>se lascou, vai ter que implementar uma função para isso</del>
HEYY!!! Lembre, se estamos usando JavaScript, podemos usar a função <span class="nf-s">sort( )</span> para isso! e para os curiosos, ele usa o algorimo MergeSort, veja o código [aqui](http://mxr.mozilla.org/seamonkey/source/js/src/jsarray.c).

{% highlight javascript %}
> db.restaurantes.distinct('borough').sort()

{% endhighlight %}

Resultado:
{% highlight json %}
[
  "Bronx",
  "Brooklyn",
  "Manhattan",
  "Missing",
  "Queens",
  "Staten Island"
]
{% endhighlight %}

Porém se quiser fazer o contrário, use a função <span class="nf-s">reverse( )</span>

{% highlight javascript %}
> db.restaurantes.distinct('borough').sort().reverse()

{% endhighlight %}

##Limite

Agora vamos usar uma collection <span class="nc-s">pokemons</span> nos próximos exemplos, use o [pokemons.json](https://raw.githubusercontent.com/wbruno/boas-praticas-js/master/pokemon-seed/pokemons.json) para importar.



As vezes podemos querer colocar um limite de busca, assim limitando o número de resultados, como por exemplo:
{% highlight javascript %}
> db.pokemons.find({}, {name:1, _id:0}).limit(3)

{% endhighlight %}

Resultado:
{% highlight json %}
{
  "name": "Pidgeotto"
}
{
  "name": "Raticate"
}
{
  "name": "Fearow"
}
{% endhighlight %}

Com ele podemos também usar o <span class="nf-s">skip( )</span>, para pedir para pular um determinado valor.
{% highlight javascript %}
> db.pokemons.find({}, {name:1, _id:0}).limit(5)
 .skip(2)

{% endhighlight %}

Assim ele pulou os 2 primeiros pokemons e retornou os próximos 5. Podemos fazer uma paginação com ele, assim mostrando de 5 em 5 por exemplo.

{% highlight javascript %}
> db.pokemons.find({}, {name:1, _id:0}).limit(5).skip(5*0)]
> db.pokemons.find({}, {name:1, _id:0}).limit(5).skip(5*1)
> db.pokemons.find({}, {name:1, _id:0}).limit(5).skip(5*2)

{% endhighlight %}

##Distinct
Geralmente em uma collection que possui muitos documentos, contém propriedades com valores iguais. Nesse exemplo de pokemons, repare que não existe um exclusivo <span class="sx-s">type</span> pra cada um, ele se repete em outros. Vamos descobrir quais e quantos <span class="sx-s">types</span> de pokemons existe na collection:

{% highlight javascript %}
> db.pokemons.distinct('types').length
> db.pokemons.distinct('types')

{% endhighlight %}

Resultado:
{% highlight json %}
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
{% endhighlight %}

##Agrupamento 
<img src="{{ "/assets/img/memes/elements-2.png"}}">

Podemos agrupar cada tipo de pokemons e poder mandar contar quantos pokemons tem aquele valor por exemplo, tudo isso usando a função <span class="nf-s">group( )</span>.

O <strong>group</strong> tem no total 6 propriedades que podemos utilizar, vamos usar algumas delas para nossos exemplos.

1. key
2. reduce
3. initial
4. keyf
5. cond
6. finalize

Vamos ver algumas delas! (͡๏̯͡๏)۶

{% highlight javascript %}
//exemplo 1
db.pokemons.group({
  initial: {total : 0},
  reduce : function (curr, result){
    curr.types.forEach(function(type){
      if(result[type]){
        result[type]++;
      }else{
        result[type] = 1;
      }
      result.total++;
    });
  }
});
{% endhighlight %}

Resultado:
{% highlight json %}
[
  {
    "total": 934,
    "normal": 79,
    "flying": 81,
    "poison": 54,
    "bug": 58,
    "electric": 47,
    "water": 101,
    "fighting": 42,
    "psychic": 61,
    "grass": 70,
    "fairy": 31,
    "fire": 53,
    "rock": 42,
    "ice": 28,
    "ground": 53,
    "steel": 35,
    "ghost": 34,
    "dark": 35,
    "dragon": 30
  }
]
{% endhighlight %}

###Entendo o exemplo 1

Usamos algumas propriedades do group, que é o <span class="nf-s">init</span> e o <span class="nf-s">reduce</span>:
No init inicializamos a variável total para contar e em seguida o reduce onde toda a mágica acontece.
No reduce escrevemos uma função que recebe o <span class="sr-s">curr</span> como parâmetro e será de fato cada objeto, e o <span class="sr-s">result</span> que é responsável pelo resultado, em seguida acesso o tipo de cada pokemon e faço um <span class="kd-s">forEach</span> para descobrir quantos pokemons tem esse tipo.

###Colocando condições
Vamos usar a propriedade <span class="kd-s">cond</span> para informar nossa condição.

{% highlight javascript %}
db.pokemons.group({
  initial:{total : 0},
  cond   :{defense: {$gt:200}},
  reduce :function (curr, result){
    curr.types.forEach(function(type){
      if(result[type]){
        result[type]++;
      }else{
        result[type] = 1;
      }
      result.total++;
    });
  }
});
{% endhighlight %}

Resultado:
{% highlight json %}
[
  {
    "total": 2,
    "rock": 1,
    "bug": 1
  }
]
{% endhighlight %}


##Finalize
Ao contrários das outras propriedades que é sempre chamada para cada documento, o <span class="kd-s">finalize</span> é chamada apenas ao final da execução.

{% highlight javascript %}
//exemplo 2
db.pokemons.group({
  initial: {total: 0, defense: 0, attack:0},
  reduce : function (current, result){
    result.total++;
    result.defense += current.defense;
    result.attack  += current.attack;
    },
  finalize: function(result){
     result.media_defense = result.defense/result.total;
     result.media_attack  = result.attack/result.total;
  }
})
{% endhighlight %}

Resultado:

{% highlight json %}
[
  {
    "total": 620,
    "defense": 44363,
    "attack": 47022,
    "media_defense": 71.55322580645161,
    "media_attack": 75.84193548387097
  }
]
{% endhighlight %}

<blockquote class="trivia">
<p><strong class="cabecalho">Exemplo 2 ? WTF</strong>
Usamos o <span class="kd-s">finalize</span> para sabermos a média de <span class="sx-s">attacks</span> e <span class="sx-s">defenses</span>, pra isso ao final de tudo pegamos a soma deles e dividimos pela quantidade. Simples não é? ( ͡°﻿ ͜ʖ ͡°)</p>
</blockquote>

##Aggregate
Temos 3 abordagens para agregações, cada uma com sua característica e propósitos para cada situação, veremos a <em>aggregation pipeline.</em>

####Aggregation Pipeline ? 
<img src="{{ "/assets/img/memes/wtf-homer.gif"}}">

Ele é basicamente um framework para executar uma série de transformações de dados em um documento. Existe 10 tipos de transformações que podem ser utilizados.

1. [$geoNear](https://docs.mongodb.org/v3.0/reference/operator/aggregation/geoNear/)
2. [$match](https://docs.mongodb.org/v3.0/reference/operator/aggregation/match/) 
3. [$project](https://docs.mongodb.org/v3.0/reference/operator/aggregation/project/)
4. [$redact](https://docs.mongodb.org/manual/reference/operator/aggregation/redact/) 
5. [$unwind](https://docs.mongodb.org/v3.0/reference/operator/aggregation/unwind/)
6. [$group](https://docs.mongodb.org/manual/reference/operator/aggregation/group/) 
7. [$limit](https://docs.mongodb.org/manual/reference/operator/aggregation/limit/)
8. [$skip](https://docs.mongodb.org/v3.0/reference/operator/aggregation/skip/) 
9. [$sort](https://docs.mongodb.org/manual/reference/operator/aggregation/sort/)
10. [$out](https://docs.mongodb.org/v3.0/reference/operator/aggregation/out/)


Vamos ver alguns deles para nossos exemplos. =) <br>
Similar ao <strong>group</strong>, podemos fazer a mesma coisa em menor tamanho de linhas. Basicamente tudo que fazemos com o group, podemos fazer com o <strong>aggregate</strong>.
{% highlight javascript %}
//exemplo 3
db.pokemons.aggregate({
  $group:{
      _id:{},
      media_defense:{ $avg: '$defense'},
      media_atack: {$avg: '$attack'},
      defense: {$sum: '$defense'},
      attack: {$sum: '$attack'},
      total: {$sum: 1}
  }
})
{% endhighlight %}

Resultado:

{% highlight javascript %}
{
  "result": [
    {
      "_id": {
        
      },
      "media_defense": 71.55322580645161,
      "media_atack": 75.84193548387097,
      "defense": 44363,
      "attack": 47022,
      "total": 620
    }
  ],
  "ok": 1
}
{% endhighlight %}

Você vai ver que deu o mesmo valor do <em>exemplo 1</em>

###Entendendo o exemplo 3
No <em>aggregate</em> tenho uma propriedade chamada <span class="nf-s">$group</span>, aliás todas as funções do <em>aggregate</em> começa com o<strong> $</strong>. O <strong>_id</strong> serve para definir o agrupamento, por exemplo se eu quisesse agrupar por <em>data</em> ou <em>tempo</em>, mas como nesse exemplo não vamos precisar separar nada, fica vazio. Usei a função <span class="nf-s">$avg</span> para trazer a média da coluna <span class="sx-s">defense</span> e <span class="sx-s">attack</span>, a <span class="nf-s">$sum</span> foi para trazer o somatório de cada, é importante destacar que ao definir a coluna precisamos colocar o <strong>$</strong> no início para informar o mongo que ela é uma coluna.

Você deve ter reparado na facilidade que deu usando esses operadores <strong>$sum</strong> e <strong>$svg</strong> não é ? Pois bem, eles são operadores acumuladores, temos 10 no total que salva sua vida. ٩(-̮̮̃•̃)۶

1. [$sum](https://docs.mongodb.org/manual/reference/operator/aggregation/sum/)
2. [$avg](https://docs.mongodb.org/manual/reference/operator/aggregation/avg/)
3. [$first](https://docs.mongodb.org/manual/reference/operator/aggregation/first/#grp._S_first)
4. [$last](https://docs.mongodb.org/manual/reference/operator/aggregation/last/)
5. [$max](https://docs.mongodb.org/manual/reference/operator/aggregation/max/)
6. [$min](https://docs.mongodb.org/manual/reference/operator/aggregation/min/)
7. [$push](https://docs.mongodb.org/manual/reference/operator/aggregation/push/)
8. [$addToSet](https://docs.mongodb.org/manual/reference/operator/aggregation/addToSet/)
9. [$stdDevPop](https://docs.mongodb.org/manual/reference/operator/aggregation/stdDevPop/)
10. [$stdDevSamp](https://docs.mongodb.org/manual/reference/operator/aggregation/stdDevSamp/)

Como no outro exemplo fiz uma condição, no <em>aggregate</em> também podemos.
{% highlight javascript %}
//exemplo 4
db.pokemons.aggregate([
{$match: {types: 'fire'}},
{
  $group:{
      _id:{},
      media_defense:{ $avg: '$defense'},
      media_atack: {$avg: '$attack'},
      defense: {$sum: '$defense'},
      attack: {$sum: '$attack'},
      total: {$sum: 1}
  }
}])
{% endhighlight %}

Resultado:
{% highlight javascript %}
{
  "result": [
    {
      "_id": {
        
      },
      "media_defense": 67.20754716981132,
      "media_atack": 78.88679245283019,
      "defense": 3562,
      "attack": 4181,
      "total": 53
    }
  ],
  "ok": 1
}
{% endhighlight %}
 
<strong>Group</strong> e <strong>Aggregate</strong> são conceitos muitos importantes e usados. Na [documentação](https://docs.mongodb.org/manual/) você pode encontrar mais exemplos.
