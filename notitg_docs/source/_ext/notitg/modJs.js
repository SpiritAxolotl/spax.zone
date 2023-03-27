// Find mod elements
for (var i = 0; i < modDefs.length; i++) {
  var mod = modDefs[i];
  var elem = document.getElementById(mod.id);
  mod.elem = elem;
  mod.defaultIdx = i;
}

function sortMods(on, reverse) {
  // Sort
  if (reverse) {
    modDefs.sort(function(a, b) { return b[on] - a[on]; });
  } else {
    modDefs.sort(function(a, b) { return a[on] - b[on]; });
  }

  // Clear mods list
  var modList = document.getElementById("mod-list");
  var newModList = modList.cloneNode(false);
  modList.parentNode.replaceChild(newModList, modList);

  // Repopulate it, sorted
  for (var i = 0; i < modDefs.length; i++) {
    var mod = modDefs[i];
    newModList.append(mod.elem);
  }
}
