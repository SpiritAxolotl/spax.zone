--- @class GameState
--- @field public __index table Gives you the ``GameState`` table again
local GameState = {}

--- Returns the playback speed of the music
---
--- |since_notitg_v2|
---
--- @return float
function GameState:GetMusicRate() end

--- Returns whether the user has edited the song/machine offset
---
--- |since_itg|
---
--- @return boolean
function GameState:IsSyncDataChanged() end

--- Returns the display name for the specified player
---
--- |since_itg|
---
--- @param playerNumber int The player number (0 indexed)
---
--- @return string
function GameState:GetPlayerDisplayName(playerNumber) end

--- Returns the current sort order used for the music wheel
---
--- See the :cpp:enum:`SortOrder` enum
---
--- |since_itg|
---
--- @return int
function GameState:GetSortOrder() end

--- ?
---
--- @param val boolean Unknown
---
--- |since_unk|
---
--- @return void
function GameState:HideStageText(val) end

--- Returns whether we're in edit mode
---
--- |since_notitg_v1|
---
--- @return boolean
function GameState:IsEditMode() end

--- Forcibly crash the game with a given message
---
--- |since_notitg_unk|
---
--- @param message string A message to show on the crash dialog
---
--- @return never
function GameState:Crash(message) end

--- Executes ``cmd`` for both players, at the next "update" of the game (basically the next frame)
---
--- |since_itg|
---
--- @param cmd string The command to execute
---
--- @return void
function GameState:DelayedGameCommand(cmd) end

--- Returns whether players can join the game
---
--- |since_itg|
---
--- @return boolean
function GameState:PlayersCanJoin() end

--- Returns the master player number
---
--- Used in double mode to determine if the user is controlling the game from the P1 or P2 side (0 = player 1, 1 = player 2).
---
--- |since_itg|
---
--- @return int
function GameState:GetMasterPlayerNumber() end

--- Returns a version date string (eg: ``20200126``)
---
--- |since_notitg_v1|
---
--- @return string
function GameState:GetVersionDate() end

--- Gets the source Steps for the editor, or nil if not in edit mode
---
--- |since_itg|
---
--- @return Steps|nil
function GameState:GetEditSourceSteps() end

--- Sets the preferred song to ``song``
---
--- |since_itg|
---
--- @param song Song The song to use
---
--- @return void
function GameState:SetPreferredSong(song) end

--- Returns the preferred song
---
--- |since_itg|
---
--- @return Song
function GameState:GetPreferredSong() end

--- Returns the "real" path for a given virtual path
---
--- It works pretty well with "AdditionalSongFolders"
---
--- Eg: ``GAMESTATE:GetRealPath(GAMESTATE:GetCurrentSong():GetSongDir() .. './fg/default.xml') -- Returns 'D:/AdditionalSongFolder/Group/Song/fg/default.xml'``
---
--- |since_notitg_v4|
---
--- @param path string The path to get the "real" equivalent for
---
--- @return void
function GameState:GetRealPath(path) end

--- Returns the difficulty rating of a current player's steps
---
--- See the :cpp:enum:`Difficulty` enum
---
--- |since_unk|
---
--- @param playerNumber int The player number (0 indexed)
---
--- @return int
function GameState:PlayerDifficulty(playerNumber) end

--- Returns the current play mode
---
--- Not entirely sure if the play mode enum has changed since ITG and SM5, but here's the SM5 docs for PlayMode: https://quietly-turning.github.io/Lua-For-SM5/LuaAPI#Enums-PlayMode
---
--- |since_itg|
---
--- @return int
function GameState:GetPlayMode() end

--- Returns whether a given player has joined the game
---
--- |since_itg|
---
--- @param playerNumber int The player number (0 indexed)
---
--- @return boolean
function GameState:IsSideJoined(playerNumber) end

--- Executes cmd, for either a specific player or both players
---
--- |since_itg|
---
--- @param cmd string The command to execute
--- @param playerNumber int|nil The player number to apply the command to (1 indexed - nil to apply it to both players)
---
--- @return void
function GameState:ApplyGameCommand(cmd, playerNumber) end

