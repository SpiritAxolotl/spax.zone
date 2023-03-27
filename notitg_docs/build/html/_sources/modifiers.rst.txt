Modifiers
=========
|since_itg|

.. .. contents:: :local:

This list is complete (as of |notitg_v4_0_1|), but sorely lacking in descriptions/images. Want to help contribute to
these docs? The source is available at https://gitlab.com/CraftedCart/notitg_docs

All # are ints, example: spline#rotx# can be spline1rotx3

All % are floats, example: %x can be 1.5x

.. raw:: html

    <button onclick="sortMods('defaultIdx', false)">Sort mods by default</button>
    <button onclick="sortMods('freq', true)">Sort mods by popularity*</button>
    <small>* Not 100% accurate as it's hard to search for mod names like "X" that also commonly appear outside of mod usage</small>

.. raw:: html

    <section id="mod-list">

.. mod:: <noteskin>
   :aliases: arrowkun,cel,metal,scalable,de-default,DivinEntity

   where ``<noteskin>`` is the name of a note skin

   |since_itg|

   Sets the player's noteskin (eg: ``metal``)

   This does not seem to work from :lua:meth:`GameState.ApplyModifiers` - use :lua:meth:`GameState.LaunchAttack`, or a
   ``#MODS``/``#ATTACKS`` section in your .sm file.

.. mod:: %x

   |since_itg|

   Sets the scroll speed to use XMod at a given speed

   With no other modifiers, 1x causes arrows to scroll up 1/10th of the screen (the size of the arrow sprite) per beat.

.. mod:: AddScore

   |since_itg|

.. mod:: Alternate, Ultraman

   |since_itg|

   (For more complicated mods, consider using column specific Reverse instead)

   Reverses the second and forth columns

   https://0b5vr.com/flip-invert/

.. mod:: ApproachType

.. mod:: ArrowCull

.. mod:: ArrowPath

   |column_specific_available|

   Shows lines for the path arrows take to the receptors

   Mod percentage controls the opacity of the lines

   ArrowPathDiffuse|%|%|%
   ^^^^^^^^^^^^^^^^^^^^^^

   ArrowPathDrawDistance
   ^^^^^^^^^^^^^^^^^^^^^

   ArrowPathDrawDistanceBack
   ^^^^^^^^^^^^^^^^^^^^^^^^^

   ArrowPathDrawDistanceFront
   ^^^^^^^^^^^^^^^^^^^^^^^^^^

   ArrowPathDrawSize
   ^^^^^^^^^^^^^^^^^

   ArrowPathDrawSizeBack
   ^^^^^^^^^^^^^^^^^^^^^

   ArrowPathDrawSizeFront
   ^^^^^^^^^^^^^^^^^^^^^^

   ArrowPathFadeBottom|%|%|%
   ^^^^^^^^^^^^^^^^^^^^^^^^^

   ArrowPathFadeBottomOffset|%|%|%
   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

   ArrowPathFadeTop|%|%|%
   ^^^^^^^^^^^^^^^^^^^^^^

   ArrowPathFadeTopOffset|%|%|%
   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^

   ArrowPathGirth
   ^^^^^^^^^^^^^^

   ArrowPathGrain
   ^^^^^^^^^^^^^^

   ArrowPathGranulate
   ^^^^^^^^^^^^^^^^^^

   ArrowPathSize
   ^^^^^^^^^^^^^

   ArrowPathWidth
   ^^^^^^^^^^^^^^

.. mod:: Asymptote

   AsymptoteOffset
   ^^^^^^^^^^^^^^^

   AsymptoteScale
   ^^^^^^^^^^^^^^

   AsymptoteSize
   ^^^^^^^^^^^^^

.. mod:: Attenuate

   AttenuateOffset
   ^^^^^^^^^^^^^^^

.. mod:: AttenuateX

   AttenuateXOffset
   ^^^^^^^^^^^^^^^^

.. mod:: AttenuateZ

   AttenuateZOffset
   ^^^^^^^^^^^^^^^^

.. mod:: AverageScore

   |since_itg|

.. mod:: Beat
   :video: Beat.webm

   |since_itg|

   |column_specific_available_since_notitg_v4_2_0|

   Makes the arrows/receptors shake on beats

   BeatCap
   ^^^^^^^
   |column_specific_available_since_notitg_v4_2_0|

   BeatMult
   ^^^^^^^^
   |column_specific_available_since_notitg_v4_2_0|

   BeatOffset
   ^^^^^^^^^^
   |column_specific_available_since_notitg_v4_2_0|

   BeatPeriod
   ^^^^^^^^^^
   |column_specific_available_since_notitg_v4_2_0|

   BeatSize
   ^^^^^^^^

.. mod:: BeatY

   BeatCapY
   ^^^^^^^^

   BeatYMult
   ^^^^^^^^^

   BeatYOffset
   ^^^^^^^^^^^

   BeatYPeriod
   ^^^^^^^^^^^

   BeatYSize
   ^^^^^^^^^

.. mod:: BeatZ

   BeatCapZ
   ^^^^^^^^

   BeatZMult
   ^^^^^^^^^

   BeatZOffset
   ^^^^^^^^^^^

   BeatZPeriod
   ^^^^^^^^^^^

   BeatZSize
   ^^^^^^^^^

.. mod:: Big

|since_itg|

.. mod:: Blind

   |since_itg|

   Warning: This mod will cause all noteflashes to appear as though they were fantastics. Reccomend hiding Judgements
   with actor:hidden()

   Hides the judgements, combo and causes all noteflashes to appear fantastic, removing all player feedback.

