import os
import json
import re
from docutils.parsers.rst import Directive, directives
from docutils import nodes
from sphinx.util.docutils import SphinxDirective
from sphinx.util.nodes import clean_astext
from sphinx.util import logging


logger = logging.getLogger(__name__)


# List of ModDefs - populated when a ModDirective is found
mods = []


class ModDef:
    def __init__(self, names, aliases, id):
        assert len(names) > 0, "ModDef got empty name list"

        self.names = names
        self.aliases = aliases
        self.id = id


class ModDirective(SphinxDirective):
    has_content = True
    required_arguments = 1
    optional_arguments = 0
    final_argument_whitespace = True
    option_spec = {
        "aliases": directives.unchanged,
        "video": directives.unchanged,
        "image": directives.unchanged,
    }

    def run(self):
        mod_names = [name.strip() for name in self.arguments[0].split(",")]

        if "aliases" in self.options:
            mod_aliases = [name.strip() for name in self.options["aliases"].split(",")]
        else:
            mod_aliases = []

        id = "mod-" + "-".join([re.sub("[^0-9a-zA-Z]+", "_", name) for name in mod_names]).lower()

        mods.append(ModDef(
            names=mod_names,
            aliases=mod_aliases,
            id=id,
        ))

        section = nodes.section(ids=[id], names=[id])
        title = nodes.title(text=self.arguments[0])
        section += title

        if "video" in self.options:
            section += nodes.raw(text=f"<video muted controls loop preload=\"none\" width=\"320\" height=\"240\" class=\"mod-video\"><source src=\"_static/video/mod/{self.options['video']}\" type=\"video/webm\"></video>", format="html")
            section["classes"].append("mod-video-section")

        if "image" in self.options:
            section += nodes.raw(text=f"<img width=\"320\" height=\"240\" class=\"mod-video\" src=\"_static/image/mod/{self.options['image']}\">", format="html")
            section["classes"].append("mod-video-section")

        self.state.nested_parse(self.content, self.content_offset, section, match_titles=True)

        name = nodes.fully_normalize_name(self.arguments[0])

        # If we're running inside Sphinx, add labels to here so this mod can be linked to from elsewhere
        # If we're not running in Sphinx (Eg: Running from scripts/mod_freq_lookup.py), don't do that
        if hasattr(self, "env"):
            domain = self.env.app.env.get_domain("std")
            domain.anonlabels[id] = self.env.app.env.docname, id
            domain.labels[id] = self.env.app.env.docname, id, clean_astext(title)

        #  self.state.document.note_anonymous_target(section)
        #  self.state.document.note_explicit_target(section)

        #  target = nodes.target("", "", ids=[id], names=[id])
        #  self.state.document.note_explicit_target(target)

        #  return [target, section]
        return [section]


class ModJsDirective(Directive):
    has_content = False
    required_arguments = 0
    optional_arguments = 0
    option_spec = {}

    def run(self):
        with open(os.path.join(os.path.dirname(__file__), "modifier_frequency.json")) as f:
            freqs = json.loads(f.read())

        with open(os.path.join(os.path.dirname(__file__), "modJs.js")) as f:
            js = f.read()

        # Construct some JSON to send to the client
        mod_defs_js = []
        for mod in mods:
            try:
                freq = freqs[mod.id]
            except KeyError:
                # Missing frequencies are normal if no-body's used a mod
                #  logger.warning(f"Missing occurance frequency for mod {mod.id}")
                freq = 0

            mod_defs_js.append({
                "id": mod.id,
                "freq": freq,
            })

        return [
            nodes.raw(text=f"<script>window.modDefs = {json.dumps(mod_defs_js, separators=(',', ':'))};</script>", format="html"),
            nodes.raw(text=f"<script>{js}</script>", format="html"),
        ]


def setup(app):
    app.add_directive("mod", ModDirective)
    app.add_directive("mod-js", ModJsDirective)
