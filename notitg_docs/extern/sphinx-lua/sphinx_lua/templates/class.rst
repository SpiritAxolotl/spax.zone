.. lua:class:: {{ model.name }}
{%- if model.inherits_from -%}
{{ ": " }}
{%- for base in model.inherits_from -%}
{{ base }}{{ ", " if not loop.last }}
{%- endfor -%}
{%- endif %}
    {# reset module for single class -#}
    {% if not module %}:module:{%- endif %}
{%- filter indent(width=4) %}

{% if model.short_desc -%}
{{ model.short_desc | process_link }}
{% endif %}
{% if model.desc -%}
{{ model.desc | process_link }}
{%- endif %}
{% if model.usage %}
**Usage:**

.. code-block:: lua
    :linenos:

    {{ model.usage|indent(4) }}
{% endif -%}

{% if model.fields|length > 0 %}
.. list-table::
    :header-rows: 1
    :widths: 30 70

    * - Field
      - Description
{% endif %}

{# field summaries #}
{% for field in model.fields %}
    * - :lua:attr:`{{ field.name }}`
      - {{ field.desc }}
{% endfor %}

{% if model.methods|length > 0 %}
.. list-table::
    :header-rows: 1
    :widths: 30 70

    * - Method
      - Description
{% endif %}

{# public method summaries #}
{% for method in model.methods %}
{% if method.visibility == "public" %}
    * - :lua:meth:`{{ method.name }}({%- for param in method.params -%}{{ param.name }}{{ ", " if not loop.last }}{%- endfor -%}) <{{ model.name }}.{{ method.name }}>`
      - {{ method.short_desc }}
{% endif %}
{% endfor %}

{# protected method summaries #}
{% for method in model.methods %}
{% if method.visibility == "protected" %}
    * - :lua:meth:`{{ method.name }}`
      - {{ method.short_desc }}
{% endif %}
{% endfor %}

{# private method summaries #}
{% for method in model.methods %}
{% if method.visibility == "private" %}
    * - :lua:meth:`{{ method.name }}`
      - {{ method.short_desc }}
{% endif %}
{% endfor %}

{# display class fields #}
{% for field in model.fields -%}
{%- with type=field.type -%}
.. lua:attribute:: {{ field.name }}: {% include "type.rst" %}

    {{ field.desc }}

{% endwith -%}
{%- endfor %}

{# display public methods first #}
{%- for method in model.methods -%}
{%- if method.visibility == "public" %}
{% include "method.rst" %}
{%- endif %}
{%- endfor %}

{# then display protected ones #}
{%- for method in model.methods -%}
{%- if method.visibility == "protected" -%}
{%- include "method.rst"|indent(4) %}
{%- endif %}
{%- endfor %}

{# then display private ones #}
{%- for method in model.methods -%}
{%- if method.visibility == "private" -%}
{%- include "method.rst"|indent(4) %}
{%- endif %}
{%- endfor %}
{%- endfilter %}
{# vim: set ft=jinja: #}