.. mod:: Blink

   |since_itg|

   Arrows flash between visible and hidden

   BlinkBlue / BlinkB
   ^^^^^^^^^^^^^^^^^^

   BlinkGreen / BlinkG
   ^^^^^^^^^^^^^^^^^^^

   BlinkRed / BlinkR
   ^^^^^^^^^^^^^^^^^

.. mod:: BMRize

   |since_itg|

   Adds arrows to make them a more comically challenging

   BMR is a reference to BemaniRuler

.. mod:: Boomerang

   |since_itg|

.. mod:: Boost

   |since_itg|

   |column_specific_available_since_notitg_v4_2_0|

   Arrows accelerate as they approach the receptors

.. mod:: Bounce
   :video: Bounce.webm

   Makes arrows bounce horizontally towards the receptors

   BounceOffset
   ^^^^^^^^^^^^

   BouncePeriod
   ^^^^^^^^^^^^

.. mod:: BounceZ

   BounceZOffset
   ^^^^^^^^^^^^^

   BounceZPeriod
   ^^^^^^^^^^^^^

.. mod:: Brake, Land

   |since_itg|

   |column_specific_available_since_notitg_v4_2_0|

   Arrows slow down as they approach the receptors

.. mod:: Bumpy, BumpyZ

   |column_specific_available|

   |since_itg|

   The notes move forward and backwards along the depth axis following a sine wave.

   This also enables depth testing.

   BumpyOffset / BumpyZOffset
   ^^^^^^^^^^^^^^^^^^^^^^^^^^
   |column_specific_available|

   Note that column specific BumpyOffset only modifies the corresponding column specific Bumpy, and not general Bumpy


   BumpyPeriod / BumpyZPeriod
   ^^^^^^^^^^^^^^^^^^^^^^^^^^
   |column_specific_available|

   BumpySize / BumpyZSize
   ^^^^^^^^^^^^^^^^^^^^^^

.. mod:: BumpyX

   |column_specific_available|

   BumpyXOffset
   ^^^^^^^^^^^^
   |column_specific_available|

   BumpyXPeriod
   ^^^^^^^^^^^^
   |column_specific_available|

   BumpyXSize
   ^^^^^^^^^^

.. mod:: BumpyY

   |column_specific_available|

   BumpyYOffset
   ^^^^^^^^^^^^
   |column_specific_available|

   BumpyYPeriod
   ^^^^^^^^^^^^
   |column_specific_available|

   BumpyYSize
   ^^^^^^^^^^

.. mod:: C%

   |since_itg|

   Sets the scroll speed to use CMod at a given speed

.. mod:: Centered

   |since_itg|

   Centers the receptors vertically on the screen. Values greater than ``100%`` move the receptors past the screen's
   center.

.. mod:: Centered2

   Centers the arrows following the arrowpaths.

.. mod:: ClearAll

   |since_itg|

   Resets all mods

   Also resets splines if :lua:meth:`Player.NoClearSplines` is ``false``

.. mod:: Confusion
   :video: Confusion.webm

   The notes and receptors spin. The head of hold-notes will not spin unless :ref:`mod-DizzyHolds` is enabled.

   ConfusionOffset
   ^^^^^^^^^^^^^^^
   |column_specific_available|

   Offset the rotation for the Confusion mod

   Mod percentage is in radians multiplied by 100

.. mod:: ConfusionX

   ConfusionXOffset
   ^^^^^^^^^^^^^^^^
   |column_specific_available|

.. mod:: ConfusionY

   ConfusionYOffset
   ^^^^^^^^^^^^^^^^
   |column_specific_available|

.. mod:: ConfusionZ

   ConfusionZOffset
   ^^^^^^^^^^^^^^^^
   |column_specific_available|

.. mod:: Converge

.. mod:: CosClip

.. mod:: CouplesMirror

   |turn_mod|

.. mod:: CouplesSwapNotes

   |turn_mod|

.. mod:: Cover

   |since_itg|

   Darkens the background

.. mod:: Cross

   |since_itg|

   (For more complicated mods, consider using column specific Reverse instead)

   Reverses the middle two columns

   https://0b5vr.com/flip-invert/

.. mod:: CubicX

   CubicXOffset
   ^^^^^^^^^^^^

.. mod:: CubicY

   CubicYOffset
   ^^^^^^^^^^^^

.. mod:: CubicZ

   CubicZOffset
   ^^^^^^^^^^^^

.. mod:: CustomNoteFlash

.. mod:: Dark

   |column_specific_available|

   |since_itg|

   Hides the receptors, while keeping the blue/yellow/green/etc. flashes when tapping on notes

.. mod:: Diffuse|%|%|%

.. mod:: Digital

   DigitalOffset
   ^^^^^^^^^^^^^

   DigitalPeriod
   ^^^^^^^^^^^^^

   DigitalSteps
   ^^^^^^^^^^^^

.. mod:: DigitalZ

   DigitalZOffset
   ^^^^^^^^^^^^^^

   DigitalZPeriod
   ^^^^^^^^^^^^^^

   DigitalZSteps
   ^^^^^^^^^^^^^

.. mod:: DisableMines

.. mod:: Distant

   |since_itg|

   A notefield perspective modifier

   The notefield is tilted away from the player, at a lesser angle compared to :ref:`mod-Space`