--- ?
---
--- |since_notitg_unk|
---
--- @param num number Unknown
---
--- @return void
function GameState:SetSRT(num) end

--- Returns whether event mode is enabled
---
--- |since_itg|
---
--- @return boolean
function GameState:IsEventMode() end

--- Enable/disable the tempoary event mode
---
--- |since_itg|
---
--- @param enable boolean Whether tempoary event mode should be enabled or not
---
--- @return void
function GameState:SetTemporaryEventMode(enable) end

--- Returns the current premium mode
---
--- See the :cpp:enum:`Premium` enum
---
--- |since_itg|
---
--- @return int
function GameState:GetPremium() end

--- An optimized shortcut for ``GameState.ApplyGameCommand("mod,...")``
---
--- Since |notitg_v4_2_0|, this will throw a Lua error with an invalid ``playerNumber``
---
--- |since_notitg_v2|
---
--- @param mods string A mod string to apply
--- @param playerNumber int|nil An optional player number to apply mods to (1 indexed)
---
--- @return void
function GameState:ApplyModifiers(mods, playerNumber) end

--- Simulates a key press
---
--- |since_notitg_v1|
---
--- @param key int The key code
---
--- @return void
function GameState:KeyPress(key) end

--- Temporarily override a user's ``SmoothLines`` preference for one song
---
--- |since_notitg_v4|
---
--- @param enable int 0 to force disable, 1 to force enable, -1 to reset
---
--- @return void
function GameState:ForceSmoothLines(enable) end

--- ?
---
--- |since_notitg_unk|
---
--- @param enable boolean Whether shaders should be recompiled on window resize??
---
--- @return void
function GameState:RecompileShadersOnResize(enable) end

--- Gets the X position of a note located in the column ``column``
---
--- Used for calculating manually where a note should be based on which modifiers are active and its vertical position.
---
--- |since_notitg_v2|
---
--- @param playerNumber int Which playfield to use (0 indexed)
--- @param column int Which column to use (0 or greater)
--- @param yOffset float The vertical offset of the note compared to the receptors
---
--- @return float
function GameState:GetX(playerNumber, column, yOffset) end

--- Gets the Y position of a note located in the column ``column``
---
--- Used for calculating manually where a note should be based on which modifiers are active and its vertical position.
---
--- |since_notitg_v2|
---
--- @param playerNumber int Which playfield to use (0 indexed)
--- @param column int Which column to use (0 or greater)
--- @param yOffset float The vertical offset of the note compared to the receptors
---
--- @return float
function GameState:GetY(playerNumber, column, yOffset) end

--- Gets the Z position of a note located in the column ``column``
---
--- Used for calculating manually where a note should be based on which modifiers are active and its vertical position.
---
--- |since_notitg_v2|
---
--- @param playerNumber int Which playfield to use (0 indexed)
--- @param column int Which column to use (0 or greater)
--- @param yOffset float The vertical offset of the note compared to the receptors
---
--- @return float
function GameState:GetZ(playerNumber, column, yOffset) end

--- Returns whether the specified player is using the specified modifier
---
--- |since_itg|
---
--- @param playerNumber int The player number (0 indexed)
--- @param modifier string The modifier to check
---
--- @return boolean
function GameState:PlayerIsUsingModifier(playerNumber, modifier) end

--- Returns whether the specified player is disqualified
---
--- |since_itg|
---
--- @param playerNumber int The player number (0 indexed)
---
--- @return boolean
function GameState:IsDisqualified(playerNumber) end

--- Changes the input mode
---
--- |since_notitg_v1|
---
--- See the :cpp:enum:`InputMode` enum
---
--- @param inputMode int The new input mode to set
---
--- @return void
function GameState:SetInputMode(inputMode) end

--- Returns the current input mode
---
--- |since_notitg_v1|
---
--- See the :cpp:enum:`InputMode` enum
---
--- @return int
function GameState:GetInputMode() end

--- Gets the short name for the player ``playerNumber``
---
--- |since_notitg_v1|
---
--- @param playerNumber int The player number (0 indexed)
---
--- @return string
function GameState:GetPlayerNameFromNameEntry(playerNumber) end

