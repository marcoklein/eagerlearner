# Learnings
## What would I do differently?
* handle "flipped" globally
  * eg handle only right side but flip everything through an abstraction layer
* dont throw components on everything.. its good but just let it evolve man
* Logging.. log high level methods at least.. something like restarting the game - that makes debugging much easier
* GameScene IS my LevelController, it makes no sense separating them.. would merge them next time

## What woul I keep doing next time?
* "natural evolvement" of code.. build in things when you need them, dont spend too much time thinking about architecture initally
  * however, refactor as code base grows to strucutre codebase with patterns
* start with graphics and think about a story
* Store global variables for fast configuration somwhere - also to avoid single values within code
  * could be better next time though

# TODOs
## For MVP
* [x] add a "DEAD" screen / message
* [x] adjust physics parameters
* [x] add particles on destroy - srsly .. without it justs looks really boring
* [x] level generator
  * [x] generate random platforms
  * [x] generate random monsters
* [x] add intro screen (with instructions on blackboard)
* [ ] add some more enemies / generate them
* [ ] add different question types (e.g. count enemies)
* [ ] more weapons = more fun :) .. not sure .. its like already fun - maybe give gun later
* [x] hands of player hit every object and only left/or right hand currently has an effect
  * [x] just add a rectangle to check what it hits
* [ ] bullet shooting limit - loose weapon when you shoot everything
* [ ] add a highscore
* [x] adjust level generator
  * [x] first level should be smaller
* [ ] kill monster if player jumps on it / move it downward

### Small
* [ ] bullets should destroy each other; this satisfying feeling when you prevent the bullet from hitting you
* [x] monsters should not kill each other.. then you cant count :O => added the option that monsters only move if player has been in sight
* [x] sometimes you get killed while walking on a platform - maybe falldown y reached?
* [x] destroy particles on level change
* [x] player falls through door and then level

## For more
* [ ] add a death message reason
* [ ] add something to bottom as ground so player knows whats happening
* [ ] add a timer to questions
* [ ] add a "closed door" where the player spawns in a new level - there you can also reset physics and stuff
* [ ] lobby music (probably easiest)
* [ ] sounds
* [ ] add some background elements / decoration
* [ ] make teacher interactable / spawn as monster class with ai
* [ ] refactor item stuff

# Sounds created with Beepbox
* [Title Music](https://beepbox.co/#8n31s0k0l00e01t2mm0a7g0dj07i0r1o3210T1v1L4u9aq3d5fay1z0C0c0AcF8BeV8Q0259PffffE8543T3v1L4ud8q1d4f9y1z1C0SU006050woha9999T1v1L4uf1q3d5f7y0zjC0c0A1F0B0V1Q1845Pe354E034aT4v1L4uf0q1z6666ji8k8k3jSBKSJJAArriiiiii07JCABrzrrrrrrr00YrkqHrsrrrrjr005zrAqzrjzrrqr1jRjrqGGrrzsrsA099ijrABJJJIAzrrtirqrqjqixzsrAjrqjiqaqqysttAJqjikikrizrHtBJJAzArzrIsRCITKSS099ijrAJS____Qg99habbCAYrDzh00b4h400000014h0000000x4g0000004h40000000p1R0arnXA4SnESFH-04LjnYBZ1vgnQi-1bW2-wLE0FEN0OWjbEcKwOM0)

* [Experimenting](https://beepbox.co/#8n31s0k0l00e01t2mm0a7g0fj07i0r1o3210T3v1L4uaeq1d2f8y2z9C0Sp99f9c9Vppbaa9gT1v1L4ua8q3d4f7y1z1C0c1AbFhB2V2Q2ae1Pa514E0001T0v1L4u14q1d6f9y2z1C0w5c1h2T2v1L4u15q0d1f8y0z1C2w0b4140000000010g000000014h000000004h400000000p1ZFBZ5E5whqxo615F5G5HI5E5F5G5HI5F5G5H0kOYyQ2M8JoI30yQyR2RDjw000)