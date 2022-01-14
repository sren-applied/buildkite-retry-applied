function copyRichText(text) {
  const listener = function(ev) {
    ev.preventDefault();
    ev.clipboardData.setData('text/html', text);
    ev.clipboardData.setData('text/plain', text);
  };
  document.addEventListener('copy', listener);
  document.execCommand('copy');
  document.removeEventListener('copy', listener);
}

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
text += "<b>Link to test</b><br/>";
text += link + "<br/><br/>";
var name = header.querySelectorAll('[data-testid="JobName"]')[0].innerText;
text += "<b>Name of test</b><br/>";
text += name + "<br/><br/>";
var machineName = header.querySelectorAll('.fa-cube')[0].parentNode.children[1].innerText;
text += "<b>Name of machine</b><br/>";
text += machineName + "<br/><br/>";
text += "<b>Error/issue with test</b><br/>";
text += "<pre><code>";
text += selectedText;
text += "</code></pre><br/>";
text += "<b>Steps taken to triage</b><br/>";
text += "ADD STEPS TO TRIAGE<br/><br/>";
text += "<b>Additional notes</b><br/>";
text += "<i>left blank</i><br/>";
copyRichText(text);

