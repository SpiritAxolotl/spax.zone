--- @class ActorSound: Actor
--- @field public __index table Gives you the ``ActorSound`` table again
local ActorSound = {}

--- Plays the sound from the beginning
---
--- If you want to resume a paused sound, use :lua:meth:`ActorSound.pause`
---
--- |since_notitg_v1|
---
--- @return void
function ActorSound:start() end

--- (Doesn't work) Presumably, plays the sound from the beginning
---
--- Overridden from :lua:meth:`Actor.play`
---
--- |since_notitg_v1|
---
--- @return void
function ActorSound:play() end

--- Pauses/resumes sound playback
---
--- |since_notitg_v3|
---
--- @param enable boolean ``true`` to pause, ``false`` to unpause
---
--- @return void
function ActorSound:pause(enable) end

--- Stops the sound
---
--- |since_notitg_v1|
---
--- @return void
function ActorSound:stop() end

--- Loads a new sound
---
--- |since_notitg_v1|
---
--- @param path string The filepath of the sound to load
---
--- @return void
function ActorSound:load(path) end

--- Returns the loaded sound object
---
--- |since_notitg_v1|
---
--- @return RageSound
function ActorSound:get() end

--- Returns an ``ActorSound (MemoryAddress)`` string
---
--- |since_unk|
---
--- @return string
function ActorSound:__tostring() end

return ActorSound
