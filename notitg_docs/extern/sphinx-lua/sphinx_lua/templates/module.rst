.. lua:module:: {{ module.name }}

{{ module.short_desc|process_link if module.short_desc }}

{{ module.desc|process_link if module.desc }}

{% if module.usage -%}
**Usage:**

.. code-block:: lua
    :linenos:

    {{ module.usage|indent(4) }}
{%- endif %}

{% if module.data|length > 0 %}
.. list-table::
    :header-rows: 1
    :widths: 30 70

    * - Field
      - Description
{% endif %}

{# field summaries #}
{% for field in module.data %}
    * - :lua:attr:`{{ field.name }} <{{ module.name }}.{{ field.name }}>`
      - {{ field.short_desc }}
{% endfor %}

{% if module.functions|length > 0 %}
.. list-table::
    :header-rows: 1
    :widths: 30 70

    * - Function
      - Description
{% endif %}

{# function summaries #}
{% for function in module.functions %}
    * - :lua:meth:`{{ function.name }}({%- for param in function.params -%}{{ param.name }}{{ ", " if not loop.last }}{%- endfor -%}) <{{ module.name }}.{{ function.name }}>`
      - {{ function.short_desc }}
{% endfor %}

{% for field in module.data %}
{%- with type=field.type -%}
.. lua:attribute:: {{ field.name }}: {% include "type.rst" %}
{%- filter indent(width=4) %}

{% if field.short_desc -%}
{{ field.short_desc | process_link }}
{% endif %}
{% if field.desc -%}
{{ field.desc | process_link }}
{%- endif %}
{%- endfilter %}

{% endwith -%}
{% endfor %}

{% for function in module.functions %}
{% include "function.rst" %}
{% endfor %}

{% for model in module.classes %}
{% include "class.rst" %}
{% endfor %}
{# vim: set ft=jinja: #}
