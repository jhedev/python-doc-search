// Saves options to localStorage.
function save_options() {
  var select = document.getElementById("version");
  var color = select.children[select.selectedIndex].value;
  localStorage["python_version_doc_search"] = color;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var version = localStorage["python_version_doc_search"];
  if (!version) {
    return;
  }
  var select = document.getElementById("version");
  for (var i = 0; i < select.children.length; i++) {
    var child = select.children[i];
    if (child.value == version) {
      child.selected = "true";
      break;
    }
  }
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
