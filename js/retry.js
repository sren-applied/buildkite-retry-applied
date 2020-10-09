function openFailed() {
    var failed = document.getElementsByClassName("build-pipeline-state-failed");
    for (var i = 0; i < failed.length; i++) {
      failed[i].click();
    }
    var retries = Array.from(document.querySelectorAll('a')).filter(el => el.innerText === 'Retry');
    for (var i = 0; i < retries.length; i++) {
      retries[i].click();
    }
    alert("retried " + retries.length + " tests");
    setTimeout(function(){ window.scrollTo({ top: 0 }); }, 1000);
}

openFailed();

