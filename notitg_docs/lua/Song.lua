--- @class Song
--- @field public __index table Gives you the ``Song`` table again
local Song = {}

--- Returns a list of all steps for the song
---
--- |since_itg|
---
--- @return Step[]
function Song:GetAllSteps() end

--- Returns the path to the song's background image
---
--- Can return ``nil`` if the song has no background image
---
--- |since_itg|
---
--- @return string|nil
function Song:GetBackgroundPath() end

--- Returns the path to the song's banner image
---
--- Can return ``nil`` if the song has no banner image
---
--- |since_itg|
---
--- @return string|nil
function Song:GetBannerPath() end

--- Returns the song title for display
---
--- |since_itg|
---
--- @return string
function Song:GetDisplayMainTitle() end

--- Returns the transliterated song title
---
--- |since_itg|
---
--- @return string
function Song:GetTranslitMainTitle() end

--- Returns the sub title for display
---
--- Returns an empty string is no subtitle is set
---
--- |since_itg|
---
--- @return string
function Song:GetDisplaySubTitle() end

--- Returns the transliterated sub title
---
--- Returns an empty string is no subtitle is set
---
--- |since_itg|
---
--- @return string
function Song:GetTranslitSubTitle() end

--- Returns the main title and sub title for display (``mainTitle .. " " .. subTitle``)
---
--- |since_itg|
---
--- @return string
function Song:GetDisplayFullTitle() end

--- Returns the transliterated main title and sub title (``mainTitleTranslit .. " " .. subTitleTranslit``)
---
--- Returns an empty string is no subtitle is set
---
--- |since_itg|
---
--- @return string
function Song:GetTranslitFullTitle() end

--- Returns the artist name for display
---
--- |since_itg|
---
--- @return string
function Song:GetDisplayArtist() end

--- Returns the transliterated artist name
---
--- |since_itg|
---
--- @return string
function Song:GetTranslitArtist() end

--- Returns whether the song was loaded from a player's USB drive
---
--- |since_itg|
---
--- @return boolean
function Song:IsCustomSong() end

--- Returns the lowest BPM of the song
---
--- |since_notitg_v4|
---
--- @return float
function Song:GetMinBPM() end

--- Returns the highest BPM of the song
---
--- |since_notitg_v4|
---
--- @return float
function Song:GetMaxBPM() end

--- Returns the note data from one of the song's steps
---
--- See :ref:`note_data_format`
---
--- |since_notitg_v4|
---
--- @param steps Steps The steps to fetch note data from
--- @param useSeconds boolean|nil If ``true``, the returned note data will use seconds as the time measurement unit
--- @param startBeat float|nil The start beat number (can be ``nil`` if you want to fetch *all* note data)
--- @param endBeat float|nil The end beat number (can be ``nil`` if you want to fetch *all* note data)
---
--- @return table[]
function Song:GetNoteData(steps, useSeconds, startBeat, endBeat) end

--- Returns a list of spell cards for the song
---
--- See :ref:`spell_card_format`
---
--- |since_notitg_v3|
---
--- @return table[]
function Song:GetSpellCards() end

--- Sets the number of spell cards for a song
---
--- |since_notitg_v3|
---
--- @param count int The number of spell cards
---
--- @return void
function Song:SetNumSpellCards(count) end

--- Sets a spell card's start and end point
---
--- |since_notitg_v3|
---
--- @param index int The spell card index (0 indexed)
--- @param startBeat float The beat to start the spell card
--- @param endBeat float The beat to end the spell card
---
--- @return void
function Song:SetSpellCardTiming(index, startBeat, endBeat) end

--- Sets a spell card's name
---
--- |since_notitg_v3|
---
--- @param index int The spell card index (0 indexed)
--- @param name string The new spell card name
---
--- @return void
function Song:SetSpellCardName(index, name) end

