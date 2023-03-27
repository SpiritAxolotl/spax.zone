--- @class MemoryCardManager
--- @field public __index table Gives you the ``MemoryCardManager`` table again
local MemoryCardManager = {}

--- Returns the state of the specified player's memory card
---
--- See :cpp:enum:`MemoryCardState`
---
--- |since_itg|
---
--- @param playerNumber int The player number (0 indexed)
---
--- @return int
function MemoryCardManager:GetCardState(playerNumber) end

--- Check equality with another userdata object
---
--- |since_unk|
---
--- @param other userdata The object to test for equality against
---
--- @return boolean
function MemoryCardManager:__eq(other) end

--- Returns a ``MemoryCardManager (MemoryAddress)`` string
---
--- |since_unk|
---
--- @return string
function MemoryCardManager:__tostring() end

return MemoryCardManager
