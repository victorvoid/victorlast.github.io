---
layout: post
title:  "MongoDB - Introdução #1 #2 #3 "
date:   2015-12-07 00:06:31 -0400
tags: mongobemean
subtitle: Conceitos vistos na aula 01, 02, 03 no bemean, importação, exportação, insercão, operadores aritméticos, buscas básicas, operador de existência...
---

<a target="_blank" href="https://en.wikipedia.org/wiki/MongoDB">MongoDB - Wiki</a>

<a target="_blank" href="https://www.mongodb.org/downloads#production">Clique aqui para instalar o MongoDB</a>

#Introdução ao MongoDB
Inicializando o mongoDB (levantando)

<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; mongod
</pre>
</div>
</td></tr>
</table>

Depois de inicializar, para que você abra o client de desenvolvimento do mongoDB use apenas o comando:

<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; mongo
</pre>
</div>
</td></tr>
</table>

##Comandos básicos

<img class="img-responsive" src="{{ "/img/homer-pensando.gif"}}">

*Os exemplos foram feitos de acordo com o meu database, caso a sua esteja vazia, você pode baixar [esse](https://raw.githubusercontent.com/Webschool-io/be-mean-instagram/master/Apostila/module-mongodb/src/data/pokemons.json) arquivo JSON.*

Exportar arquivos de uma coleção para um arquivo JSON:

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
&gt; mongoexport --db nomedodatabase --collection 
  nomedacolecao --out minha_colecao.json 
</pre>
</div>
</td></tr>
</table>

Importar os dados de um JSON:

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
&gt; mongoimport --db database --collection
  collection --drop --file data.json
</pre>
</div>
</td></tr>
</table>

Caso não exista o banco ou a collection, ele irá criar um novo, como por exemplo:

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
 &gt; mongoimport --db be-mean --collection clientes 
  --drop --file clientes.json
</pre>
</div>
</td></tr>
</table>

##Selecionando o banco para usá-lo

<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; use nomedobanco
</pre>
</div>
</td></tr>
</table>

Caso ele não exista, o mongo vai criar a database. Se quiser levantar o client em uma database já selecionada para usar:

<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; mongo be-mean-instagram
</pre>
</div>
</td></tr>
</table>

Agora se eu usar o comando:

<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; db </pre>
</div>
</td></tr>
</table>

Ele me retornará o nome do banco que está em uso.
Mas e se eu quiser listar todos os bancos que eu tenho ?

<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; show dbs
</pre>
</div>
</td></tr>
</table>

Fácil não é ?

No mongoDB não temos tabelas, no noSQL, elas tem o nome de collections, e para listar as collections que tenho no banco é:

<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; show collections
</pre>
</div>
</td></tr>
</table>

##Inserção

Para fazer uma inserção vamos usar um exemplo de um banco já criado, e lembre-se, use o comando para usá-lo e em seguida uma inserção para ele alocar um espaço do banco.

Inserindo na collection teste, como vai ser a primeira vez, ele irá criar.

<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; db.teste.insert({nome: "Victor", idade:18})
</pre>
</div>
</td></tr>
</table>

Agora sim ele alocou no hd, pois teve uma inserção de dados e quando usarmos o comando para listar os bancos ele irá aparecer.

Ora, podemos melhorar essa inserção, já que estamos no client, podemos usar variáveis e deixar essa inserção mais organizada não é ? Muitas vezes inserimos muitos dados e acaba ficando difícil. 

<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; var json = {escola: "Webschool", active: true}
</pre>
</div>
</td></tr>
</table>

<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; b.teste.insert(json)
</pre>
</div>
</td></tr>
</table>

Agora queremos listar todos os conteúdos da collection, para saber se realmente inseriu todos os dados.

<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; db.pokemons.find()
</pre>
</div>
</td></tr>
</table>

OPA! Escrevi errado, e agora ? Posso modificar ? =(

Claro!

<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; var query = {name: 'Carterpie'}
</pre>
</div>
</td></tr>
</table>

<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; var p = db.pokemons.find(query)
</pre>
</div>
</td></tr>
</table>

<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; p  
</pre>
</div>
</td></tr>
</table>

Ele irá mostrar o resto das informações, porém ele vem como cursor, nao tem como modificar usando "p.name = 'RatoCabeludo' "

Pra resolver, usaremos o **findOne**.

<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; var p = db.pokemons.findOne(query)
</pre>
</div>
</td></tr>
</table>

Agora se fizermos:

<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; p.name = 'RatoCabeludo'
</pre>
</div>
</td></tr>
</table>

Ele mudará(Caso o campo name não exista, ele criará um novo com o valor setado)
CUIDADO! VAI ESTAR SALVO LOCALMENTE! Precisamos salvar, e para isso usaremos o **save**.

<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; db.pokemons.save(p)
</pre>
</div>
</td></tr>
</table>
Repare que aparece esse resultado:

<pre>
Updated 1 existing record(s) in 193ms
WriteResult({
  "nMatched": 1, 
  "nUpserted": 0, 
  "nModified": 1  
})
</pre>
<pre>
Significa respectivamente:
nMatched  - Encontrado
nUpserted - Inseriu
nModified - Modificado
</pre>

Então se fizer um 

<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; db.pokemons.find() 
</pre>
</div>
</td></tr>
</table>

ele estará lá, porém esse caminho foi muito longo não acha ? =( Tivemos que encontrar o objeto depois modificar e usar o **save**. Porém lá pra frente veremos o comando **update** que faz isso de uma vez. =)

##Buscas básicas

<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; db.colecao.find({clasura}, {campos})
</pre>
</div>
</td></tr>
</table>

Onde **clasuras** seria nosso *where* no banco relacional e o **campos** seria o nosso *select*. 

No objeto de **campos** apenas precisamos dizer quais campos podem ser retornados
1 - diz qual o campo quer retornar(true)
0 - nega o campo nessa busca(false)

exemplo:

<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; var query= {name:'Persian'}
</pre>
</div>
</td></tr>
</table>

<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; var field= {name: 1, description: 1}
</pre>
</div>
</td></tr>
</table>

<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; db.pokemons.find(query, field)
</pre>
</div>
</td></tr>
</table>

(resultado)

<pre>
{
  "_id": ObjectId("564da193ab81d6513c255cb1"),
  "name": "Persian",
  "description": "Sabe voltar pra sua casa."
}
</pre>

Veja que ele também retorna o _id, para tira-lo é só usar o 0 para negar.

<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; var field= {name: 1, description: 1, _id: 0}
</pre>
</div>
</td></tr>
</table>

<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; db.pokemons.find(query, field)
</pre>
</div>
</td></tr>
</table>

(resultado)

<pre>
{
  "name": "Persian",
  "description": "Sabe voltar pra sua casa."
}
</pre>

##Operadores Aritméticos

É bastante fácil. **(⌒‿⌒)**

<pre>
<  é $lt
	less than 
<= é $lte
	less than or equal
>  é $gt
        greater
>= é $gte
	greater or equal
</pre>

Exemplo:

<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; var query = {height: {$lt: 1}}
</pre>
</div>
</td></tr>
</table>

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

(resultado)

<pre>
{
  "_id": ObjectId("564da193ab81d6513c255caa"),
  "name": "Raichu",
  "description": "if the electrical...",
  "type": "electric",
  "attack": 50,
  "defence": 30,
  "height": 0.8
},
{
  "_id": ObjectId("564da193ab81d6513c255cab"),
  "name": "Psyduck",
  "description": "Psyduck uses a mysterious power.",
  "type": "Water",
  "attack": 30,
  "defence": 20,
  "height": 0.8
}
</pre>

##Operadores lógicos

OU é **$or**

Exemplo:

<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; query = {$or:[{name:'Metapod'},{height: 0.7}]}
</pre>
</div>
</td></tr>
</table>

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

(resultado)

<pre>
{
  "_id": ObjectId("564da193ab81d6513c255cae"),
  "name": "Metapod",
  "description": "The shell covering this Pokémons.",
  "type": "Bug",
  "attack": 10,
  "defence": 30,
  "height": 0.7
}
</pre>

**$nor** (not or) - Todos os outros registros que não vieram na busca do nosso $or

<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; query = {$nor:[{name:'Metapod'},{height: 0.7}]}
</pre>
</div>
</td></tr>
</table>

**$and** 

<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; query = {$and:[{name:'Metapod'},{height: 0.7}]}
</pre>
</div>
</td></tr>
</table>

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
  "_id": ObjectId("564da193ab81d6513c255cae"),
  "name": "Metapod",
  "description": "The shell covering this Pokémons.",
  "type": "Bug",
  "attack": 10,
  "defence": 30,
  "height": 0.7
}
</pre>

##Operadores existenciais

**$exist**

<table class="highlighttable">
<tr>
  <td class="linenos" >
  <div class="linenodiv">
  <pre><code class="language-js" data-lang="js" > 1
</code></pre></div></td>
<td class="code" >
<div class="highlight">
<pre>
&gt; db.colleciton.find({campo:{$exist:true}})
</pre>
</div>
</td></tr>
</table>

###Para quê ?

Se vc ja fez blog, já deve ter visto em tags clounds, aquelas tag mais usadas. Imagina vc querer montar essa possibilidade, vc tem que pesquisar todos os posts que possuem tags, então ae criar todo o mecanismo, não adianta vc querer dar um select em tudo e depois filtrar, pq não filtrar direto ?



