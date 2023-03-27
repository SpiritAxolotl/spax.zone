RageShaderProgram
=================

|since_notitg_v3|

.. contents:: :local:

Description
-----------

An OpenGL shader program

.. image:: /_static/image/shader/glow_dots.jpg
   :width: 800
   :alt: An example of a post processing shader

*oooh, it's all glowy and dotty* - An example of a shader taken from [FMS_Cat] Chroma - I

Any actor can have custom shaders applied to them via the :lua:meth:`Actor.SetShader` method, or by just providing
``Vert`` and/or ``Frag`` XML attributes. In addition, bits of the playfield can have shaders applied to them with
:lua:meth:`Player.SetArrowShader`, :lua:meth:`Player.SetHoldShader`, :lua:meth:`Player.SetReceptorShader`, and
:lua:meth:`Player.SetArrowPathShader`.

.. TODO - The above

Some example uses of shaders include:

- Post processing effects (such as bloom - achieved with a :lua:class:`ActorFrameTexture` to capture a framebuffer, and a :lua:class:`Sprite` to render the framebuffer with a custom shader program)
- Raymarching
- Making objects shiny/reflective
- Providing custom view/projection matrices to actors

API reference
-------------

.. lua:autoclass:: RageShaderProgram
