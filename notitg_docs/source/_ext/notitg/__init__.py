import notitg.modifiers


def setup(app):
    modifiers.setup(app)

    return {
        "version": "0.1",
        "parallel_read_safe": True,
        "parallel_write_safe": True,
    }
