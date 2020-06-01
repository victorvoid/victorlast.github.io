---
layout: post
title:  "An approach to dealing with the data flow"
date:   2018-04-12 00:00:00
description: "How category theory can give you a new perspective on modeling the flow of your software."
---

<figure class="image">
	<img class="img" src="{{"/assets/img/bavarian-alps.jpg"}}">
</figure>

## Summary

- Programming paradigm
- The little history of Category Theory
- Functional Programming
- How can category theory help to build software
- Why Composability?
- Control Flow
- An approach to handling side-effects
- Concepts applied in real scenarios

## What is a programming paradigm for you?

A programming paradigm is as an approach to programming a computer that is based on a coherent set of principles or a mathematical theory. In practice, each paradigm comes with its own way of thinking and there are problems for which it is the best approach.

For example:

- In functional programming, the theory is called Lambda calculus.
- Object-oriented programming has several different kinds of theory, but it’s essentially organizational theories of how to structure information and update information.
- Multi-agent concurrent programming the theory is called pi-calculus.

## Should I study others programming languages?

Powerful reasons to learn a new language:

- New ways to solve problems.
- New concepts to learn and apply in your project.
- The right tool for the right job.
- New opportunities.
- Keep it fresh.

If you think you just need to study the language in which you work, you need to rethink if you wanna be a great programmer, because if you’ve only ever learned and used one style of programming language (oop, functional, compiled, high-level, low-level, etc) it’s likely that your thinking around programming is very structured around that language.

Read more about it: <a target="_blank" href="https://www.epcc.ed.ac.uk/blog/2016/06/21/if-youre-only-going-learn-one-programming-language-you-should-learn">If you’re only going to learn one programming language, you should learn…</a>

Category Theory is not a new paradigm, but a great example to you have a new perspective on modeling the flow of your software, and my opinion, is a great way to a better software composable.

## The little history of Category Theory

The birth of this theory have been a lot more mathematical than computational and is very hard exactly to say when was the first time that this appeared. In 1995 was published a paper called *‘General Theory of Natural Equivalences’* where the category concepts were introduced as the functor. The authors needed to define a concept to a functor and here they reached some conclusions of concepts basic to a category. These concepts were introduced lot more in **Algebraic Topology**, and sure! Everyone knows what’s it! No, I don’t know, but let's continue our saga. So other important advancements have been published but had an article that introduced the idea to use the category to create more general theories and apply in specific fields, yes! Now we don’t have only a beautiful language, because the study abstract category that encapsulates *homological algebraic* results also can to be applied to get results in other areas of mathematics and then various theorems and theories can be seen by a **categorical angle**. Later it had enough use in theoretical physics, from then on it became quite important. See <a target="_blank" href="https://en.wikipedia.org/wiki/Timeline_of_category_theory_and_related_mathematics">Timeline of category theory and related mathematics</a> to you have a sense of time.

## Computer Science and the theory

Category theory is a field that impinges more and more frequently on the awareness of many computer scientists, especially those with an interest in programming languages and formal specifications, but the major contributor to receive Category Theory some traction in the programming world was because of <a href="https://www.haskell.org/" target="_blank">Haskell</a> and it’s type system, which extended the *Hindley-Milner* type system with the notion of type classes.

## Functional Programming and the theory

<a target="_blank" href="http://www1.eafit.edu.co/asr/pubs/others/cain-screen.pdf">It paper</a> explains a lot more the concepts of category theory applied in functional programming but I’ll explain a little. If you don’t know this paradigm, I recommend you read this article <a target="_blank" href="https://medium.com/@jugoncalves/functional-programming-should-be-your-1-priority-for-2015-47dd4641d6b9">Functional Programming should be your #1 priority for 2015</a>.

The paradigm shift brought on by Einstein’s theory of relativity brought on the realization that there is no single perspective from which to view the world. There is no background framework that we need to find; there are infinitely many different frameworks and perspectives, and the real power lies in being able to translate between them. It is in this historical context that category theory got its start.

## How can category theory help to build software?

It should be your first question when reading this description post. **Function composition** is my favorite part of functional programming, and when I started study Haskell and PureScript, I found many people speaking about *Abstractions* and *functors*. It was at that moment that I began to wonder “why these people are talking about it ?” “What is it?”. I found many papers and books talking about category theory, but many peoples still don't know how it can help we build a software, and they think it does not make sense.

