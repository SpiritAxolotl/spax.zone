--- @class BitmapText: Actor
--- @field public __index table Gives you the ``BitmapText`` table again
local BitmapText = {}

--- Sets the text to be displayed
---
--- |since_itg|
---
--- @param text string The new text to display
---
--- @return void
function BitmapText:settext(text) end

--- Returns the currently displayed text
---
--- |since_itg|
---
--- @return string
function BitmapText:GetText() end

--- Sets/clears the maximum width allowed for rendering text
---
--- This is independent of the actor's zoom
---
--- |since_itg|
---
--- @param width float The new maximum width to set, or 0 to disable the width limit
---
--- @return void
function BitmapText:maxwidth(width) end

--- Sets/clears the maximum height allowed for rendering text
---
--- This is independent of the actor's zoom
---
--- |since_itg|
---
--- @param height float The new maximum height to set, or 0 to disable the height limit
---
--- @return void
function BitmapText:maxheight(height) end

--- Sets the text wrapping point
---
--- |since_itg|
---
--- @param width int Where to start wrapping text (in pixels)
---
--- @return void
function BitmapText:wrapwidthpixels(width) end

--- Returns a ``BitmapText (MemoryAddress)`` string
---
--- |since_unk|
---
--- @return string
function BitmapText:__tostring() end

return BitmapText