.. mod:: Dizzy
   :video: Dizzy.webm

   |since_itg|

   |column_specific_available_since_notitg_v4_2_0|

   The notes spin in their lanes along the Z axis. The head of hold-notes will not spin unless :ref:`mod-DizzyHolds` is
   enabled.

.. mod:: DizzyHolds

   Makes hold heads spin like regular tap notes with mods like Dizzy or Confusion

.. mod:: DrawDistance

.. mod:: DrawDistanceBack

.. mod:: DrawDistanceFront

.. mod:: DrawSize
   :video: DrawSize.webm

   Determines how far back the arrows start drawing

.. mod:: DrawSizeBack

.. mod:: DrawSizeFront

.. mod:: Drunk
   :video: Drunk.webm

   |since_itg|

   |column_specific_available_since_notitg_v4_2_0|

   The notes/receptors sway left and right

   DrunkOffset
   ^^^^^^^^^^^
   |column_specific_available_since_notitg_v4_2_0|

   DrunkPeriod
   ^^^^^^^^^^^
   |column_specific_available_since_notitg_v4_2_0|

   DrunkSize
   ^^^^^^^^^

   DrunkSpacing
   ^^^^^^^^^^^^
   |column_specific_available_since_notitg_v4_2_0|

   DrunkSpeed
   ^^^^^^^^^^
   |column_specific_available_since_notitg_v4_2_0|

.. mod:: DrunkY

   DrunkYOffset
   ^^^^^^^^^^^^

   DrunkYPeriod
   ^^^^^^^^^^^^

   DrunkYSize
   ^^^^^^^^^^

   DrunkYSpacing
   ^^^^^^^^^^^^^

   DrunkYSpeed
   ^^^^^^^^^^^

.. mod:: DrunkZ

   DrunkZOffset
   ^^^^^^^^^^^^

   DrunkZPeriod
   ^^^^^^^^^^^^

   DrunkZSize
   ^^^^^^^^^^

   DrunkZSpacing
   ^^^^^^^^^^^^^

   DrunkZSpeed
   ^^^^^^^^^^^

.. mod:: Echo

   |since_itg|

.. mod:: Expand
   :video: Expand.webm

   |since_itg|

   Makes arrows repeatedly expand and contract vertically. Negative values will make arrows alternate above and below
   the receptors.

   ExpandPeriod
   ^^^^^^^^^^^^

   ExpandSize
   ^^^^^^^^^^

.. mod:: FadeBottom|%|%|%

   FadeBottomOffset|%|%|%
   ^^^^^^^^^^^^^^^^^^^^^^

.. mod:: FadeTop|%|%|%

   FadeTopOffset|%|%|%
   ^^^^^^^^^^^^^^^^^^^

.. mod:: FallX|%|%|%

   |column_specific_available|

.. mod:: FallY|%|%|%

   |column_specific_available|

.. mod:: FallZ|%|%|%

   |column_specific_available|

.. mod:: Flip

   |since_itg|

   Horizontally flips all four columns.

   Values between ``0%`` and ``50%`` can be used to change the spacing between receptors, keeping the column order the
   same;

   ``50%`` flip places all the four receptors on top of each other;

   and values between ``50%`` and ``100%`` can be used to change the spacing between receptors, with the order being
   flipped.

   https://0b5vr.com/flip-invert/

.. mod:: Floored

   |since_itg|

.. mod:: GayHolds

   |column_specific_available|

   The opposite of :ref:`mod-StraightHolds`

.. mod:: GlitchyTan, CoSec


.. mod:: GlobalModTimer, ModTimer, Timer

   By default, some mods (like ``Drunk``) operate on a global timer, meaning stuff can look slightly different between
   plays of a chart. ``GlobalModTimer`` makes these mods use the song position instead of the global timer, so that the
   mod will look the exact same each time (Eg: so ``Drunk`` will look the exact same 15 seconds into a song every time).

   GlobalModTimerMult, ModTimerMult, TimerMult
   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

   GlobalModTimerOffset, ModTimerOffset, TimerOffset
   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. mod:: Grain, Granulate

.. mod:: Halgun

   Hides hold judgements. (Yeah! and NG)

.. mod:: Hallway

   |since_itg|

   A notefield perspective modifier

   The notefield is tilted towards the player, at a lesser angle compared to :ref:`mod-Incoming`

.. mod:: Hidden
   :video: Hidden.webm

   |since_itg|

   Flashes arrows (white by default) and hides them as they approach the receptors

   HiddenOffset
   ^^^^^^^^^^^^
   |since_itg|

.. mod:: HiddenBlue, HiddenB

   HiddenBlueOffset, HiddenBO
   ^^^^^^^^^^^^^^^^^^^^^^^^^^

.. mod:: HiddenGreen, HiddenG

   HiddenGreenOffset, HiddenGO
   ^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. mod:: HiddenRed, HiddenR

   HiddenRedOffset, HiddenRO
   ^^^^^^^^^^^^^^^^^^^^^^^^^^

.. mod:: Hide


.. mod:: HideHolds

   |column_specific_available|

   Hides the hold bit of hold notes

.. mod:: HideMines

   |column_specific_available|

   Hides mines

.. mod:: HideNoteFlash, HideNoteFlashes

   |column_specific_available|

   Hides the blue/yellow/green/etc. receptor flashes when arrows are hit

.. mod:: HoldCull

.. mod:: HoldGirth
   :image: HoldGirth.png

   |column_specific_available|

   Makes the tail of hold notes wider (or narrower, for negative values)

