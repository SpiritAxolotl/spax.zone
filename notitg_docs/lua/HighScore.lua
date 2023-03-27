--- @class HighScore
--- @field public __index table Gives you the ``HighScore`` table again
local HighScore = {}

--- Returns a string of modifiers used in gameplay
---
--- |since_itg|
---
--- @return string
function HighScore:GetModifiers() end

--- Returns the dance points percentage score
---
--- |since_itg|
---
--- @return float
function HighScore:GetPercentDP() end

--- Returns the score
---
--- |since_itg|
---
--- @return int
function HighScore:GetScore() end

--- Returns the number of seconds the player survived for
---
--- |since_itg|
---
--- @return float
function HighScore:GetSurvivalSeconds() end

--- Returns the name associated with the score
---
--- |since_itg|
---
--- @return string
function HighScore:GetName() end

--- Returns the date and time the high score was achieved
---
--- |since_itg|
---
--- @return string
function HighScore:GetDate() end

--- Returns ``true`` if the score's name uses a fill-in marker
---
--- |since_itg|
---
--- @return boolean
function HighScore:IsFillInMarker() end

--- Check equality with another userdata object
---
--- |since_unk|
---
--- @param other userdata The object to test for equality against
---
--- @return boolean
function HighScore:__eq(other) end

--- Returns a ``HighScore (MemoryAddress)`` string
---
--- |since_unk|
---
--- @return string
function HighScore:__tostring() end

return HighScore