--- Sets a spell card's difficulty rating
---
--- |since_notitg_v3|
---
--- @param index int The spell card index (0 indexed)
--- @param difficulty int The difficulty rating to set
---
--- @return void
function Song:SetSpellCardDifficulty(index, difficulty) end

--- Sets the color of a spell card
---
--- |since_notitg_v3|
---
--- @param index int The spell card index (0 indexed)
--- @param r float The red value (0 - 1)
--- @param g float The green value (0 - 1)
--- @param b float The blue value (0 - 1)
--- @param a float The alpha value (0 - 1)
---
--- @return void
function Song:SetSpellCardColor(index, r, g, b, a) end

--- Returns the directory where the song is stored
---
--- |since_itg|
---
--- @return string
function Song:GetSongDir() end

--- Returns the path to the song's audio file
---
--- |since_notitg_v4|
---
--- @return string
function Song:GetMusicPath() end

--- Returns the length of the music in seconds
---
--- |since_itg|
---
--- @return float
function Song:MusicLengthSeconds() end

--- Returns the length of the steps in seconds
---
--- |since_notitg_v3|
---
--- @return float
function Song:StepsLengthSeconds() end

--- Returns true if the song will cost 2 credits
---
--- |since_itg|
---
--- @return boolean
function Song:IsLong() end

--- Returns true if the song will cost 3 credits
---
--- |since_itg|
---
--- @return boolean
function Song:IsMarathon() end

--- Adds a label to the song
---
--- |since_notitg_v3|
---
--- @param beat float The beat of the label
--- @param name string The name of the label
---
--- @return void
function Song:AddLabel(beat, name) end

--- Returns a list of song labels
---
--- |since_notitg_v3|
---
--- @return table
function Song:GetLabels() end

--- Removes all labels from the song
---
--- |since_notitg_v3|
---
--- @return void
function Song:ClearLabels() end

--- Returns the path to the Lua unlock file
---
--- Returns an empty string if the steps do not exist, or if there is no unlock file
---
--- |since_notitg_v4|
---
--- @param difficulty int The step difficulty (see :cpp:enum:`Difficulty`)
---
--- @return string
function Song:GetUnlockMethod(difficulty) end

--- Returns the name of the group (folder) the song is in
---
--- |since_itg|
---
--- @return string
function Song:GetGroupName() end

--- Returns BPM changes and stop data
---
--- Returns 2 lists of tables - the first one has the format ``{ beat, newBpm }``, the second one has the format ``{ beat, stopDuration }``
---
--- ``local beat_data, stop_data = song:GetTimingData()``
---
--- |since_notitg_v4_0_1|
---
--- @return multiple
function Song:GetTimingData() end

--- Returns the song's genre
---
--- |since_itg|
---
--- @return string
function Song:GetGenre() end

--- Returns the start point of the music preview in seconds
---
--- |since_notitg_v4|
---
--- @return float
function Song:GetSampleStartSeconds() end

--- Returns the length of the music preview in seconds
---
--- |since_notitg_v4|
---
--- @return float
function Song:GetSampleLengthSeconds() end

--- Converts a beat number to a seconds number
---
--- |since_notitg_v3|
---
--- @param beat float The beat to get a seconds number for
---
--- @return float
function Song:GetElapsedTimeFromBeat(beat) end

--- Converts a seconds number to a beat number
---
--- |since_notitg_v3|
---
--- @param seconds float The second to get a beat number for
---
--- @return float
function Song:GetBeatFromElapsedTime(seconds) end

--- Returns a list of steps matching ``stepsType``
---
--- |since_itg|
---
--- @param stepsType int The steps type - see :cpp:enum:`StepsType`
---
--- @return Steps[]
function Song:GetStepsByStepsType(stepsType) end

--- Tests for equality against another userdata object
---
--- |since_unk|
---
--- @param other userdata The object to test for equality against
---
--- @return boolean
function Song:__eq() end

--- Returns a ``Song (MemoryAddress)`` string
---
--- |since_unk|
---
--- @return string
function Song:__tostring() end

return Song
