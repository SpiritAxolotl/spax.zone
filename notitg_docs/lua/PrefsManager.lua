--- @class PrefsManager
--- @field public __index table Gives you the ``PrefsManager`` table again
local PrefsManager = {}

--- Sets the value of a preference
---
--- |since_itg|
---
--- @param pref string The preference to set
--- @param value any The new value to set
---
--- @return void
function PrefsManager:SetPreference(pref, value) end

--- Returns the value of a preference
---
--- Eg: ``local audio_offset = PREFSMAN:GetPreference('GlobalOffsetSeconds')``
---
--- |since_itg|
---
--- @param pref string The preference to get
---
--- @return any
function PrefsManager:GetPreference(pref) end

--- Tests for equality against another userdata object
---
--- |since_unk|
---
--- @param other userdata The object to test for equality against
---
--- @return boolean
function PrefsManager:__eq(other) end

--- Returns a ``PrefsManager (MemoryAddress)`` string
---
--- |since_unk|
---
--- @return string
function PrefsManager:__tostring() end

return PrefsManager
