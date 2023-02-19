---
title: Rust Nation 2023 Review
date: 2023-02-19 00:00:00 +0000
description: A review of Rust Nation 2023! Delivering a day-long workshop, meeting cool people, attending great talks…
img: ./logo_header.jpeg
tags: ["Conference", "Event", "Rust", "Talk", "gamedev"]
---

Over the past week I attended Rust Nation 2023, a two-day conference and the UK's first ever Rust conference, and even delivered a day-long workshop. It had massive attendance and really drove home just how big and active the Rust community is. In this post I'll share what I learned and my experiences at the con, and hopefully entice you to join us next year if you weren't there this time.

## Day One - Delivering a Foundational Workshop

<figure src="workshops-speaking.jpg"></figure>

Rust Nation was split into two days, the first day being the workshop day and the second being the conference day. The workshop day featured three day-long workshops: Foundational (beginner), intermediate, and async (advanced). As the Workshop Partner, Codurance ran two of the workshops: Myself running the foundational track, and my colleague [Jocelyn Facchini](https://hachyderm.io/@jsfacchini) running the intermediate track.

We worked closely together on the content for both. We re-used much of the content from [my talk on macros last May](/2022-05/macros-what-why-how/) for the intermediate track's macro section and Jocelyn came up with a really cool exercise for it inspired by the "Building the json! Macro" chapter of O'Reilley's Programming Rust (2021). We also did many dry-runs together of both workshops along with our teaching assistants that were of great help to us on the day, [Ivan Katzarski](https://www.linkedin.com/in/ikatzarski/) and [Benjamin Hedges](https://www.linkedin.com/in/benjaminhedges/) (Codurance) and [Jorge Gueorguiev](https://twitter.com/yefoakira) (Equal Experts, formerly Codurance).

All that is just to say that: It was a lot of work and I was lucky enough to collaborate with some really great people. As for the day itself, all that work paid off because it went off ~without a hitch~ with very few hitches!

I had a lot of content prepared already for the foundation workshop from my [Introduction to Rust talk](/2022-04/intro-to-rust-talk/) and workshops that I had run at the London Software Craftsmanship Community, but this was twice as long as the workshop I'd run before so it needed a lot of new content. The broad idea of the foundation workshop was to, as the name implies, teach the _foundations_ of the language. We delved deep into ownership & borrowing, explaining exactly what the compiler is doing at a low level. Then we covered much of the common types and syntax you need to know to get started with Rust and went over error handling and testing, before finishing off by bringing it all together by writing a small project. Finally I shared a number of great resources for learning more for those that wanted to continue their Rust journey.

I knew from the start that it was a very ambitious amount of content to deliver, so I intended for the final section- the small project- to be something we didn't finish on the day but something we could start on, and included a lot of detail and even a finished solution in the exercise itself so that attendees could finish it in their own time. And that seemed to go down well. I even met an attendee just the next day who had gone home and finished the exercise right after the workshop finished.

All in all I'm really happy with how it went and open to doing more workshops, tutorials and the like in the future.

## Day Two, Session One - Grand Opening

<figure src="opening_keynote.jpg">Photo from <a href="https://twitter.com/FastlyDevs/status/1626527876668440576/photo/1">@FastlyDevs on Twitter</a></figure>

The opening talk was from Nell Shamrell-Harrington, Principal Developer at Microsoft and a member of the Rust Foundation board. The talk was all about the Rust community and included a great number of quotes from various figures that almost served as a rollerdeck of many of the most prominent figures in the community. It highlighted how uniquely inclusive and supportative the Rust community is, and I completely agree. So many times I've found total strangers willing to volunteer their time any energy in helping me study Rust whether from Discord, Reddit or from volunteer mentors on Exercism.

Nell also pointed out that at the rate of exponential growth the community is seeing, if you've been programming Rust for over a year you likely have more experience with it than half the Rustaceans out there. That is a really interesting point and I think emphasises the need for those of us who've been studying Rust for even just one or two years to be as inclusive and supportative as possible, to show the same behaviour others have shown to us to those just trying Rust for the first time and keep that great community culture going.

## Day Two, Session Two - TockOS Tutorial

<figure src="tockOS.jpg"></figure>

For the second session I attended Irina Bradu's TockOS Tutorial. I wasn't able to stay for the full duration but I always find it really interesting to play with embedded code devices. In this session Irina supplied a whole load of Pico Explorer devices and the idea of the tutorial was to setup a simple IoT device that could control temperature sensors and such.

TockOS is an embedded operating system. The tutorial involved setting up a Pico Explorer as a sort of IoT hub that could pull in data from sensors and use them to set your thermostat automatically. It's an exciting idea to me because I'd like to have some home automation but I don't trust the big IoT providers that want to store all your data on "the cloud", but it also seems like a significant amount of work to maintain.

## Day Two, Session Three - Meeting the Game Developers

<figure src="gamejam.jpg">Image from <a href="https://twitter.com/AngelOnFira/status/1626688227280306176">Forest Anderson on Twitter</a></figure>

For this session I was looking for one talk, couldn't find the room and ended up stumbling into a different room entirely where [Joshua Barretto](https://twitter.com/jsbarretto) and [Forest Anderson](https://twitter.com/AngelOnFira) were running a "micro game jam". They are two of the core developers of [Veloren](https://veloren.net/), probably the most prominent game developed in Rust right now, and Forest is a member of the Rust Game Development Working Group.

They actually wrote their own micro game engine just for this conference, which is the coolest thing. I sat down and had a play with it with the idea of writing some some simple demo but didn't get far because I ended up doing my favourite thing to do at these events: Chatting to interesting people in tech. So I spent most of this session talking to Joshua and Forest about voxel game engines, multi-agent systems in simulations, and the Rust community in the UK.

During this conversation we discovered that Barretto and I had [met online once before](https://todon.eu/@jsbarretto@social.coop/109596960001321798). It is funny to realise that someone you've met in real life is the same person as some identity you know online - your mind now maps these two identities where there wasn't a link before. It's like when you discover a new shortcut on your commute and suddenly your mental map of the area changes.

## Day Two, Session Four - Moving Past Proof of Concept

<figure src="mcnamara_keynote.jpg"></figure>

Tim McNamara delivered a keynote in session four with the topic "Moving past Proof of Concept". I was also lucky enough to briefly meet McNamara at the RedBadger event on the Saturday too, though I didn't realise that I was talking to the author of Rust In Action until part-way through the conversation.

I made a few notes that I thought were interesting points from the talk:

* Going by various metrics the Rust community's growth appears to be exponential - things are going to change fast if this momentum continues
* It is not enough to persuade your clients or employers to give Rust a try. To ensure the longevity of Rust you need to have a really strong case.
  * Rust may be able to eliminate almost all memory bugs that currently plague non-garbage-collected languages. McNamara quoted a number of interesting sources that showed staggering amounts of preventable memory-related issues that can have very high impact in terms of maintenance, user satisfaction, and security.
  * He also highlighted energy conservation, and this was a point I saw come up several times at the conference that I found really interesting. If I recall correctly he quoted one study in which a company migrated their horizontally-scaling service to Rust and found that they could reduce their number of nodes by 70% as a result - what a huge saving in energy! In a world where [data centres use more power than rural homes in Ireland](https://www.irishtimes.com/news/ireland/irish-news/data-centres-now-consuming-more-electricity-than-rural-homes-cso-1.4868221) that could mean a huge difference.
* He also listed a few project ideas for newcomers to Rust to try, and highlighted the need for more people that have a desire for one library or another to exist to publish these so that newcomers looking to write some Rust have an idea of what needs to be done
  * Reimplement `std::Cell::cell` - apparently this is an interesting look into the standard library
  * Add a snippet to the Rust Cookbook
  * Write a chatbot - a project that is very much achievable and yet massive extensible, dependon on just how far you want to go.

## Day Two, Session Five - SurrealDB

This session was a little over-subscribed so I was sitting on the floor near the back and couldn't follow along too well, but it was an intereting presentation: part introduction to SurrealDB and part discussion of why they chose to write it in Rust. In short, they used Go in the past and found great performance improvements and cost savings by switching to Rust.

I haven't had the chance to play with it yet but SurrealDB seems like an interesting project. It is a "multi-model database", so you can use it to create a typical table-based relational DB or a document store or a graph database all under the same roof, sharing authentication and connections and such. It is designed to be a cloud-native scalable platform, with a particular focus on serverless and JAMStack apps.

## Day Two, Session Six - Rust Foundation Q&A

<figure src="rust_foundation.jpg">Image from <a href="https://twitter.com/rust_foundation/status/1626611878062600194/photo/1">@rust_foundation on Twitter</a></figure>

In one of the last sessions of the day I attended the Rust Foundation panel session facilitated by Ernest Kissiedu with panelists Rebecca Rumbul (CEO), Joel Marcy (CTO), Paul Lenz (finance), and Stephen Chin (newest director, works at JFrog). I didn't know anything before this about how Rust is governed so this was really interesting. A few notes:

* There is a distinction between "The Rust Project" and "The Rust Foundation". The foundation apparently oversees various aspects of the Rust community, grants program, and funding for various other initiatives but does not get directly involved in the Project, which is the development of the language and compiler itself. They do their best to support and provide whatever it is the Project needs but the Project have full autonomy to decide what direction to take the language in.
* The Rust Foundation is growing - Joel was until not long ago the only technical member, but now they are up to 6 full-time technical staff.
* Joel notes that though the growth of Rust is great it has put a lot of strain on their infrastructure - I'm not sure exactly what infrastructure he's referring to, but I imagine crates.io would be the biggest problem
  * As such a big goal for next year is to optimise the infrastructure to reduce costs
* Rebecca made the point that a lot of businesses are waking up to the importance of security, but while Rust can certainly help they will be disappointed if they think it is a magic bullet.
* Paul made a number of interesting points regarding finance. They want to expand their grants program and support as much open source software and grass roots communities as possible. They will need more funding for this and he points out that many big organisations are making millions from open-source software and not paying back into the community, so there need to be "better ways of guilting these organisations".

## Day Two, Session Seven - Living with Rust Long-Term

<figure src="gjenset_keynote.jpg"></figure>

The final keynote of the day came from Jon Gjenset. Having only been in the Rust community for a year or so and being bad with names and faces I often didn't recognise some of the prominent characters or mixed up who had written which book or which software library. But unlike most of the many notable authors at the event I've read Jon's book, Rust for Rustaceans, and also seen some of his videos so I was a bit more familiar with him.

Gjenset's talk seemed to nicely tie into McNamara's talk - they both had a broadly similar theme of: Going beyond migrating small modules to Rust and so forth, what concerns do we need to be aware of when it comes to developing serious amounts of code in this novel language long-term? This talk focused on the concerns you need to be thinking of now if you plan to maintain a Rust codebase for years or decades, and a lot of it was around dependency management. My notes:

* Rust guarantees backwards compatibility for a given edition. And because different crates can be built with different editions, you can upgrade your edition without causing any compatibility issues with your dependencies.
* Suggests that lints should be warnings not errors, i.e. not fail your CI, and to come up with a "batch process" for regularly tackling these.
  * This batch process may also include other steps like retrofitting new features to your codebase. You don't want to do this when you upgrade because upgrading may then be a much bigger, slower process but it is worth doing when you make time for it later.
* He strongly encourages everyone to stay up-to-date on the latest software and to avoid unstable features (Rust nightly) as much as possible
  * Updates give passive improvements - even if you don't use the latest greatest feature there are many less flashy improvements included that will make a difference to your performance and reliability
  * Unstable features may change and cause regressions in your codebase
* He also made some interesting points about crate abandonement, which I've found to be a big problem in NPM projects. He advised:
  * Be selective about what dependencies you add, ask yourself if you're confident whether this crate will be supported in 10 years time.
  * Use Cargo-Audit to check for any supply problems with your dependencies
  * If a crate is abandoned, don't stay with it. Do the work to migrate.
  * If you notice that a crate is abandoned you can report it to Cargo-Audit.

## Conclusion

Rust Nation was great fun, and really tiring. It was wonderful to take part in the UK's first Rust conference, to meet so many people that previously were just profile photos on a screen, and to get a real feel for just how huge the momentum behind Rust is right now.
