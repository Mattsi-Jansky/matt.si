---
title: TDDing a Chess Engine (in Rust!), Part 1
date: 2023-05-25 00:00:00 +0000
description: chess chess chess chess chess!
img: ./iroh-banner-1.png
tags: ["Rust", "Chess", "TDD"]
---

About a year and a half back I was feeling like I'd got the hang of Rust but needed to solidify that learning with a big project I could really get into. What could that be? Well I'm a terrible chess player but I do find it really interesting, so I figured a good project would be writing a chess engine. What is a chess engine? By Wikipedia's definition it is "a computer program that analyzes chess or chess variant positions, and generates a move or list of moves that it regards as strongest". In short, it involves implementing the rules of chess and writing heuristics and search algorithms to choose the best possible moves in any given state of the board. There are numerous chess engines already out there of which the top gun is Stockfish, the 13-time winner of the Top Chess Engine Championship. It has an estimated ELO rating of 3,500 which makes it miles better than any human player that has ever lived.

But such a project could be endless! Stockfish has been in development for 15 years and shows no sign of stopping. When do you call it done? I set myself a goal where I can draw that line: When my chess engine can beat me, it is complete. That is not a high bar, because I am an exceptionally poor chess player. But it is still a big project for one person to do in their free time, with plenty of interesting problems to solve.

I plan to write a separate post going into the search algorithm, board representation, search, and optimisation. So here we'll cover the architecture, practicing TDD, and Rust-related learnings.

## The first tests

Alright, blank new project. Where do you start? Well as an advocate of TDD I start with a test of course. But what does that look like? I tend to default to using "outside-in TDD", in which you drive the implementation from high-level acceptance tests that disregard the low-level implementation details. This works well with chess because it can easily be represented as a black box. Chess is wholly deterministic with no random elements or external dependencies, so you can quite easily see a chess engine as a problem in which you input a board state and a move, and get a new board state back. Data goes in, data goes out.

But how do we represent that? Before my current project I had experimented with chess programming in C# in the past. I'd learned a little of what not to do from that project. In that project I tried something very similar to what I would do for the Mars Rover kata, which is to print the state of the system in a string and test against that it looks as we'd expect. In the case of chess you can represent the board with something like this:

```
♖♘♗♕♔♗♘♖
♙♙♙♙♙♙♙♙
◻◼◻◼◻◼◻◼
◼◻◼◻◼◻◼◻
◻◼◻◼◻◼◻◼
◼◻◼◻◼◻◼◻
♟︎♟︎♟︎♟︎♟︎♟︎♟︎♟︎
♜♞♝♛♚♝♞♜
```

And you could write a test using this, like this pseudocode:

```java
let game = NewChessGame();

game.make_move(Point(5,2), Point(5,4));

assertEqual(game.render(),
"""
♖♘♗♕♔♗♘♖
♙♙♙♙♙♙♙♙
◻◼◻◼◻◼◻◼
◼◻◼◻◼◻◼◻
◻◼◻◼♟︎◼◻◼
◼◻◼◻◼◻◼◻
♟︎♟︎♟︎♟︎◻♟︎♟︎♟︎
♜♞♝♛♚♝♞♜
""")
```

In my earlier C# attempt this seemed like a reasonable place to start, but once you have more than a few tests it becomes difficult and cumbersome. Your tests become very long, most of the information taking up that space is not actually useful and it isn't trivial to translate those point coordinates to coordinates on the visual display itself. Plus, there is a lot of information we aren't seeing in this representation of the board: What is the turn number? Who's move is next? Is the second player able to castle?

In search of a better testing foundation I felt that I had to understand the problem space better, so I began studying chess notation. What I found was that humans have been working really hard on the problem of how to most efficiently represent chess for hundreds of years. In fact, Samuel Morse was a chess player. That's Morse as in Morse Code. So one of the very first things the telegraph was used for upon its invention in the early 1830s was for playing chess over long distances[^1]. Later chess was also used to test the first under-sea cables[^2]. But if you're manually tapping every last move over a telegraph and any small mistake could lead to a lot of confusion and accusations of cheating then it pays to use a representation that is as concise and accurate as possible. In fact, even hundreds of years before the telegraph people played much slower "correspondence games" by mail. So, this is a problem that many much smarter people than I have put their minds to.

Today, the result of all that effort from those smart minds is three notations:

* SAN (Short Algebraic Notation). This simple notation enables us to describe individual coordinates (`a1` in the bottom-left, `h8` in the top-right) and moves.
  * Each piece has a letter associated with it like `R` for Rook, `K` for king, `N` for knight. 
  * To move a piece you just state the piece and the coordinate it is moving to, like `Ra4` to move your Rook to A4. 
  * To denote captures you add an `x`, like `Rxa8` to capture the piece on A8 with your Rook. To avoid mix-ups between `b` the file (column) and `b` for "bishop", pieces are in upper-case.
  * Pawn moves don't specify the piece type.
