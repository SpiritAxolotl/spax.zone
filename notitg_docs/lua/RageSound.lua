--- @class RageSound
--- @field public __index table Gives you the ``RageSound`` table again
local RageSound = {}

--- Plays the sound from the beginning
---
--- If you want to resume a paused sound, use :lua:meth:`RageSound.Pause`
---
--- |since_notitg_v3|
---
--- @return void
function RageSound:Play() end

--- Stops the sound
---
--- |since_notitg_v3|
---
--- @return void
function RageSound:Stop() end

--- Pauses/resumes sound playback
---
--- Overridden from :lua:meth:`Actor.pause`
---
--- |since_notitg_v3|
---
--- @param enable boolean ``true`` to pause, ``false`` to unpause
---
--- @return void
function RageSound:Pause() end

--- Returns whether the sound is paused
---
--- |since_notitg_v3|
---
--- @return boolean
function RageSound:IsPaused() end

--- Returns whether the sound is "playing"
---
--- Will still return true even if the sound is paused
---
--- |since_notitg_v3|
---
--- @return boolean
function RageSound:IsPlaying() end

--- Sets the sound's volume
---
--- |since_notitg_v1|
---
--- @param volume float The new volume to set (0 - 1)
---
--- @return void
function RageSound:volume(volume) end

--- Returns the sound's volume
---
--- |since_notitg_v3|
---
--- @return float
function RageSound:GetVolume() end

--- Sets the sound's panning
---
--- |since_notitg_v1|
---
--- @param balance float The new panning to apply (0 = left, 0.5 = center, 1 = right)
---
--- @return void
function RageSound:pan(balance) end

--- Returns the sound's panning
---
--- |since_notitg_v3|
---
--- @return float
function RageSound:GetPan() end

--- Sets the sound's playback speed
---
--- |since_notitg_v1|
---
--- @param speed float The new speed to apply (0 - 100)
---
--- @return void
function RageSound:speed(speed) end

--- An alias for :lua:meth:`RageSound.speed`
---
--- |since_notitg_v1|
---
--- @param speed float The new speed to apply (0 - 100)
---
--- @return void
function RageSound:pitch() end

--- Sets the current sound's playback position, in seconds
---
--- |since_notitg_v3|
---
--- @return void
function RageSound:SetSoundPosition() end

--- Returns the current sound's playback position, in seconds
---
--- |since_notitg_v3|
---
--- @return float
function RageSound:GetSoundPosition() end

--- Sets the sound's start point, in seconds
---
--- |since_notitg_v3|
---
--- @param start float The new start point, in seconds
---
--- @return void
function RageSound:startsecond() end

--- Returns the start point, in seconds
---
--- |since_notitg_v3|
---
--- @return float
function RageSound:GetStartSecond() end

--- Returns the length of the sound, in seconds
---
--- |since_notitg_v3|
---
--- @return float
function RageSound:GetLengthSeconds() end

--- Sets the sound's stop mode
---
--- A stop mode of ``auto`` will reset it to the default
---
--- |since_notitg_v3|
---
--- @param mode string The new stop mode to set (``stop``, ``loop``, ``continue``, ``auto``)
---
--- @return void
function RageSound:stopmode() end

--- Returns the sound's stop mode
---
--- |since_notitg_v3|
---
--- @return string
function RageSound:GetStopMode() end

--- Sets a sound property
---
--- |since_notitg_v1|
---
--- @param param string The parameter to set (``StartSecond``, ``Pitch``, ``Speed``, ``Pan``, ``Volume``)
--- @param value float The value to assign
---
--- @return void
function RageSound:SetParam(param, value) end

--- Loads a new sound
---
--- |since_notitg_v3|
---
--- @param path string The filepath of the new sound file to load
---
--- @return void
function RageSound:Load(path) end

--- Tests for equality against another userdata object
---
--- |since_unk|
---
--- @param other userdata The object to test for equality against
---
--- @return boolean
function RageSound:__eq(other) end

--- Returns a ``RageSound (MemoryAddress)`` string
---
--- |since_unk|
---
--- @return string
function RageSound:__tostring() end

return RageSound
