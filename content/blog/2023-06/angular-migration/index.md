---
title: Migrating AngularJS to Angular with a hybrid application
date: 2023-06-26 00:00:00 +0000
description: In January 2022, the last version of AngularJS left support. There will be no official updates or security patches for AngularJS ever again. Yet, many big organisations that invested in AngularJS early on still depend on it. How can we help these organisations to manage the move from AngularJS to Angular?
img: ./angular-migration-banner.jpg
tags: ["front-end", "migration", "angular"]
canonicalLink: https://www.codurance.com/publications/migrating-angularjs-to-angular
---

_First posted on [the Codurance blog](https://www.codurance.com/publications/migrating-angularjs-to-angular)_

In January 2022, the last version of AngularJS left support. There will be no official updates or security patches for AngularJS ever again.

Yet, many big organisations that invested in AngularJS early on still depend on it. How can we help these organisations to manage the move from AngularJS to Angular?

First, a common cause of confusion: AngularJS and Angular are two separate things. Angular is sometimes also called Angular 2+. In short, at some point in AngularJS' history it was decided to majorly rearchitect the whole thing in a new framework that kept the same name but dropped the "JS", known as Angular. There is no upgrade path between them. The only way to go from one to the other is to migrate.

## Why not (some other UI framework)?

Given that you might ask, why migrate at all? Why not re-implement everything in Vue or Svelte or some other exciting new framework? The biggest reason is that Angular provides features for working alongside AngularJS that make it much easier to migrate from one to the other. Namely, it allows you to run a "hybrid application" in which both Angular and AngularJS run side-by-side during the migration. This enables you to replace one small piece at a time. On the other hand if you use a totally different framework you most likely won't be able to cleanly use them both in the same page, so you may need to migrate the entire application in one step.

Now if you have only a very small and simple application it may not be a bad choice to change to another framework. But setting out to replace any sufficiently complex or large application in one "big bang" change is never going to work. To realistically change such applications you have to "change the wheels while the vehicle is moving". That is, to avoid breaking the application for its users you must keep the application in a running, workable state at all times while iteratively replacing numerous parts of it.

The other reason is just that Angular uses similar concepts and syntax to AngularJS, and your application's developers will find it easier to learn than picking up something totally new.

## Resources

Unfortunately, though it is very much possible and the features exist in Angular to suport it, there aren't many resources on how to actually create a hybrid application. The best resource on this topic is [Upgrading Angular Applications](https://go.nrwl.io/upgrading-angular-applications-book) by Victor Savkin, who is a member of the Angular team that has been very active on this topic. In my project we kept this book close-by at all times as a guide. Savkin's book goes into much detail on the more conceptual side of things and includes some code samples, but there is also [the official Angular upgrade guide](https://angular.io/guide/upgrade) which is a bit light on the conceptual side but includes a lot of technical detail.

In the best of cases though, I found the documentation to be very helpful yet not quite comprehensive enough. At this point you may choose to go and read the documentation I have linked instead and see where that takes you, but what follows from here will be my lessons learned having gone down the path you're about to take already. Hopefully it helps.

## Angular and AngularJS side-by-side

Every AngularJS or Angular application can be thought of as a tree, like so:

<figure alt="A tree diagram in of blue nodes each representing AngularJS modules or directives." src="tree-angularjs.jpg"></figure>

In this case each of those blue nodes are some AngularJS unit of code be they a module, or directive, or whatever. The root node must be a module, this is your app module that contains the whole application. From there you might imagine that the second row are directives representing whole pages, and the next row after that are directives making up small parts of those pages.

What we want to achieve, in short, is this:

<figure alt="A tree diagram as before but one leaf node of the tree is replaced by a red node, representing an Angular component" src="tree-hybrid-1.jpg"></figure>

If we could do this, we could replace one small directive of this whole tree with an Angular component. That would be amazing! If it continued to work as before then we could merge and deploy our changes without any users even noticing a change. That would enable us to follow true **continuous integration**: making small changes that are merged and deployed constantly, always staying up-to-date with the main branch. This way each small piece gets tested and moved into production one bit at a time, meaning many small painless deploys instead of one big scary deploy if you were to migrate many or all nodes in one go. Also, it really helps to reduce version control conflicts and improve general team cohesion.

### ng-upgrade

But is that possible? It is, thanks to `ng-upgrade`. `ng-upgrade` is a library Angular provides for adding a compatibility layer between Angular in AngularJS. It enables you to upgrade AngularJS directives to Angular and downgrade Angular components to AngularJS directives, and do similar for services and such.

It does this by wrapping an object from one API in a wrapper object that translates between it's API and the other. For example, to upgrade an AngularJS object it wraps an object around it that translates it's outputs into an API that Angular understands and translates it's inputs from Angular into a format that AngularJS understands. In terms of our diagram, that looks like this:

<figure alt='A diagram demonstrating how an AngularJS node in the previous diagrams may be "upgraded", resulting in a blue node wrapped in a red circle wrapper, and visca versa for downgrading Angular nodes.' src="ngupgrade.jpg"></figure>

Using this we can integrate our new Angular components with the old AngularJS application, like so:

<figure alt="A tree diagram as before but one leaf node of the tree is replaced by a red node with a blue circle around it, indicating an Angular component that has been downgraded to act as an AngularJS directive" src="tree-hybrid-2.jpg"></figure>

How we actually do this in code is very simple too. An example follows. Note that `angular.module` is a regular AngularJS function (you will need [the types](https://www.npmjs.com/package/@types/angularjs) to reference them from Typescript) and only the inner value we're placing in there is different, because we're providing a wrapped Angular component downgraded using the `downgradeComponent` function:

```ts
angular.module('myModule', [])
  .directive('myDirective', downgradeComponent({
    component: MyComponent
  }))
```

This is really cool! From here you can move one node at a time, from the bottom up, until the whole application is migrated, and keep the application working and deployable the whole time. But it is not a complete solution. In fact, it presents considerable problems. Imagine that you follow this approach and migrate all of the leaf nodes of this tree - which may have dozens, hundreds or even thousands of nodes in breadth - what then? You end up with a tree that looks a little like this:

<figure alt="A tree diagram as before but with only one blue AngularJS root node connected to many downgraded Angular components" src="tree-hybrid-3.jpg"></figure>

In this scenario you've been working on this migration for at least months, perhaps years. Yet you don't have any actual full Angular pages because everything depends on the AngularJS root module. And if you introduce new features they'll have to include this AngularJS wrapper even if you write them in Angular.

What's more, now you have a big job ahead of you: Cutting out the AngularJS root module, and replacing it with an Angular one. This is a huge change: Every downgraded node now needs to have its downgrade removed, every service too, and any remaining AngularJS services that were upgraded need to be migrated. This is not only a big change to make in one go, it is also a risky one: It affects every single page in the entire application, and any of them could potentially break on some odd unforeseen edge case. So the amount of testing work is far greater than the amount of development work.

All along you were creating a time bomb. How can we avoid this "time bomb" problem? Savkin introduces what he calls the Shell Strategy to help here.

### The Shell Strategy

In short, the shell strategy is: Wrap the root AngularJS module in an Angular module (using ng-upgrade to make the AngularJS module interoperate with the new root Angular module), effectively making the whole AngularJS application belong to an Angular application.

<figure alt="A tree of blue AngularJS nodes, but the blue root node is now wrapped in a red circle (an Angular upgrade wrapper) and has a red node parent above it." src="tree-shell-strategy.jpg" width="500px"></figure>

In practice this is done by removing your original `.bootstrap` or `ng-bootstrap` calls for AngularJS and instead boostrapping AngularJS from Angular's bootstrap, using the `upgrade.bootstrap` function from `ng-upgrade` that takes the exact same parameters as the original:

```ts
@NgModule({
  …
})
class AppModule implements DoBootstrap {
  private readonly upgrade: UpgradeModule

  constructor(upgrade: UpgradeModule) {
    this.upgrade = upgrade
  }

  ngDoBootstrap(appRef: ApplicationRef) {
    appRef.bootstrap(AppComponent)
    this.upgrade.bootstrap(document.getElementById('root-template-element') as Element, ['my-dependencies-here'])
  }
}
```

This has one immediate, obvious advantage- You can now add pure Angular routes and pages without any AngularJS, like so:

<figure alt="As the previous tree diagram but now the root red node has another red (Angular) node running off of it, into a separate branch with no blue (AngularJS) nodes." src="tree-shell-strategy-2.jpg" width="500px"></figure>

This way we can add full new features in Angular without any AngularJS! But if we were to take this top-down strategy to its logical conclusion it would have us apply the `ng-upgrade` wrapper to all the top-level AngularJS nodes which is just not workable. There are a couple different strategies that Savkin describes in his book, but we went with a bottom-up strategy along with the shell strategy. That way we can incrementally migrate one part of the tree at a time until an entire branch can be moved to pure Angular:

<img alt="Four tree diagrams demonstrating, one step at a time, how a branch of nodes may be converted one at a time until the whole branch is moved to the Angular root node" src="/tree-shell-strategy-3.gif" width="500px"></img>

We follow a "bottom-up" pattern, aka migrate a leaf node of the tree first, because it is the simplest place to start. If you migrate a node in the middle of your tree you need to use upgrade and downgrades to manage the relationships that node has above _and_ below it, but with the leaf node you only need to upgrade that one node and then it can talk to its parents.

This way you can incrementally, continuously grow the Angular application while shrinking the AngularJS application. And we end up with a whole branch in pure Angular! Rather than ending up with a load of partially converted unfinished pages, you've completed a few simple self-contained parts without once breaking the site until a whole section of it is totally converted. This is a really compelling approach to a project stakeholder. I suggest you keep track of how many AngularJS controllers there are and how many Angular components and graph them over time, this gives you a clear metric you can report demonstrating the pace and continued progress of the migration.

## Routing

Remember that in both AngularJS and Angular you can route your applications by providing an element in your root template that gets replaced by the contents of the page being routed to.

In terms of how this looks in the root HTML template of a hybrid application, you'll want to have the roots of your Angular and AngularJS applications side-by-side like so:

```html
<section>
  <div ng-view></div>
  <app-root></app-root>
</section>
```

Any pages your AngularJS application routes to will be displayed under your `ng-view` element, and pages your Angular application routes to will be displayed under your `app-root` element (or replace `app-root` with whatever selector you specify in your app component, typically named `app.component.ts`).

But, you might think, surely this renders both applications on the same page? Well, yes, it does. And that opens a whole other can of worms to think about. You can ensure that only one page is displayed by having the other application display a blank page. Like so:

<figure alt='A diagram showing three URL paths 1, 2 and 3 going through two shapes one after the other. The first shape is labelled "Angular" and takes control of path 1. The second shape is labelled AngularJS and it controls paths 2 and 3' src="routing.jpg"></figure>

But there are a couple possible bugs: What if both applications don't control a route, and thus show nothing? What if they both think they control it, and thus both applications display a page at the same time?

The first issue is easily resolved: Just ensure that only one of the applications has a 404 page. Then if the user routes to a page that neither of them controls, one of them will display a 404 page and the other nothing. Just ensure that there is only one application responsible for 404 pages.

As for the second problem, that is a bit more difficult. If you migrate a page there is a risk that the old page may not be properly removed and both applications may display something at the same time, especially if there is some non-trivial additional logic to your routing. In most moderately-sized applications it is probably enough to just trust the developers to catch these errors manually. In our quite big, complex case we came up with a more comprehensive solution: Specify all of your Angular routes in a JSON file the new application exposes and read it (once at startup) from the AngularJS application. We then modified the AngularJS router to throw an error if it is told to add a route to a route that we know is controlled by AngularJS. Using this method we were also able to add feature flags to individual routes.

### Route syncing

Routing was perhaps the most awkward, finicky issue of the hybrid application my team and I worked on. There were a couple particular bugs that caused a lot of trouble: Recursive loops in which AngularJS causes a routing event in Angular, which in turn causes an event in Angular, which in turn causes an event in AngularJS, ad infinitum. Often this happened because they each disagreed on what the correct name for the path was, which mostly comes down to differences in behaviour in certain edge cases regarding how Angular and AngularJS parse URLs. When it comes to this, we had to write our own [`UrlSerializer`](https://angular.io/api/router/UrlSerializer) to configure how Angular serialises and deserialises URLs. So long as it reads in addresses from AngularJS correctly and outputs ones that AngularJS can read, it will work fine.

The other issue was the opposite: Sometimes, when AngularJS triggered a routing event it wouldn't be recognised by Angular. This would result in incorrect states where both applications are rendering a page at the same time because Angular has not received a routing event so does not know that it needs to display nothing, but AngularJS is aware of ther event hence is rendering something.

The solution to this is simple: `ng-upgrade` provides a tool called [`setupLocationSync`](https://angular.io/api/router/upgrade/setUpLocationSync) that ensures all AngularJS routing events are matched in Angular. All you have to do is call the function during your Angular bootstrap. For most people this will be enough but if you are using fragment-style addresses (ie your URLs have a `#` in them before the front-end page address, like `my.website.com/index.jsp#/about-us`) then you will have another complication. Your luck may vary but we found that setUpLocationSync does not work for this type of address by default. Luckily it is quite a simple function, so we just copied it [from source](https://github.com/angular/angular/blob/9d4842cadb89dbb1a7ceb53d2f35213c9924ff97/packages/router/upgrade/src/upgrade.ts#L65), wrote some tests around it and produced a custom version that works with fragment URLs.

## Upgrading and downgrading services

One problem you're likely to come across is sharing services between both applications. You'll have pages in AngularJS you want to migrate to Angular but they use services that are shared by other AngularJS pages. In this case you have three possible approaches:

1) Re-implement the service in Angular, keeping two copies of the same service.
2) Re-implement the service in Angular, delete the AngularJS one and use a downgrade wrapper to make the Angular version usable by AngularJS code.
3) Add an upgrade wrapper to the AngularJS service that makes it available in Angular. After all the pages using it have been migrated, then the service itself can be migrated and the wrapper removed.

All of these options are viable and it depends on the specifics of the particular service which one is the best choice. Honestly, though it may not be your first choice, option 1 is not bad at all. Yes you're creating duplication, but so long as everyone is on the same page that we're working on the Angular version exclusively from now on it isn't much of a problem. It doesn't work however if your service has state - don't try doing something silly to sync them together it really isn't worth it, just choose option 2 or 3. 1 can also not be a good choice when a service is used in very many places and is likely to be modified. If you're likely to change it and unlikely to be able to complete migrating it before then, just follow options 2 or 3.

To choose between options 2 or 3 you have to decide whether you want to front-load or back-load the effort: Migrate the service add a lot of Angular downgrade wrappers to a lot of AngularJS pages right now that you can remove later? Or save yourself from doing that by adding one AngularJS upgrade wrapper each time you migrate a component or page, but with the knowledge that you'll eventually have to perform that migration and remove all the wrappers? I would lean toward back-loading the effort: Make your immediate job simpler, follow the simplest implementation you can think of, and put a task to follow up with migrating that service in your backlog.

Actually making an Angular service available in AngularJS is, similar to downgrading a component, very simple:

```ts
angular.module('myModule', [])
  .factory('myService', downgradeInjectable(myService))
```

Upgrading an AngularJS service is a bit more involved because you have to add types for the relevant service in TypeScript, but it is still quite easy. You add the service to the providers array of one of your modules, in the `@NgModule` annotation. Like so:

```ts
angular.module('myModule', [])
    .factory('myService', downgradeInjectable(myService))
```

Upgrading an AngularJS service is a bit more involved because you have to add types for the relevant service in TypeScript, but it is still quite easy. You add the service to the `providers` array of one of your modules, in the `@NgModule` annotation:

```
providers: [
  …
  {
    deps: ['$injector'],
    provide: 'my-service-name',
    useFactory: (injector: Injector) => {
      return injector.get(serviceName)
    }
  }
]
```

The `Injector` is capable of fetching the AngularJS service, and by passing that into providers via `useFactory` you make it available for general use in your Angular application.

However, my recommendation would be not to use this service directly in any components. Instead, create a new Angular service that wraps this one, provides a similar API and delegates actual behaviour to the AngularJS service. That way when the time comes to migrate that service you have a much easier time untangling the AngularJS version as it is only used in one place, not many, and you can simply implement the same logic in your Angular service using the API you defined. You can inject the underlying service you specified into your new wrapper service in the constructor like so:

```ts
public constructor(
    @Inject("my-service-name") private myInnerService: MyInnerService
) { }
```

Note that the argument you pass to `@Inject` must be exactly the same as the string (known as the token) you pass to the `provide` argument when defining the provider above.

## Training

The developers that were accustomed to AngularJS will need a bit of training to get up to speed. They'll now need to write in TypeScript which is quite a different language, and Angular itself has significant differences too. You'll need to lead these efforts to ensure that the developers have all the support they need.

### Courses

For Typescript, I recommend [Beginner's Typescript](https://www.totaltypescript.com/tutorials/beginners-typescript) from TotalTypescript. It's a very practical series of tutorials in which you do most everything yourself, and it is written in a way that assumes you know Javascript reasonably well already and only introduces the new concepts. For Angular, the [official tutorials](https://angular.io/tutorial) are very good. I found that Tour of Heroes teaches you all the fundamentals.

Other than those the Pluralsight courses for Typescript and Angular I know to be quite good, and Udemy has courses for them too though I've not looked closely at those.

### Knowledge sharing

Ultimately if you are the team architecting the migration you will be the ones with the knowledge that the rest of the company needs, and the responsibility to disseminate it. Sending some developers on courses won't be enough.

We found that hosting seminars and Community of Practice (as part of a Continuous Improvement Program) helped. Nothing can substitute having actual conversations, answering questions. And the closer you can work with the developers, the better! Pair with them, work on your backlog items with them, get them real experience working in this new way with the support of someone that already has familiarity right there.

Better yet, use **rotational coaching**: Invite a few developers from another team into your team, have them pair with you for a sprint, then let them return to their team bringing their learnings to their team. Then, you can pick a few developers from a different team to join you on your next sprint. This can be a really effective way of disseminating information throughout the organisation.

And if your developer experience is great then each developer you coach will become an advocate of your project, too. They will help spread the excitement of your migration to their contacts, increasing the chance that more teams will want to get involved.

## Finding help

When involved in a complex project like an Angular migration it is not uncommon to come across strange edge cases that there is not a lot of material for online. In these cases it really helps to have someone to talk to. I recommend joining the [Angular Discord Community](https://discord.com/invite/angular) for that reason. I found them really helpful on several occasions when I was struggling against some weird bugs. There is also a Greppr community, but in my experience the Discord is far more active.

## Conclusion

We've covered how to create a hybrid Angular-AngularJS architecture, how that is essential in migrating an AngularJS application to Angular, and strategies for doing so. I hope you find this helpful because in my experience there just wasn't quite enough information about Angular hybrid applications online.

Migrating to Angular is no small task, but if you decide to go that route it is definitely doable. Best of luck.
