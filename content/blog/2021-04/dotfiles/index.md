---
title: Reproducible Machine Configuration with Dotfiles
date: 2021-04-14 00:00:00 +0000
description: wat
img: ./dotfiles-banner.png
imgCaption: A screenshot of my dotfiles
tags: ["Code", "Unix"]
---

## What

In Unix systems it is idiomatic to store user configuration in hidden files starting with a dot. These are known as your dotfiles and it is common practice to store these in a remote version control repository, such that you can access that configuration anywhere and changes are tracked. The configuration might relate to your operating system, development environment, or whatever else you use your computer for.

Many dotfiles are simple collections of configuration files. But some people include other things in their dotfiles - such as scripts that install or update your common dependencies automatically, copy or link your dotfiles, and install plug-ins or extensions for particular applications.

## Why

Because of their nature as big collections of separate open-source projects interacting with one another, it isn't trivial to configure most Unix operating systems. Often you'll find every different little tool has to be configured independently, and that configuration may have to match every tool that tool interacts with. You can see why people started copying these configuration files between environments- if you need to re-install your OS, you don't want to have to re-write all your configuration.

When I started learning about dotfiles I became quite excited about what they represented: Reproducible machine configuration. I wanted to setup every last install and configuration automatically. Gone would be the days of getting a new machine and then having to spend days configuring it, and making further small changes over weeks before it is set up in precisely the way that feels most intuitive to you.

I imagined being able to reformat my machine, run one script and have it up-and-running exactly as I need within 30 minutes. And isn't that empowering? If you think your machine may have a virus, or if you've installed some software that's awkward to uninstall, or if your machine is just feeling a bit sluggish, you can reformat it. The cost of starting from scratch is so low that you can do that. Or, what if your laptop dies while you're out visiting a client on-site? Just requsition a new one, run your dotfiles and you're up and running again in no time.

Of course, for that to work well you need to be strict in how you use your dotfiles: Any changes to your local configuration need to be done via your dotfiles, then pushed to your repository. Otherwise they're only local changes and will get lost. Some tools can help with this, like Brew's `brew bundle --force cleanup` which removes any dependencies that aren't being tracked by your dotfiles. If you missed anything, you'd soon notice.

