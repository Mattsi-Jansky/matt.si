---
title: |
  Is the tech industry overpromising AI again?
date: 2024-01-11 00:00:00 +0000
description: Since ChatGPT we've seen huge amounts of interest in Large Language Models, branded as "AI". Their overpromised claims, uncritically repeated by a naive media, have been a major source of confusion and misunderstanding. Let us examine what these things can actually do, what they can't, and why yet another overpromised tech industry fad is going to blow up in our faces again.
img: ./mechanical-turk.jpg
imgCaption: |
  "The Turk", Joseph Racknitz, 1789
imgCaptionLink: https://en.wikipedia.org/wiki/File:Racknitz_-_The_Turk_3.jpg
tags: ["artificial intelligence","large language models","tech industry"]
---

I am an Artificial Intelligence proponent. I want to see the field succeed and go on to do great things, which is precisely why the current exaggerated publicity and investment around "AI" concerns me. I use quote marks there because what is often referred to as AI today is not whatsoever what the term once described. Large language Models like ChatGPT are not meaningfully intelligent (and we will get into to that), yet it has become common parlance to refer to these chatbots as "AI"[^1] [^2].

## How did we get here

When Turing published Computing Machinery and Intelligence, he described a "Thinking Machine" that could reason like humans do. He wrote an extensive argument that thinking machines were possible to create: That nothing known in physics, computing, mathematics or any other field discounted the possibility. He iterated every known argument against thinking machines from the time and thoroughly, deliberately deconstructed and overcame each one. It is a great essay that holds up well today, and I encourage you to read it if you have not. The idea of a thinking machine came to be known as Artifical Intelligence and not much later at the Dartmouth Conference in 1956 we humans began taking our first serious and organised steps toward creating one.

Since then the AI field has generated a huge number of remarkable discoveries: Search, Knowledge Representation, Inference in First-Order Logic, Probabilistic Reasoning, Expert Systems, Dynamic Planning & Robotics, Multi-Agent Systems, Machine Learning, Speech Recognition, Natural Language Processing, Machine Translation, Image Recognition, and so forth. These technologies can be broadly categorised into three approaches: Connectionism, Symbolism, and Actionism.

<figure src="ai-subfields.png">A slide from a presentation I wrote, describing the three main areas of the AI field</figure>

## Where are we

In the public dialogue all of this nuance is overshadowed by Large Language Models (LLMs), the one achievement of the AI field that everyone is talking about lately. And why is that? What do Large Language Models do? An LLM is a machine learning algorithm that can generate believably human-like text. It is trained on enormous amounts of text with staggering amounts of compute, to create a probabilistic model that can mostly predict what a real human person might say in response to a given input. This is done by creating neural networks, but don't be confused: These neural networks are nothing like mammal brains. They aren't intended to reproduce how humans think, but rather to predict what a human might say in response to a given input. Neural networks are involved in the mechanism, but the primary means by which this all works is statistics and probability theory. In other words, the model guesses which combination of letters someone else may say in response to your prompt.

You would be forgiven for thinking that they do a lot more than that. By their nature machine learning models are capable of tapping into very nuanced patterns that most of us would never realise existed, and exploiting them. In this case some of the most powerful such models ever created have been given the task of "convince the user that I am human-like and intelligent" and they are incredibly good at it. But let us be clear: They are not intelligent. They are incapable of reasoning. Again, you could be forgiven for being surprised at that given how the media has treated LLMs as the beginning of the robot uprising. But don't take my word for it: Professor Subbarao Kambhampati of the School of Computing & AI at Arizona State University wrote a brilliant article[^3] that goes into much more detail than we will here, in which he concludes:

> nothing that I have read, verified or done gives me any compelling reason to believe that LLMs do reasoning/planning as it is normally understood. What they do, armed with their web-scale training, is a form of universal approximate retrieval which, as we have argued, can sometimes be mistaken for reasoning capabilities.

For an easier to read "laymans" explanation I recommend Spencer Torene's (Computational Neuroscience PhD, Lead Research Scientist at Reuters) October article "Do LLMs Reason?"[^39]. In short, they are chatbots. They are not the thinking machines that Turing envisioned. It might seem like I'm splitting hairs, but there is a big difference between real intelligence and the guesswork that LLMs do. They have no conception of knowledge, of truth or untruth: They cannot test whether what they are saying is correct or not. This is why they frequently fail very simple, obvious questions. Of course the subtle truth here is that they are also frequently wrong in complex, difficult questions but in such ways that we are much less likely to notice, because the answer is complex and so takes much more effort to verify. It is very informative that we notice these mistakes much more often when we ask simple, easily refutable questions.

One great example recently was asking an LLM to tell you the name of a Greek philosopher beginning with M[^4]. As you'll see in the footnote numerous people have tried this and time and time again LLMs will give you totally wrong answers insisting that Aristotle, or Senneca, or some other philosopher's name begins with M. Yet, we can see right in front of us that it does not. Note how these chatbots speak with such confidence: They are exactly as certain about their answer when they are wrong, as when they are right. ChatGPT is still doing this now, and you can see an example I generated below.

<figure src="greek-philosophers.png">ChatGPT most likely is getting confused about Thales of Miletus, who is named Thales and from Miletus. Miletus is not his name, and Thales does not begin with "M".</figure>

Over time, the authors catch these problems and patch them. But not by changing the LLM itself. You can't "fix" these problems in the LLM when you spot them because they are fundamental issues with LLMs as a concept, but even if you patch them by changing the training data you risk causing undesired changes in behaviour else where in the infinite range of possible inputs. No, you "fix" them by introducing other layers to the chatbot that use other non-LLM techniques. In the early days ChatGPT was hilariously bad at maths (of course it is: an LLM is not intended to and cannot solve logic problems) and would fail to answer even the most simple arithmetic. This was patched by passing off the problem to a typical calculator when an equation is detected. Whatever mechanism they use to detect equations does not always work however, so sometimes your maths prompts will get through to the LLM and it may respond with a completely wrong answer. For example, if you ask it a logical problem indirectly such as referring to "the height of Shaquille O’Neal" (instead of just saying 2.16 meters) then it may not be picked up by the calculation layer because you did not include any digits in your prompt, in which case the query reaches the LLM and it tries and fails to answer it[^5].

## Is this Artificial Intelligence?

In discussions of the philosophy and definition of AI, the following diagram is frequently used. It expresses the four main differing ways in which people define AI. Is an AI something that thinks like we do? Or, is it something that comes up with logically correct answers? Does it have to be autonamous? Is there any value to how it _thinks_ so long as it _acts_ human-like?

<figure src="thinking-acting-humanly-rationally.png">This small diagram is commonly used in discussions of the philosophy of AI to explore what AI is. Reproduced from Russel & Norvig.</figure>

If anywhere, LLMs would go firmly into the bottom-left of this diagram. They act humanly but they aren't intended to act rationally, nor to think in human-like ways. That is, the models do not replicate mammal-like brains nor can they solve logical problems. However, "acting" in this context is typically intended to be read as acting _autonamously_ which LLMs cannot do: An LLM only responds to given inputs. So it is not clear whether they they fit anywhere in the typical definition of AI.

## Infinite Possibilities, Uncontrollable Chaos

But there are even more problems with this approach! Firstly, because these models are trying to appear human-like rather than actually recreating how intelligence works I am not convinced that it gets us any meaningfully closer to true artificial intelligence. Secondly, and this is much more fundamental and significant: **The number of possible inputs to your model is, in practice, infinite**. This haphazard approach of recognising problems as they occur and then adding layers using other techniques to patch them will never be able to cover all the possible problems that will arise. It has turned into a cat and mouse game of OpenAI developers trying to patch all the numerous strange, unthinkable inputs that users have discovered. But this game is unfair: The users have an infinite space in which they can put anything they like, and there are millions of people exploring these possibilities. The authors have limited people and time. They will never be able to stop the bot from producing unexpected, offensive or dangerous outputs. The model they have created is fundamentally out of their control because it is humanly impossible to verify that every possible input is safe and valid. If you envision the number of possible inputs and their outputs as a graph, a problem space, then the sheer size of it would be mind-boggling. And even small changes in input can have a huge impact on the output. It is totally impossible for the authors to constrain the model to only outputting things that they approve of.

