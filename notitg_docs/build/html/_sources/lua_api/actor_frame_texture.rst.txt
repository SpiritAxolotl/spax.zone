ActorFrameTexture
=================

|since_notitg_v1|

.. contents:: :local:

Description
-----------

Often called a render target in other applications, an ActorFrameTexture (AFT) captures everything that was rendered
*before* it into a texture.

.. image:: /_static/image/actor_frame_texture/haze.jpg
   :width: 800
   :alt: An example of an ActorFrameTexture applied onto many sprites

An example of an ActorFrameTexture, rendered onto many sprites, taken from [WinDEU] Camellia - Maze of Vignere Square

**Note that this does not function like the ActorFrameTexture from StepMania 5!** StepMania 5's ActorFrameTexture
captures all of its children into a texture, whereas NotITG's one captures everything rendered before it.

Some example uses of ActorFrameTextures include:

- Post processing effects (such as bloom - achieved with a :lua:class:`ActorFrameTexture` to capture a framebuffer, and a :lua:class:`Sprite` to render the framebuffer with a custom shader program)
- Hazey appearences (like the above)
- Making smears by reusing textures from previous frame, or by not clearing the :lua:class:`ActorFrameTexture` between frames

API reference
-------------

.. lua:autoclass:: ActorFrameTexture

