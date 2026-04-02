---
title: Claude Code Can Do Astonishing Things. But Is It a Helpful Development Tool?
date: 2026-04-02 00:00:00 +0000
description: Anthropic recently gave me a bunch of free tokens, so let's put Claude Code to the test
img: ./sock-puppet.png
imgCaption: Photo by Natalie Kinnear, via Unsplash
tags: ["artificial intelligence", "Tooling", "large language models", "opinion", "gamedev"]
---

Since I wrote ['ChatGPT Can Do Astonishing Things. But Is It a Helpful Development Tool?'](/2022-12/chatgpt/) several years ago, the world has moved on. At the time my colleagues and I were putting ChatGPT's code generation capabilities through the ringer, and I was catalogueing the results. But what was astonishing then has become commonplace now, and I'm increasingly seeing people relying on LLMs for code generation and all the problems that can create. So, I thought it was coming time to revisit this question. And then Anthropic sent out a lot of free credits with their newest model release so I figured hey, this is the time to try it out.

I'll start by delving into why I wanted to try these new models, some light theory of how the latest models work and what has changed, and then review what I found in practice trying it across a few side projects.

## What has changed

The biggest difference between now and 2023 was that Large Language Models have been upended by Large Reasoning Models. The distinction smells like marketing spiel but it is not wholly disingenuous, while LRMs are still fundamentally LLMs they have made significant advancements over the original models, making leaps forward in benchmark performance[^1]. We may note that the bar to pass over was very low, but LRMs do appear to have improved over LLMs in leaps and bounds regarding planning and reasoning. The difference is this: Similarly to how programming languages have compile-time and run-time, LLMs have training-time and inference-time. Training is when the model is trained on an enormous corpus of sources, inference is when the model is actually calculating how to respond to a given prompt. The key difference in the LRM approach is that you spend much more compute at inference time. This is done by calling the model multiple times, with multiple steps that form a 'chain of thought'.

Going back to Professor Subbarao Kambhampati of the School of Computing & AI at Arizona State University who I referenced in ['Large Language Models Are Drunk at the Wheel'](/2024-02/llms-overpromised/), he has continued to study and write compellingly about the question of whether or not LLMs can reason. One of his key arguments rests on fundamentally how LLMs work: you query them for the next token (a 'token' is a small chunk of text, usually less than one word),  and they produce it **in constant time**. By constant time we mean that if you run the algorithm thousands of times, each run will take more-or-less the same amount of time. Kambhampati points out: if the model is really reasoning, it would take different amounts of time to solve big complex problems versus simple easy problems, but it doesn't[^2]. LRMs address this by getting the models to, instead of outputting an answer, output the low-level reasoning required to reach an answer, and then later the answer drawn from that reasoning. In essence, though each token is constant-time, this higher-level orchestration of token generation (known as an inference loop) makes the whole end-to-end process no longer constant-time, because models will spend more time discussing the reasoning for complex problems than for simple ones. That reasoning itself we can discard because only the answer is what we want, but allowing it to output this reasoning does seem to improve the results.

<figure src="speaking.png">Wise words to keep in mind when it comes to LLMs</figure>

### Machine learning is... Weird

Makes sense in theory, right? Wrong! Because we don't know why this works, or even whether it really does work?  We have the bizarre concept of 'faithfulness' of reasoning in which what the model actually does to reach a conclusion is often _not_ what it says it does in its reasoning output [^3]. For example, internally Claude uses approximate reasoning to solve maths questions but the reasoning it outputs will use typical arithmetic used by humans[^4]. At other times this 'unfaithful reasoning' appears to be the model reaching a conclusion, then working backwards to invent a narrative of how it reached that conclusion. Sounds like wasted effort if the conclusion is not actually determined by the reasoning, right? Yet, it seems to work.

Or does it? Kambhampati's department tried to test the models that were succeeding so well on benchmarks by obfuscating the benchmarks - the logical problems are exactly the same but the names and words are replaced by random gibberish. In theory, the logic of solving the problems is exactly the same, only the names of some nouns have changed. Yet, performance of this obfuscated version dropped from 97.8% success to 37.3% success[^5]. This may suggest that on some level the model was not reasoning, but actually recalling similar problems from its training data. Or, it may be that as a language model it relies on the language that it was trained on itself and can't reason as effectively about random gibberish strings as 'real' words. In any case, if it was truly capable of reasoning then given any clearly communicated unambiguous problem and sufficient time to solve it, the results should be 100% correct every time. A calculator doesn't give you correct answers 99% of the time. These models are clearly, fundamentally doing approximations and these approximations perform better in some circumstances than others, and trying to figure out what those best circumstances are is a bit like throwing darts at a moving target while wearing a blindfold.

### Isn't this really expensive?

You may be noticing another glaring issue I haven't mentioned until now. Reasoning may improve performance in many circumstances, but generating that reasoning involves invoking the model many times more to generate many more tokens than before. Apple published...[^6]

## Do not generate what you could not write yourself

The big problem of computer science has _always_ been verification. (Mention that Turing quote?)

## Maybe software just isn't that hard

* we don't need general intelligence to write software
* AI can write software and that made some people think they're intelligent, but the real insight is that programmers aren't
* Maybe what we do is just not that difficult, and dumb AIs are good enough?


[^1]: Karthik Valmeekam  et al., Arizona State University, ['LLMs Still Can’t Plan; Can LRMs? A Preliminary Evaluation of OpenAI’s o1 on PlanBench'](https://arxiv.org/html/2409.13373v1)
[^2]: Subbarao Kambhampati  et al., Arizona State University, ['LLMs Can’t Plan, But Can Help Planning in LLM-Modulo Frameworks'](https://arxiv.org/html/2402.01817v2)
[^3]: Anthropic, ['Claude’s extended thinking'](https://www.anthropic.com/news/visible-extended-thinking)
[^4]: Typing Mind, ['Inside the Mind of Claude: How Large Language Models Actually “Think”'](https://blog.typingmind.com/ai-misconceptions/)
[^5]: Karthik Valmeekam  et al., Arizona State University, ['Planning in Strawberry Fields: Evaluating and Improving the Planning and Scheduling Capabilities of LRM o1'](https://arxiv.org/abs/2410.02162)
[^6]: Parshin Shojaee et al., ['The Illusion of Thinking: Understanding the Strengths and Limitations of Reasoning Models via the Lens of Problem Complexity'](https://ml-site.cdn-apple.com/papers/the-illusion-of-thinking.pdf)
