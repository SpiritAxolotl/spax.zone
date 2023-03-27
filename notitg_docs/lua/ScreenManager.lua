--- @class ScreenManager
--- @field public __index table Gives you the ``ScreenManager`` table again
local ScreenManager = {}

--- Shows a message on screen for a few seconds
---
--- Useful for debugging!
---
--- |since_itg|
---
--- @param message string The message to show
---
--- @return void
function ScreenManager:SystemMessage(message) end

--- Like :lua:meth:`ScreenManager.SystemMessage`, but does not animate the message in
---
--- |since_itg|
---
--- @param message string The message to show
---
--- @return void
function ScreenManager:SystemMessageNoAnimate(message) end

--- Overlays a message on top of the entire screen
---
--- |since_itg|
---
--- @param message string The message to show
---
--- @return void
function ScreenManager:OverlayMessage(message) end

--- Hides any message previously shown with :lua:meth:`ScreenManager.OverlayMessage`
---
--- |since_itg|
---
--- @return void
function ScreenManager:HideOverlayMessage() end

--- Switches to the specified screen
---
--- |since_itg|
---
--- @param screenName string The name of the screen to switch to
---
--- @return void
function ScreenManager:SetNewScreen(screenName) end

--- Returns the currently displayed screen
---
--- Eg: This will give you a :lua:class:`ScreenGameplay` instance if called during gameplay
---
--- |since_itg|
---
--- @return Actor
function ScreenManager:GetTopScreen() end

--- Set which screens receive game input
---
--- |since_notitg_v4|
---
--- @param mode int ``0`` for all screens, ``1`` for only overlay screens, ``2`` for no screens
---
--- @return void
function ScreenManager:SetInputMode() end

--- ?
---
--- |since_notitg_v4|
---
--- @return ActorFrame
function ScreenManager:GetSharedBGA() end

--- Returns a list of screens overlaid on top of the main screen
---
--- |since_notitg_v4|
---
--- @return ActorFrame[]
function ScreenManager:GetOverlayScreens() end

--- Returns a child of the top screen
---
--- Will return ``nil`` if the child doesn't exist
---
--- Also see :lua:meth:`ScreenManager.GetTopScreen`
---
--- |since_notitg_v4|
---
--- @param child string|int The name or index of the child to get
---
--- @return Actor|nil
function ActorFrame:__call(child) end

--- Tests for equality against another userdata object
---
--- |since_unk|
---
--- @param other userdata The object to test for equality against
---
--- @return boolean
function ScreenManager:__eq(other) end

--- Returns an ``ScreenManager (MemoryAddress)`` string
---
--- |since_unk|
---
--- @return string
function ScreenManager:__tostring() end

return ScreenManager
