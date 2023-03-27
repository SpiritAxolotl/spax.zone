# Configuration file for the Sphinx documentation builder.
#
# This file only contains a selection of the most common options. For a full
# list see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Path setup --------------------------------------------------------------

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#
# import os
# import sys
# sys.path.insert(0, os.path.abspath('.'))

import os
import sys
sys.path.insert(0, os.path.abspath("./_ext"))


# -- Project information -----------------------------------------------------

project = 'NotITG'
copyright = '2020, some people'
author = 'some more people'
version = '4.2.0'
release = version


# -- General configuration ---------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = [
    'sphinxcontrib.luadomain',
    'sphinx_lua',
    'notitg',
]

# Add any paths that contain templates here, relative to this directory.
templates_path = ['_templates']

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path.
exclude_patterns = []

rst_prolog = """
.. |notitg_v4_1_icon_16| image:: /_static/image/notitg_v4_1_logo_16.png
.. |notitg_v4_icon_16| image:: /_static/image/notitg_v4_logo_16.png
.. |notitg_v3_icon_16| image:: /_static/image/notitg_v3_logo_16.png
.. |notitg_v2_icon_16| image:: /_static/image/notitg_v2_logo_16.png
.. |notitg_v1_icon_16| image:: /_static/image/notitg_v1_logo_16.png
.. |itg_icon_16| image:: /_static/image/itg_logo_16.png

.. |notitg_v4_2_0| replace:: |notitg_v4_icon_16| NotITG v4.2.0
.. |notitg_v4_1| replace:: |notitg_v4_1_icon_16| NotITG v4/1
.. |notitg_v4_0_1| replace:: |notitg_v4_icon_16| NotITG v4.0.1
.. |notitg_v4| replace:: |notitg_v4_icon_16| NotITG v4
.. |notitg_v3_1| replace:: |notitg_v3_icon_16| NotITG v3.1
.. |notitg_v3| replace:: |notitg_v3_icon_16| NotITG v3
.. |notitg_v2| replace:: |notitg_v2_icon_16| NotITG v2
.. |notitg_v1| replace:: |notitg_v1_icon_16| NotITG v1
.. |itg| replace:: |itg_icon_16| ITG

.. |since_notitg_v4_2_0| replace:: Introduced in |notitg_v4_2_0|
.. |since_notitg_v4_1| replace:: Introduced in |notitg_v4_1|
.. |since_notitg_v4_0_1| replace:: Introduced in |notitg_v4_0_1|
.. |since_notitg_v4| replace:: Introduced in |notitg_v4|
.. |since_notitg_v3_1| replace:: Introduced in |notitg_v3_1|
.. |since_notitg_v3| replace:: Introduced in |notitg_v3|
.. |since_notitg_v2| replace:: Introduced in |notitg_v2|
.. |since_notitg_v1| replace:: Introduced in |notitg_v1|
.. |since_itg| replace:: Introduced in |itg_icon_16| ITG
.. |since_notitg_unk| replace:: Introduced in NotITG v?
.. |since_unk| replace:: Introduced in ???

.. |tween_16| image:: /_static/image/tween_16.png
.. |tween| replace:: |tween_16| Tween
.. |tweenable| replace:: |tween_16| Tweenable

.. |star_16| image:: /_static/image/star_16.png
.. |effect| replace:: |star_16| Effect

.. |warning_16| image:: /_static/image/warning_16.png
.. |unstable| replace:: |warning_16| Unstable! May change or be removed in future versions

.. |receptor_16| image:: /_static/image/receptor_16.png
"""


# -- Lua support -------------------------------------------------------------

lua_source_path = [
    "./lua",
]


# -- Options for HTML output -------------------------------------------------

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
#
html_theme = 'nature'

#  html_theme_options = {
    #  "bgcolor": "#212121",
    #  "textcolor": "#FFFFFF",
    #  "headbgcolor": "#333333",
    #  "headtextcolor": "#FFFFFF",
    #  "headlinkcolor": "#FFFFFF",
#  }

html_show_copyright = False

html_last_updated_fmt = ""

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ['_static']

html_css_files = ['style/style.css']

html_sidebars = { '**': ['globaltoc.html', 'relations.html', 'sourcelink.html', 'searchbox.html'] }

html_logo = '_static/image/notitg_v4_logo_256.png'
html_favicon = '_static/image/favicon.ico'
