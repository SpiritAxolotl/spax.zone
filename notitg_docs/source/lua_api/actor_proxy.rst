ActorProxy
==========

|since_notitg_v1|

.. contents:: :local:

Description
-----------

An :lua:class:`ActorProxy` is used to tell an actor to draw itself again. The actor to be drawn is its "target", and can
be set by calling :lua:meth:`ActorProxy.SetTarget`. Note that an :lua:class:`ActorProxy` will draw even if its target
is hidden.

Any shaders set on the targetted actor will continue to be used when redrawn by the :lua:class:`ActorProxy` - you should
not call :lua:meth:`Actor.SetShader` on the :lua:class:`ActorProxy` object itself.

Some practical uses for an :lua:class:`ActorProxy` include...

- Making more playfields appear (An :lua:class:`ActorProxy` should be preferred over enabling playfields 3 through 8 since proxies are more lightweight)
- Changing the draw order of actors you can't modify (Since actors cannot be moved between background, playfield, foreground, etc. layers, you can hide the original actors and proxy them instead to achieve the same effect)
- Moving judgment sprites/combo text independently of the playfields (This can be helpful if you're moving the playfield all over the place and don't want the judgment/combo actors following along)

API reference
-------------

.. lua:autoclass:: ActorProxy