* FEN (Forsyth-Edwards Notation). This describes the state of a given board including where each piece is, who's move it is, whether the players can castle, etc.
  * FENs look like this: `4k2r/6r1/8/8/8/8/3R4/R3K3 w Qk - 0 1`
    * The first part describes the positions of each piece
    * The later characters describe other metadata about the game such as the turn number, whose move it is, etc.
* PGN (Portable Game Notation). This format describes a game. It tells you what moves have been played (from which, if you know the beginning state of the board, you can extrapolate the final position), what the current state of the game is, and other optional metadata such as who is playing and when.
  * PGNs (very simple ones) look like this: `1. e4 e5 2. d4 d5 *`
  * The `*` in that example notes that the game is still ongoing. A game that has ended will end with `1-0`, `0-1`, or `1/2-1/2` indicating win for first or second player or a draw.

In TDD we want to start with the simplest possible test case and gradually increase the solution's complexity by making the smallest possible changes, known as "baby steps". So given these representations, what could the _most simple_ test we could possibly start with be? I went with this:

```rust
#[test]
fn new_game_pgn_has_asterisk_only() {
    let game = Game::new();

    let result = game.generate_pgn();

    assert_eq!(result, "*");
}
```

Dead simple. Create a new game, generate a PGN, and check that it shows what we expect: `*`, which is a valid PGN for a game in which no-one has made any moves[^3]. Easy, we can implement that by just returning a placeholder value. From there the next most simple thing I could think of was to make a move, the simplest type of move you can make: pawn moves

```rust
#[test_case("a4")]
#[test_case("b4")]
#[test_case("c4")]
#[test_case("d4")]
#[test_case("e4")]
#[test_case("f4")]
#[test_case("g4")]
#[test_case("h4")]
fn first_pawn_move_recorded_in_pgn(san: &str) {
    let mut game = Game::new();

    game = game.make_move(san).unwrap();
    let result = game.generate_pgn();

    assert_eq!(format!("1. {} *", san), result);
}
```

Now we've got the general architecture of the program coming together. We use a SAN to specify a move to make, and that uses a `Result<Game,GameError>` type to either return an error if the move is illegal, or otherwise return a `Game` representing the new state of the board. To inspect the state of that `Game` we can use `generate_pgn` to verify that it is in the state we expect.

## Move Generation

So far the PGN is the only thing we're testing. As such, at this point I hadn't actually implemented any way of representing the board at all - it was just collecting the moves and listing the moves that had been given to it in the PGN. That isn't a bad thing at all, that is a benefit that TDD is giving me here: Rather than having to worry about implementing the board representation along with the rest of the architecture all in the same step, I'm able to isolate that problem for later. But I was reaching the limit of what I could do with only PGNs.

I could continue to implement more and more features of the PGNs but that wouldn't really get us any closer to a useful chess engine. When you reach this stage following TDD you need to choose your next test carefully. You want to pick a test case that will force your implementation toward your goal. But you want to do that smoothly in small steps, so you need to pick a test case that covers just one new aspect of the problem not several at one time. The next major step in this case is to make actual moves.
What does it mean to make an actual move? You need to be able to verify whether a given SAN is a legal move, and if it is update the state of the board. The second part there is more complex than the first, so I started by tackling the first. But rather than extending my existing PGN tests I thought: How do you know if a move is legal? You'd need to know every legal move to compare it to. In Chess Programming literature[^4] this is known as Move Generation. Move generation is an important aspect of the engine itself - you need to be able to ask what the available moves are in a given position in order to analyse them.

On that basis I decided to test move generation next, and make it a different part of the library's API:
-- do I mention that it's a library elsewhere?

```rust
#[test]
fn generate_e2_pawn_moves() {
    let game = ChessGame::new();

    let available_moves = game.get_available_moves();

    assert!(available_moves.contains(&Move::RegularMove { 0: (3,2), 1: (3,3) }));
    assert!(available_moves.contains(&Move::RegularMove { 0: (3,2), 1: (3,4) }));
}
```

Now we're getting closer to the meat of the problem, all while maintaining a simple clean API. Here we've added an enum to represent a move that can be made, and we're using `contains` for the assert because the full size of the list will grow over time as we implement more of move generation.

[^1]: Bill Wall, Bill Wall's Chess Page, [The Telegraph and Chess](http://billwall.phpwebhosting.com/articles/telegraph.htm)
[^2]: FTL Design, History of Atlantic Cable & Undersea Communications, [Cable Chess Matches](https://atlantic-cable.com/Article/1926CableChess/index.htm)
[^3]: I actually got this wrong first time and had a blank string for the test case. There are several other small details I've changed about those early test cases for simplicity/conciseness.
[^4]: See the [Chess Programming Wiki](https://www.chessprogramming.org/Main_Page)
