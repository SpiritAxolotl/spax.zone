Message commands
================

|since_itg|

.. contents:: :local:

Description
-----------

Message commands are hooks that are fired on *all* actors.  You can fire your own custom message commands using
``MESSAGEMAN:Broadcast('ILoveVideoGames')`` (which will execute ``ILoveVideoGamesMessageCommand`` everywhere).

.. code-block:: xml

    <Layer
        Type="Actor"

        ILoveVideoGamesMessageCommand="%
            function(self)
                -- Do a column swap
                GAMESTATE:ApplyModifiers('25% Flip,-75% Invert')
            end
        "
    />

Built-in message commands
-------------------------

Fk_P<player>_<judgment>MessageCommand
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
where ``<player>`` is ``1`` or ``2``, and ``<judgment>`` is any from ``W1`` through ``W6``

|since_unk|

Fired on judgments

- W1 through W5 represent "Marvelous!" through "Bad" judgments
- W6 is "Miss"
- W8 is mine hit

Fk_P<player>_<judment>_HoldMessageCommand
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
where ``<player>`` is ``1`` or ``2``, and ``judgment`` is ``OK`` or ``NG``

|since_unk|

Fired on hold note judgment

Fk_P<player>_<judment>_RollMessageCommand
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
where ``<player>`` is ``1`` or ``2``, and ``judgment`` is ``OK`` or ``NG``

|since_unk|

Fired on roll note judgment

Fk_P<player>_Complete_<judgment>MessageCommand
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
where ``<player>`` is ``1`` or ``2``, and ``<judgment>`` is any from ``W1`` through ``W6``

|since_unk|

???

Fk_P<player>_<judgment>_EarlyMessageCommand
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
where ``<player>`` is ``1`` or ``2``, and ``<judgment>`` is any from ``W1`` through ``W5``, ``OK``, or ``NG``

|since_notitg_v3| (2017-08-21 - UKSRT9 build)

Fired on early judgments

- W1 through W5 represent "Marvelous!" through "Bad!" judgments
- OK and NG (Not Good) are for hold notes

Fk_P<player>_<judgment>_LateMessageCommand
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
where ``<player>`` is ``1`` or ``2``, and ``<judgment>`` is any from ``W1`` through ``W5``, ``OK``, or ``NG``

|since_notitg_v3| (2017-08-21 - UKSRT9 build)

Fired on late judgments

- W1 through W5 represent "Marvelous!" through "Bad!" judgments
- OK and NG (Not Good) are for hold notes

FailP<player>MessageCommand
^^^^^^^^^^^^^^^^^^^^^^^^^^^
where ``<player>`` is ``1`` or ``2``

|since_notitg_v4_0_1|

Fired when a player's health reaches zero. Note that this is fired even when the fail mode is set to ``FailOff``.

WindowFocusMessageCommand
^^^^^^^^^^^^^^^^^^^^^^^^^

|since_notitg_v4|

Fired when the NotITG window gains focus.

WindowFocusLostMessageCommand
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

|since_notitg_v4|

Fired when the NotITG window loses focus.

StepCrossed<num>MessageCommand
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

|since_unk|

MineCrossed<num>MessageCommand
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

|since_unk|

StepP<player><input><action>MessageCommand
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
where ``<player>`` is ``1`` or ``2``, ``<input>`` is an input name, and ``<action>`` is ``Press`` or ``Lift``

|since_unk|

Fired when pressing/releasing input mappings

Valid input names include:

- ``MenuLeft``
- ``MenuRight``
- ``MenuUp``
- ``MenuDown``
- ``Start``
- ``Select``
- ``Back``
- ``Coin``
- ``Operator``
- ``Left``
- ``Right``
- ``Up``
- ``Down``
- ``UpLeft``
- ``UpRight``
- ``ActionLeft`` (Formerly ``BullshitLeft``)
- ``ActionRight`` (Formerly ``BullshitRight``)
- ``ActionUp`` (Formerly ``BullshitUp``)
- ``ActionDown`` (Formerly ``BullshitDown``)
- ``Action1``
- ``Action2``
- ``Action3``
- ``Action4``
- ``Action5``
- ``Action6``
- ``Action7``
- ``Action8``
- ``MenuStart``

SaltyResetMessageCommand
^^^^^^^^^^^^^^^^^^^^^^^^

|since_notitg_v3_1|

Fired when using ``Ctrl-R`` to restart a song.
