Enumerations
============

.. contents:: :local:

Enumerator variants in UPPERCASE have globally accessible constants, and can be used from anywhere in your Lua scripts.

CoinMode
--------

.. cpp:enum:: CoinMode

   See :lua:func:`GameState.GetCoinMode`.

   |since_itg|

   .. cpp:enumerator::
      COIN_MODE_HOME = 0
      COIN_MODE_PAY = 1
      COIN_MODE_FREE = 2

CourseDifficulty
----------------

.. cpp:enum:: CourseDifficulty

   A course difficulty rating

   |since_itg|

   .. cpp:enumerator::
      COURSE_DIFFICULTY_BEGINNER = 0
      COURSE_DIFFICULTY_EASY = 1
      COURSE_DIFFICULTY_REGULAR = 2
      COURSE_DIFFICULTY_DIFFICULT = 3
      COURSE_DIFFICULTY_CHALLENGE = 4
      COURSE_DIFFICULTY_EDIT = 5

Difficulty
----------

.. cpp:enum:: Difficulty

   A step difficulty rating

   |since_itg|

   .. cpp:enumerator::
      DIFFICULTY_BEGINNER = 0
      DIFFICULTY_EASY = 1
      DIFFICULTY_MEDIUM = 2
      DIFFICULTY_HARD = 3
      DIFFICULTY_CHALLENGE = 4
      DIFFICULTY_EDIT = 5

ElementCategory
---------------

.. cpp:enum:: ElementCategory

   Various bits that make up a theme

   See :lua:func:`ThemeManager.GetPath`.

   |since_itg|

   .. cpp:enumerator::
      EC_BGANIMATIONS = 0
      EC_FONTS = 1
      EC_GRAPHICS = 2
      EC_NUMBERS = 3
      EC_SOUNDS = 4
      EC_OTHER = 5

Grade
-----

.. cpp:enum:: Grade

   A grade obtained after completing a song

   |since_itg|

   .. cpp:enumerator:: GRADE_TIER01 = 0

    AAAA

   .. cpp:enumerator:: GRADE_TIER02 = 1

    AAA

   .. cpp:enumerator:: GRADE_TIER03 = 2

    AA

   .. cpp:enumerator:: GRADE_TIER04 = 3

    A

   .. cpp:enumerator:: GRADE_TIER05 = 4

    B

   .. cpp:enumerator:: GRADE_TIER06 = 5

    C

   .. cpp:enumerator:: GRADE_TIER07 = 6

    D

   .. cpp:enumerator::
      GRADE_TIER08 = 7
      GRADE_TIER09 = 8
      GRADE_TIER10 = 9
      GRADE_TIER11 = 10
      GRADE_TIER12 = 11
      GRADE_TIER13 = 12
      GRADE_TIER14 = 13
      GRADE_TIER15 = 14
      GRADE_TIER16 = 15
      GRADE_TIER17 = 16
      GRADE_TIER18 = 17
      GRADE_TIER19 = 18
      GRADE_TIER20 = 19

    E

   .. cpp:enumerator::
      GRADE_FAILED = 20

GoalType
--------

.. cpp:enum:: GoalType

   |since_itg|

   .. cpp:enumerator::
      GOAL_CALORIES = 0
      GOAL_TIME = 1
      GOAL_NONE = 2

HoldNoteScore
-------------

.. cpp:enum:: HoldNoteScore

   A judgment for a hold note

   |since_itg|

   .. cpp:enumerator::
      HNS_NONE = 0
      HNS_NG = 1

    "Not good" - a hold note was released early

   .. cpp:enumerator:: HNS_OK = 2

    A hold note was held to completion

InputMode
---------

.. cpp:enum:: InputMode

   See :lua:func:`GameState.GetInputMode` and :lua:func:`GameState.SetInputMode`

   |since_notitg_v1|

   .. cpp:enumerator::
      Normal = 0
      BothAtOnce = 1

    Playing as player 1 also controls player 2

MemoryCardState
---------------

.. cpp:enum:: MemoryCardState

   See :lua:func:`MemoryCardManager.GetCardState()`

   |since_itg|

   .. cpp:enumerator::
      Ready = 0
      Checking = 1
      TooLate = 2
      Error = 3
      Removed = 4
      NoCard = 5

Premium
-------

.. cpp:enum:: Premium

   See :lua:func:`GameState.GetPremium()`

   |since_itg|

   .. cpp:enumerator::
      PREMIUM_NONE = 0
      PREMIUM_DOUBLE = 1

    Double for 1 credit

   .. cpp:enumerator:: PREMIUM_JOINT = 2

    2 players for 1 credit

