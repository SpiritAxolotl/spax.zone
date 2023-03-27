--- @class DifficultyMeter: ActorFrame
--- @field public __index table Gives you the ``DifficultyMeter`` table again
local DifficultyMeter = {}

--- Sets the difficulty meter's data from steps
---
--- |since_itg|
---
--- @param steps Steps The steps to use
---
--- @return void
function DifficultyMeter:SetFromSteps(steps) end

--- Sets the difficulty meter's data from a trail
---
--- |since_itg|
---
--- @param trail Trail The trail to use
---
--- @return void
function DifficultyMeter:SetFromTrail(trail) end

--- Sets the difficulty meter's data from a meter and difficulty value
---
--- |since_itg|
---
--- @param meter int The rated numerical difficulty to use
--- @param difficulty int The difficulty to use - See :cpp:enum:`Difficulty`
---
--- @return void
function DifficultyMeter:SetFromMeterAndDifficulty(meter, difficulty) end

--- Loads specified graphics into the difficulty meter
---
--- |since_itg|
---
--- @param path string The path to load
---
--- @return void
function DifficultyMeter:Load(path) end

--- Returns a ``DifficultyMeter (MemoryAddress)`` string
---
--- |since_unk|
---
--- @return string
function Actor:__tostring() end

return DifficultyMeter
