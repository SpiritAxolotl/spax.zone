NotITG docs (unofficial)
========================

https://craftedcart.gitlab.io/notitg_docs/

## Building

If you want to build the docs locally, first make sure you have Python 3 installed.

1. Create a Python virtual environment (`python3 -m venv venv`)
2. Install dependencies (`pip3 install -r requirements.txt`)
3. Build HTML docs (`make html`)

## Style guide

- reStructuredText files should wrap lines at `120` characters
- reStructuredText file names should use `snake_case`
- Mod names should be properly capitalized (Eg: prefer `StealthPastReceptors` over `stealthpastreceptors`) - this is
    done for readability

## Substitutions

Some substitutions are available for commonly used lines. You can find a list of these in `/source/conf.py`.

- `|notitg_v4_0_1|`, `|notitg_v4|`, `|notitg_v3_1|`, etc: Substitutes in the NotITG version name next
    to the version's icon

- `|since_notitg_v4_1|`, `|since_notitg_v4|`, `|since_notitg_v3_1|`, etc: Substitutes in the "Introduced in NotITG v?"
    text

- `|since_notitg_unk|`, `|since_unk|`: Substitutes in "Introduced in NotITG v?" and "Introduced in ???" text

- `|tween|`: Use this to mark a function as a tween

- `|tweenable|`: Use this to mark a function as tweenable

- `|effect|`: Use this to mark a function as an effect

- `|unstable|`: Use this to mark a function as unstable (may be changed or removed in future versions)

## Adding new modifiers

If adding new modifiers, make sure to run `./scripts/mod_freq_lookup.py`. That script is used to scrape a list of all
modifiers from `modifiers.rst`, as well as count the number of occurrences for each mod from your NotITG songs folder.
