Song
====

|since_itg|

.. contents:: :local:

Description
-----------

Represents a song

.. _spell_card_format:

Spell card format
-----------------

.. code-block:: lua

    {
        Difficulty = int,
        Name = string,
        StartBeat = float,
        EndBeat = float,
        Color = {
            [1] = float, -- Red
            [2] = float, -- Green
            [3] = float, -- Blue
            [4] = float, -- Alpha
        }
    }

API reference
-------------

.. lua:autoclass:: Song
