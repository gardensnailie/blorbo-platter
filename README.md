# blorbo-platter
A simple webpage meant for sharing casts of characters with others in a digestible way.

This page is designed to host easily digestible cards for roleplay, ttrpg, and other fictional characters. I originally made it in order to share roleplay muses after finding that other online resources like Toyhou.se or Obsidian books were terrible at letting people browse through large rosters and had awful support for AUs and alternate versions.

Here, you get a nicely laid out page of quick info character cards including basic information and a short description. All of the cards are filterable based on whatever tagging system you prefer. Alternate versions are perfectly supported with all versions combining into a single tab to quickly cycle through them; each tab will disappear or reappear independently based on filter criteria. So if someone wants to look at male characters, they won't end up seeing that one genderbend AU you made where John Blorbo is actually Jane. 

It also has a dashboard page where you can add and edit cards and have it automatically push any changes to the repo without having to mess with the code. Because nobody should have to open a 10,000 line HTML file to change a character's birthday.

## Quickstart Guide
1. To use the page, clone the repo and feed the editor a personal access token to let it read and write to the directory.
2. Deploy a github page using the main/root directory.
3. Once you have the page up, navigate to /editor on the the webpage, and you'll have access to a dashboard where you can add, edit, and remove character cards. All the changes you make will be pushed directly to the repo. This dashboard can be accessed from any device so long as you generate a token for it.
4. Once you're done editing, the main /index page will show them all in alphanumeric order where you can filter them by custom-set tags. These tags apply per-tab on tabbed cards, so only relevant characters show up.
5. Tags can be included in the URL, so you can send someone the whole hoard, or pre-filter it to relevant characters so they don't waste their time.

Many of the data fields are easily editable by accessing the corresponding file. New flags can be added by pasting them in the flag js and all the icons can be changed if you'd like. I have links and resources for doing this further down in the resource section. 

## Installation
This is designed to be used via github pages to allow easy pushes to the repository when changes are made. 

- Clone the repository using your method of choice
- Deploy a github page using the main branch /root directory
- (Token stuff here)

90% of this project is just a webpage, so you should be able to simply download the files and re-host them wherever you'd like. However, the dashboard is designed to check for github repos to populate its data and uses it's API to save to the directory. I have not tested alternative hosts, but I wouldn't expect the editor to work unless you dig in there and point it in the right direction yourself. 

For those interested in self-hosting, or who just really hate Javascript, the legacy branch has an older version that includes all the character cards as inline HTML instead of using a JS array.

### Compatibility
This exclusively uses HTML5, CSS, and lightweight Javascript and only calls on-screen data which means it should (hopefully) be compatible with basically anything that can run a modern internet browser. I coded the whole thing on a laptop that can't even load a YouTube playlist without any performance issues despite loading hundreds of cards. It also has keyboard controls in case you get tired scrolling through catgirls.


## Features
- Quickly overview large character casts and share them with friends and creative partners.
- Includes fields for name, gender, age, birthday, height, race/species, occupation, and a short 3-4 description. Has an optional subtitle for additional important info.
- Per-character customization: each card can be assigned it's own custom icon and character color. These will also show up on each toggle button for tabbed cards.
- Optionally display character orientation using HTML flags, including mix-and-matching multiple together. All flags are stored in an easily editable file: add your own!
- Live filter characters based on any number of categories or tags.
- Support for character alternates with automatic grouping and per-tab filtering that will smartly hide tabs that don't need to be there.
- Filters are included in the URL, so you can easily send pre-sorted pages if you only want someone to see your cool robots.
- Lightweight and built with HTML, CSS, and minimal Javascript. Only calls what it needs when it needs. Should easily handle hundreds of cards without slowdown.
- Easy to use dashboard for editing characters that gives a live preview while working and pushes your changes directly to your page.
- Accessibility & mobile support with responsive design and proper screen-reader alt texts, plus keyboard controls.
- The relief of finally being free from TH's god-awful tab system.

## Development & Contribution
I know the fancy people usually include git commands here, but it's literally just a web app. You can just download the files and run it in your browser out of a folder.

That being said, if anyone is interested in contributing then please by all means make whatever forks, pulls, and pushes you'd like. This project is very selfishly designed but I'm always more than happy to help make this into something useful for more people than me.

I haven't had the chance to test this extensively outside my own use case, so do please open a ticket if something breaks so I can fix it.

### Future Plans
- The ability to allow for multiple authors for worldbuilding projects
- Eventually I'd like to take this base work and expand it to create a lightweight template for hosting worldbuilding and settings, specifically designed for collaborative roleplay and general lore nerdery. Basic map support, optional pages for organizations or bestiaries, etc. If I get my way then someday it'll have discord bot support to automatically populate an archive/timeline with roleplay threads.

## Resources & References
- [HugeIcons](https://hugeicons.com/icons/stroke-rounded) is the CSS icon font used, specifically the rounded set. No personal kit needed unlike fontawesome.
- [The HTML flags used on character cards](https://github.com/VynxTH/VynxCodes/tree/main/Pride%20Flags) came from here. You can easily add more by copy-pasting the gradient code from these into the flags.js file and making sure you give it a name so it shows up in the editor.
- [CodePen is my homie](https://codepen.io/) for editing the CSS or card layouts. Nice live editor that loads all the files at once so it looks identical to live but without the ~10 minute deployment time of pages.

## License
This repository is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