30 minutes turned out to be too ambitious, but I can do all that within a few hours. Running them is fast and simple- checkout [my dotfiles](https://github.com/mattsi-jansky/dotfiles), run `./apply.sh`, wait a bit, hey presto. Because I love to [paint bike-sheds](https://en.wikipedia.org/wiki/Law_of_triviality) it even has a pretty output, which you can see in the banner image above. But there are some bits that I haven't automated yet - key bindings in IntelliJ being a big one - and there are typically one or two things that need fixing if I haven't applied it from-scratch in a few months, dependencies that have changed. So there are still a few manual steps.

Another advantage is that it acts as documentation. I frequently look back at my dotfiles scripts just to remember how to do something-or-other.

## How

Some acknowledgements first: Much of this is founded on the structure and functionality of [Adam Eivy's dotfiles](https://github.com/atomantic/dotfiles), which take a similar script-everything-to-the-nth-degree approach that I appreciate. I've also taken inspiration and advice from [Nick Charlton](https://nickcharlton.net/) (Whose dotfiles in turn are based on [Thoughtbot's](https://github.com/thoughtbot/dotfiles)) and [Ben Eskola](https://eskola.uk/).

### Structure

For ease of use it's best to have just one entrypoint: Run a script, it applies all the changes, done. I call this `apply.sh` and it lives in root. But as much as possible I'd give everything else a sub-directory to live in and keep it simple, because it's easy for dotfiles to get messy quickly. I came up with the following structure:

```tree
config/
  SdkMan/
    ...
  VsCode/
    ...
  ...
homedir/
  Darwin/
    ...
  Linux/
    ...
  shared/
    ...
src/
  Darwin/
    apply.sh
    ...
  Linux/
    apply.sh
    ...
  shared/
    ...
apply.sh
```

* `config` contains files pertaining to config. Some single-use files like `ssh-config` go loose in the folder, but anything more involved gets it's own folder.
* `homedir` stores actual dotfiles, hidden configuration files to be copied into the home directory.
  * It is split into `Darwin` (aka macOS) and `Linux`, for configuration that only works on one platform or another. `shared` contains configuration common across platforms.
  * Note that `Darwin` and `Linux` are upper-cased because they need to match the output of `uname`, which prints the name of your kernel.
* `src` contains the scripts to apply the configuration automatically, manage errors and print helpful output.

### Scripting

I wrote all my scripts in Bash, but if I were starting again I'd consider using something else- perhaps Fish, or even a full scripting language like NodeJS or Python. Bash makes it very easy to call other programs and has the big advantage that it's already installed on almost any Unix system, but is very limited as a scripting language and difficult to read.

`apply.sh` does very simple, high-level orchestration. It establishes a few common variables - `dotfilesPath` (root), `libpath` (`src/`), `environment` (`Darwin` or `Linux`) - that later scripts will use. Then it sources the other script files, which adds a number of essential functions they all share. Next it will use the `environment` variable to call the script for that specific environment (eg `src/Linux/apply.sh`) and finally, apply the shared configuration. Actually applying the configuration consists only of calling a function that belongs to another file. It only orchestrates. That way you can easily see from a top level step-by-step what your dotfiles do and disable/enable different steps.

Of that collection of shared functions, these are particularly useful:

```bash
function ok() {
    echo -e "$COL_GREEN [ok] $COL_RESET "$1
}

function running() {
    echo -en "$COL_YELLOW ⇒ $COL_RESET"$1": "
}

function action() {
    echo -e "\n$COL_YELLOW [action]: $COL_RESET\n ⇒ $1..."
}

function try() {
    eval $* > /tmp/try.out 2>/tmp/try.error #Evaluate arguments, store result
    if [ "$?" = 0 ] ; then # If command succeeded
        ok
    else
        error "$(cat /tmp/try.out) $(cat /tmp/try.error)"
    fi
}
```

The first three functions are Adam Eivy's colourised echo helpers. `try` takes an expression, evaluates it silently, and prints `[OK]` if it passes. This is very useful because if you don't hide the output running your dotfiles will create a huge mess of verbose output, making it difficult to find the problem when something does go wrong. If the expression fails, it prints `[ERROR]` and all output from that command. For example:

<figure src="dotfiles-error.png"></figure>

You can see how easy it is to pick out which step has gone wrong. This is achieved by running `action` first to denote the start of a new action, then for each step within that action using `running` followed by `try`- the first identifies exactly what you're doing (also aids readability of the script), and the latter shows the result. For example, the code that failed there was installing VSCode extensions:

```bash
function installVisualStudioCodeExtensions() {
    action "Installing VSCode extensions"

    installVsCodeExtension ionide.ionide-fsharp
    ...

    ok "VSCode extensions installed"
}

function installVsCodeExtension() {
    running "$1"
    try code --install-extension $1
}
```

### Homedir

Another important script is actually applying your home directory dotfiles. For that we loop through each file in the shared folder and platform-specific folder and create a symbolic link to that file in the home directory: 

```bash
function createSymlinks() {
    action "Linking dotfiles"

    createSymlinksFor shared
    createSymlinksFor $environment

    ok "dotfiles linked"
}

function createSymlinksFor() {
    source="$1"
    silently pushd $dotfilesPath/homedir/$1
        for file in .*; do
            if [[ $file == "." || $file == ".." || $file == ".git" ]]; then continue; fi
            running "~/$file"
            try createSymLink $file $source
        done
    silently popd
}

function createSymLink() {
    file="$1"
    source="$2"
    silently unlink ~/$file
    ln -s $dotfilesPath/homedir/$source/$file ~/$file
}
```

`unlink` and `ln` here relate to symbolic links, or symlinks. They link two files such that one of them really just links through to the other file. Almost any application using your filesystem won't be able to tell the difference. Symlinks are the magic that make dotfiles much more effective- because the changes aren't one-way. If you only copied the files then you'd have two sources of truth that can diverge from one another, and you couldn't keep track of changes made directly to the home directory dotfiles.

Changing home directory dotfiles isn't uncommon either- often installing a new application will modify your `.bashrc`. With symlinks that modification will change the copy in your dotfiles repo, so you can take a look at the git diff to see exactly what changed and decide whether you want to keep that change.

Something else neat to note here us `pushd` and `popd`. These change directory using a stack data model- so you push a directory you want to move to on top, then pop to go back to the previous directory. It's really useful in scripts because you don't need to keep track of the current directory- just `popd` to go back to whatever it was.

### Idempotent

One important thing to consider when scripting dotfiles is that everything must be idempotent. That is, they must be capable of being called numerous times and always returning the same result. Your dotfiles aren't going to be called just once- you'll frequently make changes, re-run them, or run them just to update your dependencies. If you have a function that installs something you need to ensure that it won't start acting strangely (eg installing multiple versions or overwriting configuration files) if it's installed more than once.

Most processes are already idempotent. Linking a dotfile or calling install on a package manager can be done numerous times with the same result.

When a process can't easily be made idempotent I wrap it in a conditional. For example a couple different dependencies require checking out a git repo, but if you run that command twice it will fail because the directory already exists. So I made a little helper that checks whether the clone needs to be done first:

```bash
function tryGitClone() {
    author=$1
    repo=$2
    destination=$3
    if [ -d "$3" ]; then
        ok "already exists"
    else
        try git clone https://github.com/$1/$2.git $3
    fi
}
```

That way even get a helpful little output telling us that nothing was done, the directory already existed.
