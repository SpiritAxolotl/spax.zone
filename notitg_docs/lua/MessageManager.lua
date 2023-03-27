--- @class MessageManager
--- @field public __index table Gives you the ``MessageManager`` table again
local MessageManager = {}

--- Broadcasts a message commannd
---
--- See :doc:`/message_commands`
---
--- |since_itg|
---
--- @param message string The message command to broadcast
---
--- @return int
function MessageManager:Broadcast(message) end

--- Check equality with another userdata object
---
--- |since_unk|
---
--- @param other userdata The object to test for equality against
---
--- @return boolean
function MessageManager:__eq(other) end

--- Returns a ``MessageManager (MemoryAddress)`` string
---
--- |since_unk|
---
--- @return string
function MessageManager:__tostring() end

return MessageManager
