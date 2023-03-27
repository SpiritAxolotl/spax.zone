{%- for param in function.params -%}
{%- if param.is_opt -%}{%- endif -%}
{{ param.name }}: {% with type=param.type %}{% include "type.rst" %}{% endwith %}{{ "=" + param.default_value if param.default_value }}{{ ", " if not loop.last }}
{%- endfor -%}
{# vim: set ft=jinja: #}
