import React from 'react'

import DefaultLayout from '../components/layout'
import SEO from '../components/seo'
import '../styles/main.scss'

const Bio = () => {
  return (
    <DefaultLayout>
      <SEO title="Bio - Matt.si" />
      <article class="article-page">
        <div class="page-content wrap-content">
          <h1>Bio</h1>
          <blockquote>
            <p>In 1936 Alan Turing published "On Computable Numbers", proving that it was possible to create a computer. This has made many people very angry and has been widely regarded as a bad move.</p>
          </blockquote>
          <p>I'm Mattsi, a software engineer / consultant / craftsman / tell-computers-what-to-do-guy working remotely at Codurance.
            I am a polygot and use a wide variety of tech in my day work. In my personal projects I've mostly been sticking to Rust in recent years.</p>
          <p>
            You've found yourself on my blog. I mostly write about software development and whatever programming languages, side projects or conferences/events I'm interested in lately. You can find more of my ramblings and code on Mastodon, GitHub, etc linked at the bottom of the sidebar, and an RSS feed for the blog.
          </p>
          <p>
            Other interests:
            <ul>
            <li>Ethics in tech</li>
            <li>Digital rights </li>
            <li>Tech meetups, conferences, hack camps</li>
            <li>AI</li>
            <li>Simulations and gamedev</li>
            <li>Chess (Check out <a href="https://github.com/Mattsi-Jansky/Iroh">my chess engine</a>)</li>
            <li>Animation, anime</li>
            <li>Videogames, particularly RPGs and story-rich</li>
            </ul>
          </p>
        </div>
      </article>
    </DefaultLayout>
  )
}

export default Bio