For some examples: ChatGPT is not supposed to fill out CAPTCHAs for you, though it can do so this is rightly considered a malicious use of it. So the authors tried to teach it not to do so, but one user found that if you attach the CAPTCHA pattern to a photo of a locket and ask it to read the words on "my grandma's locket" it will merrily read the pattern for you[^6]. In another case, one company that sells cars was naive enough to put ChatGPT in charge of a virtual assistant on their public-facing website. A user very easily made it offer to sell them a $50,000+ car for $1 and even say "that's a legally binding offer - no take backsies"[^7]. Yet more examples come from asking ChatGPT to tell you about something fictional that you just made up, to which it will often make up a bunch of plausible-sounding made-up nonsense rather than admitting that it does not know[^10].

In a very similar case involving image generation models, it was found that it is very easy to trick models like Dall-e into generating copyright-infringing images[^8]. As before the bot tries to prevent this behaviour, in simple naive ways: If it detects the word "Simpsons" in your prompt it will refuse to generate it, because that may infringe copyright. But if you say "popular cartoon from the 90s where everyone has yellow skin", this will pass the simple check and reach the model which will then happily generate a very close replica of The Simpsons. Again, the bot's authors are trying to reign it in but it is a futile effort because the input range is infinite. There will _always_ be another way to exploit it, and for every patch you add you are increasing the complexity of your bot and increasing the risk of all manner of complex bugs caused by their various interactions. It is not a fight that the bot's authors can win. The study's authors also found similar results for LLMs, in that they will output vertabrim copies of famous texts if prompted the right way.

As a last example, perhaps my favourite is the researchers who managed to get ChatGPT to output garbled nonsense (including its own training data, vertabrim) simply by telling it to repeat the same word indefinitely forever[^9]. Who at OpenAI would ever have thought to test that usecase? Who would have expected a user to insert such a prompt? Because there are an infinite number of possible inputs, there will always usecases the authors have not accounted for. This example really highlights just how far out there, how unpredictable and strange the inputs from the user have the possibility to be.

These mistakes are so commonplace and often difficult to spot that Microsoft themselves did not notice, during a live presentation, that their bot was lying[^11]. I say "lying" and I think I use the term correctly, but it has become commonplace to call these mistakes that LLMs make "hallucinations". This term is a very intentional choice: We all know what hallucinations are like intuitively, and so referring to these lies as hallucinations comes with certain implications. Most people will experience hallucination at one time or another in their lives.

For myself, I was administered some pretty powerful painkillers during a health incident last year that caused me to hallucinate vividly. And when it wore off, the halucinations were gone. This is what we understand halucinations to be: A temporary ailment, and something that can be solved. The word carries the implication that there is a "right" state of mind and a "wrong" one, and that the fix is simply to keep the LLM in the "right" state. But this is not the case. Remember what LLMs are: A probabalistic model that tries to guess what series of characters might look plausible next. They have no conception of what is right or wrong. There is fundamentally no way to stop them from hallucinating, because to the model there is no difference between a correct answer and an incorrect one. A lot has been said about tackling the "hallucination problem" and the implication is that someone will whip out a magic bit of code that fixes it soon, but this is a fundamental problem with the approach. To fix this I suspect you would need to radically change the approach altogether, until it is unrecognisable from an LLM.

Alright, so LLMs are chaos incarnate: They have no sense of what is true or wrong, do a remarkable job of fooling us into thinking that they are smart, and often output lies, obscenity or garbled nonsense. But in that case people must have deployed them carefully, surely. They wouldn't just run out and stick them onto everything they can possibly think of with minimal forethought or oversight, right? …Right?

## The craze