.. mod:: HoldStealth

   |column_specific_available|

   Like Steath but on hold tails.

.. mod:: HoldsToRolls

   |since_itg|

.. mod:: HoldTiny

   |column_specific_available|

.. mod:: Incoming

   |since_itg|

   A notefield perspective modifier

   The notefield is tilted towards the player - notes appear farther away, coming closer to the player as they approach
   the receptors.

.. mod:: Invert

   |since_itg|

   Pulls the outer two columns to the middle, pulls the inner two columns to the outer

   https://0b5vr.com/flip-invert/

.. mod:: Judgescale / Timing

   |since_itg|

.. mod:: Left

   |since_itg|

   |turn_mod|

   Permutes the columns, causing the player to play the chart as though they had turned to the left.

   - Left -> Down
   - Down -> Right
   - Up -> Left
   - Right -> Up

.. mod:: Little

   |since_itg|

.. mod:: LongBoy, LongBoys, LongHolds
   :video: LongHolds.webm

   Makes holds appear longer/shorter than they actually are

   ``100% LongHolds`` makes holds appear to be double their length, ``-100% LongHolds`` hides holds entirely.

.. mod:: M%

   |since_itg|

   Sets the scroll speed to use MMod at a given speed

.. mod:: ManualNoteFlash, HideNotePress

   ``HideNotePress`` available from |notitg_v4_2_0|

   Hides note presses

.. mod:: MetaDizzy

   |since_notitg_v4_2_0|

   |metamod|

.. mod:: MetaFlip

   |since_notitg_v4_2_0|

   |metamod|

.. mod:: MetaInvert

   |since_notitg_v4_2_0|

   |metamod|

.. mod:: MetaOrient

   |since_notitg_v4_2_0|

   |metamod|

.. mod:: MetaReverse

   |since_notitg_v4_2_0|

   |metamod|

.. mod:: MetaStealth

   |since_notitg_v4_2_0|

   |metamod|

.. mod:: Mines

   |since_itg|

.. mod:: MineStealth

   |column_specific_available|

   Like Stealth but only on mines.

.. mod:: Mini

   |since_itg|

   Shrinks/grows the playfield

   ``100% Mini`` makes the playfield half size, ``200% Mini`` makes the playfield zero sized, negative values make the
   playfield larger.

.. mod:: Mirror

   |since_itg|

   |turn_mod|

   Permutes the columns, swapping Left and Right, and Up and Down.

   - Left -> Right
   - Down -> Up
   - Up -> Down
   - Right -> Left

.. mod:: MoveX

   |column_specific_available|

   Moves the playfield in the X direction. ``100% MoveX`` moves the playfield by the size of the arrow sprite (64
   pixels).

.. mod:: MoveY

   |column_specific_available|

   Moves the playfield in the Y direction. ``100% MoveY`` moves the playfield by the size of the arrow sprite (64
   pixels).

.. mod:: MoveZ

   |column_specific_available|

   Moves the playfield in the Z direction. ``100% MoveZ`` moves the playfield by the size of the arrow sprite (64
   pixels).

.. mod:: NoFreeze

.. mod:: NoHands

   |since_itg|

.. mod:: NoHoldJudge

.. mod:: NoHolds

   |since_itg|

   Removes holds in the chart.

.. mod:: NoJumps

   |since_itg|

   Removes all apperances of 2 arrows at the same time.

.. mod:: NoMines

   |since_itg|

   Removes all mines

.. mod:: NoQuads

   |since_itg|

   Removes all apperances of 4 arrows at the same time.

.. mod:: NoRolls

   |since_itg|

   Removes all rolls in the chart.

.. mod:: NoStretch

   |since_itg|

   .. TODO: What counts as a strech?

.. mod:: NoteSkew, NoteSkewX
   :image: NoteSkewX.png

   |column_specific_available|

   Skews notes / receptors in the X axis.

   Negative values skew in the opposite direction.

.. mod:: NoteSkewY
   :image: NoteSkewY.png

   |column_specific_available|

   Skews notes / receptors in the Y axis.

   Negative values skew in the opposite direction.

.. mod:: NoteSkewType

.. mod:: NoteSkin

.. mod:: Orient

   |since_notitg_v4|

   Additionally rotates arrows in the direction of travel relative to "upwards".

   It can also be used in percentages, to increase or decrease or even invert the effect.

   For downwards scroll (e.g. with Reverse or splines), combine this mod with 314% ConfusionOffset

   Since |notitg_v4_2_0|, ``Orient`` now reorients itself when when reverse and SCAR mods are enabled.  If you have used
   Orient+Reverse before, setting 314% ConfusionOffset is no longer required.

   OrientOffset
   ^^^^^^^^^^^^
   |since_notitg_v4_2_0|

   It changes the direction the `Orient` mod should reference

   NoReorient
   ^^^^^^^^^^
   |since_notitg_v4_2_0|

   Disables the `Orient` behavior optimized for reverse and SCAR families

.. mod:: Overhead

   |since_itg|

   The default perspective - notes scroll on a flat surface from bottom to top

.. mod:: ParabolaX
   :image: ParabolaX.png

   ParabolaXOffset
   ^^^^^^^^^^^^^^^

.. mod:: ParabolaY
   :video: ParabolaY.webm

   ParabolaYOffset
   ^^^^^^^^^^^^^^^

.. mod:: ParabolaZ
   :image: ParabolaZ.png

   ParabolaZOffset
   ^^^^^^^^^^^^^^^

.. mod:: Passmark

   |since_itg|