--- Returns whether the given player is human (as opposed to being AI controlled)
---
--- |since_itg|
---
--- @param playerNumber int The player number (0 indexed)
---
--- @return boolean
function GameState:IsHumanPlayer(playerNumber) end

--- Returns whether the given player is enabled
---
--- |since_itg|
---
--- @param playerNumber int The player number (0 indexed)
---
--- @return boolean
function GameState:IsPlayerEnabled(playerNumber) end

--- Joins the specified player, without deducting any coin
---
--- |since_notitg_v1|
---
--- @param playerNumber int The player number (0 indexed)
function GameState:JoinPlayer(playerNumber) end

--- Returns the current coin mode
---
--- See the :cpp:enum:`CoinMode` enum
---
--- |since_itg|
---
--- @return int
function GameState:GetCoinMode() end

--- Returns the number of remaining coins
---
--- |since_itg|
---
--- @return int
function GameState:GetCoins() end

--- Returns the easiest difficulty chosen by players
---
--- See the :cpp:enum:`Difficulty` enum
---
--- |since_itg|
---
--- @return int
function GameState:GetEasiestStepsDifficulty() end

--- Registers an attack (some mod activations) to be launched at a specific moment
---
--- This attack will disable any currently active Lua mods. It's recommended to call this method in an InitCommand, as this can generate some lag spikes.
---
--- |since_notitg_v2|
---
--- @param startTime float The time (in seconds) where the attack should start
--- @param length float The length of an attack in seconds (0 or greater)
--- @param mods string The mod string to apply
--- @param playerNumber int|nil The player to apply the mods for (1 indexed) - if nil, apply to both players
---
--- @return void
function GameState:LaunchAttack(startTime, length, mods, playerNumber) end

--- Sets a number on a static external memory address
---
--- This address is `0x008BE0F8` for |notitg_v3_1|
---
--- Since |notitg_v4_2_0|, the number of external slots has been increased from 64 to 256.
---
--- |since_notitg_v3|
---
--- @param index int Index of the external (0 - 255)
--- @param flag int Index of the external
---
--- @return void
function GameState:SetExternal(index, flag) end

--- Gets a number on a static external memory address
---
--- Since |notitg_v4_2_0|, the number of external slots has been increased from 64 to 256.
---
--- |since_notitg_v3|
---
--- @param index int Index of the external (0 - 255)
---
--- @return void
function GameState:GetExternal(index) end

--- Sets the current playback position of the song
---
--- You need to run :lua:meth:`GameState.ReloadSteps` after calling this if you want arrows to update properly.
---
--- |since_notitg_v1|
---
--- @param beat float The beat to teleport to
---
--- @see GameState#ReloadSteps
function GameState:SetSongBeat(beat) end

--- Gets the current playback position of the song, in beats
---
--- |since_itg|
---
--- @return float
function GameState:GetSongBeat() end

--- Gets the current playback position of the song, in beats, without offsets/visual delays
---
--- Interestingly, this seems to return the same value as :lua:meth:`GameState.GetSongBeat`, even if you have a global audio offset. You might have better luck with ``GAMESTATE:GetSongBeat() + (PREFSMAN:GetPreference('GlobalOffsetSeconds') * GAMESTATE:GetCurBPS())``.
---
--- |since_itg|
---
--- @return float
function GameState:GetSongBeatVisible() end

--- Sets the current playback position of the song
---
--- You need to run :lua:meth:`GameState.ReloadSteps` after calling this if you want arrows to update properly.
---
--- |since_notitg_v1|
---
--- @param position float The position to teleport to (in seconds)
---
--- @return void
---
--- @see GameState#ReloadSteps
function GameState:SetSongPosition(position) end

--- Returns the current playback position of the playing song in seconds
---
--- |since_notitg_v2|
---
--- @return float
function GameState:GetSongTime() end

--- Returns the current playback position of the playing song in seconds, without visual offsets/delays (supposedly)
---
--- Interestingly, this seems to return the same value as ``GAMESTATE:GetSongTime()``, even if you have a global audio offset. You might have better luck with ``GAMESTATE:GetSongTime() + PREFSMAN:GetPreference('GlobalOffsetSeconds')``.
---
--- |since_notitg_v2|
---
--- @return float
function GameState:GetSongTimeVisible() end

