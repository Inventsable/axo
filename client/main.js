var csInterface = new CSInterface();
var appSkin = csInterface.hostEnvironment.appSkinInfo;
var sysPath = csInterface.getSystemPath(SystemPath.EXTENSION);
var logPath = sysPath + "/log/";
var hostPath = sysPath + "/host/";
var appName = csInterface.hostEnvironment.appName;

loadUniversalJSXLibraries();
// console.log(`Loading for ${appName}`);
// console.log(appUI);

Vue.component('toolbar', {
  template: `
    <div class="adobe-toolbar">
      <div class="adobe adobe-btn-switch">
        <span class="adobe-icon-folder"></span>
      </div>
      <div class="adobe adobe-btn-switch">
        <span class="adobe-icon-file"></span>
      </div>
      <div class="adobe-toolbar-divider"></div>
    </div>
  `,
})

var app = new Vue({
  el: '#app',
  data: {

  },
  methods: {

  },
});
