--- @class HelpDisplay: BitmapText
--- @field public __index table Gives you the ``HelpDisplay`` table again
local HelpDisplay = {}

--- Sets the tips and alternate tips
---
--- |since_itg|
---
--- @param tips table The new tips to set
--- @param altTips table|nil The new alternate tips to set
---
--- @return void
function HelpDisplay:settips(tips, altTips) end

--- Returns two tables containing tips and alternate tips
---
--- |since_itg|
---
--- @return table
function HelpDisplay:gettips() end

--- Returns a ``HelpDisplay (MemoryAddress)`` string
---
--- |since_unk|
---
--- @return string
function HelpDisplay:__tostring() end

return HelpDisplay
