--- @class RageFileManager
--- @field public __index table Gives you the ``RageFileManager`` table again
local RageFileManager = {}

--- Loads a Lua file?
--- (Doesn't work, it returns the function itself and the string)
---
--- |since_notitg_v3_1|
---
--- This function returns two values, a function, and a string
---
--- @param path string Presumably a path to a Lua file to load
---
--- @return multiple
function RageFileManager:LuaLoadFile(path) end

--- Tests for equality against another userdata object
---
--- |since_unk|
---
--- @param other userdata The object to test for equality against
---
--- @return boolean
function RageFileManager:__eq(other) end

--- Returns a ``RageFileManager (MemoryAddress)`` string
---
--- |since_unk|
---
--- @return string
function RageFileManager:__tostring() end

return RageFileManager
