Player
======

|since_itg|

.. contents:: :local:

Description
-----------

A playfield, obtainable with ``SCREENMAN:GetTopScreen():GetChild("PlayerP1")`` (where ``P1`` can be any value from
``P1`` to ``P8``).

.. _note_data_format:

Note data format
----------------

A note data table is a table containing other tables. I'm gonna call the inner tables "NoteDefs", because each table
defines one note.

A NoteDef is a Lua table with 3 elements: a beat number/second number, the column number, and the type of the note.

.. code-block:: lua

    {
        [1] = beatOrSecond, -- Usually a beat number, unless noted otherwise
        [2] = columnNum,
        [3] = noteType,
    }

For hold and roll heads, an additional field ``length`` will tell you how many beats the hold lasts for.

Note types match the values in the ``.sm`` file format (https://github.com/stepmania/stepmania/wiki/sm#note-values), and
can be either an int or a string.

.. code-block::

    0: No note
    1: Tap note
    2: Hold head
    4: Roll head
    M: Mine

Pseudo-C
^^^^^^^^

.. code-block:: c

   typedef struct NoteDef {
        float beatOrSecond; // Index 1 into the Lua table (usually a beat number unless noted otherwise)
        int columnNum; // Index 2
        int/string noteType; // Index 3
   } NoteDef;

   typedef NoteDef NoteData[];

API reference
-------------

.. lua:autoclass:: Player
