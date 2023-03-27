--- @class UnlockManager
--- @field public __index table Gives you the ``UnlockManager`` table again
local UnlockManager = {}

--- Unlocks an entry with a code
---
--- |since_itg|
---
--- @param unlockCode int The unlock code
---
--- @return void
function UnlockManager:UnlockCode(unlockCode) end

--- Sets the preferred song/course to the specified code
---
--- |since_itg|
---
--- @param unlockCode int The unlock code
---
--- @return void
function UnlockManager:PreferUnlockCode(unlockCode) end

--- Returns a table of steps unlocked by ``unlockCode``
---
--- Returns an empty table on an invalid code
---
--- |since_itg|
---
--- @param unlockCode int The unlock code
---
--- @return table
function UnlockManager:GetSongsUnlockedByCode() end

--- Returns a table of songs unlocked by ``unlockCode``
---
--- Returns an empty table on an invalid code
---
--- |since_itg|
---
--- @param unlockCode int The unlock code
---
--- @return table
function UnlockManager:GetStepsUnlockedByCode() end

--- Finds the code associated with ``name``
---
--- |since_itg|
---
--- @param name string The name
---
--- @return int|nil
function UnlockManager:FindCode(name) end

--- Tests for equality against another userdata object
---
--- |since_unk|
---
--- @param other userdata The object to test for equality against
---
--- @return boolean
function UnlockManager:__eq(other) end

--- Returns a ``UnlockManager (MemoryAddress)`` string
---
--- |since_unk|
---
--- @return string
function UnlockManager:__tostring() end

return UnlockManager
