--- @class RageDisplay
--- @field public __index table Gives you the ``RageDisplay`` table again
local RageDisplay = {}

--- Returns the vertices drawn per frame
---
--- |since_notitg_v1|
---
--- @return int
function RageDisplay:GetVPF() end

--- Returns the frames drawn per second
---
--- |since_notitg_v1|
---
--- @return int
function RageDisplay:GetFPS() end

--- Returns the cumulative (average) FPS
---
--- |since_notitg_v1|
---
--- @return int
function RageDisplay:GetCumFPS() end

--- Applies a shader to *all* on-screen actors
---
--- |since_notitg_v3|
---
--- @param shader RageShaderProgram The shader program to apply
---
--- @return void
function RageDisplay:ShaderFuck(shader) end

--- Undoes :lua:meth:`RageDisplay.ShaderFuck`
---
--- |since_notitg_v3|
---
--- @return void
function RageDisplay:ClearShaderFuck() end

--- Sets the game window's position and size
---
--- |since_notitg_v3|
---
--- @param xPos float The center X position, in pixels
--- @param yPos float The center Y position, in pixels
--- @param xZoom float The window X scale (Where one unit is the theme's width - which is typically 640)
--- @param yZoom float The window Y scale (Where one unit is the theme's height)
---
--- @return void
function RageDisplay:SetWindow(xPos, yPos, xZoom, yZoom) end

--- Sets the window center's X position, in pixels
---
--- |since_notitg_v3|
---
--- @param x float The new X position to set
---
--- @return void
function RageDisplay:SetWindowX(x) end

--- Returns the window center's X position, in pixels
---
--- |since_notitg_v3|
---
--- @return float
function RageDisplay:GetWindowX() end

--- Sets the window center's Y position, in pixels
---
--- |since_notitg_v3|
---
--- @param y float The new Y position to set
---
--- @return void
function RageDisplay:SetWindowY(y) end

--- Returns the window center's Y position, in pixels
---
--- |since_notitg_v3|
---
--- @return float
function RageDisplay:GetWindowY() end

--- Sets the window's X scale
---
--- |since_notitg_v3|
---
--- @param xZoom float The window X scale (Where one unit is the theme's width - which is typically 640)
---
--- @return void
function RageDisplay:SetWindowZoomX(xZoom) end

--- Sets the window's Y scale
---
--- |since_notitg_v3|
---
--- @param yZoom float The window Y scale (Where one unit is the theme's height)
---
--- @return void
function RageDisplay:SetWindowZoomY(yZoom) end

--- Sets the window's X and Y scale
---
--- |since_notitg_v4_2_0|
---
--- @param xZoom float The window X scale (Where one unit is the theme's width - which is typically 640)
---
--- @param yZoom float The window Y scale (Where one unit is the theme's height)
---
--- @return void
function RageDisplay:SetWindowZoom(xZoom, yZoom) end

--- Returns the window's X scale
---
--- Note: one unit represents the theme's height
---
--- |since_notitg_v3|
---
--- @return float
function RageDisplay:GetWindowZoomX() end

--- Returns the window's Y scale
---
--- Note: one unit represents the theme's height
---
--- |since_notitg_v3|
---
--- @return float
function RageDisplay:GetWindowZoomY() end

--- Sets the window's width, in pixels
---
--- |since_notitg_v3|
---
--- @param width float The new width, in pixels
---
--- @return void
function RageDisplay:SetWindowWidth(width) end

--- Returns the window's width, in pixels
---
--- |since_notitg_v3|
---
--- @return float
function RageDisplay:GetWindowWidth() end

--- Sets the window's height, in pixels
---
--- |since_notitg_v3|
---
--- @param height float The new height, in pixels
---
--- @return void
function RageDisplay:SetWindowHeight(height) end

--- Returns the window's height, in pixels
---
--- |since_notitg_v3|
---
--- @return float
function RageDisplay:GetWindowHeight() end

--- Returns the vendor of the graphics driver
---
--- |since_notitg_v2|
---
--- @return string
function RageDisplay:GetVendor() end

--- Adds ``x`` to the window's current horizontal position
---
--- |since_notitg_v3|
---
--- @param x float The horizontal offset to add, in pixels
---
--- @return void
function RageDisplay:SetWindowAddX(x) end

--- Adds ``y`` to the window's current vertical position
---
--- |since_notitg_v3|
---
--- @param y float The vertical offset to add, in pixels
---
--- @return void
function RageDisplay:SetWindowAddY(y) end

--- Returns the window width
---
--- |since_notitg_v1|
---
--- @return float
function RageDisplay:GetDisplayWidth() end

--- Returns the window height
---
--- |since_notitg_v1|
---
--- @return float
function RageDisplay:GetDisplayHeight() end

--- Sets the window position relative to the center of the screen
---
--- Also seems to reset the window size and hide window borders for whatever reason?
---
--- Since |notitg_v4_2_0|, this now accounts for window borders.
---
--- |since_notitg_v3|
---
--- @param x float The X position, in pixels
--- @param y float the Y position, in pixels
---
--- @return void
function RageDisplay:SetWindowPosition(x, y) end

--- Sets the window position relative to the center of the screen, and its size
---
--- Since |notitg_v4_2_0|, this now accounts for window borders.
---
--- |since_notitg_v3|
---
--- @param x float The X position, in pixels
--- @param y float the Y position, in pixels
--- @param w float The window width, in pixels
--- @param h float the window height, in pixels
---
--- @return void
function RageDisplay:SetWindowPositionAndSize(x, y, w, h) end

--- Returns the main monitor's width
---
--- |since_notitg_v3|
---
--- @return float
function RageDisplay:GetDesktopWidth() end

--- Returns the main monitor's height
---
--- |since_notitg_v3|
---
--- @return float
function RageDisplay:GetDesktopHeight() end

--- Offset the position and size of the top screen/overlay screens
---
--- |since_notitg_v1|
---
--- @param translateX int The X offset
--- @param translateY int The Y offset
--- @param addX int The width to add
--- @param addY int The height to add
function RageDisplay:ChangeCentering(translateX, translateY, addX, addY) end

--- Toggle whether the window will have a border
---
--- This will reset at the end of a song, ``F3 + 8`` will also reset it.
---
--- |since_notitg_v4_2_0|
---
--- @param enable boolean Whether the window should have a border
---
--- @return void
function RageDisplay:SetBorderless(enable) end

--- Tests for equality against another userdata object
---
--- |since_unk|
---
--- @param other userdata The object to test for equality against
---
--- @return boolean
function RageDisplay:__eq(other) end

--- Returns a ``RageDisplay (MemoryAddress)`` string
---
--- |since_unk|
---
--- @return string
function RageDisplay:__tostring() end

return RageDisplay
