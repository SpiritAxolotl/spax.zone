-- NOTE
-- Proxied actors on ActorProxy can be disconnected
    -- Just pass nothing to it, example: ``proxy:SetTarget()``

--- @class ActorProxy: Actor
--- @field public __index table Gives you the ``ActorProxy`` table again
local ActorProxy = {}

--- Sets or clears the target of the actor proxy
---
--- |since_notitg_v1|
---
--- @param actor Actor|nil The actor this proxy will re-draw, or nil to un-set the target (``nil`` is only accepted since |notitg_v4|)
---
--- @return void
function ActorProxy:SetTarget(actor) end

--- Returns the target of the actor proxy
---
--- |since_notitg_v1|
---
--- @return Actor|nil
function ActorProxy:GetTarget() end -- TODO: Check if this actually returns nil or crashes

--- Retruns an ``ActorProxy (MemoryAddress)`` string
---
--- |since_unk|
---
--- @return string
function ActorProxy:__tostring() end

return ActorProxy