--- Returns the current number of beats per second (BPS)
---
--- Prefer ``GAMESTATE:GetCurBPM()`` over ``GAMESTATE:GetCurBPS() * 60`` to get a more accurate value for beats per minute.
---
--- |since_itg|
---
--- @return float
---
--- @see GameState#GetCurBPM
function GameState:GetCurBPS() end

--- Returns the current number of beats per minute (BPM)
---
--- |since_notitg_v4_0_1|
---
--- @return float
---
--- @see GameState#GetCurBPS
function GameState:GetCurBPM() end

--- Reloads the steps
---
--- This is required after changing the song position to update the arrows (Eg: with :lua:meth:`GameState.SetSongBeat`)
---
--- |since_notitg_v1|
---
--- @return void
---
--- @see GameState#SetSongBeat
--- @see GameState#SetSongPosition
function GameState:ReloadSteps() end

--- Unloads the steps for the specified player
---
--- |since_notitg_v2|
---
--- @param playerNumber int The player number (0 indexed)
---
--- @return void
function GameState:UnloadSteps(playerNumber) end

--- Finishes/ends a song
---
--- This is equivalent to the "Send Noted Ended" option in the debug (F3) menu.
---
--- |since_notitg_v1|
---
--- @return void
function GameState:FinishSong() end

--- Returns whether the specified player has completed their current goal
---
--- |since_itg|
---
--- @param playerNumber int The player number (0 indexed)
---
--- @return boolean
function GameState:IsGoalComplete(playerNumber) end

--- Returns the current steps for the specified player
---
--- |since_itg|
---
--- @param playerNumber int The player number (0 indexed)
---
--- @return Steps
function GameState:GetCurrentSteps(playerNumber) end

--- Sets the current steps for the specified player
---
--- |since_itg|
---
--- @param playerNumber int The player number (0 indexed)
--- @param steps Steps The steps to use
---
--- @return void
function GameState:SetCurrentSteps(playerNumber, steps) end

--- Sets the current song to ``song``
---
--- |since_itg|
---
--- @param song Song The song to use
---
--- @return void
function GameState:SetCurrentSong(song) end

--- Returns the current song
---
--- |since_itg|
---
--- @return Song
function GameState:GetCurrentSong() end

--- Returns the current trail for the specified player
---
--- |since_itg|
---
--- @param playerNumber int The player number (0 indexed)
---
--- @return Trail|nil
function GameState:GetCurrentTrail(playerNumber) end

--- Sets the current course to ``course``
---
--- |since_itg|
---
--- @param course Course The course to use
---
--- @return void
function GameState:SetCurrentCourse(course) end

--- Returns the current course
---
--- |since_itg|
---
--- @return Course
function GameState:GetCurrentCourse() end

--- Get the number of sides (players) joined
---
--- |since_itg|
---
--- @return int
function GameState:GetNumSidesJoined() end

--- Returns names from files and directories that match path
---
--- This function returns a variable number of strings - you should probably wrap it up into a table.
---
--- **Example:**
---
--- ``local matches = { GAMESTATE:GetFileStructure('Co') }``
---
--- ``matches`` will contain ``{ "copyright.txt", "Courses" }``
---
--- |since_notitg_v1|
---
--- @param path string The path to match
---
--- @return multiple
function GameState:GetFileStructure(path) end

--- Returns whether the given player is the winner
---
--- |since_itg|
---
--- @param playerNumber int The player number (0 indexed)
---
--- @return boolean
function GameState:IsWinner(playerNumber) end

--- ?
---
--- |since_notitg_v1|
---
--- @return boolean
function GameState:GetDerp() end

--- Returns the number of enabled players (1 indexed)
---
--- |since_itg|
---
--- @return int
function GameState:GetNumPlayersEnabled() end

--- Sets the screen's ID
---
--- |since_notitg_v1|
---
--- @param id int The new ID
---
--- @return void
function GameState:SetScreenID(id) end

--- Returns the current screen's ID
---
--- Will return 573555 if in ``ScreenGameplay`` or if playing in ``ScreenEdit``, 0 otherwise.
---
--- |since_notitg_v1|
---
--- @return int
function GameState:GetScreenID() end

