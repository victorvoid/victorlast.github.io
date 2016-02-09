---
layout: post
title:  "MongoDB - Relacionamento, Explain e Replicas #6.1 #6.2"
date:   2016-01-09 00:06:31 -0400
image: '/assets/img/memes/replica-set-read-write-operations-primary.png'
tags: mongobemean
categories:
- Aprendendo o MongoDB
subtitle: Conceitos vistos na aula 6.1 e 6.2 no bemean, relacionamentos entre collections, explain, replicas, índices, rand, GridFS...
---

# Relacionamento

<img src="{{ "/assets/img/relacionamento-explain-replicas/relacao-gato.gif"}}">

Não! Não é esse tipo de relacionamento, e sim de banco de dados. =(

Nos banco relacionais é de fato o uso de <span class="">joins</span> pra relacionar uma tabela com outra, porém como funciona o relacionamento no MongoDB ? Joins não existem no MongoDB, não tem como fazer a busca automática de duas coleções separadas usando alguma chave estrangeira como nos relacionais. Existe duas formas, a Manual e DBRef. Já que a forma Manual é a mais usada, vamos ver como funciona.

##Relacionamento Manual 

Salve o **_id** de uma coleção em outra, por exemplo:
1º vamos pegar 3 _id de pokemons da nossa collection <span class="nc-s">pokemons</span> que já havíamos trabalho (caso ainda não tenha a collection pokemons use o [pokemons.json](https://raw.githubusercontent.com/Webschool-io/be-mean-instagram/master/Apostila/module-mongodb/src/data/pokemons.json) para importar)
{% highlight javascript %}
> db.pokemons.find().limit(3)

{% endhighlight %}
{% highlight json %}

"_id": ObjectId("564a7c362c153ed825a69054")
"_id": ObjectId("564a7c362c153ed825a69055")
"_id": ObjectId("564a7c362c153ed825a69056")

{% endhighlight %}

Crie um array de pokemons com esses **id**s para adicionar no nosso inventário de pokemons:

{% highlight javascript %}
var pokemons = [
	{"_id": ObjectId("564a7c362c153ed825a69054")},
	{"_id": ObjectId("564a7c362c153ed825a69055")},
	{"_id": ObjectId("564a7c362c153ed825a69056")}
];

{% endhighlight %}

Agora crie um JSON para ser inserido no inventário:

{% highlight javascript %}
var json = {name: "meus pokemons", pokemons: pokemons}
{% endhighlight %}

No <span class="kd-s">pokemons</span>:**pokemons** o <span class="kd-s">pokemons</span> é um array de **pokemons** (aquele que criamos logo ali em cima).

##Inserindo no inventário

{% highlight javascript %}
db.invt.insert(json)
Inserted 1 record(s) in 80ms
WriteResult({
  "nInserted": 1
})

{% endhighlight %}

Conferindo: 
{% highlight javascript %}
> db.invt.find()

{
  "_id": ObjectId("568c969d2622b96d939ca206"),
  "name": "meus pokemons",
  "pokemons": [
    {
      "_id": ObjectId("564a7c362c153ed825a69054")
    },
    {
      "_id": ObjectId("564a7c362c153ed825a69055")
    },
    {
      "_id": ObjectId("564a7c362c153ed825a69056")
    }
  ]
}

{% endhighlight %}

##Pegando todos os dados a partir do id

Pra fazer isso vamos criar uma função que recebe o **_id** e insere em um array todos os dados dos pokemons.


{% highlight javascript %}
var pokemons = [];
var getPokemon = function (id){
	pokemons.push(db.pokemons.findOne(id))
}
var invt = db.invt.findOne()
invt.pokemons.forEach(getPokemon)

{% endhighlight %}

Cuidado, o **invt.pokemons** é aquele que inserimos, onde possui todos os 3 **id**s, a variável criada chamada <span class="kd-s">pokemons</span> é o array onde vai ser inserido todos os dados dos pokemons através da função <span class="nf-s">getPokemon</span>, pois nela contém um **pokemons**.<span class="nf-s">push</span> que insere cada resultado do **db.pokemons.findOne()**.
Repare que agora a variável <span class="kd-s">pokemons</span> está com todos os dados dos id:

{% highlight json %}

[
  {
    "_id": ObjectId("564a7c362c153ed825a69054"),
    "attack": 90,
    "created": "2013-11-03T15:05:41.297180",
    "defense": 40,
    "height": "10",
    "hp": 65,
    "name": "Beedrill",
    "speed": 75,
    "types": [
      "poison",
      "bug"
    ]
  },
  {
    "_id": ObjectId("564a7c362c153ed825a69055"),
    "attack": 45,
    "created": "2013-11-03T15:05:41.299457",
    "defense": 40,
    "height": "3",
    "hp": 40,
    "name": "Pidgey",
    "speed": 56,
    "types": [
      "normal",
      "flying"
    ]
  },
  {
    "_id": ObjectId("564a7c362c153ed825a69056"),
    "attack": 60,
    "created": "2013-11-03T15:05:41.301609",
    "defense": 55,
    "height": "11",
    "hp": 63,
    "name": "Pidgeotto",
    "speed": 71,
    "types": [
      "normal",
      "flying"
    ]
  }
]
{% endhighlight %}

##DBRef 
<span class="nc-s">obs</span>: para não deixar de lado o DBRef, é importante saber como funciona.

A outra forma é o DBRef, uma convenção pra representar um documento relacional, ou seja,semelhantes a chave estrangeira vista em banco relacionais.

- $ref: nome da coleção a ser referenciada.
- $id: o ObjectId do documento referenciado.
- $db: a database onde a coleção referenciada se encontra.

Pelo fato de conseguir referenciar seus documentos que estão em outra database, nesse caso é interessante usar o DBRef. 

[Exemplos com DBRed](https://docs.mongodb.org/manual/reference/database-references/)

#Explain

O que é o **Explain** ? 
Ele nos mostra como o MongoDB executa as query internamente. 

{% highlight javascript %}
  db.pokemons.find({"name": "Meloetta-aria"}).explain()
{% endhighlight %}

Vai retornar algumas informações, como por exemplo o <span class="sx-s">serverInfo</span> que nos mostra o host em que ele pegou, a porta, versão, etc...

Se colocarmos **executionStats**, vai nos mostrar além da padrão, informações de execução.
{% highlight javascript %}
  db.pokemons.find({"name": "Meloetta-aria"}).explain('executionStats')
{% endhighlight %}

Repare que temos por exemplo o <span class="sx-s">executionTimeMillis</span>, que nos mostra o tempo em milissegundo, e o <span class="sx-s">docsExamined</span>, que nos retorna quantos documentos foram examinados, ou seja, procurando com essa query a cima, ele varreu toda nossa base pra poder encontrar o <span class="sr-s">Meloetta-aria</span>.

##Quando usar o Explain ? 

  Sempre que queremos analisar o que ele fez, a partir dessas e outras informações que ele nos dá. 

#Index
  
  Os índices são importantes, com ele tem como 'marcar' uma determinada propriedade que estamos sempre buscando, e quando eu buscar ele, execute mais rápido. Por padrão o mongo que cria os **_id** não é ? não apenas, como também são indexados, e para que saiba que não estou mentindo '--' execute: 

{% highlight javascript %}
db.pokemons.getIndexes()
//resultado:
[
  {
    "v": 1,
    "key": {
      "_id": 1 //<-- significa que o _id está indexado
    },
    "name": "_id_",
    "ns": "be-mean-pokemons.pokemons"
  }
]
{% endhighlight %}

E se você buscar pelo **_id** e não pelo nome e em seguida usar <span class="nf-s">explain</span> para saber a quantidade de elementos verificados, vai perceber que só foi 1, isso mesmo <del>é magia </del>, com isso a busca ficou muito mais rápida. Agora você sabe o porquê existe aquele <span class="nc-s">system.indexes</span> quando listamos as collections, pois ele deixa tudo mapeado. 

##Como criar um index ?
Repare que nas collections, já vem o **_id** indexado. 
{% highlight javascript %}
db.system.indexes.find()
{% endhighlight %}

Pra você indexar o nome por exemplo, crie:

{% highlight javascript %}
  db.pokemons.createIndex({name:1}) //onde o parâmetro é o nome e a ordem
  //para descrescente coloque -1
{% endhighlight %}

Agora a pesquisa pelo nome ficou muito mais rápida: ٩(●̮̮̃•̃)۶

##E se eu não quero mais que o nome fique indexado ? 

{% highlight javascript %}
  db.pokemons.dropIndex({nome: 1})
{% endhighlight %}

<blockquote>
<p><strong>Observação:</strong>
Tome cuidado com os index, não fique criando index pra qualquer coisa, sempre que criar, seu banco fica mais complexo, pois ele precisa guardar, verifique sempre se realmente precisa na hora de criar.</p>
</blockquote>

#Rand

Rand é uma função que retorna um número aleatório, por exemplo queremos pegar dois pokemons qualquer:

{% highlight javascript %}

db.pokemons.find().limit(2).skip(_rand() * db.pokemons.count())

{% endhighlight %}

#GridFS

Ele é um sistema de arquivos, e com ele você pode salvar arquivos binário. Por exemplo, um vídeo, imagem, ou música. 

##Por que usar ? 

Você pode não querer usar o **GridFS** e salvar em um arquivo <span class="sx-s">BJSON</span>, mas só que sabemos que um documento desse tem um limite de 16MB =( Se quer enviar um vídeo de 40MB por exemplo, o GridFS ta ae pra nos ajudar com isso.

Acesse esse artigo para saber quando usar o **GridFS** no MongoDB.

[When to Use GridFS on MongoDB](https://dzone.com/articles/when-use-gridfs-mongodb)

##Como usar ? 

Entre no terminal (não do mongo), pois é um binário.
Para inserir na database, vá até onde o seu vídeo está, e execute
{% highlight javascript %}
mongofiles -d nome-do-banco -h 127.0.0.1 put nomedoarquivo

{% endhighlight %}

Pronto, agora entre no terminal do mongo e veja as coleções do banco em que inseriu o video, vai perceber que tem duas. São: 

<span class="sx-s"> fs.chunk</span>: Fica o arquivo binário quebrado em pequenas partes de 255KB. Cada parte tem o seu, **_id**, **files _id**, **n**(o índice nesse arquivo quebrado) e **data**(o binário).

<span class="sx-s">fs.files</span>: Guarda as informações dos arquivos, como o _id o tamanho deste arquivo, nome do arquivo, etc.

Aprenda na prática com:

[Building MongoDB Applications with Binary Files Using GridFS: Part 1](http://www.mongodb.com/blog/post/building-mongodb-applications-binary-files-using-gridfs-part-1?jmp=docs&_ga=1.84734297.1774300310.1449161772)

[Building MongoDB Applications with Binary Files Using GridFS: Part 2](http://www.mongodb.com/blog/post/building-mongodb-applications-binary-files-using-gridfs-part-2?jmp=docs&_ga=1.8699637.1774300310.1449161772)

#Replica

É basicamente um espalhamento dos seus dados em outro servidor, e no MongoDb uma **ReplicaSet** pode ter 50 replicas. <del>oloco :0</del>

**Diagrama:**
<img src="{{ "/assets/img/relacionamento-explain-replicas/replica-set-read-write-operations-primary.png"}}">

As 2 estapas que ocorrem na replicação são:

<span class="sx-s">Initial Sync</span>: Aconte quando a replicação inicia, ela clona todos os bancos de dados, depois ele aplica as alterações, contróis os índices de todas as coleções e por fim, ele faz a transição pro secundário, como na imagem a cima.

<span class="sx-s">Replication</span>: Depois de ter os dados na replica secundária, vai continuar replicando, sicronizando para deixar sempre atualizado, caso faça alguma modificação na primária, acontecendo de forma assícrono.

##OpLog

O OpLog é simplesmente um log de alteração, mantém todas as modifições na **capped collection**, e ele tem um tamanho fixo, caso ultrapasse ele sobrescreve.(Mais pra frente vamos ver como saber o tamanho)

##Por que usar Replica ? 

Para garantir que seus dados ficam em lugares além do servidor principal, aliás qualquer sistema o próprio mongodb diz para ter no mínimo uma replica, seja simples que for, garanta a segurança nos seus dados, nenhum servidor é 100% seguro.

##Como criar ? 

Abra o terminal e execute, para quantas replicas quer.

{% highlight javascript %}

mongodb --replSet replica_set --port 27017 --dbpath localparasalvar

{% endhighlight %}

Depois conecte em cada uma para iniciar o serviço de replica com o <span class="nf-s">rs.initialize()</span> e para isso precisamos criar um JSON de configuração da nossa replica: 

{% highlight javascript %}
 rsconfig = {
  _id: "replica_set",
  members:[
   {
    _id:0,
    host: "127.0.0.1:27017"
   }
  ]
 }
 rs.initialize(rsconfig)
{% endhighlight %}
Resultado:

{% highlight javascript %}
{
"ok": 1
}
{% endhighlight %}

Agora tá iniciando (lembra do **init sync** logo ali em cima ?). Agora levantado, não precisamos desse trabalho todo para adicionar as outras replicas que queira =)

Basta usar um **add**, pra adicionar.

{% highlight javascript %}
rs.add("127.0.0.1:27018"); //coloquei 27018, mas você coloca o da sua replica
{% endhighlight %}

<blockquote>
<p><strong>Observação:</strong>
Você não pode executar nenhum comando nos secundários, apenas no primário.</p>
</blockquote>

Para verificar o status da nossa replicaSet basta executar <span class="nf-s">rs.status( )</span>, e com isso você verifica várias informações como o nome de todas as replicas, id, data, etc.

E para o status do nosso OpLog, é <span class="nf-s">rs.printReplicationInfo( )</span> e então informações como o do tamanho do nosso OpLog, info da primeira modificação, e info da última vez que foi feito alguma modificação. 

[Saiba mais sobre Replicas na documentação](https://docs.mongodb.org/manual/replication/)




































