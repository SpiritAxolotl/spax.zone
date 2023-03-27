--- @class Game
--- @field public __index table Gives you the ``Game`` table again
local Game = {}

--- Returns the name of the game
---
--- Will be ``dance`` or ``lights``
---
--- |since_itg|
---
--- @return string
function Game.GetName() end

--- Tests for equality against another userdata object
---
--- |since_unk|
---
--- @param other userdata The object to test for equality against
---
--- @return boolean
function Game:__eq(other) end

--- Returns a ``Game (MemoryAddress)`` string
---
--- |since_unk|
---
--- @return string
function Game:__tostring() end

return Game
