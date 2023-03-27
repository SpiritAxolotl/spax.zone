--- @class NoteSkinManager
--- @field public __index table Gives you the ``NoteSkinManager`` table again
local NoteSkinManager = {}

--- Return a table of available note skin names that are valid for the current game type
---
--- |since_itg|
---
--- @return string[]
function NoteSkinManager:GetNoteSkinNames() end

--- Returns the path for a specific button and element
---
--- Since |notitg_v4_2_0|, this returns the theme's missing graphic if a noteskin element can't be found (instead of
--- crashing).
---
--- |since_itg|
---
--- @param button string The button
--- @param element string The element
---
--- @return string
function NoteSkinManager:GetPath(button, element) end

--- Tests for equality against another userdata object
---
--- |since_unk|
---
--- @param other userdata The object to test for equality against
---
--- @return boolean
function NoteSkinManager:__eq(other) end

--- Returns a ``NoteSkinManager (MemoryAddress)`` string
---
--- |since_unk|
---
--- @return string
function NoteSkinManager:__tostring() end

return NoteSkinManager
