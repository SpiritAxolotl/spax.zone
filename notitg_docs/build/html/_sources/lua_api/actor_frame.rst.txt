ActorFrame
==========

|since_itg|

.. contents:: :local:

Description
-----------

An ActorFrame is an actor that contains other actors.

ActorFrames in StepMania effectively acts their own cameras - hence it has its own field-of-view (FOV), far clipping
plane, and vanishing point settings.

XML attributes
--------------

**FOV**

Sets the initial field-of-view (in degrees) used by the ActorFrame to render its children.

**FarDist**

Sets the initial far clipping plane (draw distance) used by the ActorFrame to render its children.

**VanishX**

Sets the initial X position of the vanishing point used by the ActorFrame to render its children.

**VanishY**

Sets the initial Y position of the vanishing point used by the ActorFrame to render its children.

API reference
-------------

.. lua:autoclass:: ActorFrame
