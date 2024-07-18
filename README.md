# Tractian Challenge

This is my solution for the Tractian Frontend challenge. Here's a summary of what I did, the tools and strategies I used, and what I could have done better.

## Tools

To deploy the challenge faster, I chose to use Angular since it's a framework I've been working with for more than 2 years and am more proficient with. Angular has a lot of useful tools out of the box, so I didn't need to install any other libraries to accomplish the challenge.

## Strategies

To enhance performance, I used some strategies that I found fit the solution. Let's talk about them.

### Angular OnPush Change Detection Strategy

An Angular feature that allows us to have more control over change detection and view updates, making them only when necessary. With it, we increase performance when having a high number of components on screen.

### SSR and BFF

Server-Side Rendering by itself provides a better user experience by lowering the time for the page to render, but I used it to go a little bit further. I used the power of SSR to write a layer of [Backend for Frontend](https://medium.com/mobilepeople/backend-for-frontend-pattern-why-you-need-to-know-it-46f94ce420b0) with NodeJS. This way, I was able to modify and treat the data exactly the way my client needed, without stressing the client. All data transformation occurs on the server side, allowing the app to handle large requests without affecting the client.

### TDD

Test-Driven Development is a really good way to keep your code simple, solving only the problems that need to be solved. It also has the beneficial side effect of making your code highly test-covered, allowing you to refactor and implement new features without having thousands of unexpected bugs.

## Improvements That I Wish I Had Made

There are some things that I would improve if I had more time dedicated to this project.

### Pagination With Infinite Scrolling

Talking about performance again, infinite scrolling would be a nice feature to have, lowering the initial loading time and making the app proof against excessively large requests.

### Unit Tests For BFF Layer

Even using TDD during development, I had some trouble making tests work for my BFF. So, I had to write them in the traditional way, which led to worse code design and a lot of time trying to resolve bugs. I should have dedicated more time to making the tests work; it would have saved me some good time.

### Animations and Transitions

Another thing I'd like to have done to improve the user experience is animations, especially in the tree view component. This would make the user experience more pleasant.

### Loading Feedback

Implementing simple loading spinners would make the experience much better.

## The APP
And finally, a demo video of the app working: