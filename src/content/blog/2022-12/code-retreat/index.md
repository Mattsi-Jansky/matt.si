---
title: Retrospective - London Global Day of Code Retreat 2022
date: 2022-12-11 00:00:00 +0000
description: I ran London's Global Day of Code Retreat meetup at Codurance. Find out more about Global Day of Code Retreat and how the event went
img: ./code-retreat-banner.jpg
canonicalLink: https://www.codurance.com/publications/coderetreat-london-2022
tags: ["Event"]
---

_First posted on [the Codurance Blog](https://www.codurance.com/publications/coderetreat-london-2022)._

Global Day of Code Retreat is an annual in-person event that takes place in numerous cities across the globe. Each event has the same purpose: Get a load of programmers together in the same room to practice pair programming and TDD. You get to learn from and teach people, practice programming patterns you haven't tried before, and network with your peers from across the industry. This year I facilitated the London event with LSCC, the London Software Craftsmanship Community. Jetbrains sponsored the event with a free license to any Jetbrains IDE, and Codurance sponsored the location and food.

## The Code

Coderetreat focuses on one particular programming challenge: Conway's Game of Life. Game of Life is a fun little simulation to implement, it can be confusing at first to people that haven't studied it before but if you know the problem well you can easily implement it in under an hour. However, the point is not to code Game of Life. Completing the challenge is not the aim. The goal is the experience and learnings from pairing with your peers and trying new things. In particular, practicing or learning (it was a first for most of our attendees!) TDD and pair programming.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/FdMzngWchDk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## The Structure

The day consists of five sessions of pairing with someone new each time, for about an hour each. In each session you spend 45 minutes programming and 15 minutes on a retrospective discussing what you learned or what you found interesting in that session, or simply showing off a particular implementation that you are proud of. After each session you delete your code (Because again, coding is not the point - the expderience is!). You may be surprised how many different ways the simple rules of Conway's Game of Life can be implemented. And pairing with someone different each time enables you to get out of your own typical ways of coding and see how other people outside of your bubble look at a problem.

But if you get bored of doing the same problem repeatedly, you can switch it up with [constraints](https://www.coderetreat.org/facilitators/constraints/). Constraints throw a wrench in your usual way of coding to see if you can learn something by doing things differently. Some of them are quite funny ones like not using an IDE or even writing all your code on paper. Others are interesting ways of working together such as ping-ponging, in which you switch which one person writes the tests then you switch and the other makes the test pass. There are also a lot of interesting software design constraints that I think one can really learn a lot from such as never using primitives, or only having one level of indentation, never using mutable variables.

## The Day

The day went very smoothly. Quite a few people were new to TDD and pair programming so it was really interesting to see their experience and their reactions. It lead to a lot of interesting conversation as to their experiences and the value of these practices. It was really interesting to see people getting up to speed throughout the day, too: In the first two sessions a lot of people struggled to get one passing test, but by the end of the day most pairs were getting substantially far through the challenge in just 45 minutes and we had several pairs that managed to complete it.

For those struggling to get the hang of it I shared an example of [a solution written in Rust](https://github.com/Steelstone3/Rust-Study-Group/blob/multithread-team-mpjj/src/lib.rs) that some friends and I had made and going through that during one of the retrospectives seemed to help. We also found that many people were finding it difficult to get started due to difficulty with setting up new projects, installing and configuring the right test framework or getting tests to run. This is something everyone got better at as the day went on but we also suggested [Code Retreat's starter repo](https://github.com/remote-code-retreat/code-retreat-2019/tree/master/presets) as a faster way to get started, and that seemed to help some pairs.

<figure src="coderetreat-room.png"></figure> 

We've also asked some of the attendees to share their experiences of the day. Robert Firek had this to say: 

> Not my first time, and probably not the last one. As usual, I enjoyed seeing how the same problem can be solved in so many different ways. Especially, I could share my experience. Great to see that so many people are still happy to meet and learn something new

Chris Eyre from [Prima](https://www.prima.it/) shared this:

> I paired with 5 different people each with a varied level of experience. 4 of the attempts I used Elixir and one in Python. It's a great way to work with a range of people that you would not normally meet. I would recommend this to anyone getting into TDD (or if you are already into TDD and want to share).

Magda Firek who started her programming journey earlier this year shared this:

> It was the first workshop of this type that I participated in. It is also the first time I have dealt with the TDD technique, and I can say right away that I will use it in the future. Connecting with programmers who code in different languages was very interesting. I'll join next year for sure to see how my knowledge improved. Massive "Thanks" to Codurance for organising.

## The End

So, that was Global Day of Code Retreat 2022. If you think this sounds awesome, join us at Code Retreat 2023 next year! But you don't have to wait until then, London Software Craftsmanship will be hosting [lots of other regular events in-person in London before then](https://www.meetup.com/london-software-craftsmanship/).