--- Returns a table of note skin names currenty in use
---
--- Example output: ``{ "scalable", "cyber" }`` if player 1 is using the scalable note skin, and player 2 is using
--- cyber. This seems to be set to ``{ "default", "default" }`` often when opening mod files though, so not sure what's
--- up with that.
---
--- |since_notitg_v4|
---
--- @return table
function GameState:GetCurrentNoteSkins() end

--- Returns true if any player has performed a ranked game (= not disqualified from ranking).
---
--- |since_itg|
---
--- @return boolean
function GameState:AnyPlayerHasRankingFeats() end

--- Gets the preferred difficulty for specified player
---
--- See the :cpp:enum:`Difficulty` enum
---
--- |since_itg|
---
--- @param playerNumber int The player number (0 indexed)
---
--- @return int
function GameState:GetPreferredDifficulty(playerNumber) end

--- Gets the number of additional coins needed to join
---
--- Eg: If 3 coins are needed, and 1 is inserted, this function will return 2
---
--- |since_itg|
---
--- @return int
function GameState:GetCoinsNeededToJoin() end

--- Returns whether we're in double mode
---
--- |since_itg|
---
--- @return int
function GameState:PlayerUsingBothSides() end

--- Returns the current game
---
--- |since_itg|
---
--- @return Game
function GameState:GetCurrentGame() end

--- Are we in marathon mode?
---
--- |since_itg|
---
--- @return boolean
function GameState:IsCourseMode() end

--- Returns whether a demonstration is currently running
---
--- |since_itg|
---
--- @return boolean
function GameState:IsDemonstration() end

--- Returns the environment table of the game
---
--- |since_itg|
---
--- @return table
---
--- @see GameState#GetEnv
--- @see GameState#SetEnv
function GameState:Env() end

--- Gets a value stored in the game's environment table
---
--- Returns ``nil`` if the key doesn't exist
---
--- |since_itg|
---
--- @param key string The key to fetch a value for
---
--- @return string|nil
---
--- @see GameState#Env
--- @see GameState#SetEnv
function GameState:GetEnv(key) end

--- Stores a value in the game's environment table
---
--- |since_itg|
---
--- @param key string The key to store a value for
--- @param value string The value to store
---
--- @return void
---
--- @see GameState#Env
--- @see GameState#GetEnv
function GameState:SetEnv(key, value) end

--- Returns whether the current stage is the extra stage
---
--- This function is also accessible via the *global* function ``IsExtraStage()``
---
--- |since_itg|
---
--- @return boolean
function GameState:IsExtraStage() end

--- Returns whether the current stage is the second extra stage
---
--- This function is also accessible via the *global* function ``IsExtraStage2()``
---
--- |since_itg|
---
--- @return boolean
function GameState:IsExtraStage2() end

--- Returns the current song's index, starting at ``1``
---
--- |since_itg|
---
--- @return int
function GameState:StageIndex() end

--- Returns the index of the current song in the current course, starting at ``0``
---
--- |since_itg|
---
--- @return int
function GameState:GetCourseSongIndex() end

--- Sets when the song should end
---
--- |since_notitg_v4_2_0|
---
--- @param seconds float The time the song should end, in seconds
---
--- @return void
function GameState:SetSongEndTime(seconds) end

--- Set whether the mod selection should be limited to just the ones available in OpenITG
---
--- This will disqualify you
---
--- |since_notitg_v4_2_0|
---
--- @param enable bool Whether only OpenITG mods should be allowed or not
---
--- @return void
function GameState:OnlyOpenITGMods(enable) end

--- Check equality with another userdata object
---
--- Have you ever wanted to check whether the GameState object, of which there is only ever one, is equal to another GameState? No? Well it's your lucky day!
--- oh.. and this likes to crash if you don't give it a userdata object - want to check if a GameState is equal to 42? bam, access violation
---
--- |since_unk|
---
--- @param other userdata The object to test for equality against
---
--- @return boolean
function GameState:__eq(other) end

--- Returns a ``GameState (MemoryAddress)`` string
---
--- |since_unk|
---
--- @return string
function GameState:__tostring() end

return GameState
