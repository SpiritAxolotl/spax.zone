--- @class HighScoreList
--- @field public __index table Gives you the ``HighScoreList`` table again
local HighScoreList = {}

--- Returns the list of high scores
---
--- |since_itg|
---
--- @return HighScore[]
function HighScoreList:GetHighScores() end

--- Check equality with another userdata object
---
--- |since_unk|
---
--- @param other userdata The object to test for equality against
---
--- @return boolean
function HighScoreList:__eq(other) end

--- Returns a ``HighScoreList (MemoryAddress)`` string
---
--- |since_unk|
---
--- @return string
function HighScoreList:__tostring() end

return HighScoreList
