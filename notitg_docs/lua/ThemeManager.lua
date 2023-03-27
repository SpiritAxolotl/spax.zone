--- @class ThemeManager
--- @field public __index table Gives you the ``ThemeManager`` table again
local ThemeManager = {}

--- Returns a list of all installed theme names
---
--- |since_itg|
---
--- @return string[]
function ThemeManager:GetThemeNames() end

--- Returns the name of the currently used theme
---
--- |since_itg|
---
--- @return string
function ThemeManager:GetCurThemeName() end

--- Returns the current language
---
--- Eg: ``english``
---
--- |since_itg|
---
--- @return string
function ThemeManager:GetCurLanguage() end

--- Returns the value of a theme metric
---
--- Returns an empty string in the metric doesn't exist
---
--- |since_itg|
---
--- @param class string The class to fetch a metric within
--- @param element string The name of the metric within the class
---
--- @return string
function ThemeManager:GetMetric() end

--- Returns the path of an element in a specific folder, determined bu ``type``
---
--- Returns the ``_missing`` path if the element does not exist
---
--- |since_itg|
---
--- @param type int The type of the wanted element - see :cpp:enum:`ElementCategory`
--- @param class string The class to use
--- @param element string The element to find within the class
---
--- @return string
function ThemeManager:GetPath(type, class, element) end

--- Tests for equality against another userdata object
---
--- |since_unk|
---
--- @param other userdata The object to test for equality against
---
--- @return boolean
function ThemeManager:__eq(other) end

--- Returns a ``ThemeManager (MemoryAddress)`` string
---
--- |since_unk|
---
--- @return string
function ThemeManager:__tostring() end

return ThemeManager
