--- @class Course
--- @field public __index table Gives you the ``Course`` table again
local Course = {}

--- Returns the full title of the course for display
---
--- |since_itg|
---
--- @return string
function Course:GetDisplayFullTitle() end

--- Returns the full transliterated title of the course
---
--- |since_itg|
---
--- @return string
function Course:GetTranslitFullTitle() end

--- Returns the directory of the course
---
--- |since_itg|
---
--- @return string
function Course:GetCourseDir() end

--- Returns the course play mode
---
--- ``1`` = Non stop, ``2`` = Oni, ``3`` = Endless
---
--- |since_itg|
---
--- @return int
function Course:GetPlayMode() end

--- Tests for equality against another userdata object
---
--- |since_unk|
---
--- @param other userdata The object to test for equality against
---
--- @return boolean
function Course:__eq(other) end

--- Retruns an ``Course (MemoryAddress)`` string
---
--- |since_unk|
---
--- @return string
function Course:__tostring() end

return Course