.. mod:: Planted

   |since_itg|

.. mod:: Pulse
   :video: Pulse.webm

   Arrows grow and shrink in size as they approach the receptors

.. mod:: PulseInner

.. mod:: PulseOuter

.. mod:: PulseOffset

.. mod:: PulsePeriod

.. mod:: Quick

   |since_itg|

.. mod:: Random

   |since_itg|

.. mod:: Randomize

   |since_notitg_v4_2_0|

   Randomize shuffles the notes while they are within the “invisibe” region created by Vanish.

   RandomizeOffset
   ^^^^^^^^^^^^^^^
   |since_notitg_v4_2_0|

   Adjusts the location where `Randomize` takes effect.

.. mod:: RandomizeMirror

.. mod:: RandomizeOffset

.. mod:: RandomSpeed
   :video: RandomSpeed.webm

   |since_itg|

   Randomizes the speed of each note.

   Negative values have no effect.

.. mod:: RandomVanish

   |since_itg|

   A combination of the `Randomize` and `Vanish` mods.

   RandomVanishOffset
   ^^^^^^^^^^^^^^^^^^
   |since_notitg_v4_2_0|

   Controls both `RandomizeOffset` and `VanishOffset`

.. mod:: ReceptorZBuffer

   |column_specific_available|

.. mod:: Reverse

   |column_specific_available|

   Pulls all four receptors to the bottom of the playfield and makes the arrows come down from the top

   https://0b5vr.com/flip-invert/

   ReverseType
   ^^^^^^^^^^^
   Allows reverse to go beyond 100% values.  (without ReverseType, 130% reverse will look identical to 70% reverse)

.. mod:: Right

   |since_itg|

   |turn_mod|

   Permutes the columns, causing the player to play the chart as though they had turned to the right.

   - Left -> Up
   - Down -> Left
   - Up -> Right
   - Right -> Down

.. mod:: Roll
   :video: Roll.webm

   |since_itg|

   |column_specific_available_since_notitg_v4_2_0|

   The notes spin in their lanes around the X axis.

   The notes and receptors spin. The head of hold-notes will not spin unless :ref:`mod-DizzyHolds` is enabled.

.. mod:: RotationX

   Rotates the playfield around the X axis.

   Units are in degrees.

.. mod:: RotationY

   Rotates the playfield around the Y axis.

   Units are in degrees.

.. mod:: RotationZ

   Rotates the playfield around the Z axis.

   Units are in degrees.

.. mod:: Sawtooth

   |column_specific_available_since_notitg_v4_2_0|

   SawtoothOffset
   ^^^^^^^^^^^^^^
   |column_specific_available_since_notitg_v4_2_0|

   SawtoothPeriod
   ^^^^^^^^^^^^^^
   |column_specific_available_since_notitg_v4_2_0|

   SawtoothSize
   ^^^^^^^^^^^^

.. mod:: SawtoothZ

   SawtoothZOffset
   ^^^^^^^^^^^^^^^

   SawtoothZPeriod
   ^^^^^^^^^^^^^^^

   SawtoothZSize
   ^^^^^^^^^^^^^

.. mod:: ScreenFilter

.. mod:: ScrollSpeedMult

   |since_notitg_v4_2_0|

   |column_specific_available|

   Multipies the speed mod of a single column.

   Default value is 100%. 50% is half-speed.

.. mod:: ShrinkLinear

.. mod:: ShrinkLinearX

.. mod:: ShrinkLinearY

.. mod:: ShrinkLinearZ

.. mod:: ShrinkMult

.. mod:: ShrinkMultX

.. mod:: ShrinkMultY

.. mod:: ShrinkMultZ

.. mod:: Shuffle

   |since_itg|

   |turn_mod|

.. mod:: SinClip

.. mod:: SkewType

.. mod:: SkewX

.. mod:: SkewY

.. mod:: Skippy

   |since_itg|

.. mod:: SmartBlender

   |turn_mod|

   Randomly changes chart notedata, in a way that does not cause doublesteps and preserves some chart properties, such
   as timing of jacks and drills.

   SmartBlender will never output a file with crossovers or footswitches.

.. mod:: SoftShuffle

   |turn_mod|

   Randomly applies SwapLeftRight and SwapUpDown, with 4 possible resulting charts.

.. mod:: Space

   |since_itg|

   A notefield perspective modifier

   The notefield is tilted away from the player.

.. mod:: SpiralHolds, HoldType

   A different hold renderer (very noticable on the Y axis)

.. mod:: SpiralX

   SpiralXOffset
   ^^^^^^^^^^^^^

   SpiralXPeriod
   ^^^^^^^^^^^^^

.. mod:: SpiralY

   SpiralYOffset
   ^^^^^^^^^^^^^

   SpiralYPeriod
   ^^^^^^^^^^^^^

.. mod:: SpiralZ

   SpiralZOffset
   ^^^^^^^^^^^^^

   SpiralZPeriod
   ^^^^^^^^^^^^^

.. mod:: Spline#RotX#

   Spline#RotXOffset#
   ^^^^^^^^^^^^^^^^^^

   Spline#RotXReset
   ^^^^^^^^^^^^^^^^

.. mod:: Spline#RotY#

   Spline#RotYOffset#
   ^^^^^^^^^^^^^^^^^^

   Spline#RotYReset
   ^^^^^^^^^^^^^^^^

.. mod:: Spline#RotZ#

   Spline#RotZOffset#
   ^^^^^^^^^^^^^^^^^^

   Spline#RotZReset
   ^^^^^^^^^^^^^^^^

