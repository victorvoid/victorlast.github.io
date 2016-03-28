---
layout: post
title:  "Como atualizar e remover no MongoDB ?"
date:   2015-12-26 00:06:31
tags: mongodb
description: Atualizando e removendo objetos, operadores de array, operadores de buscas em arrays e operadores de negação.
---
Atualizando e removendo objetos, operadores de array, operadores de buscas em arrays e operadores de negação.

# Atualizando e Removendo dados

<img src="{{ "/assets/img/mongodb-update/digitando-rapido.gif"}}">

<del>Agora o bicho vai pegar LOL.</del>

## UPDATE

No MongoDB não existe só uma forma de atualizar o documento, uma das formas já vimos [neste post](http://victorvoid.github.io/2015/12/07/mongodb-aula-1-2-3-be-mean.html), que foi fazendo uma busca usando o <span class="nf-s">findOne( )</span>, e através do resultado modificamos e usamos a função <span class="nf-s">save( )</span>, porém esse caminho é grande, perceba que precisamos fazer a busca, salvar na variável, e modificar para depois salvar.
{% highlight javascript %}
> var query = {name: 'Carterpie'}
> var p     = db.pokemons.findOne(query)
> p.name    = 'RatoCabeludo'
> db.pokemons.save(p)

{% endhighlight %}

### Qual a melhor forma?

Ele possui uma função chamada <span class="nf-s">update( )</span> que tem esse objetivo de fazer tudo de uma só vez. Contém 3 parâmetros que veremos com mais detalhe cada um.

{% highlight javascript %}
> db.colecao.update(query, modificador, options);

{% endhighlight %}

<blockquote class="trivia">
<p><strong class="cabecalho">Info 1</strong>
O parâmetro <span class="kd-s">options</span> não é obrigatório.</p>
</blockquote>
Vamos inserir um objeto para modificarmos

{% highlight javascript %}
> var poke = {name: "Testemon", attack: 8000,
        defense: 8000, height: 2.1,
        description: "Pokemon de teste"}
> db.pokemons.save(poke);
> var query = {name: /testemon/i}
> db.pokemons.find(query);

{% endhighlight %}

<blockquote class="trivia">
<p><strong class="cabecalho">Info 2</strong>
Na variável <span class="kd-s">query</span> passamos o name, porém usamos a barra entre o nome, isso é uma <strong>REGEX</strong>, o <strong>i</strong> informa que não importa se é maiúsculo ou minúsculo. Assim fazendo uma busca Case insensitive</p>
</blockquote>
Me retornou:

{% highlight json %}
{
  "_id": ObjectId("5665171cd394bd50ba306acd"),
  "name": "Testemon",
  "attack": 8000,
  "defense": 8000,
  "height": 2.1,
  "description": "Pokemon de teste"
}
{% endhighlight %}

## Vamos modificar o Testemon

{% highlight javascript %}
> var query = {name: /testemon/i}
> var mod   = {description: "Mudei aqui"}
> db.pokemons.update(query, mod)

{% endhighlight %}

Agora agora faça uma busca

{% highlight javascript %}
> db.pokemons.find(query);

{% endhighlight %}

{% highlight json %}
{
  "_id": ObjectId("5665171cd394bd50ba306acd"),
  "description": "Mudei aqui"
}
{% endhighlight %}


## Ué cadê meus outros campos ?
<img src="{{ "/assets/img/mongodb-update/i-have-no-idea.gif"}}">

hahaha fiz de propósito, essa forma é incorreta, para isso precisamos saber alguns operadores de modificação. <del>Concerte a merda </del>Adicione os valores de volta para continuarmos.

## Operadores de modificação

<strong>$set</strong>: modifica um valor caso já exista, caso não exista, o $set irá criar o campo com esse valor que está alterando.

{% highlight javascript %}
> var mod = {$set:
         {
           name:'Testemon', attack: 8000,
           defense: 8000, height: 2.1,
           description: "Pokemon de teste"
         }
     }
> db.pokemons.update(query, mod)

{% endhighlight %}

<strong>$unset</strong>: remove campos.
{% highlight javascript %}
> var mod = {$unset: {height: 1}}
> db.pokemons.update(query,mod)

{% endhighlight %}

<blockquote class="trivia">
<p><strong class="cabecalho">Info 3</strong>
Informe 1 (<span class="nf-s">true</span>) nos campos desejável, assim removendo o campo.</p>
</blockquote>

<strong>$inc</strong>: para incrementar um valor e caso o campo não exista, ele irá criar o campo e setar o valor, e para decrementar, passe o valor negativo.
{% highlight javascript %}
> var mod = {$inc:{attack:1}}
 //-1 para decrementar
> db.pokemons.update(query,mod)

{% endhighlight %}

Nos documentos também temos arrays, e se agora queremos também trabalhar com eles, precisamos saber os seus operadores.

## Operadores de Array

<strong>$push</strong>: ele adiciona um valor ao campo do array caso ele já esteja no documento, e caso não exista esse array, ele irá criar esse campo do tipo array que está passando.
<em>Caso o campo não existe e não for um array, irá retornar um erro.</em>

{% highlight javascript %}
> var mod = {$push: {moves: 'choque de trovão'}}
> db.pokemons.update(query, mod)
> db.pokemons.find(query)

{% endhighlight %}

{% highlight json %}
{
  "_id": ObjectId("5665171cd394bd50ba306acd"),
  "description": "Pokemon de teste",
  "name": "Testemon",
  "attack": 8001,
  "defense": 8000,
  "moves": [
    "choque de trovão"
  ]
}
{% endhighlight %}

**$pushAll**: se utiliza quando queremos passar mais de um valor para um array.
{% highlight javascript %}
> var query = {name: /pokemon de teste/i}
> var attacks =[
                 'choque do trovão',
                 'ataque rapido',
                 'bola elétrica'
               ]
> var mod = {$pushAll: {moves: attacks}}
> db.pokemons.update(query, mod)
> db.pokemons.find(query)

{% endhighlight %}
{% highlight json %}
{
  "_id": ObjectId("5665171cd394bd50ba306acd"),
  "description": "Pokemon de teste",
  "name": "Testemon",
  "attack": 8001,
  "defense": 8000,
  "moves": [
    "choque de trovão",
    "ataque rapido",
    "bola elétrica"
  ]
}
{% endhighlight %}

**$pull**: retira o valor do campo, caso o campo seja um array existente. Caso não exista ele não fará nada, e se o campo existir e não for array, ocorre em um erro.
{% highlight javascript %}
> var mod = {$pull:{moves: 'bola elétrica'}}
> db.pokemons.update(query,mod)
> db.pokemons.find(query)

{% endhighlight %}

{% highlight json %}
{
  "_id": ObjectId("5665171cd394bd50ba306acd"),
  "description": "Pokemon de teste",
  "name": "Testemon",
  "attack": 8001,
  "defense": 8000,
  "moves": [
    "choque do trovão",
    "ataque rapido"
  ]
}
{% endhighlight %}

**$pullAll**: inverso do <strong>$pushAll</strong>, retira todos os valores passado por um array.
{% highlight javascript %}
> var attacks = [
               "choque do trovão",
               "ataque rapido"
                ]
> var mod = {$pullAll: {moves: attacks}}
> db.pokemons.update(query,mod)
> db.pokemons.find(query)

{% endhighlight %}

{% highlight javascript %}
{
    "choque do trovão",
    "ataque rapido"
  "_id": ObjectId("5665171cd394bd50ba306acd"),
  "description": "Pokemon de teste",
  "name": "Testemon",
  "attack": 8001,
  "defense": 8000,
  "moves": [
    "choque de trovão"
  ]
}
{% endhighlight %}

### Parâmetro OPTIONS do UPDATE

Lembra daquele último parâmetro que falei que não era obrigatório ?
{% highlight javascript %}
> db.colecao.update(query, modificador, options);

{% endhighlight %}

## OPTIONS

#### Para que ele serve ?

Simples, para configurar alguns valores diferentes do padrão em nosso <em>update</em>.
Possui os seguintes parâmetros:
{% highlight json %}
{
  upsert:       boolean
  multi:        boolean
  writeConcern: document
}
{% endhighlight %}

## upsert

Lembra de quando fazemos a busca e colocamos no parâmetro de modificação o valor a ser modificado ? Caso a query não seja encontrada, ele **NÃO** fará nada, e retornará para você:
{% highlight javascript %}
WriteResult({
  "nMatched": 0,
  "nUpserted": 0,
  "nModified": 0
})
{% endhighlight %}

Tem como modificar esse comportamento ? Sim, o **upsert** serve justamente para isso, por padrão o valor dele é <span class="err-s">false</span>, com isso não fará nada, mas se modificar para <span class="nf-s">true</span>, ele insere o objeto que está sendo passado como modificação.<br>
Vamos ao seguinte exemplo, modificando o valor do 'upsert':

{% highlight javascript %}
> var query   = {name : 'esse campo nao existe'}
> var mod     = {$push: {moves: 'campo de fogo'}}
> var options = {upsert: true}
> db.pokemons.update(query, mod, options)

{% endhighlight %}

{% highlight javascript %}
WriteResult({
  "nMatched": 0, //não encontrou
  "nUpserted": 1 //porém fez um upsert
  "nModified": 0,
  "_id": ObjectId("567df96b8c9d5a59c75d1501")
  //objeto que foi inserido
})
{% endhighlight %}

{% highlight javascript %}
> db.pokemons.find(query)

{% endhighlight %}

{% highlight json %}
{
  "_id": ObjectId("567df96b8c9d5a59c75d1501"),
  "name": "esse campo nao existe",
  "moves": [
    "choque de fogo"
  ]
}
{% endhighlight %}

Percebeu que ele criou um novo documento ? =) <br>
<br>
**$setOnInsert**: serve para que podemos colocar um documento que seja inserido caso o upsert seja true e aconteça essa inserção. <br>
Vamos fazer um exemplo que seta os valores comuns para nosso objeto caso ele não seja encontrado no nosso update.
{% highlight javascript %}
> var query= {name : 'naoexiste'}
> var mod  = {$push:
                {moves: 'campo de água'},
                $setOnInsert:{
                 attack: null,
                 defense: null,
                 height: null,
                 description: "Sem informações"
                }
             }
