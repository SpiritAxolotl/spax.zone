--- @class RageTexture
--- @field public __index table Gives you the ``RageTexture`` table again
local RageTexture = {}

--- Returns the width of the texture
---
--- This will always be a power-of-two. For example, an image with a size of 1920x1080 will be loaded into a 2048x2048 texture
---
--- |since_notitg_v1|
---
--- @return float
function RageTexture:GetTextureWidth() end

--- Returns the height of the texture
---
--- This will always be a power-of-two. For example, an image with a size of 1920x1080 will be loaded into a 2048x2048 texture
---
--- |since_notitg_v1|
---
--- @return float
function RageTexture:GetTextureHeight() end

--- Returns the image width, without padding
---
--- For example, a 1920x1080 image will return 1920, despite the texture padding the width out to 2048
---
--- |since_notitg_v1|
---
--- @return float
function RageTexture:GetImageWidth() end

--- Returns the image height, without padding
---
--- For example, a 1920x1080 image will return 1080, despite the texture padding the height out to 2048
---
--- |since_notitg_v1|
---
--- @return float
function RageTexture:GetImageHeight() end

--- Returns the width of the texture's source
---
--- |since_notitg_v1|
---
--- @return float
function RageTexture:GetSourceWidth() end

--- Returns the height of the texture's source
---
--- |since_notitg_v1|
---
--- @return float
function RageTexture:GetSourceHeight() end

--- Returns the bounding rectangle of an image on a texture
---
--- This function returns multiple values - use it as such:
---
--- ``local left, top, right, bottom = texture:GetTextureCoordRect(0)``
---
--- |since_notitg_v1|
---
--- @param frame int The frame number to fetch the rect for (0 indexed)
---
--- @return multiple
function RageTexture:GetTextureCoordRect(frame) end

--- Returns the filepath where a texture was loaded from
---
--- Note that not all texture originate from a valid path. For example, a texture created by an :lua:class:`ActorFrameTexture` has a path like ``ActorFrameTexture 2``.
---
--- |since_notitg_v1|
---
--- @return string
function RageTexture:GetPath() end

--- Reloads the texture from the drive
---
--- Returns a function - not sure why, but calling it seems to cause a crash (access violation)
---
--- |since_notitg_v1|
---
--- @return function
function RageTexture:Reload() end

--- Returns the number of frames in an animated texture
---
--- |since_notitg_v1|
---
--- @return int
function RageTexture:GetNumFrames() end

--- Sets the playback position of an animated texture
---
--- |since_notitg_v1|
---
--- @param position float The new playback positon to set
---
--- @return void
function RageTexture:position() end

--- Sets whether an animated texture should loop or not
---
--- |since_notitg_v1|
---
--- @param enable boolean ``true`` to loop the animation, ``false`` to not loop
---
--- @return void
function RageTexture:loop() end

--- Sets the playback rate of an animated texture
---
--- |since_notitg_v1|
---
--- @param rate float The playback rate to set
---
--- @return void
function RageTexture:rate() end

--- Tests for equality against another userdata object
---
--- |since_unk|
---
--- @param other userdata The object to test for equality against
---
--- @return boolean
function RageTexture:__eq(other) end

--- Returns a ``RageTexture (MemoryAddress)`` string
---
--- |since_unk|
---
--- @return string
function RageTexture:__tostring() end

return RageTexture
