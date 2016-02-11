---
layout: post
title:  "Aprenda de uma vez o que é o Sharding no MongoDB #7"
date:   2016-02-10 00:06:31 -0400
image: '/assets/img/o-que-e-meanstack/o-que-e-meanstack.jpg'
tags: mongobemean
categories:
- Aprendendo o MongoDB
subtitle: Sharding, o porquê do uso dele e como gerenciar usuários...
twitter_text: 'Aprenda de uma vez o que é Sharding no MongoDB'
---

Eita que demorei um pouco pra postar. =( Acabei me atrasando com algumas coisas, mas então vamos lá, aliás está em época de carnaval. <del>Que mostra claramente o que o brasileiro é, mesmo o país na pior, sempre sorrindo.</del> :D  <br>
Não pera, eu não vou falar sobre carnaval aqui lol, sim, como o título diz, é mongoDB, uma coisa muito mais divertida, não é ?

Então vamos logo entender que diabos é esse **sharding**. 

# Sharding ? Pra quê ? 

<img src="{{ "/assets/img/o-que-e-meanstack/o-que-e-meanstack.jpg"}}">

O sharding é aquele processo de armazenar os dados em várias máquinas. Tá, mas pra quê isso ? Simples, lembra que o mongodb joga os dados da collection para a memória RAM, por isso ele é extremamente rápido, porém se os dados dessa collection forem maior que sua RAM, ele vai precisar fazer paginação, e claro isso afeta o desempenho, CONTUDO, entretanto, porém, todaviaaaa o sharding está ae pra resolver. 

<img src="{{ "/assets/img/sharding-gerenciamento-usuarios/happy-scooby.gif"}}" alt="">

Com ele você joga os dados pra outras máquinas, assim o desempenho não é afetado porque outras máquinas estão ali pra ajudar, é como se fosse os amigo ajudando outro amigo a carregar os sacos de areia. 

<figure class="foto-legenda">
	<img src="{{ "/assets/img/sharding-gerenciamento-usuarios/ajudando-carregar.jpg"}}" alt="">
	<figcaption> <p>Os voluntários formam uma corrente humana, pois ajudam carregar sacos de areia. Terça-feira, 29 de dezembro de 2015</p>
	</figcaption>
</figure>

E por esse motivo ele é escalável horizontalmente, diferente de alguns outros bancos que possui escabilidade vertical, e no lugar de ter outro amiguinho ajudando com o peso, o rapaz tenta carregar tudo sozinho, porém com mais força, e pra isso, precisa de mais memória e força de processamento no mesmo servidor. 

<img src="{{ "/assets/img/sharding-gerenciamento-usuarios/carrega-sozinho.jpg"}}" alt="">

## Quando eu posso usar sharding ? 

Simples! Por exemplo, quando você perceber que sua coleção está chegando perto da memória que o servidor tem para o MongoDB. Claro, você pode fazer logo o sharding e deixar o servidor preparado para o crescimento. E também, quando o disco local não for grande o suficiente.

### Atenção

Também não vai querer sair criando sharding pra tudo né lol mas se você tem uma única coleção com grande número de registros(mas imenso mesmo), realmente vai precisar fazer essa fragmentação. <br>
`Escabilidade` de certa forma é complexo, mas dê uma lida sobre:

1. <a href="http://dba.stackexchange.com/questions/4508/what-does-horizontal-scaling-mean" target="_blank">What does horizontal scaling mean?</a>
2. <a href="https://blog.openshift.com/best-practices-for-horizontal-application-scaling/" target="_blank">Best Practices For Horizontal Application Scaling</a>
3. <a href="http://www.infoq.com/articles/ebay-scalability-best-practices" target="_blank">Scalability Best Practices: Lessons from eBay</a>
4. <a href="http://stackoverflow.com/questions/5401992/what-does-scale-horizontally-and-scale-vertically-mean" target="_blank">What does scale horizontally and scale vertically mean?</a>

## Ta mas me diz logo como usa

Pra isso leia esse artigo do sussu que ele explica: <a href="http://nomadev.com.br/be-mean-mongodb-como-usar-sharding/" target="_blank">Como usar Sharding</a> 

Lembrando que MongoDB fornece as funções de usuário do banco de dados e administração de banco de dados embutidos em cada banco de dados. Ele fornece todas as outras funções integrado apenas no banco de dados administrador. E para criação de *sharding*, você precisa ser um *admin* ou um *manager*, bem se você ainda não entende como fazer o gerenciamento de usuários, vamos lá aprender, porque é muito importante para a segurança. =)

# Gerenciamento de Usuários

Você vai precisar ter um gerenciamento dos seus usuários do banco, por exemplo, colocando privilégios que uns tem e outros não, alguns podem modificar e outros apenas monitorar, tudo tem como gerenciar. Toda aquela nossa autenticação e autorização fica na coleção `system.users` no banco `admin` e você pode gerenciar através do mongo. Aliás se você não sabe a diferença entre autenticação e autorização <del>você está ferrado</del>, eu posso tentar explicar de uma forma bem simples:

> Sabe quando você coloca senha no seu computador, e ao iniciar ele pede o login e senha ? Então, ao está logando, você está autenticando, e autorização é esse processo de verificação, caso esteja errado você não está autorizado para entrar.

## Principais comandos para o gerenciamento de usuários

- <span class="kd-s">createUser</span> - Cria um usuário no banco que estiver.

{% highlight javascript %}
use admin
db.createUser{
	user: "bonitao",
	pwd: "2016bonitao",
	roles: [{role: "userAdminAnyDatabase", db: "admin"}]
}
{% endhighlight %}

O `role` serve para você definir a função do usuário, nesse por exemplo foi para criar um usuário administrador que tem acesso a todos os bancos. 

Pra saber como criar e usar as roles para outros tipos de funções acesse:

<a href="https://docs.mongodb.org/v2.6/tutorial/add-user-to-database/" target="_blank">Add a User to a Database</a>

E depois de criar pode-se querer atualizar um usuário não é? 

- <span class="kd-s">db.updateUser</span> - Atualiza o usuário no banco que estiver.

{% highlight javascript %}

db.updateUser("bonitao",
{
	pwd: "2016bonitao",
	roles: [{role: "read", db: "assets"}]
})

{% endhighlight %}
Além de atualizar, podemos deletar: 

- <span class="kd-s">db.removeUser</span> - Remove o usuário no banco que estiver

{% highlight javascript %}
db.removeUser("bonitao")

{% endhighlight %}

Além desses, existe muitos outros que podem ser encontrados <a href="https://docs.mongodb.org/manual/reference/method/js-user-management/" target="_blank">aqui</a>. Se divirta pra testar heueh =D

Depois de criar tudo certinho, precisamos conectar autenticando no mongo:

{% highlight javascript %}
//1. Reinicie o mongo com:


mongod --out


//2. Conecte com o mongo: 


mongo --port 27017 -u "bonitao" -p "2016bonitao" -- authenticationDatabase "admin"


//3. Se derrepente já se conectou sem usuário e queria autenticar, execute: 


db.auth("bonitao","2016bonitao")
{% endhighlight %}

LOOOL Agora você sabe o que é sharding, como usar e como gerenciar usuários!!!

<img src="{{ "/assets/img/sharding-gerenciamento-usuarios/daca-animada.gif"}}" alt="">

## Concluindo

Pro último post dessa série ficar legal, vou trazer uma modelagem e quem sabe um projeto, pra praticar todos esses conhecimentos adquiridos até aqui. =)

Então é isso, beijoca e até a próxima. 

<img src="{{ "/assets/img/mongodb123/bye.gif"}}">