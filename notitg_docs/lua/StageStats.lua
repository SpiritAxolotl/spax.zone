--- @class StageStats
--- @field public __index table Gives you the ``StageStats`` table again
local StageStats = {}

--- Returns the number of seconds played
---
--- |since_itg|
---
--- @return float
function StageStats:GetGameplaySeconds() end

--- Returns the :lua:class:`PlayerStageStats` instance for a player
---
--- |since_itg|
---
--- @param playerNumber int The player number (0 indexed)
---
--- @return PlayerStageStats
function StageStats:GetPlayerStageStats(playerNumber) end

--- Returns a list of played songs
---
--- |since_notitg_v3|
---
--- @return Song[]
function StageStats:GetPlayedSongs() end

--- Returns a list of possible songs
---
--- |since_notitg_v3|
---
--- @return Song[]
function StageStats:GetPossibleSongs() end

--- Returns the total possible steps seconds
---
--- |since_notitg_v3|
---
--- @return number
function StageStats:GetTotalPossibleStepsSeconds() end

--- Tests for equality against another userdata object
---
--- |since_unk|
---
--- @param other userdata The object to test for equality against
---
--- @return boolean
function StageStats:__eq(other) end

--- Returns a ``StageStats (MemoryAddress)`` string
---
--- |since_unk|
---
--- @return string
function StageStats:__tostring() end

return StageStats
