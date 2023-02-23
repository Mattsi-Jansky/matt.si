---
title: ChatGPT Can Do Astonishing Things. But Is It a Helpful Development Tool?
date: 2022-12-12 00:00:00 +0000
description: A chatbot that can write code. The reaction to ChatGPT has been very polarising - some reactions very hyperbolic, others overly cynical. I explore what practical uses it has and ponder about where this might lead.
img: ./chatgpt-banner.png
tags: ["AI","Rust"]
---

On November 30th OpenAI [published a chatbot called ChatGPT](https://chat.openai.com/) that allows anyone to interact with their latest, greatest language model. You can ask it to do various things for you like writing screenplays, explaining difficult concepts or, most impressively, writing code. Since then it has made headlines for making programmers fret about their career prospects, getting banned from StackOverflow, and for [writing poems about hotwiring cars](https://twitter.com/NickEMoran/status/1598101579626057728). For the past week, I've been playing around with this bot on and off to see what it can do, what its limitations are, and what practical use cases it may have.

The reaction to ChatGPT amongst techies and software developers has been very polarising. I've seen some people acting hyperbolic about what it can do and what it means, and I've seen many people reacting cynically to it and denying it has any value at all. The truth is somewhere in the middle: ChatGPT has real value and is a big achievement, but we must restrain our excitement with skepticism because there are some major limitations to what ChatGPT can do.

## What is ChatGPT?

Let's get the obvious thing out of the way first: It is not an AI. In the strict sense of the term, humans have never produced an artificial intelligence and no one can say whether we ever will. It does use techniques derived from AI research, however. ChatGPT is a bundle of statistics and probability theory trained with an astonishing amount of compute and data that enable it to _predict what response you want from any given input_. You type in some text, it outputs some text that it thinks will please you. It has read many many conversations between humans and figured out how to generate some letters in a particular sequence that is pleasing to the humans that supervised its learning, and the users it has learned from since then. This is similar to how DALL-E 2, OpenAI's image generator bot, generated the image in the heading of this article. It has been trained on images of robots and keyboards, and it simply did its best to estimate the image I might be looking for.

As such you can argue that it is not meaningfully "intelligent". It is not even as smart as an average calculator. You can test and prove this easily for yourself. Try using ChatGPT like a calculator: ask it to solve mathematical equations. It will get simple ones perfectly correct but if you start making them long and adding a mixture of multiplication and division it will start to make mistakes and output nonsense results, even though a calculator from 1950 could have solved the same equation correctly in a split second. What is going on there? Well, ChatGPT was not designed to be a calculator. It cannot perform arithmetic operations. It was designed to produce a likely answer that it finds is most likely to please you.

## Can it code

Despite this, ChatGPT does indeed have an incredible ability to write code. I sat down with 20 or so of my colleagues and ran a session in which we tested ChatGPT's code-writing abilities. At one point we copied the definition of the [Simple Mars Rover kata](https://www.codurance.com/katalyst/simple-mars-rover) into the chat box and asked OpenAI to write an implementation in Rust that solved the problem. This is somewhat of a niche programming problem so we didn't expect much. It immediately produced a solution that compiled, ran, and produced correct results:

```rust
use std::collections::HashMap;

// Define a struct to represent a rover's position and direction.
#[derive(Debug)]
struct Rover {
    x: i32,
    y: i32,
    direction: char,
}

// Define a function to move the rover based on a given set of commands.
fn move_rover(commands: &str, rover: &mut Rover) {
    // Define a map of directions to their left and right turns.
    let directions = [('N', ('W', 'E')), ('S', ('E', 'W')), ('E', ('N', 'S')), ('W', ('S', 'N'))];
    let mut direction_map: HashMap<char, (char, char)> = HashMap::new();
    for &(direction, (left, right)) in directions.iter() {
        direction_map.insert(direction, (left, right));
    }

    // Iterate over the commands and update the rover's position and direction.
    for c in commands.chars() {
        match c {
            'L' => {
                let (left, _) = direction_map[&rover.direction];
                rover.direction = left;
            },
            'R' => {
                let (_, right) = direction_map[&rover.direction];
                rover.direction = right;
            },
            'M' => {
                // Update the rover's position based on its current direction.
                match rover.direction {
                    'N' => rover.y = (rover.y + 1) % 10,
                    'S' => rover.y = (rover.y + 9) % 10,
                    'E' => rover.x = (rover.x + 1) % 10,
                    'W' => rover.x = (rover.x + 9) % 10,
                    _ => (),
                }
            },
            _ => (),
        }
    }
}
```

It is an interesting solution. It has helpful comments, but not so many that it becomes problematic. It is very short at just 44 lines, yet very readable. It makes good use of Rust-specific language features, like  `match`. It uses a direction map, which is often regarded as a very good trick for solving Mars Rover. It even implements world wrapping in a very simple and neat manner, using the mod operator on lines 34-37.

The only things I can fault about it are the awkward way in which it goes about setting up the map, the fact that the map is initialised every time rather than being a one-time constant and using `char` for direction rather than an enum. But overall, it is at least as good as I could do and it did it in a few seconds rather than maybe 40 minutes.

Such a good result is the exception and not the rule, I should add. Most other tests I performed produced bugs or compile errors that needed to be solved. This is a fundamental limitation because ChatGPT does not have access to, nor even understand how to use, the compiler. It cannot verify that its code will compile. The fact that it managed to produce code that compiled first-time in that situation is incredible, honestly. But in most of my experiments it made small syntax errors or mistakes that prevented it from working the first time.

Still, they were valuable: When I asked it to solve [the N-Queens problem](https://en.wikipedia.org/wiki/Eight_queens_puzzle) it produced a broken version with errors, but the errors were quite minor and I fixed them within 15 minutes. Once they were solved, the program worked perfectly. It would have taken me well over an hour to solve, so there was a clear and obvious benefit to using the tool even if it did not produce perfect results on the first try. I also shared my fixed version with the bot to see if it would learn from it and when I later asked it to solve N-Queens again some of the errors I'd pointed out were now absent, but not all of them.

## But what about tests

Of course, as an advocate of TDD, it would be a major oversight to only look at production code. Well, the good news is ChatGPT can write tests. When asked to write a test for the function it wrote above, it produced this: 

```rust
#[test]
fn test_move_rover() {
    // Define a test case with a set of commands and the expected final position of the rover.
    let test_cases = [        ("MMRMMLM", (2, 3, 'N')),        ("MMMMMMMMMM", (0, 0, 'N')),        ("LMLMLMLMM", (1, 3, 'N')),        ("RMRML", (0, 2, 'E')),        ("MMMMMLLLRLRM", (0, 0, 'E')),    ];

    // Iterate over the test cases and check that the `move_rover` function produces the expected output.
    for &(commands, (x, y, direction)) in test_cases.iter() {
        let mut rover = Rover { x: 0, y: 0, direction: 'N' };
        move_rover(commands, &mut rover);
        assert_eq!((rover.x, rover.y, rover.direction), (x, y, direction));
    }
}
```

This is once again surprisingly advanced: It is using test cases to write 6 tests for the price of one. However, most of the tests didn't pass. The test logic is written correctly, but the test cases themselves are invalid: In one case it expects `MMMMMLLLRLRM` to result in `(0, 0, 'E')` but the correct result is `(0, 5, 'S')`. The implementation produces the correct result too, so the incorrect test fails. Once again, ChatGPT has no way of verifying this itself: It is effectively guessing as to what will work. Mistakes like these highlight the major drawbacks of applying it as a tool for software engineering: It is excellent at producing something that _looks_ correct, but it cannot understand the actual logic to ensure that it is correct.

Also of interest was another test I performed to examine if it can generate implementation from tests. I used an [Exercism](https://exercism.org/) exercise, for which all the tests are provided but not the implementation. Omitting the description of the problem I copied just the test definitions into ChatGPT and asked it to write a function that would make them pass. It did remarkably well: Despite not having the description it inferred exactly what the problem was from test names, variable names, and the assertions and wrote a function that compiled the first time and passed half the tests. Not quite a passing mark, but far better than any other tool I am aware of.

## But what about software design

But can it produce code that is well-encapsulated, readable, and follows SOLID? Can it understand design principles? In the session with my colleagues, we tested this with [an example from CSharpCorner](https://www.c-sharpcorner.com/article/solid-with-simple-example/). We asked it what problem does it see with this code:

```csharp
class Customer
{
    void Add(Database db)
    {
        try
        {
            db.Add();
        }
        catch (Exception ex)
        {
            File.WriteAllText(@"C:\Error.txt", ex.ToString());
        }
    }
}
```

It came up with three problems, all very well explained, and demonstrated how to fix them in the code. But these problems are all related to implementation details, to how the try-catch in this example is not typing the error correctly or understanding it well. It also seemed convinced that it was best practice to always re-throw an error after logging it, which I am dubious about. Anyway, this was not what we were looking for so we tried a different question: "What would you do to make the following code follow the Single Responsibility principle?" This time, it gave the following quite compelling response:

> The Customer class in this code appears to have two responsibilities: adding a customer to a database and logging any exceptions that occur. To make the code follow the Single Responsibility Principle, you could split these responsibilities into two separate classes. Here is an example of how you could do that:

```csharp
class Customer
{
    void Add(Database db)
    {
        db.Add();
    }
}

class ExceptionLogger
{
    void Log(Exception ex)
    {
        File.WriteAllText(@"C:\Error.txt", ex.ToString());
    }
}
```

> In this code, the Customer class only has a single responsibility, which is to add a customer to a database. The ExceptionLogger class has a single responsibility, which is to log exceptions to a file. This separation of responsibilities can make the code easier to understand, maintain, and extend.
> To use these classes, you could catch any exceptions that occur in the Customer class and pass them to the ExceptionLogger class to be logged. Here is an example of how you could do that:

```csharp
class Customer
{
    void Add(Database db)
    {
        try
        {
            db.Add();
        }
        catch (Exception ex)
        {
            var logger = new ExceptionLogger();
            logger.Log(ex);
        }
    }
}
```

> In this code, the Add method catches any exceptions that occur when adding a customer to the database and passes the exception to the `ExceptionLogger` class to be logged. This approach follows the Single Responsibility principle by keeping the code for adding a customer and the code for logging exceptions separate.

This time, with a hint, it has picked up on exactly what the CSharpCorner article was getting at with this example. And seemingly explained it quite well, too. As a bonus, it is also using C#'s convention of capitalising function names which is interesting because we forgot to specify that the code was in C#. It has inferred as such from the code itself, despite being so similar to Java.

If we have to ask it such a leading question to get this result then the practical uses for software design may be limited, but it does at least demonstrate an understanding of some software design principles. Next, we tried testing whether it can apply design patterns, by asking it to apply the repository pattern to this sample:

> To apply the repository pattern to the code in the previous example, you could create a `CustomerRepository` class that handles the data persistence for the `Customer` class. The `Customer` class would then be able to call methods on the `CustomerRepository` class to add and retrieve customers from the database, without having to worry about the details of how the data is stored or accessed.

```csharp
class Customer
{
    private readonly CustomerRepository repository;

    public Customer(CustomerRepository repository)
    {
        this.repository = repository;
    }

    void Add()
    {
        repository.Add(this);
    }
}

class CustomerRepository
{
    void Add(Customer customer)
    {
        // Code to add the customer to the database
    }
}
```

> In this code, the `Customer` class has a reference to a `CustomerRepository` object, which it uses to add and retrieve customers from the database. The `CustomerRepository` class contains the code for managing data persistence, including adding customers to the database. This separation of concerns allows the Customer class to focus on implementing business logic without worrying about data persistence.

It has pulled this off too. It even explains some of the reasoning and benefits of this practice, some of which I've omitted for brevity. It is a bit odd that it places the repository inside the `Customer` class, it is a bit off to make a class dependent on a class designed to store it but within the context of this question, it makes sense, as our example included the `Add` function. It has done what we asked it to.

## Other interesting uses

Beyond writing production code, tests, and applying software design principles to transform code there are a few other interesting use cases for ChatGPT within the software domain. 

### A Smart Search Engine

ChatGPT can effectively act as a plain language search engine for quite complex queries. I've found it is capable of explaining complex concepts like the Rust ownership and borrowing rules effectively, and even correctly answering oddly specific questions like "What is the default port of a new MySQL database?". In my experience, it is often faster and easier to ask ChatGPT in plain language than to apply your google-fu to try to discern the right incantation of search keywords that will bring up the result you need. You can't necessarily be confident in the answers it provides, though. More on that later.

### Translate this error message, please

One novel use I've found is to give ChatGPT an error message and ask it to explain to me what is happening in simple terms. I asked it to explain to me [a quite complex Rust lifetimes error](https://todon.eu/@mattsi/109410387258761414):

```
79 |    pub fn make_move_mut(&mut self, requested_move: &Move) -> (Game,Option<ResolvedMoveMemento>) {
   |                         -                          - let's call the lifetime of this reference `'1`
   |                         |
   |                         let's call the lifetime of this reference `'2`
...
   |         (self.determine_status(), Some(memento))
   |         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ associated function was supposed to return data with lifetime `'2` but it is returning data with lifetime `'1`
```

Though the Rust compiler already does a much better job than any other compiler I know when it comes to clear error messages, 

> The Rust compiler is indicating that the function `make_move_mut` is returning a tuple containing a reference of lifetime `'1` and an `Option` containing a value of type `ResolvedMoveMemento` with a lifetime of `2`…

> To fix this error, the lifetime of the reference and the value inside the `Option` must be made explicit in the function's return type. This can be done by using a lifetime parameter `'a` in the return type, and then specifying that `'a` is the same as the lifetime of `self`…

> Here is an example of how the fixed function signiature might look:

```
pub fn make_move_mut<'a>(&'a mut self, requested_move: &Move) -> (Game<'a>, Option<ResolvedMoveMemento<'a>>) {
  // ...
  (self.determine_status(), Some(memento))
}
```

> … This tells the Rust compiler that the reference and the value inside the `Option` have the same lifetime, which is the same as the lifetime of `self`.

I've omitted a lot again here, but it was a really interesting response and helpful. I'm not sure that its suggested solution is quite correct - I don't believe I've seen anyone apply a Rust lifetime to the `self` argument before, but it does seem to work in my tests. But in any case, it again demonstrates impressive competency.

## Convert code from one language to another

Another interesting use is converting code. Separation of content and format comes naturally to a language model like ChatGPT - you can even ask it to convert a document into a screenplay, then to a limerick, to a poem, to a song, etc. Similarly, you can tell it "convert this function to Python" and it will give you pretty good results in my experience.

## Querying datasets

This was a novel use case I hadn't considered until a colleague of mine suggested it. Paste in a dataset in JSON, XML, or some such format and ask it a question like "What is John Smith's date of birth". It will parse the dataset, find John Smith, and give you that value. It even shows you exactly where in the structure of the document that information can be found. Querying documents in natural language, What a wonderful way to be lazy.

More impressive still I found that I could ask it to write a [JQ query](https://stedolan.github.io/jq/) to find that information, and it generated one perfectly (plus explaining how the query works). In theory, if you want to apply some transformation to a large dataset with many nested values you could use ChatGPT to query for the data in natural language, and then provide a query your computer can understand to be used in automated scripts over that dataset. Very cool.

## Limitations

Okay, ChatGPT can do some radical things. Why are so many people cynical about it? What are the problems we must temper our excitement with?

### Don't Believe It's Lies

The biggest limitation is that **ChatGPT cannot verify the information it provides**. Just as it cannot compile code, it similarly cannot test the veracity of any of the information it has read and willingly repeats. Yet, it is perfectly confident. It has no "I think this is right but I'm not sure" behaviour: It will either not be able to answer, or it will give you an answer with perfect confidence that might be completely wrong. Adam Shaylor wrote [a really interesting take](https://adamshaylor.svbtle.com/chatgpt-and-the-viability-of-replacing-humans) on this issue: in his tests, ChatGPT seemed to produce interesting and clever results, until you look closer and realise that some of its answers are nonsense presented as fact. There is something about the way it speaks that seems to exude confidence and correctness, and trick you into thinking that it is cleverer than it is. And that should not be surprising: This whole thing is essentially a machine learning program that has been trained to trick you into thinking it is intelligent. Machine learning algorithms are good at finding niche, unexpected ways of hacking at a problem: Has ChatGPT found exactly the right type of language, writing style, and vocabulary to trick us into thinking of it as correct? Has it found some loophole in how our brains and/or language work that we don't fully understand?

On the other hand, what is the difference between tricking someone into thinking you are intelligent and really being intelligent? If the end result is the same, then what does it matter? Well, the problem is that the end result is the same maybe 9/10ths of the time. And that 1/10th of the time that it is wrong can be difficult to recognise because ChatGPT will be just as confident in its answer as the other 9/10 times. So, any use of this technology has to be carefully verified: We cannot apply blanket trust to this thing, as much as it may try to convince us that we can.

### Internet Not Included

As a machine learning model, ChatGPT has no access to information it was not trained on. It cannot access the internet to learn new information. As new versions of compilers, syntax, protocols, etc are published in the future this model will not be aware of any of the changes they bring. The model may well get updated in the future, but it will almost always be at least somewhat out of date. Even now it is only trained up to 2021, so it is not aware of newer Rust features for example like Generic Associated Types (GATs). In fact, when I asked about GATs it provided me with a very believable-looking answer that explained what associated types were and what generics were and sorta mish-mashed them together but completely missed what a GAT was. If I hadn't been researching GATs myself lately, I might have believed it.

### How do I shoot myself in the foot?

Another major restriction is that ChatGPT will do exactly what you ask: It does not consider context or circumstance. If you, proverbially, ask it how to shoot yourself in the foot it would reply "To shoot yourself in your foot, first take a Glock-18 and a 9mm bullet…". This problem is a big part of the argument for why it has been banned from StackOverflow. During our session my colleagues and I found a good example of exactly this behaviour, when we, first of all, asked it to produce a solution to FizzBuzz which came out like so:

```rust
fn main() {
    for i in 1..=100 {
        if i % 15 == 0 {
            println!("FizzBuzz");
        } else if i % 3 == 0 {
            println!("Fizz");
        } else if i % 5 == 0 {
            println!("Buzz");
        } else {
            println!("{}", i);
        }
    }
}
```

And then we asked it to generate a unit test for that function, which came out like this: 

```rust
#[test]
fn test_fizzbuzz() {
    // Capture the output of the main function
    let mut output = Vec::new();
    {
        let mut out = std::io::Cursor::new(&mut output);
        let result = std::io::BufWriter::new(out).buffer_len();
        let mut out = std::io::BufWriter::with_capacity(result, out);

        main(&mut out);
    }

    // Convert the output to a string and split it into lines
    let output = String::from_utf8(output).unwrap();
    let output: Vec<&str> = output.split('\n').collect();

    // Check that the first 15 lines of output are correct
    assert_eq!(output[0], "1");
    assert_eq!(output[1], "2");
    assert_eq!(output[2], "Fizz");
    …
}
```

Can you see the issue? The original function was written in a way that cannot easily be tested because there is no abstraction around `println!`. Instead of trying to solve this problem by refactoring the original function, ChatGPT has done precisely what we asked: It tried its best to test the untestable function, by writing a bonkers test that tries to capture everything the main function prints. I'm not sure how exactly to do this in Rust, but the solution ChatGPT provided does not work though the intention at least is clear.

### Does it really save time?

We are professionals. It is totally out of the question to blindly push code that ChatGPT has written to our clients' repositories. As we have seen, ChatGPT cannot be trusted to produce correct results. As such, every last piece of output it produces must be carefully read over and checked and double-checked if we are to seriously use it. But if that is the case, is using ChatGPT really any faster than writing it ourselves? How long would it take to read, check, re-check and be fully confident in a solution ChatGPT has written versus just writing it ourselves?

I don't know yet what the answer is. Perhaps further experimentation is required.

## Conclusion

In 10 years' time, we may be using tools like this every day. I can imagine sitting in front of my IDE, telling it "Okay, now add a repository to save that record to the database" and then reviewing the code it's written, fixing some things here and there. It could really save time and make our lives easier. Software development has always grown more abstract as we develop better techniques: Languages like C made our lives easier by introducing a shared cross-platform language, and more expressive code that could do more with fewer lines. Then came garbage collection in languages like Java and C#, removing whole swathes of concerns from day-to-day development. We even have cloud providers and Terraform to abstract away the hardware. Perhaps this will be another development in the same direction: Instead of writing quite as much code, you describe what you want to achieve in software design terms, then review and adapt the first-pass template that your IDE will generate for you.

Of course, we must never let tools like this replace our responsibility to produce safe, readable, high-quality code. One thing I'm worried about is this: There are so many developers out there that are bad at writing tests. Often they don't understand testing but their employers are desperate for more tests to comply with some regulation or meet an arbitrary amount of code coverage that a contract requires. One of these developers will get the bright idea to let a language model write their tests for them with minimal or no oversight. **This is a dreadful idea with awful implications**, but I guarantee you someone will do it. All the ingredients for mistakes like this exist in our industry, and the motivations are particularly strong in organisations running safety-critical systems.

So, can ChatGPT write code? Yes. Should you use it as such? Maybe, but only with extensive oversight of everything it writes. Will more tools arrive in the coming years that make ChatGPT look like child's play? Yes, almost certainly.