PolygonMode
-----------

.. cpp:enum:: PolygonMode

   See :lua:func:`Model.SetPolygonMode()`

   |since_notitg_v1|

   .. cpp:enumerator:: Fill = 0

   Faces are filled in

   .. cpp:enumerator:: Line = 1

   Only edges are drawn - typically known as a "wireframe"

RadarCategory
-------------

.. cpp:enum:: RadarCategory

   |since_itg|

   .. cpp:enumerator::
      RADAR_CATEGORY_STREAM = 0
      RADAR_CATEGORY_VOLTAGE = 1
      RADAR_CATEGORY_AIR = 2
      RADAR_CATEGORY_FREEZE = 3
      RADAR_CATEGORY_CHAOS = 4
      RADAR_CATEGORY_TAPS = 5
      RADAR_CATEGORY_JUMPS = 6
      RADAR_CATEGORY_HOLDS = 7
      RADAR_CATEGORY_MINES = 8
      RADAR_CATEGORY_HANDS = 9
      RADAR_CATEGORY_ROLLS = 10

SortOrder
---------

.. cpp:enum:: SortOrder

   A method to use for sorting and grouping items on the song select wheel. Sort order can be changed by quickly
   pressing up, down, up, down on the song select screen.

   See :lua:func:`GameState.GetSortOrder()`

   |since_itg|

   .. cpp:enumerator::
      SORT_PREFERRED = 0
      SORT_GROUP = 1
      SORT_TITLE = 2
      SORT_BPM = 3
      SORT_POPULARITY = 4
      SORT_TOP_GRADES = 5
      SORT_ARTIST = 6
      SORT_GENRE = 7
      SORT_SONG_LENGTH = 8
      SORT_EASY_METER = 9
      SORT_MEDIUM_METER = 10
      SORT_HARD_METER = 11
      SORT_CHALLENGE_METER = 12
      SORT_MODE_MENU = 13
      SORT_ALL_COURSES = 14
      SORT_NONSTOP = 15
      SORT_ONI = 16
      SORT_ENDLESS = 17
      SORT_ROULETTE = 18

StepsType
---------

.. cpp:enum:: StepsType

   |since_itg|

   .. cpp:enumerator::
      STEPS_TYPE_DANCE_SINGLE = 0
      STEPS_TYPE_DANCE_DOUBLE = 1
      STEPS_TYPE_DANCE_COUPLE = 2
      STEPS_TYPE_DANCE_SOLO = 3
      STEPS_TYPE_PUMP_SINGLE = 4
      STEPS_TYPE_PUMP_HALFDOUBLE = 5
      STEPS_TYPE_PUMP_DOUBLE = 6
      STEPS_TYPE_PUMP_COUPLE = 7
      STEPS_TYPE_EZ2_SINGLE = 8
      STEPS_TYPE_EZ2_DOUBLE = 9
      STEPS_TYPE_EZ2_REAL = 10
      STEPS_TYPE_PARA_SINGLE = 11
      STEPS_TYPE_PARA_VERSUS = 12
      STEPS_TYPE_DS3DDX_SINGLE = 13
      STEPS_TYPE_BM_SINGLE5 = 14
      STEPS_TYPE_BM_DOUBLE5 = 15
      STEPS_TYPE_BM_SINGLE7 = 16
      STEPS_TYPE_BM_DOUBLE7 = 17
      STEPS_TYPE_MANIAX_SINGLE = 18
      STEPS_TYPE_MANIAX_DOUBLE = 19
      STEPS_TYPE_TECHNO_SINGLE4 = 20
      STEPS_TYPE_TECHNO_SINGLE5 = 21
      STEPS_TYPE_TECHNO_SINGLE8 = 22
      STEPS_TYPE_TECHNO_DOUBLE4 = 23
      STEPS_TYPE_TECHNO_DOUBLE5 = 24
      STEPS_TYPE_PNM_FIVE = 25
      STEPS_TYPE_PNM_NINE = 26
      STEPS_TYPE_LIGHTS_CABINET = 27

TapNoteScore
------------

.. cpp:enum:: TapNoteScore

   A judgment for a tap note

   |since_itg|

   .. cpp:enumerator::
      TNS_NONE = 0
      TNS_HITMINE = 1
      TNS_AVOIDMINE = 2
      TNS_MISS = 3
      TNS_BOO = 4
      TNS_GOOD = 5
      TNS_GREAT = 6
      TNS_PERFECT = 7

PlayerController
----------------

.. cpp:enum:: PlayerController

   |since_itg|

   .. cpp:enumerator::
      Human = 0
      AutoPlay = 1
      AutoPlayCpu = 2