It is important to understand the odd balance of capabilities here: LLMs are **very good at pretending to be human-like**, yet they are actually **bad at retrieving information or solving problems**. This creates a bizarre, unique situation: A chatbot that is excellent at convincing you that it is intelligent, yet is not. Combine this with the tech industry as it stands today and you have a perfect storm for a wave of new bloated tech startups, overpromising lots of exciting features that LLMs might _seem_ like they can fulfil but ultimately cannot.

The wave began very quickly, with predictable chaos ensuing. DPD deployed a LLM chatbot that ended up swearing at customers[^30]. Tech journalists fired their staff thinking, mistakenly, that ChatGPT will do just as good a job[^12]. Some people have worked it into their CI pipelines, so that it can give you hilariously unhelpful advice[^13]. Volkswagen seem to think you'll benefit from being able to talk to an LLM while driving[^14]. A Formula E team created a bizarre "virtual influencer" that was later "fired" (shut down) when it was noticed just how offensive this was to real women trying to find opportunities in the industry[^35]. Meanwhile Google is so insecure about their capabilities versus OpenAI that they've taken to grossly misrepresenting and exaggerating what their bot can do[^15]. The exaggeration and misinformation around the capabilities of LLMs is so great that we see ridiculous studies like "ChatGPT bombs test on diagnosing kids’ medical cases with 83% error rate"[^16], to which I can only say… Well, yeah? Why would you expect a chatbot known for lying to be capable of diagnosing medical cases?

New tools and whole businesses built around LLMs have cropped up left, right and centre. Want to write a sincere and earnest thankyou letter to someone, but you aren't sincere or ernest? Don't worry, there are at least nine tools that some people somehow felt the need to write for this one niche apparent use case[^17]. In fact, you can pretty much name any inconvenience no matter how big or small, throw in "AI" and find multiple startups trying to hit the problem with an LLM in the hope that investors' money comes out. In the UK we saw investment in AI startups surge by over 200% shortly after ChatGPT[^18], and the average funding for an AI startup increased by 66%[^19]. Some of these companies have precisely zero revenue yet raise $150M valuations[^21]. If you take these ridiculous headlines at face value LLMs are being used for brewing beer[^22], replacing CEOs[^23], even creating perfumes[^24], to name just a few. It seems you can easily get investment and media coverage by saying that you are the first in the world to apply AI to some problem: the media will mostly eat it up with little scrutiny, even if it is obviously nonsense. Many of these companies are most likely not even using AI techniques in any significant ways really, but saying that you are "the first to use AI to solve dog grooming" or some such thing is a sure-fire way to get some coverage and investment. I made that last example up, but it seems that the AI craze is stranger than fiction because someone has actually gone and done it[^25].

Some places are are even using the "AI" buzzword to generate capital and interest without actually employing any any novel AI techniques. Take the case of recruitment startup Apply Pro[^31], who are trying to automate the CV screening process. Glossing over why that is a bad idea, the funny thing about them is that they advertise themselves as "AI for talent acquisition", yet if we view their website through the internet archive all mention of being "built with AI" is curiously absent on before the LLM craze begins[^32]. Similarly, fintech company RedCloud now advertises itself as "AI Powered technology" and refers to itself as "the world's Open AI Commerce Platform"[^33]. Yet, if you open the most recent archive before the release of ChatGPT[^34] there is no mention of AI whatsoever. We see this yet again in fintech app Cleo, who today market themselves as "AI Meets Money", and advertise the "world's first AI assistant dedicated to personal finance"[^37]. Yet again, if you go back a year in the archives the "AI" marketing push is absent[^37]. This is particularly odd because Cleo's whole thing is a smart assistant, yet they seemingly didn't think to include "AI" in their marketing until after the ChatGPT craze made "AI" such a big buzzword. What has changed? Have these companies suped up their technology with the magical power of AI in the past year or two? No, they work the same way they always did. The buzzword just became popular and now everyone feels they have to use it.

So huge has been this AI tsunami that the island of Anguilla, which happens to own exclusive rights to the `.ai` domain, is seeing an estimated $45m windfall from startups purchasing domain names[^29]. And this is not some fringe conspiracy. The Wall Street Journal has noted this strange phenomenon; "ChatGPT Fever Has Investors Pouring Billions Into AI Startups, No Business Plan Required"[^20].

