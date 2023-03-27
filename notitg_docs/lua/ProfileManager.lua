--- @class ProfileManager
--- @field public __index table Gives you the ``ProfileManager`` table again
local ProfileManager = {}

--- Returns the machine's profile
---
--- |since_itg|
---
--- @return Profile
function ProfileManager:GetMachineProfile() end

--- Saves the machine's profile
---
--- |since_itg|
---
--- @return void
function ProfileManager:SaveMachineProfile() end

--- Returns the profile for a given player
---
--- |since_itg|
---
--- @param playerNumber int The player number (0 indexed)
---
--- @return Profile
function ProfileManager:GetProfile(playerNumber) end

--- Returns whether the profile for a given player is persistent
---
--- |since_itg|
---
--- @param playerNumber int The player number (0 indexed)
---
--- @return boolean
function ProfileManager:IsPersistentProfile(playerNumber) end

--- Tests for equality against another userdata object
---
--- |since_unk|
---
--- @param other userdata The object to test for equality against
---
--- @return boolean
function ProfileManager:__eq(other) end

--- Returns a ``ProfileManager (MemoryAddress)`` string
---
--- |since_unk|
---
--- @return string
function ProfileManager:__tostring() end

return ProfileManager