.. mod:: Spline#Size#

   Spline#SizeOffset#
   ^^^^^^^^^^^^^^^^^^

   Spline#SizeReset
   ^^^^^^^^^^^^^^^^

.. mod:: Spline#Skew#

   Spline#SkewOffset#
   ^^^^^^^^^^^^^^^^^^

   Spline#SkewReset
   ^^^^^^^^^^^^^^^^

.. mod:: Spline#Stealth#

   Spline#StealthOffset#
   ^^^^^^^^^^^^^^^^^^^^^

   Spline#StealthReset
   ^^^^^^^^^^^^^^^^^^^

.. mod:: Spline#Tiny#

   Spline#TinyOffset#
   ^^^^^^^^^^^^^^^^^^

   Spline#TinyReset
   ^^^^^^^^^^^^^^^^

.. mod:: Spline#X#

   Spline#XOffset#
   ^^^^^^^^^^^^^^^

   Spline#XReset
   ^^^^^^^^^^^^^

.. mod:: Spline#Y#

   Spline#YOffset#
   ^^^^^^^^^^^^^^^

   Spline#YReset
   ^^^^^^^^^^^^^

.. mod:: Spline#Z#

   Spline#ZOffset#
   ^^^^^^^^^^^^^^^

   Spline#Zoom#
   ^^^^^^^^^^^^

.. mod:: Spline#ZoomOffset#

   Spline#ZoomReset
   ^^^^^^^^^^^^^^^^

   Spline#ZReset
   ^^^^^^^^^^^^^

.. mod:: SplineRotX#

   SplineRotXOffset#
   ^^^^^^^^^^^^^^^^^

   SplineRotXReset
   ^^^^^^^^^^^^^^^

.. mod:: SplineRotXType

   SplineRotY#
   ^^^^^^^^^^^

   SplineRotYOffset#
   ^^^^^^^^^^^^^^^^^

.. mod:: SplineRotYReset

   SplineRotYType
   ^^^^^^^^^^^^^^

   SplineRotZ#
   ^^^^^^^^^^^

.. mod:: SplineRotZOffset#

   SplineRotZReset
   ^^^^^^^^^^^^^^^

   SplineRotZType
   ^^^^^^^^^^^^^^

.. mod:: SplineSize#

   SplineSizeOffset#
   ^^^^^^^^^^^^^^^^^

   SplineSizeReset
   ^^^^^^^^^^^^^^^

   SplineSizeType
   ^^^^^^^^^^^^^^

.. mod:: SplineSkew#

   SplineSkewOffset#
   ^^^^^^^^^^^^^^^^^

   SplineSkewReset
   ^^^^^^^^^^^^^^^

   SplineSkewType
   ^^^^^^^^^^^^^^

.. mod:: SplineStealth#

   SplineStealthOffset#
   ^^^^^^^^^^^^^^^^^^^^

   SplineStealthReset
   ^^^^^^^^^^^^^^^^^^

   SplineStealthType
   ^^^^^^^^^^^^^^^^^

.. mod:: SplineTiny#

   SplineTinyOffset#
   ^^^^^^^^^^^^^^^^^

   SplineTinyReset
   ^^^^^^^^^^^^^^^

   SplineTinyType
   ^^^^^^^^^^^^^^

.. mod:: SplineX#

   SplineXOffset#
   ^^^^^^^^^^^^^^

   SplineXReset
   ^^^^^^^^^^^^

   SplineXType
   ^^^^^^^^^^^

.. mod:: SplineY#

   SplineYOffset#
   ^^^^^^^^^^^^^^

   SplineYReset
   ^^^^^^^^^^^^

   SplineYType
   ^^^^^^^^^^^

.. mod:: SplineZ#

   SplineZOffset#
   ^^^^^^^^^^^^^^

   SplineZoom#
   ^^^^^^^^^^^

   SplineZoomOffset#
   ^^^^^^^^^^^^^^^^^

.. mod:: SplineZoomReset

   SplineZoomType
   ^^^^^^^^^^^^^^

   SplineZReset
   ^^^^^^^^^^^^

   SplineZType
   ^^^^^^^^^^^

.. mod:: Split

   |since_itg|

   (For more complicated mods, consider using column specific Reverse instead)

   Reverses the rightmost two columns

   https://0b5vr.com/flip-invert/

.. mod:: SpookyShuffle

|turn_mod|

.. mod:: Square

   SquareOffset
   ^^^^^^^^^^^^

   SquarePeriod
   ^^^^^^^^^^^^

.. mod:: SquareZ

   SquareZOffset
   ^^^^^^^^^^^^^

   SquareZPeriod
   ^^^^^^^^^^^^^

.. mod:: Stealth
   :video: Stealth.webm

   |column_specific_available|

   |since_itg|

   Hides the arrows. 50% turns the arrows completely white. 100% makes the arrows completely hidden.

   Arrows not hit become visible after passing the receptors (see :ref:`mod-StealthPastReceptors` if you want them to
   stay stealthed)

.. mod:: StealthBlue, StealthB

.. mod:: StealthGreen, StealthG

.. mod:: StealthRed, StealthR

.. mod:: StealthGlow|%|%|%

   |column_specific_available|

.. mod:: StealthGlowBlue, StealthGB

.. mod:: StealthGlowGreen, StealthGG

.. mod:: StealthGlowRed, StealthGR

