# blorbo-platter
A simple webpage meant for sharing casts of characters with others in a digestible way.

This page is designed to host easily digestible cards for roleplay, ttrpg, and other fictional characters. I originally made it in order to share roleplay muses after finding that other online resources like Toyhou.se or Obsidian books were terrible at letting people browse through large rosters and had awful support for AUs and alternate versions.

Here, you get a nicely laid out page of quick info character cards including basic information and a short description. All of the cards are filterable based on whatever tagging system you prefer. Alternate versions are perfectly supported with all versions combining into a single tab to quickly cycle through them; each tab will disappear or reappear independently based on filter criteria. So if someone wants to look at male characters, they won't end up seeing that one genderbend AU you made where John Blorbo is actually Jane. 

It also has a dashboard page where you can add and edit cards and have it automatically push any changes to the repo without having to mess with the code. Because nobody should have to open a 10,000 line HTML file to change a character's birthday.

## Quickstart Guide
1. Clone the repo and deploy a github page using the main/root directory. You'll also need to generate a granular PAT and allow read/write permissions.
3. Once you have the page up, navigate to /editor on the the webpage. The first time you load it on any device you'll be met with an authorization page to submit an api token, and after that you'll have access to a live dashboard where you can add, edit, and remove character cards. All the changes you make will be pushed directly to the repo. This dashboard can be accessed from any device so long as you authorize it using the same api token.
4. Once you're done editing, the main /index page will show them all in alphanumeric order where you can filter them by custom-set tags. These tags apply per-tab on tabbed cards, so only relevant characters show up.
5. Tags can be included in the URL, so you can send someone the whole hoard, or pre-filter it to relevant characters so they don't waste their time.

Many of the data fields are easily editable by accessing the corresponding file. New flags can be added by pasting them in the flag js and all the icons can be changed if you'd like. I have links and resources for doing this further down in the resource section. For further information, check out the wiki.

## Installation
This is designed to be used via github pages to allow easy pushes to the repository when changes are made. 

- Clone the repository using your method of choice
- Deploy a github page using the main branch /root directory
- [Generate a personal access token](https://github.com/settings/personal-access-tokens). Read and write are the only required permissions. Make sure to save it because you will need this token for every device you want to enable the dashboard on.
- Navigate to /editor.html and input your token to connect. This will be kept in that browser only.
- Go edit some cards! Save when you're done and it will automatically push to the repo and redeploy the updated page. If changes don't show, do a hard refresh and that should fix it.

90% of this project is just a webpage, so you should be able to simply download the files and re-host them wherever you'd like. However, the dashboard is designed to check for github repos to populate its data and uses it's API to save to the directory. I have not tested alternative hosts, but I wouldn't expect the editor to work unless you dig in there and point it in the right direction yourself. 

For those interested in self-hosting, or who just really hate Javascript, the legacy branch has an older version that includes all the character cards as inline HTML instead of using a JS compiler. If you want to change the card layout but the java scares you, then become the compiler yourself.

### Compatibility
This exclusively uses HTML5, CSS, and lightweight Javascript and only calls on-screen data which means it should (hopefully) be compatible with basically anything that can run a modern internet browser. The only network calls it makes are for a few fonts and a single API call when loading or saving using the editor. I coded the whole thing on a laptop that can't even load a YouTube playlist and had no performance issues despite loading hundreds of cards. It also has keyboard controls in case you get tired scrolling through catgirls.

## Features
- Quickly overview large character casts and share them with friends and creative partners.
- Includes fields for name, gender, age, birthday, height, race/species, occupation, and a short 3-4 description. Has an optional subtitle for additional important info.
- Per-character customization: each card can be assigned it's own custom icon and character color. These will also show up on each toggle button for tabbed cards.
- Optionally display character orientation using HTML flags, including mix-and-matching multiple together. All flags are stored in an easily editable file: add your own!
- Full access to Font Awesome v6 Pro icons.
- Live filter characters based on any number of categories or tags.
- Support for character alternates with automatic grouping and per-tab filtering that will smartly hide tabs that don't need to be there.
- Filters are included in the URL, so you can easily send pre-sorted pages if you only want someone to see your cool robots.
- Lightweight and built with HTML, CSS, and minimal Javascript. Only calls what it needs when it needs. Should easily handle hundreds of cards without slowdown.
- Easy to use dashboard for editing characters that gives a live preview while working and pushes your changes directly to your page.
- Accessibility & mobile support with responsive design and proper screen-reader alt texts, plus keyboard controls.
- The relief of finally being free from TH's god-awful tab system.

## Under the Hood
- Data is stored in `character.js`  and `flags.js` which are then compiled by `card.js` using some java regex chicanery. The resulting HTML is then spit out at the index page to be viewed at the front end with a simple filter that sorts using id tags.
- The dashboard uses an api token to read the repo instead of the published page so it's always up-to-date. It constructs a preview based on `card.js`  and loads the data from `characters.js` to allow edits. When you save, it replaces the entire file with the one you edited by pushing to the repo.
- Everything uses textContent and createElement and never exposes innerHTML. The flags are HTML gradients, not images.
- API tokens are also stored locally on your browser, never write to repo, and is never touched by anything else. Hash input is allow-listed on URLs to avoid funny business with filter tags.
- Runtime order `flags.js` -> `characters.js` -> `card.js` -> `script.js` -> front-end.

I ended up dividing a lot of the javascript into seperate files to make it easier to edit and maintain. Characters and flags are stored separately so they're easy to read and edit since they see the most manual traffic, and making the card compiler it's own file lets everything reference it so only one spot needs changed if you want to edit the layout (very useful since it has a lot of manually set values).

## Development & Contribution
I know the fancy people usually include git commands here, but it's literally just a web app. You can just download the files and run it in your browser out of a folder.

That being said, if anyone is interested in contributing then please by all means make whatever forks, pulls, and pushes you'd like. This project is very selfishly designed but I'm always more than happy to help make this into something useful for more people than me.

I haven't had the chance to test this extensively outside my own use case, so do please open a ticket if something breaks so I can fix it.

### Future Plans
- The ability to allow for multiple authors for worldbuilding projects
- Eventually I'd like to take this base work and expand it to create a lightweight template for hosting worldbuilding and settings, specifically designed for collaborative roleplay and general lore nerdery. Basic map support, optional pages for organizations or bestiaries, etc. If I get my way then someday it'll have discord bot support to automatically populate an archive/timeline with roleplay threads.

## Resources & References
- [You can look through the icons included in FAv6 here](https://fontawesome.com/v6/search). The page runs 6.2.0 so there are a small handful you'll find not showing up, but for the most part the entire free + pro suite is available. Everyone give a big thank you to [AquaWolf04](https://github.com/AquaWolf04/font-awesome-pro/tree/main) for hosting the CDN so I can keep the filesize tiny.
- [The HTML flags used on character cards](https://github.com/VynxTH/VynxCodes/tree/main/Pride%20Flags) came from here. You can easily add more by copy-pasting the gradient code from these into the flags.js file and making sure you give it a name so it shows up in the editor.
- [CodePen is my homie](https://codepen.io/) for editing the CSS or card layouts. Nice live editor that loads all the files at once so it looks identical to live but without the ~10 minute deployment time of pages.

## License
This repository is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
