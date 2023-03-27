--- @class RageInput
--- @field public __index table Gives you the ``RageInput`` table again
local RageInput = {}

--- Returns a list of connected input devices
---
--- Eg: ``{ "Wine Keyboard", "Win32_MIDI", "MonkeyKeyboard" }``
---
--- |since_itg|
---
--- @return string[]
function RageInput:GetDescriptions() end

--- Reloads all input devices
---
--- |since_notitg_v1|
---
--- @return void
function RageInput:Reset() end

--- Tests for equality against another userdata object
---
--- |since_unk|
---
--- @param other userdata The object to test for equality against
---
--- @return boolean
function RageInput:__eq(other) end

--- Returns a ``RageInput (MemoryAddress)`` string
---
--- |since_unk|
---
--- @return string
function RageInput:__tostring() end

return RageInput
