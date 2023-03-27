--- @class StatsManager
--- @field public __index table Gives you the ``StatsManager`` table again
local StatsManager = {}

--- Returns a :lua:class:`StageStats` instance including every game played
---
--- |since_itg|
---
--- @return StageStats
function StatsManager:GetAccumStageStats() end

--- Returns a :lua:class:`StageStats` instance containing the last ``rounds`` rounds played
---
--- |since_itg|
---
--- @param rounds int The number of rounds to fetch
---
--- @return StageStats|void
function StatsManager:GetPlayedStageStats(rounds) end

--- Returns the current stage stats
---
--- |since_itg|
---
--- @return StageStats
function StatsManager:GetCurStageStats() end

--- Returns the number of stages played
---
--- |since_itg|
---
--- @return int
function StatsManager:GetStagesPlayed() end

--- Returns the final grade for the specified player
---
--- See :cpp:enum:`Grade`
---
--- |since_itg|
---
--- @param playerNumber int The player number (0 indexed)
---
--- @return int
function StatsManager:GetFinalGrade(playerNumbe) end

--- Returns the worst grade
---
--- See :cpp:enum:`Grade`
---
--- |since_itg|
---
--- @return int
function StatsManager:GetWorstGrade() end

--- Returns the best grade
---
--- See :cpp:enum:`Grade`
---
--- |since_itg|
---
--- @return int
function StatsManager:GetBestGrade() end

--- Resets stored stats
---
--- |since_itg|
---
--- @return void
function StatsManager:Reset() end

--- Tests for equality against another userdata object
---
--- |since_unk|
---
--- @param other userdata The object to test for equality against
---
--- @return boolean
function StatsManager:__eq(other) end

--- Returns a ``StatsManager (MemoryAddress)`` string
---
--- |since_unk|
---
--- @return string
function StatsManager:__tostring() end

return StatsManager
