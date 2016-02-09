---
layout: post
title:  "Garbage Collector no JavaScript"
date:   2016-01-02 00:07:31 -0400
image: '/assets/img/garbage-collector/simpson-lixeira.jpg'
tags: [jsbemean]
subtitle: Coletor de lixo ? preciso me preocupar com isso ? como funciona ?
---

# Garbage Collector

Garbage collector é um conceito muito antigo na história da computação, inventado pelo criador da linguagem de programação **Lisp** em 1959. Como o próprio nome diz, é um coletor de lixo, e você deve tá se perguntando:

> Que lixo é esse ?  ლ(ಠ▃ಠლ)

Ao longo do algoritmo você faz uso de um espaço da memória, mas nem sempre utiliza até o final, e se você deixa um objeto em um espaço de memória que nem tá mais utilizando, isso acaba virando um lixo, e apenas ocupando espaço no seu sistema e deixando menos performático. Para resolver isso, limpamos aquele espaço apenas liberando a memória de lá.

Na linguagem **C** por exemplo, por termos muitos usos de ponteiros e alocação de memória, sempre precisamos liberar quando não precisamos mais dela. Uma lista encadeada por exemplo, quando removemos algo da lista, não é apenas fazer com o que o apontador do anterior aponte para o próximo do que deseja remover, precisamos também usar a função **free** para liberar aquele espaço no endereço.
**Tudo manualmente fazendo o uso das funções malloc e free**.

## Como funciona o Garbage Collector no JavaScript ?

<img src="{{ "/assets/img/garbage-collector/simpson-lixeira.jpg"}}">

Nós temos muita sorte de não precisar fazer o gerenciamento de memória manualmente como na **linguagem C**. O JavaScript possui o seu coletor de lixo, e não importa o que está alocado na memória, pode ser de strings, objetos ou arrays. Ele tem uma magia tão boa que consegue determinar quando é seguro recuperar aquela memória ou não, percebendo sempre quando o espaço está sendo inutilizável.

{% highlight javascript %}
/* Exemplo 1 */
var latido = 'auau';
console.log(latido);
/*obs: não usa mais a variável 'latido' */
{% endhighlight %}


<blockquote class="trivia">
<p><strong class="cabecalho">Exemplo 1</strong>
Quando declaramos a variável, estamos alocando um espaço, porém depois que imprimimos o valor, aquele espaço ainda continua sendo ocupado, o garbage collector verifica periodicamente sempre a lista de todas as variáveis no ambiente e detecta se está sendo utilizada, caso contrário, <span class="err-s">~puff</span>.</p>
</blockquote>

Como faço manualmente ?
---

{% highlight javascript %}
/* Exemplo 2*/
var latido = 'auau';
console.log(latido);
latido = null;
{% endhighlight %}

## Devo me preocupar com ele ?

<img src="{{ "/assets/img/garbage-collector/simpson-game.gif"}}">

Claro, aliás ele é um dos maiores obstáculos para quem cria games com **HTML5** por exemplo, pois um bom game precisa ter uma boa perfomace para o jogador ter uma ótima experiência, porém os objetos nos jogos são criados de forma gradual, e se seu código cria muitos lixos, você vai ter problemas com isso. Por exemplo, um jogo que roda 60ps tem 16ms para redenrizar cada quadro e a coleta pode ser feita em 100ms ou mais, causando em uma pausa. Tem muitos motores de jogos como o [Construct 2](https://www.scirra.com/construct2) que faz com o uso de JavaScript, e tenta minimizar esse problema, e não chega a ser perceptível.

#### Métricas de coleta de lixo

<img src="https://d3ansictanv2wj.cloudfront.net/fig_1_gc_metrics-8fc33de8fa2c8186f2c0be2e1e1d4334.png" alt="" class="img-responsive">

Sempre é ótimo saber o que realmente acontece por baixo dos panos não é ? Princípios da computação são muitos importantes, porém
cheio de mágicas haha. ٩(●̮̮̃•̃)۶

## Bibliografia

- [Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
- [Wikipedia - Garbage Colector(Science Computer)](https://en.wikipedia.org/wiki/Garbage_collection_%28computer_science%29)
- [Scirra-Blog](https://www.scirra.com/blog)