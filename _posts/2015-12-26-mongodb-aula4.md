---
layout: post
title:  "MongoDB - Atualizando e removendo #4.1 #4.2"
date:   2015-12-26 00:06:31 -0400
tags: mongobemean
subtitle: Conceitos vistos na aula 4.1 e 4.2 no bemean, atualizando e removendo objetos, operadores de array, operadores de buscas em arrays, operadores de negação... 
---
#Atualizando e removendo
(,")

##UPDATE

No MongoDB não existe só uma forma de atualizar o documento, uma das formas já vimos [neste post](http://victorvoid.github.io/2015/12/07/mongodb-aula-1-2-3-be-mean.html), que foi fazendo uma busca usando o <span class="nf-s">findOne( )</span>, e através do resultado modificamos e usamos a função <span class="nf-s">save( )</span>, porém esse caminho é grande, perceba que precisamos fazer a busca, salvar na variável, e modificar para depois salvar.

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
<div class="highlight">
<pre>
&gt; var query = {name: 'Carterpie'}
&gt; var p     = db.pokemons.findOne(query)
&gt; p.name    = 'RatoCabeludo'
&gt; db.pokemons.save(p)
</pre>
</div>
</td></tr>
</table>

###Qual a melhor forma? 

Ele possui uma função chamada <span class="nf-s">update( )</span> que tem esse objetivo de fazer tudo de uma só vez. Contém 3 parâmetros que veremos com mais detalhe cada um.

<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; db.colecao.update(query, modificador, options);
</pre>
</div>
</td></tr>
</table>
<blockquote class="trivia">
<p><strong class="cabecalho">Info 1</strong>
O parâmetro <span class="kd-s">options</span> não é obrigatório.</p>
</blockquote>
Vamos inserir um objeto para modificarmos
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
<div class="highlight">
<pre>
&gt; var poke = {name: "Testemon", attack: 8000, 
	      defense: 8000, height: 2.1, 
	      description: "Pokemon de teste"}
&gt; db.pokemons.save(poke);
&gt; var query = {name: /testemon/i}
&gt; db.pokemons.find(query);
</pre>
</div>
</td></tr>
</table>
<blockquote class="trivia">
<p><strong class="cabecalho">Info 2</strong>
Na variável <span class="kd-s">query</span> passamos o name, porém usamos a barra entre o nome, isso é uma <strong>REGEX</strong>, o <strong>i</strong> informa que não importa se é maiúsculo ou minúsculo. Assim fazendo uma busca Case insensitive</p>
</blockquote>
Me retornou: 
<pre>
{
  "_id": ObjectId("5665171cd394bd50ba306acd"),
  "name": "Testemon",
  "attack": 8000,
  "defense": 8000,
  "height": 2.1,
  "description": "Pokemon de teste"
}
</pre>

##Vamos modificar o Testemon
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
&gt; var query = {name: /testemon/i}
&gt; var mod   = {description: "Mudei aqui"}
&gt; db.pokemons.update(query, mod)
</pre>
</div>
</td></tr>
</table>
Agora faça um
<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; db.pokemons.find(query);
</pre>
</div>
</td></tr>
</table>
<pre>
{
  "_id": ObjectId("5665171cd394bd50ba306acd"),
  "description": "Mudei aqui"
}
</pre>

##Ué cadê meus outros campos ? 
<img src="{{ "/img/homer-pensando.gif"}}">

hahaha fiz de propósito, essa forma é incorreta, para isso precisamos saber alguns operadores de modificação. <del>Concerte a merda </del>Adicione os valores de volta para continuarmos.

##Operadores de modificação

<strong>$set</strong>: modifica um valor caso já exista, caso não exista, o $set irá criar o campo com esse valor que está alterando.
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
&gt; var mod = {$set:
	       {
	         name:'Testemon', attack: 8000, 
	         defense: 8000, height: 2.1, 
	         description: "Pokemon de teste"
	       }
	   }
&gt; db.pokemons.update(query, mod)
</pre>
</div>
</td></tr>
</table>

<strong>$unset</strong>: remove campos.
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
&gt; var mod = {$unset: {height: 1}} 
&gt; db.pokemons.update(query,mod)
</pre>
</div>
</td></tr>
</table>

<blockquote class="trivia">
<p><strong class="cabecalho">Info 3</strong>
Informe 1 (<span class="nf-s">true</span>) nos campos desejável, assim removendo o campo.</p>
</blockquote>

<strong>$inc</strong>: para incrementar um valor e caso o campo não exista, ele irá criar o campo e setar o valor, e para decrementar, passe o valor negativo.
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
&gt; var mod = {$inc:{attack:1}} <span class="c1"> //-1 para decrementar</span>
&gt; db.pokemons.update(query,mod)
</pre>
</div>
</td></tr>
</table>

Nos documentos também temos arrays, e se agora queremos também trabalhar com eles, precisamos saber os seus operadores.

##Operadores de Array

<strong>$push</strong>: ele adiciona um valor ao campo do array caso ele já esteja no documento, e caso não exista esse array, ele irá criar esse campo do tipo array que está passando.
<em>Caso o campo não existe e não for um array, irá retornar um erro.</em>

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
&gt; var mod = {$push: {moves: 'choque de trovão'}}
&gt; db.pokemons.update(query, mod)
&gt; db.pokemons.find(query)
</pre>
</div>
</td></tr>
</table>
<pre>	
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
</pre>

<strong>$pushAll</strong>: se utiliza quando queremos passar mais de um valor para um array.
<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
 2



 3
 4
 5
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; var query = {name: /pokemon de teste/i}
&gt; var attacks =[
                 'choque do trovão', 
                 'ataque rapido', 
                 'bola elétrica'
               ]
&gt; var mod = {$pushAll: {moves: attacks}}
&gt; db.pokemons.update(query, mod)
&gt; db.pokemons.find(query)
</pre>
</div>
</td></tr>
</table>
<pre>
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
</pre>

<strong>$pull</strong>: retira o valor do campo, caso o campo seja um array existente. Caso não exista ele não fará nada, e se o campo existir e não for array, ocorre em um erro.
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
&gt; var mod = {$pull:{moves: 'bola elétrica'}}
&gt; db.pokemons.update(query,mod)
&gt; db.pokemons.find(query)
</pre>
</div>
</td></tr>
</table>
<pre>
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
</pre>

<strong>$pullAll</strong>: inverso do <strong>$pushAll</strong>, retira todos os valores passado por um array.
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
<div class="highlight">
<pre>
&gt; var attacks = [ "choque do trovão","ataque rapido"]
&gt; var mod = {$pullAll: {moves: attacks}}
&gt; db.pokemons.update(query,mod)
&gt; db.pokemons.find(query)
</pre>
</div>
</td></tr>
</table>

<pre>
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
</pre>

###Parâmetro OPTIONS do UPDATE

Lembra daquele último parâmetro que falei que não era obrigatório ? 
<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; db.colecao.update(query, modificador, options);
</pre>
</div>
</td></tr>
</table>

##OPTIONS

####Para que ele serve ?

Simples, para configurar alguns valores diferentes do padrão em nosso <em>update</em>.
Possui os seguintes parâmetros:

<pre>
{
	upsert:       boolean
	multi:        boolean
	writeConcern: document
}
</pre>

##upsert

Lembra de quando fazemos a busca e colocamos no parâmetro de modificação o valor a ser modificado ? Caso a query não seja encontrada, ele **NÃO** fará nada, e retornará para você:
<pre>
WriteResult({
  "nMatched": 0,
  "nUpserted": 0,
  "nModified": 0
})
</pre>
Tem como modificar esse comportamento ? Sim, o **upsert** serve justamente para isso, por padrão o valor dele é <span class="err-s">false</span>, com isso não fará nada, mas se modificar para <span class="nf-s">true</span>, ele insere o objeto que está sendo passado como modificação.<br>
Vamos ao seguinte exemplo, modificando o valor do 'upsert':

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
<div class="highlight">
<pre>
&gt; var query   = {name : 'esse campo nao existe'}
&gt; var mod     = {$push: {moves: 'campo de fogo'}}
&gt; var options = {upsert: true}
&gt; db.pokemons.update(query, mod, options)
</pre>
</div>
</td></tr>
</table>
<pre>
WriteResult({
  "nMatched": 0, <span class="c1-s">//não encontrou</span>
  "nUpserted": 1 <span class="c1-s">//porém fez um upsert</span>
  "nModified": 0,
  "_id": ObjectId("567df96b8c9d5a59c75d1501") 
  <span class="c1-s">//objeto que foi inserido</span>
})
</pre>
<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; db.pokemons.find(query)
</pre>
</div>
</td></tr>
</table>
<pre>
{
  "_id": ObjectId("567df96b8c9d5a59c75d1501"),
  "name": "esse campo nao existe",
  "moves": [
    "choque de fogo"
  ]
}
</pre>
Percebeu que ele criou um novo documento ? =) <br>
<br>
<strong>$setOnInsert</strong>: serve para que podemos colocar um documento que seja inserido caso o upsert seja true e aconteça essa inserção. <br>
Vamos fazer um exemplo que seta os valores comuns para nosso objeto caso ele não seja encontrado no nosso update.
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
<div class="highlight">
<pre>
&gt; var query= {name : 'naoexiste'}
&gt; var mod  = {$push: 
                {moves: 'campo de água'},
                $setOnInsert:{
                 attack: null,
                 defense: null,
                 height: null, 
                 description: "Sem informações"	
                }
             }
&gt; var options = {upsert: true}
&gt; db.pokemons.update(query, mod, options)
</pre>
</div>
</td></tr>
</table>
<pre>
WriteResult({
  "nMatched": 0,
  "nUpserted": 1,
  "nModified": 0,
  "_id": ObjectId("567dffac8c9d5a59c75d1502")
})
</pre><br>
<span class="c1-s">Repare que agora ele fez uma inserção, pois não foi encontrada a query.</span>
<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; db.pokemons.find(query)
</pre>
</div>
</td></tr>
</table>
<pre>
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
</pre><br>

##MULTI

Lembra daqueles updates sem **WHERE** no banco relacional ? <del>só faltava quebrar tudo pela frente:p</del>
lá precisamos usar o **where** para informar quais os objetos que você quer atualizar, caso contrário <del>nem queira saber</del> ☹ vai atualizar todos. <br>
O MongoDB não deixa acontecer esse tipo de <del>cagada</del> situação. (✌╰_╯)☞ <br>
Por padrão ele só deixa alterar um de cada vez, a não ser que você passe por parâmetro desse multi como <span class="nf-s">true</span>.

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
<div class="highlight">
<pre>
&gt; var query   = {}
&gt; var mod     = {$set:{active: false}}
&gt; var options = {multi: true}
&gt; db.pokemons.find(query)
</pre>
</div>
</td></tr>
</table>
Agora se você for verificar, vai ver que todos os documentos estão com uma active <span class="err-s">false</span>. Só assim você consegue fazer um update em vários documentos, alterando seu campo **multi**.

##WRITECONCERN

Ele descreve a garantia de que o MongoDB fornece ao relatar o sucesso de uma operação de escrita. Se você quer isso rápido, ele pode ter uma preocupação fraca, cajo queira uma preocupação forte, ele retorna mais demorado. Porém com a preocupação mais fraca, pode ocorrer de não persistir os dados, e não vai saber sobre aquele erro que pode ter acontecido após alguma coisa, agora com a preocupação mais demorada, ele espera o MongoDB confirmar a alteração de escrita pra você, então a garantia é maior.
Mais sobre o assunto: <a href="https://docs.mongodb.org/v3.0/reference/write-concern/">Clique aqui</a>

##Buscas em arrays ? 

Agora vamos aprimorar nossas buscas, aprendendo fazer buscas em arrays, mas para isso vamos inserir arrays em todos os nossos objetos. (Opa em todos ? Já sabemos fazer isso.)

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
<div class="highlight">
<pre>
&gt; var query   = {}
&gt; var mod     = {$set: {moves:['investida']}}
&gt; var options = {multi: true}
&gt; db.pokemons.update(query, mod, options)
</pre>
</div>
</td></tr>
</table>
<pre>
WriteResult({
  "nMatched": 11,
  "nUpserted": 0,
  "nModified": 11
})
</pre>

Vamos inserir mais dados nos arrays para depois fazermos buscas:
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
<div class="highlight">
<pre>
&gt; var query = {name: /Arcanine/i}
&gt; var mod   = {$push: {moves: 'veloz demais'}}
&gt; db.pokemons.update(query, mod)

&gt; var query = {name: /Psyduck/i}
&gt; var mod   = {$push: {moves: 'lança chamas'}}
&gt; db.pokemons.update(query, mod)

&gt; var query = {name: /Metapod/i}
&gt; var mod   = {$push: {moves: 'folha navalha'}}
&gt; db.pokemons.update(query, mod)
</pre>
</div>
</td></tr>
</table>

Pronto! Agora já temos arrays em nossos objetos.

###Operadores de buscas em arrays:

<strong>$in</strong>: ele retorna todos os documentos que tem no seu determinado array o valor passado por parâmetro, caso queira especificar mais valores do array, use apenas uma virgula para informar outro valor.
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
&gt; var query = {moves: {$in: [/veloz demais/i]}}
&gt; db.pokemons.find(query)
</pre>
</div>
</td></tr>
</table>
<pre>
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
</pre><br>

<strong>$nin</strong>: É o inverso do $in, e retorna os objetos que não tiverem no valor passado no array.

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
&gt; var query = {moves: {$nin: [/folha navalha"/i]}}
&gt; db.pokemons.find(query)
</pre>
</div>
</td></tr>
</table><br>
Vai retornar todos os objetos que não tem no seu array moves o valor 'folha navalha'.

<strong>$all</strong>: Ele é semelhante o **$and**, pois só vai retornar se todos os valores passado por parâmetro do array se forem encontrado no objeto.
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
&gt; var query = {moves: {$all: 
                            [
                            'folha navalha', 
                            'investida'
                            ]
                       }
               }
&gt; db.pokemons.find(query)
</pre>
</div>
</td></tr>
</table><br>

##Operadores de Negação

<strong>$ne</strong>(not equal): ele nos ajuda a procurar todos os objetos que não tempo determinado valor. <br>
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
&gt; var query = {type: {$ne: 'grama'}}
&gt; db.pokemons.find(query)
</pre>
</div>
</td></tr>
</table>

E então vai retornar os diversos objetos que não tem o tipo grama. Bem simples. =) 
<blockquote class="trivia">
<p><strong class="cabecalho">Info 3</strong>
<span class="err-s">Cuidado</span> ele não aceita <strong>REGEX</strong>. sVocê não pode passar uma regex usando esse operador, ocorrerá em um erro.
<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
<del>var query = {type: {$ne: /grama/i}} </del>
</pre>
</div>
</td></tr>
</table>
</p>
</blockquote>

<strong>$not</strong>: retorna todos os objetos que não tenha determinada <del>coisa</del> atribuição.

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
&gt; var query = {name: {$not:/Golbat/i}}
&gt; db.pokemons.find(query)
</pre>
</div>
</td></tr>
</table>


##REMOVE

É simples, para removermos um documento, utilizaremos a função <span class="nf-s">remove( )</span> que é própria para isso, e de resto você já sabe, utilize os diversos modos de criar uma query para achar os documentos que queira excluir.

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
&gt; var query = {name: /Golbat/i}
&gt; db.pokemons.remove(query)
</pre>
</div>
</td></tr>
</table>

<blockquote class="trivia">
<p><strong class="cabecalho">Info 3</strong>
<span class="err-s">Cuidado</span> ele é multi <span class="nf-s">true</span>.
</p>
</blockquote>

Se você der um remove sem nada na query, ele apagará tudo. =(<br>
<del>Cuidado para não fazer merda!!!</del> ٩(-̮̮̃-̃)۶