## Category theory is about Composition

Yes, composition! Because to define a category, you have to specify what composition is in that category. It’s like the multiplication operation in a group(to define a group, it’s not enough to just say you have a set and it is possible to multiply elements of the set), you have to actually say what you mean by “multiply” as part of the definition of the group.

## Why Composability?

The essence of software development is composition and things that are composable are good because they enable abstractions. To know more why we should learn about composition, read the series from Eric Elliot called <a target="_blank" href="https://medium.com/javascript-scene/composing-software-an-introduction-27b72500d6ea">Composing Software</a>.

## Control Flow

There are many ways to control a flow of your data, in procedural languages computation involves code operating on data, in OOP an object encapsulates both code and data and pure functional languages data has no independent existence. RxJs is a great example to demonstrate how can I use to traffic data between functions and get a result in pipe final. In my opinion, it's a great way to solve a problem because you have a control flow defined, stateless, and most of the time, is a minor code.

I'll use Clojure/PureScript/Javascript to show examples.

<iframe src="https://gist.github.com/victorvoid/1eb13ae4d3abb7bbc58a06d172c93483.pibb"></iframe>

## Category

Category Theory is a theory of functions, and the only basic operation is composition. The concept of *category* embodies some abstract properties of the composition.

- A collection of objects
- A collection of morphism
- For each triple of objects X, Y, Z, a map(called composition)

There are many kinds of category, but you should learn about a **category of sets** because is the category whose objects are sets. The arrows or morphisms between sets *A* and *B* are the functions from *A* to *B*, and the composition of morphisms is the composition of functions.

## Many things can be composed

You should be thinking that this has nothing to do with programming and that concepts of mathematics can’t help us, but let’s see some topics that we have in programming and don’t have in mathematics and that we can use the composition to help us.

- Assignments
- Loops
- Errors and Callback

## Assignments

Did you remember when I talked about *'functor'*? Let see why it can help us.

A functor is a mapping between categories. Given two categories, A and B, a functor F maps objects in A to objects in B and for to be a functor, you should ensure it satisfies the two functor laws:

- *Identity Law* => F(idA) = idF(A)
- *Composition Law* => F(g ∘ f) = F(g) ∘ F(f)

<iframe src="https://gist.github.com/victorvoid/43bc964a58b9d1bacaba1fdde8ec6cd1.pibb"></iframe>

Let’s create our own functor to use any kind of data and map it.

<iframe src="https://gist.github.com/victorvoid/b97fb6880a04eacee2b795596582787c.pibb"></iframe>

Basically, we can chain long sequences of computation to solve problems. I used PureScript to this example, but it’s not only useful for typed languages, the same implementation in JavaScript:

<iframe src="https://gist.github.com/victorvoid/b7ff71364d0f6b591b26af53ba622ddd.pibb"></iframe>

In PureScript we have operators to compose our functions:

<iframe src="https://gist.github.com/victorvoid/d4be60ca64b26a2e985cda4fb5ed54a5.pibb"></iframe>

<a target="_blank" href="https://medium.com/javascript-scene/functors-categories-61e031bac53f">In this article</a>, you can learn more about functors and categories in JavaScript.

## Loops

Looping in functional programming isn’t done with control statements like **for** and **while**, it's done with explicit calls to functions like **map**, **filter** and **reduce** or recursion. If the loop code mutates variables outside the loop, this inner loop function would be manipulating variables outside its scope and would thus be *impure*. This is not what we want, because impure functions aren’t composable. Map, filter and reduce probably solve most of your problems.

<iframe src="https://gist.github.com/victorvoid/a041fc3f6e0f40f68ae39414933cdf3b.pibb"></iframe>

## Errors and Callbacks

There are a few ways in which errors are generally handled in many programming languages, but basically to do we use control-flow structures like **if/else** and exceptions like **try/catch**. But what is the problem? These tend to either be hard to predict, hard to maintain and isn't composable.

Basically, let's use some monadic data structure to encapsulate control flow in a declarative manner. I’ll show examples in JavaScript to you know that is not restricted in strongly-typed languages.

- **Maybe** — Enforce a null check with composable code branching. A structure that helps to handle values that may or may not be present.