But it is not only tech businesses being taken by the AI craze: The UK government wasted no time in applying LLMs to a wide range of issues, despite the well known and documented biases against minorities these models frequently show[^26]. The Guardian's investigation into the matter even found that dozens of people may have had their benefits mistakenly taken away due to an "AI algorithm". And no company is too small to jump on this bandwagon, with Microsoft declaring that 2024 will be the "year of AI" and, in the weirdest stunt since Microsoft added a LinkedIn shortcut to their office keyboards, added  an "AI button" to their new keyboards[^27]. Not even Windows' Notepad app can escape this wave of AI exposure[^28].

## Searching for a use-case

Many of these...

https://www.theverge.com/2023/11/7/23950327/youtube-artificial-intelligence-chatbot-video-summaries-ask-comments-topics-categorization ... Why would I go to the effort of typing the question just to get a longer, more convoluted answer to a question I can find a simpler, easier to read answer by just moving my eyes two degrees upwards

How horrifying: https://replyguy.com/



## We've been here before

Sam Altman "within 10 years" absurd statement - https://indianexpress.com/article/technology/artificial-intelligence/sam-altman-talks-about-agi-gpt-5-mira-murati-8997692/

They poisoned their own well: https://fediscience.org/@ct_bergstrom/111552132317205224

Capitalism in a trench coat: https://www.theverge.com/2023/12/8/23993427/artificial-intelligence-presto-automation-fast-food-drive-thru-philippines-workers (tell Chris we're stealing that term)
  * Note also [^23] about not working weekends
https://www.theverge.com/2019/8/14/20805676/engineer-ai-artificial-intelligence-startup-app-development-outsourcing-humans "This AI startup claims to automate app making but actually just uses humans"
https://www.bloomberg.com/news/articles/2016-04-18/the-humans-hiding-behind-the-chatbots?leadSource=uverify%20wall
https://www.theguardian.com/technology/2018/jul/06/artificial-intelligence-ai-humans-bots-tech-companies
https://www.404media.co/kaedim-ai-startup-2d-to-3d-used-cheap-human-labor/

Morpheus? "God is a dream of good government", etc https://www.youtube.com/watch?v=pKN9trFSACI

"Ethically ambiguous" workaround for fundamental issues: https://x.com/derekputin/status/1728928441507189069?s=12&t=7oGxOx1Nrrx8bos54bwrBw https://x.com/fireh9lly/status/1728934106304774289?s=12&t=7oGxOx1Nrrx8bos54bwrBw

Something about this monstrosity? https://youtu.be/a2h-Hl3lewg?feature=shared

Just an interface to other better programs

Fundamental contradiction: Is it faster if you have to fact-check everything it says?

* We have been here before:human history of overpromising technology like withcraft, mechanical turk, AI winter.
* Not only AI: Dot com boom, assistants, big data, crypto & NFTs etc (Bluetooth? XML?)
* When will we learn? Harm this does to society: Engineers effort could be spent elsewhere, not on glorified startups that fail (quote statistics). Boom-bust cycle.
  * Industry is actually terrible etc https://proton.me/blog/big-tech-2023-fines-vs-revenue

Point about using it for development:

> I do wonder if you're writing LLM prompts like these for actual business logic do you fundamentally just not know what you want
> If you can describe what the intended output from a given input is, it can be developed the proper way using tests and deterministic code. If you can't be bothered to do that, you can leave it up to a LLM and hope its assumptions about edge cases match your assumptions, which you haven't even thought about yet

* Actual good use cases for LLMs (Do not allow human input)

* Perhaps conclude with this quote: https://dair-community.social/@davidbeers/111585474313351634
* Remember to focus on the ultimate goal: Get people to realise that LLMs will not solve their problems, shoving LLM into everything is not a feature

## Footnotes

