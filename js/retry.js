function openFailed() {
    var failed = document.getElementsByClassName("build-pipeline-state-failed");
    for (var i = 0; i < failed.length; i++) {
      failed[i].click();
    }
    var retries = Array.from(document.querySelectorAll('a')).filter(el => el.innerText === 'Retry');

    if (retries.length === 0) {
      alert("Nothing to retry, maybe due to the job being canceled.");
    }
    for (var i = 0; i < retries.length; i++) {
      retries[i].click();
    }
    console.log("retried " + retries.length + " tests");
    setTimeout(function(){ window.scrollTo({ top: 0 }); }, 1000);
}

var failed = document.getElementsByClassName("build-pipeline-state-failed");
var buildPanels = document.getElementsByClassName('build-panel');
if (buildPanels.length === 1 && failed) {
  var buildPanel = buildPanels[0];
  if (buildPanel.classList.contains('panel-danger') || buildPanel.classList.contains('panel-warning')) {
    var footer = buildPanel.querySelector('.panel-footer');
    if (footer.children.length) {
      var buttons = footer.children[footer.children.length - 1];
      var retryFailed = document.createElement("button");
      retryFailed.innerHTML = 'Retry failed';
      retryFailed.onclick = openFailed;
      retryFailed.classList.add('btn');
      retryFailed.classList.add('btn-default');
      retryFailed.classList.add('center');
      buttons.prepend(retryFailed);
    }
  }
}

var failedSteps = document.getElementsByClassName("build-details-pipeline-job build-details-pipeline-job-state-failed build-details-pipeline-job-expanded");
for (var i = 0; i < failedSteps.length; i++) {
  var failedStep = failedSteps[i];
  var header = failedStep.children[0];
  var getReport = document.createElement("button");
  getReport.innerHTML = 'Get Report';
  getReport.classList.add('btn');
  getReport.classList.add('btn-default');
  getReport.classList.add('center');
  function copyDetails() {
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
    text += "ADD ERROR WITH TEST\n\n";
    text += "*Steps taken to triage*\n";
    text += "ADD STEPS TO TRIAGE\n\n";
    text += "*Additional notes*\n";
    text += "_left blank_\n\n";
    navigator.clipboard.writeText(text);
  }
  getReport.onclick = copyDetails;
  failedStep.children[1].children[0].appendChild(getReport);
}