.. mod:: StealthPastReceptors

   If you have Stealth enabled (or a stealth spline), by default arrows that aren't hit will appear again once they fly
   past the receptors - this makes them not do that

.. mod:: StealthType

.. mod:: Stomp

.. mod:: StraightHolds

   |column_specific_available|

   - Higher percentages make holds follow the arrow path less
   - Over 100%, the holds start following the opposite of the arrow path
   - Less than 0%, the holds follow the arrow path but "more"

.. mod:: SubtractScore

   |since_itg|

.. mod:: Sudden

   |since_itg|

   Makes arrows appear on the notefield closer to the receptors than usual

   SuddenOffset
   ^^^^^^^^^^^^
   |since_itg|

   Toy around with different percentage values to adjust how far away arrows appear with the Sudden mod

   Stealth splines are easier if you want to be exact

.. mod:: SuddenBlue, SuddenB

   SuddenBlueOffset, SuddenBO
   ^^^^^^^^^^^^^^^^^^^^^^^^^^

.. mod:: SuddenGreen, SuddenG

   SuddenGreenOffset, SuddenGO
   ^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. mod:: SuddenRed, SuddenR

   SuddenRedOffset, SuddenRO
   ^^^^^^^^^^^^^^^^^^^^^^^^^

.. mod:: SuperShuffle

   |since_itg|

   |turn_mod|

.. mod:: SwapLeftRight

   |turn_mod|

   Permutes the columns, swapping the left and right arrows.

   - Left -> Right
   - Down -> Down
   - Up -> Up
   - Right -> Left

.. mod:: SwapSides

   |turn_mod|

.. mod:: SwapUpDown

   |turn_mod|

   Permutes the columns, swapping the up and down arrows.

   - Left -> Left
   - Down -> Up
   - Up -> Down
   - Right -> Right

.. mod:: TanBumpy, TanBumpyZ

   |column_specific_available|
   ``TanBumpyZ`` available from |notitg_v4_2_0|

   TanBumpyOffset, TanBumpyZOffset
   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   |column_specific_available_since_notitg_v4_2_0|
   ``TanBumpyZOffset`` available from |notitg_v4_2_0|

   TanBumpyPeriod, TanBumpyZPeriod
   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   |column_specific_available_since_notitg_v4_2_0|
   ``TanBumpyZPeriod`` available from |notitg_v4_2_0|

   TanBumpySize, TanBumpyZSize
   ^^^^^^^^^^^^^^^^^^^^^^^^^^^
   |column_specific_available_since_notitg_v4_2_0|
   ``TanBumpyZSize`` available from |notitg_v4_2_0|

.. mod:: TanBumpyX

   |column_specific_available|

   TanBumpyXOffset
   ^^^^^^^^^^^^^^^
   |column_specific_available_since_notitg_v4_2_0|

   TanBumpyXPeriod
   ^^^^^^^^^^^^^^^
   |column_specific_available_since_notitg_v4_2_0|

   TanBumpyXSize
   ^^^^^^^^^^^^^
   |column_specific_available_since_notitg_v4_2_0|

.. mod:: TanBumpyY

   |column_specific_available|

   TanBumpyYOffset
   ^^^^^^^^^^^^^^^
   |column_specific_available_since_notitg_v4_2_0|

   TanBumpyYPeriod
   ^^^^^^^^^^^^^^^
   |column_specific_available_since_notitg_v4_2_0|

   TanBumpyYSize
   ^^^^^^^^^^^^^
   |column_specific_available_since_notitg_v4_2_0|

.. mod:: TanClip

.. mod:: TanDigital

   TanDigitalOffset
   ^^^^^^^^^^^^^^^^

   TanDigitalPeriod
   ^^^^^^^^^^^^^^^^

   TanDigitalSteps
   ^^^^^^^^^^^^^^^

.. mod:: TanDigitalZ

   TanDigitalZOffset
   ^^^^^^^^^^^^^^^^^

   TanDigitalZPeriod
   ^^^^^^^^^^^^^^^^^

   TanDigitalZSteps
   ^^^^^^^^^^^^^^^^

.. mod:: TanDrunk

   TanDrunkOffset
   ^^^^^^^^^^^^^^

   TanDrunkPeriod
   ^^^^^^^^^^^^^^

   TanDrunkSize
   ^^^^^^^^^^^^

   TanDrunkSpacing
   ^^^^^^^^^^^^^^^

   TanDrunkSpeed
   ^^^^^^^^^^^^^

.. mod:: TanDrunkY

   TanDrunkYOffset
   ^^^^^^^^^^^^^^^

   TanDrunkYPeriod
   ^^^^^^^^^^^^^^^

   TanDrunkYSize
   ^^^^^^^^^^^^^

   TanDrunkYSpacing
   ^^^^^^^^^^^^^^^^

   TanDrunkYSpeed
   ^^^^^^^^^^^^^^

.. mod:: TanDrunkZ

   TanDrunkZOffset
   ^^^^^^^^^^^^^^^

   TanDrunkZPeriod
   ^^^^^^^^^^^^^^^

   TanDrunkZSize
   ^^^^^^^^^^^^^

   TanDrunkZSpacing
   ^^^^^^^^^^^^^^^^

   TanDrunkZSpeed
   ^^^^^^^^^^^^^^

.. mod:: TanExpand

   TanExpandPeriod
   ^^^^^^^^^^^^^^^

   TanExpandSize
   ^^^^^^^^^^^^^

