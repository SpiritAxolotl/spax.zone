--- @class RageShaderProgram
--- @field public __index table Gives you the ``RageShaderProgram`` table again
local RageShaderProgram = {}

--- Sets an int/bool uniform
---
--- |since_notitg_v3|
---
--- @param uniformName string The name of the uniform to set
--- @param value int The value to set on uniform
---
--- @return void
function RageShaderProgram:uniform1i(uniformName, value) end

--- Sets an int/bool uniform, or an array of int/bool uniforms
---
--- |since_notitg_v4|
---
--- @param uniformName string The name of the uniform to set
--- @param values table The values to set (This should be a table with 1 element, or any multiple of 1 for setting arrays)
---
--- @return void
function RageShaderProgram:uniform1iv(uniformName, values) end

--- Sets a float uniform
---
--- |since_notitg_v3|
---
--- @param uniformName string The name of the uniform to set
--- @param value float The value to set on the uniform
---
--- @return void
function RageShaderProgram:uniform1f(uniformName, value) end

--- Sets a float uniform, or an array of float uniforms
---
--- |since_notitg_v4|
---
--- @param uniformName string The name of the uniform to set
--- @param values table The values to set (This should be a table with 1 element, or any multiple of 1 for setting arrays)
---
--- @return void
function RageShaderProgram:uniform1fv(uniformName, values) end

--- Sets a \*vec2 uniform
---
--- |since_notitg_v3|
---
--- @param uniformName string The name of the uniform to set
--- @param x float The X value to set on the uniform
--- @param y float The Y value to set on the uniform
---
--- @return void
function RageShaderProgram:uniform2f(uniformName, x, y) end

--- Sets a \*vec2 uniform, or an array of \*vec2 uniforms
---
--- |since_notitg_v4|
---
--- @param uniformName string The name of the uniform to set
--- @param values table The values to set (This should be a table with 2 elements, or any multiple of 2 for setting arrays)
---
--- @return void
function RageShaderProgram:uniform2fv(uniformName, values) end

--- Sets a \*vec3 uniform
---
--- |since_notitg_v3|
---
--- @param uniformName string The name of the uniform to set
--- @param x float The X value to set on the uniform
--- @param y float The Y value to set on the uniform
--- @param z float The Z value to set on the uniform
---
--- @return void
function RageShaderProgram:uniform3f(uniformName, x, y, z) end

--- Sets a \*vec3 uniform, or an array of \*vec3 uniforms
---
--- |since_notitg_v4|
---
--- @param uniformName string The name of the uniform to set
--- @param values table The values to set (This should be a table with 3 elements, or any multiple of 3 for setting arrays)
---
--- @return void
function RageShaderProgram:uniform3fv(uniformName, values) end

--- Sets a \*vec4 uniform
---
--- |since_notitg_v3|
---
--- @param uniformName string The name of the uniform to set
--- @param x float The X value to set on the uniform
--- @param y float The Y value to set on the uniform
--- @param z float The Z value to set on the uniform
--- @param w float The W value to set on the uniform
---
--- @return void
function RageShaderProgram:uniform4f(uniformName, x, y, z, w) end

--- Sets a \*vec4 uniform, or an array of \*vec4 uniforms
---
--- |since_notitg_v4|
---
--- @param uniformName string The name of the uniform to set
--- @param values table The values to set (This should be a table with 4 elements, or any multiple of 4 for setting arrays)
---
--- @return void
function RageShaderProgram:uniform4fv(uniformName, values) end

--- Sets a 2x2 matrix uniform, or an array of 2x2 matrix uniforms
---
--- |since_notitg_v4|
---
--- @param uniformName string The name of the uniform to set
--- @param values table The values to set (This should be a table with 4 elements, or any multiple of 4 for setting arrays)
---
--- @return void
function RageShaderProgram:uniformMatrix2fv() end

--- Sets a 3x3 matrix uniform, or an array of 3x3 matrix uniforms
---
--- |since_notitg_v4|
---
--- @param uniformName string The name of the uniform to set
--- @param values table The values to set (This should be a table with 9 elements, or any multiple of 9 for setting arrays)
---
--- @return void
function RageShaderProgram:uniformMatrix3fv(uniformName, values) end

--- Sets a 4x4 matrix uniform, or an array of 4x4 matrix uniforms
---
--- |since_notitg_v4|
---
--- @param uniformName string The name of the uniform to set
--- @param values table The values to set (This should be a table with 16 elements, or any multiple of 16 for setting arrays)
---
--- @return void
function RageShaderProgram:uniformMatrix4fv(uniformName, values) end

--- Sets a sampler uniform
---
--- A :lua:class:`RageTexture` object is obtainable with ``:GetTexture()`` on another actor. You may have to create a "texture provider" actor to if you don't have any other actors that use your desired texture: that is, a simple sprite actor that does nothing and remains hidden throughout the entire duration of the chart.
---
--- |since_notitg_v3|
---
--- @param uniformName string The name of the uniform to set
--- @param texture RageTexture The texture to set on the sampler
---
--- @return void
function RageShaderProgram:uniformTexture(uniformName, texture) end

--- Compiles and links a new shader program
---
--- This will use defines specified with :lua:meth:`RageShaderProgram.define`.
---
--- |since_notitg_v3|
---
--- @param vertCode string The vertex shader code to compile, or an empty string to use NotITG's default vertex shader
--- @param fragCode string The fragment shader code to compile, or an empty string to use NotITG's default fragment shader
---
--- @return void
function RageShaderProgram:compile(vertCode, fragCode) end

--- Immediately recompile/relink the shader program
---
--- Useful in conjunction with :lua:meth:`RageShaderProgram.define` or :lua:meth:`RageShaderProgram.clearDefine`, since those functions do not automatically recompile/relink the shader program.
---
--- Despite being named ``compileImmediate``, this may not compile a shader immediately, but rather may defer compilation to when the shader is first used.
---
--- |since_notitg_v4|
---
--- @return void
function RageShaderProgram:compileImmediate() end

--- Injects a ``#define`` line at the top of shader code
---
--- Since |notitg_v4_2_0|, this now functions with shader code that contains ``#version`` directives.
---
--- This does not automatically recompile/relink the shader program - use :lua:meth:`RageShaderProgram.compileImmediate` to do that.
---
--- |since_notitg_v4|
---
--- @param key string The name of the macro to define
--- @param value string|boolean|number|nil What to define the macro as
---
--- @return void
function RageShaderProgram:define(key, value) end

--- Removes a ``#define`` previously added with :lua:meth:`RageShaderProgram.define`
---
--- This does not automatically recompile/relink the shader program - use :lua:meth:`RageShaderProgram.compileImmediate` to do that.
---
--- |since_notitg_v4|
---
--- @param key string The name of the macro to remove
---
--- @return void
function RageShaderProgram:clearDefine(key) end

--- Tests for equality against another userdata object
---
--- |since_unk|
---
--- @param other userdata The object to test for equality against
---
--- @return boolean
function RageShaderProgram:__eq(other) end

--- Gives you a ``RageShaderProgram (MemoryAddress)`` string
---
--- |since_unk|
---
--- @return string
function RageShaderProgram:__tostring() end

return RageShaderProgram