> var options = {upsert: true}
> db.pokemons.update(query, mod, options)

{% endhighlight %}
{% highlight javascript %}
WriteResult({
  "nMatched": 0,
  "nUpserted": 1,
  "nModified": 0,
  "_id": ObjectId("567dffac8c9d5a59c75d1502")
})
{% endhighlight %}

{% highlight javascript %}
> db.pokemons.find(query)

{% endhighlight %}

<span class="c1-s">Repare que agora ele fez uma inserção, pois não foi encontrada a query.</span>
{% highlight json %}
{
  "_id": ObjectId("567dffac8c9d5a59c75d1502"),
  "name": "naoexiste",
  "moves": [
    "campo de água"
  ],
  "attack": null,
  "defense": null,
  "height": null,
  "description": "Sem maiores informações"
}
{% endhighlight %}

## MULTI

Lembra daqueles updates sem **WHERE** no banco relacional ? <del>só faltava quebrar tudo pela frente:p</del>
lá precisamos usar o **where** para informar quais os objetos que você quer atualizar, caso contrário <del>nem queira saber</del> ☹ vai atualizar todos. <br>
O MongoDB não deixa acontecer esse tipo de <del>cagada</del> situação. (✌╰_╯)☞ <br>
Por padrão ele só deixa alterar um de cada vez, a não ser que você passe por parâmetro desse multi como <span class="nf-s">true</span>.

