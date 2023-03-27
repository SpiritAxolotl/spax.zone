--- @class ActorScroller: ActorFrame
--- @field public __index table Gives you the ``ActorScroller`` table again
local ActorScroller = {}

--- Scrolls to the item at index ``index``, and makes it the currently selected item
---
--- |since_itg|
---
--- @param index float The index of the targetted item
---
--- @return void
function ActorScroller:SetCurrentAndDestinationItem(index) end

--- Returns an ``ActorScroller (MemoryAddress)`` string
---
--- |since_unk|
---
--- @return string
function ActorScroller:__tostring() end

return ActorScroller
