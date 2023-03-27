--- @class FadingBanner: ActorFrame
--- @field public __index table Gives you the ``FadingBanner`` table again
local FadingBanner = {}

--- Loads the banner for a given song
---
--- |since_itg|
---
--- @param song Song The song to load the banner from
---
--- @return void
function FadingBanner:LoadFromSong(song) end

--- Scales the banner to the specified dimmensions
---
--- This is identical to :lua:meth:`Sprite.scaletoclipped`
---
--- |since_itg|
---
--- @param width float The desired width
--- @param height float The desired height
---
--- @return void
function FadingBanner:ScaleToClipped(width, height) end

--- Returns a ``FadingBanner (MemoryAddress)`` string
---
--- |since_unk|
---
--- @return string
function FadingBanner:__tostring() end

return FadingBanner