{% highlight javascript %}
> var query   = {}
> var mod     = {$set:{active: false}}
> var options = {multi: true}
> db.pokemons.find(query)

{% endhighlight %}

Agora se você for verificar, vai ver que todos os documentos estão com uma active <span class="err-s">false</span>. Só assim você consegue fazer um update em vários documentos, alterando seu campo **multi**.

## WRITECONCERN

Ele descreve a garantia de que o MongoDB fornece ao relatar o sucesso de uma operação de escrita. Se você quer isso rápido, ele pode ter uma preocupação fraca, cajo queira uma preocupação forte, ele retorna mais demorado. Porém com a preocupação mais fraca, pode ocorrer de não persistir os dados, e não vai saber sobre aquele erro que pode ter acontecido após alguma coisa, agora com a preocupação mais demorada, ele espera o MongoDB confirmar a alteração de escrita pra você, então a garantia é maior.
Mais sobre o assunto: <a href="https://docs.mongodb.org/v3.0/reference/write-concern/">Clique aqui</a>

## Buscas em arrays ?

Agora vamos aprimorar nossas buscas, aprendendo fazer buscas em arrays, mas para isso vamos inserir arrays em todos os nossos objetos. (Opa em todos ? Já sabemos fazer isso.)

{% highlight javascript %}
> var query   = {}
> var mod     = {$set: {moves:['investida']}}
> var options = {multi: true}
> db.pokemons.update(query, mod, options)

