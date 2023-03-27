--- @class ScreenGameplay: ActorFrame
--- @field public __index table Gives you the ``ScreenGameplay`` table again
local ScreenGameplay = {}

--- Sets whether the game should be paused
---
--- |since_notitg_v1|
---
--- @param pause boolean ``true`` to pause, ``false`` to unpause
---
--- @return void
function ScreenGameplay:PauseGame(pause) end

--- Returns the amount of life remaining for a player
---
--- This is a value between 0 - 1
---
--- |since_notitg_v1|
---
--- @param playerNumber int The player number (0 indexed)
---
--- @return float
function ScreenGameplay:GetLife(playerNumber) end

--- Sets the amount of life remaining for a player
---
--- |since_notitg_v1|
---
--- @param playerNumber int The player number (0 indexed)
--- @param life float The new life percentage to set (0 - 1)
---
--- @return void
function ScreenGameplay:SetLife(playerNumber, life) end

--- Returns a ``ScreenGameplay (MemoryAddress)`` string
---
--- |since_unk|
---
--- @return string
function ScreenGameplay:__tostring() end

return ScreenGameplay
