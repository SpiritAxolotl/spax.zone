NotITG versions
===============

Downloads
---------

The latest version of NotITG can be downloaded from https://notitg.heysora.net/. Older versions are available from the
StepMania Builds Archive (https://josevarela.xyz/SMArchive/Builds/index.html).

|notitg_v4_icon_16| NotITG v4.2.0 (2021-04-20)
------------------------------------------------
Quickstart download (Windows): https://notitg.heysora.net/files/NotITG-4.2.0-QuickStart.zip

Program download (Windows): https://notitg.heysora.net/files/NotITG-4.2.0-Program.zip

Accompanying Simply Love theme: https://notitg.heysora.net/files/SimplyLove-4.2.0.zip

Changelog
^^^^^^^^^

**💡 New Features!**

- Changed how Lua errors are displayed
    - They now point to the correct line in your xml or ini files
    - They also tell you which file the error happened in
- Metamods
    - They mod your mods
    - They can be applied only from the theme options, they can't be toggled from a simfile!
    - The "Flip" on the v4/1-april-fools build was a metamod
    - ``metaflip``, ``metainvert``, ``metaorient``, ``metareverse``, ``metastealth``, ``metadizzy``
    - They are just for fun, so they will disqualify your score
        - Imagine having MetaInvert on Red and Blue
- Drag and drop songs support
    - Drag a song folder onto the game window, the song will be loaded while the game is running!
    - If you are in the song selection screen, the wheel will automatically go to the new song
    - The song will be placed in ``/Songs/_drag_and_drop/``
        - Configurable in NotITGPrefs.ini: ``DragAndDropSongGroup``
- Preference ``Borderless``
    - Can be freely used with ``Windowed=0`` or 1!
    - Borderless + Windowed=0 will set the screen resolution to the wanted one, as usual, but clicking outside of the game won't hide it, like a regular borderless fullscreen!
    - Borderless + Windowed=1 will behave as usual, but the game will simply not have a border.
    - ``DISPLAY:SetBorderless( bool )`` **allow simfiles to toggle this!** This is still controlled by the ``AllowWindowPos`` preference.
    - If the borderless status has been changed by ``DISPLAY:SetBorderless()``, it will reset at the end of the song, just like other Lua window manipulations.
    - The status is also resetted by doing F3+8.
- Preference ``ShowComboInEditor`` is fairly self explanatory!
    - Defaults to "on", can be adjusted from the editor's ESC -> Preferences menu.
- Set custom song end time via lua with ``GAMESTATE:SetSongEndTime( seconds )``
- Preference ``EditorPlayModeOffset`` lets you choose how much time (seconds) behind the cursor the game will start playing from when you switch from editing mode to playtest mode.
    - Defaults to 1 to match normal StepMania behavior, but can be adjusted from the editor's ESC -> Preferences menu.
- Added ``ScreenReadyCommand`` for gameplay
    - Runs before the songs starts
    - TopScreen is guaranteed to be available
    - ``xml <Layer ScreenReadyCommand="%function(self) local s = SCREENMAN:GetTopScreen() -- This will be ScreenGameplay end" />``
- Preference ``SleepCpuWhenUnfocused``
    - Defaults to 1 (old behaviour)
    - Disable this if you want the game to run full speed at all times, including when you switch windows/alt-tab
- Preference ``BothAtOnceAffectsDifficulties``
    - Defaults to 1 (new behavior)
    - If BothAtOnce is on, changing difficulty at song select will change difficulty for both players to ensure they have the same difficulty.
- Preference ``DisqualifyCover`` allows you to choose whether "Cover" (Hide Background) mod disqualifies your score.
    - Set to 1 by default, to match the existing openITG behavior
    - Will not have any effect if ``Disqualification`` preference is already 0
- Preference ``FailOffForFirstStage`` allows you specify whether or not the first stage of a credit has "FailOff" enabled.
- Preference ``DiscardFailOffFailedScore`` allows you to not save scores that were "failed" when playing using failoff.
- Preference ``AutoDisableBothAtOnce`` causes BothAtOnce to be disabled automatically on ScreenTitle init, for arcade purposes.
- New ScreenTitleMenu Code: ``BothAtOnce``, that toggles the BothAtOnce, for arcade purposes.
- F3+0 now toggles between edit mode and song select
- Add function ``PlayerStageStats:GetCurPossibleDancePoints()``
    - Which is very useful to calculate subtractive score in lua
- Add functions to get/delete scores of courses
    - ``profile:GetHighScoreForCourseAndTrail(course, difficulty, stepsType)``
    - ``profile:ClearHighScoresForCourseAndTrail(course, difficulty, stepsType)``
    - ``profile:ClearHighScoresForCourse(course)``
- Add a method to get the stepsType of a trail
    - ``trail:GetStepsType()``
- ``actor:tween(t, f)`` now accepts a function
    - ``xml <Layer OnCommand="%function(self) self:tween(4, function(t) return someEase(t) end) end" />``
- Added ``GAMESTATE:OnlyOpenITGMods(true/false)``
    - This restricts the mods to only the ones available in OpenITG
    - Will disqualify you
- ``LUA_PATH`` is now set by the game
    - This means you can now use ``dofile``, ``loadfile``, etc to load .lua files
    - From anywhere in the game, it searches in the current theme folder
    - From within a song, the current song folder takes priority

**⚡ Enhancements**

- Project Outfox provided some updates and enhancements
    - Several math optimizations
    - Library updates
    - Render stats now show memory usage
    - Thank you Project Outfox!
- Theme switcher has been modified and should switch themes without error
    - Even Simply Love based themes!
- ``ApplyModifiers`` now throws a Lua error if you give it an invalid player number
- ``NOTESKIN:GetPath`` does not crash the game anymore
    - It returns the theme missing graphic if it can't find the noteskin element
- Several memory leaks have been fixed. ``bad allocation`` errors should not happen anymore.
- ``DISPLAY:SetWindowPosition[AndSize]()`` have been fixed for accounting window borders!
    - They used to resize the window wrongly, e.g. having a 640x480 game could result in a 636x471 game (because it accounted for Windows 10 borders)
    - They now resize the actual game, borderless or not!
    - They set the position relative to the actual game, and not the window (+ borders)
        - Their position is now accurate no matter if the game is borderless or not: the game will ALWAYS be at the same position, if we provide the same values to the methods. (So, a position of e.g. (40;40) will make the game be at the SAME place, borderless or not.)
    - Before this change, on Exschwasion's ETERNALLY file : `Video <https://i.heysora.net/vEe25pEq.mp4>`__
    - After this change (lua is unchanged): `Video <https://i.heysora.net/B66aeuLS.mp4>`__
- ``GAMESTATE:GetRealPath()`` has been slightly tweaked for accounting specific edge cases (noticeeably with the presence of patch.zip) and should now always work no matter the setup.
- The External memory (used by ``GAMESTATE:GetExternal()`` and ``:SetExternal()``) got its size increased from 64 to 256.
- The ``Toasty`` theme element is named
- Lights had their indexes reverted to pre-v3.1
    - Parallel lights has been changed to account for this
- Song offset keys (F11/F12) in Edit mode has been swapped
    - It now matches syncing offset in ScreenGameplay
- Removed some very chatty log traces from FFmpeg
- Several Edit Mode changes:
    - Current Beat, BPM, Time and mods display in Edit Mode does not move with TopScreen anymore
        - This means you can screen bounce as much as you want, the mods display will stay in place
    - Actor order for Edit Mode now matches actor order in Gameplay
    - Player 2 steps are now set, fixes errors in scripts querying both players
- Attempts to use non-existing mods will print warnings to the Log
    - Edit Mode will also show a SystemMessage
    - Enable NotITGPrefs ``AlwaysShowUnknownModsSystemMessage`` if you want the message to be shown outside of Edit Mode as well
- The maximum texture size's hardcoded limit has been increased from 2048 to 4096
- doing ``SetTexture`` on a Shader with an invalid texture no longer crashes the game with "Nice texture, idiot."
- Editor's "Jump to beat" text field now starts empty.
- Score actors will no longer appear in the editor.
    - It is still possible to unhide them with ``SCREENMAN:GetTopScreen():GetChild('ScoreP1'):playcommand('Show')``
- ``BothAtOnce`` being enabled counts as joint premium (one credit needed to join both sides) for coin purposes.
- Jump between spellcards in the editor using ``Alt`` + ``,`` / ``Alt`` + ``.``
- ``hidenoteflash`` timing has been greatly improved so it's now instant.
- ``UpdateFunction`` now shows a dialog on error, it also unsets the function to prevent getting stuck.
    - Patch provided by XeroOl
- ``player:IsUsingReverse()`` see whether the player is using reverse or not
    - It's just seeing the reverse of column 0 (left in dance)
    - Intended to be used by themes
- Added ``sprite:GetNumStates()``
- Other Edit mode changes
    - Enabling ``MetaReverse`` lets you edit in reverse
    - Render distance past the receptors has been increased
    - Scroll animations are back, but are more snappier than before
- All non-LGPL DLLs are now embedded in the .exe

**⤴ New Mods**

- ``randomvanish`` has been split into two mods, ``randomize`` and ``vanish``, which control the two aspects of the original mod seperately.
    - Vanish makes the arrows disappear for a bit at a spot in the middle of the screen.
    - Randomize shuffles the notes while they are within the "invisibe" region created by Vanish.
    - ``randomvanish`` is now a macro that enables both.
    - ``vanishoffset`` and ``randomizeoffset`` controls the location where the event takes place, ``randomvanishoffset`` controls both simultaneously.
    - Choose which turn mod is being applied to each player during the "randomize" event with ``Player:SetRandomVanishTransform( 'swapupdown' )``.
    - The default is ``supershuffle``, to match the original ``randomvanish`` implementation.
    - All existing turn modes are usable (``left``, ``right``, ``mirror``, ``swapleftright``, ``swapupdown``, ``couplesmirror``, ``couplesswapsides``, ``shuffle``, ``softshuffle``, ``spookyshuffle`` and ``supershuffle``)
- ``scrollspeedmult<n>`` multiply speed mod of a single column.
    - does not have a non-col specific version - attempting to apply it without a specified column will just apply all col specific versions.
    - default value is 100%. 50% is half scroll speed.
- ``zigzag<n>`` and ``sawtooth<n>``, sawtooth and zigzag waves are finally column specific.
    - these naturally come with accompanying periods and offsets, i.e. ``zigzagperiod<n>`` and ``zigzagoffset<n>``
- ``dizzy<n>``, ``twirl<n>`` and ``roll<n>`` join the column-specific party! (notes that rotate in z, y and x axis over time as they approach, ending with a rotation of 0 at the targets)
- ``manualnoteflash`` has a much better alias that more accurately describes what it does: ``hidenotepress``. It's also now column specific.
- ``drunk<n>`` in all axes, along with all associated period, spacing, speed and offset is now column specific.
- ``beat<n>`` in all axes, along with all associated mult, period, cap and offset is now column specific.
- ``boost<n>`` and ``brake<n>`` are now column specific.
- Added aliases ``tanbumpyz``, ``tanbumpyzsize``, ``tanbumpyzperiod``, ``tanbumpyzoffset``
- Added ``tanbumpysize<n>``, ``tanbumpyzsize<n>``, ``tanbumpyperiod<n>``, ``tanbumpyzperiod<n>``, ``tanbumpyoffset<n>``, ``tanbumpyzoffset<n>``, ``tanbumpyxsize<n>``, ``tanbumpyxperiod<n>``, ``tanbumpyxoffset<n>``, ``tanbumpyysize<n>``, ``tanbumpyyperiod<n>``, ``tanbumpyyoffset<n>``
- Added ``orientoffset``
    - It changes the direction the ``orient`` mod should reference
- Added ``noreorient``
    - Disables the ``orient`` behavior optimized for reverse and SCAR families
    - See bugfixes for more info

**🐛 Bugfixes**

- Column specific wave works again
- ``ScreenGameplay:SetLife( number )`` actually works now
    - ``number`` must be a value between 0 and 1 inclusive
- Theme elements in ScreenGameplay show up correctly again
    - Most notably the LifeMeter in the itg3 theme
- Preference ``LastSeenVideoDriver`` now shows the correct driver in use
    - The string may have changed from what it used to be
    - This will make old modfiles using the old Nvidia checker work correctly on dual GPU (Intel+Nvidia) setups
- Opposite playfield on battle made has been fixed (Is this correct?)
- Turn mods in ``#ATTACKS`` actually work as they should now!
    - Reported and test file supplied by PCBoyGames, thanks!
- Turn mods for Player 2 (and other aspects of Player 2 in general) in the editor are no longer completely broken.
- Rainbow effect on BitmapText updates correctly upon theme change
- SkewY is now properly reset in the editor.
- ``GetRealPath`` issue is probably dealt with
- ``GetTapNoteScoresForPlayer`` with ``TNS_HIT_MINE`` fixed
- ``NoteTypeMults`` and ``HiddenRegions`` resets between songs in Course mode
- Ctrl-O/Reveal in Explorer in Edit mode works for AdditionalSongFolders and AdditionalFolders too now
- We don't normally do this, but we fixed an issue happening on newer versions of Wine where keyboard bindings weren't detected properly
- ``SetNoteTypeMults`` now no longer requires an entry at beat 0 to work properly.
- Combo above 2147483647 no longer crashes the game.
- ``orient`` now reorients itself when when reverse and SCAR mods are enabled.
    - If you have used orient+reverse before, setting ``314% confusionoffset`` is no longer required.
    - Several existing files are dependant of this change, a patch to affected files will follow
- Fixed substractive scoring calculation
- ``RageShaderProgram:define`` now works with #version directive
- Certain edgecases with DrawFunctions resulted in weird rendereing, they are now gone.
- ``tanbumpyxoffset`` actually works now
    - The old behavior was setting ``tanbumpyyoffset`` instead

**👾 Known Issues**

- Reloading theme and textures (f3+r) still has the same issues as the old theme switcher

**❤️ Simply Love changes**

We are open for contributions! https://github.com/TaroNuke/Simply-Love-NotITG-ver.-/

- Metamods! (Under "More Options" in the player options menu)
- Added Graphics options to the settings menu

|notitg_v4_1_icon_16| NotITG v4/1 (2020-04-01)
----------------------------------------------
**This is an April Fools release**

Program download (Windows): https://objects-us-east-1.dream.io/smbuilds/OPENITG/Windows/NotITG%204.1%20AFD.zip

Accompanying Simply Love theme: https://www.dropbox.com/s/odtqkgtaujy2klk/SIMPLY%20LOVE%20%28NotITG%20ver%204.1%29.zip?dl=0

|notitg_v4_icon_16| NotITG v4.0.1 (2020-01-26)
----------------------------------------------
Quickstart download (Windows): https://notitg.heysora.net/files/NotITG-4.0.1-QuickStart.zip

Program download (Windows): https://objects-us-east-1.dream.io/smbuilds/OPENITG/NotITG-4.0.1.zip

Accompanying Simply Love theme: https://notitg.heysora.net/files/SimplyLove-4.0.1.zip

Changelog
^^^^^^^^^

**🚨 BREAKING CHANGES**

- D3D has been removed
- Anything that uses tanclip will behave differently
    - Tanclip now actually clips tan waves used by modifiers. 100%+ = no tan wave.
    - Files that used tanclip in the past have been updated by Ky_Dash.

**💡 New Features!**

- ``FailP1MessageCommand`` and P2 has been added
    - This will also trigger with FailOff enabled when health reaches 0
- Added ``GAMESTATE:GetCurBPM() : number``
    - Returned value will be more accurate than ``GAMESTATE:GetCurBPS()*60``
- Added ``Song:GetTimingData() : table BPMs, table stops``
    - It returns two tables, each are sorted by beat.
    - BPMs contains the beat and the new BPM
    - stops contains the beat and the duration of the stop in seconds
- ``Profile:GetHighScoreForSongAndSteps``, ``Profile:ClearHighScoresForSongAndSteps`` and ``Profile:ClearHighScoresForSong`` also accept a Song instead of a String as its first argument

**🐛 Bugfixes**

- ``GetEffectY`` and ``GetEffectZ`` now returns the correct values
- MovieTextures no longer reset when looping or when showing a static image
- Vertex and fragment shaders behave again
- Multiple edits with the same steps, but with different names, show up again
- Hidden regions and note type mults are now cleared on ctrl+0
- ``UNLOCKSTEPS%d`` no longer crashes on load.
- Graph on ScreenEvaluation fits within its frame now
- Graph on ScreenEvaluation now FINALLY properly unscales rate-mods.
- ``tipsyoffset`` has been fixed
- Report issue button on of the crash dialogs now points to the UKSRT Discord
- ``MonthToString`` does bounds checking now, some more SM3.95 themes will function now
- Combo glow resets when getting a miss
- Entering mods menu transition has been restored
- ``StepP1MenuStartPressMessageCommand`` now works in both the Editor and ScreenGameplay. (Also for ``StepP2`` and
  ``Lift`` instead of ``Press``, naturally.)

**⚡ Misc.**

- Increased priority of ``WaveOut`` for ``SoundDrivers`` preference (Thanks Lily/Staiain!)
    - Everything is so smooooooth, it's almost uncanny
    - Try playing Got More Raves on a high refresh rate monitor
- ``bumpyz`` added as an alias for ``bumpy``
- Fonts created with the SM5 Texture Font Generator will now work as is
- NotITG executable is about 190 KB smaller

**❤️ Simply Love changes**

- Miss combo is now colored red
- Fonts have been optimized (Thanks SENZOMODS!)
- OverlayReadyMessageCommand trigger has been moved to a safer location
    - This fixes certain events going haywire, resulting in crashes.
- Modularized FailOverlay
    - BREAKING CHANGE: config index starts at 1 now, not 0

By the way, we are open for contributions!

https://github.com/TaroNuke/Simply-Love-NotITG-ver.-/

|notitg_v4_icon_16| NotITG v4 (2020-01-12)
------------------------------------------
Quickstart download (Windows): https://notitg.heysora.net/files/quick-start-V4.0.zip

Program download (Windows): https://objects-us-east-1.dream.io/smbuilds/OPENITG/NotITG-V4.zip

Accompanying Simply Love theme: https://notitg.heysora.net/files/SLV4.zip

Changelog
^^^^^^^^^

**🚨 BREAKING CHANGES**

- **YOU NEED A NEW SET OF .DLLs TO RUN NotITG v4**, - previous ``Program/`` folder no longer works as a result of the new .dlls
    - We’re distributing a full installation of the ``Program/`` directory this time, so what you’ll need to do is download the entire folder and put it in your NotITG install.
        - It’ll have the .exe, .vdi and the new .dlls bundled inside. You can safely merge them into the old ``Program/`` folder.
    - This also includes a Noteskins folder to merge with your current one, as some have been updated! You can just merge these with your current iterations, if applicable.
        - Provided - ``combination``, ``cyber``, ``default``, ``divinentity``, ``de-default``, ``dunno``, ``dunno2``, ``proxynotes``, ``randomhex``, ``scalable``, ``scalable2``, ``sm3.9``, ``Toshisan``, ``vintage``
        - You will very likely have file conflicts with existing noteskins - it's safe to just replace the conflicts, as they *need* to be overwritten.
- ``squareoffset`` and ``bounceoffset`` revised, now you don't have to multiply its value by 100
- Player:GetNoteData() now returns the correct format for mines
    - Formerly ``100``, now ``"M"``
        - (This wasn't actually documented beforehand so no one knew about this)
- Mods like ``drunkoffset`` and ``tipsyoffset``, including axis and tan variants, have new behaviors
    - Previous behavior can be found under the mod ``drunkspacing``

**💡 New Features!**

Editing

- ``F3`` + ``9`` in anywhere: Edit Last Edited Song
    - We now properly select the last edited chart (if it was an edit difficulty) by saving the description to the stepmania.ini file instead of the difficulty.
- ``F3`` + ``0`` in ScreenSelectMusic or ScreenGameplay: Edit Currently Playing Song
- ``Ctrl`` + ``[`` in edit: Music preview starts from here (start marker)
- ``Ctrl`` + ``]`` in edit: Music preview ends at here (end marker)
    - It’ll set the length of the preview automatically with this.
- ``Ctrl`` + ``O`` in edit: Open song folder from edit mode
    - This opens the song folder in a new Explorer window.
- ``Alt`` + ``Scroll`` in editor now repositions the receptors on screen
- Autoadvance mode selectable from editor preferences ( ``ESC`` -> ``Preference`` ) which moves the receptors down after placing down an arrow
    - This is turned off by default.
- ScreenEdit now shows current BPM along with Beat and Time
    - Toggle by ``Esc`` -> ``Preferences`` -> ``Show Beat, Time and Attack List during play``
- ``#NOSHUFFLE``: zone in .sm, allows user to determine segments of the chart that cannot be affected by shuffles such as Mirror and SmartBlender
    - ``#NOSHUFFLE:<StartBeat>=<EndBeat>,<StartBeat>=<EndBeat>,<StartBeat>=<EndBeat>``
- Transform option "Swap note players" allows you to switch which players are to hit which notes within a region, while in couples editing mode.

Modding / Lua

- Actor Lua errors will no longer crash as often!!! (Thanks, NAYOTO!)
    - Feature of the decade,.,.,.,.,.
- Fonts can be loaded relative to XML file now
- ``skewy`` tween as a mod
- New mod: ``orient``
    - Additionally rotates arrows in the direction of travel relative to "upwards".
    - It can also be used in percentages, to increase or decrease or even invert the effect.
    - For downwards scroll (e.g. with Reverse or splines), combine this mod with ``314% ConfusionOffset``
- ``noteskewx`` - Identical to ``noteskew``
- ``noteskewy`` - skewy for notes. noteskewx and y can also be column specific, e.g. ``noteskewy2``
- ``waveoffset`` - Affects the waveform of ``wave``
- Column specific wave and waveperiod -``wave2``, ``waveperiod3``, etc.
- Updated Lua from 5.0.2 to 5.0.3 (with some modifications)
    - Enabled ``debug`` library.
    - Some Lua 5.1 features have been added as well;
        - Long strings and comments (Thanks, XeroOl!)
            - You can use an arbitrary amount of ``=`` signs in the delimiters
            - ``[=[hello]=]``
            - ``--[==[Im a comment]==]``
        - Added modulo operator ``%``
            - ``5 % 3`` is the same as ``math.mod(5,3)``
        - Added length operator ``#``
            - works on both strings and tables
            - example: ``#myTable`` is the same as ``table.getn(myTable)``
        - Added hex number support: ``0xA573``
    - Fixed various other logic errors listed on the `Lua bugs list <https://www.lua.org/bugs.html>`_.
- Updated FFmpeg from 0.4.9-pre1 to 4.1.4
    - Added .mp4, .webm, .mkv, .flv video file support
    - Added .apng, .webp image/anim file support
    - .gifs are now animated!
- ``Actor:skewy( skew: number )``
- ``Actor:addaux( deltaaux: number )``
- ``Actor:GetParent(): Actor``
- ``Actor:GetTweenTimeLeft(): number``
    - The name explains itself - the number won't go negative.
- ``Actor:SetRotationOrder(): string`` / ``Actor:GetRotationOrder( order: string )``
    - We’re now able to change its order of euler rotation
    - e.g. ``SetRotationOrder( "xyz" )``
    - ``"zyx"`` by default
- ``ActorFrame:GetChildren(): table``
- ``ActorFrame:GetSharedBGA(): ActorFrame``
- ``ActorFrame:GetOverlayScreens(): table``
- ``SCREENMAN`` and ``ActorFrame`` have metamethods now

.. code-block:: lua

    local af = SCREENMAN() -- GetTopScreen()
    #SCREENMAN() -- GetTopScreen():GetNumChildren(), we get an ActorFrame first here
    SCREENMAN(5) -- GetTopScreen():GetChildAt(4) <- notice the index
    SCREENMAN("Overlay") -- GetTopScreen():GetChild("Overlay")

    af("PlayerP1") -- same as above, but on the ActorFrame directly
    af("PlayerP1")(2) -- chaining example, gets the second child on PlayerP1
    #af -- GetNumChildren()

- Added input modes for screens
    - Can be used to control which screens receives game input.
    - ``ScreenManager:SetInputMode( INPUT_ALL = 0 | INPUT_OVERLAY = 1 | INPUT_NONE = 2)``
- ``Song:GetNoteData( steps, [bool beatBased = true,] number startBeat = 0, number endBeat = -1 )``
    - ``Player:GetNoteData`` already exists
- ``sprite:getstate()``
    - Returns the current state of sprite
- ``sprite:looppoint( point: int )``
    - This can be used to make multiple-state animations using a single spritesheet - such as having a run cycle set the loop point when starting/stopping a run.
- ``player:Reset<type>Splines( column: int )``
    - Column specific reset splines
- ``player:SetArrowPathShader()`` works now
- Added Song methods:
    - ``GetDisplaySubTitle()``
    - ``GetTranslitSubTitle()``
    - ``GetBackgroundPath()``
    - ``GetMusicPath()``
    - ``GetSampleStartSeconds()``
    - ``GetSampleLengthSeconds()``
- ``GAMESTATE:GetCurrentNoteSkins()``
    - returns a table of noteskin names that is currently in use
- ``GAMESTATE:GetRealPath( string )``
    - It works pretty well with AdditionalSongFolders

.. code-block:: lua

    -- Assuming AdditionalSongFolders is `D:/AdditionalSongFolder`
    local songDir = GAMESTATE:GetCurrentSong():GetSongDir()
    GAMESTATE:GetRealPath(songDir .. "./fg/default.xml") -- Returns `D:/AdditionalSongFolder/Group/Song/fg/default.xml`

- Added Shader Methods:
    - Uniform Arrays
        - ``uniform1iv( string name, table )``
        - ``uniform1fv( string name, table )``
        - ``uniform2fv( string name, table )``
        - ``uniform3fv( string name, table )``
        - ``uniform4fv( string name, table )``
            - e.g. ``shader:uniform4fv( 'v4Array', { 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0 } )`` sends a vec4 array where its length is 2
    - Uniform Matrices
        - ``uniformMatrix2fv( string name, table )``
        - ``uniformMatrix3fv( string name, table )``
        - ``uniformMatrix4fv( string name, table )``
            - e.g. ``shader:uniformMatrix2fv( 'mat2Rotate', { 0.0, -1.0, 1.0, 0.0 } )`` sends a 2x2 matrix
    - Defines
        - ``define( string name, string/bool/number/nil )``
        - ``clearDefine( string name )``
            - Basically you can inject ``#define HOGE 4`` on top of the shader code
    - Compile Immediately
        - ``compileImmediate()``
            - calling ``define()`` or ``clearDefine()`` does not automatically compile the shader. Call this function to compile it immediately (or to make it automatically compile when it uses the shader for the first time)
- New MessageCommands:
    - ``WindowFocusMessageCommand``
    - ``WindowFocusLostMessageCommand``
- ``Profile:ClearHighScoresForSongAndSteps( song: string )``
- ``Profile:ClearHighScoresForSong( song: string )``
- Simfiles can now temporarily override user's SmoothLines preference for one song with ``GAMESTATE:ForceSmoothLines( 0 or 1 )``
    - (used for the Groove Coaster lines in Line Delta and Got More Raves)
    - Reset smoothlines back to user's setting with ``GAMESTATE:ForceSmoothLines( -1 )``
- basezoomz can finally be set
    - ``actor:basezoomz(float)`` or ``basezoomz,float``
- actor:GetBaseZoomY() and actor:GetBaseZoomZ() added
- New actor state getting methods, including the ability to get the current state of previously unknowable values, such as zoom and rotation
    - ``actor:GetRotationX()``
    - ``actor:GetRotationY()``
    - ``actor:GetRotationZ()``
    - ``actor:GetCurrentRotationX()``
    - ``actor:GetCurrentRotationY()``
    - ``actor:GetCurrentRotationZ()``
    - ``actor:GetCurrentZoomX()``
    - ``actor:GetCurrentZoomY()``
    - ``actor:GetCurrentZoomZ()``
    - ``actor:GetSkewX()``
    - ``actor:GetSkewY()``
- Also available, current state of actors when taking into account active effects e.g. bob, wag and so on (Thanks, Melody!)
    - ``actor:GetEffectX()``
    - ``actor:GetEffectY()``
    - ``actor:GetEffectZ()``
    - ``actor:GetEffectRotationX()``
    - ``actor:GetEffectRotationY()``
    - ``actor:GetEffectRotationZ()``
- An additional layer for actor position/rotation/scaling is now available
    - ``actor:x2()``, ``y2``, ``z2``, ``zoomx2``, ``zoomy2``, ``zoomz2``, ``rotationx2``, ``rotationy2``, ``rotationz2``, ``skewx2``, ``skewy2`` (these cannot be tweened, and must be set via an update loop)
- ``Player:SetHiddenRegions( {{startBeat,endBeat,column},...} )`` hides notes within the specified beat ranges. Omit the "column" parameter to hide all columns.
- ``Player:SetNoteTypeMults( {{startBeat,multiplier},...})`` multiplies the note type (timing color) of every note beyond startBeat.
- ``Player:ClearHiddenRegions()`` and ``Player:ClearNoteTypeMults()`` removes all sections of the specified type.

Themes

- 192nd quants for noteskins enabled, falls back to old behaviour if 192nd is missing

Misc.

- #UNLOCK: A system is now in place for locking songs or certain charts behind conditions, that can be defined via lua.
    - Conditions can be based on things like arbitrary globals, or high scores on certain songs using ``PROFILEMAN``.
    - Song unlock conditions are set via ``#UNLOCK:someunlock.lua;`` in the .sm file
    - Chart unlock conditions are set via ``#UNLOCKSTEPS:``
    - Each chart can have a seperate unlock condition using ``#UNLOCKSTEPS0:``, ``#UNLOCKSTEPS2:`` etc.,
    - but note that ``#UNLOCKSTEPS2:easy.lua; #UNLOCKSTEPS4:challenge.lua;`` will be minified to ``#UNLOCKSTEPS::easy.lua::challenge.lua::;``
    - Example: https://www.dropbox.com/s/sn8nn2tll8k5cjj/unlocktest.lua?dl=0
    - Any lua can be used here. If the lua fails to compile, the song will be considered NOT locked and will show on the songwheel.
    - Lua unlocks: Unlock command now accepts:
        - ``THIS_SONG`` to refer to the song itself
        - ``THIS_GROUP`` the group the song belongs to
        - ``THIS_PACK`` Identical to THIS_GROUP
    - ``song:GetUnlockMethod( difficulty )`` can be used to get the path directly to the lua file.
- Added ``NotITGKeymaps.ini``, which has the same format as SM5 Keymaps
- ``Data/NotITGPrefs.ini``:
    - ``OnlySongFolders``
        - You can now choose to ONLY load specific song folders. Seperate with a comma.
    - ``FFmpegNumThreads``
        - The amount of decode threads FFmpeg will use, defaults to 6,
- GameState:Get/SetExternal address is printed into the log at startup.

**💪 Behavior Changes**

Gameplay

- A performance improvement on BitmapText (Thanks, Squirrel!)
- Playing on Rate mods no longer un-syncs (Game now accounts for .009 ITG sync)
    - See ``NotITGPrefs.ini``, ``RateMods9msOffsetFix``
- Notefields are reset between marathon songs
- Player 2 score saving is disabled when BothAtOnce is activated
- Rate mods no longer sound terrible! (Thanks, Fraxtil!)
- Fixed a bug where charts in the Edit difficulty slot sometimes fail to load correctly.
- Autoplay being on at any point during an arrow being hit will now disqualify you, and this will be reflected on the results screen.
    - This basically means that you won't get auto-disqualified if you have Autoplay on at the very start of the file - you’ll have a window of opportunity to turn it off before the chart actually starts.
- Finishing a course no longer lets you select another course after - your 'credit' will end
- USB songs now preloads entire song directory
    - Playing sound no longer crashes
    - Custom courses now loads custom songs properly
- Song background now always loads, even if BGBrightness preference is set to 0
- ``PlayerStageStats:GetCurrentLife()`` now returns 0.001 (instead of 0) if no notes or mines have been hit yet.

Editing

- BetterBackgrounds loads before Foreground in the editor now
- FOV and vanishpoint resets when stopping in edit mode

Modding / Lua

- SCREEN_WIDTH and friends are more accurate, this affects widescreen play too
    - It fixes a bug where some AFT trails slightly drift on widescreen only - e.g., in widescreen (16:9 ratio) on SL-based themes, SCREEN_WIDTH is changed from 853 to 853.333… (or near enough)
    - Simply Love is used as the example here because it defines width as 640 - this isn’t necessarily the case for other themes!
- Player:GetNoteData() now clamps to the last beat of the song
- Proxied actors on ActorProxy can be disconnected
    - Just pass nothing to it, example: ``proxy:SetTarget()``
- More XML attributes are scriptable
    - Attribute ``Type`` set through Lua
    - Attribute ``Font``/``File`` of BitmapText can be set through Lua
    - Attribute ``Frag`` and ``Vert`` can be set through Lua
        - They work similar to how you use ``Condition``, but you have to start the line with ``@``.
        - Example: ``<Layer Type="@spriteOrModel() or 'Sprite'" />``

Misc.

- "Report crash" button now goes to the UKSRT Discord
- ``log.txt`` and ``info.txt`` are now written to the ``Data/`` folder
- ``crashinfo-*.txt`` is now written to the ``Data/Crash/`` folder
- Key oem102 is treated as a seperate key and not as a second backslash
- MonkeyInput displays a system message every time it presses a key.
- Serial now starts with ``NITG-``

**🐛 Bugfixes**

Gameplay

- Marathon mode no longer crashes if you fail with only one player enabled
- Battle mode no longer crashes
- Fixed ApproachType on music rates != 1.0x
- Highscore of USB songs no longer disappears
- Reset notefield between songs in marathon mode
- Autosync now works properly with BothAtOnce
- Miss Combo color now works properly.

Editing

- Pressing ``F3`` + ``0`` while it's greyed out/not selectable no longer crashes the game
- Couples editor crash when using 192nd notes has been fixed
- No longer crashes if moving to next note while in couples mode
- ScreenEdit shouldn't crash anymore with DelayedScreenLoad enabled (theme dependent)
- Fixed hands count in Couples Mode

Modding / Lua

- Fixed ``DISPLAY:ShaderFuck()``
- Fixed ``GAMESTATE:GetFileStructure``
- Fixed ``Ctrl`` + ``R`` crashes
    - Crash had been seen in 10-1 and gat
- Fixed crash caused by ``Var=""`` on xml actor loading
- Drunkoffset now affects the left arrow :takimeme2:
- Recreate() method fixes AFT texture clearing on nvidia
    - NULCTRL (by Kaypooma) now works properly on nvidia
- ``ActorFrame:SetDrawFunction( function )`` now works
- Fixed edge case filename behavior
    - ``BitmapText``: ``Foo [Bar]/Font [Page].png`` now works properly, treated as ``Font [Page]``.
    - ``Texture``: ``Foo Bar 16x8/Texture sphere.png`` now works properly, treated as ``Texture sphere``

**Misc.**

- Fixed random AV on quit
- ``CustomsLoadTimeout`` now works properly

**👾 Known Issues**

- We've found that ``digital`` and ``digitalz`` are slightly offsync with each other
    - We've prioritized its compatibility for now, and will review in a future update
- ``Ctrl`` + ``O`` (Reveal Song Folder) currently does not work with AdditionalSongFolders

**❤️ Simply Love (v4 compat. theme) changes**

- Window Title is now ``NotITG <build number> - Simply Love``
- New options in the main menu
    - UKSRT Discord: This closes the game and opens a link to the UKSRT Discord
    - Exit Game: Closes the game
- New selection screen has been added after color selection
    - Selecting Quick Play takes you straight to the song select screen with two players and BothAtOnce enabled
- Survival has been added to the play mode selection screen
- Default Fail Type is now available in the Arcade Options menu
- Added M-mod to the player options
    - M for Maximum; if you set the speed to M300, your scroll speed will be Max 300 if the chart has several BPM changes.
- OffsetPlot can now view detailed spellcard information data
- OffsetPlot now has MineRow data
    - shows the exact noterow (``beat * 48``) of every mine hit by player
- Added ``Themes/SimplyLove/config.lua``, some newer theme properties are set in that
    - ``config.lua`` can be copied to the ``Data/`` folder, any options set there will take priority over the ones in the Simply Love folder
- ``Stitch.lua`` has been added to the ``Themes/SimplyLove/Scripts/`` folder
    - Globals ``stitch`` and ``stx`` has been added
    - Its purpose is to run and cache Lua files using the ``Themes/SimplyLove/`` folder as its base folder.
    - Basic usage: ``local hello = stitch('screen.hello')`` will load ``SimplyLove/Screen/hello.lua``, cache and return its value.
- ArcticFqx’s console has been added to the theme
    - The console runs Lua directly and can be used to do quick maths, execute mods mid-file, receive prints from Traces or SystemMessages or just break the game completely.
    - QwertyUS layout default keybind to open the console: ``ctrl+9``
    - Keyboard layout and console key can be changed in ``config.lua``
- Lua heap viewer, enable with ``ViewGC`` in ``config.lua``
- (*OpenITG only*) If ``DefaultModifiers`` has the Scalable NoteSkin set, it switches over to ``Cel`` as you enter edit mode or song select for the first time.
- (*OpenITG only*) ``EditorShowSongTitle`` is available in ``config.lua``, works exactly the same as the one in ``NotITGPrefs.ini``

Misc.

- Deobfuscated various files
- Function ``Player`` defined by Simply Love has been localized to ``Mods.lua``

|notitg_v3_icon_16| NotITG v3.1 (2018-09-09)
--------------------------------------------
Quickstart download (Windows): https://notitg.heysora.net/files/quick-start-3.1.zip

Program download (Windows): https://objects-us-east-1.dream.io/smbuilds/OPENITG/NotITG-V3.1.zip

EXE download (Windows): https://notitg.heysora.net/files/NotITG-V3.1.exe

VDI download (Windows): https://notitg.heysora.net/files/NotITG-V3.1.vdi

Changelog
^^^^^^^^^

Also hosted on heysora.net: https://notitg.heysora.net/files/basic-changelog-3.1.txt

::

    Changes - current (v3.1)

        [Huge]
            + HUGE performance improvements across the entire game thanks to some openGL pipeline cleaning (HeySora)

        [Bugfix]
            + SmartBlender no longer adds random teal notes to the end of songs that end with lots of mines (BrotherMojo)
            + Fix SmartBlender randomization for the first step (BrotherMojo)
            + Fix SmartBlender Crashing in Marathon Mode on certain songs (BrotherMojo)
            + Non auto-reloading P2 no longer offset in the editor
            + Fix bug where loading a lot of noteskins crashes - it was actually an issue with negative attack time in course for attacks that happen after the song ends.
            + Fix lag spike on heavy spline usage segments of files
            + ActorFrame:GetChildAt( num ) can now access item 0 (HeySora)
            + Fix editor Autoplay not working for P2
            + Window manipulation helpers now work as intended
                DISPLAY:GetWindowX( );
                DISPLAY:GetWindowY( );
                DISPLAY:GetWindowZoomX( );
                DISPLAY:GetWindowZoomY( );
                DISPLAY:GetWindowWidth( );
                DISPLAY:GetWindowHeight( );

                DISPLAY:SetWindow( x, y, w, h );
                DISPLAY:SetWindowX( x );
                DISPLAY:SetWindowY( y );
                DISPLAY:SetWindowAddX( x );
                DISPLAY:SetWindowAddY( y );
                DISPLAY:SetWindowZoomX( x );
                DISPLAY:SetWindowZoomY( y );
                DISPLAY:SetWindowWidth( w );
                DISPLAY:SetWindowHeight( h );

            + Single player marathon mode now no longer crashes with Assertion 'pTrail' failed
            + Game accuracy improved (HeySora)
                - On Windows, OpenITG's precision was just millisecond*1000, now it's true microseconds
            + Great optimisations on Spline/Gradient functions (HeySora)
            + Removed "odd dimensions" warning (HeySora)
            + Improved ApplyGameCommands performance (HeySora)
            + Fixed duplicate messages in an actor actually crashing (HeySora)
                - Now it warns you with a (hideable) dialog, no more crashes!
            + Replaced many "Assertion '0'" (HeySora)
                - Either replaced it with a comprehensive message
                - or actually avoided the crash
            + Fixed Access Violations when reloading a texture on a Sprite (HeySora)
            + Fixed UVs on SpiralHolds
                - Negative spiralholds will use fixed UVs rather than original/bugged UVs
            + Reset FOV between songs in a marathon
            + Parallel lights driver fixed - ArcticFqx

        [Feature]
            + Lossless printscreen now saves .png instead of .bmp
            + Allow players to disable HBT polling, to provide better CPU performance for those who don't have an impulse prototype from 2 years ago :weary:
            + Remove ability to have a non-reloaded chart for player 2 in editor, and removing all menu items involved in reloading player 2's chart
            + Move un-mappable input to 5th row
            + NotITG Preference that lets players disable the "STAGE #" text
            + NotITG Preference that lets players "always show lifebar and score" on songs/courses that disable them (be wary of topscreen movement)
                AlwaysShowLifebar preference
            + Allow lua to detect if an actor is hidden using actor:GetHidden()
                the result is a bool
            + set default keys for action buttons
            + actor:addrotationx( float ) (and y and z) added
                also works in Command="addrotationx,30" format

            + Player:Reset<Type>Splines() now exists

            + Individual Judgments for Couples can now be collected using
                PlayerStageStats:GetTapNoteScoresForPlayer( player (0 or 1), tapnotescore )
                PlayerStageStats:GetHoldNoteScoresForPlayer( player (0 or 1), tapnotescore )
            + Also, allowing user to SetTapNoteScoresForPlayer (and hold note score)
                PlayerStageStats:SetTapNoteScoresForPlayer( player (0 or 1), tapnotescore, amount )

                tap note scores here are 8 to 3 for fantastic to miss, with 1 being HitMine
                hold note scores are 2 for OK and 1 for NG
                    (Yes I am aware it is backwards here... it's because similar functions have already been done this way in themes)

            + ArrowCull mod
                0% for normal (back) cull
                0 to 100% for none cull
                over 100% for front cull
            + Added additional draw statistics to F3+6 (HeySora)
            + Added ability to set NITGVersion from within editor

        [Misc]
            + Bullshit buttons renamed to Action buttons to fit the rest of the Action mappings
            + #NITGVERSION no longer prints to the .sm file when writing if it's 0 (default)

        [Player]
            + Player:GetNoteData() now works finally
                Player:GetNoteData( startbeat, endbeat ) also valid, for getting notedata between sections
                usage example:
                    local nd = SCREENMAN:GetTopScreen():GetChild('PlayerP1'):GetNoteData()


|notitg_v3_icon_16| NotITG v3 (2018-06-17)
------------------------------------------
Quickstart download (Windows): https://notitg.heysora.net/files/quick-start.zip

Program download (Windows): https://objects-us-east-1.dream.io/smbuilds/OPENITG/NotITG-V3.zip

EXE download (Windows): https://notitg.heysora.net/files/NotITG-V3.exe

VDI download (Windows): https://notitg.heysora.net/files/NotITG-V3.vdi

Accompanying Simply Love theme: https://notitg.heysora.net/files/SLV3.zip

Changelog
^^^^^^^^^

Also hosted on heysora.net (The v3 changelog is part of the v3.1 changelog):
https://notitg.heysora.net/files/basic-changelog-3.1.txt

::

    Changes - 17-jun-2018 (v3.0)

        [Bugfix]
            + Fix ratemods not affecting fg elements in editor
            + disablemines now makes stepping on mines not reduce score (in addition to making them not explode)
            + Gradients (arrow, stealth and arrowpath) no longer crash with malformed input
            + Syntax on gradients now matches v3Splines
            + Disable CTRL+R when not playing in event mode (prevents extra stage triggers and other weird stuff)
            + Fix ScreenSelectMusic crash on default theme (uninitialized shader vals) -FMS_Cat
            + Fix ScreenNameEntry traditional crash
            + Fix meat boy theme
            + Survival mode automatically unhides lifebar and score
            + Ctrl+L to toggle visible life/score when they've been hidden by modscripts
            + Re-enable shader on BitmapText -FMS_Cat
            + NoteData offsetvector now knows what song of a marathon each note was in. Used in Marathon scatterplot.
            + Fix bug where duplicate edit data can sometimes crash -FMS_Cat
            + Results screen Life graph now properly scales when using rate mods

        [Feature]
            + Proper gradients!!
                VIDEO:
                    https://streamable.com/2jg94
                EXAMPLE FILE:
                    https://www.dropbox.com/s/0mv7xwykbig12d8/TEST%20-%20PathGradient%202.rar?dl=0
                HOWTO:
                    https://www.dropbox.com/s/t1trfks2xyckwzh/gradients.txt?dl=0 (thanks @halcyoniix)
            + Add GetPossibleSongs and GetPlayedSongs to StageStats lua, to fix the offsetplot in marathon mode
            + New Preference in Data/NotITGPrefs.ini
                ShowStageNumberOnGameplayScreen (turn this off to remove EVENT MODE text)
            + SmartBlender mod - intelligent shuffle! -BrotherMojo

    Changes - 03-apr-2018 (MM3 build)

        [Bugfix]
            + Fix bug where F1 Editor Help Menu Crashes. (USE THIS TO SEE THE KEYBOARD SHORTCUTS)
            + Fix bug where jumps counted as two distinct points on scatter plot.
            + Dude, where's my chart? (Editor sometimes deletes charts) FINALLY FIXED.
            + Centered2 no longer kills holds on reverse
            + Doubles playfield is now properly centered in the editor

        [Editor]
            + Add more keyboard shortcuts to the editor (PRESS F1 TO SEE THEM)
            + Actual Couples support (3.95 couples with micro-stop style)
                Couples toggle added to F menu (press F in editor)
                    Couples toggle also accessible from editor preferences in F menu.
                    Switching to couples editing also changes to the couples noteskin (if available)
                More turn mods added to F menu
                    +SwapSides 		(12345678 -> 56781234)
                    +CouplesMirror 	(12345678 -> 86754231)
                    +SwapLeftRight	(12345678 -> 42318675)
                    +SwapUpDown		(12345678 -> 13245768)
                Forward slash "/" key toggles between editor player 1 and editor player 2.
                Couples conversion script (using tiny negative stops) internalized (accessed from F menu)
                    Regional [s]dialect[/s]couples conversion also available, if an area is highlighted.
                Individual notecounts when in couples editing mode
                    Format is Player1 / Player2
            + Ctrl + ,/.: Jump to previous/next label


        [Player]
            + New Splines v3! Forget everything you knew about splines before. This is the lowdown now:
                https://www.dropbox.com/s/7gpmdml8o3ghz5v/splines.txt?dl=0
                40 splines per column per player (with 2 players), 210 FPS.
            + Arrow Path Gradients!!
                VIDEO:
                    https://streamable.com/ukntb
                EXAMPLE FILE:
                    https://www.dropbox.com/s/xia26i6e5ym97vn/TEST%20-%20PathGradient.rar?dl=0
                HOWTO:
                    https://www.dropbox.com/s/t1trfks2xyckwzh/gradients.txt?dl=0 (thanks @halcyoniix)

        [Actor]
            + New Actor Effect type (pulseramp)
                It's the same as diffuseramp (sawtooth wave applied to color) but on the size of an object.
                Effectmagnitude controls max size and min size
                Effectcolor1 and effectcolor2 controls the size difference in each axis at the beginning and end of each step

    Changes - 21-aug-2017 (UKSRT9 build)

        [Player]
            + Player:SetMineSound( path ); --Set custom player mine sound from simfile.
            + fix access violation when using Player:SetMissCombo( amount ); in editor
            + Send additionall judgment messages for early and late judgments, as well as distinguishing holds and rolls with another message
                examples:
                    Fk_P1_W2_EarlyMessageCommand
                    Fk_P2_W4_LateMessageCommand
                    Fk_P3_OK_HoldMessageCommand
                    Fk_P4_NG_RollMessageCommand

        [Misc]
            + Custom tweening
                actor:tween( time, 'lua expression' );
                Custom tweening lets you define a lua expression using "%f" to represent how far into the tween the object is currently.
                For example, a linear tween would be actor:tween( 1, '%f' );

                https://dl.dropboxusercontent.com/u/2526020/FUCK/secret/TEST%20-%20Custom%20Tween.rar

            + SpellCard and Label system
                Allow simfile writers to mark sections of songs.
                These markers will also show up in the editor.
                Press L in editor to add label.

                Example:
                    https://dl.dropboxusercontent.com/u/2526020/FUCK/secret/whoa/%EF%BC%9F/get_fucked_spellcards.xml

                Spellcards and Labels now added to simfiles
                Labels can now be one of two types - song divider labels and comment labels
                Comment labels won't show up in the scatter plot (unless written that way.

            + Scatter plot stuff
                Etterna's timing offset scatter plot from the results screen.
                This will also render spellcards and labels (mentioned above) as shaded areas and bars.
                Refer to https://dl.dropboxusercontent.com/u/2526020/FUCK/secret/whoa/%EF%BC%9F/OffsetPlot.xml

            + New Actor type "Actor" (aliases Aux, Auxvar) for when you don't want to specify an invisible quad
            + New XML Node "Var" lets you define a variable for the object
                Leads to the shorthand of
                    <Aux Var="test_object"/>
                replacing
                    <Quad InitCommand="%function(self) test_object = self end" OnCommand="hidden,1"/>

            + Remove "Characters" and all related code from main folder.
            + "ComboShowLeadingZeroes" Preference lets you choose to display 4 combo as either "4" or "004"

        [Holy shit]
            + Major performance upgrades t. etterna
            + FIXED PRINTSCREEN ON AFTS
            + Courses can now have player specific mods
                format is
                    #MODS:TIME=54.184:LEN=24.44:PLAYER=0:MODS=metal2;
                    #MODS:TIME=54.184:LEN=24.44:PLAYER=1:MODS=cel;

        [Editor]
            + CTRL+Up/Down now changes speed in 0.5x increments, rather than multiples of 2
            + CTRL+<comma> or CTRL+<period> jump to prev/next label (comment)
            + CTRL+backspace now deletes everything in a text entry field

        [Bugfix]
            + fixed bug where Ctrl+0 then reset didn't reload the FG
            + fixed bug where Ctrl+R/Ctrl+0 didn't disable playfield shaders
            + fixed bug where 0x breaks spiralholds (LDani2001)
                crash was caused by zero division
            + fixed bug where P3-P8 would send stepped messages for P1 and P2

    Changes - 6-jun-2017

        [Player]
            + PushNoteData
                player:PushNoteData( varName, fStartBeat, fEndBeat );
                pushes lua notedata into variable "varName". Accounts for turn mods.
                if fStartBeat is not specified, first beat of song is used.
                if fEndBeat is not specified, last beat of song is used.

        [Mods]
            + "holdtiny" or "holdtiny<col>"
                width of hold. similar formula to mini/tiny.
            + "holdgirth" or "holdgirth<col>"
                inverse alias of holdtiny
            + "drunky", "tandrunky" and all related wave modifier trimmings.
                sure, why not -puuro
                **these are not column specific


    Changes - 3-jun-2017

        [Bugfix]
            + Fix for holds

        [Misc]
            + Ctrl+V now works on all text entry boxes (NAYOTO)
            + Large RageSound updates (HeySora)
                Play
                Pause
                Stop
                Load
                IsPlaying
                IsPaused
                GetLengthSeconds
                SetSoundPosition
                GetVolume
                GetPan
                GetStartSecond
                startsecond
                GetStopMode
                stopmode

        [Player]
            + "SetAwake" function can be used to wake up playfields that are still hidden, or set them back to sleep if re-hidden.
                Provides small FPS boosts for those who need it.

        [Mods]
            + spline<col><axis>reset
                reset all splines instantly. Huge performance boost manually resetting each one.

    Changes - 29-may-2017

        [Misc]
            + Add Player:IsAwake() for debugging purposes
            + Bugfix on misses in editor? (access violation???)

        [Mods]
            + "hidenoteflash" - hide the note flashes. Necessary for certain effects.
                Can be column specific - e.g. "hidenoteflash0"

    Changes - 24-may-2017

        [Bugfix]
            + Access violations! Access violations everywhere ;-; (fixed)
            + Performance update on existing code
                check if unused players beyond P2 are "sleeping" before attempting to apply mods or update playerstate
                (simply unhiding will "wake" a sleeping playfield)

        [What the fuck]
            + Player 3 and 4 added to ScreenGameplay/Editor.
                Can have separate mods to players 1 and 2
                    GAMESTATE:ApplyGameCommand('mod, tornado',3);
                Must be unhidden. They are hidden by default.
                Apply noteskins using GAMESTATE:LaunchAttack()
                Players 3 and 4 behave on AutoPlay in Gameplay, but are tied to "BothAtOnce" in editor. Perhaps this will be refined in future.
                    Thinking of making it so that if "BothAtOnce" is on, all players will be tied to the same thing,
                    otherwise tie P3 to P1 and P2 to P4 inputs.

        [Misc]
            + Fix mine behavior in "BothAtOnce" mode
            + Fix hold behavior in "BothAtOnce" mode in editor.

    Changes - 22-may-2017

        [Internal]
            + Made Player accessible directly via lua
                (e.g. P1: or v[1]: can now touch internal player attributes)

            + GetMoveX/Y/Z added to GetX/Y/ZPos within ArrowEffects.cpp, original functions removed.
                NoteDisplay, ArrowEffects and some other places modified to reflect this (much needed) change
                If this breaks anything, please hit me with a large stick
                This is going to speed the game up at least marginally, though.

        [Misc]
            + Spiral hold tails fixed in extreme cases
            + Version globals added
                FUCK_VERSION_1 = 20161226
                FUCK_VERSION_2 = 20170405
            + Make dialog box wider in loading window so song/folder titles don't get cut off
            + P1:SetCombo( int ) --set the current combo
            + P1:SetMissCombo( int ) --set the current miss combo
            + P1:GetCombo( ) --get the current miss combo
            + P1:GetMissCombo( ) --get the current miss combo
            + P1:SendJudgment( int, isEarly, (optional, for scatter plot)timing deviation in ms, (optional, for scatter plot) beat ) --Send a judgment message to the actor. Note: must tell the game if it's early or late.
            + "SaltyReset" message broadcast on press CTRL+R

        [Editor]
            + "Edit steps information" now shows the current meter before editing
            + CTRL+PgUp/PgDn lets you jump to selected beat
                Beat must be greater than 0
            + CTRL+Home now doubles as "End" ...because I don't have an End key on this laptop.
            + F1 to open Edit Help Menu restored and the crash has been fixed.
                It now has a page 2! Press enter from this screen to go to page 2.
                Page 2 contains all the notITG editor shortcuts.
            + F2 now opens notITG editor shortcuts screen.
            + Backing out of text entry no longer plays a lengthy transition

        [Mods]
            + SPLINE TYPE (!!!)
                New mods of the format "spline<axis>type", control how the spline behaves in that axis.
                    0 = default (linear interp),
                    1-100 = cosine interp (smooth in and out, always vertical at the control points),
                    101+ = cubic splines (curved based on the specified control points).
                Different axes can have different interpolations, e.g. z can be cubic while x is cosine.

            + Spline performance greatly improved (t. Daikyi, Telperion, Michael and everyone else who posted suggestions on improvements)

            + "attenuate" (aka attenuatex) changed to be based on column position, rather than which column it is
                "attenuatez" re-introduced, z attenuation is now based on z position to match attenuatex			

            + "bumpyy" with appropriate period and offset modifiers.
                Period modifiers can now be column specific.
                Example:

                    local str = ''
                    for i=0,3 do
                        str = str..'*10000 '..(300 + 150*i)..' bumpyy'..i..','
                        str = str..'*10000 '..(300 + 150*i)..' bumpyx'..i..','
                        str = str..'*10000 '..(100*(3-i))..' movex'..i..','
                        str = str..'*10000 0 bumpyyoffset'..i..','
                        str = str..'*10000 25 bumpyxoffset'..i..','
                    end

                    m(0,999,str,'end');
                Bumpy is now one of the most powerful sets of mods.

        [Window stuff]
            + global variables added relating to window display (NAYOTO.)
                LUA->SetGlobal( "DISPLAY_WIDTH", (int) DISPLAY_WIDTH );
                LUA->SetGlobal( "DISPLAY_HEIGHT", (int) DISPLAY_HEIGHT );
                LUA->SetGlobal( "DISPLAY_LEFT", (int) DISPLAY_LEFT );
                LUA->SetGlobal( "DISPLAY_RIGHT", (int) DISPLAY_RIGHT );
                LUA->SetGlobal( "DISPLAY_TOP", (int) DISPLAY_TOP );
                LUA->SetGlobal( "DISPLAY_BOTTOM", (int) DISPLAY_BOTTOM );
                LUA->SetGlobal( "DISPLAY_CENTER_X", (int) DISPLAY_CENTER_X );
                LUA->SetGlobal( "DISPLAY_CENTER_Y", (int) DISPLAY_CENTER_Y );

            + More window commands for ease of use (NAYOTO.)
                ADD_METHOD( GetWindowX )
                ADD_METHOD( GetWindowY )
                ADD_METHOD( GetWindowZoomX )
                ADD_METHOD( GetWindowZoomY )
                ADD_METHOD( GetWindowWidth )
                ADD_METHOD( GetWindowHeight )

                ADD_METHOD( SetWindow )
                ADD_METHOD( SetWindowX )
                ADD_METHOD( SetWindowY )
                ADD_METHOD( SetWindowAddX )
                ADD_METHOD( SetWindowAddY )
                ADD_METHOD( SetWindowZoom )
                ADD_METHOD( SetWindowZoomX )
                ADD_METHOD( SetWindowZoomY )
                ADD_METHOD( SetWindowWidth )
                ADD_METHOD( SetWindowHeight )

    Changes - 14-may-2017

        [Misc]
            Credit: NAYOTO.
                + DISPLAY:SetWindowPosition( int x, int y )
                    Move the window around when in windowed mode, via simfile lua. oh no
                + DISPLAY:SetWindowPositionAndSize( int x, int y, int width, int height )
                    will lag if using ReShade for anything
            + DISPLAY:GetDesktopWidth()
            + DISPLAY:GetDesktopHeight()
                These are needed when using window position for simfile authors to make sure window is kept inbounds

        [Addon]
            + F3+8 is now Reset Window Position and Size
            + Game now detects if window position has been changed at any point, and resets on exiting song
            + "AllowWindowPositionChange" preference added to let users disable this functionality from StepMania.ini
                (defaults to true, but... Just in case.)

        [Mods]
            + Fix bug caused by moveY not affecting stealth types

    Changes - 3-may-2017

        [Nice]
            + "ShowComboGlowAtPercent" now added as a preference in StepMania.ini
                Default value is 0.25 (same as normal ITG/3.95)
                Setting this to 0 lets you see if your combo is blue or gold right from the beginning of the song
                Setting this value above 1 will entirely disable combo colors

        [Misc]
            + GAMESTATE:GetElapsedTimeFromBeat( beat ) added
                ever wanted to work out the exact time in seconds that beat 188.75 happens? Now you can!
            + GAMESTATE:GetBeatFromElapsedTime( time ) added because why not


|notitg_v2_icon_16| NotITG v2 (2017-04-05)
------------------------------------------
Download (Windows): https://objects-us-east-1.dream.io/smbuilds/OPENITG/NotITG-V2.zip

EXE download (Windows): https://sm.heysora.net/NotITG-170405.exe

VDI download (Windows): https://sm.heysora.net/NotITG-170405.vdi

Changelog
^^^^^^^^^

Also hosted on heysora.net: https://sm.heysora.net/NotITG-v2-changelog.txt

::

    Changes - 18-mar-2017 (20170318-002) [Release candidate]

        [Mods]
            + "longboys" added as an alias to "longboy"

        [Bugfix]
            + fix straightholds when using reverse
            + fix z position on spiral hold topcap when using straightholds
            + fix hold tail caps on spiralholds when using negative longboys


    Changes - 13-mar-2017 (20170313-014)

        [Mods]
            + mod: "ApproachType"
                when greater than 0, this changes mod activation rates such that *1 = 100% over 1 beat
                (affected by bpm changes and stops)
            + "zoom" added as a shortcut to control both "zoomx" and "zoomy" in tweens-as-mods system

        [Nice]
            + tested slight optimizations to PlayerOptions.cpp from 9-mar build
                got a few extra fps on private caller


    Changes - 10-mar-2017 (20170310-010)

        [General]
            - Allow images to be made gray by appending "(grayscale)" to the filename
            - Allow AFTs to be made gray by setting self:EnableGrayscale(true) before calling Create()

        [Bugfix]
            + Editor: Fix "unable to move" bug caused by uninitialized scrollmode memory

    Changes - 9-mar-2017 (20170309-024)

        [Editor]
            + CTRL+5 Switch to 20ths mode (10-9-10-9-10 scrolling)
            + CTRL+6 Switch to 96ths mode (4th->96th->8th->96th scrolling)
                press either button combo again to disable
            + SoftShuffle and SpookyShuffle added to available editor turn mods/F menu turn mods
            - Removed the old glitchy "make20ths" compress mod (and all related bad code)

        [Bugfix]
            + Editor: Fix crashes involving next/previous note
            + Editor: FINALLY fix Compress options interacting with holds incorrectly in oITG.
            + Editor: Don't overwrite BPM on ending beat when using compress options if one already exists
            + Fix tweening notefield interior (don't worry about this)
            + Make dummy quad on false condition invisible
            + Small rewrite to playerOptions to make column specific mods faster/more efficient

        [Mods]
            - Remove "attenuatey" and "attenuatez" mods, they were pretty useless
            - Reduced max # splines per column per value from 64 to 48 to free up some memory for other new mods

    Changes - 6-mar-2017 (20170306-024)

        [Bugfix]
            + Fix actorproxy to allow normal playfield to be drawn
            + Fix move mods with straightholds
            + Rename "hidden" tween to "hide" so there's no overlap with the actual hidden mod :I
            + Fix "copied" actors being unable to draw (weird rarely-used actor type that shows up in default theme)

        [Mods]
            + size splines
                officially now named "tiny", so "spline0tinyoffset0" etc.
                behavior changed so that they match tiny (200 = 0 size)
                See other implementations of splines for more details

    Changes - 3-mar-2017 (20170303-026)

        [Mods]
            + *-1 activation speed is now a shortcut for "instantaneous"
            + Fix bug where tan was not actually a tan wave
                new mod "glitchytan" or "cosec" brings back old behavior when enabled
            + Fix bug involving numerous tan mods (notably tanbumpyx)
            + tweens are now available as mods.
                syntax:
                    '*1 200 zoomx'
                    '*2 50 skewx'
                    '*2 30 rotationz'
                -available tweens:
                    x, y, z, (1% = 1 pixel)
                    rotationx, rotationy, rotationz (degrees, 1% = 1 degree)
                    zoomx, zoomy, zoomz, (defaults to 100%, which is a zoom of 1. 200% = zoom,2)
                    skewx (100% = a skewx of 1)
                    hide (it's hidden, any nonzero % will enable)
                -this solves the problem of syncing mods to playfield tweens
                -this also allows mods that move the playfield to be used in .crs files

    Changes - 21-feb-2017 (20170221-003)
        [Editor]
            + When editing doubles chart, don't move one player off to side
                (even if two player editor pref is enabled)

        [General]
            + Don't error out on negative tween time, just display a warning and continue
            + Fix endless bugs with CTRL+R and CTRL+0

        [Mods]
            + "straightholds" --straightens out holds (like how PiU handles mods)
                100% will completely straighten the hold.
                Higher will make the hold perform the inverse of the default behavior.
                Negative values will increase the hold's strength.

    Changes - 17-feb-2017
        [General]
            + Doubleres image support for high resolution textures
                append "(doubleres)" on the end of your double res texture for the game to auto resize it
            + SetTextureFiltering now works on models
                choose whether you want zoomed models' textures to be either pixellated (false) or blurred (true)
            + Ctrl+R quick reset of any song.
                This is notable because it resets all active mods and tweens when used in mod files
                Fixed bug where quick reset crashes songs with AFT usage
            + Ctrl+0 Gets rid of all on screen mods and graphics. Disqualifies you tho.
            + New preference: "RateModsAffectFGChanges"
                Allows automatic handling of rate mods on all mod files
                (Updating both mod attack rates and foreground object animation and speeds)

    Changes - 14-feb-2017
        [Mods]
            + bring back 300 bpm beat cap to fix compatibility with files that relied on it
            + "beatcap"
                turn this mod on to disable the 300 bpm beat cap

        [General]
            + Input Mode (Preference = InputDuplication)
                Press F3+5 to turn on "both at once" mode - either player presses buttons for both sides.
            + Fix bug in "both at once" mode that causes the dummy player to be unable to hit holds
            + GAMESTATE:SetInputMode(0 or 1) --0 for normal, 1 for "both at once"
                Used to temporarily set "both at once" mode for one simfile.
                This behavior resets on re-entering the gameplay screen.
                Input Mode preference/F3+5 takes priority over in-simfile setting.
            + Fixed bug causing ActorFrame-based receptors in noteskins to glow brightly instead of pulsing to the beat

    Changes - 10-feb-2017
        [General]
            + GAMESTATE:LaunchAttack(StartTime, Length(seconds), Mods, Player(optional) ) (NAYOTO.)
                This can be used to launch NoteSkins mid song, but will disable any currently active lua mods
                Recommend using LaunchAttack in "InitCommand", as launching "attacks" generates lag spikes.

        [Mods]
            + "SoftShuffle" = random turn mod from either: SwapLeftRight, SwapUpDown, Mirror
            + "SpookyShuffle" = new turn mod: L<->(D or U) R<->(U or D), introduces a lot of crossovers
            + Column specific bumpy
            + Column specific dark (hide targets)

        [Simfile]
            + Can load multiple #MODS:; tags, allowing basically a whole .crs to be pasted in (NAYOTO.)

        [Edit Mode]
            + Allow loading of #MODS tag similarly to #ATTACKS
            + Allow #ATTACKS:; to work in Edit Mode. (NAYOTO.)
            + Fixed a bug involving changing difficulty. (NAYOTO.)
            + Edit Steps Meter changed from selection menu to Text Entry. (NAYOTO.)
            + Reload from Disk doesn't load multiple copies of #FGCHANGES or #MODS (TaroNuke)

    Changes - 05-jan-2017

        Editor: Fixed "Edit Song Info" FINALLY

        #ATTACKS tag added to simfiles! (NAYOTO)
            This brings support for crs stype mods to be embedded in simfiles
            This also allows Noteskin changes to be performed mid-simfile! since they are just attacks
            NOTE: This WILL NOT WORK in the editor.
                Use a .crs file for testing this and then just mash it into the .sm when finished.

        #BETTERBGCHANGES tag added to simfiles
            BGChanges that support models, InitCommands and MessageCommands
            note: Does not needs a sleeping quad to keep itself alive, like background

        Negative attack times no longer permanently break mods
            instead, a stern warning is issued and an attack rate of *0.01 is used

        Boomerang: percentage now affects wave height

        Save Area to Lua (time)
            Accessed from "press F" menu
            Same as the beats version, but gets the time of each step

    Changes - 28-dec-2016

        HUGE performance boost on splines

        Fixed blue note diffuse and arrow path diffuse being swapped (ty PCBoy)

    For the rest, see NotITG v1 changelog
    https://dl.dropboxusercontent.com/u/2526020/FUCK/NotITG-changelog.txt

|notitg_v1_icon_16| NotITG v1 (2016-12-24)
------------------------------------------
Download (Windows): https://objects-us-east-1.dream.io/smbuilds/OPENITG/NotITG-V1.zip

Changelog
^^^^^^^^^

Also hosted on heysora.net: https://sm.heysora.net/NotITG-v1-changelog.txt

::

    Changes (current build)

        New splash screen and crash dialogs


        "Current second, unaffected by offset" added to editor below "Current second".
            Preference "SyncToRoxorHardware" added. Current second, unaffected by offset has +0.009 added if this is true.

        Reduced number of splines from 128 down to 64 to improve frame rate.
            30 per column is sort of the upper bound for lag, anyway.

        Column specific confusionoffset!!
            confusionoffset0-n
            confusionz/confusionzoffset now aliases for confusion/confusionoffset

        Column specific tiny

        Arrow rotational splines, works just like the arrow path splines but for the rotation of individual columns
            format is spline<col>rotx<num>
            only the y rotation spline affects holds


        -stealthpastreceptors (enables stealth to be turned on past receptors)

        ActorSound (UNFINISHED/GLITCHY)
            Similar to SM5 implementation. See available commands below
                self:start();
                self:stop();
                self:pause();
                self:get():pitch(<some value>) --'speed' does the same thing
                self:get():volume(<some value>) --between 0 and 1
                self:get():pan(<some value>) --between -1 and 1
                self:get():GetSoundPosition() --use this for syncing things to sounds!! This is not currently in SM5.

    Changes - 12-dec-2016

        -arbitrary pathing! REDONE
            format is "spline<col>x<num>"
            Arrows move to specific points on the screen once they have reached specific distances from the receptors.
                -combine this mod with drawsize as this can cut some size off the playfields
                -The offset is defined as 100% per 64 pixels (ARROW_SIZE)
                -both holds and notes follow the altered note paths
                -Spiralholds changes the way y splines are drawn.

                    m(1,999,'*1000 0 spline2xoffset0','end')
                    --the first offset (on UP column) - 0 means it's at the receptors

                    m(1,999,'*1000 0 spline2x0,'end')
                    --x position of all notes above the first offset - including receptors

                    https://dl.dropboxusercontent.com/u/2526020/FUCK/secret/splines0.png

                    m(1,999,'*1000 100 spline2xoffset1','end')
                    --the second offset - 100 means it's 64 pixels down from the receptors

                    m(1,999,'*1000 100 spline2x1,'end')
                    --x position at offset 1. 100% = one column to the right.
                    --from 0 to 64 pixels, the path will be a straight line from dead center -> one column right.

                    https://dl.dropboxusercontent.com/u/2526020/FUCK/secret/splines1.png

                    m(1,999,'*1000 200 spline2xoffset2','end')
                    --the second offset - 200 means it's 128 pixels down from the receptors

                    m(1,999,'*1000 -100 spline2x2,'end')
                    --x position at offset 2. 100% = one column to the right.
                    --from 64 to 128 pixels, the path will be a straight line from one column right to one column left.

                    https://dl.dropboxusercontent.com/u/2526020/FUCK/secret/splines2.png




        -new mod: "zbuffer", turns on the zbuffer without needing to turn on e.g. 0.5% bumpy

    Changes - 2-dec-2016

        Fix Original Simply love usage with FUCK.exe
        Added "spiralz" (see spiralx and spiraly)

        -expandperiod (finally, some controls for "expand")
        -tanexpand
            tanexpandperiod

        "Randomvanish" split into two mods, "Randomize" and "Vanish"

        -randomize
        -randomizemirror -mirrors notes on their way up the screen (doesn't affect holds)
            randomizeoffset -controls when either of the above effects happens

        -vanish (see pieces of a dream) - defaults to 128 pixels from the targets
            vanishsize -how big is the vanish area
            vanishoffset -move vanish point up or down

        -"xy" new actorcommand that sets both x and y
            use example:
                self:xy(100,230)

    Changes - 11-nov-2016

        Added shorthands for stealth, hidden, sudden, blink colors and stealthglow
            sudden(r/g/b)(o)
            for example,
                stealthgg == stealthglowgreen
                blinkr == blinkred
                hiddeng == hiddengreen
                *10 50 suddenbo == *10 50 suddenblueoffset

        Made redirs not crash on invalid redirect

    Changes - 25-oct-2016

        Brought back lua errors (rip the dream)
        Removed some model crashes (replaced them with dialog boxes)
        Revert loading window due to error complaints from some users

    Changes - 19-oct-2016

        actor:cmd('cmd list') now a valid method
            instead of
                actor:x(100)
                actor:linear(5)
                actor:x(200)
            we can say
            actor:cmd('x,100;linear,5;x,200');

        -tandigital
            tandigitalperiod,tandigitalsteps,tandigitaloffset
        -tandigitalz with all the trimmings

    Changes - 17-oct-2016

        New program icon (Jose_Varela)
        New Access Violation random messages
        Necrodancer options in the "F" menu no longer crash
        Insert/Delete options in the "F" menu no longer delete all the steps (...)
        Updated program info
        Added a discord link
        New loading and error windows








    New Modifiers

        -longboy (alias: longholds)
            -Holds shrink as they approach the targets

        -globalmodtimer (alias: modtimer, timer)
            change the global mod timer for drunk,tipsy,beat etc.
            0 = normal
            100 = song time
            200 = song beat (this will make drunk freeze e.g. during stops!)
        -globalmodtimermult (alias: modtimermult, timermult)
            multiplies the global timer by an amount
            0 = 1x
            -100 = 0x
            100 = 2x
            528 = 6.28x = 1 beat is 1 wave (important)
        -globalmodtimeroffset (alias: modtimeroffset, timeroffset)
            offsets the global timer by an amount (0=0, 100=1 etc)

        -stealth0-n
            stealth individual columns

        -reverse0-n
            reverse individual columns without split/alternate/cross, because seriously, who designed this? why??


        -drunk
            -drunkspeed
            -drunkoffset (-100 on drunk or tipsy offset causes the whole thing to be in phase, it's also possible to get it to stop moving with these)
            -drunkperiod (change the period of the oscillations of drunk)
        -tandrunk (Drunk operates on a tan wave instead of a sine wave, holds periodically tend to infinity. Targets also warp around.)
            -tandrunkspeed
            -tandrunkoffset
            -tandrunkperiod (change the period of the oscillations of tangent drunk)
        -tipsy
            -tipsyspeed
            -tipsyoffset
        -tantipsy
            -tantipsyspeed
            -tantipsyoffset

        -beat (changed since regular 3.95/ITG such that bpms over 300 don't ruin the beat)
            -beatoffset (move the timing of the beat mod, add 50% beat offset to move the beat to be on 8ths)
            -beatperiod (waveform length of the beat mod at peak wave amplitude)
            -beatmult (multiplies the bpm of the song that beat is responding to)
        -beaty
        -beatz (see the above for the modifiers)

        regarding offsets
            -100 on drunk or tipsy offset causes the whole thing to be in phase, it's also possible to get it to stop moving with these

        -zigzag (a triangle wave. Similar to drunk, but with straight lines.)
            -zigzagperiod (alter the period of the wave. At 2x, 0% zigzagperiod makes 4ths and 8ths alternate, -50% makes [4ths+8ths] alternate with 16ths)
                100% will double the period
            -zigzagoffset (do we want to move the zigzag along?)

        -sawtooth (similar to zigzag, but with a sawtooth wave)
            -sawtoothperiod (alter the period of wave. At 2x, 0% sawtoothperiod makes 4ths and 8ths alternate, -50% makes [4ths+8ths] alternate with 16ths)
                100% will double the period

        -parabolax (generic wave for aiding in drawing stuff)
        -parabolay (generic wave for aiding in drawing stuff)
        -parabolaz (generic wave for aiding in drawing stuff)

        -wave (unchanged)
            -waveperiod (affects the waveform)

        -sawtoothz
            -sawtoothzperiod
        -zigzagz
            -zigzagzperiod
            -zigzagzoffset
                (this is the same as the x variations but in the z axis
                    fov on the playfields is not so you need to use bigger values)

        -tornado
            -tornadoperiod (control the helix length)
            -tornadooffset (control how far into the tornado the receptors are)
        -tantornado (this is exactly as stupid as it sounds)
            -tantornadoperiod
            -tantornadooffset
                (both of the above offsets will move the receptors)

        -tornadoz, tantornadoz
            -I didn't even test these...

        -spiralx (highly experimental, and stupid)
        -spiralxperiod (highly experimental, and stupid)
        -spiraly (highly experimental, and stupid)
        -spiralyperiod (highly experimental, and stupid)
            Spiral is readable at 150 spiralx/y -99 spiralperiodx/y

        -hidden,sudden,hiddenoffset,suddenoffset,stealth and blink for each color (red, green, blue)
            (use these the same way stealth is used, but to hide hues

        -confusion (as in SM5, rotate the receptors (and by extension, the arrows too) - use negative dizzy to counteract the spinning...)
            -confusionoffset (rotate the notes and targets by an amount, and just leave them there)

        -bounce (notes travel in a rectified sine wave towards the receptors)
        -square (notes travel in a square wave pattern towards the receptors)
            -period and offset as seen above will apply to both of these functions
        -digital (sine wave with variable stepping)
            -digitalsteps (control the resolution (number of stopping points) of the digital)
            -digitalperiod
            -digitaloffset

        z versions of bounce, square and digital

        -stealthglowred (or green or blue) (alter the color that stealth glows to before fading)

        -ActorProxy
            Copies an actor on the topScreen
            self:SetTarget('PlayerP1') <- now we have a copy of the playfield of P1

        -bumpy
            -bumpyperiod
            -bumpyoffset
        -tanbumpy
            -tanbumpyperiod
            -tanbumpyoffset

        -bumpyx and tanbumpyx (with the same effector properties, period and offset, as bumpy, because the constant sine wave was annoying)

        -attenuatex
        -attenuatey
        -attenuatez
            (these function the same way that parabola does, but is based on the distance from the center to determine the parabola direction)

        -movex0-n
        -movey0-n
        -movez0-n
            (move any column anywhere!)
            (example: 100% movex1 moves the down column one column to the right)
        -movex (or y or z) (shortcut to move the whole playfield in one direction)

        -tiny (mini that doesn't affect the targets' positioning)

        -pulseinner (inner size of the pulse - might remove, as this is basically just additive tiny?)
        -pulseouter (outer size of the pulse)
            -pulseperiod (controls how big the wave is)
            -pulseoffset (controls how far into the wave "0" is)
        -pulse (controls both inner and outer pulse at the same time)
            (*2.25 210000000 pulseoffset is interesting at 140bpm)

        -shrinklinear
        -shrinkmult
            (this goes well with attenuatex)

        -confusiony or x (see confusion)
            -confusionyoffset or xoffset (see confusionoffset)

        -dizzyholds (if this value is non zero, dizzy hold heads are enabled)

        -arbitrary translations
            (for exampe, -100% translatex0, 50% translatexoffset0 will make it so that there is a jump of 1 column to the left, half way up the screen)
            (the first translation with a value of 0 and an offset of 0 will terminate the chain, meaning they need to be done in order)
            (up to 1024 translations in each axis can be placed anywhere on the playfield. The terminator is important for stopping the (BIG) loops.)



        -grain (for controlling how many polygons the holds are made up of. 100% very fine, 1600% is very coarse.)
            (if the value is 0%, the default (4) pixels is used)

        -holdtype (!!!!! activate with holdtype mod, this controls the way holds are drawn. Most mods are unchanged,
            but some mods that have significant effects on the y axis will be altered. Boomerang will draw holds on he way down,
            and spirals will render properly. This is experimental, and it's not recommended you leave it on.)
            This mod is also called by "spiralholds"

        -longholds
            simply make holds longer
            yes, that's all it does

        -stealthtype
            set the same way as holdtype - makes it so that the stealth is based on musical distance from the receptors
            rather than physical onscreen distance.

        -drawsize (scales how far down the arrows stop drawing - 100% doubles the size of the playfield, -100% is no draw)
        -drawsizeback - like drawsize but for the area behind the targets




                                        ------some cool mods------

                                        -------------------------------------------
                                        -----wind tunnel mod by TaroNuke
                                        --this is fucking awesome
                                            {0,2000,'*1000 1.25x','end'},
                                                --slow it down
                                            {0,2000,'*1000 150 spiralx','end'},
                                            {0,2000,'*1000 -96 spiralxperiod','end'},
                                            {0,2000,'*1000 150 spiraly','end'},
                                            {0,2000,'*1000 -96 spiralyperiod','end'},
                                                --control the spiral
                                            {0,2000,'*1000 50 centered','end'},
                                            {0,2000,'*1000 100 mini','end'},
                                                --position and size
                                            {0,2000,'*1000 spiralholds','end'},
                                                --enable spiral holds
                                            {0,2000,'*1000 -100 tiny','end'},
                                            {0,2000,'*1000 -20 flip','end'},
                                                --make everything a bit bigger and more visible
                                            {0,2000,'*1000 3000 zigzagz','end'},
                                            {0,2000,'*1000 1000 zigzagzperiod','end'},
                                                --cause the arrows to fall towards the targets from the z axis

                                            {0,2000,'*1000 -300 movez','end'},
                                                --move everything away from the camera


                                        -------------------------------------------
                                        -----using the offsetters to create a small readable area by the targets

                                            {0,2000,'*1000 1.25x','end'},
                                            {0,2000,'*1000 200 spiralx','end'},
                                            {0,2000,'*1000 -95 spiralxperiod','end'},
                                            {0,2000,'*1000 200 spiraly','end'},
                                            {0,2000,'*1000 -95 spiralyperiod','end'},
                                            {0,2000,'*1000 50 centered','end'},
                                            {0,2000,'*1000 100 mini','end'},
                                            {0,2000,'*1000 spiralholds','end'},
                                            {0,2000,'*1000 -100 tiny','end'},
                                            {0,2000,'*1000 -20 flip','end'},
                                            {4,2000,'*0.1 50 brake','end'},
                                                --slow it down in the mercy gap

                                            ----outside the table----
                                            for i=0,10 do
                                                table.insert(mods,{0,2000,'*1000 15 translatey'..i,'end'})
                                                table.insert(mods,{0,2000,'*1000 '..(1+(i/2))..' translateyoffset'..i,'end'})
                                            end

                                        -----------------------------------------------
                                        -----offset the spiralx and y periods for FUNKY shit
                                            -- -96 spiralyperiod, -97 spiralxperiod = a weird planetarium


    Editing

        -F opens a WIP menu (missing from most themes atm, working on it)

        -Use G and H as shortcuts to edit BPM changes and stops
            -CTRL G and CTRL H can delete bpm changes and stops
            -Deleting BPMs less than 1/32nd of the way into the song is not allowed

        -Negative BPM and stop values can now be typed in in the editor

        -Fixed edit preview length using { and } hotkeys

        -CTRL+S, X, C and V act as save, cut, copy and paste

        -Make20ths within the compress options (Enter menu)
            (It's Compress 5->4 without changing the BPM - creates a 20th stream out of an equivalent 16th stream)
        -Undo20ths - in case you fucked up

        -New Turn mods (in the enter menu)
            -SwapLR (swaps lefts with rights) = CTRL+Left arrow
            -SwapUD = CTRL+Right arrow

        -New preference lets you choose if you want to autosave
            -also lets you choose how often
            -also lets you choose if whether or not you want the autosaves to save into a different file (.auto)
            -autosaving is silent

        -Can choose to output a lua table of the currently highlighted note data into an xml file from the ESC menu
            -Give the table a name
            -illegal characters are stripped
            -editor remembers which name was last used

        -50 notes per measure limit removed
        -Tween Overflow popup window replaced with an in-game System Message
            -The system message details the x and y positons of the overflowing actor, to help you track it down
        -Edit Steps Information can go above 13 (new limit is 30, because that's what this game has become AMIRITE)
        -Bpm shifts now treated properly, all your warps and high BPMs are instantaneous, instead of delayed.

        -F1 "help" menu no longer appears in editor - this was causing dumb crashes


        -PauseGame added
            -called with SCREENMAN:GetTopScreen():PauseGame(true) during ScreenGameplay, unpause by using false
            -Actors don't pause, so you can have minigames that continue while songs pause.
                -While music isn't playing, Actors can be sped up/slowed down with TAB/¬

        -Better tween overflow message
            -Tells you which file or object type is overflowing, and where the xml file is located.
            -The full path doesn't always fit on the screen, but it's easy to read it all in the console window or log.txt

        -Can choose to broadcast note crossed messages in the editor (preference), telling the game when an arrow has passed the receptors
            (e.g. StepCrossed0MessageCommand, MineCrossed3MessageCommand)

        -Player 1 and 2's judgment/combo positions and sizes now reset every time you start the song

        -New Preferences (select from "Preferences" in the "ESC" menu)
            -Ability to show Player 2 in editor, useful for courses with asymmetrical or playfield mods
                -P1 will be centered if P2 is turned off, just like the old editor.
            -Ability to hide BPM changes, Stops and measure line indicators during "editor gameplay"

        -Text Entry
            -The on-screen keyboard has been removed

        -Player 2
            -Player 2's notes will update when the song is opened, and will not update until you select "reload P2 steps" from the ESC menu.
            -This is handy because it allows two charts to be compared side by side during gameplay.

        -In-simfile lua that affects PlayerP1 and PlayerP2 playfield objects will affect the corresponding notefields accordingly.
        -Asymmetrical mods applied to players 1 and 2 will affect the corresponding notefields accordingly.
        -The screen will no longer get stuck performing a SCREENMAN effect when transitioning between playing and editing.
        -The screen returns to its original position (and rotation, and size!) when you return to editing mode.
        -lua targeted at SongForeground and SongBackground will work too.
        -lua targeting things that aren't on the editor screen but are on gameplay (e.g. Lyrics, Stage, ScoreFrame, LifeP1, ScoreP2) will no longer crash the game.

        -"Edit steps information" has been moved to the bottom of the ESC menu (from the top)

        -BUGFIX: Editor no longer plays around with DedicatedMenuButtons
        -BUGFIX: Creating an edit chart no longer crashes
            -(This was related to Text Entry)

    Misc
        -More sorting options allowing Courses to be sorted by Folder
        -"Error loading sprite file" no longer crashes the game - it uses a popup window instead
        -"Small negative number" Actor crash from negative Actor Update times has been removed 
            -it corrects itself and continues as normal, instead of crashing.
            -it warns you of a bad update delta via system message and in the log.
        -All menus now broadcast Step/Lift<Dir> Messages, e.g. StepPressLeft and StepLiftRight (don't ask)

        -"The error reporting interface has crashed" now picks randomly from 42 messages.
            -http://pastebin.com/JRj2qrYT
        -"Crash Reason: Access Violation" -> "Crash Reason: The cat doesn't like it" (don't ask)

        -Wireframe mode added to F3 (debug) menu, F3+O
        -Force crash also added (F3+I)

    Misc 2

        -More inputs
            -BullshitUp/Down/Left/Right configurable in config key/joy mappings
            -Action1-8 also configurable
            -Real input messages now broadcast on every screen without needing noteskins
                StepP1LeftPressMessageCommand
                StepP2RightLiftMessageCommand
                StepP1BullshitRightMessageCommand
                StepP2Action3LiftMessageCommand

        -Settable shader flags from within simfile
            -GAMESTATE:SetShaderFlag(shaderkey)
            -GAMESTATE:SetShaderFlagNum(key,which)
            -must set to 0 before another key can be pressed
            -Requires ReShade to be running, and the ShaderKeys program to be hooked into openITG
                -Occasionally, the memory addresses of the shader flags need updating

        -Cel Shading toggle added to models - self:SetCelShaded(1)
            -self:SetLineColor(r,g,b,a)
            -self:SetLineWidth(wid) --max of 10

        -Can Edit Textures
        -Can Move UV maps around

        -ActorFrameTexture
            Creates a texture in memory of everything BENEATH it (draw-order-dependent)
            NOT ACTUALLY AN ON SCREEN OBJECT.
            The created texture must be placed on a sprite.
            Example:

            ------------------------------------------------------------------------

                <LAYER Type="ActorFrameTexture"
                    InitCommand="%function(self)

                        self:SetWidth( DISPLAY:GetDisplayWidth() );
                        self:SetHeight( DISPLAY:GetDisplayHeight() );
                        self:EnableDepthBuffer( false );
                        self:EnableAlphaBuffer( true );
                        self:EnableFloat( false );
                        self:EnablePreserveTexture( true );

                        self:hidden(0);

                        self:Create();

                        t_aft_bgtex = self;

                    end"
                />

                <LAYER Type="Quad" ShowAFTMessageCommand="hidden,0" HideAFTMessageCommand="hidden,1"
                OnCommand="hidden,1;diffuse,0,0,0,1;stretchto,0,0,sw,sh" />

                <LAYER Type="Sprite" Texture="white"
                    ShowAFTMessageCommand="hidden,0" HideAFTMessageCommand="hidden,1"
                    InitCommand="x,SCREEN_CENTER_X;y,SCREEN_CENTER_Y;hidden,1"
                    OnCommand="%function(self)
                        self:basezoomx((SCREEN_WIDTH/DISPLAY:GetDisplayWidth()));
                        self:basezoomy(-1*(SCREEN_HEIGHT/DISPLAY:GetDisplayHeight()));
                        --this is important - oITG textures are flipped upside down by ragedisplay

                        self:SetTexture(t_aft_bgtex:GetTexture());

                        t_sprite_bg = self;
                    end"
                />

            ----------------------------------------------------------------------------
            --this "Sprite" (t_sprite_bg) is a copy of the topscreen that can be tweened like any sprite.
            --I put a black quad behind it.
            --You can put things on top of the sprite and they won't be part of the AFT.
            --You can put another AFT on top of this to capture the changes made to the topscreen in another texture.
            --The new texture must be placed on a second sprite.










        -ActorProxy
            (See SM5 implementation)

        -fov and SetFOV now works on playfield actors
            -addvanishx and addvanishy can now be used to fuck with the vanishing point of the playfield

        -Changes to models
            Models can have ActorFrameTextures rendered to them
            Models are now less fatal - missing textures or materials don't crash
        -Changes to sprites
            Malformed sprites no longer crash the game - a text warning pops up instead
        -Changes to XML
            Malformed XML such as
                <ActorFrame stuff><children> stuff </children></ASSHOLE>
            will no longer crash, but have a warning, and abort loading the script.

        -Choose whether you want music previews to loop or not on ScreenSelectMusic (in Data/StepMania.ini)

        -Alignment now functions like sm5

    TO DO (eventually)
        -Fix "Compress 2x" etc. behavior regarding holds - it needs to make them shorter/longer as appropriate
            -this behavior was fine in SM3.9, so it shouldn't be too hard to fix.
        -Warn of missing graphics when in edit mode


FUCK.exe / FUCK-STEPMANIA
-------------------------
Before the first public release, NotITG used to be known as FUCK.exe (forked at March 2011), and before then even,
FUCK-STEPMANIA(?). Fun fact, the global ``FUCK_EXE`` constant can be still used today from Lua to detect whether the
user is running ITG or NotITG.

FUCK.exe was originally created (as far as I can tell) to add/change to stuff related to theming, then later to allow
playing mods, as well as 2 players, in the editor.

One variant of FUCK-STEPMANIA is available on the StepMania Builds Archive.

FUCK-STEPMANIA Download from the builds archive (Windows): https://smbuilds.objects-us-east-1.dream.io/SM3.95/Windows/FUCK_STEPMANIA_ver3.95.zip

Old changelogs
--------------
Changelogs for NotITG v3 and before

Basic: https://notitg.heysora.net/files/basic-changelog.txt

Advanced: https://notitg.heysora.net/files/advanced-changelog.txt
