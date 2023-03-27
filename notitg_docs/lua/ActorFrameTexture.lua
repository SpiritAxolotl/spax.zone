--- @class ActorFrameTexture: ActorFrame
--- @field public __index table Gives you the ``ActorFrameTexture`` table again
local ActorFrameTexture = {}

--- Creates the render target - you must call this before using an ActorFrameTexture
---
--- This should be called after configuring the ActorFrameTexture (using methods such as :lua:meth:`EnableDepthBuffer` and what not)
---
--- |since_notitg_v1|
---
--- @return void
function ActorFrameTexture:Create() end

--- Recreates the render target
---
--- |since_notitg_unk| (|notitg_v4| or earlier?)
---
--- @return void
function ActorFrameTexture:Recreate() end

--- Sets whether the render target should have an alpha buffer
---
--- This is disabled by default
---
--- |since_notitg_v1|
---
--- @param enable boolean Whether an alpha buffer should be created
---
--- @return void
function ActorFrameTexture:EnableAlphaBuffer(enable) end

--- Sets whether the render target should have a depth buffer/Z buffer
---
--- This is disabled by default
---
--- |since_notitg_v1|
---
--- @param enable boolean Whether a depth buffer should be created
---
--- @return void
function ActorFrameTexture:EnableDepthBuffer(enable) end

--- Sets whether the render target should be grayscale
---
--- This is disabled by default
---
--- |since_notitg_v2|
---
--- @param enable boolean Whether the render target should be grayscale
---
--- @return void
function ActorFrameTexture:EnableGrayscale() end

--- Sets whether the render target should be cleared before drawing to it
---
--- If preserve texture is enabled, then the render target will not be cleared when rendering.
---
--- This is disabled by default (ie: it defaults to clearing the target before rendering)
---
--- |since_notitg_v1|
---
--- @param enable boolean Whether preserve texture should be enabled or not
---
--- @return void
function ActorFrameTexture:EnablePreserveTexture(enable) end

--- Sets whether the ActorFrameTexture should use floating point buffers
---
--- This is disabled by default
---
--- |since_notitg_v1|
---
--- @param enable boolean Whether floating point buffers should be used
---
--- @return void
function ActorFrameTexture:EnableFloat() end

--- Returns the texture/render target
---
--- |since_notitg_v1|
---
--- @return RageTextureRenderTarget
function ActorFrameTexture:GetTexture() end

--- Sets the name of the texture
---
--- This can be used to reference the ActorFrameTexture's texture/render target from another actor
---
--- |since_notitg_v1|
---
--- @param name string The new name for the texture
---
--- @return void
function ActorFrameTexture:SetTextureName(name) end

--- Returns the texture's name
---
--- |since_notitg_v1|
---
--- @return string
function ActorFrameTexture:GetTextureName() end

--- Returns an ``ActorFrameTexture (MemoryAddress)`` string
---
--- |since_unk|
---
--- @return string
function ActorFrameTexture:__tostring() end

return ActorFrameTexture
