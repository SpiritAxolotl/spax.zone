--- @class Steps
--- @field public __index table Gives you the ``Steps`` table again
local Steps = {}

--- Returns the steps description
---
--- |since_itg|
---
--- @return string
function Steps:GetDescription() end

--- Returns the numeric difficulty rating for the steps
---
--- |since_itg|
---
--- @return int
function Steps:GetMeter() end

--- Returns the steps' difficulty
---
--- See :cpp:enum:`Difficulty`
---
--- |since_itg|
---
--- @return int
function Steps:GetDifficulty() end

--- Return the steps' radar values
---
--- |since_itg|
---
--- @return RadarValues
function Steps:GetRadarValues() end

--- Returns the steps type
---
--- See :cpp:enum:`StepsType`
---
--- |since_itg|
---
--- @return int
function Steps:GetStepsType() end

--- Tests for equality against another userdata object
---
--- |since_unk|
---
--- @param other userdata The object to test for equality against
---
--- @return boolean
function Steps:__eq() end

--- Returns a ``Steps (MemoryAddress)`` string
---
--- |since_unk|
---
--- @return string
function Steps:__tostring() end

return Steps