.. mod:: TanPulse

   TanPulseInner
   ^^^^^^^^^^^^^

   TanPulseOuter
   ^^^^^^^^^^^^^

   TanPulseOffset
   ^^^^^^^^^^^^^^

   TanPulsePeriod
   ^^^^^^^^^^^^^^

.. mod:: TanTipsy

   TanTipsyOffset
   ^^^^^^^^^^^^^^

   TanTipsySpacing
   ^^^^^^^^^^^^^^^

   TanTipsySpeed
   ^^^^^^^^^^^^^

.. mod:: TanTornado
   :video: TanTornado.webm

   TanTornadoOffset
   ^^^^^^^^^^^^^^^^

   TanTornadoPeriod
   ^^^^^^^^^^^^^^^^

.. mod:: TanTornadoZ
   :video: TanTornadoZ.webm

   TanTornadoZOffset
   ^^^^^^^^^^^^^^^^^

   TanTornadoZPeriod
   ^^^^^^^^^^^^^^^^^

.. mod:: TextureFilterOff

   |column_specific_available|

.. mod:: Tiny

   |column_specific_available|

   |since_notitg_unk|

   Reduces the size of the arrows, without changing their position relative to each other like mini does. 200% will
   cause the arrows to disappear entirely.

.. mod:: TinyX

   |column_specific_available|

   Reduces the size of the arrows in the X direction.

.. mod:: TinyY

   |column_specific_available|

   Reduces the size of the arrows in the Y direction.

.. mod:: TinyZ

   |column_specific_available|

   Reduces the size of the arrows in the Z direction.

.. mod:: Tipsy
   :video: Tipsy.webm

   |since_itg|

   Columns bob up and down

   TipsyOffset
   ^^^^^^^^^^^

   TipsySpacing
   ^^^^^^^^^^^^

   TipsySpeed
   ^^^^^^^^^^

.. mod:: Tornado
   :video: Tornado.webm

   |since_itg|

   The notes fly in from the left, to the right, as they move towards the receptors

   TornadoOffset
   ^^^^^^^^^^^^^

   TornadoPeriod
   ^^^^^^^^^^^^^

.. mod:: TornadoZ
   :video: TornadoZ.webm

   TornadoZOffset
   ^^^^^^^^^^^^^^

   TornadoZPeriod
   ^^^^^^^^^^^^^^

.. mod:: Turn

   |since_itg|

.. mod:: Twirl
   :video: Twirl.webm

   |since_itg|

   |column_specific_available_since_notitg_v4_2_0|

   The notes and their holds spin in 3D (around the Y/up axis)

   This creates a nice twisting appearance for the holds

.. mod:: Twister

   |since_itg|

.. mod:: Vanish

   |since_notitg_v4_2_0|

   Vanish makes the arrows disappear for a bit at a spot in the middle of the screen.

   VanishOffset
   ^^^^^^^^^^^^
   |since_notitg_v4_2_0|

   Adjusts the location where `Vanish` takes effect.

   VanishSize
   ^^^^^^^^^^
   |since_notitg_v4_2_0|

.. mod:: Wave
   :video: Wave.webm

   |since_itg|

   |column_specific_available|

   Arrows slow down before speeding back up to approach the receptors.

   WaveOffset
   ^^^^^^^^^^
   |column_specific_available|

   WavePeriod
   ^^^^^^^^^^
   |column_specific_available|

   WaveSize
   ^^^^^^^^

.. mod:: Wide

   |since_itg|

.. mod:: WireFrame

   |column_specific_available|

   WireFrameGirth
   ^^^^^^^^^^^^^^
   |column_specific_available|

   WireFrameWidth
   ^^^^^^^^^^^^^^
   |column_specific_available|

.. mod:: X

   Moves the playfield in the X direction.

.. mod:: Y

   Moves the playfield in the Y direction.

.. mod:: Z

   Moves the playfield in the Z direction.

.. mod:: ZBuffer

   Makes arrows/holds read from and write to the depth/Z buffer

.. mod:: Zigzag
   :video: Zigzag.webm

   |column_specific_available_since_notitg_v4_2_0|

   Makes arrows zig-zag left and right towards the receptors

   ZigzagOffset
   ^^^^^^^^^^^^
   |column_specific_available_since_notitg_v4_2_0|

   ZigzagPeriod
   ^^^^^^^^^^^^
   |column_specific_available_since_notitg_v4_2_0|

   ZigzagSize
   ^^^^^^^^^^

.. mod:: ZigzagZ

   ZigzagZOffset
   ^^^^^^^^^^^^^

   ZigzagZPeriod
   ^^^^^^^^^^^^^

   ZigzagZSize
   ^^^^^^^^^^^

.. mod:: Zoom
   :video: Zoom.webm

   Scales the entire playfield by the zoom percentage given

.. mod:: ZoomX

.. mod:: ZoomY

.. mod:: ZoomZ

.. mod:: ZTest

.. raw:: html

    </section>

.. mod-js::

.. |column_specific_available| replace:: |receptor_16| Column-specific variant available (add the column number, 0
   indexed, to the end of the mod name)

.. |column_specific_available_since_notitg_v4_2_0| replace:: |receptor_16| Column-specific variant available since
   |notitg_v4_2_0| (add the column number, 0 indexed, to the end of the mod name)

.. |turn_mod| replace:: (This mod is a Turn mod, and directly affects the player's notedata. It cannot be applied mid-file.)

.. |metamod| replace:: (This mod is a metamod, cannot be applied by a simfile, and will disqualify your score.)
