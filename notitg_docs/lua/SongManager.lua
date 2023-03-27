--- @class SongManager
--- @field public __index table Gives you the ``SongManager`` table again
local SongManager = {}

--- Returns a list of all songs installed
---
--- |since_itg|
---
--- @return Song[]
function SongManager:GetAllSongs() end

--- Returns a list of all courses installed
---
--- |since_itg|
---
--- @param includeAutogen boolean Whether to include auto-generated courses
---
--- @return Course[]
function SongManager:GetAllCourses(includeAutogen) end

--- Returns the song matching ``name``, or ``nil`` if no songs match
---
--- |since_itg|
---
--- @param name string The song name to locate
---
--- @return Song|nil
function SongManager:FindSong(name) end

--- Returns the course matching ``name``, or ``nil`` if no courses match
---
--- |since_itg|
---
--- @param name string The course name to locate
---
--- @return Song|nil
function SongManager:FindCourse(name) end

--- Returns a random song
---
--- |since_itg|
---
--- @return Song
function SongManager:GetRandomSong() end

--- Returns a random course
---
--- |since_itg|
---
--- @return Course
function SongManager:GetRandomCourse() end

--- Tests for equality against another userdata object
---
--- |since_unk|
---
--- @param other userdata The object to test for equality against
---
--- @return boolean
function SongManager:__eq(other) end

--- Returns a ``SongManager (MemoryAddress)`` string
---
--- |since_unk|
---
--- @return string
function SongManager:__tostring() end

return SongManager
