var selection = document.getSelection();
var selectedText = selection.toString();
var node = selection.focusNode;
if (node.nodeType !== 1) {
  node = node.parentNode;
}
var failedStep = node.closest(".build-details-pipeline-job.build-details-pipeline-job-expanded");

var header = failedStep.children[0];
// Would deduplicate this with retry.js copyDetails() if I was less lazy.
var text = "";
var windowLocation = window.location.href;
var link = windowLocation.split("#")[0] + "#" + failedStep.id.substring(4); // Remove 'job-' prefix
text += "*Link to test*\n";
text += link + "\n\n";
var name = header.querySelectorAll('[data-testid="JobName"]')[0].innerText;
text += "*Name of test*\n";
text += name + "\n\n";
var machineName = header.querySelectorAll('.fa-cube')[0].parentNode.children[1].innerText;
text += "*Name of machine*\n";
text += machineName + "\n\n";
text += "*Error/issue with test*\n";
text += "```\n";
text += selectedText;
text += "```\n";
text += "*Steps taken to triage*\n";
text += "ADD STEPS TO TRIAGE\n\n";
text += "*Additional notes*\n";
text += "_left blank_\n\n";
navigator.clipboard.writeText(text);