{% endhighlight %}

{% highlight javascript %}
WriteResult({
  "nMatched": 11,
  "nUpserted": 0,
  "nModified": 11
})
{% endhighlight %}

Vamos inserir mais dados nos arrays para depois fazermos buscas:

{% highlight javascript %}
> var query = {name: /Arcanine/i}
> var mod   = {$push: {moves: 'veloz demais'}}
> db.pokemons.update(query, mod)

> var query = {name: /Psyduck/i}
> var mod   = {$push: {moves: 'lança chamas'}}
> db.pokemons.update(query, mod)

> var query = {name: /Metapod/i}
> var mod   = {$push: {moves: 'folha navalha'}}
> db.pokemons.update(query, mod)

{% endhighlight %}

Pronto! Agora já temos arrays em nossos objetos.

### Operadores de buscas em arrays:

**$in**: ele retorna todos os documentos que tem no seu determinado array o valor passado por parâmetro, caso queira especificar mais valores do array, use apenas uma virgula para informar outro valor.

{% highlight javascript %}
> var query = {moves: {$in: [/veloz demais/i]}}
> db.pokemons.find(query)

{% endhighlight %}

{% highlight json %}
{
  "_id": ObjectId("564da193ab81d6513c255cac"),
  "name": "Arcanine",
  "description": "Arcanine is known for its high speed.",
  "type": "Fire",
  "attack": 60,
  "defence": 40,
  "height": 1.9,
  "moves": [
    "investida",
    "veloz demais"
  ]
}
{% endhighlight %}

**$nin**: É o inverso do $in, e retorna os objetos que não tiverem no valor passado no array.

{% highlight javascript %}
> var query = {moves: {$nin: [/folha navalha"/i]}}
> db.pokemons.find(query)

{% endhighlight %}

Vai retornar todos os objetos que não tem no seu array moves o valor 'folha navalha'.

**$all**: Ele é semelhante o **$and**, pois só vai retornar se todos os valores passado por parâmetro do array se forem encontrado no objeto.
{% highlight javascript %}
> var query = {moves: {$all:
                            [
                            'folha navalha',
                            'investida'
                            ]
                       }
               }
> db.pokemons.find(query)

{% endhighlight %}

## Operadores de Negação

**$ne**(not equal): ele nos ajuda a procurar todos os objetos que não tempo determinado valor.

{% highlight javascript %}
> var query = {type: {$ne: 'grama'}}
> db.pokemons.find(query)

{% endhighlight %}

E então vai retornar os diversos objetos que não tem o tipo grama. Bem simples. =)
<blockquote class="trivia">
<p><strong class="cabecalho">Info 4</strong>
<span class="err-s">Cuidado</span> ele não aceita <strong>REGEX</strong>. Você não pode passar uma regex usando esse operador, ocorrerá em um erro.
</p>
</blockquote>

{% highlight javascript %}
var query = {type: {$ne: /grama/i}} //<--JAMAIS FAÇA ISSO LOL
{% endhighlight %}

**$not**: retorna todos os objetos que não tenha determinada <del>coisa</del> atribuição.

{% highlight javascript %}
> var query = {name: {$not:/Golbat/i}}
> db.pokemons.find(query)

{% endhighlight %}

## REMOVE

É simples, para removermos um documento, utilizaremos a função <span class="nf-s">remove( )</span> que é própria para isso, e de resto você já sabe, utilize os diversos modos de criar uma query para achar os documentos que queira excluir.

{% highlight javascript %}
> var query = {name: /Golbat/i}
> db.pokemons.remove(query)

{% endhighlight %}

<blockquote class="trivia">
<p><strong class="cabecalho">Info 5</strong>
<span class="err-s">Cuidado</span> ele é multi <span class="nf-s">true</span>.
</p>
</blockquote>

Se você der um remove sem nada na query, ele apagará tudo. =(<br>
<del>Cuidado para não fazer merda!!!</del> ٩(-̮̮̃-̃)۶

## Concluindo

E é isso, agora se divirta treinando modificando seus dados usando todos os operadores, tenta criar atualizações de vários dados simultâneos com javascript, abuse dos laços de repetições e condições, até a próxima, bye!

<img src="{{ "/assets/img/mongodb123/bye.gif"}}">