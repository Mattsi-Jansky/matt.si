---
title: I Want to Get Off Mr Javascript's Wild Ride
date: 2024-11-15 00:00:00 +0000
description: Javascript is an old and unsafe, unperformant and unusual programming language with some very weird, scary surprises in store. But, many Javascript developers don't know how unusual it is. What makes it different?
img: ./mr_bones.png
tags: ["Programming", "javascript"]
---

In just two weeks in 1995, Brendan Eich created Javascript. This has made many people very angry and has been widely regarded as a bad move. It is an unusual, unsafe, unperformant, and even unpredictable programming language. It is also the most popular programming language in the world by a country mile [^1] (even moreso when you include Typescript). It is so popular that it is almost impossible for most software engineers, and especially web developers, to avoid it. I for one have written more Javascript and Typescript in recent years than I care to think about. It is so popular that writing a blog post about how much you dislike Javascript would probably be a really bad career move. So, let's dig in to why Javascript is a bad programming language!

## Javascript is unreasonably complex

It is often cited as being a "simple" language, but that is not true. Javascript is a very complex language that has a low barrier to entry. Consider the following:

### Dual notions of "absence of value"

Not only do you have to deal with nulls but you also have undefined.

### Equality and conditions

JavaScript has both `==` (abstract equality, allowing type coercion) and `===` (strict equality, no type coercion)

The conditions, with vague rules around truthyness and falsyness and double or triple equality and automatic type conversions and ternaries, are full of weird gotchas that are waiting to trap you. The dynamic types are a mess, and no-one has been able to fix it (though Rescript deserves consideration) - Typescript improves on it but also introduces many drawbacks of its own.

### Scope

Variables declared without let, const, or var become global. Window object, etc.

### A legacy of hacks building on hacks

Differences between NodeJS vs front-end JS, faking the window object, how difficult it is to understand unless you know the history. Why should I need to know the history of web browsers from before most programmers today were born just to use a programming language optimally?

Javascript sort-of has reflection but like everything else in the language it is not intentionally designed or considered, it is hacked into it after the fact by a bunch of maniacs. It is slow, unreliable, buggy, and for the love of goodness just don't.

### Truthy and falsy landmines

### 'this' keyword/binding

### Automatic Semicolon Insertion

### To number, or NaN



### Dynamic Typing and Type Coercion

Automatically converting between types (e.g., '5' + 3 resulting in '53' and '5' - 3 resulting in 2) can lead to unexpected behavior

Example of that one PHP bug?

## Javascript is slow

The language is also very unperformant, and the rules around allocating memory and references are vague and non-explicit. You have to memorise all the runes required to copy by value or reference, or doom yourself to weird memory issues that are hellish to trace.

Speaking of which, tracing or debugging anything in JS/TS is a nightmare. You can just pass any arguments you like to any function and if there aren't enough it'll just be undefined. You can redefine functions and even overwrite internal functions at your leisure, and what's worse many libraries actually do exactly that and create an insane nested mess.


## The missing standard library

note the lack of fixed point integers

## But what about Typescript

...

## Over a long enough period of time, every programming language becomes Java

## Then there is the ecosystem

How do you start a new C# project? `dotnet new classlib`. How do you start a new Rust project? `cargo init`. How do you start a new NodeJS project? Well, first you have to decide if you're going to use NPM, or PNPM, or Yarn, or one of the dozen others. Oh, but before then do you even really want to use NodeJS or should you use Deno or Bun? And what about packaging, should we use Webpack or Parcel or Vite? And when you've decided which various hacked-together tools made by random unaccountable people you want to use, you then have to figure out how to get them all to talk to each other and work together in the right way which means you having to write loads of scripts to make that work yourself and it will never work correctly, only less badly.

The insane nightmare of trying to setup NodeJS projects is why it has become standard to use template projects like "Create React App", though there is yet another choice there because there are numerous of them too. They only work so long as you work precisely the way they're intended, as soon as you want to make a change you have to unwrap the abstraction and you're back to hacking together your own build scripts again. Plus, these templates (and any viable NodeJS project) pull in so many dependencies! Thousands and thousands of third-party packages, all written by random unaccountable people who might just decide to throw in a bitcoin miner or other malicious code tomorrow as has happened on numerous occasions ('Oh a new NPM security hacking scandal? It must be a day of the week!').

This explosion of dependencies is an inherent problem with the language because it does not have a standard library, so for every little thing you have to rely on a third-party library. Even for the most basic things. Want to do logic with dates? Well Javascript doesn't really support that, so you'll need to pick between moment, date-fns, datejs, day.js, before you can even begin to do whatever it is you're looking to do. But don't worry the choice won't matter that much, because devs will just add whatever libraries they feel like and a few years down the line you'll have every different type of date library in your project.

I've seen some senior JS devs who seemingly enjoy learning this massive landscape, memorising lots of obscure runes and mastering the funny gotchas. It makes them feel good, smart, accomplished, but ultimately is a massive wasted effort. Instead of this, we should be improving the developer experience such that memorising obscure tricks is not necessary.

## This isn't normal

> "Madness is rare in individuals - but in groups, parties, nations, and ages it is the rule." - Nietzsche

Programming can be painless, it can even be fun. There is no need for things to be this way.

## Footnotes

[^1]: Stack Overflow Developer Survey 2024, ["Most Popular Technologies"](https://survey.stackoverflow.co/2024/technology/#most-popular-technologies)
