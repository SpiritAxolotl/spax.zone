Actor
=====

|since_itg|

.. contents:: :local:

Description
-----------

An actor is an object in the world that can have commands and Lua code bundled with it.

.. _actor_hooks:

Hooks
-----

|since_itg|

Description
^^^^^^^^^^^

An actor can have various hooks associated with it, that is, functions or commands that are executed on certain
conditions. Hook names *always* end in ``Command`` (for actor-local events) or ``MessageCommand`` (for global events).

Hooks can be added to an actor as XML attributes

.. code-block:: xml
   :emphasize-lines: 5, 7, 8, 9, 10, 11, 12, 13

    <Layer
        Type="Sprite"
        File="image/circle.png"

        InitCommand="diffuse,1,0,0,1;x,200"

        OnCommand="%
            function(self)
                -- Animate the actor along the X axis
                self:linear(1)
                self:x(100)
            end
        "
    />

Note how Lua hooks need to begin with a percent (``%``) sign - the spaces/newlines after the percent sign are optional.

For more information on message commands, see :doc:`/message_commands`. For more information on command notation
(present above with ``InitCommand``), see :lua:meth:`Actor.cmd`.

The game has various built-in hooks that it calls on actors at certain points. You can create your own arbitrarily named
hooks and execute them using the :lua:func:`Actor.playcommand()` and :lua:func:`Actor.queuecommand()` functins.

.. code-block:: xml
   :emphasize-lines: 7, 10

    <Layer
        Type="Sprite"
        File="image/circle.png"

        OnCommand="%
            function(self)
                self:playcommand('Magic') -- Executes a hook instantly

                self:sleep(4)
                self:queuecommand('Hello') -- Executes a hook when next possible (in this case, after 4 seconds)
            end
        "

        MagicCommand="%
            function(self)
                SCREENMAN:SystemMessage('The magic command was fired!')
            end
        "

        HelloCommand="%
            function(self)
                SCREENMAN:SystemMessage('The hello command was fired, after a 4 second delay')
            end
        "
    />

Built-in hooks
^^^^^^^^^^^^^^

**InitCommand**

|since_itg|

``InitCommand`` is executed as soon as possible on actors - in fact, it's called so early, that it's dangerous to
interact with other actors from within an ``InitCommand``, since they may not be accessible yet (this can crash the game
with an access violation).

Note that actors in a ``#BGCHANGES`` section will *not* have ``InitCommand`` fired on them. Prefer ``#BETTERBGCHANGES``
if you want this behaviour.

**OnCommand**

|since_itg|

After all actors have been created and have had ``InitCommand`` executed on each of them, ``OnCommand`` is fired. It's
safe to access other actors from within an ``OnCommand``.

**ScreenReadyCommand**

|since_notitg_v4_2_0|

This runs before the song starts. TopScreen is guaranteed the be available here.

**OffCommand**

|since_itg|

The ``OffCommand`` is fired when an actor is about to be removed. You will generally not need to use this in mod charts.
This seems unrelable to use during gameplay anyways (doesn't seem to always be fired).

.. _actor_conditions:

Conditions
^^^^^^^^^^

|since_itg|

Actors can have a ``Condition`` XML attribute added to them - a Lua expression that's evaluated before everything (even
before ``InitCommand``). If the expression evaluates to ``true``, the actor works as normal - if it evaluates to
``false`` however, it's disabled.

.. code-block:: xml
   :emphasize-lines: 4

    <!-- Will be shown only if the "Insane" difficulty is played by P1. -->
    <Layer
        Type="Quad"
        Condition="GAMESTATE:IsPlayerEnabled(0) and GAMESTATE:GetCurrentSteps(0):GetDifficulty() == 4"
        InitCommand="x,SCREEN_CENTER_X;y,SCREEN_CENTER_Y;zoomto,100,100;diffuse,1,1,1,1"
    />

Note that conditions aren't evaluated on the root :lua:class:`ActorFrame` of an XML file if you're running |itg| or
|notitg_v1|.

XML attributes
--------------

XML attributes can start with ``@`` if you want to specify a Lua expression. Eg: ``<Layer Type="ActorSound"
Var="tt_mine" File="@THEME:GetPath(EC_SOUNDS,'','Player mine')"/>`` to load an ``ActorSound`` with the mine sound.

**Name**

The ``Name`` attribute is used to, well, give a name to an actor. Names can be used to get a reference to actors with
:lua:meth:`ActorFrame.GetChild`.

.. code-block:: xml
   :emphasize-lines: 6, 15

    <Layer
        Type="ActorFrame"
        OnCommand="%
            function(self)
                -- Fetch the child of us named itg_logo, and hide it
                local itg_logo = self:GetChild('itg_logo')
                itg_logo:hidden(1)
            end
        "
    >
        <children>

            <Layer
                Type="Sprite"
                Name="itg_logo"

                File="image/itg_logo.png"
            />

        </children>
    </Layer>

**Type**

The actor class that the actor should be (Eg: :lua:class:`Sprite`, :lua:class:`ActorFrame`, :lua:class:`Model`). This is
sometimes not necessary and can be inferred from a ``File`` attribute.

**File**

Not used by the base actor class itself, but it can be used during parsing to infer the actor type to be used (Eg: A
PNG file will make the actor a :lua:class:`Sprite`, and a TXT file will make the actor a :lua:class:`Model`).

**Condition**

See :ref:`actor_conditions`

**Var**

|since_notitg_v3_1|

The ``Var`` attribute can be used to create a global variable that references an actor.

.. code-block:: xml
   :emphasize-lines: 3

    <Layer
        Type="Sprite"
        Var="shader_earth"

        Vert="shader/earth.vert"
        Frag="shader/earth.frag"

        InitCommand="hidden,1"
    />

The above example can be used to create a actor globally accessible with the variable ``shader_earth``. It can be useful
to keep "shader provider" actors around, since you can update shader variables (uniforms) from one place to update it
everywhere, as opposed to needing to manually set a uniform in every place you use the shader.

**Vert**

|since_notitg_v3|

The ``Vert`` attribute specifies a filepath (relative to the XML) to a vertex shader an actor should use. If not
provided, the default NotITG vertex shader will be used instead.

**Frag**

|since_notitg_v3|

The ``Frag`` attribute specifies a filepath (relative to the XML) to a fragment shader an actor should use. If not
provided, the default NotITG fragment shader will be used instead.

**Shader**

|since_notitg_v3|

An alias for the ``Frag`` attribute.

Tweening
--------

|since_itg|

Various properties on the actor can be tweened (animated) by the StepMania engine itself, without needing to update them
on a regular cycle from Lua. Look out for functions marked with |tween| and |tweenable|.

An example of a tween

.. code-block:: lua

    self:accelerate(4) -- Start a 4 second tween where animations accelerate towards the end
    self:xy(SCREEN_CENTER_X, SCREEN_CENTER_Y) -- Animate the actor towards the center of the screen
    self:zoom(8) -- and animate it towards 8x the scale

    self:sleep(0) -- Queue up a new tween (yes, sleep is a tween) that lasts for zero seconds
    self:zoom(1) -- Reset the scale *instantly* once it's done animating

The aux value
^^^^^^^^^^^^^

|since_itg|

Every actor has a hidden "aux" number property on it. The aux value is simply a tweenable number that can be used for
whatever purpose you want to use it for in Lua.

See :lua:meth:`Actor.aux`, :lua:meth:`Actor.getaux`, and :lua:meth:`Actor.addaux`.

API reference
-------------

.. lua:autoclass:: Actor