<iframe src="https://gist.github.com/victorvoid/c4199695af5eb26357023f74b27508f9.pibb"></iframe>

Line 2, I used ‘fromNullable’ from Maybe, I used as a Box to check if have value. I'm using <a target="_blank" href="https://folktale.origamitower.com/">Folktale</a>, and it helps us to compose and maintain a chaining the data.

- Either — A structure that models the result of functions that may fail, and this structure represents the logical disjunction between **a and **b**. This particular implementation is based on the right value (**b**), this projection will take the right value over the left one.

<iframe src="https://gist.github.com/victorvoid/0bdf8e663cf1813a64494b5e880cb010.pibb"></iframe>

In Folktale, we've Result which is similar.

- Future — A data structure to represent the result of an asynchronous computation.

<iframe src="https://gist.github.com/victorvoid/097799ca4e547ed88f9b12a31aa3b389.pibb"></iframe>

Now you can use all these concepts:

<iframe src="https://gist.github.com/victorvoid/d08f1fae805b9855a61b782491d7636e.pibb"></iframe>

## An approach to handling side-effects

Haskell is a purely functional language and all functions are pure, for behavior with side-effects it uses monads to solve these kinds of problems. Let’s use an IO, then all you have of IO action, they return you an IO computation (inside a box), then a function that reads an Integer on the keyboard, instead of returning an Integer, it returns an IO computation which plays an Integer when it is executed and returns an IO, you can't use this result directly in a sum for example. And to access you will have to ‘unwrap’ this monad. This is how Haskell isolates the side effects, the IO monad acts as an abstraction of the real-world state. In Purescript we have Eff to deal with these kinds of side effects, and in its own documentation tells us some scenarios of where we can use.

Some examples of native effects are:

- Console IO
- Random number generation
- Exceptions
- Reading/writing mutable state

And in the browser:

- DOM manipulation
- XMLHttpRequest / AJAX calls
- Interacting with a web-socket
- Writing/reading to/from local storage

<iframe src="https://gist.github.com/victorvoid/aced35e414007eb90d1571673c4d6467.pibb"></iframe>

Creating our own IO

<iframe src="https://gist.github.com/victorvoid/71558bc5921a4fcb48c6b585bfc97b73.pibb"></iframe>

I’ve got a presentation when I talked about it; <a target="_blank" href="https://pt.slideshare.net/VictorCalangu/everything-is-composable">Everything is composable</a>. These concepts can be used in backend or frontend, but like functional programming is about programming by composing functions we only need a language with functions as first-class values.

## Bonus

I'm implementing a generator to you create an <a target="_blank" href="https://docs.ansible.com/">Ansible Playbook</a> to automate the installation of your **apps** and **dotfiles**. You can see some of these concepts being used in real-world: <a target="_blank" href="https://github.com/victorvoid/packblade">Packblade</a>

🍭 Are you front-end and use react? You can have fun with <a href="https://github.com/xaviervia/react-dream" target="_blank">react-dream</a> to use some of these concepts and many others.


## Conclusion

There are many others concepts in category theory because it’s a vast subject. The idea was to show for you how this theory can help us with abstraction and composability. I used some examples in Clojure (dynamically typed) and PureScript(strongly-typed) that are functional languages. PureScript in written in and inspired by Haskell, but you don’t need to know category theory to be proficient in PureScript, although it certainly helps with some of the more esoteric core libraries. Learning category theory is a long-term investment.


## Where should I go ?

- <a target="_blank" href="https://medium.com/@_ericelliott">Eric Elliot</a>, there are many articles about composability.
- <a href="https://bartoszmilewski.com/2014/10/28/category-theory-for-programmers-the-preface/" target="_blank">Category theory for programmers</a>.
- <a target="_blank" href="https://github.com/adkelley/javascript-to-purescript">Make the Leap from Javascript to PureScript</a>
- <a target="_blank" href="https://www.youtube.com/watch?v=SfWR3dKnFIo">Oh, Composable World!</a>
- <a target="_blank" href="https://www.slideshare.net/VictorCalangu/everything-is-composable"> Everything is composable</a>
- <a target="_blank" href="https://www.quora.com/How-useful-is-category-theory-to-programmers"> How useful is category theory to programmers?</a>