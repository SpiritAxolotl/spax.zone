#!/usr/bin/env python3

import os
import sys

# Add _ext to the load path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), "source", "_ext")))

import multiprocessing
from multiprocessing import Pool
from collections import Counter, OrderedDict
from pathlib import Path
import re
import itertools
import json
from docutils.parsers.rst import directives
import docutils
from docutils import nodes
import notitg.modifiers


mod_regexes = {}


def read_file(path):
    with open(path) as f:
        return f.read()


def init():
    directives.register_directive("mod", notitg.modifiers.ModDirective)

    # Read and parse the mods document, to populate the notitg.modifiers.mods list
    input = read_file(os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), "source", "modifiers.rst"))
    settings = docutils.frontend.OptionParser(components=(docutils.parsers.rst.Parser,)).get_default_values()
    document = docutils.utils.new_document("test.rst", settings)
    parser = docutils.parsers.rst.Parser()
    parser.parse(input, document)

    # Compile regexes for each mod ahead of time so we can do quicker searches
    # Maps mod name -> re.Pattern
    for mod in notitg.modifiers.mods:
        for mod_name in itertools.chain(mod.names, mod.aliases):
            # Build a regex pattern, so we can handle number placeholders like % and #
            name_pattern = mod_name.lower()
            name_pattern = name_pattern.replace("|", r"\|")
            name_pattern = name_pattern.replace("%", r"\d*\.?\d+")  # % is a float
            name_pattern = name_pattern.replace("#", r"\d+")  # # is an int
            pattern = r"[, ';]" + name_pattern
            mod_regexes[mod_name] = re.compile(pattern)

    #  for mod_node in document.traverse(condition=lambda node: isinstance(node, nodes.section) and node["ids"][0].startswith("mod-")):
        #  print(mod_node)


def count_mod_occurances(xml_path):
    # Dict mapping mod ids -> number of occurances
    mod_occurances = Counter({})
    for mod in notitg.modifiers.mods:
        mod_occurances[mod.id] = 0

    print(f"-> Searching {xml_path}")
    try:
        xml = read_file(xml_path).lower()
    except UnicodeDecodeError:
        print(f"!! UTF8 decode error for {xml_path}")
        return mod_occurances

    # Search for occurances of each mod name
    for mod in notitg.modifiers.mods:
        for mod_name in itertools.chain(mod.names, mod.aliases):
            count = len(mod_regexes[mod_name].findall(xml))
            if count > 0:
                # Do some math to prevent any one chart from inflating the count
                #  mod_occurances[mod.id] += count
                #  mod_occurances[mod.id] += min(count, 20)
                mod_occurances[mod.id] += 1.15 ** (-count)

    return mod_occurances


def main():
    if len(sys.argv) != 2:
        print(f"Usage: {sys.argv[0]} [path_to_songs_dir]")
        return

    songs_dir = Path(sys.argv[1])

    with Pool(multiprocessing.cpu_count(), initializer=init) as pool:
        mod_occurances = sum(pool.map(count_mod_occurances, songs_dir.rglob("*.xml")), start=Counter())

    with open(
        os.path.join(
            os.path.dirname(os.path.dirname(os.path.realpath(__file__))),
            "source", "_ext", "notitg", "modifier_frequency.json"
        ),
        "w"
    ) as f:
        f.write(json.dumps(mod_occurances))
    print("Wrote modifier_frequency.json")


if __name__ == "__main__":
    main()