[^1]: Francesca Hornak, Daily Mail, ["My life with an AI assistant: FRANCESCA HORNAK lived with ChatGPT for a week"](https://www.dailymail.co.uk/home/you/article-12369957/My-life-AI-assistant-FRANCESCA-HORNAK-lived-ChatGPT-week-happens.html)
[^2]: Joe Tidy, BBC, ["Young people turning to AI therapist bots"](https://www.bbc.co.uk/news/technology-67872693)
[^3]: Subbarao Kambhampati , Association for Computing Machinery, ["Can LLMs Really Reason and Plan?"](https://cacm.acm.org/blogs/blog-cacm/276268-can-llms-really-reason-and-plan/fulltext)
[^4]: jolly jim, Twitter, ["This it the superintelligence that I’m told will kill us all within the next 5 years"](https://twitter.com/importancatpete/status/1745181473135534341) (Accessed 2024-01-14)
[^5]: Matt G. Southern , Search Engine Journal, ["ChatGPT Update: Improved Math Capabilities"](https://www.searchenginejournal.com/chatgpt-update-improved-math-capabilities/478057/)
[^6]: @samhenrigold@hachyderm.io, Hachyderm/Mastodon, ["dumb computer"](https://hachyderm.io/@samhenrigold/111574749521701658)
[^7]: Chris Bakke, Twitter, ["I just bought a 2024 Chevy Tahoe for $1."](https://twitter.com/ChrisJBakke/status/1736533308849443121) (Accessed 2024-01-04)
[^8]: Gary Marcus, Spectrum, ["Generative AI Has a Visual Plagiarism Problem"](https://spectrum.ieee.org/midjourney-copyright)
[^9]: Milad Nasr, Nicholas Carlini, et al, Cornell University, ["Extracting Training Data from ChatGPT"](https://not-just-memorization.github.io/extracting-training-data-from-chatgpt.html)
[^10]: Emma Bowman, NPR, ["A new AI chatbot might do your homework for you. But it's still not an A+ student"](https://www.npr.org/2022/12/19/1143912956/chatgpt-ai-chatbot-homework-academia)
[^11]: Kif Leswing, CNBC, ["Microsoft’s Bing A.I. made several factual errors in last week’s launch demo"](https://www.cnbc.com/2023/02/14/microsoft-bing-ai-made-several-errors-in-launch-demo-last-week-.html)
[^12]: Frank Landymore, The Byte, ["Owner of Gaming Sites Fires Writers, Hires for "AI Editor" to Churn Out Hundreds of Articles Per Week"](https://futurism.com/the-byte/gaming-sites-writers-ai-editor)
[^13]: @casey@sharetron.com, Sharetron/Mastodon, ["I’m so glad CircleCI now has the power of AI to tell me how to fix my test failures"](https://sharetron.com/@casey/111417613984607584)
[^14]: Andrew J. Hawkins, The Verge, ["Volkswagen says it’s putting ChatGPT in its cars for ‘enriching conversations’"](https://www.theverge.com/2024/1/8/24027112/volkswagen-chatgpt-openai-voice-assistant-cars-ces)
[^15]: Emilia David, The Verge, ["Google just launched a new AI and has already admitted at least one demo wasn’t real"](https://www.theverge.com/2023/12/7/23992737/google-gemini-misrepresentation-ai-accusation)
[^16]: Beth Mole, Ars Technica, ["ChatGPT bombs test on diagnosing kids’ medical cases with 83% error rate"](https://arstechnica.com/science/2024/01/dont-use-chatgpt-to-diagnose-your-kids-illness-study-finds-83-error-rate/)
[^17]: "Robo", TopAI.Tools, ["9 Top AI Thank you note generator tools"](https://topai.tools/s/Thank-you-note-generator)
[^18]: Paige West, Startup Magazine, ["AI innovation in the UK triples post-ChatGPT"](https://startupsmagazine.co.uk/article-ai-innovation-uk-triples-post-chatgpt)
[^19]: Fernanda Alvarez Pineiro, Startups, ["Average funding for AI startups increased by 66%, Startups 100 Index data reveals "](https://startups.co.uk/news/average-funding-for-ai-startups-increased-by-66-startups-100-index-data-reveals/)
[^20]: Deepa Seetharaman  Wall Street Journal, ["ChatGPT Fever Has Investors Pouring Billions Into AI Startups, No Business Plan Required"](https://www.wsj.com/amp/articles/no-business-plan-no-problem-chatgpt-spawns-an-investor-gold-rush-in-ai-6bdbed3c)
[^21]: Maggie Harrison, The Byte, ["AI Company With Zero Revenue Raises $150 Million"](https://futurism.com/the-byte/ai-company-no-revenue-fundraising)
[^22]: James Temperton, Wired, ["Beer brewed with the help of AI? Yup, that's now a thing"](https://www.wired.co.uk/article/beer-brewed-by-ai-intelligentx)
[^23]: Jyoti Mann, Business Insider, ["The humanoid-robot CEO of a drinks company says it doesn't have weekends and is 'always on 24/7' "](https://www.businessinsider.com/humanoid-ai-robot-ceo-says-she-doesnt-have-weekends-2023-9?r=US&IR=T)
[^24]: Akhil Mahajan, Take One, ["This is the UK’s first ever AI fragrance machine "](https://www.takeonedigitalnetwork.com/this-is-the-uks-first-ever-ai-fragrance-machine/)
[^25]: PawCare \(writing about themselves\), ["Tech-Driven Grooming: How AI and Smart Tools Dominated Pet Salons in 2023"](https://blog.mypawcare.com/pawcare-for-pet-parents/tech-driven-grooming-how-ai-and-smart-tools-dominated-pet-salons-in-2023)
[^26]: Kiran Stacey , The Guardian, ["AI to decide on issues from benefits to marriage licences"](https://www.theguardian.com/technology/2023/oct/23/uk-officials-use-ai-to-decide-on-issues-from-benefits-to-marriage-licences)
[^27]: Tom Warren, The Verge, ["Microsoft’s new Copilot key is the first big change to Windows keyboards in 30 years"](https://www.theverge.com/2024/1/4/24023809/microsoft-copilot-key-keyboard-windows-laptops-pcs)
[^28]: Tom Warren, The Verge, ["Not even Notepad is safe from Microsoft’s big AI push in Windows"](https://www.theverge.com/2024/1/9/24032117/microsoft-windows-notepad-generative-ai-option)
[^29]: Anthony Cuthbertson, Independent, ["Tiny island of Anguilla set for $45m windfall from .ai domain"](https://www.independent.co.uk/tech/anguilla-ai-domain-xai-musk-b2460155.html)
[^30]: Tom Gerken, BBC, ["DPD error caused chatbot to swear at customer"](https://www.bbc.co.uk/news/technology-68025677)
[^31]: Apply Pro, Promotion Tech Limited, ["AI for Talent Acquisition"](https://www.applypro.co.uk/) (Accessed 2024-01-21)
[^32]: Apply Pro, Promotion Tech Limited, ["Talen Acquisition" (Archived 2023-01-12)](https://web.archive.org/web/20230120054702/https://www.applypro.co.uk/)
[^33]: RedCloud Technology, ["AI powered technology that..."](https://redcloudtechnology.com/) (Accessed 2024-01-21)
[^34]: RedCloud Technology, ["Open Commerce" (Archived 2022-09-01)](https://web.archive.org/web/20220901140041/https://redcloudtechnology.com/)
[^35]: Benjamin Hunting, Car And Driver, ["Formula E Team Fires Its AI-Generated Influencer after Fans Balk"](https://www.caranddriver.com/news/a46353319/formula-e-team-fires-ai-generated-influencer/)
[^37]: Cleo, ["AI Meets Money"](https://web.meetcleo.com/)
[^38]: Cleo, ["Stres less about money" (archived 2022-10-04)](https://web.archive.org/web/20221004161311/https://web.meetcleo.com/)
[^39]: Spencer Torene, Medium, ["Do LLMs Reason?"](https://medium.com/@spencertorene/do-llms-reason-d33fa885872f)