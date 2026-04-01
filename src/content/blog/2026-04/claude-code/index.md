---
title: Claude Code Can Do Astonishing Things. But Is It a Helpful Development Tool?
date: 2026-04-02 00:00:00 +0000
description: Anthropic recently gave me a bunch of free tokens, so let's put Claude Code to the test
img: ./sock-puppet.png
imgCaption: Photo by Natalie Kinnear, via Unsplash
tags: ["artificial intelligence", "Tooling", "large language models", "opinion", "gamedev"]
---

Since I wrote ['ChatGPT Can Do Astonishing Things. But Is It a Helpful Development Tool?'](/2022-12/chatgpt/) several years ago, the world has moved on. At the time my colleagues and I were putting ChatGPT's code generation capabilities through the ringer, and I was catalogueing the results. But what was astonishing then has become commonplace now, and I'm increasingly seeing people relying on LLMs for code generation and all the problems that can create. So, I thought it was coming time to revisit this question. And then Anthropic sent out a lot of free credits with their newest model release so I figured hey, this is the time to try it out.

<figure src="speaking.jpg">Wise words to keep in mind when it comes to LLMs</figure>

## What has changed

The biggest difference between now and 2023 was that Large Language Models have been upended by Large Reasoning Models. The distinction smells like marketing spiel but it is not wholly disingenuous, while LRMs are still fundamentally LLMs they have made significant advancements over the original models. Similarly to how programming languages have compile-time and run-time, LLMs have training-time and inference-time. Training is when the model is trained on an enormous quorum of sources, inference is when the model is actually calculating how to respond to a given prompt. The big difference in the LRM approach is to spend more compute at inference time. In the simplest terms this means spending a lot more time 'thinking' about the solution. In more interesting terms it means combining different schools of thought in AI. Instead of relying on the trained model alone, LRMs apply search techniques to query the same LLM hundreds of times, exploring different threads until a best possible response is found. Typically they will use Monte Carlo Tree Search because it is an anytime algorithm, meaning you can stop it at any time and get the best available result. With problems like these there isn't necessarily a 'perfect' solution and if there were you'd never be able to reach it in real time, so instead we apply search for a set amount of time and get the best result we can in that time. That time can be adjusted to get better or cheaper results. 

Going back to Professor Subbarao Kambhampati of the School of Computing & AI at Arizona State University who I referenced in ['Large Language Models Are Drunk at the Wheel'](/2024-02/llms-overpromised/), he has continued to study and write compellingly about the question of whether or not LLMs can reason.  

## Don't generate what you could not write

The big problem of computer science has _always_ been verification. (Mention that Turing quote?)
